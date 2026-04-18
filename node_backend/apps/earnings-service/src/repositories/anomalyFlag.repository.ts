import { prisma } from '../lib/prisma';

export const anomalyFlagRepository = {
  async createMany(
    flags: Array<{ shiftId: string; reason: string; score?: number | null }>,
  ) {
    return prisma.anomalyFlag.createMany({
      data: flags.map((f) => ({
        shiftId: f.shiftId,
        flaggedBy: 'anomaly-service',
        reason: f.reason,
        score: f.score ?? null,
      })),
    });
  },

  async findByShiftId(shiftId: string) {
    return prisma.anomalyFlag.findMany({
      where: { shiftId, resolvedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  },
};
