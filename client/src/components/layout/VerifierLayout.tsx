import { ListTodo, CheckCircle, Activity } from 'lucide-react'
import { DashboardLayout, type NavItem } from './DashboardLayout'
import { Outlet } from 'react-router'

export const VERIFIER_NAV_ITEMS: NavItem[] = [
  { icon: <ListTodo className="h-5 w-5" />, label: 'Verification Queue', href: '/verify/queue', activeMatch: '/verify/queue' },
  { icon: <Activity className="h-5 w-5" />, label: 'Active Review (Demo)', href: '/verify/SH-4092', activeMatch: '/verify/SH-4092' },
  { icon: <CheckCircle className="h-5 w-5" />, label: 'Decision History', href: '/verify/history', activeMatch: '/verify/history' },
]

export function VerifierLayout() {
  return (
    <DashboardLayout
      role="verifier"
      navItems={VERIFIER_NAV_ITEMS}
      breadcrumb="Verifier Station"
      userName="Zain (Verifier)"
      userInitials="ZV"
    >
      <Outlet />
    </DashboardLayout>
  )
}
