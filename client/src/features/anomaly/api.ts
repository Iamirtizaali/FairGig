/**
 * features/anomaly/api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * TanStack Query hooks for the FastAPI anomaly-service.
 *
 * Service endpoints (base URL: VITE_ANOMALY_API_URL or http://localhost:5002):
 *
 *   POST /detect    → useAnomalyDetectMutation
 *   GET  /health    → useAnomalyHealthQuery
 *
 * Authentication — supply one of:
 *   - Authorization: Bearer <JWT>  (standard — sent automatically by anomalyClient)
 *   - X-API-Key: <key>             (judge/demo bypass — see VITE_JUDGE_API_KEY in .env)
 *
 * Detection algorithms:
 *   | Method            | Window         | Trigger                          |
 *   |---|---|---|
 *   | deduction_spike   | 7d vs 60d base | Z > z_threshold (default 2.5)    |
 *   | hourly_rate_drop  | 7d vs 60d base | Z < -z_threshold                 |
 *   | income_drop_mom   | 30d vs prior 30d | Drop > mom_drop_pct% (def 20%) |
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useQuery, useMutation } from '@tanstack/react-query'
import { anomalyClient } from '@/lib/anomalyClient'
import type {
  AnomalyDetectRequest,
  AnomalyDetectResponse,
  AnomalyHealthResponse,
} from '@/types/anomaly'

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEYS
// ─────────────────────────────────────────────────────────────────────────────
export const anomalyKeys = {
  all:    () => ['anomaly'] as const,
  health: () => ['anomaly', 'health'] as const,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// DETECT MUTATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /detect
 *
 * Sends the worker's shift history to the anomaly-service and returns a list
 * of detected statistical anomalies (deduction_spike, hourly_rate_drop, income_drop_mom).
 *
 * Usage:
 *   const detect = useAnomalyDetectMutation()
 *   detect.mutate({ worker_id: 'W-123', shifts: [...], options: { z_threshold: 2.5 } })
 *
 * Backend validation constraints (returns 422 if violated):
 *   - hours_worked: (0, 24]
 *   - gross_earned & platform_deductions: ≥ 0
 *   - No two shifts may share the same (date, platform) pair
 *
 * Response:
 *   - status = "clean"        → anomalies is []
 *   - status = "issues_found" → anomalies has ≥1 entries, each with a plain-language explanation
 *
 * Judge/demo bypass: set VITE_JUDGE_API_KEY in .env — the hook adds X-API-Key header.
 */
export function useAnomalyDetectMutation() {
  const judgeApiKey = import.meta.env.VITE_JUDGE_API_KEY as string | undefined

  return useMutation({
    mutationFn: async (payload: AnomalyDetectRequest) => {
      const headers: Record<string, string> = {}
      if (judgeApiKey) {
        headers['X-API-Key'] = judgeApiKey
      }
      const { data } = await anomalyClient.post<AnomalyDetectResponse>(
        '/detect',
        payload,
        { headers },
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
 * Uptime probe — returns { status: "ok", service: "anomaly-service", version: "1.0.0" }.
 *
 * Call this on app load to warm up the FastAPI Hugging Face Space container
 * (avoids cold-start delay on the first user-triggered /detect call).
 * No auth required.
 */
export function useAnomalyHealthQuery() {
  return useQuery({
    queryKey:  anomalyKeys.health(),
    queryFn:   async () => {
      const { data } = await anomalyClient.get<AnomalyHealthResponse>('/health')
      return data
    },
    staleTime: 30_000,
    retry:     3,
  })
}
