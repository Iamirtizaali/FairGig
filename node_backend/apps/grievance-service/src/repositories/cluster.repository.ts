import { getPrisma } from '../lib/prisma';

const prisma = getPrisma();

export const clusterRepository = {
  async create(data: { title: string; description?: string; createdBy: string }) {
    return prisma.cluster.create({ data });
  },

  async findById(id: string) {
    return prisma.cluster.findUnique({
      where: { id },
      include: { complaints: { where: { deletedAt: null }, select: { id: true, title: true, status: true } } },
    });
  },

  async list(page: number, limit: number) {
    const [rows, total] = await Promise.all([
      prisma.cluster.findMany({
        include: { _count: { select: { complaints: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.cluster.count(),
    ]);
    return { rows, total };
  },

  async attachComplaints(clusterId: string, complaintIds: string[]) {
    return prisma.complaint.updateMany({
      where: { id: { in: complaintIds }, deletedAt: null },
      data: { clusterId },
    });
  },
};
