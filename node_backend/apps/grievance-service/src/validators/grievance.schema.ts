import { z } from 'zod';

export const createComplaintSchema = z.object({
  platform: z.string().min(1).max(100),
  category: z.string().min(1).max(100),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  visibility: z.enum(['public_anon', 'internal']).default('public_anon'),
});

export const updateComplaintSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(5000).optional(),
  visibility: z.enum(['public_anon', 'internal']).optional(),
});

export const updateComplaintStatusSchema = z.object({
  status: z.enum(['open', 'under_review', 'escalated', 'resolved', 'hidden']),
});

export const addTagSchema = z.object({
  label: z.string().min(1).max(50),
});

export const createClusterSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(1000).optional(),
});

export const attachToClusterSchema = z.object({
  complaintIds: z.array(z.string().min(1)).min(1).max(100),
});

export const addCommentSchema = z.object({
  body: z.string().min(1).max(2000),
});

export const reportComplaintSchema = z.object({
  reason: z.string().min(3).max(500),
});

export const listComplaintsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  platform: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['open', 'under_review', 'escalated', 'resolved', 'hidden']).optional(),
  tag: z.string().optional(),
});

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>;
export type UpdateComplaintInput = z.infer<typeof updateComplaintSchema>;
export type UpdateComplaintStatusInput = z.infer<typeof updateComplaintStatusSchema>;
export type AddTagInput = z.infer<typeof addTagSchema>;
export type CreateClusterInput = z.infer<typeof createClusterSchema>;
export type AttachToClusterInput = z.infer<typeof attachToClusterSchema>;
export type AddCommentInput = z.infer<typeof addCommentSchema>;
export type ReportComplaintInput = z.infer<typeof reportComplaintSchema>;
