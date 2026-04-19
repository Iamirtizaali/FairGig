import { createServiceClient } from '@/lib/serviceClient'

/**
 * analyticsClient — pre-configured Axios instance for the FastAPI analytics-service
 * Base URL: VITE_ANALYTICS_API_URL (default: http://localhost:5001)
 *
 * Attaches Bearer JWT automatically via the shared serviceClient interceptors.
 */
export const analyticsClient = createServiceClient(
  import.meta.env.VITE_ANALYTICS_API_URL ?? 'http://localhost:5001',
)
