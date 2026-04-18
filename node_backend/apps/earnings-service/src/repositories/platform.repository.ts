import { prisma } from '../lib/prisma';

export const platformRepository = {
  async findAll() {
    return prisma.platform.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
  },

  async findAllAdmin() {
    return prisma.platform.findMany({ orderBy: { name: 'asc' } });
  },

  async findById(id: string) {
    return prisma.platform.findUnique({ where: { id } });
  },

  async findBySlug(slug: string) {
    return prisma.platform.findFirst({ where: { slug } });
  },

  async findByName(name: string) {
    return prisma.platform.findFirst({ where: { name } });
  },

  async create(data: { name: string; slug: string; logoUrl?: string }) {
    return prisma.platform.create({ data: { id: crypto.randomUUID(), ...data } });
  },

  async update(id: string, data: Partial<{ name: string; slug: string; logoUrl: string | null; active: boolean }>) {
    return prisma.platform.update({ where: { id }, data });
  },
};
