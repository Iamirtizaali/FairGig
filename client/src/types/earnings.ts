// ─────────────────────────────────────────────────────────────────────────────
// Earnings Service Types
// Mirrors: earnings-service validators/shift.schema.ts + service return shapes
// ─────────────────────────────────────────────────────────────────────────────

// ─── Enums ────────────────────────────────────────────────────────────────────

export type ShiftVerificationStatus =
  | 'self_attested'
  | 'pending_review'
  | 'verified'
  | 'discrepancy_flagged'
  | 'unverifiable'

export type VerifyDecision = 'verified' | 'discrepancy_flagged' | 'unverifiable'

/** Alias used in ReviewPage component for clarity */
export type VerifyShiftDecision = VerifyDecision

export type CsvImportStatus = 'queued' | 'processing' | 'done' | 'failed'

// ─── Reference Data ───────────────────────────────────────────────────────────

export interface Platform {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  active: boolean
  createdAt: string
}

export interface CityZone {
  id: string
  city: string
  zone: string
  active: boolean
  createdAt: string
}

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface AnomalyFlag {
  id: string
  shiftId: string
  reason: string
  score: number | null
  createdAt: string
}

export interface Screenshot {
  id: string
  shiftId: string
  storageKey: string
  sizeBytes: number
  mimeType: string
  uploadedAt: string
}

export interface Verification {
  id: string
  shiftId: string
  verifierId: string
  decision: VerifyDecision
  screenshotId: string | null
  notes: string | null
  createdAt: string
}

export interface Shift {
  id: string
  workerId: string
  platformId: string
  platform: Pick<Platform, 'id' | 'name' | 'slug' | 'logoUrl'>
  cityZoneId: string | null
  cityZone: Pick<CityZone, 'id' | 'city' | 'zone'> | null
  shiftDate: string       // YYYY-MM-DD
  hoursWorked: number
  grossPay: number
  deductions: number
  netPay: number
  currency: string        // e.g. "PKR"
  notes: string | null
  verificationStatus: ShiftVerificationStatus
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  screenshots: Screenshot[]
  verifications: Verification[]
  anomalyFlags: AnomalyFlag[]
}

export interface CsvImport {
  id: string
  workerId: string
  filename: string
  status: CsvImportStatus
  rowsTotal: number | null
  rowsOk: number | null
  rowsFailed: number | null
  errors: unknown[]
  createdAt: string
  updatedAt: string
}

// For the verifier queue — enriched item
export interface QueueItem {
  id: string
  workerId: string
  workerName: string | null
  platformId: string
  platform: Pick<Platform, 'id' | 'name' | 'slug'>
  shiftDate: string
  hoursWorked: number
  grossPay: number
  netPay: number
  currency: string
  verificationStatus: ShiftVerificationStatus
  createdAt: string
  updatedAt: string
}

// ─── Request Types ────────────────────────────────────────────────────────────

export interface CreateShiftRequest {
  platformId: string
  cityZoneId?: string
  shiftDate: string         // YYYY-MM-DD
  hoursWorked: number
  grossPay: number
  deductions?: number       // defaults to 0
  netPay: number
  currency?: string         // defaults to "PKR"
  notes?: string
}

export interface UpdateShiftRequest {
  platformId?: string
  cityZoneId?: string | null
  shiftDate?: string
  hoursWorked?: number
  grossPay?: number
  deductions?: number
  netPay?: number
  currency?: string
  notes?: string | null
}

export interface ListShiftsParams {
  page?: number
  limit?: number
  platformId?: string
  from?: string             // YYYY-MM-DD
  to?: string               // YYYY-MM-DD
  verificationStatus?: ShiftVerificationStatus
}

export interface PresignRequest {
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp'
  sizeBytes: number
}

export interface ConfirmScreenshotRequest {
  storageKey: string
  sizeBytes: number
  mimeType?: 'image/jpeg' | 'image/png' | 'image/webp'
}

export interface VerifyShiftRequest {
  decision: VerifyDecision
  screenshotId?: string
  notes?: string
  correctedGross?: number
  correctedNet?: number
}

export interface CreatePlatformRequest {
  name: string
  slug: string
  logoUrl?: string
}

export interface UpdatePlatformRequest {
  name?: string
  slug?: string
  logoUrl?: string | null
  active?: boolean
}

export interface CreateCityZoneRequest {
  city: string
  zone: string
}

export interface UpdateCityZoneRequest {
  city?: string
  zone?: string
  active?: boolean
}

// ─── Response Types ───────────────────────────────────────────────────────────

export interface PaginatedShifts {
  shifts: Shift[]
  meta: { page: number; limit: number; total: number }
}

export interface PaginatedQueue {
  queue: QueueItem[]
  meta: { page: number; limit: number; total: number }
}

export interface PresignResponse {
  signedUrl: string
  storageKey: string
  token: string
}

export interface ScreenshotUrlResponse {
  screenshotId: string
  signedUrl: string
  expiresIn: number
}

export interface UploadCsvResponse {
  importId: string
  jobId: string
}
