import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as { __prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.__prisma ?? new PrismaClient({ log: ['error', 'warn'] });

export function getPrisma(): PrismaClient {
  return prisma;
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma;
}
