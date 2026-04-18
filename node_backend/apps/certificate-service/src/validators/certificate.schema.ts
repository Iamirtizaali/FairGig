import { z } from 'zod';

const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD');

export const buildCertificateSchema = z.object({
  from: dateStr,
  to: dateStr,
});

export const shareCertificateSchema = z.object({
  from: dateStr,
  to: dateStr,
  ttlDays: z.coerce.number().int().positive().max(90).optional(),
});

export type BuildCertificateInput = z.infer<typeof buildCertificateSchema>;
export type ShareCertificateInput = z.infer<typeof shareCertificateSchema>;
