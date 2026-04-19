import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis.__prisma ??
  new PrismaClient({
    log: [
      { level: 'error', emit: 'event' },
      { level: 'warn', emit: 'event' },
    ],
  });

(prisma as any).$on('error', (e: unknown) => logger.error(e, 'Prisma error'));
(prisma as any).$on('warn', (e: unknown) => logger.warn(e, 'Prisma warning'));

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}
