import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { buildApp } from '../src/app';

// ── Mock Prisma ───────────────────────────────────────────────────────────────
const mockDb = vi.hoisted(() => ({
  shift: { findMany: vi.fn(), findFirst: vi.fn() },
  platform: { findMany: vi.fn() },
  cityZone: { findMany: vi.fn() },
  certificate: { create: vi.fn(), findFirst: vi.fn(), findUnique: vi.fn(), update: vi.fn(), updateMany: vi.fn() },
  auditEvent: { create: vi.fn() },
}));

vi.mock('../src/lib/prisma', () => ({
  prisma: mockDb,
  getPrisma: () => mockDb,
}));

vi.mock('../src/middleware/rateLimiter', () => ({
  defaultRateLimit: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

import jwt from 'jsonwebtoken';
const prisma = mockDb;

const SECRET = 'test-secret-that-is-at-least-32-chars-long-for-validation';
function makeToken(role = 'worker', sub = 'worker-id-1') {
  return jwt.sign({ sub, email: 'worker@example.com', role }, SECRET, { expiresIn: '1h' });
}

const app = buildApp();

const fakeCert = {
  id: 'cert-id-1',
  workerId: 'worker-id-1',
  periodStart: new Date('2026-01-01'),
  periodEnd: new Date('2026-03-31'),
  shareToken: 'share-token-uuid',
  expiresAt: new Date(Date.now() + 14 * 86400000),
  revokedAt: null,
  issuedAt: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
  (prisma.auditEvent.create as ReturnType<typeof vi.fn>).mockResolvedValue({});
  (prisma.shift.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([]);
});

// ─── Health ───────────────────────────────────────────────────────────────────

describe('GET /health', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
});

// ─── Build certificate ────────────────────────────────────────────────────────

describe('GET /certificate/v1/build', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/certificate/v1/build?from=2026-01-01&to=2026-03-31');
    expect(res.status).toBe(401);
  });

  it('returns 403 for non-worker role', async () => {
    const res = await request(app)
      .get('/certificate/v1/build?from=2026-01-01&to=2026-03-31')
      .set('Authorization', `Bearer ${makeToken('verifier')}`);
    expect(res.status).toBe(403);
  });

  it('returns 422 when date range missing', async () => {
    const res = await request(app)
      .get('/certificate/v1/build')
      .set('Authorization', `Bearer ${makeToken()}`);
    expect(res.status).toBe(422);
  });

  it('returns certificate data for valid request', async () => {
    (prisma.shift.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const res = await request(app)
      .get('/certificate/v1/build?from=2026-01-01&to=2026-03-31')
      .set('Authorization', `Bearer ${makeToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});

// ─── Share certificate ────────────────────────────────────────────────────────

describe('POST /certificate/v1/share', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).post('/certificate/v1/share').send({
      from: '2026-01-01',
      to: '2026-03-31',
    });
    expect(res.status).toBe(401);
  });

  it('creates a share token', async () => {
    (prisma.certificate.create as ReturnType<typeof vi.fn>).mockResolvedValue(fakeCert);
    (prisma.shift.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const res = await request(app)
      .post('/certificate/v1/share')
      .set('Authorization', `Bearer ${makeToken()}`)
      .send({ from: '2026-01-01', to: '2026-03-31' });

    expect(res.status).toBe(201);
    expect(res.body.data.shareToken).toBeTruthy();
  });

  it('returns 422 for missing date range', async () => {
    const res = await request(app)
      .post('/certificate/v1/share')
      .set('Authorization', `Bearer ${makeToken()}`)
      .send({});
    expect(res.status).toBe(422);
  });
});

// ─── Public certificate ───────────────────────────────────────────────────────

describe('GET /certificate/v1/public/:signedId', () => {
  it('returns 404 for unknown token', async () => {
    (prisma.certificate.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await request(app).get('/certificate/v1/public/unknown-token');
    expect(res.status).toBe(404);
  });

  it('returns 410 for expired certificate', async () => {
    (prisma.certificate.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue({
      ...fakeCert,
      expiresAt: new Date(Date.now() - 1000),
    });

    const res = await request(app).get('/certificate/v1/public/share-token-uuid');
    expect(res.status).toBe(410);
  });

  it('returns 410 for revoked certificate', async () => {
    (prisma.certificate.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue({
      ...fakeCert,
      revokedAt: new Date(Date.now() - 1000),
    });

    const res = await request(app).get('/certificate/v1/public/share-token-uuid');
    expect(res.status).toBe(410);
  });

  it('returns certificate data for valid public token', async () => {
    (prisma.certificate.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(fakeCert);
    (prisma.shift.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const res = await request(app)
      .get('/certificate/v1/public/share-token-uuid')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
  });
});

// ─── Revoke certificate ───────────────────────────────────────────────────────

describe('POST /certificate/v1/:signedId/revoke', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).post('/certificate/v1/share-token-uuid/revoke');
    expect(res.status).toBe(401);
  });

  it('returns 404 for unknown token', async () => {
    (prisma.certificate.updateMany as ReturnType<typeof vi.fn>).mockResolvedValue({ count: 0 });

    const res = await request(app)
      .post('/certificate/v1/unknown-token/revoke')
      .set('Authorization', `Bearer ${makeToken()}`);

    expect(res.status).toBe(404);
  });

  it('revokes certificate for owner', async () => {
    (prisma.certificate.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(fakeCert);
    (prisma.certificate.updateMany as ReturnType<typeof vi.fn>).mockResolvedValue({ count: 1 });

    const res = await request(app)
      .post('/certificate/v1/share-token-uuid/revoke')
      .set('Authorization', `Bearer ${makeToken()}`);

    expect(res.status).toBe(200);
  });
});
