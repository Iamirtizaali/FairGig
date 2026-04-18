import { createServiceClient } from '@/lib/serviceClient'

/**
 * certClient — pre-configured Axios instance for certificate-service
 * Base URL: VITE_CERT_API_URL (default: http://localhost:3003)
 *
 * Attaches JWT, handles 401 → token refresh automatically.
 * Note: GET /certificate/v1/public/:signedId is a public endpoint — no JWT needed.
 * That call uses certClient too; the interceptor simply skips attachment when token is null.
 */
export const certClient = createServiceClient(
  import.meta.env.VITE_CERT_API_URL ?? 'http://localhost:3003',
)
