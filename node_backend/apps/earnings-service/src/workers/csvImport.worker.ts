import { parse } from 'csv-parse';
import { Readable } from 'stream';
import { stringify } from 'csv-stringify/sync';
import { getPrisma } from '../lib/prisma';
import { logger } from '../utils/logger';
import { csvImportRepository } from '../repositories/csvImport.repository';
import { downloadFromStorage, uploadCsvToStorage } from '../integrations/storage';
import { notifyUser } from '../services/notification.service';
import { createShiftSchema } from '../validators/shift.schema';
import { csvImportQueue, type CsvImportJob } from '../queues/csvImport.queue';

export interface CsvImportJobData {
  importId:   string;
  workerId:   string;
  storageKey: string;
}

const prisma = getPrisma();
const BATCH_SIZE = 500;
const POLL_INTERVAL_MS = 1000;

let workerStarted = false;
let stopRequested = false;

interface CsvRow {
  platformId: string;
  cityZoneId?: string;
  shiftDate: string;
  hoursWorked: string;
  grossPay: string;
  deductions?: string;
  netPay: string;
  currency?: string;
  notes?: string;
}

interface ErrorRow extends CsvRow {
  _error: string;
  _row: number;
}

async function processCsvImport(job: CsvImportJob): Promise<void> {
  const { importId, workerId, storageKey } = job.data;
  logger.info({ jobId: job.id, importId }, 'csv-import job started');

  await csvImportRepository.updateStatus(importId, { status: 'processing', startedAt: new Date() });

  let rowsTotal = 0;
  let rowsOk = 0;
  const errorRows: ErrorRow[] = [];
  const validBatch: object[] = [];

  try {
    const buffer = await downloadFromStorage(storageKey);
    const stream = Readable.from(buffer);

    const parser = stream.pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      })
    );

    for await (const rawRecord of parser) {
      const record = rawRecord as CsvRow;
      rowsTotal++;
      const rowNum = rowsTotal;

      const parsed = createShiftSchema.safeParse({
        platformId: record.platformId,
        cityZoneId: record.cityZoneId || undefined,
        shiftDate: record.shiftDate,
        hoursWorked: record.hoursWorked,
        grossPay: record.grossPay,
        deductions: record.deductions ?? 0,
        netPay: record.netPay,
        currency: record.currency || 'PKR',
        notes: record.notes || undefined,
      });

      if (!parsed.success) {
        const errors = parsed.error.errors.map((e) => e.message).join('; ');
        errorRows.push({ ...record, _error: errors, _row: rowNum });
        continue;
      }

      // Validate financial integrity (gross - deductions = net)
      const { grossPay, deductions, netPay } = parsed.data;
      if (Math.abs(grossPay - deductions - netPay) > 0.01) {
        errorRows.push({
          ...record,
          _error: `net_pay must equal gross_pay minus deductions (expected ${(grossPay - deductions).toFixed(2)})`,
          _row: rowNum,
        });
        continue;
      }

      validBatch.push({ ...parsed.data, workerId, source: 'csv' });

      if (validBatch.length >= BATCH_SIZE) {
        const batch = validBatch.splice(0, BATCH_SIZE);
        await prisma.shift.createMany({ data: batch as never[], skipDuplicates: true });
        rowsOk += batch.length;
      }
    }

    // Flush remaining valid rows
    if (validBatch.length > 0) {
      await prisma.shift.createMany({ data: validBatch as never[], skipDuplicates: true });
      rowsOk += validBatch.length;
    }

    // Build and upload error CSV if needed
    let errorCsvKey: string | null = null;
    if (errorRows.length > 0) {
      const csvContent = stringify(errorRows, { header: true });
      errorCsvKey = `csv-errors/${workerId}/${importId}-errors.csv`;
      await uploadCsvToStorage(errorCsvKey, Buffer.from(csvContent, 'utf-8'));
    }

    await csvImportRepository.updateStatus(importId, {
      status: errorRows.length === rowsTotal && rowsTotal > 0 ? 'failed' : 'done',
      rowsTotal,
      rowsOk,
      rowsFailed: errorRows.length,
      errorCsvKey,
      finishedAt: new Date(),
    });

    // Notify worker
    void notifyUser({
      userId: workerId,
      title: 'CSV import complete',
      body: `Imported ${rowsOk} of ${rowsTotal} rows successfully.${errorRows.length > 0 ? ` ${errorRows.length} rows had errors.` : ''}`,
    });

    logger.info({ jobId: job.id, importId, rowsOk, rowsFailed: errorRows.length }, 'csv-import done');
  } catch (err) {
    await csvImportRepository.updateStatus(importId, {
      status: 'failed',
      rowsTotal,
      rowsOk,
      rowsFailed: rowsTotal - rowsOk,
      errorLog: { message: (err as Error).message },
      finishedAt: new Date(),
    });
    throw err;
  }
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWorkerLoop(): Promise<void> {
  while (!stopRequested) {
    try {
      const job = await csvImportQueue.pop();
      if (!job) {
        await sleep(POLL_INTERVAL_MS);
        continue;
      }

      await processCsvImport(job);
    } catch (err) {
      logger.error({ err }, 'csv-import worker loop failed');
      await sleep(POLL_INTERVAL_MS);
    }
  }
}

export function startCsvImportWorker(): void {
  if (workerStarted) return;
  workerStarted = true;
  void runWorkerLoop();
}
