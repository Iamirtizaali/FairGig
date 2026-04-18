import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendCreated } from '../utils/response';
import { platformRepository } from '../repositories/platform.repository';
import { cityZoneRepository } from '../repositories/cityZone.repository';
import { ConflictError, NotFoundError } from '../utils/errors';

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

// ─── Admin: platforms ─────────────────────────────────────────────────────────

export const adminListPlatforms = asyncHandler(async (_req: Request, res: Response) => {
  const platforms = await platformRepository.findAllAdmin();
  sendSuccess(res, { platforms });
});

export const adminCreatePlatform = asyncHandler(async (req: Request, res: Response) => {
  const { name, slug, logoUrl } = req.body as { name: string; slug: string; logoUrl?: string };
  const [byName, bySlug] = await Promise.all([
    platformRepository.findByName(name),
    platformRepository.findBySlug(slug),
  ]);
  if (byName) throw new ConflictError('A platform with this name already exists');
  if (bySlug) throw new ConflictError('A platform with this slug already exists');
  const platform = await platformRepository.create({ name, slug, logoUrl });
  sendCreated(res, { platform });
});

export const adminUpdatePlatform = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const existing = await platformRepository.findById(id);
  if (!existing) throw new NotFoundError('Platform');

  const data = req.body as Partial<{ name: string; slug: string; logoUrl: string | null; active: boolean }>;
  if (data.name && data.name !== existing.name) {
    const conflict = await platformRepository.findByName(data.name);
    if (conflict) throw new ConflictError('A platform with this name already exists');
  }
  if (data.slug && data.slug !== existing.slug) {
    const conflict = await platformRepository.findBySlug(data.slug);
    if (conflict) throw new ConflictError('A platform with this slug already exists');
  }

  const platform = await platformRepository.update(id, data);
  sendSuccess(res, { platform });
});

// ─── Admin: city zones ────────────────────────────────────────────────────────

export const adminListCityZones = asyncHandler(async (_req: Request, res: Response) => {
  const zones = await cityZoneRepository.findAllAdmin();
  sendSuccess(res, { zones });
});

export const adminCreateCityZone = asyncHandler(async (req: Request, res: Response) => {
  const { city, zone } = req.body as { city: string; zone: string };
  const existing = await cityZoneRepository.findByCityAndZone(city, zone);
  if (existing) throw new ConflictError('This city/zone combination already exists');
  const cityZone = await cityZoneRepository.create({ city, zone });
  sendCreated(res, { cityZone });
});

export const adminUpdateCityZone = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const existing = await cityZoneRepository.findById(id);
  if (!existing) throw new NotFoundError('City zone');
  const data = req.body as Partial<{ city: string; zone: string; active: boolean }>;
  const cityZone = await cityZoneRepository.update(id, data);
  sendSuccess(res, { cityZone });
});
