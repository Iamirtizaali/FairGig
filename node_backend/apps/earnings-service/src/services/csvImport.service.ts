import path from 'path';
import fs from 'fs';
import { csvImportRepository } from '../repositories/csvImport.repository';
import { csvImportQueue } from '../queues/csvImport.queue';
import { uploadCsvToStorage } from '../integrations/storage';
import { NotFoundError } from '../utils/errors';

export async function startCsvImport(workerId: string, filePath: string, originalName: string) {
  // Upload the raw CSV to Supabase storage first
  const storageKey = `csv-imports/${workerId}/${Date.now()}-${originalName}`;
  const fileBuffer = fs.readFileSync(filePath);
  await uploadCsvToStorage(storageKey, fileBuffer);

  // Clean up temp file
  fs.unlink(filePath, () => {});

  // Create import record
  const record = await csvImportRepository.create({ workerId, storageKey });

  // Enqueue processing job
  const job = await csvImportQueue.add('csv-import', {
    importId: record.id,
    workerId,
    storageKey,
  });

  // Persist jobId
  await csvImportRepository.updateStatus(record.id, {
    status: 'queued',
    jobId: job.id ?? undefined,
  });

  return { importId: record.id, jobId: job.id };
}

export async function getCsvImportStatus(importId: string, workerId: string) {
  const record = await csvImportRepository.findById(importId);
  if (!record || record.workerId !== workerId) throw new NotFoundError('Import');
  return record;
}
