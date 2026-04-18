import { prisma } from '../lib/prisma';

export const cityZoneRepository = {
  async findAll() {
    return prisma.cityZone.findMany({
      where: { active: true },
      orderBy: [{ city: 'asc' }, { zone: 'asc' }],
    });
  },

  async findById(id: string) {
    return prisma.cityZone.findUnique({ where: { id } });
  },
};
