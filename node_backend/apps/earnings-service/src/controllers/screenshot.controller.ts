import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendCreated } from '../utils/response';
import * as screenshotService from '../services/screenshot.service';

export const presignUpload = asyncHandler(async (req: Request, res: Response) => {
  const result = await screenshotService.presignUpload(
    String(req.params['shiftId']),
    req.body,
    req.user!.sub,
  );
  sendSuccess(res, result);
});

export const confirmUpload = asyncHandler(async (req: Request, res: Response) => {
  const screenshot = await screenshotService.confirmUpload(
    String(req.params['shiftId']),
    req.body,
    req.user!.sub,
  );
  sendCreated(res, { screenshot });
});

export const getScreenshotUrl = asyncHandler(async (req: Request, res: Response) => {
  const result = await screenshotService.getScreenshotUrl(
    String(req.params['shiftId']),
    req.user!.sub,
    req.user!.role,
  );
  sendSuccess(res, result);
});
