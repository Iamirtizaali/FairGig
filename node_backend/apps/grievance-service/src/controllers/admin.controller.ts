import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import { complaintRepository } from '../repositories/complaint.repository';
import { NotFoundError } from '../utils/errors';

export const listReports = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(String(req.query.page ?? '1')) || 1;
  const limit = Math.min(Number(String(req.query.limit ?? '20')) || 20, 100);
  const resolvedParam = req.query.resolved as string | undefined;
  const resolved = resolvedParam === 'true' ? true : resolvedParam === 'false' ? false : undefined;

  const { reports, total } = await complaintRepository.listReports({ page, limit, resolved });
  sendSuccess(res, { reports }, 200, { page, limit, total });
});

export const resolveReport = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const report = await complaintRepository.resolveReport(id).catch(() => null);
  if (!report) throw new NotFoundError('Report');
  sendSuccess(res, { report });
});
