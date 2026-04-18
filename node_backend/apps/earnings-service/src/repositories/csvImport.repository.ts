import { getPrisma } from '../lib/prisma';
import type { ImportStatus } from '@prisma/client';

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
    },
  ) {
    return prisma.csvImport.update({ where: { id }, data: patch });
  },
};
