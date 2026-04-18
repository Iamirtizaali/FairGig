// ─── Standard Backend Response Envelope ───────────────────────────────────────
// Matches: { data, meta, error } from auth-service/src/utils/response.ts

export interface BackendMeta {
  page?: number
  limit?: number
  total?: number
  [key: string]: unknown
}

export interface BackendError {
  code: string
  message: string
  fields?: Record<string, string>
}

export interface BackendResponse<T> {
  data: T | null
  meta: BackendMeta
  error: BackendError | null
}
