import { prisma } from '../lib/prisma';

export const cityZoneRepository = {
  async findAll() {
    return prisma.cityZone.findMany({
      where: { active: true },
      orderBy: [{ city: 'asc' }, { zone: 'asc' }],
    });
  },

  async findAllAdmin() {
    return prisma.cityZone.findMany({ orderBy: [{ city: 'asc' }, { zone: 'asc' }] });
  },

  async findById(id: string) {
    return prisma.cityZone.findUnique({ where: { id } });
  },

  async findByCityAndZone(city: string, zone: string) {
    return prisma.cityZone.findFirst({ where: { city, zone } });
  },

  async create(data: { city: string; zone: string }) {
    return prisma.cityZone.create({ data: { id: crypto.randomUUID(), ...data } });
  },

  async update(id: string, data: Partial<{ city: string; zone: string; active: boolean }>) {
    return prisma.cityZone.update({ where: { id }, data });
  },
};
