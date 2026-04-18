import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';
import * as csvImportService from '../services/csvImport.service';
import { AppError } from '../utils/errors';

// Static CSV template columns
const CSV_TEMPLATE_HEADER =
  'platformId,cityZoneId,shiftDate,hoursWorked,grossPay,deductions,netPay,currency,notes\n' +
  '<platform-cuid>,,2026-04-18,6.5,1200,100,1100,PKR,Night shift\n';

export const getTemplate = asyncHandler(async (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="shifts-template.csv"');
  res.send(CSV_TEMPLATE_HEADER);
});

export const uploadCsv = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError(400, 'NO_FILE', 'CSV file is required');

  const result = await csvImportService.startCsvImport(
    req.user!.sub,
    req.file.path,
    req.file.originalname,
  );

  sendCreated(res, result);
});

export const getImportStatus = asyncHandler(async (req: Request, res: Response) => {
  const record = await csvImportService.getCsvImportStatus(
    String(req.params['importId']),
    req.user!.sub,
  );
  sendSuccess(res, { import: record });
});
