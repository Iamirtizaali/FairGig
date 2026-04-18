/**
 * Nightly cleanup: expire old refresh tokens and used password-reset tokens.
 * Intended to run as a Render Cron Job: `node -e "require('./dist/jobs/cleanup')"`.
 */
import { prisma } from '../lib/prisma';
import { logger } from '../utils/logger';

async function run(): Promise<void> {
  const now = new Date();

  const [rt, prt] = await Promise.all([
    prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: now } },
    }),
    prisma.passwordResetToken.deleteMany({
      where: { OR: [{ expiresAt: { lt: now } }, { usedAt: { not: null } }] },
    }),
  ]);

  logger.info(
    { deletedRefreshTokens: rt.count, deletedPasswordResetTokens: prt.count },
    'Auth cleanup completed',
  );
}

run()
  .catch((err) => {
    logger.error(err, 'Auth cleanup failed');
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
