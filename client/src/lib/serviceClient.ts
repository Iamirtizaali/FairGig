/**
 * createServiceClient
 * Factory that produces a pre-configured Axios instance for any FairGig
 * microservice. Automatically:
 *  - attaches the JWT access-token from the shared token store
 *  - handles 401 → token refresh via the auth-service HttpOnly cookie
 *  - redirects to /auth/sign-in when refresh fails
 *
 * Usage:
 *   import { earningsClient } from '@/lib/earningsClient'
 */
import axios, { type AxiosError, type AxiosInstance } from 'axios'
import type { BackendResponse } from '@/types/api'
import { getApiToken, setApiToken } from '@/lib/apiClient'

// Re-export message extractor so feature files can import from one place
export { extractApiMessage, extractApiFieldErrors } from '@/lib/apiClient'

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

  // ── Handle 401 → refresh via auth-service cookie ───────────────────────────
  let isRefreshing = false
  let queue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = []

  client.interceptors.response.use(
    (r) => r,
    async (error: AxiosError<BackendResponse<unknown>>) => {
      const original = error.config as typeof error.config & { _retry?: boolean }

      if (error.response?.status === 401 && !original?._retry) {
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
          // Auth-service is always at VITE_AUTH_API_URL — import dynamically to avoid circular
          const { apiClient } = await import('@/lib/apiClient')
          const { data } = await apiClient.post<BackendResponse<{ accessToken: string }>>(
            '/auth/v1/refresh',
          )
          const newToken = data.data!.accessToken
          setApiToken(newToken)
          queue.forEach(({ resolve }) => resolve(newToken))
          queue = []
          original!.headers!.Authorization = `Bearer ${newToken}`
          return client(original!)
        } catch (err) {
          queue.forEach(({ reject }) => reject(err))
          queue = []
          setApiToken(null)
          if (typeof window !== 'undefined') window.location.href = '/auth/sign-in'
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    },
  )

  return client
}
