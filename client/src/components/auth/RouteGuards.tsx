import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '@/stores/auth'
import type { UserRole } from '@/types/auth'

// ─── ProtectedRoute ───────────────────────────────────────────────────────────
// Wraps any route that requires authentication.
// Redirects unauthenticated users to /auth/sign-in, preserving the intended URL.
export function ProtectedRoute() {
  const accessToken = useAuthStore((s) => s.accessToken)
  const location = useLocation()

  if (!accessToken) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  }

  return <Outlet />
}

// ─── RoleRoute ────────────────────────────────────────────────────────────────
// Wraps a portal that is limited to one or more specific roles.
// If the user is authenticated but in the wrong role, redirects to their portal.
interface RoleRouteProps {
  allowedRoles: UserRole[]
}

const ROLE_HOME: Record<UserRole, string> = {
  worker:   '/worker/dashboard',
  verifier: '/verify/queue',
  advocate: '/advocate/overview',
  admin:    '/admin/overview',
}

export function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const user = useAuthStore((s) => s.user)

  if (!user) {
    // ProtectedRoute should have caught this first, but guard defensively
    return <Navigate to="/auth/sign-in" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    // Authenticated but wrong role — send to their own dashboard
    return <Navigate to={ROLE_HOME[user.role] ?? '/'} replace />
  }

  return <Outlet />
}

// ─── GuestRoute ───────────────────────────────────────────────────────────────
// Wraps auth pages (sign-in, sign-up).
// Redirects already-authenticated users away to their dashboard.
export function GuestRoute() {
  const user = useAuthStore((s) => s.user)
  const accessToken = useAuthStore((s) => s.accessToken)

  if (accessToken && user) {
    return <Navigate to={ROLE_HOME[user.role] ?? '/worker/dashboard'} replace />
  }

  return <Outlet />
}
