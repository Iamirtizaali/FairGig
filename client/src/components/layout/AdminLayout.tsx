import { Activity, Users, ShieldAlert, Database, RefreshCw } from 'lucide-react'
import { DashboardLayout, type NavItem } from './DashboardLayout'
import { Outlet } from 'react-router'

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'System Overview', href: '/admin/overview', activeMatch: '/admin/overview' },
  { icon: <Database className="h-5 w-5" />, label: 'Platforms & Config', href: '/admin/platforms', activeMatch: '/admin/platforms' },
  { icon: <Users className="h-5 w-5" />, label: 'User Directory', href: '/admin/users', activeMatch: '/admin/users' },
  { icon: <ShieldAlert className="h-5 w-5" />, label: 'Fraud & Audit', href: '/admin/audit', activeMatch: '/admin/audit' },
  { icon: <RefreshCw className="h-5 w-5" />, label: 'Network Seed', href: '/admin/seed', activeMatch: '/admin/seed' },
]

export function AdminLayout() {
  return (
    <DashboardLayout
      role="admin"
      navItems={ADMIN_NAV_ITEMS}
      breadcrumb="Admin Control Center"
      userName="Super Admin"
      userInitials="SA"
    >
      <Outlet />
    </DashboardLayout>
  )
}
