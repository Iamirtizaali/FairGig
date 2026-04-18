import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { buildApp } from '../src/app';

// ── Mock Prisma ───────────────────────────────────────────────────────────────
const mockPrisma = vi.hoisted(() => ({
  complaint: {
    create: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    count: vi.fn(),
  },
  complaintTag: {
    create: vi.fn(),
    deleteMany: vi.fn(),
  },
  cluster: {
    create: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
  },
  comment: {
    create: vi.fn(),
  },
  report: {
    create: vi.fn(),
    findMany: vi.fn(),
    count: vi.fn(),
    update: vi.fn(),
  },
  auditEvent: {
    create: vi.fn(),
  },
}));

vi.mock('../src/lib/prisma', () => ({
  getPrisma: vi.fn(() => mockPrisma),
  prisma: mockPrisma,
}));

vi.mock('../src/middleware/rateLimiter', () => ({
  defaultRateLimit: (_req: unknown, _res: unknown, next: () => void) => next(),
}));

import jwt from 'jsonwebtoken';

const SECRET = 'test-secret-that-is-at-least-32-chars-long-for-validation';
function makeToken(role = 'worker', sub = 'worker-id-1') {
  return jwt.sign({ sub, email: 'test@example.com', role }, SECRET, { expiresIn: '1h' });
}
const workerToken = () => makeToken('worker');
const advocateToken = () => makeToken('advocate', 'advocate-id-1');
const adminToken = () => makeToken('admin', 'admin-id-1');

const app = buildApp();

const fakeComplaint = {
  id: 'complaint-id-1',
  authorId: 'worker-id-1',
  platform: 'Uber',
  category: 'deductions',
  title: 'Unfair deduction',
  description: 'Platform deducted too much',
  visibility: 'public_anon',
  status: 'open',
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [],
  comments: [],
  _count: { reports: 0, comments: 0 },
};

beforeEach(() => {
  vi.clearAllMocks();
  mockPrisma.auditEvent.create.mockResolvedValue({});
});

// ─── Health ───────────────────────────────────────────────────────────────────

describe('GET /health', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
});

// ─── Public bulletin board ────────────────────────────────────────────────────

describe('GET /grievance/v1/board', () => {
  it('is publicly accessible without auth', async () => {
    mockPrisma.complaint.findMany.mockResolvedValue([fakeComplaint]);
    mockPrisma.complaint.count.mockResolvedValue(1);

    const res = await request(app).get('/grievance/v1/board');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.complaints)).toBe(true);
  });

  it('anonymises authorId', async () => {
    mockPrisma.complaint.findMany.mockResolvedValue([fakeComplaint]);
    mockPrisma.complaint.count.mockResolvedValue(1);

    const res = await request(app).get('/grievance/v1/board');
    expect(res.status).toBe(200);
    const first = res.body.data.complaints?.[0];
    if (first) {
      expect(first.authorId).toBeUndefined();
    }
  });
});

// ─── Create complaint ─────────────────────────────────────────────────────────

describe('POST /grievance/v1/complaints', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).post('/grievance/v1/complaints').send({
      platform: 'Uber',
      category: 'deductions',
      title: 'Test',
      description: 'Test description',
      visibility: 'public_anon',
    });
    expect(res.status).toBe(401);
  });

  it('returns 422 for missing fields', async () => {
    const res = await request(app)
      .post('/grievance/v1/complaints')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({ platform: 'Uber' });
    expect(res.status).toBe(422);
  });

  it('creates complaint for worker', async () => {
    mockPrisma.complaint.create.mockResolvedValue(fakeComplaint);

    const res = await request(app)
      .post('/grievance/v1/complaints')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({
        platform: 'Uber',
        category: 'deductions',
        title: 'Unfair deduction',
        description: 'Platform deducted too much this week',
        visibility: 'public_anon',
      });

    expect(res.status).toBe(201);
    expect(res.body.data.complaint.id).toBe('complaint-id-1');
  });
});

// ─── List complaints ──────────────────────────────────────────────────────────

describe('GET /grievance/v1/complaints', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/grievance/v1/complaints');
    expect(res.status).toBe(401);
  });

  it('returns complaints with valid token', async () => {
    mockPrisma.complaint.findMany.mockResolvedValue([fakeComplaint]);
    mockPrisma.complaint.count.mockResolvedValue(1);

    const res = await request(app)
      .get('/grievance/v1/complaints')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.data.complaints).toHaveLength(1);
  });

  it('filters by platform', async () => {
    mockPrisma.complaint.findMany.mockResolvedValue([]);
    mockPrisma.complaint.count.mockResolvedValue(0);

    const res = await request(app)
      .get('/grievance/v1/complaints?platform=Careem')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(200);
  });
});

// ─── Get complaint ────────────────────────────────────────────────────────────

describe('GET /grievance/v1/complaints/:id', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/grievance/v1/complaints/unknown-id');
    expect(res.status).toBe(401);
  });

  it('returns 404 for unknown complaint', async () => {
    mockPrisma.complaint.findFirst.mockResolvedValue(null);

    const res = await request(app)
      .get('/grievance/v1/complaints/unknown-id')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(404);
  });

  it('returns complaint data', async () => {
    mockPrisma.complaint.findFirst.mockResolvedValue(fakeComplaint);

    const res = await request(app)
      .get('/grievance/v1/complaints/complaint-id-1')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(200);
    expect(res.body.data.complaint.id).toBe('complaint-id-1');
  });
});

// ─── Update complaint status ──────────────────────────────────────────────────

describe('PATCH /grievance/v1/complaints/:id/status', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app)
      .patch('/grievance/v1/complaints/complaint-id-1/status')
      .send({ status: 'resolved' });
    expect(res.status).toBe(401);
  });

  it('returns 403 for worker trying to escalate', async () => {
    const res = await request(app)
      .patch('/grievance/v1/complaints/complaint-id-1/status')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({ status: 'escalated' });
    expect(res.status).toBe(403);
  });

  it('allows advocate to change status', async () => {
    mockPrisma.complaint.findFirst.mockResolvedValue(fakeComplaint);
    mockPrisma.complaint.update.mockResolvedValue({ ...fakeComplaint, status: 'resolved' });

    const res = await request(app)
      .patch('/grievance/v1/complaints/complaint-id-1/status')
      .set('Authorization', `Bearer ${advocateToken()}`)
      .send({ status: 'resolved' });

    expect(res.status).toBe(200);
  });
});

// ─── Tags ─────────────────────────────────────────────────────────────────────

describe('POST /grievance/v1/complaints/:id/tags', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app)
      .post('/grievance/v1/complaints/complaint-id-1/tags')
      .send({ label: 'test-tag' });
    expect(res.status).toBe(401);
  });

  it('adds tag for advocate', async () => {
    mockPrisma.complaint.findFirst.mockResolvedValue(fakeComplaint);
    mockPrisma.complaintTag.create.mockResolvedValue({
      id: 'tag-1', complaintId: 'complaint-id-1', label: 'test-tag', addedBy: 'advocate-id-1',
    });

    const res = await request(app)
      .post('/grievance/v1/complaints/complaint-id-1/tags')
      .set('Authorization', `Bearer ${advocateToken()}`)
      .send({ label: 'test-tag' });

    expect(res.status).toBe(201);
  });
});

// ─── Comments ─────────────────────────────────────────────────────────────────

describe('POST /grievance/v1/complaints/:id/comments', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app)
      .post('/grievance/v1/complaints/complaint-id-1/comments')
      .send({ body: 'This is a comment' });
    expect(res.status).toBe(401);
  });

  it('adds comment for authenticated user', async () => {
    mockPrisma.complaint.findFirst.mockResolvedValue(fakeComplaint);
    mockPrisma.comment.create.mockResolvedValue({
      id: 'comment-1',
      complaintId: 'complaint-id-1',
      authorId: 'worker-id-1',
      body: 'This is a comment',
      deletedAt: null,
      createdAt: new Date(),
    });

    const res = await request(app)
      .post('/grievance/v1/complaints/complaint-id-1/comments')
      .set('Authorization', `Bearer ${workerToken()}`)
      .send({ body: 'This is a comment' });

    expect(res.status).toBe(201);
  });
});

// ─── Admin: reports ───────────────────────────────────────────────────────────

describe('GET /grievance/v1/admin/reports', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/grievance/v1/admin/reports');
    expect(res.status).toBe(401);
  });

  it('returns 403 for worker', async () => {
    const res = await request(app)
      .get('/grievance/v1/admin/reports')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(403);
  });

  it('returns reports for admin', async () => {
    mockPrisma.report.findMany.mockResolvedValue([]);
    mockPrisma.report.count.mockResolvedValue(0);

    const res = await request(app)
      .get('/grievance/v1/admin/reports')
      .set('Authorization', `Bearer ${adminToken()}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.reports)).toBe(true);
  });
});

describe('POST /grievance/v1/admin/reports/:id/resolve', () => {
  it('returns 403 for non-admin', async () => {
    const res = await request(app)
      .post('/grievance/v1/admin/reports/report-1/resolve')
      .set('Authorization', `Bearer ${workerToken()}`);
    expect(res.status).toBe(403);
  });
});
