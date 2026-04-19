// ─── Backend-Aligned Types ────────────────────────────────────────────────────
// These match auth-service/src/services/auth.service.ts `sanitizeUser()` output
// and auth-service/src/validators/auth.schema.ts

export type UserRole = 'worker' | 'verifier' | 'advocate' | 'admin'
export type UserStatus = 'active' | 'frozen' | 'deleted'
export type UserLanguage = 'en' | 'ur'

/** The sanitized user object returned by the backend */
export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
  language: UserLanguage
  status: UserStatus
  phone: string | null
  cityZoneId: string | null
  categories: string[]
  createdAt: string  // ISO date string
}

// ─── Request Payloads ─────────────────────────────────────────────────────────
// Match auth-service/src/validators/auth.schema.ts

/** POST /auth/v1/register */
export interface RegisterRequest {
  name: string       // min 2, max 100
  email: string      // valid email — lowercased by backend
  password: string   // min 10 chars, must contain letter + number
  phone?: string     // optional, +?[0-9]{7,15}
}

/** POST /auth/v1/login */
export interface LoginRequest {
  email: string
  password: string
}

/** POST /auth/v1/forgot-password */
export interface ForgotPasswordRequest {
  email: string
}

/** POST /auth/v1/reset-password */
export interface ResetPasswordRequest {
  token: string      // UUID from the reset email URL
  password: string   // same rules as register password (backend field: `password`)
}

/** POST /auth/v1/change-password */
export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

/** PATCH /auth/v1/me */
export interface UpdateMeRequest {
  name?: string
  language?: UserLanguage
  categories?: string[]
  cityZoneId?: string   // UUID
  phone?: string
}

/** POST /auth/v1/role-requests */
export interface RoleRequestRequest {
  requestedRole: 'verifier' | 'advocate'
  reason?: string   // optional, max 500 chars
}

/** PATCH /auth/v1/admin/users/:id/status */
export interface UpdateUserStatusRequest {
  status: 'active' | 'frozen'
}

// ─── Response Payloads ────────────────────────────────────────────────────────
// Match auth-service/src/controllers/auth.controller.ts sendSuccess/sendCreated calls

/** Data payload for POST /auth/v1/register and POST /auth/v1/login */
export interface AuthResponseData {
  user: AuthUser
  accessToken: string
}

/** Data payload for POST /auth/v1/refresh */
export interface RefreshResponseData {
  accessToken: string
}

/** Data payload for GET /auth/v1/me and PATCH /auth/v1/me */
export interface MeResponseData {
  user: AuthUser
}

/** Data payload for POST /auth/v1/role-requests (create) */
export interface RoleRequestResponseData {
  roleRequest: {
    id: string
    userId: string
    requestedRole: 'verifier' | 'advocate'
    status: 'pending' | 'approved' | 'rejected'
    reason: string | null
    createdAt: string
  }
}

/** Data payload for GET /auth/v1/role-requests (admin list) */
export interface RoleRequestsListData {
  requests: RoleRequestResponseData['roleRequest'][]
}

// ─── Admin user directory ─────────────────────────────────────────────────────

/** Query params for GET /auth/v1/admin/users */
export interface ListAdminUsersParams {
  page?: number
  limit?: number
  role?: UserRole
  status?: UserStatus
  search?: string
}

/** Data payload for GET /auth/v1/admin/users */
export interface AdminUsersListData {
  users: AuthUser[]
}

// ─── Admin audit log ──────────────────────────────────────────────────────────

/** One audit event row — shape matches Prisma `auth.audit_events` record */
export interface AuditEvent {
  id:        string
  actorId:   string | null
  actorRole: UserRole | null
  action:    string
  entity:    string
  entityId:  string
  diff:      Record<string, unknown>
  ip:        string | null
  ua:        string | null
  createdAt: string
}

/** Query params for GET /auth/v1/admin/audit */
export interface ListAdminAuditParams {
  page?:    number
  limit?:   number
  actorId?: string
  action?:  string
  entity?:  string
  from?:    string
  to?:      string
}

/** Data payload for GET /auth/v1/admin/audit */
export interface AdminAuditListData {
  events: AuditEvent[]
}

// ─── Auth Form Types ──────────────────────────────────────────────────────────


export interface SignInFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpFormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  categories: string[]
  city: string
  zone: string
  platforms: string[]
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

// ─── Auth State ───────────────────────────────────────────────────────────────

export type AuthStep = 1 | 2 | 3

export type PasswordStrength = 0 | 1 | 2 | 3 | 4

export interface PasswordStrengthInfo {
  score: PasswordStrength
  label: string
  color: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const GIG_CATEGORIES = [
  { id: 'delivery',     label: 'Delivery Rider' },
  { id: 'ride-hailing', label: 'Ride-Hailing Driver' },
  { id: 'food-courier', label: 'Food Courier' },
  { id: 'freelancer',   label: 'Freelancer' },
  { id: 'domestic',     label: 'Domestic Worker' },
]

export const GIG_PLATFORMS = [
  { id: 'careem', label: 'Careem' },
  { id: 'uber', label: 'Uber' },
  { id: 'bykea', label: 'Bykea' },
  { id: 'foodpanda', label: 'Foodpanda' },
  { id: 'indrive', label: 'inDrive' },
  { id: 'other', label: 'Other' },
]

export const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi',
  'Faisalabad', 'Multan', 'Peshawar', 'Quetta',
]
