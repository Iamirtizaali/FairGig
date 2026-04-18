import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendCreated } from '../utils/response';
import * as shiftService from '../services/shift.service';
import { listShiftsSchema } from '../validators/shift.schema';
import type { ListShiftsOpts } from '../repositories/shift.repository';

type Role = 'worker' | 'verifier' | 'advocate' | 'admin';

export const createShift = asyncHandler(async (req: Request, res: Response) => {
  const shift = await shiftService.createShift(req.user!.sub, req.body, req);
  sendCreated(res, { shift });
});

export const listShifts = asyncHandler(async (req: Request, res: Response) => {
  const parsed = listShiftsSchema.parse({
    page: req.query['page'],
    limit: req.query['limit'],
    platformId: req.query['platformId'],
    from: req.query['from'],
    to: req.query['to'],
    verificationStatus: req.query['verificationStatus'],
  });

  const opts: ListShiftsOpts = {
    page: parsed.page,
    limit: parsed.limit,
    platformId: parsed.platformId,
    from: parsed.from,
    to: parsed.to,
    verificationStatus: parsed.verificationStatus,
  };

  const { shifts, total } = await shiftService.listShifts(
    opts,
    req.user!.role as Role,
    req.user!.sub,
  );
  sendSuccess(res, { shifts }, 200, { page: opts.page, limit: opts.limit, total });
});

export const getShift = asyncHandler(async (req: Request, res: Response) => {
  const shift = await shiftService.getShift(
    String(req.params['id']),
    req.user!.role as Role,
    req.user!.sub,
  );
  sendSuccess(res, { shift });
});

export const updateShift = asyncHandler(async (req: Request, res: Response) => {
  const shift = await shiftService.updateShift(
    String(req.params['id']),
    req.body,
    req.user!.sub,
    req.user!.role as Role,
  );
  sendSuccess(res, { shift });
});

export const deleteShift = asyncHandler(async (req: Request, res: Response) => {
  await shiftService.deleteShift(
    String(req.params['id']),
    req.user!.sub,
    req.user!.role as Role,
  );
  sendSuccess(res, null);
});
