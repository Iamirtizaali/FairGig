import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { buildApp } from '../src/app';

// ── Mock Prisma ───────────────────────────────────────────────────────────────
vi.mock('../src/lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      count: vi.fn(),
      findMany: vi.fn(),
    },
    refreshToken: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
    passwordResetToken: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    roleRequest: {
      findFirst: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
    auditEvent: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

// ── Suppress email sends ──────────────────────────────────────────────────────
vi.mock('../src/services/email.service', () => ({
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
  sendRoleApprovedEmail: vi.fn().mockResolvedValue(undefined),
}));

// ── Disable Redis rate-limit store ────────────────────────────────────────────
vi.mock('../src/lib/redis', () => ({
  getRedis: vi.fn().mockReturnValue(null),
  sendRedisCommand: vi.fn(),
}));

import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';
import { makeToken, makeAdminToken } from './helpers/token';

const app = buildApp();

const fakeHash = bcrypt.hashSync('testpassword1', 1);

const activeUser = {
  id: 'user-id-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'worker',
  status: 'active',
  language: 'en',
  phone: null,
  cityZoneId: null,
  categories: [],
  passwordHash: fakeHash,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const refreshTokenRow = {
  id: 'rt-1',
  userId: 'user-id-1',
  tokenHash: 'hashed',
  revokedAt: null,
  expiresAt: new Date(Date.now() + 7 * 86400000),
  replacedByTokenId: null,
};

beforeEach(() => {
  vi.clearAllMocks();
  (prisma.auditEvent.create as ReturnType<typeof vi.fn>).mockResolvedValue({});
});

// ─── Health ───────────────────────────────────────────────────────────────────

describe('GET /health', () => {
  it('returns 200 ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

// ─── Register ─────────────────────────────────────────────────────────────────

describe('POST /auth/v1/register', () => {
  it('creates a user and returns 201 with accessToken', async () => {
    (prisma.user.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (prisma.user.create as ReturnType<typeof vi.fn>).mockResolvedValue(activeUser);
    (prisma.refreshToken.create as ReturnType<typeof vi.fn>).mockResolvedValue(refreshTokenRow);

    const res = await request(app).post('/auth/v1/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword1',
    });

    expect(res.status).toBe(201);
    expect(res.body.data.accessToken).toBeTruthy();
    expect(res.body.data.user.email).toBe('test@example.com');
    expect(res.body.data.user.passwordHash).toBeUndefined();
  });

  it('returns 409 if email already taken', async () => {
    (prisma.user.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(activeUser);

    const res = await request(app).post('/auth/v1/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword1',
    });

    expect(res.status).toBe(409);
  });

  it('returns 422 for missing required fields', async () => {
    const res = await request(app).post('/auth/v1/register').send({ email: 'bad' });
    expect(res.status).toBe(422);
  });

  it('returns 422 for password too short', async () => {
    const res = await request(app).post('/auth/v1/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'short',
    });
    expect(res.status).toBe(422);
  });
});

// ─── Login ────────────────────────────────────────────────────────────────────

describe('POST /auth/v1/login', () => {
  it('returns 200 with accessToken on valid credentials', async () => {
    (prisma.user.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(activeUser);
    (prisma.refreshToken.create as ReturnType<typeof vi.fn>).mockResolvedValue(refreshTokenRow);

    const res = await request(app).post('/auth/v1/login').send({
      email: 'test@example.com',
      password: 'testpassword1',
    });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeTruthy();
  });

  it('returns 401 for wrong password', async () => {
    (prisma.user.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(activeUser);

    const res = await request(app).post('/auth/v1/login').send({
      email: 'test@example.com',
      password: 'wrongpassword1',
    });

    expect(res.status).toBe(401);
  });

  it('returns 401 for unknown email', async () => {
    (prisma.user.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await request(app).post('/auth/v1/login').send({
      email: 'nobody@example.com',
      password: 'testpassword1',
    });

    expect(res.status).toBe(401);
  });

  it('returns 403 for frozen account', async () => {
    (prisma.user.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue({
      ...activeUser,
      status: 'frozen',
    });

    const res = await request(app).post('/auth/v1/login').send({
      email: 'test@example.com',
      password: 'testpassword1',
    });

    expect(res.status).toBe(403);
  });

  it('returns 422 for invalid email format', async () => {
    const res = await request(app).post('/auth/v1/login').send({
      email: 'not-an-email',
      password: 'testpassword1',
    });
    expect(res.status).toBe(422);
  });
});

// ─── Logout ───────────────────────────────────────────────────────────────────

describe('POST /auth/v1/logout', () => {
  it('returns 200 even without a refresh cookie', async () => {
    const res = await request(app).post('/auth/v1/logout');
    expect(res.status).toBe(200);
  });
});

// ─── Refresh ─────────────────────────────────────────────────────────────────

describe('POST /auth/v1/refresh', () => {
  it('returns 401 with no cookie', async () => {
    const res = await request(app).post('/auth/v1/refresh');
    expect(res.status).toBe(401);
  });
});

// ─── Forgot password ──────────────────────────────────────────────────────────

describe('POST /auth/v1/forgot-password', () => {
  it('returns 200 even for unknown email (no enumeration)', async () => {
    (prisma.user.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const res = await request(app).post('/auth/v1/forgot-password').send({ email: 'nobody@example.com' });
    expect(res.status).toBe(200);
  });

  it('returns 422 for invalid email', async () => {
    const res = await request(app).post('/auth/v1/forgot-password').send({ email: 'bad' });
    expect(res.status).toBe(422);
  });
});

// ─── Reset password ───────────────────────────────────────────────────────────

describe('POST /auth/v1/reset-password', () => {
  it('returns 400 for invalid token', async () => {
    (prisma.passwordResetToken.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const res = await request(app).post('/auth/v1/reset-password').send({
      token: 'b3e5c6a7-d1f2-4a3b-8c9d-0e1f2a3b4c5d',
      password: 'newpassword1',
    });
    expect(res.status).toBe(400);
  });

  it('returns 422 for weak new password', async () => {
    const res = await request(app).post('/auth/v1/reset-password').send({
      token: 'b3e5c6a7-d1f2-4a3b-8c9d-0e1f2a3b4c5d',
      password: 'weak',
    });
    expect(res.status).toBe(422);
  });
});

// ─── Me ───────────────────────────────────────────────────────────────────────

describe('GET /auth/v1/me', () => {
  it('returns 401 without auth header', async () => {
    const res = await request(app).get('/auth/v1/me');
    expect(res.status).toBe(401);
  });

  it('returns current user with valid token', async () => {
    (prisma.user.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(activeUser);

    const res = await request(app)
      .get('/auth/v1/me')
      .set('Authorization', `Bearer ${makeToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.data.user.id).toBe('user-id-1');
  });

  it('returns 401 for expired/invalid token', async () => {
    const res = await request(app)
      .get('/auth/v1/me')
      .set('Authorization', 'Bearer invalid.token.here');
    expect(res.status).toBe(401);
  });
});

// ─── Change password ──────────────────────────────────────────────────────────

describe('POST /auth/v1/change-password', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).post('/auth/v1/change-password').send({
      oldPassword: 'testpassword1',
      newPassword: 'newpassword1',
    });
    expect(res.status).toBe(401);
  });

  it('returns 422 for missing fields', async () => {
    const res = await request(app)
      .post('/auth/v1/change-password')
      .set('Authorization', `Bearer ${makeToken()}`)
      .send({});
    expect(res.status).toBe(422);
  });

  it('returns 401 when current password is wrong', async () => {
    (prisma.user.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(activeUser);

    const res = await request(app)
      .post('/auth/v1/change-password')
      .set('Authorization', `Bearer ${makeToken()}`)
      .send({ oldPassword: 'wrongpassword1', newPassword: 'newpassword1' });

    expect(res.status).toBe(401);
  });
});

// ─── Role requests ────────────────────────────────────────────────────────────

describe('POST /auth/v1/role-requests', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).post('/auth/v1/role-requests').send({ requestedRole: 'verifier' });
    expect(res.status).toBe(401);
  });

  it('returns 403 if caller is not a worker', async () => {
    const res = await request(app)
      .post('/auth/v1/role-requests')
      .set('Authorization', `Bearer ${makeAdminToken()}`)
      .send({ requestedRole: 'verifier' });
    expect(res.status).toBe(403);
  });

  it('returns 422 for invalid requestedRole', async () => {
    const res = await request(app)
      .post('/auth/v1/role-requests')
      .set('Authorization', `Bearer ${makeToken()}`)
      .send({ requestedRole: 'superadmin' });
    expect(res.status).toBe(422);
  });
});

describe('GET /auth/v1/role-requests', () => {
  it('returns 403 for non-admin', async () => {
    const res = await request(app)
      .get('/auth/v1/role-requests')
      .set('Authorization', `Bearer ${makeToken()}`);
    expect(res.status).toBe(403);
  });

  it('returns list for admin', async () => {
    (prisma.roleRequest.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    (prisma.roleRequest.count as ReturnType<typeof vi.fn>).mockResolvedValue(0);

    const res = await request(app)
      .get('/auth/v1/role-requests')
      .set('Authorization', `Bearer ${makeAdminToken()}`);
    expect(res.status).toBe(200);
  });
});

// ─── Admin endpoints ──────────────────────────────────────────────────────────

describe('GET /auth/v1/admin/users', () => {
  it('returns 403 for non-admin', async () => {
    const res = await request(app)
      .get('/auth/v1/admin/users')
      .set('Authorization', `Bearer ${makeToken()}`);
    expect(res.status).toBe(403);
  });

  it('returns paginated user list for admin', async () => {
    (prisma.user.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([activeUser]);
    (prisma.user.count as ReturnType<typeof vi.fn>).mockResolvedValue(1);

    const res = await request(app)
      .get('/auth/v1/admin/users')
      .set('Authorization', `Bearer ${makeAdminToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.meta.total).toBe(1);
  });
});

describe('GET /auth/v1/admin/audit', () => {
  it('returns 403 for non-admin', async () => {
    const res = await request(app)
      .get('/auth/v1/admin/audit')
      .set('Authorization', `Bearer ${makeToken()}`);
    expect(res.status).toBe(403);
  });

  it('returns audit events for admin', async () => {
    (prisma.auditEvent.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    (prisma.auditEvent.count as ReturnType<typeof vi.fn>).mockResolvedValue(0);

    const res = await request(app)
      .get('/auth/v1/admin/audit')
      .set('Authorization', `Bearer ${makeAdminToken()}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.events)).toBe(true);
  });
});

describe('PATCH /auth/v1/admin/users/:id/status', () => {
  it('returns 403 for non-admin', async () => {
    const res = await request(app)
      .patch('/auth/v1/admin/users/user-id-1/status')
      .set('Authorization', `Bearer ${makeToken()}`)
      .send({ status: 'frozen' });
    expect(res.status).toBe(403);
  });

  it('returns 404 for unknown user', async () => {
    (prisma.user.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await request(app)
      .patch('/auth/v1/admin/users/unknown-id/status')
      .set('Authorization', `Bearer ${makeAdminToken()}`)
      .send({ status: 'frozen' });

    expect(res.status).toBe(404);
  });

  it('freezes user and revokes tokens', async () => {
    const frozenUser = { ...activeUser, status: 'frozen' };
    // First call: findByIdIncludeDeleted, second call: findById after update
    (prisma.user.findUnique as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce(activeUser)
      .mockResolvedValueOnce(frozenUser);
    (prisma.refreshToken.updateMany as ReturnType<typeof vi.fn>).mockResolvedValue({ count: 1 });
    (prisma.user.update as ReturnType<typeof vi.fn>).mockResolvedValue(frozenUser);

    const res = await request(app)
      .patch('/auth/v1/admin/users/user-id-1/status')
      .set('Authorization', `Bearer ${makeAdminToken()}`)
      .send({ status: 'frozen' });

    expect(res.status).toBe(200);
    expect(res.body.data.user.status).toBe('frozen');
  });

  it('returns 422 for invalid status value', async () => {
    const res = await request(app)
      .patch('/auth/v1/admin/users/user-id-1/status')
      .set('Authorization', `Bearer ${makeAdminToken()}`)
      .send({ status: 'banned' });
    expect(res.status).toBe(422);
  });
});
