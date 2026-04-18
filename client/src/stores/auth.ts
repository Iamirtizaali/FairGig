import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { setApiToken } from '@/lib/apiClient'
import type { AuthUser } from '@/types/auth'

// ─── Auth Store ───────────────────────────────────────────────────────────────
// Persists the access token in sessionStorage. The HttpOnly refreshToken cookie
// is managed entirely by the browser (set by the backend on login/register).

interface AuthState {
  user: AuthUser | null
  accessToken: string | null

  // Called after login / register when backend returns { user, accessToken }
  setCredentials: (user: AuthUser, accessToken: string) => void

  // Called after GET /auth/v1/me (e.g. page load validation)
  setUser: (user: AuthUser) => void

  // Clear all auth state (called on logout or 401 without refresh)
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setCredentials: (user, accessToken) => {
        setApiToken(accessToken)
        set({ user, accessToken })
      },

      setUser: (user) => {
        set({ user })
      },

      clearAuth: () => {
        setApiToken(null)
        set({ user: null, accessToken: null })
      },
    }),
    {
      name: 'fg-auth',         // localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
      // Rehydrate the axios token on app boot
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          setApiToken(state.accessToken)
        }
      },
    },
  ),
)
