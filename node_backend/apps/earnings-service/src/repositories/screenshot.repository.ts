import { prisma } from '../lib/prisma';

export const screenshotRepository = {
  async create(data: {
    shiftId: string;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
  }) {
    return prisma.screenshot.create({ data });
  },

  async findByShiftId(shiftId: string) {
    return prisma.screenshot.findMany({
      where: { shiftId, deletedAt: null },
      orderBy: { uploadedAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.screenshot.findUnique({ where: { id } });
  },

  async softDelete(id: string) {
    return prisma.screenshot.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};
