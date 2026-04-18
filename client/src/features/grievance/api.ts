/**
 * features/grievance/api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * TanStack Query hooks for grievance-service:
 *   - Complaints (CRUD + status + tags + comments + report)
 *   - Clusters (list + create + attach + similarity suggestions)
 *   - Public bulletin board (no auth)
 *   - Admin: content reports (list + resolve)
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { grievanceClient } from '@/lib/grievanceClient'
import type { BackendResponse } from '@/types/api'
import type {
  Complaint,
  ComplaintSummary,
  ComplaintComment,
  ComplaintTag,
  ComplaintCluster,
  ClusterSuggestion,
  ContentReport,
  PaginatedComplaints,
  PaginatedClusters,
  PaginatedReports,
  PaginatedBulletinBoard,
  CreateComplaintRequest,
  UpdateComplaintRequest,
  UpdateComplaintStatusRequest,
  AddTagRequest,
  AddCommentRequest,
  ReportComplaintRequest,
  ListComplaintsParams,
  CreateClusterRequest,
  AttachToClusterRequest,
  ListClustersParams,
  ListReportsParams,
} from '@/types/grievance'

export { extractApiMessage } from '@/lib/serviceClient'

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const grievanceKeys = {
  complaints:       (p: ListComplaintsParams) => ['grievance', 'complaints', p] as const,
  complaint:        (id: string)               => ['grievance', 'complaint', id] as const,
  clusters:         (p: ListClustersParams)    => ['grievance', 'clusters', p] as const,
  suggestions:      (seedId: string)           => ['grievance', 'suggestions', seedId] as const,
  board:            (page: number, limit: number) => ['grievance', 'board', page, limit] as const,
  adminReports:     (p: ListReportsParams)     => ['grievance', 'admin', 'reports', p] as const,
} as const

// ─────────────────────────────────────────────────────────────────────────────
// COMPLAINTS — CRUD
// ─────────────────────────────────────────────────────────────────────────────

/** GET /grievance/v1/complaints — paginated, role-filtered (author anon for worker/verifier) */
export function useComplaintsQuery(params: ListComplaintsParams = {}) {
  return useQuery({
    queryKey: grievanceKeys.complaints(params),
    queryFn: async () => {
      const { data } = await grievanceClient.get<BackendResponse<PaginatedComplaints>>(
        '/grievance/v1/complaints',
        { params },
      )
      return data.data!
    },
  })
}

/** GET /grievance/v1/complaints/:id — full complaint with comment thread */
export function useComplaintQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: grievanceKeys.complaint(id),
    queryFn: async () => {
      const { data } = await grievanceClient.get<BackendResponse<{ complaint: Complaint }>>(
        `/grievance/v1/complaints/${id}`,
      )
      return data.data!.complaint
    },
    enabled: enabled && !!id,
  })
}

/**
 * POST /grievance/v1/complaints
 * Roles: worker, advocate, admin
 */
export function useCreateComplaintMutation() {
  const qc = useQueryClient()
  return useMutation<{ complaint: ComplaintSummary }, AxiosError, CreateComplaintRequest>({
    mutationFn: async (body) => {
      const { data } = await grievanceClient.post<
        BackendResponse<{ complaint: ComplaintSummary }>
      >('/grievance/v1/complaints', body)
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['grievance', 'complaints'] })
    },
  })
}

/**
 * PATCH /grievance/v1/complaints/:id
 * Roles: author, advocate, admin — title/description/visibility
 */
export function useUpdateComplaintMutation(id: string) {
  const qc = useQueryClient()
  return useMutation<{ complaint: Complaint }, AxiosError, UpdateComplaintRequest>({
    mutationFn: async (body) => {
      const { data } = await grievanceClient.patch<BackendResponse<{ complaint: Complaint }>>(
        `/grievance/v1/complaints/${id}`,
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: grievanceKeys.complaint(id) })
      qc.invalidateQueries({ queryKey: ['grievance', 'complaints'] })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS & MODERATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PATCH /grievance/v1/complaints/:id/status
 * Roles: advocate, admin
 * Valid values: open | under_review | escalated | resolved | hidden
 */
export function useUpdateComplaintStatusMutation() {
  const qc = useQueryClient()
  return useMutation<
    { complaint: Complaint },
    AxiosError,
    { id: string } & UpdateComplaintStatusRequest
  >({
    mutationFn: async ({ id, ...body }) => {
      const { data } = await grievanceClient.patch<BackendResponse<{ complaint: Complaint }>>(
        `/grievance/v1/complaints/${id}/status`,
        body,
      )
      return data.data!
    },
    onSuccess: (_r, { id }) => {
      qc.invalidateQueries({ queryKey: grievanceKeys.complaint(id) })
      qc.invalidateQueries({ queryKey: ['grievance', 'complaints'] })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// TAGS
// ─────────────────────────────────────────────────────────────────────────────

/** POST /grievance/v1/complaints/:id/tags — roles: advocate, admin */
export function useAddTagMutation() {
  const qc = useQueryClient()
  return useMutation<{ tag: ComplaintTag }, AxiosError, { id: string } & AddTagRequest>({
    mutationFn: async ({ id, ...body }) => {
      const { data } = await grievanceClient.post<BackendResponse<{ tag: ComplaintTag }>>(
        `/grievance/v1/complaints/${id}/tags`,
        body,
      )
      return data.data!
    },
    onSuccess: (_r, { id }) => {
      qc.invalidateQueries({ queryKey: grievanceKeys.complaint(id) })
    },
  })
}

/** DELETE /grievance/v1/complaints/:id/tags/:tagId — roles: advocate, admin */
export function useRemoveTagMutation() {
  const qc = useQueryClient()
  return useMutation<void, AxiosError, { complaintId: string; tagId: string }>({
    mutationFn: async ({ complaintId, tagId }) => {
      await grievanceClient.delete(
        `/grievance/v1/complaints/${complaintId}/tags/${tagId}`,
      )
    },
    onSuccess: (_r, { complaintId }) => {
      qc.invalidateQueries({ queryKey: grievanceKeys.complaint(complaintId) })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// COMMENTS
// ─────────────────────────────────────────────────────────────────────────────

/** POST /grievance/v1/complaints/:id/comments — any authenticated user */
export function useAddCommentMutation() {
  const qc = useQueryClient()
  return useMutation<
    { comment: ComplaintComment },
    AxiosError,
    { complaintId: string } & AddCommentRequest
  >({
    mutationFn: async ({ complaintId, ...body }) => {
      const { data } = await grievanceClient.post<
        BackendResponse<{ comment: ComplaintComment }>
      >(`/grievance/v1/complaints/${complaintId}/comments`, body)
      return data.data!
    },
    onSuccess: (_r, { complaintId }) => {
      qc.invalidateQueries({ queryKey: grievanceKeys.complaint(complaintId) })
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// REPORT
// ─────────────────────────────────────────────────────────────────────────────

/** POST /grievance/v1/complaints/:id/report — flag a complaint for moderation */
export function useReportComplaintMutation() {
  return useMutation<void, AxiosError, { complaintId: string } & ReportComplaintRequest>({
    mutationFn: async ({ complaintId, ...body }) => {
      await grievanceClient.post(
        `/grievance/v1/complaints/${complaintId}/report`,
        body,
      )
    },
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTERS
// ─────────────────────────────────────────────────────────────────────────────

/** GET /grievance/v1/clusters — paginated cluster list */
export function useClustersQuery(params: ListClustersParams = {}) {
  return useQuery({
    queryKey: grievanceKeys.clusters(params),
    queryFn: async () => {
      const { data } = await grievanceClient.get<BackendResponse<PaginatedClusters>>(
        '/grievance/v1/clusters',
        { params },
      )
      return data.data!
    },
  })
}

/**
 * POST /grievance/v1/clusters — create a cluster (advocate/admin)
 * Required: title (3–200 chars). Optional: description (max 1000 chars).
 */
export function useCreateClusterMutation() {
  const qc = useQueryClient()
  return useMutation<{ cluster: ComplaintCluster }, AxiosError, CreateClusterRequest>({
    mutationFn: async (body) => {
      const { data } = await grievanceClient.post<BackendResponse<{ cluster: ComplaintCluster }>>(
        '/grievance/v1/clusters',
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['grievance', 'clusters'] })
    },
  })
}

/**
 * POST /grievance/v1/clusters/:id/attach — attach complaints to a cluster (advocate/admin)
 * Required: complaintIds (1–100 item array of complaint IDs)
 */
export function useAttachToClusterMutation() {
  const qc = useQueryClient()
  return useMutation<
    { attached: number },
    AxiosError,
    { clusterId: string } & AttachToClusterRequest
  >({
    mutationFn: async ({ clusterId, ...body }) => {
      const { data } = await grievanceClient.post<BackendResponse<{ attached: number }>>(
        `/grievance/v1/clusters/${clusterId}/attach`,
        body,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['grievance', 'clusters'] })
      qc.invalidateQueries({ queryKey: ['grievance', 'complaints'] })
    },
  })
}

/**
 * GET /grievance/v1/clusters/suggestions?seedId=…
 * Returns up to 5 complaints most textually similar to the seed (TF-IDF cosine).
 * Roles: advocate, admin
 */
export function useClusterSuggestionsQuery(seedId: string, enabled = true) {
  return useQuery({
    queryKey: grievanceKeys.suggestions(seedId),
    queryFn: async () => {
      const { data } = await grievanceClient.get<BackendResponse<{ suggestions: ClusterSuggestion[] }>>(
        '/grievance/v1/clusters/suggestions',
        { params: { seedId } },
      )
      return data.data!.suggestions
    },
    enabled: enabled && !!seedId,
    staleTime: 2 * 60 * 1000,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC BULLETIN BOARD
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /grievance/v1/board — public anonymous complaint board
 * No auth required. Only public_anon, non-hidden complaints. Author identities stripped.
 */
export function useBulletinBoardQuery(page = 1, limit = 20) {
  return useQuery({
    queryKey: grievanceKeys.board(page, limit),
    queryFn: async () => {
      const { data } = await grievanceClient.get<BackendResponse<PaginatedBulletinBoard>>(
        '/grievance/v1/board',
        { params: { page, limit } },
      )
      return data.data!
    },
    staleTime: 2 * 60 * 1000,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — Content Reports
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GET /grievance/v1/admin/reports — paginated content reports (admin only)
 * Optional filter: resolved=true|false
 */
export function useAdminReportsQuery(params: ListReportsParams = {}) {
  return useQuery({
    queryKey: grievanceKeys.adminReports(params),
    queryFn: async () => {
      const { data } = await grievanceClient.get<BackendResponse<PaginatedReports>>(
        '/grievance/v1/admin/reports',
        { params },
      )
      return data.data!
    },
  })
}

/** POST /grievance/v1/admin/reports/:id/resolve — mark report as resolved (admin only) */
export function useResolveReportMutation() {
  const qc = useQueryClient()
  return useMutation<{ report: ContentReport }, AxiosError, string>({
    mutationFn: async (id) => {
      const { data } = await grievanceClient.post<BackendResponse<{ report: ContentReport }>>(
        `/grievance/v1/admin/reports/${id}/resolve`,
      )
      return data.data!
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['grievance', 'admin', 'reports'] })
    },
  })
}
