/**
 * types/analytics.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * TypeScript interfaces mirroring the FastAPI analytics-service Pydantic schemas.
 * Source of truth: fastapi_backend/apps/analytics-service/app/schemas/
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Shared ───────────────────────────────────────────────────────────────────

/**
 * A single charting data point returned by worker trend / commission-tracker.
 * label  = period string (e.g. "2026-W14" or "2026-04")
 * earnings = net earnings for that period (PKR)
 */
export interface SummaryPoint {
  label:    string
  earnings: number
}

// ─── Worker Summary (GET /worker/summary) ───────────────────────────────────

/**
 * Response from GET /worker/summary
 * Covers this-week & this-month earnings, average hourly rate, and verification %.
 */
export interface WorkerSummaryResponse {
  this_week_earnings:      number  // PKR
  this_month_earnings:     number  // PKR
  average_hourly_rate:     number  // PKR/hr — trailing 6-month average
  verification_percentage: number  // 0–100 (% of shifts verified in last 30 days)
  total_earned:            number  // legacy alias → this_week_earnings
  total_hours:             number  // legacy alias → average_hourly_rate
  verified_ratio:          number  // 0–1 ratio alias
}

// ─── Worker Trend (GET /worker/trend | /worker/trends) ──────────────────────

/**
 * Response from GET /worker/trend?granularity=week|month
 * 12-period time series of net earnings.
 */
export interface WorkerTrendResponse {
  granularity: 'week' | 'month'
  periods:     string[]        // array of period labels
  earnings:    number[]        // earnings[i] corresponds to periods[i]
  series:      SummaryPoint[]  // structured alternative to periods+earnings
  weeks:       string[]        // legacy alias → periods
}

// ─── Worker Commission Tracker (GET /worker/commission-tracker) ──────────────

/**
 * Response from GET /worker/commission-tracker?platform=Uber
 * Per-platform deduction % trend over the last 12 weeks.
 */
export interface CommissionTrackerResponse {
  platform:          string                           // queried platform name
  average_commission: number                          // avg deduction % for the platform
  trend:             'stable' | 'concerning' | string // "stable" | "concerning"
  platform_series:   Record<string, SummaryPoint[]>  // one time-series per platform
}

// ─── Worker Median Compare (GET /worker/median-compare) ──────────────────────

/**
 * Response from GET /worker/median-compare?zone=...&category=...
 * K-anonymised comparison of the worker's hourly rate vs city median.
 * When cohort_too_small=true, worker_median/city_median/difference_pct are null.
 */
export interface MedianCompareResponse {
  cohort_too_small: boolean
  worker_median:    number | null  // PKR/hr
  city_median:      number | null  // PKR/hr
  difference_pct:   number | null  // worker delta vs city median (%)
  category:         string | null
  zone:             string | null
  sample_size:      number         // distinct workers in the cohort
}

// ─── KPI: City Median (GET /benchmark/city-median) ──────────────────────────

/**
 * Response from GET /benchmark/city-median?category=...&zone=...
 * K-anonymised median hourly rate for verified workers in a zone+category.
 */
export interface CityMedianResponse {
  cohort_too_small:   boolean
  worker_count:       number
  category:           string
  zone:               string
  median_hourly_rate: number  // PKR/hr, 0 when cohort_too_small=true
}

// ─── KPI: Advocate KPIs (GET /advocate/kpis) ────────────────────────────────

/**
 * Per-zone earnings percentile distribution (AA2).
 */
export interface ZoneDistribution {
  p10: number
  p25: number
  p50: number  // median
  p75: number
  p90: number
}

/**
 * Top complaint-category entry from GET /advocate/kpis (AA3 snapshot).
 */
export interface TopComplaintCategoryEntry {
  category:          string
  count:             number
  avg_commission_pct: number
}

/**
 * Response from GET /advocate/kpis
 * Combined AA1–AA4 snapshot for the advocate dashboard.
 */
export interface AdvocateKpisResponse {
  commission_trends:               Record<string, number>          // week → avg deduction %
  income_distribution_percentiles: Record<string, ZoneDistribution> // zone → percentiles
  vulnerable_workers_flagged:      string[]                        // anonymised worker IDs
  top_complaint_categories:        TopComplaintCategoryEntry[]
}

// ─── Advocate: Commission Trends (GET /advocate/commission-trends) ────────────

/**
 * k-anonymised per-platform weekly deduction point (AA1).
 * avg_deduction_pct is null when cohort < 5 workers.
 */
export interface PlatformWeekPoint {
  week:              string         // ISO week string e.g. "2026-W14"
  avg_deduction_pct: number | null  // null = k-anonymity protected
  cohort_size:       number
}

/**
 * Response from GET /advocate/commission-trends
 */
export interface CommissionTrendsResponse {
  platforms: Record<string, PlatformWeekPoint[]>
}

// ─── Advocate: Income Distribution (GET /advocate/income-distribution) ────────

/**
 * Monthly income percentiles (AA2).
 */
export interface IncomePercentiles {
  p10: number
  p25: number
  p50: number  // median
  p75: number
  p90: number
}

/**
 * Response from GET /advocate/income-distribution?zone=...
 */
export interface IncomeDistributionResponse {
  cohort_too_small: boolean
  zone:             string | null  // null = city-wide
  worker_count:     number
  percentiles:      IncomePercentiles | null  // null when cohort_too_small=true
}

// ─── Advocate: Top Complaints (GET /advocate/top-complaints) ─────────────────

/**
 * Single entry in the top complaints list (AA3).
 */
export interface ComplaintCategory {
  category:   string
  count:      number
  percentage: number  // % of total in the window
}

/**
 * Response from GET /advocate/top-complaints?window=7d|30d|90d
 */
export interface TopComplaintsResponse {
  window:           '7d' | '30d' | '90d' | string
  total_complaints: number
  top_categories:   ComplaintCategory[]
}

// ─── Advocate: Vulnerability (GET /advocate/vulnerability) ───────────────────

/**
 * Anonymised worker with a month-over-month income drop > 20% (AA4).
 * anon_id is SHA-256 of worker_id (first 12 chars) — raw ID never exposed.
 */
export interface VulnerableWorker {
  anon_id:              string  // SHA-256 prefix, NOT the real worker_id
  zone:                 string
  category:             string
  prior_month_income:   number  // PKR
  current_month_income: number  // PKR
  drop_pct:             number  // positive = income dropped
}

/**
 * Response from GET /advocate/vulnerability
 */
export interface VulnerabilityResponse {
  computed_at:      string  // ISO timestamp of last nightly job run
  threshold_pct:    number  // default 20.0
  vulnerable_count: number
  cohort_too_small: boolean  // true if < 5 workers (k-anonymity)
  workers:          VulnerableWorker[]
}

// ─── Advocate: Refresh Vulnerability (POST /advocate/internal/refresh-vulnerability)

/**
 * Response from POST /advocate/internal/refresh-vulnerability (admin/judge only).
 */
export interface RefreshVulnerabilityResponse {
  computed_at:               string
  vulnerable_count:          number
  total_workers_evaluated:   number
}

// ─── Health Check (GET /health) ──────────────────────────────────────────────

export interface AnalyticsHealthResponse {
  status:  'ok' | string
  service: string
}
