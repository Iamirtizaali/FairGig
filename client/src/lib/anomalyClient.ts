import { createServiceClient } from '@/lib/serviceClient'

/**
 * anomalyClient — pre-configured Axios instance for the FastAPI anomaly-service
 * Base URL: VITE_ANOMALY_API_URL (default: http://localhost:5002)
 *
 * Supports two auth modes (interceptor sends JWT by default):
 *   - Bearer JWT  — standard user sessions
 *   - X-API-Key   — judge / demo bypass; set VITE_JUDGE_API_KEY in .env
 *
 * Attaches Bearer JWT automatically via the shared serviceClient interceptors.
 */
export const anomalyClient = createServiceClient(
  import.meta.env.VITE_ANOMALY_API_URL ?? 'http://localhost:5002',
)
