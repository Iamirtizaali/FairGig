import { randomUUID } from 'crypto';
import { getRedis } from '../lib/redis';
import type { CsvImportJobData } from '../workers/csvImport.worker';

const queueKey = 'earnings:queue:csv-import';

export interface CsvImportJob {
  id: string;
  name: string;
  data: CsvImportJobData;
  createdAt: string;
}

export const csvImportQueue = {
  async add(name: string, data: CsvImportJobData) {
    const job: CsvImportJob = {
      id: randomUUID(),
      name,
      data,
      createdAt: new Date().toISOString(),
    };

    await getRedis().lpush(queueKey, JSON.stringify(job));

    return { id: job.id };
  },

  async pop(): Promise<CsvImportJob | null> {
    const raw = await getRedis().rpop<string | null>(queueKey);
    if (!raw) return null;

    return JSON.parse(raw) as CsvImportJob;
  },
};
