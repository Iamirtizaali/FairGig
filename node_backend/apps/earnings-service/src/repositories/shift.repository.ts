import { prisma } from '../lib/prisma';
import { CreateShiftInput, UpdateShiftInput } from '../validators/shift.schema';

type Role = 'worker' | 'verifier' | 'advocate' | 'admin';

export interface ListShiftsOpts {
  page: number;
  limit: number;
  platformId?: string;
  from?: string;
  to?: string;
  verificationStatus?: string;
}

export const shiftRepository = {
  async create(data: CreateShiftInput & { workerId: string }) {
    return prisma.shift.create({
      data: {
        workerId: data.workerId,
        platformId: data.platformId,
        cityZoneId: data.cityZoneId ?? null,
        shiftDate: new Date(data.shiftDate),
        hoursWorked: data.hoursWorked,
        grossPay: data.grossPay,
        deductions: data.deductions,
        netPay: data.netPay,
        currency: data.currency,
        notes: data.notes ?? null,
      },
      include: { platform: true, cityZone: true },
    });
  },

  async list(opts: ListShiftsOpts, role: Role, userId: string) {
    const where: Record<string, unknown> = { deletedAt: null };

    if (role === 'worker') {
      where['workerId'] = userId;
    } else if (role === 'verifier') {
      where['verificationStatus'] = 'pending_review';
    }
    // advocate and admin see all

    if (opts.platformId) where['platformId'] = opts.platformId;
    if (opts.verificationStatus) where['verificationStatus'] = opts.verificationStatus;
    if (opts.from || opts.to) {
      const dateFilter: Record<string, Date> = {};
      if (opts.from) dateFilter['gte'] = new Date(opts.from);
      if (opts.to) dateFilter['lte'] = new Date(opts.to);
      where['shiftDate'] = dateFilter;
    }

    const [shifts, total] = await Promise.all([
      prisma.shift.findMany({
        where: where as Parameters<typeof prisma.shift.findMany>[0]['where'],
        include: {
          platform: { select: { id: true, name: true, slug: true, logoUrl: true } },
          cityZone: { select: { id: true, city: true, zone: true } },
        },
        skip: (opts.page - 1) * opts.limit,
        take: opts.limit,
        orderBy: { shiftDate: 'desc' },
      }),
      prisma.shift.count({ where: where as Parameters<typeof prisma.shift.count>[0]['where'] }),
    ]);

    return { shifts, total };
  },

  async findById(id: string) {
    return prisma.shift.findUnique({
      where: { id, deletedAt: null },
      include: {
        platform: true,
        cityZone: true,
        screenshots: { where: { deletedAt: null }, orderBy: { uploadedAt: 'desc' } },
        verifications: { orderBy: { createdAt: 'desc' } },
        anomalyFlags: { where: { resolvedAt: null }, orderBy: { createdAt: 'desc' } },
      },
    });
  },

  async update(id: string, data: UpdateShiftInput) {
    const updateData: Record<string, unknown> = { ...data };
    if (data.shiftDate) updateData['shiftDate'] = new Date(data.shiftDate);
    return prisma.shift.update({
      where: { id },
      data: updateData as Parameters<typeof prisma.shift.update>[0]['data'],
      include: { platform: true, cityZone: true },
    });
  },

  async softDelete(id: string) {
    return prisma.shift.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  async updateVerificationStatus(id: string, status: string) {
    return prisma.shift.update({
      where: { id },
      data: { verificationStatus: status as Parameters<typeof prisma.shift.update>[0]['data']['verificationStatus'] },
    });
  },

  async findRecentForWorker(workerId: string, days: number) {
    const since = new Date();
    since.setDate(since.getDate() - days);
    return prisma.shift.findMany({
      where: { workerId, deletedAt: null, shiftDate: { gte: since } },
      include: { platform: true },
      orderBy: { shiftDate: 'asc' },
    });
  },
};
