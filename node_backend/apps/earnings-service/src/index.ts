import 'dotenv/config';
import { buildApp } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { startCsvImportWorker } from './workers/csvImport.worker';

const app = buildApp();

startCsvImportWorker();

const server = app.listen(env.PORT, () => {
  logger.info(
    { service: 'earnings-service', port: env.PORT, env: env.NODE_ENV },
    'Earnings service started',
  );
  logger.info(`  → API docs: http://localhost:${env.PORT}/docs`);
  logger.info(`  → Health:   http://localhost:${env.PORT}/health`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received — shutting down earnings service');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  logger.info('SIGINT received — shutting down earnings service');
  server.close(() => process.exit(0));
});
