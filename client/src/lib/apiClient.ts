import axios, { type AxiosError } from 'axios'
import type { BackendResponse } from '@/types/api'

// ─── Base URL ─────────────────────────────────────────────────────────────────
// Set VITE_AUTH_API_URL in .env (e.g. http://localhost:3001)
const BASE_URL = import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:3001'

// ─── Axios instance ───────────────────────────────────────────────────────────
export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,   // Required: sends the HttpOnly refreshToken cookie automatically
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Token store (module-level, avoids Zustand circular deps) ─────────────────
let _accessToken: string | null = null

export function setApiToken(token: string | null) {
  _accessToken = token
}

export function getApiToken(): string | null {
  return _accessToken
}

// ─── Request interceptor — attach JWT ─────────────────────────────────────────
apiClient.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`
  }
  return config
})

// ─── Response interceptor — handle 401 ────────────────────────────────────────
let _isRefreshing = false
let _refreshQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = []

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<BackendResponse<unknown>>) => {
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean })

    // If the refresh endpoint itself fails, clear state and bail
    if (originalRequest?.url?.includes('/auth/v1/refresh')) {
      setApiToken(null)
      // Redirect to sign-in — we do this via window to avoid circular import with router
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/sign-in'
      }
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (_isRefreshing) {
        // Queue the request — it will be replayed once refresh completes
        return new Promise((resolve, reject) => {
          _refreshQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(apiClient(originalRequest))
            },
            reject,
          })
        })
      }

      originalRequest._retry = true
      _isRefreshing = true

      try {
        // Attempt token rotation via the cookie-based refresh endpoint
        const { data } = await apiClient.post<BackendResponse<{ accessToken: string }>>('/auth/v1/refresh')
        const newToken = data.data!.accessToken
        setApiToken(newToken)

        // Flush the queued requests with the new token
        _refreshQueue.forEach(({ resolve }) => resolve(newToken))
        _refreshQueue = []

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        _refreshQueue.forEach(({ reject }) => reject(refreshError))
        _refreshQueue = []
        setApiToken(null)
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in'
        }
        return Promise.reject(refreshError)
      } finally {
        _isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

// ─── Helper to extract backend field errors ───────────────────────────────────
export function extractApiFieldErrors(err: unknown): Record<string, string> {
  const axiosError = err as AxiosError<BackendResponse<unknown>>
  return axiosError.response?.data?.error?.fields ?? {}
}

export function extractApiMessage(err: unknown): string {
  const axiosError = err as AxiosError<BackendResponse<unknown>>
  return (
    axiosError.response?.data?.error?.message ??
    (err as Error)?.message ??
    'An unexpected error occurred'
  )
}
