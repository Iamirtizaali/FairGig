import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import LandingPage from '@/pages/LandingPage'
import WorkerDashboardPage from '@/pages/worker/DashboardPage'
import WorkerShiftsPage from '@/pages/worker/ShiftsPage'
import WorkerNewShiftPage from '@/pages/worker/NewShiftPage'
import WorkerShiftDetailPage from '@/pages/worker/ShiftDetailPage'
import WorkerImportPage from '@/pages/worker/ImportPage'
import WorkerAnalyticsPage from '@/pages/worker/AnalyticsPage'
import WorkerCertificatePage from '@/pages/worker/CertificatePage'
import WorkerGrievancesPage from '@/pages/worker/GrievancesPage'
import WorkerSettingsPage from '@/pages/worker/SettingsPage'

import VerifierQueuePage from '@/pages/verifier/QueuePage'
import VerifierReviewPage from '@/pages/verifier/ReviewPage'
import VerifierHistoryPage from '@/pages/verifier/HistoryPage'

import AdvocateOverviewPage from '@/pages/advocate/OverviewPage'
import AdvocateCommissionsPage from '@/pages/advocate/CommissionsPage'
import AdvocateZonesPage from '@/pages/advocate/ZonesPage'
import AdvocateComplaintsPage from '@/pages/advocate/ComplaintsPage'
import AdvocateVulnerabilityPage from '@/pages/advocate/VulnerabilityPage'

import AdminOverviewPage from '@/pages/admin/OverviewPage'
import AdminPlatformsPage from '@/pages/admin/PlatformsPage'
import AdminZonesPage from '@/pages/admin/ZonesPage'
import AdminUsersPage from '@/pages/admin/UsersPage'
import AdminAuditPage from '@/pages/admin/AuditPage'
import AdminSeedPage from '@/pages/admin/SeedPage'

import PublicCertificatePage from '@/pages/public/PublicCertificatePage'

import { WorkerLayout } from '@/components/layout/WorkerLayout'
import { VerifierLayout } from '@/components/layout/VerifierLayout'
import { AdvocateLayout } from '@/components/layout/AdvocateLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'

import SignInPage from '@/pages/auth/SignInPage'
import SignUpPage from '@/pages/auth/SignUpPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'

import { ProtectedRoute, RoleRoute, GuestRoute } from '@/components/auth/RouteGuards'

/**
 * Application router — centralised route definitions.
 *
 * Route groups:
 *   /                   → Public landing page
 *   /auth/*             → Authentication flows (GuestRoute — redirects if already logged in)
 *   /worker/*           → Worker portal (ProtectedRoute + RoleRoute[worker])
 *   /verify/*           → Verifier portal (ProtectedRoute + RoleRoute[verifier])
 *   /advocate/*         → Advocate portal (ProtectedRoute + RoleRoute[advocate])
 *   /admin/*            → Admin panel (ProtectedRoute + RoleRoute[admin])
 *   /certificate/public → Publicly accessible (no auth required)
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ────────────────────────────────────────────── */}
        <Route path="/" element={<LandingPage />} />

        {/* ── Authentication (guest only — redirects if logged in) ── */}
        <Route element={<GuestRoute />}>
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        {/* Backwards-compat aliases */}
        <Route path="/auth/login"    element={<Navigate to="/auth/sign-in" replace />} />
        <Route path="/auth/register" element={<Navigate to="/auth/sign-up" replace />} />

        {/* ── Protected portals — must be authenticated ─────────── */}
        <Route element={<ProtectedRoute />}>

          {/* Worker Portal — role: worker */}
          <Route element={<RoleRoute allowedRoles={['worker']} />}>
            <Route path="/worker" element={<WorkerLayout />}>
              <Route path="dashboard"  element={<WorkerDashboardPage />} />
              <Route path="shifts"     element={<WorkerShiftsPage />} />
              <Route path="shifts/new" element={<WorkerNewShiftPage />} />
              <Route path="shifts/:id" element={<WorkerShiftDetailPage />} />
              <Route path="import"     element={<WorkerImportPage />} />
              <Route path="analytics"  element={<WorkerAnalyticsPage />} />
              <Route path="certificate" element={<WorkerCertificatePage />} />
              <Route path="grievances" element={<WorkerGrievancesPage />} />
              <Route path="settings"   element={<WorkerSettingsPage />} />
            </Route>
          </Route>

          {/* Verifier Portal — role: verifier */}
          <Route element={<RoleRoute allowedRoles={['verifier']} />}>
            <Route path="/verify" element={<VerifierLayout />}>
              <Route path="queue"    element={<VerifierQueuePage />} />
              <Route path="history"  element={<VerifierHistoryPage />} />
              <Route path=":shiftId" element={<VerifierReviewPage />} />
            </Route>
          </Route>

          {/* Advocate Portal — role: advocate */}
          <Route element={<RoleRoute allowedRoles={['advocate']} />}>
            <Route path="/advocate" element={<AdvocateLayout />}>
              <Route path="overview"      element={<AdvocateOverviewPage />} />
              <Route path="commissions"   element={<AdvocateCommissionsPage />} />
              <Route path="zones"         element={<AdvocateZonesPage />} />
              <Route path="complaints"    element={<AdvocateComplaintsPage />} />
              <Route path="vulnerability" element={<AdvocateVulnerabilityPage />} />
            </Route>
          </Route>

          {/* Admin Panel — role: admin */}
          <Route element={<RoleRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="overview"  element={<AdminOverviewPage />} />
              <Route path="platforms" element={<AdminPlatformsPage />} />
              <Route path="zones"     element={<AdminZonesPage />} />
              <Route path="users"     element={<AdminUsersPage />} />
              <Route path="audit"     element={<AdminAuditPage />} />
              <Route path="seed"      element={<AdminSeedPage />} />
            </Route>
          </Route>

        </Route>

        {/* ── Public shared ─────────────────────────────────────── */}
        <Route path="/certificate/public/:signedId" element={<PublicCertificatePage />} />

        {/* ── 404 fallback ──────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
