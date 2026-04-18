import { getPrisma } from '../lib/prisma';
import { env } from '../config/env';

const prisma = getPrisma();

export const certificateRepository = {
  async create(data: {
    workerId: string;
    periodStart: Date;
    periodEnd: Date;
    ttlDays?: number;
  }) {
    const ttl = data.ttlDays ?? env.CERT_SHARE_TTL_DAYS;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ttl);

    return prisma.certificate.create({
      data: {
        workerId: data.workerId,
        periodStart: data.periodStart,
        periodEnd: data.periodEnd,
        expiresAt,
      },
    });
  },

  async findByToken(shareToken: string) {
    return prisma.certificate.findUnique({ where: { shareToken } });
  },

  async findByWorker(workerId: string) {
    return prisma.certificate.findMany({
      where: { workerId, revokedAt: null },
      orderBy: { issuedAt: 'desc' },
    });
  },

  async revoke(shareToken: string, workerId: string) {
    return prisma.certificate.updateMany({
      where: { shareToken, workerId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },

  async getVerifiedShifts(workerId: string, from: Date, to: Date) {
    return prisma.shift.findMany({
      where: {
        workerId,
        verificationStatus: 'verified',
        shiftDate: { gte: from, lte: to },
        deletedAt: null,
      },
      include: { platform: true },
      orderBy: { shiftDate: 'asc' },
    });
  },
};
