import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import { platformRepository } from '../repositories/platform.repository';
import { cityZoneRepository } from '../repositories/cityZone.repository';

export const listPlatforms = asyncHandler(async (_req: Request, res: Response) => {
  const platforms = await platformRepository.findAll();
  res.setHeader('Cache-Control', 'public, max-age=300');
  sendSuccess(res, { platforms });
});

export const listCityZones = asyncHandler(async (_req: Request, res: Response) => {
  const zones = await cityZoneRepository.findAll();
  res.setHeader('Cache-Control', 'public, max-age=300');
  sendSuccess(res, { zones });
});
