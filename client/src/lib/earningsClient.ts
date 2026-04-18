import { createServiceClient } from '@/lib/serviceClient'

/**
 * earningsClient — pre-configured Axios instance for earnings-service
 * Base URL: VITE_EARNINGS_API_URL (default: http://localhost:3002)
 *
 * Attaches JWT, handles 401 → token refresh automatically.
 */
export const earningsClient = createServiceClient(
  import.meta.env.VITE_EARNINGS_API_URL ?? 'http://localhost:3002',
)
