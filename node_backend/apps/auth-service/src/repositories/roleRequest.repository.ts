import { prisma } from '../lib/prisma';
import { Role, RequestStatus } from '../generated/prisma';

export const roleRequestRepository = {
  async create(data: { userId: string; requestedRole: Role; reason?: string }) {
    return prisma.roleRequest.create({ data });
  },

  async findPendingByUser(userId: string, requestedRole: Role) {
    return prisma.roleRequest.findFirst({
      where: { userId, requestedRole, status: 'pending' },
    });
  },

  async findById(id: string) {
    return prisma.roleRequest.findUnique({
      where: { id },
      include: { user: true },
    });
  },

  async list(opts: { status?: RequestStatus; page: number; limit: number }) {
    const where = opts.status ? { status: opts.status } : {};
    const [requests, total] = await Promise.all([
      prisma.roleRequest.findMany({
        where,
        include: { user: { select: { id: true, name: true, email: true, role: true } } },
        skip: (opts.page - 1) * opts.limit,
        take: opts.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.roleRequest.count({ where }),
    ]);
    return { requests, total };
  },

  async decide(id: string, status: 'approved' | 'rejected', decidedBy: string) {
    return prisma.roleRequest.update({
      where: { id },
      data: { status, decidedBy, decidedAt: new Date() },
    });
  },
};
