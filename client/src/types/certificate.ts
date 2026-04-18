// ─────────────────────────────────────────────────────────────────────────────
// Certificate Service Types
// Mirrors: certificate-service/src/services/certificate.service.ts + validators
// ─────────────────────────────────────────────────────────────────────────────

// ─── Sub-shapes (match service interfaces exactly) ────────────────────────────

export interface PlatformRow {
  platform: string
  shifts: number
  hours: string    // toFixed(2) string
  gross: string
  deductions: string
  net: string
  currency: string
}

export interface MonthlyRow {
  month: string    // YYYY-MM
  shifts: number
  hours: string
  net: string
}

export interface TotalsRow {
  shifts: number
  hours: string
  gross: string
  deductions: string
  net: string
}

// ─── Certificate Data (returned by build & public endpoints) ──────────────────

export interface CertificateData {
  workerName: string
  periodStart: string        // YYYY-MM-DD
  periodEnd: string          // YYYY-MM-DD
  issuedAt: string           // YYYY-MM-DD
  currency: string
  platformBreakdown: PlatformRow[]
  monthlyBreakdown: MonthlyRow[]
  totals: TotalsRow
  avgHourlyRate: string      // toFixed(2)
  verificationPct: number
  shareToken?: string
  shareUrl?: string
}

// ─── Request Types ────────────────────────────────────────────────────────────

/** Query params for GET /certificate/v1/build */
export interface BuildCertificateParams {
  from: string   // YYYY-MM-DD
  to: string     // YYYY-MM-DD
}

/** Body for POST /certificate/v1/share */
export interface ShareCertificateRequest {
  from: string
  to: string
  ttlDays?: number  // 1–90, defaults to 14
}

// ─── Response Types ───────────────────────────────────────────────────────────

export interface ShareCertificateResponse {
  shareToken: string
  shareUrl: string
  expiresAt: string   // ISO date-time
}

export interface RevokeCertificateResponse {
  revoked: boolean
}
