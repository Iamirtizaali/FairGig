import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { buildApp } from '../src/app';

// ── Mock Prisma ───────────────────────────────────────────────────────────────
const mockPrismaClient = vi.hoisted(() => ({
  shift: {
    create: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    count: vi.fn(),
  },
  platform: {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  cityZone: {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  screenshot: {
    create: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
  },
  verification: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
  anomalyFlag: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
  auditEvent: {
    create: vi.fn(),
  },
  notification: {
    create: vi.fn(),
  },
  $queryRaw: vi.fn(),
  $transaction: vi.fn(),
}));

vi.mock('../src/lib/prisma', () => ({
  prisma: mockPrismaClient,
  getPrisma: () => mockPrismaClient,
}));

// ── Suppress external integrations ───────────────────────────────────────────
vi.mock('../src/integrations/storage', () => ({
  getPresignedUploadUrl: vi.fn().mockResolvedValue({ url: 'https://presign.example.com/put', key: 'key/123' }),
  getSignedViewUrl: vi.fn().mockResolvedValue('https://presign.example.com/get/key/123'),
  deleteObject: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../src/integrations/anomalyClient', () => ({
  detectAnomalies: vi.fn().mockResolvedValue([]),
}));

vi.mock('../src/lib/redis', () => ({
  getRedis: vi.fn().mockReturnValue(null),
  sendRedisCommand: vi.fn(),
}));

vi.mock('../src/queues/csvImport.queue', () => ({
  enqueueImport: vi.fn().mockResolvedValue('job-123'),
}));

import { workerToken, verifierToken, adminToken } from './helpers/token';

// alias so test bodies can reference mock functions cleanly
const prisma = mockPrismaClient;

const app = buildApp();

const fakePlatform = {
  id: 'platform-id-1',
  name: 'Uber',
  slug: 'uber',
  logoUrl: null,
  active: true,
  createdAt: new Date(),
};

const fakeShift = {
  id: 'shift-id-1',
  workerId: 'worker-id-1',
  platformId: 'platform-id-1',
  cityZoneId: null,
  shiftDate: new Date('2026-04-01'),
  hoursWorked: 8,
  grossPay: 2000,
  deductions: 200,
  netPay: 1800,
  currency: 'PKR',
  source: 'manual',
  verificationStatus: 'self_attested',
  notes: null,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  platform: fakePlatform,
  cityZone: null,
  screenshots: [],
  verifications: [],
  anomalyFlags: [],
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
  });
});

// ─── Platforms ────────────────────────────────────────────────────────────────

describe('GET /earnings/v1/platforms', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/earnings/v1/platforms');
    expect(res.status).toBe(401);
  });

  it('returns platform list with valid token', async () => {
    (prisma.platform.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([fakePlatform]);

    const res = await request(app)
      .get('/earnings/v1/platforms')
      .set('Authorization', `Bearer ${workerToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.data.platforms).toHaveLength(1);
    expect(res.body.data.platforms[0].name).toBe('Uber');
  });
});

describe('GET /earnings/v1/city-zones', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/earnings/v1/city-zones');
    expect(res.status).toBe(401);
  });

  it('returns zone list with valid token', async () => {
    (prisma.cityZone.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([
      { id: 'zone-1', city: 'Lahore', zone: 'Gulberg', active: true, createdAt: new Date() },
    ]);

    const res = await request(app)
      .get('/earnings/v1/city-zones')
      .set('Authorization', `Bearer ${workerToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.data.zones).toHaveLength(1);
  });
});

// ─── Shifts CRUD ─────────────────────────────────────────────────────────────

describe('POST /earnings/v1/shifts', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).post('/earnings/v1/shifts').send({});
    expect(res.status).toBe(401);
  });

  it('returns 422 for invalid body', async () => {
    const res = await request(app)
      .post('/earnings/v1/shifts')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({ platformId: 'platform-id-1' });
    expect(res.status).toBe(422);
  });

  it('creates a shift and returns 201', async () => {
    (prisma.platform.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(fakePlatform);
    (prisma.shift.create as ReturnType<typeof vi.fn>).mockResolvedValue(fakeShift);

    const res = await request(app)
      .post('/earnings/v1/shifts')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({
        platformId: 'platform-id-1',
        shiftDate: '2026-04-01',
        hoursWorked: 8,
        grossPay: 2000,
        deductions: 200,
        netPay: 1800,
        currency: 'PKR',
      });

    expect(res.status).toBe(201);
    expect(res.body.data.shift.id).toBe('shift-id-1');
  });
});

describe('GET /earnings/v1/shifts', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/earnings/v1/shifts');
    expect(res.status).toBe(401);
  });

  it('returns worker shifts', async () => {
    (prisma.shift.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([fakeShift]);
    (prisma.shift.count as ReturnType<typeof vi.fn>).mockResolvedValue(1);

    const res = await request(app)
      .get('/earnings/v1/shifts')
      .set('Authorization', `Bearer ${workerToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.data.shifts).toHaveLength(1);
    expect(res.body.meta.total).toBe(1);
  });
});

describe('GET /earnings/v1/shifts/:id', () => {
  it('returns 404 for unknown shift', async () => {
    (prisma.shift.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await request(app)
      .get('/earnings/v1/shifts/unknown-id')
      .set('Authorization', `Bearer ${workerToken()}`);

    expect(res.status).toBe(404);
  });

  it('returns shift for owner', async () => {
    (prisma.shift.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(fakeShift);

    const res = await request(app)
      .get('/earnings/v1/shifts/shift-id-1')
      .set('Authorization', `Bearer ${workerToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.data.shift.id).toBe('shift-id-1');
  });
});

describe('PATCH /earnings/v1/shifts/:id', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).patch('/earnings/v1/shifts/shift-id-1').send({});
    expect(res.status).toBe(401);
  });

  it('returns 403 when another worker tries to edit', async () => {
    const otherWorkerShift = { ...fakeShift, workerId: 'other-worker-id' };
    (prisma.shift.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(otherWorkerShift);

    const res = await request(app)
      .patch('/earnings/v1/shifts/shift-id-1')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({ notes: 'edited' });

    expect(res.status).toBe(403);
  });
});

describe('DELETE /earnings/v1/shifts/:id', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).delete('/earnings/v1/shifts/shift-id-1');
    expect(res.status).toBe(401);
  });

  it('returns 404 for unknown shift', async () => {
    (prisma.shift.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await request(app)
      .delete('/earnings/v1/shifts/unknown-id')
      .set('Authorization', `Bearer ${workerToken()}`);

    expect(res.status).toBe(404);
  });
});

// ─── Verification queue ───────────────────────────────────────────────────────

describe('GET /earnings/v1/verification/queue', () => {
  it('returns 403 for worker', async () => {
    const res = await request(app)
      .get('/earnings/v1/verification/queue')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(403);
  });

  it('returns queue for verifier', async () => {
    (prisma.$queryRaw as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const res = await request(app)
      .get('/earnings/v1/verification/queue')
      .set('Authorization', `Bearer ${verifierToken()}`);

    expect(res.status).toBe(200);
  });
});

// ─── Admin: platforms CRUD ────────────────────────────────────────────────────

describe('GET /earnings/v1/admin/platforms', () => {
  it('returns 403 for non-admin', async () => {
    const res = await request(app)
      .get('/earnings/v1/admin/platforms')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(403);
  });

  it('returns all platforms for admin', async () => {
    (prisma.platform.findMany as ReturnType<typeof vi.fn>).mockResolvedValue([fakePlatform]);

    const res = await request(app)
      .get('/earnings/v1/admin/platforms')
      .set('Authorization', `Bearer ${adminToken()}`);

    expect(res.status).toBe(200);
    expect(res.body.data.platforms).toHaveLength(1);
  });
});

describe('POST /earnings/v1/admin/platforms', () => {
  it('returns 403 for non-admin', async () => {
    const res = await request(app)
      .post('/earnings/v1/admin/platforms')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({ name: 'Test', slug: 'test' });
    expect(res.status).toBe(403);
  });

  it('returns 409 on duplicate name', async () => {
    (prisma.platform.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(fakePlatform);

    const res = await request(app)
      .post('/earnings/v1/admin/platforms')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: 'Uber', slug: 'uber' });

    expect(res.status).toBe(409);
  });

  it('creates platform for admin', async () => {
    (prisma.platform.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (prisma.platform.create as ReturnType<typeof vi.fn>).mockResolvedValue({
      ...fakePlatform,
      id: 'platform-new',
      name: 'NewApp',
      slug: 'newapp',
    });

    const res = await request(app)
      .post('/earnings/v1/admin/platforms')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: 'NewApp', slug: 'newapp' });

    expect(res.status).toBe(201);
    expect(res.body.data.platform.name).toBe('NewApp');
  });

  it('returns 422 for invalid slug format', async () => {
    const res = await request(app)
      .post('/earnings/v1/admin/platforms')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ name: 'Bad Slug', slug: 'Bad Slug!' });

    expect(res.status).toBe(422);
  });
});

describe('PATCH /earnings/v1/admin/platforms/:id', () => {
  it('returns 404 for unknown platform', async () => {
    (prisma.platform.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(null);

    const res = await request(app)
      .patch('/earnings/v1/admin/platforms/unknown-id')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ active: false });

    expect(res.status).toBe(404);
  });

  it('updates platform for admin', async () => {
    (prisma.platform.findUnique as ReturnType<typeof vi.fn>).mockResolvedValue(fakePlatform);
    (prisma.platform.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (prisma.platform.update as ReturnType<typeof vi.fn>).mockResolvedValue({ ...fakePlatform, active: false });

    const res = await request(app)
      .patch('/earnings/v1/admin/platforms/platform-id-1')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ active: false });

    expect(res.status).toBe(200);
  });
});

// ─── Admin: city zones ────────────────────────────────────────────────────────

describe('POST /earnings/v1/admin/city-zones', () => {
  it('returns 409 on duplicate city/zone', async () => {
    (prisma.cityZone.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: 'zone-1', city: 'Lahore', zone: 'Gulberg',
    });

    const res = await request(app)
      .post('/earnings/v1/admin/city-zones')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ city: 'Lahore', zone: 'Gulberg' });

    expect(res.status).toBe(409);
  });

  it('creates city zone', async () => {
    (prisma.cityZone.findFirst as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    (prisma.cityZone.create as ReturnType<typeof vi.fn>).mockResolvedValue({
      id: 'zone-new', city: 'Karachi', zone: 'Clifton', active: true, createdAt: new Date(),
    });

    const res = await request(app)
      .post('/earnings/v1/admin/city-zones')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({ city: 'Karachi', zone: 'Clifton' });

    expect(res.status).toBe(201);
    expect(res.body.data.cityZone.city).toBe('Karachi');
  });
});
