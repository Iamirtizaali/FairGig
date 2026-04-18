/**
 * features/certificate/api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * TanStack Query hooks for certificate-service:
 *   - Build certificate data for a date range (preview)
 *   - Share a certificate (creates a public link with TTL)
 *   - View a public certificate (no auth required)
 *   - Revoke a shared certificate
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { certClient } from '@/lib/certClient'
import type { BackendResponse } from '@/types/api'
import type {
  CertificateData,
  BuildCertificateParams,
  ShareCertificateRequest,
  ShareCertificateResponse,
  RevokeCertificateResponse,
} from '@/types/certificate'

export { extractApiMessage } from '@/lib/serviceClient'

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const certKeys = {
  build:  (from: string, to: string) => ['certificate', 'build', from, to] as const,
  public: (signedId: string)          => ['certificate', 'public', signedId] as const,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// BUILD — GET /certificate/v1/build?from=…&to=…
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches certificate data for the authenticated worker's verified shifts within
 * the given date range. This is the preview before sharing.
 * Worker role required. Returns an empty CertificateData if no verified shifts exist.
 */
export function useBuildCertificateQuery(
  { from, to }: BuildCertificateParams,
  enabled = true,
) {
  return useQuery({
    queryKey: certKeys.build(from, to),
    queryFn: async () => {
      const { data } = await certClient.get<BackendResponse<CertificateData>>(
        '/certificate/v1/build',
        { params: { from, to } },
      )
      return data.data!
    },
    enabled: enabled && !!from && !!to,
    staleTime: 60 * 1000, // 1 min
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARE — POST /certificate/v1/share
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a shareable certificate link with a UUID token.
 * Default TTL is 14 days; configurable up to 90.
 * Worker role required.
 * Returns { shareToken, shareUrl, expiresAt }.
 */
export function useShareCertificateMutation() {
  return useMutation<ShareCertificateResponse, AxiosError, ShareCertificateRequest>({
    mutationFn: async (body) => {
      const { data } = await certClient.post<BackendResponse<ShareCertificateResponse>>(
        '/certificate/v1/share',
        body,
      )
      return data.data!
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC VIEW — GET /certificate/v1/public/:signedId
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a public certificate by its share token. No authentication required.
 * Returns 404 if not found, 410 if revoked or expired.
 * The `Accept: application/json` header is set explicitly (backend also serves HTML).
 */
export function usePublicCertificateQuery(signedId: string, enabled = true) {
  return useQuery({
    queryKey: certKeys.public(signedId),
    queryFn: async () => {
      const { data } = await certClient.get<BackendResponse<CertificateData>>(
        `/certificate/v1/public/${signedId}`,
        { headers: { Accept: 'application/json' } },
      )
      return data.data!
    },
    enabled: enabled && !!signedId,
    staleTime: 5 * 60 * 1000, // public data rarely changes
    retry: (failCount, error) => {
      // Don't retry on 404 or 410 — certificate is gone
      const status = (error as AxiosError)?.response?.status
      if (status === 404 || status === 410) return false
      return failCount < 2
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// REVOKE — POST /certificate/v1/:signedId/revoke
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Revokes a certificate. Only the owning worker can revoke.
 * After revocation, the public URL returns 410.
 * Worker role required.
 */
export function useRevokeCertificateMutation() {
  const qc = useQueryClient()
  return useMutation<RevokeCertificateResponse, AxiosError, string>({
    mutationFn: async (signedId) => {
      const { data } = await certClient.post<BackendResponse<RevokeCertificateResponse>>(
        `/certificate/v1/${signedId}/revoke`,
      )
      return data.data!
    },
    onSuccess: (_result, signedId) => {
      qc.invalidateQueries({ queryKey: certKeys.public(signedId) })
    },
  })
}
