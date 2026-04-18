import { createServiceClient } from '@/lib/serviceClient'

/**
 * grievanceClient — pre-configured Axios instance for grievance-service
 * Base URL: VITE_GRIEVANCE_API_URL (default: http://localhost:3004)
 *
 * Attaches JWT, handles 401 → token refresh automatically.
 * Note: GET /grievance/v1/board is a public endpoint, but grievanceClient
 * still works because the interceptor is a no-op when no token is present.
 */
export const grievanceClient = createServiceClient(
  import.meta.env.VITE_GRIEVANCE_API_URL ?? 'http://localhost:3004',
)
