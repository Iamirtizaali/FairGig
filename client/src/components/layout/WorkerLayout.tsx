import { Home, List, PlusCircle, History, Upload, BarChart2, ShieldCheck, MessageSquare, Settings } from 'lucide-react'
import { DashboardLayout, type NavItem } from './DashboardLayout'
import { Outlet } from 'react-router'

export const WORKER_NAV_ITEMS: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard', activeMatch: '/worker/dashboard' },
  { icon: <List className="h-5 w-5" />, label: 'My Shifts', href: '/worker/shifts', activeMatch: '/worker/shifts' },
  { icon: <PlusCircle className="h-5 w-5" />, label: 'Record Shift', href: '/worker/shifts/new', activeMatch: '/worker/shifts/new' },
  { icon: <History className="h-5 w-5" />, label: 'Shift Details (Demo)', href: '/worker/shifts/123', activeMatch: '/worker/shifts/123' },
  { icon: <Upload className="h-5 w-5" />, label: 'Import Data', href: '/worker/import', activeMatch: '/worker/import' },
  { icon: <BarChart2 className="h-5 w-5" />, label: 'Analytics', href: '/worker/analytics', activeMatch: '/worker/analytics' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificate', href: '/worker/certificate', activeMatch: '/worker/certificate' },
  { icon: <MessageSquare className="h-5 w-5" />, label: 'Grievances', href: '/worker/grievances', activeMatch: '/worker/grievances' },
  { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/worker/settings', activeMatch: '/worker/settings' },
]

export function WorkerLayout() {
  return (
    <DashboardLayout
      role="worker"
      navItems={WORKER_NAV_ITEMS}
      breadcrumb="Worker Portal"
    >
      <Outlet />
    </DashboardLayout>
  )
}
