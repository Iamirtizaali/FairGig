/**
 * Nightly cleanup: expire old certificate shares.
 * Run as a Render Cron Job: `node -e "require('./dist/jobs/cleanup')"`.
 */
import { prisma } from '../lib/prisma';
import { logger } from '../utils/logger';

async function run(): Promise<void> {
  const now = new Date();

  const result = await prisma.certificate.updateMany({
    where: {
      expiresAt: { lt: now },
      revokedAt: null,
    },
    data: { revokedAt: now },
  });

  logger.info({ expiredCertificates: result.count }, 'Certificate cleanup completed');
}

run()
  .catch((err) => {
    logger.error(err, 'Certificate cleanup failed');
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
