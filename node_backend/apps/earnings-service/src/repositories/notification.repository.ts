import { getPrisma } from '../lib/prisma';

const prisma = getPrisma();

export const notificationRepository = {
  async create(data: { userId: string; title: string; body: string; link?: string }) {
    return prisma.notification.create({ data });
  },

  async listForUser(userId: string, limit = 30) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  async markRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { readAt: new Date() },
    });
  },
};
