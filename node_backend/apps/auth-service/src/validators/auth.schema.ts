import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(10, 'Password must be at least 10 characters')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter');

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').toLowerCase(),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number').optional(),
  password: passwordSchema,
  role: z.enum(['worker']).default('worker'),
});

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export const refreshSchema = z.object({});

export const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  token: z.string().uuid('Invalid reset token'),
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
});

export const updateMeSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  language: z.enum(['en', 'ur']).optional(),
  categories: z.array(z.string()).optional(),
  cityZoneId: z.string().uuid().optional(),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/).optional(),
});

export const roleRequestSchema = z.object({
  requestedRole: z.enum(['verifier', 'advocate']),
  reason: z.string().min(10, 'Please provide a reason (min 10 chars)').max(500).optional(),
});

export const roleRequestDecisionSchema = z.object({
  note: z.string().max(500).optional(),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(['active', 'frozen']),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateMeInput = z.infer<typeof updateMeSchema>;
export type RoleRequestInput = z.infer<typeof roleRequestSchema>;
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
