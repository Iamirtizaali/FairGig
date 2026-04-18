/**
 * features/shifts/api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * TanStack Query hooks for earnings-service:
 *   - Shifts (CRUD)
 *   - Verification (queue + submit decision)
 *   - Screenshots (presign → PUT → confirm → signed GET URL)
 *   - CSV Imports (upload + poll status + download template)
 *   - Reference data (platforms, city-zones) — public & admin variants
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { earningsClient } from '@/lib/earningsClient'
import type { BackendResponse } from '@/types/api'
import type {
  Shift,
  PaginatedShifts,
  PaginatedQueue,
  Screenshot,
  Verification,
  PresignResponse,
  ScreenshotUrlResponse,
  UploadCsvResponse,
  CsvImport,
  Platform,
  CityZone,
  CreateShiftRequest,
  UpdateShiftRequest,
  ListShiftsParams,
  PresignRequest,
  ConfirmScreenshotRequest,
  VerifyShiftRequest,
  CreatePlatformRequest,
  UpdatePlatformRequest,
  CreateCityZoneRequest,
  UpdateCityZoneRequest,
} from '@/types/earnings'

// ─── Re-export extractor for component use ────────────────────────────────────
export { extractApiMessage } from '@/lib/serviceClient'

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEYS
// ─────────────────────────────────────────────────────────────────────────────
export const shiftKeys = {
  all:             () => ['shifts'] as const,
  list:            (params: ListShiftsParams) => ['shifts', 'list', params] as const,
  detail:          (id: string) => ['shifts', 'detail', id] as const,
  verificationQ:   (page: number, limit: number) => ['shifts', 'verification-queue', page, limit] as const,
  screenshotUrl:   (shiftId: string) => ['shifts', 'screenshot-url', shiftId] as const,
  import:          (importId: string) => ['shifts', 'import', importId] as const,
  platforms:       () => ['shifts', 'platforms'] as const,
  allPlatforms:    () => ['shifts', 'admin', 'platforms'] as const,
  cityZones:       () => ['shifts', 'city-zones'] as const,
  allCityZones:    () => ['shifts', 'admin', 'city-zones'] as const,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// SHIFTS
// ─────────────────────────────────────────────────────────────────────────────

/** GET /earnings/v1/shifts — paginated, role-filtered */
export function useShiftsQuery(params: ListShiftsParams = {}) {
  return useQuery({
    queryKey: shiftKeys.list(params),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<PaginatedShifts>>(
        '/earnings/v1/shifts',
        { params },
      )
      return data.data!
    },
  })
}

/** GET /earnings/v1/shifts/:id — single shift with screenshots, verifications, anomaly flags */
export function useShiftQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: shiftKeys.detail(id),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<{ shift: Shift }>>(
        `/earnings/v1/shifts/${id}`,
      )
      return data.data!.shift
    },
    enabled: enabled && !!id,
  })
}

/** POST /earnings/v1/shifts — create a new shift (worker only)
 *  Note: netPay must equal grossPay − deductions or backend returns 422
 */
export function useCreateShiftMutation() {
  const qc = useQueryClient()
  return useMutation<{ shift: Shift }, AxiosError, CreateShiftRequest>({
    mutationFn: async (body) => {
      const { data } = await earningsClient.post<BackendResponse<{ shift: Shift }>>(
        '/earnings/v1/shifts',
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.all() })
    },
  })
}

/** PATCH /earnings/v1/shifts/:id — update shift (owner only, not if verified) */
export function useUpdateShiftMutation(id: string) {
  const qc = useQueryClient()
  return useMutation<{ shift: Shift }, AxiosError, UpdateShiftRequest>({
    mutationFn: async (body) => {
      const { data } = await earningsClient.patch<BackendResponse<{ shift: Shift }>>(
        `/earnings/v1/shifts/${id}`,
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.detail(id) })
      qc.invalidateQueries({ queryKey: shiftKeys.all() })
    },
  })
}

/** DELETE /earnings/v1/shifts/:id — soft delete (owner only) */
export function useDeleteShiftMutation() {
  const qc = useQueryClient()
  return useMutation<void, AxiosError, string>({
    mutationFn: async (id) => {
      await earningsClient.delete(`/earnings/v1/shifts/${id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.all() })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────

/** GET /earnings/v1/verification/queue — paginated pending_review shifts (verifier/admin) */
export function useVerificationQueueQuery(page = 1, limit = 20) {
  return useQuery({
    queryKey: shiftKeys.verificationQ(page, limit),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<PaginatedQueue>>(
        '/earnings/v1/verification/queue',
        { params: { page, limit } },
      )
      return data.data!
    },
  })
}

/** POST /earnings/v1/shifts/:id/verify — submit verification decision (verifier/admin) */
export function useVerifyShiftMutation() {
  const qc = useQueryClient()
  return useMutation<{ verification: Verification }, AxiosError, { id: string } & VerifyShiftRequest>({
    mutationFn: async ({ id, ...body }) => {
      const { data } = await earningsClient.post<BackendResponse<{ verification: Verification }>>(
        `/earnings/v1/shifts/${id}/verify`,
        body,
      )
      return data.data!
    },
    onSuccess: (_result, { id }) => {
      qc.invalidateQueries({ queryKey: shiftKeys.detail(id) })
      // Refresh queue so verified item disappears
      qc.invalidateQueries({ queryKey: ['shifts', 'verification-queue'] })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREENSHOTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /earnings/v1/shifts/:shiftId/screenshots/presign
 * Step 1: get a presigned PUT URL. Then PUT the file directly to signedUrl.
 * Step 2: call useConfirmScreenshotMutation.
 */
export function usePresignUploadMutation() {
  return useMutation<PresignResponse, AxiosError, { shiftId: string } & PresignRequest>({
    mutationFn: async ({ shiftId, ...body }) => {
      const { data } = await earningsClient.post<BackendResponse<PresignResponse>>(
        `/earnings/v1/shifts/${shiftId}/screenshots/presign`,
        body,
      )
      return data.data!
    },
  })
}

/**
 * POST /earnings/v1/shifts/:shiftId/screenshots
 * Step 2: confirm upload — creates Screenshot record + transitions shift to pending_review
 */
export function useConfirmScreenshotMutation() {
  const qc = useQueryClient()
  return useMutation<
    { screenshot: Screenshot },
    AxiosError,
    { shiftId: string } & ConfirmScreenshotRequest
  >({
    mutationFn: async ({ shiftId, ...body }) => {
      const { data } = await earningsClient.post<BackendResponse<{ screenshot: Screenshot }>>(
        `/earnings/v1/shifts/${shiftId}/screenshots`,
        body,
      )
      return data.data!
    },
    onSuccess: (_r, { shiftId }) => {
      qc.invalidateQueries({ queryKey: shiftKeys.detail(shiftId) })
    },
  })
}

/** GET /earnings/v1/shifts/:shiftId/screenshots/url — get 5-minute signed GET URL */
export function useScreenshotUrlQuery(shiftId: string, enabled = true) {
  return useQuery({
    queryKey: shiftKeys.screenshotUrl(shiftId),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<ScreenshotUrlResponse>>(
        `/earnings/v1/shifts/${shiftId}/screenshots/url`,
      )
      return data.data!
    },
    enabled: enabled && !!shiftId,
    staleTime: 4 * 60 * 1000, // 4 min — URL is valid for 5 min
    gcTime: 5 * 60 * 1000,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// CSV IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /earnings/v1/imports/csv — upload a CSV file (multipart/form-data)
 * Accepts a File object; enqueues a BullMQ job and returns importId.
 */
export function useUploadCsvMutation() {
  const qc = useQueryClient()
  return useMutation<UploadCsvResponse, AxiosError, File>({
    mutationFn: async (file) => {
      const fd = new FormData()
      fd.append('file', file)
      const { data } = await earningsClient.post<BackendResponse<UploadCsvResponse>>(
        '/earnings/v1/imports/csv',
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.all() })
    },
  })
}

/** GET /earnings/v1/imports/:importId — poll CSV import job status */
export function useImportStatusQuery(importId: string, enabled = true) {
  return useQuery({
    queryKey: shiftKeys.import(importId),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<{ import: CsvImport }>>(
        `/earnings/v1/imports/${importId}`,
      )
      return data.data!.import
    },
    enabled: enabled && !!importId,
    refetchInterval: (query) => {
      const status = query.state.data?.status
      // Auto-poll every 2s while processing
      return status === 'queued' || status === 'processing' ? 2000 : false
    },
  })
}

/**
 * GET /earnings/v1/imports/template — download CSV template
 * Returns a Blob; no auth required (public route).
 * This is not a React Query hook — call it imperatively to trigger a browser download.
 */
export async function downloadCsvTemplate(): Promise<void> {
  const response = await earningsClient.get('/earnings/v1/imports/template', {
    responseType: 'blob',
  })
  const url = URL.createObjectURL(response.data as Blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'fairgig_shifts_template.csv'
  a.click()
  URL.revokeObjectURL(url)
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCE DATA — Platforms & City Zones
// ─────────────────────────────────────────────────────────────────────────────

/** GET /earnings/v1/platforms — all active platforms (cached ~5 min server-side) */
export function usePlatformsQuery() {
  return useQuery({
    queryKey: shiftKeys.platforms(),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<{ platforms: Platform[] }>>(
        '/earnings/v1/platforms',
      )
      return data.data!.platforms
    },
    staleTime: 5 * 60 * 1000,
  })
}

/** GET /earnings/v1/city-zones — all active city zones (cached ~5 min server-side) */
export function useCityZonesQuery() {
  return useQuery({
    queryKey: shiftKeys.cityZones(),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<{ zones: CityZone[] }>>(
        '/earnings/v1/city-zones',
      )
      return data.data!.zones
    },
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Admin: Platforms ─────────────────────────────────────────────────────────

/** GET /earnings/v1/admin/platforms — all platforms including inactive (admin only) */
export function useAdminPlatformsQuery() {
  return useQuery({
    queryKey: shiftKeys.allPlatforms(),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<{ platforms: Platform[] }>>(
        '/earnings/v1/admin/platforms',
      )
      return data.data!.platforms
    },
  })
}

/** POST /earnings/v1/admin/platforms (admin only) */
export function useAdminCreatePlatformMutation() {
  const qc = useQueryClient()
  return useMutation<{ platform: Platform }, AxiosError, CreatePlatformRequest>({
    mutationFn: async (body) => {
      const { data } = await earningsClient.post<BackendResponse<{ platform: Platform }>>(
        '/earnings/v1/admin/platforms',
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.allPlatforms() })
      qc.invalidateQueries({ queryKey: shiftKeys.platforms() })
    },
  })
}

/** PATCH /earnings/v1/admin/platforms/:id (admin only) */
export function useAdminUpdatePlatformMutation() {
  const qc = useQueryClient()
  return useMutation<
    { platform: Platform },
    AxiosError,
    { id: string } & UpdatePlatformRequest
  >({
    mutationFn: async ({ id, ...body }) => {
      const { data } = await earningsClient.patch<BackendResponse<{ platform: Platform }>>(
        `/earnings/v1/admin/platforms/${id}`,
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.allPlatforms() })
      qc.invalidateQueries({ queryKey: shiftKeys.platforms() })
    },
  })
}

// ─── Admin: City Zones ────────────────────────────────────────────────────────

/** GET /earnings/v1/admin/city-zones — all city zones including inactive (admin only) */
export function useAdminCityZonesQuery() {
  return useQuery({
    queryKey: shiftKeys.allCityZones(),
    queryFn: async () => {
      const { data } = await earningsClient.get<BackendResponse<{ zones: CityZone[] }>>(
        '/earnings/v1/admin/city-zones',
      )
      return data.data!.zones
    },
  })
}

/** POST /earnings/v1/admin/city-zones (admin only) */
export function useAdminCreateCityZoneMutation() {
  const qc = useQueryClient()
  return useMutation<{ zone: CityZone }, AxiosError, CreateCityZoneRequest>({
    mutationFn: async (body) => {
      const { data } = await earningsClient.post<BackendResponse<{ zone: CityZone }>>(
        '/earnings/v1/admin/city-zones',
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.allCityZones() })
      qc.invalidateQueries({ queryKey: shiftKeys.cityZones() })
    },
  })
}

/** PATCH /earnings/v1/admin/city-zones/:id (admin only) */
export function useAdminUpdateCityZoneMutation() {
  const qc = useQueryClient()
  return useMutation<
    { zone: CityZone },
    AxiosError,
    { id: string } & UpdateCityZoneRequest
  >({
    mutationFn: async ({ id, ...body }) => {
      const { data } = await earningsClient.patch<BackendResponse<{ zone: CityZone }>>(
        `/earnings/v1/admin/city-zones/${id}`,
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: shiftKeys.allCityZones() })
      qc.invalidateQueries({ queryKey: shiftKeys.cityZones() })
    },
  })
}
