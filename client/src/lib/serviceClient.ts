/**
 * createServiceClient
 * Factory that produces a pre-configured Axios instance for any FairGig
 * microservice. Automatically:
 *  - attaches the JWT access-token from the shared token store
 *  - handles 401 → token refresh via the auth-service HttpOnly cookie
 *  - redirects to /auth/sign-in when refresh fails (no valid cookie)
 *
 * Usage:
 *   import { earningsClient } from '@/lib/earningsClient'
 */
import axios, { type AxiosError, type AxiosInstance } from 'axios'
import type { BackendResponse } from '@/types/api'
import { getApiToken, setApiToken } from '@/lib/apiClient'

// Re-export message extractor so feature files can import from one place
export { extractApiMessage, extractApiFieldErrors } from '@/lib/apiClient'

// Auth service base URL — used to call the refresh endpoint from microservice clients
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL ?? 'http://localhost:3001'

export function createServiceClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })

  // ── Attach JWT ──────────────────────────────────────────────────────────────
  client.interceptors.request.use((config) => {
    const token = getApiToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // ── Handle 401 → refresh via auth-service HttpOnly cookie ──────────────────
  // Pattern: single refresh attempt → queue concurrent retries → redirect on failure
  let isRefreshing = false
  let queue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = []

  const flushQueue = (token: string) => {
    queue.forEach(({ resolve }) => resolve(token))
    queue = []
  }

  const rejectQueue = (err: unknown) => {
    queue.forEach(({ reject }) => reject(err))
    queue = []
  }

  client.interceptors.response.use(
    (r) => r,
    async (error: AxiosError<BackendResponse<unknown>>) => {
      const original = error.config as typeof error.config & { _retry?: boolean }

      // Not a 401, or already retried — propagate immediately
      if (error.response?.status !== 401 || original?._retry) {
        return Promise.reject(error)
      }

      // If a refresh is already in-flight, queue this request until it resolves
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              original!.headers!.Authorization = `Bearer ${token}`
              resolve(client(original!))
            },
            reject,
          })
        })
      }

      original!._retry = true
      isRefreshing = true

      try {
        // Call the auth service refresh endpoint directly (not through this client)
        // so we don't trigger this same interceptor recursively
        const { data } = await axios.post<BackendResponse<{ accessToken: string }>>(
          `${AUTH_BASE_URL}/auth/v1/refresh`,
          null,
          { withCredentials: true }, // sends the HttpOnly refreshToken cookie
        )

        const newToken = data.data!.accessToken

        // Persist new token in module-level store (apiClient) + Zustand auth store
        setApiToken(newToken)

        // Also update Zustand store so the rest of the app stays in sync
        // Dynamic import avoids circular dependency
        import('@/stores/auth').then(({ useAuthStore }) => {
          const state = useAuthStore.getState()
          if (state.user) {
            // Reuse setCredentials to keep token in sync (user unchanged)
            state.setCredentials(state.user, newToken)
          }
        })

        flushQueue(newToken)
        original!.headers!.Authorization = `Bearer ${newToken}`
        return client(original!)
      } catch (err) {
        // Refresh failed (expired/invalid cookie) — clear auth and redirect
        rejectQueue(err)
        setApiToken(null)
        import('@/stores/auth').then(({ useAuthStore }) => {
          useAuthStore.getState().clearAuth()
        })
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in'
        }
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    },
  )

  return client
}
