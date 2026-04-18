import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendCreated } from '../utils/response';
import * as complaintService from '../services/complaint.service';
import { listComplaintsSchema } from '../validators/grievance.schema';

type Role = 'worker' | 'verifier' | 'advocate' | 'admin';

export const createComplaint = asyncHandler(async (req: Request, res: Response) => {
  const complaint = await complaintService.createComplaint(req.user!.sub, req.body);
  sendCreated(res, { complaint });
});

export const listComplaints = asyncHandler(async (req: Request, res: Response) => {
  const parsed = listComplaintsSchema.parse({
    page: req.query['page'],
    limit: req.query['limit'],
    platform: req.query['platform'],
    category: req.query['category'],
    status: req.query['status'],
    tag: req.query['tag'],
  });
  const { complaints, total } = await complaintService.listComplaints(
    parsed,
    req.user!.role as Role,
  );
  sendSuccess(res, { complaints }, 200, { page: parsed.page, limit: parsed.limit, total });
});

export const getComplaint = asyncHandler(async (req: Request, res: Response) => {
  const complaint = await complaintService.getComplaint(
    String(req.params['id']),
    req.user!.role as Role,
  );
  sendSuccess(res, { complaint });
});

export const updateComplaint = asyncHandler(async (req: Request, res: Response) => {
  const complaint = await complaintService.updateComplaint(
    String(req.params['id']),
    req.body,
    req.user!.sub,
    req.user!.role as Role,
  );
  sendSuccess(res, { complaint });
});

export const updateComplaintStatus = asyncHandler(async (req: Request, res: Response) => {
  const result = await complaintService.updateComplaintStatus(
    String(req.params['id']),
    req.body,
    req.user!.sub,
    req.user!.role as Role,
    req,
  );
  sendSuccess(res, result);
});

export const addTag = asyncHandler(async (req: Request, res: Response) => {
  const tag = await complaintService.addTag(
    String(req.params['id']),
    req.body,
    req.user!.sub,
    req.user!.role as Role,
    req,
  );
  sendCreated(res, { tag });
});

export const removeTag = asyncHandler(async (req: Request, res: Response) => {
  const result = await complaintService.removeTag(
    String(req.params['id']),
    String(req.params['tagId']),
    req.user!.sub,
    req.user!.role as Role,
    req,
  );
  sendSuccess(res, result);
});

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const comment = await complaintService.addComment(
    String(req.params['id']),
    req.body,
    req.user!.sub,
  );
  sendCreated(res, { comment });
});

export const reportComplaint = asyncHandler(async (req: Request, res: Response) => {
  const report = await complaintService.reportComplaint(
    String(req.params['id']),
    req.body,
    req.user!.sub,
  );
  sendCreated(res, { report });
});

export const getBulletinBoard = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(String(req.query['page'] ?? '1')) || 1;
  const limit = Math.min(Number(String(req.query['limit'] ?? '20')) || 20, 100);
  const { complaints, total } = await complaintService.getBulletinBoard(page, limit);
  sendSuccess(res, { complaints }, 200, { page, limit, total });
});
