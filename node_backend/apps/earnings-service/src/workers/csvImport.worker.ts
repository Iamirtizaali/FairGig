import { Worker, Job } from 'bullmq';
import { getRedis } from '../lib/redis';
import { logger } from '../utils/logger';
import type { CsvImportJobData } from '../queues/csvImport.queue';

// Sprint 3 will implement the full CSV parsing logic.
// This scaffold picks up jobs and marks them as processed.

async function processCsvImport(job: Job<CsvImportJobData>): Promise<void> {
  const { importId, workerId, storageKey } = job.data;
  logger.info({ jobId: job.id, importId, workerId, storageKey }, 'csv-import job started — full implementation in Sprint 3');

  // TODO Sprint 3:
  //  1. Download CSV from Supabase Storage via storageKey
  //  2. Stream-parse with csv-parse
  //  3. Validate each row against createShiftSchema
  //  4. Batch-insert valid rows with prisma.shift.createMany
  //  5. Collect invalid rows → build error CSV → upload to Supabase
  //  6. Update csv_imports row with rowsOk, rowsFailed, status='done'

  // Placeholder — mark done immediately
  logger.info({ jobId: job.id, importId }, 'csv-import job completed (stub)');
}

export function startCsvImportWorker(): Worker<CsvImportJobData> {
  const worker = new Worker<CsvImportJobData>('csv-import', processCsvImport, {
    connection: getRedis(),
    concurrency: 2,
  });

  worker.on('completed', (job) =>
    logger.info({ jobId: job.id }, 'csv-import job completed'),
  );
  worker.on('failed', (job, err) =>
    logger.error({ jobId: job?.id, err }, 'csv-import job failed'),
  );

  return worker;
}
