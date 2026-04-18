import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendCreated } from '../utils/response';
import * as clusterService from '../services/cluster.service';

type Role = 'worker' | 'verifier' | 'advocate' | 'admin';

export const createCluster = asyncHandler(async (req: Request, res: Response) => {
  const cluster = await clusterService.createCluster(
    req.body,
    req.user!.sub,
    req.user!.role as Role,
    req,
  );
  sendCreated(res, { cluster });
});

export const listClusters = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(String(req.query['page'] ?? '1')) || 1;
  const limit = Math.min(Number(String(req.query['limit'] ?? '20')) || 20, 100);
  const { rows, total } = await clusterService.listClusters(page, limit);
  sendSuccess(res, { clusters: rows }, 200, { page, limit, total });
});

export const attachToCluster = asyncHandler(async (req: Request, res: Response) => {
  const result = await clusterService.attachToCluster(
    String(req.params['id']),
    req.body,
    req.user!.sub,
    req.user!.role as Role,
    req,
  );
  sendSuccess(res, result);
});

export const getClusterSuggestions = asyncHandler(async (req: Request, res: Response) => {
  const seedId = String(req.query['seedId'] ?? '');
  const suggestions = await clusterService.getSuggestions(seedId);
  sendSuccess(res, { suggestions });
});
