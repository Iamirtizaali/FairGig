import { z } from 'zod';

const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD');

export const createShiftSchema = z.object({
  platformId: z.string().min(1, 'platformId is required'),
  cityZoneId: z.string().optional(),
  shiftDate: dateStr,
  hoursWorked: z.coerce.number().positive('Hours worked must be > 0').max(24, 'Max 24 hours'),
  grossPay: z.coerce.number().min(0, 'Gross pay must be >= 0'),
  deductions: z.coerce.number().min(0, 'Deductions must be >= 0').default(0),
  netPay: z.coerce.number().min(0, 'Net pay must be >= 0'),
  currency: z.string().length(3).default('PKR'),
  notes: z.string().max(500).optional(),
});

export const updateShiftSchema = z.object({
  platformId: z.string().optional(),
  cityZoneId: z.string().nullable().optional(),
  shiftDate: dateStr.optional(),
  hoursWorked: z.coerce.number().positive().max(24).optional(),
  grossPay: z.coerce.number().min(0).optional(),
  deductions: z.coerce.number().min(0).optional(),
  netPay: z.coerce.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  notes: z.string().max(500).nullable().optional(),
});

export const presignSchema = z.object({
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  sizeBytes: z.coerce
    .number()
    .int()
    .positive()
    .max(5 * 1024 * 1024, 'File must be <= 5 MB'),
});

export const confirmScreenshotSchema = z.object({
  storageKey: z.string().min(1),
  sizeBytes: z.coerce
    .number()
    .int()
    .positive()
    .max(5 * 1024 * 1024),
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp']).default('image/jpeg'),
});

export const listShiftsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  platformId: z.string().optional(),
  from: dateStr.optional(),
  to: dateStr.optional(),
  verificationStatus: z
    .enum(['self_attested', 'pending_review', 'verified', 'discrepancy_flagged', 'unverifiable'])
    .optional(),
});

export type CreateShiftInput = z.infer<typeof createShiftSchema>;
export type UpdateShiftInput = z.infer<typeof updateShiftSchema>;
export type PresignInput = z.infer<typeof presignSchema>;
export type ConfirmScreenshotInput = z.infer<typeof confirmScreenshotSchema>;
