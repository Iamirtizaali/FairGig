import { prisma } from '../lib/prisma';
import { Role, UserStatus } from '../generated/prisma';

export type CreateUserInput = {
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role?: Role;
  cityZoneId?: string;
  categories?: string[];
};

export type UpdateUserInput = Partial<{
  name: string;
  language: 'en' | 'ur';
  categories: string[];
  cityZoneId: string | null;
  phone: string | null;
  passwordHash: string;
  role: Role;
  status: UserStatus;
  deletedAt: Date | null;
}>;

export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email: email.toLowerCase(), deletedAt: null },
    });
  },

  async findByIdIncludeDeleted(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async create(data: CreateUserInput) {
    return prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        categories: data.categories ?? [],
      },
    });
  },

  async update(id: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  },

  async softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'deleted', updatedAt: new Date() },
    });
  },

  async listActive(opts: { page: number; limit: number; role?: Role }) {
    const where = { deletedAt: null, ...(opts.role ? { role: opts.role } : {}) };
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (opts.page - 1) * opts.limit,
        take: opts.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);
    return { users, total };
  },

  async adminList(opts: {
    page: number;
    limit: number;
    role?: Role;
    status?: string;
    search?: string;
  }) {
    const where: Record<string, unknown> = { deletedAt: null };
    if (opts.role) where['role'] = opts.role;
    if (opts.status) where['status'] = opts.status;
    if (opts.search) {
      where['OR'] = [
        { email: { contains: opts.search, mode: 'insensitive' } },
        { name: { contains: opts.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: where as never,
        select: {
          id: true, email: true, name: true, role: true,
          status: true, language: true, phone: true,
          cityZoneId: true, categories: true, createdAt: true, updatedAt: true,
        },
        skip: (opts.page - 1) * opts.limit,
        take: opts.limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: where as never }),
    ]);
    return { users, total };
  },
};
