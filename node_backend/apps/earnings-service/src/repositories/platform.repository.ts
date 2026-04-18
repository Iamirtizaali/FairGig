import { prisma } from '../lib/prisma';

export const platformRepository = {
  async findAll() {
    return prisma.platform.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
  },

  async findById(id: string) {
    return prisma.platform.findUnique({ where: { id } });
  },
};
