import { Queue } from 'bullmq';
import { getRedis } from '../lib/redis';

export interface CsvImportJobData {
  importId: string;
  workerId: string;
  storageKey: string;
}

export const csvImportQueue = new Queue<CsvImportJobData>('csv-import', {
  connection: getRedis(),
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5_000 },
    removeOnComplete: 50,
    removeOnFail: 200,
  },
});
