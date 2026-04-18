import bcrypt from 'bcrypt';
import { Role } from '../generated/prisma';
import { env } from '../config/env';
import { userRepository } from '../repositories/user.repository';
import { refreshTokenRepository } from '../repositories/refreshToken.repository';
import { roleRequestRepository } from '../repositories/roleRequest.repository';
import { passwordResetTokenRepository } from '../repositories/passwordResetToken.repository';
import { auditLog, listAuditEvents } from '../repositories/audit.repository';
import {
  generateAccessToken,
  generateRefreshTokenValue,
  hashToken,
  getRefreshTokenExpiry,
} from './token.service';
import { sendPasswordResetEmail, sendRoleApprovedEmail } from './email.service';
import { AppError, ConflictError, UnauthorizedError, NotFoundError, ForbiddenError } from '../utils/errors';
import type { Request } from 'express';
import { logger } from '../utils/logger';

const BCRYPT_ROUNDS = 12;

export function sanitizeUser(user: {
  id: string;
  email: string;
  name: string;
  role: string;
  language: string;
  status: string;
  phone?: string | null;
  cityZoneId?: string | null;
  categories?: string[];
  createdAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    language: user.language,
    status: user.status,
    phone: user.phone ?? null,
    cityZoneId: user.cityZoneId ?? null,
    categories: user.categories ?? [],
    createdAt: user.createdAt,
  };
}

async function issueTokens(
  userId: string,
  email: string,
  role: string,
  req?: Request,
): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = generateAccessToken({ sub: userId, email, role });
  const refreshToken = generateRefreshTokenValue();
  await refreshTokenRepository.create({
    userId,
    tokenHash: hashToken(refreshToken),
    expiresAt: getRefreshTokenExpiry(),
    userAgent: req?.headers['user-agent'],
    ip: req?.ip,
  });
  return { accessToken, refreshToken };
}

// ─── Register ────────────────────────────────────────────────────────────────

export async function register(
  input: { name: string; email: string; phone?: string; password: string },
  req?: Request,
) {
  const existing = await userRepository.findByEmail(input.email);
  if (existing) throw new ConflictError('An account with this email already exists');

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
  const user = await userRepository.create({
    name: input.name,
    email: input.email,
    phone: input.phone,
    passwordHash,
    role: 'worker',
  });

  const { accessToken, refreshToken } = await issueTokens(user.id, user.email, user.role, req);

  await auditLog({ actorId: user.id, actorRole: user.role, action: 'USER_REGISTERED', entity: 'User', entityId: user.id, req });

  return { user: sanitizeUser(user), accessToken, refreshToken };
}

// ─── Login ───────────────────────────────────────────────────────────────────

export async function login(
  input: { email: string; password: string },
  req?: Request,
) {
  const user = await userRepository.findByEmail(input.email);
  if (!user) throw new UnauthorizedError('Invalid email or password');

  if (user.status === 'frozen')
    throw new AppError(403, 'ACCOUNT_FROZEN', 'Your account has been suspended. Contact support.');
  if (user.status === 'deleted')
    throw new UnauthorizedError('Invalid email or password');

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw new UnauthorizedError('Invalid email or password');

  const { accessToken, refreshToken } = await issueTokens(user.id, user.email, user.role, req);

  await auditLog({ actorId: user.id, actorRole: user.role, action: 'USER_LOGIN', entity: 'User', entityId: user.id, req });

  return { user: sanitizeUser(user), accessToken, refreshToken };
}

// ─── Refresh ─────────────────────────────────────────────────────────────────

export async function refresh(rawToken: string, req?: Request) {
  const tokenHash = hashToken(rawToken);
  const stored = await refreshTokenRepository.findByHash(tokenHash);

  if (!stored) throw new UnauthorizedError('Refresh token not found');
  if (stored.revokedAt) throw new UnauthorizedError('Refresh token has been revoked');
  if (stored.expiresAt < new Date()) throw new UnauthorizedError('Refresh token has expired');

  const user = await userRepository.findById(stored.userId);
  if (!user || user.status !== 'active') throw new UnauthorizedError('User is not active');

  const newRefreshToken = generateRefreshTokenValue();
  const newHash = hashToken(newRefreshToken);
  const newStored = await refreshTokenRepository.create({
    userId: user.id,
    tokenHash: newHash,
    expiresAt: getRefreshTokenExpiry(),
    userAgent: req?.headers['user-agent'],
    ip: req?.ip,
  });

  await refreshTokenRepository.revoke(stored.id, newStored.id);

  const accessToken = generateAccessToken({ sub: user.id, email: user.email, role: user.role });

  return { accessToken, refreshToken: newRefreshToken };
}

// ─── Logout ──────────────────────────────────────────────────────────────────

export async function logout(rawToken: string, req?: Request) {
  const tokenHash = hashToken(rawToken);
  const stored = await refreshTokenRepository.findByHash(tokenHash);
  if (stored && !stored.revokedAt) {
    await refreshTokenRepository.revoke(stored.id);
    await auditLog({ actorId: stored.userId, action: 'USER_LOGOUT', entity: 'User', entityId: stored.userId, req });
  }
}

// ─── Forgot password ─────────────────────────────────────────────────────────

export async function forgotPassword(email: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    logger.info({ email }, 'Forgot-password requested for non-existent email');
    return; // silent — never reveal whether email exists
  }

  await passwordResetTokenRepository.invalidateAllForUser(user.id);

  const rawToken = generateRefreshTokenValue();
  await passwordResetTokenRepository.create({
    userId: user.id,
    tokenHash: hashToken(rawToken),
    expiresAt: new Date(Date.now() + env.RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000),
  });

  await sendPasswordResetEmail(user.email, rawToken, env.RESET_TOKEN_EXPIRY_HOURS);
  logger.info({ userId: user.id, email: user.email }, 'Password reset email dispatched');
}

// ─── Reset password ──────────────────────────────────────────────────────────

export async function resetPassword(token: string, newPassword: string, req?: Request) {
  const tokenHash = hashToken(token);
  const record = await passwordResetTokenRepository.findValidByHash(tokenHash);
  if (!record) throw new AppError(400, 'INVALID_RESET_TOKEN', 'Reset token is invalid or has expired');

  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await userRepository.update(record.userId, { passwordHash });
  await passwordResetTokenRepository.markUsed(record.id);
  await refreshTokenRepository.revokeAllForUser(record.userId);

  await auditLog({ actorId: record.userId, action: 'PASSWORD_RESET', entity: 'User', entityId: record.userId, req });
}

// ─── Change password ─────────────────────────────────────────────────────────

export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string,
  req?: Request,
) {
  const user = await userRepository.findById(userId);
  if (!user) throw new NotFoundError('User');

  const valid = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!valid) throw new UnauthorizedError('Current password is incorrect');

  const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
  await userRepository.update(userId, { passwordHash });
  await refreshTokenRepository.revokeAllForUser(userId);

  await auditLog({ actorId: userId, actorRole: user.role, action: 'PASSWORD_CHANGED', entity: 'User', entityId: userId, req });
}

// ─── Me ──────────────────────────────────────────────────────────────────────

export async function getMe(userId: string) {
  const user = await userRepository.findById(userId);
  if (!user) throw new NotFoundError('User');
  return sanitizeUser(user);
}

export async function updateMe(
  userId: string,
  input: Partial<{ name: string; language: 'en' | 'ur'; categories: string[]; cityZoneId: string; phone: string }>,
) {
  const updated = await userRepository.update(userId, input);
  return sanitizeUser(updated);
}

// ─── Role requests ───────────────────────────────────────────────────────────

export async function createRoleRequest(
  userId: string,
  input: { requestedRole: Role; reason?: string },
  req?: Request,
) {
  const existing = await roleRequestRepository.findPendingByUser(userId, input.requestedRole);
  if (existing) throw new ConflictError('You already have a pending request for this role');

  const user = await userRepository.findById(userId);
  if (!user) throw new NotFoundError('User');
  if (user.role !== 'worker') throw new ForbiddenError('Only workers can request role upgrades');

  const roleRequest = await roleRequestRepository.create({ userId, ...input });
  await auditLog({ actorId: userId, actorRole: 'worker', action: 'ROLE_REQUEST_CREATED', entity: 'RoleRequest', entityId: roleRequest.id, req });
  return roleRequest;
}

export async function getRoleRequests(opts: { page: number; limit: number }) {
  return roleRequestRepository.list({ status: 'pending', ...opts });
}

export async function approveRoleRequest(requestId: string, adminId: string, req?: Request) {
  const request = await roleRequestRepository.findById(requestId);
  if (!request) throw new NotFoundError('Role request');
  if (request.status !== 'pending') throw new ConflictError('Request has already been decided');

  await roleRequestRepository.decide(requestId, 'approved', adminId);
  await userRepository.update(request.userId, { role: request.requestedRole });
  await refreshTokenRepository.revokeAllForUser(request.userId);

  await sendRoleApprovedEmail(request.user.email, request.requestedRole).catch(() => {});
  await auditLog({ actorId: adminId, actorRole: 'admin', action: 'ROLE_REQUEST_APPROVED', entity: 'RoleRequest', entityId: requestId, diff: { newRole: request.requestedRole }, req });
}

export async function rejectRoleRequest(requestId: string, adminId: string, req?: Request) {
  const request = await roleRequestRepository.findById(requestId);
  if (!request) throw new NotFoundError('Role request');
  if (request.status !== 'pending') throw new ConflictError('Request has already been decided');

  await roleRequestRepository.decide(requestId, 'rejected', adminId);
  await auditLog({ actorId: adminId, actorRole: 'admin', action: 'ROLE_REQUEST_REJECTED', entity: 'RoleRequest', entityId: requestId, req });
}

// ─── Admin: list users ───────────────────────────────────────────────────────

export async function listUsers(opts: {
  page: number;
  limit: number;
  role?: Role;
  status?: string;
  search?: string;
}) {
  return userRepository.adminList(opts);
}

// ─── Admin: audit log ────────────────────────────────────────────────────────

export async function getAuditLog(opts: {
  page: number;
  limit: number;
  actorId?: string;
  action?: string;
  entity?: string;
  from?: string;
  to?: string;
}) {
  return listAuditEvents({
    page: opts.page,
    limit: opts.limit,
    actorId: opts.actorId,
    action: opts.action,
    entity: opts.entity,
    from: opts.from ? new Date(opts.from) : undefined,
    to: opts.to ? new Date(opts.to) : undefined,
  });
}

// ─── Admin: user status ──────────────────────────────────────────────────────

export async function updateUserStatus(
  targetUserId: string,
  status: 'active' | 'frozen',
  adminId: string,
  req?: Request,
) {
  const user = await userRepository.findByIdIncludeDeleted(targetUserId);
  if (!user) throw new NotFoundError('User');

  await userRepository.update(targetUserId, { status });
  if (status === 'frozen') {
    await refreshTokenRepository.revokeAllForUser(targetUserId);
  }

  await auditLog({
    actorId: adminId,
    actorRole: 'admin',
    action: status === 'frozen' ? 'USER_FROZEN' : 'USER_UNFROZEN',
    entity: 'User',
    entityId: targetUserId,
    req,
  });

  return sanitizeUser(await userRepository.findById(targetUserId) ?? user);
}
