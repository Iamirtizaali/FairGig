import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendCreated } from '../utils/response';
import { env } from '../config/env';
import { getRefreshCookieMaxAge } from '../services/token.service';
import * as authService from '../services/auth.service';

const REFRESH_COOKIE = 'refreshToken';

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: getRefreshCookieMaxAge(),
    path: '/',
  });
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE, { path: '/' });
}

// ─── Public ──────────────────────────────────────────────────────────────────

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body, req);
  setRefreshCookie(res, refreshToken);
  sendCreated(res, { user, accessToken });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body, req);
  setRefreshCookie(res, refreshToken);
  sendSuccess(res, { user, accessToken });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const rawToken: string | undefined = req.cookies?.[REFRESH_COOKIE];
  if (!rawToken) {
    res.status(401).json({ data: null, meta: {}, error: { code: 'MISSING_REFRESH_TOKEN', message: 'Refresh token cookie is missing' } });
    return;
  }
  const { accessToken, refreshToken } = await authService.refresh(rawToken, req);
  setRefreshCookie(res, refreshToken);
  sendSuccess(res, { accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const rawToken: string | undefined = req.cookies?.[REFRESH_COOKIE];
  if (rawToken) await authService.logout(rawToken, req);
  clearRefreshCookie(res);
  sendSuccess(res, null);
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body.email);
  sendSuccess(res, null);
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.newPassword, req);
  sendSuccess(res, null);
});

// ─── Authenticated ────────────────────────────────────────────────────────────

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.changePassword(req.user!.sub, req.body.oldPassword, req.body.newPassword, req);
  sendSuccess(res, null);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getMe(req.user!.sub);
  sendSuccess(res, { user });
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.updateMe(req.user!.sub, req.body);
  sendSuccess(res, { user });
});

// ─── Role requests ────────────────────────────────────────────────────────────

export const createRoleRequest = asyncHandler(async (req: Request, res: Response) => {
  const roleRequest = await authService.createRoleRequest(req.user!.sub, req.body, req);
  sendCreated(res, { roleRequest });
});

export const getRoleRequests = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(String(req.query.page ?? '1')) || 1;
  const limit = Math.min(Number(String(req.query.limit ?? '20')) || 20, 100);
  const { requests, total } = await authService.getRoleRequests({ page, limit });
  sendSuccess(res, { requests }, 200, { page, limit, total });
});

export const approveRoleRequest = asyncHandler(async (req: Request, res: Response) => {
  await authService.approveRoleRequest(String(req.params.id), req.user!.sub, req);
  sendSuccess(res, null);
});

export const rejectRoleRequest = asyncHandler(async (req: Request, res: Response) => {
  await authService.rejectRoleRequest(String(req.params.id), req.user!.sub, req);
  sendSuccess(res, null);
});

// ─── Admin ────────────────────────────────────────────────────────────────────

export const updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.updateUserStatus(String(req.params.id), req.body.status, req.user!.sub, req);
  sendSuccess(res, { user });
});
