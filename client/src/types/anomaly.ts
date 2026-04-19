/**
 * types/anomaly.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * TypeScript interfaces mirroring the FastAPI anomaly-service Pydantic schemas.
 * Source of truth: fastapi_backend/apps/anomaly-service/app/schemas/detect.py
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Request ──────────────────────────────────────────────────────────────────

/**
 * A single shift record to submit for anomaly detection.
 *
 * Validation rules enforced by the backend:
 * - hours_worked: (0, 24]
 * - gross_earned, platform_deductions: ≥ 0
 * - No two shifts may share the same (date, platform) pair
 * - Shifts are sorted chronologically by the service before analysis
 */
export interface AnomalyShiftInput {
  date:                 string  // YYYY-MM-DD
  platform:             string  // e.g. "Uber", "Careem"
  hours_worked:         number  // (0, 24]
  gross_earned:         number  // PKR, ≥ 0
  platform_deductions:  number  // PKR, ≥ 0
  net_received:         number  // PKR  (gross_earned - platform_deductions)
}

/**
 * Tuning options for the detection algorithms.
 * The backend applies defaults when omitted.
 */
export interface AnomalyDetectOptions {
  z_threshold?:  number  // Z-score threshold (default 2.5, range (0, 10])
  mom_drop_pct?: number  // Month-over-month drop % threshold (default 20.0, range (0, 100])
}

/**
 * Request body for POST /detect
 */
export interface AnomalyDetectRequest {
  worker_id: string              // unique worker identifier
  currency?: string              // ISO code (default "PKR")
  shifts:    AnomalyShiftInput[]
  options?:  AnomalyDetectOptions
}

// ─── Response ─────────────────────────────────────────────────────────────────

/** Type of anomaly detected */
export type AnomalyKind =
  | 'deduction_spike'   // commission % unusually high vs 60-day baseline
  | 'hourly_rate_drop'  // effective hourly pay dropped significantly
  | 'income_drop_mom'   // total net income dropped >mom_drop_pct% MoM

/** Severity level */
export type AnomalySeverity = 'low' | 'medium' | 'high'

/**
 * A single detected anomaly.
 */
export interface Anomaly {
  kind:          AnomalyKind
  severity:      AnomalySeverity
  window:        string   // human-readable, e.g. "Week ending 2026-03-08"
  metric:        string   // e.g. "deduction_pct", "hourly_rate", "monthly_net"
  observed:      number   // the value seen in this window
  baseline_mean: number   // 60-day rolling mean
  baseline_std:  number   // 60-day rolling std dev
  z:             number   // Z-score (0 for income_drop_mom)
  explanation:   string   // plain-language explanation for the worker
}

/**
 * Analysis summary.
 */
export interface AnomalyDetectSummary {
  shifts_analysed: number    // total shifts analysed
  windows:         string[]  // detection windows applied e.g. ["weekly","monthly"]
}

/**
 * Response from POST /detect
 * status = "clean"         → anomalies is empty
 * status = "issues_found"  → anomalies has ≥1 entries
 */
export interface AnomalyDetectResponse {
  worker_id: string
  status:    'clean' | 'issues_found'
  summary:   AnomalyDetectSummary
  anomalies: Anomaly[]
}

// ─── Validation error shape ────────────────────────────────────────────────

/**
 * 422 error body returned by the anomaly-service.
 */
export interface AnomalyValidationError {
  error:    string    // "Request validation failed"
  problems: string[]  // human-readable problem descriptions
  hint:     string
}

// ─── Health ──────────────────────────────────────────────────────────────────

export interface AnomalyHealthResponse {
  status:  'ok' | string
  service: 'anomaly-service'
  version: string
}
