// ─────────────────────────────────────────────────────────────────────────────
// Grievance Service Types
// Mirrors: grievance-service/src/validators/grievance.schema.ts + controller shapes
// ─────────────────────────────────────────────────────────────────────────────

// ─── Enums / Literals ─────────────────────────────────────────────────────────

export type ComplaintStatus =
  | 'open'
  | 'under_review'
  | 'escalated'
  | 'resolved'
  | 'hidden'

export type ComplaintVisibility = 'public_anon' | 'internal'

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface ComplaintTag {
  id: string
  label: string
  addedById: string
  createdAt: string
}

export interface ComplaintComment {
  id: string
  complaintId: string
  authorId: string
  /** Anonymised for workers/verifiers; real name for advocates/admins */
  authorName: string | null
  body: string
  createdAt: string
  updatedAt: string
}

export interface Complaint {
  id: string
  authorId: string
  /** null when visibility=public_anon and caller is worker/verifier */
  authorName: string | null
  platform: string
  category: string
  title: string
  description: string
  visibility: ComplaintVisibility
  status: ComplaintStatus
  tags: ComplaintTag[]
  comments: ComplaintComment[]
  clusterId: string | null
  reportCount: number
  createdAt: string
  updatedAt: string
}

/** Lighter list item without full comment thread */
export interface ComplaintSummary
  extends Omit<Complaint, 'comments' | 'description'> {
  commentCount: number
}

export interface ComplaintCluster {
  id: string
  title: string
  description: string | null
  complaintCount: number
  createdById: string
  createdAt: string
  updatedAt: string
}

export interface ClusterSuggestion {
  complaintId: string
  title: string
  similarity: number
}

export interface ContentReport {
  id: string
  complaintId: string
  reporterId: string
  reason: string
  resolved: boolean
  resolvedById: string | null
  resolvedAt: string | null
  createdAt: string
}

// ─── Request Types ────────────────────────────────────────────────────────────

export interface CreateComplaintRequest {
  platform: string
  category: string
  title: string
  description: string
  visibility?: ComplaintVisibility   // default: 'public_anon'
}

export interface UpdateComplaintRequest {
  title?: string
  description?: string
  visibility?: ComplaintVisibility
}

export interface UpdateComplaintStatusRequest {
  status: ComplaintStatus
}

export interface AddTagRequest {
  label: string
}

export interface AddCommentRequest {
  body: string
}

export interface ReportComplaintRequest {
  reason: string
}

export interface ListComplaintsParams {
  page?: number
  limit?: number
  platform?: string
  category?: string
  status?: ComplaintStatus
  tag?: string
}

export interface CreateClusterRequest {
  title: string
  description?: string
}

export interface AttachToClusterRequest {
  complaintIds: string[]
}

export interface ListClustersParams {
  page?: number
  limit?: number
}

export interface ListReportsParams {
  page?: number
  limit?: number
  resolved?: boolean
}

// ─── Response Types ───────────────────────────────────────────────────────────

export interface PaginatedComplaints {
  complaints: ComplaintSummary[]
  meta: { page: number; limit: number; total: number }
}

export interface PaginatedClusters {
  clusters: ComplaintCluster[]
  meta: { page: number; limit: number; total: number }
}

export interface PaginatedReports {
  reports: ContentReport[]
  meta: { page: number; limit: number; total: number }
}

export interface BulletinBoardItem {
  id: string
  platform: string
  category: string
  title: string
  status: ComplaintStatus
  tags: Pick<ComplaintTag, 'id' | 'label'>[]
  commentCount: number
  createdAt: string
}

export interface PaginatedBulletinBoard {
  complaints: BulletinBoardItem[]
  meta: { page: number; limit: number; total: number }
}
