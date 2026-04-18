import { getPrisma } from '../lib/prisma';
import type { ComplaintStatus, ComplaintVisibility } from '@prisma/client';

const prisma = getPrisma();

export interface ListComplaintsOpts {
  page: number;
  limit: number;
  platform?: string;
  category?: string;
  status?: ComplaintStatus;
  tag?: string;
}

export const complaintRepository = {
  async create(data: {
    authorId: string;
    platform: string;
    category: string;
    title: string;
    description: string;
    visibility: ComplaintVisibility;
  }) {
    return prisma.complaint.create({ data });
  },

  async list(opts: ListComplaintsOpts) {
    const { page, limit, platform, category, status, tag } = opts;
    const where: Record<string, unknown> = {
      deletedAt: null,
      status: { not: 'hidden' },
    };
    if (platform) where['platform'] = platform;
    if (category) where['category'] = category;
    if (status) where['status'] = status;
    if (tag) {
      where['tags'] = { some: { label: tag } };
    }

    const [rows, total] = await Promise.all([
      prisma.complaint.findMany({
        where: where as never,
        include: { tags: true, _count: { select: { comments: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.complaint.count({ where: where as never }),
    ]);

    return { rows, total };
  },

  async findById(id: string) {
    return prisma.complaint.findFirst({
      where: { id, deletedAt: null },
      include: {
        tags: true,
        comments: { where: { deletedAt: null }, orderBy: { createdAt: 'asc' } },
        _count: { select: { reports: true } },
      },
    });
  },

  async update(id: string, data: { title?: string; description?: string; visibility?: ComplaintVisibility }) {
    return prisma.complaint.update({ where: { id }, data });
  },

  async updateStatus(id: string, status: ComplaintStatus) {
    return prisma.complaint.update({ where: { id }, data: { status } });
  },

  async softDelete(id: string) {
    return prisma.complaint.update({ where: { id }, data: { deletedAt: new Date() } });
  },

  async addTag(complaintId: string, label: string, addedBy: string) {
    return prisma.complaintTag.create({ data: { complaintId, label, addedBy } });
  },

  async removeTag(tagId: string, complaintId: string) {
    return prisma.complaintTag.deleteMany({ where: { id: tagId, complaintId } });
  },

  async addComment(complaintId: string, authorId: string, body: string) {
    return prisma.comment.create({ data: { complaintId, authorId, body } });
  },

  async addReport(complaintId: string, reporterId: string, reason: string) {
    return prisma.report.create({ data: { complaintId, reporterId, reason } });
  },

  async findAllForTfidf() {
    return prisma.complaint.findMany({
      where: { deletedAt: null, status: { not: 'hidden' } },
      select: { id: true, title: true, description: true },
    });
  },
};
