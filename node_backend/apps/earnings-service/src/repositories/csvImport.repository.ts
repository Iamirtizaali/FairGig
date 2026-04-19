import { getPrisma } from '../lib/prisma';
import { Prisma, type ImportStatus } from '../generated/prisma';

const prisma = getPrisma();

export const csvImportRepository = {
  async create(data: { workerId: string; storageKey: string; jobId?: string }) {
    return prisma.csvImport.create({ data });
  },

  async findById(id: string) {
    return prisma.csvImport.findUnique({ where: { id } });
  },

  async updateStatus(
    id: string,
    patch: {
      status: ImportStatus;
      rowsTotal?: number;
      rowsOk?: number;
      rowsFailed?: number;
      errorLog?: unknown;
      errorCsvKey?: string | null;
      startedAt?: Date;
      finishedAt?: Date;
      jobId?: string;
    },
  ) {
    const data: Prisma.CsvImportUpdateInput = {
      status:      patch.status,
      rowsTotal:   patch.rowsTotal,
      rowsOk:      patch.rowsOk,
      rowsFailed:  patch.rowsFailed,
      errorCsvKey: patch.errorCsvKey ?? undefined,
      startedAt:   patch.startedAt,
      finishedAt:  patch.finishedAt,
      jobId:       patch.jobId,
      ...(patch.errorLog !== undefined
        ? { errorLog: patch.errorLog as Prisma.InputJsonValue }
        : {}),
    };
    return prisma.csvImport.update({ where: { id }, data });
  },
};
