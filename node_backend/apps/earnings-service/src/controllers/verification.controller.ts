import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/response';
import * as verificationService from '../services/verification.service';

export const verifyShift = asyncHandler(async (req: Request, res: Response) => {
  const verification = await verificationService.verifyShift(
    String(req.params['id']),
    req.body,
    req.user!.sub,
    req,
  );
  sendCreated(res, { verification });
});

export const getVerificationQueue = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(String(req.query['page'] ?? '1')) || 1;
  const limit = Math.min(Number(String(req.query['limit'] ?? '20')) || 20, 100);

  const { queue, total } = await verificationService.getVerificationQueue(page, limit);
  sendSuccess(res, { queue }, 200, { page, limit, total });
});
