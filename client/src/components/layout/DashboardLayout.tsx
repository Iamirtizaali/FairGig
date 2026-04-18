import type { ReactNode } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

// ─── Nav item type (exported so Sidebar can use it) ───────────────────────────
export interface NavItem {
  icon: ReactNode
  label: string
  href: string
  activeMatch?: string
}

// ─── Role configs ─────────────────────────────────────────────────────────────
export type DashboardRole = 'worker' | 'verifier' | 'advocate' | 'admin'

const ROLE_COLORS: Record<DashboardRole, string> = {
  worker:    '#00D4FF',   // cyan
  verifier:  '#A78BFA',   // purple
  advocate:  '#A78BFA',   // purple
  admin:     '#F59E0B',   // amber
}

const ROLE_LABELS: Record<DashboardRole, string> = {
  worker:    'Worker',
  verifier:  'Verifier',
  advocate:  'Advocate',
  admin:     'Admin',
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface DashboardLayoutProps {
  children: ReactNode
  role: DashboardRole
  navItems: NavItem[]
  breadcrumb?: string
  userName?: string
  userInitials?: string
  notificationCount?: number
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export function DashboardLayout({
  children,
  role,
  navItems,
  breadcrumb,
  userName,
  userInitials,
  notificationCount,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const roleColor = ROLE_COLORS[role]

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#F1F5F9]">
      {/* Sidebar (fixed on desktop, Sheet on mobile) */}
      <Sidebar
        navItems={navItems}
        role={ROLE_LABELS[role]}
        roleColor={roleColor}
        userName={userName}
        userInitials={userInitials}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main area — offset by sidebar width on desktop */}
      <div className="lg:ml-60 flex flex-col min-h-screen">
        <Topbar
          breadcrumb={breadcrumb}
          userName={userName}
          userInitials={userInitials}
          notificationCount={notificationCount}
          onMenuOpen={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
