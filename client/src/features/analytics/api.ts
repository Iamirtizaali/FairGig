/**
 * features/analytics/api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * TanStack Query hooks for the FastAPI analytics-service.
 *
 * Service endpoints (base URL: VITE_ANALYTICS_API_URL or http://localhost:5001):
 *
 *   Worker:
 *     GET /worker/summary              → useWorkerSummaryQuery
 *     GET /worker/trend                → useWorkerTrendQuery
 *     GET /worker/commission-tracker   → useWorkerCommissionTrackerQuery
 *     GET /worker/median-compare       → useWorkerMedianCompareQuery
 *
 *   KPIs:
 *     GET /benchmark/city-median       → useCityMedianQuery
 *     GET /advocate/kpis               → useAdvocateKpisQuery
 *
 *   Advocate (AA1–AA4):
 *     GET /advocate/commission-trends      → useAdvocateCommissionTrendsQuery
 *     GET /advocate/income-distribution    → useAdvocateIncomeDistributionQuery
 *     GET /advocate/top-complaints         → useAdvocateTopComplaintsQuery
 *     GET /advocate/vulnerability          → useAdvocateVulnerabilityQuery
 *
 *   Admin:
 *     POST /advocate/internal/refresh-vulnerability → useRefreshVulnerabilityMutation
 *
 *   Health:
 *     GET /health                      → useAnalyticsHealthQuery
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useQuery, useMutation } from '@tanstack/react-query'
import { analyticsClient } from '@/lib/analyticsClient'
import type {
  WorkerSummaryResponse,
  WorkerTrendResponse,
  CommissionTrackerResponse,
  MedianCompareResponse,
  CityMedianResponse,
  AdvocateKpisResponse,
  CommissionTrendsResponse,
  IncomeDistributionResponse,
  TopComplaintsResponse,
  VulnerabilityResponse,
  RefreshVulnerabilityResponse,
  AnalyticsHealthResponse,
} from '@/types/analytics'

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEYS
// ─────────────────────────────────────────────────────────────────────────────
export const analyticsKeys = {
  all:                () => ['analytics'] as const,
  // Worker
  workerSummary:      () => ['analytics', 'worker', 'summary'] as const,
  workerTrend:        (granularity: 'week' | 'month') => ['analytics', 'worker', 'trend', granularity] as const,
  workerCommission:   (platform: string) => ['analytics', 'worker', 'commission-tracker', platform] as const,
  workerMedian:       (zone: string, category: string) => ['analytics', 'worker', 'median-compare', zone, category] as const,
  // KPIs
  cityMedian:         (zone: string, category: string) => ['analytics', 'kpi', 'city-median', zone, category] as const,
  advocateKpis:       () => ['analytics', 'advocate', 'kpis'] as const,
  // Advocate AA1–AA4
  commissionTrends:   () => ['analytics', 'advocate', 'commission-trends'] as const,
  incomeDistribution: (zone?: string) => ['analytics', 'advocate', 'income-distribution', zone ?? 'city-wide'] as const,
  topComplaints:      (window: '7d' | '30d' | '90d') => ['analytics', 'advocate', 'top-complaints', window] as const,
  vulnerability:      () => ['analytics', 'advocate', 'vulnerability'] as const,
  // Health
  health:             () => ['analytics', 'health'] as const,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// WORKER HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /worker/summary
 * Returns this-week earnings, this-month earnings, avg hourly rate, and
 * verification % for the authenticated worker.
 * Cached 1 minute server-side.
 */
export function useWorkerSummaryQuery() {
  return useQuery({
    queryKey: analyticsKeys.workerSummary(),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<WorkerSummaryResponse>('/worker/summary')
      return data
    },
    staleTime: 60_000,
  })
}

/**
 * GET /worker/trend?granularity=week|month
 * 12-period earnings time series for charting.
 * granularity: "week" (default) → last 12 weeks | "month" → last 12 months
 */
export function useWorkerTrendQuery(granularity: 'week' | 'month' = 'week') {
  return useQuery({
    queryKey: analyticsKeys.workerTrend(granularity),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<WorkerTrendResponse>('/worker/trend', {
        params: { granularity },
      })
      return data
    },
    staleTime: 60_000,
  })
}

/**
 * GET /worker/commission-tracker?platform=...
 * Avg + per-week deduction % for a given platform, plus 12-week series
 * for all platforms the worker has used.
 */
export function useWorkerCommissionTrackerQuery(platform: string = 'Uber') {
  return useQuery({
    queryKey: analyticsKeys.workerCommission(platform),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<CommissionTrackerResponse>(
        '/worker/commission-tracker',
        { params: { platform } },
      )
      return data
    },
    staleTime: 60_000,
  })
}

/**
 * GET /worker/median-compare?zone=...&category=...
 * K-anonymised comparison of the worker's median hourly rate vs the city median
 * for their zone + category. Returns cohort_too_small=true when cohort < 5.
 */
export function useWorkerMedianCompareQuery(
  params: { zone: string; category: string },
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: analyticsKeys.workerMedian(params.zone, params.category),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<MedianCompareResponse>(
        '/worker/median-compare',
        { params },
      )
      return data
    },
    enabled:   options?.enabled !== false && !!params.zone && !!params.category,
    staleTime: 60_000,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// KPI HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /benchmark/city-median?category=...&zone=...
 * K-anonymised median hourly rate for VERIFIED workers in a zone+category.
 * Used on the Worker Dashboard to contextualise individual earn rate.
 */
export function useCityMedianQuery(
  params: { zone: string; category: string },
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: analyticsKeys.cityMedian(params.zone, params.category),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<CityMedianResponse>(
        '/benchmark/city-median',
        { params },
      )
      return data
    },
    enabled:   options?.enabled !== false && !!params.zone && !!params.category,
    staleTime: 5 * 60_000,  // city median is slow-moving
  })
}

/**
 * GET /advocate/kpis
 * Combined AA1–AA4 snapshot (commission trends, income distribution,
 * vulnerable workers, top complaint categories) for the advocate dashboard.
 * Admin + advocate roles only.
 */
export function useAdvocateKpisQuery() {
  return useQuery({
    queryKey: analyticsKeys.advocateKpis(),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<AdvocateKpisResponse>('/advocate/kpis')
      return data
    },
    staleTime: 5 * 60_000,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADVOCATE AA1–AA4 HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * AA1 — GET /advocate/commission-trends
 * Per-platform average deduction % per week over last 12 weeks.
 * K-anonymised: cells with < 5 workers have avg_deduction_pct = null.
 */
export function useAdvocateCommissionTrendsQuery() {
  return useQuery({
    queryKey: analyticsKeys.commissionTrends(),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<CommissionTrendsResponse>(
        '/advocate/commission-trends',
      )
      return data
    },
    staleTime: 5 * 60_000,
  })
}

/**
 * AA2 — GET /advocate/income-distribution?zone=...
 * Percentile income distribution (p10/p25/p50/p75/p90) for the last 30 days.
 * Omit zone for city-wide view.
 * Returns cohort_too_small=true when < 5 workers in cohort.
 */
export function useAdvocateIncomeDistributionQuery(
  zone?: string,
) {
  return useQuery({
    queryKey: analyticsKeys.incomeDistribution(zone),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<IncomeDistributionResponse>(
        '/advocate/income-distribution',
        { params: zone ? { zone } : {} },
      )
      return data
    },
    staleTime: 5 * 60_000,
  })
}

/**
 * AA3 — GET /advocate/top-complaints?window=7d|30d|90d
 * Top 5 complaint categories by count in the selected time window.
 * Reads grievance.complaints cross-schema in production.
 */
export function useAdvocateTopComplaintsQuery(window: '7d' | '30d' | '90d' = '7d') {
  return useQuery({
    queryKey: analyticsKeys.topComplaints(window),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<TopComplaintsResponse>(
        '/advocate/top-complaints',
        { params: { window } },
      )
      return data
    },
    staleTime: 5 * 60_000,
  })
}

/**
 * AA4 — GET /advocate/vulnerability
 * Workers with MoM net income drop > 20% (from nightly materialised view).
 * K-anonymised: returns cohort_too_small=true if < 5 workers flagged.
 * anon_id is a SHA-256 hash — raw worker IDs are never exposed.
 * Cache TTL 15 minutes (data updates nightly).
 */
export function useAdvocateVulnerabilityQuery() {
  return useQuery({
    queryKey: analyticsKeys.vulnerability(),
    queryFn:  async () => {
      const { data } = await analyticsClient.get<VulnerabilityResponse>(
        '/advocate/vulnerability',
      )
      return data
    },
    staleTime: 15 * 60_000,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN MUTATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /advocate/internal/refresh-vulnerability
 * Force-triggers the nightly vulnerability materialised view recomputation.
 * Role required: admin or judge.
 * Use during demos or manual testing without waiting for the cron job.
 */
export function useRefreshVulnerabilityMutation() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await analyticsClient.post<RefreshVulnerabilityResponse>(
        '/advocate/internal/refresh-vulnerability',
      )
      return data
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// HEALTH
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /health
 * Simple uptime probe — returns { status: "ok", service: "analytics-service" }.
 * Useful for cold-start pings on Hugging Face Spaces.
 * No auth required.
 */
export function useAnalyticsHealthQuery() {
  return useQuery({
    queryKey:  analyticsKeys.health(),
    queryFn:   async () => {
      const { data } = await analyticsClient.get<AnalyticsHealthResponse>('/health')
      return data
    },
    staleTime: 30_000,
    retry:     3,
  })
}
