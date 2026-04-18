import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { apiClient, extractApiMessage } from '@/lib/apiClient'
import { useAuthStore } from '@/stores/auth'
import type { BackendResponse } from '@/types/api'
import type {
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateMeRequest,
  RoleRequestRequest,
  UpdateUserStatusRequest,
  AuthResponseData,
  RefreshResponseData,
  MeResponseData,
  RoleRequestResponseData,
  RoleRequestsListData,
} from '@/types/auth'

// ─── Keys ─────────────────────────────────────────────────────────────────────
export const authKeys = {
  me: ['auth', 'me'] as const,
  roleRequests: (page: number, limit: number) => ['auth', 'role-requests', page, limit] as const,
}

// ─── Fetch current user (GET /auth/v1/me) ─────────────────────────────────────
// Used to validate / rehydrate session on app load
export function useCurrentUser() {
  const setUser = useAuthStore((s) => s.setUser)
  const accessToken = useAuthStore((s) => s.accessToken)

  return useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      const res = await apiClient.get<BackendResponse<MeResponseData>>('/auth/v1/me')
      const user = res.data.data!.user
      setUser(user)
      return user
    },
    enabled: !!accessToken,         // only fires when we have a token
    staleTime: 5 * 60 * 1000,       // 5 min
    retry: false,                    // on 401 the interceptor handles logout
  })
}

// ─── Register (POST /auth/v1/register) ────────────────────────────────────────
export function useRegisterMutation() {
  const setCredentials = useAuthStore((s) => s.setCredentials)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      const res = await apiClient.post<BackendResponse<AuthResponseData>>('/auth/v1/register', payload)
      return res.data.data!
    },
    onSuccess: ({ user, accessToken }) => {
      setCredentials(user, accessToken)
      // Role router — worker is the only role on registration
      navigate('/worker/dashboard', { replace: true })
    },
  })
}

// ─── Login (POST /auth/v1/login) ──────────────────────────────────────────────
export function useLoginMutation() {
  const setCredentials = useAuthStore((s) => s.setCredentials)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const res = await apiClient.post<BackendResponse<AuthResponseData>>('/auth/v1/login', payload)
      return res.data.data!
    },
    onSuccess: ({ user, accessToken }) => {
      setCredentials(user, accessToken)
      // Role-based redirect
      const roleRoute: Record<string, string> = {
        worker:   '/worker/dashboard',
        verifier: '/verify/queue',
        advocate: '/advocate/overview',
        admin:    '/admin/overview',
      }
      navigate(roleRoute[user.role] ?? '/worker/dashboard', { replace: true })
    },
  })
}

// ─── Logout (POST /auth/v1/logout) ────────────────────────────────────────────
export function useLogoutMutation() {
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      // Fire-and-forget — even if it fails, we clear local state
      await apiClient.post('/auth/v1/logout').catch(() => {})
    },
    onSettled: () => {
      clearAuth()
      queryClient.clear()
      navigate('/auth/sign-in', { replace: true })
    },
  })
}

// ─── Refresh (POST /auth/v1/refresh) ──────────────────────────────────────────
// Normally called automatically by the Axios interceptor.
// Exposed here in case a component needs to manually trigger a token refresh.
export function useRefreshMutation() {
  const setCredentials = useAuthStore((s) => s.setCredentials)
  const user = useAuthStore((s) => s.user)

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post<BackendResponse<RefreshResponseData>>('/auth/v1/refresh')
      return res.data.data!.accessToken
    },
    onSuccess: (accessToken) => {
      if (user) setCredentials(user, accessToken)
    },
  })
}

// ─── Forgot password (POST /auth/v1/forgot-password) ──────────────────────────
// Always returns 200 — never reveals whether email exists (backend design).
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordRequest) => {
      await apiClient.post('/auth/v1/forgot-password', payload)
    },
  })
}

// ─── Reset password (POST /auth/v1/reset-password) ────────────────────────────
// token = UUID from the reset email link (/auth/reset-password?token=UUID)
// password = new password (backend field name is `password`, not `newPassword`)
export function useResetPasswordMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: ResetPasswordRequest) => {
      await apiClient.post('/auth/v1/reset-password', payload)
    },
    onSuccess: () => {
      navigate('/auth/sign-in', { replace: true })
    },
  })
}

// ─── Change password (POST /auth/v1/change-password) ─────────────────────────
export function useChangePasswordMutation() {
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: ChangePasswordRequest) => {
      await apiClient.post('/auth/v1/change-password', payload)
    },
    // Backend revokes all refresh tokens on password change → force re-login
    onSuccess: () => {
      clearAuth()
      navigate('/auth/sign-in', { replace: true })
    },
  })
}

// ─── Update profile (PATCH /auth/v1/me) ───────────────────────────────────────
export function useUpdateMeMutation() {
  const setUser = useAuthStore((s) => s.setUser)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateMeRequest) => {
      const res = await apiClient.patch<BackendResponse<MeResponseData>>('/auth/v1/me', payload)
      return res.data.data!.user
    },
    onSuccess: (user) => {
      setUser(user)
      queryClient.setQueryData(authKeys.me, user)
    },
  })
}

// ─── Create role request (POST /auth/v1/role-requests) ────────────────────────
// Only workers can call this. requestedRole: 'verifier' | 'advocate'
export function useCreateRoleRequestMutation() {
  return useMutation({
    mutationFn: async (payload: RoleRequestRequest) => {
      const res = await apiClient.post<BackendResponse<RoleRequestResponseData>>('/auth/v1/role-requests', payload)
      return res.data.data!.roleRequest
    },
  })
}

// ─── List role requests (GET /auth/v1/role-requests) — admin only ─────────────
export function useRoleRequestsQuery(page = 1, limit = 20) {
  return useQuery({
    queryKey: authKeys.roleRequests(page, limit),
    queryFn: async () => {
      const res = await apiClient.get<BackendResponse<RoleRequestsListData>>(
        '/auth/v1/role-requests',
        { params: { page, limit } },
      )
      return {
        requests: res.data.data!.requests,
        meta: res.data.meta,
      }
    },
  })
}

// ─── Approve role request (POST /auth/v1/role-requests/:id/approve) — admin ───
export function useApproveRoleRequestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.post(`/auth/v1/role-requests/${id}/approve`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'role-requests'] })
    },
  })
}

// ─── Reject role request (POST /auth/v1/role-requests/:id/reject) — admin ─────
export function useRejectRoleRequestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note?: string }) => {
      await apiClient.post(`/auth/v1/role-requests/${id}/reject`, { note })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'role-requests'] })
    },
  })
}

// ─── Update user status (PATCH /auth/v1/admin/users/:id/status) — admin ───────
export function useUpdateUserStatusMutation() {
  return useMutation({
    mutationFn: async ({ id, ...payload }: { id: string } & UpdateUserStatusRequest) => {
      const res = await apiClient.patch<BackendResponse<{ user: unknown }>>(
        `/auth/v1/admin/users/${id}/status`,
        payload,
      )
      return res.data.data
    },
  })
}

// ─── Re-export extractApiMessage for use in pages ─────────────────────────────
export { extractApiMessage }
