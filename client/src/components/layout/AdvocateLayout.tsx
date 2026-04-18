import { Activity, DollarSign, Map, Flag, ShieldAlert } from 'lucide-react'
import { DashboardLayout, type NavItem } from './DashboardLayout'
import { Outlet } from 'react-router'

export const ADVOCATE_NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Advocate Overview', href: '/advocate/overview', activeMatch: '/advocate/overview' },
  { icon: <DollarSign className="h-5 w-5" />, label: 'Commissions Watch', href: '/advocate/commissions', activeMatch: '/advocate/commissions' },
  { icon: <Map className="h-5 w-5" />, label: 'Zones Heatmap', href: '/advocate/zones', activeMatch: '/advocate/zones' },
  { icon: <Flag className="h-5 w-5" />, label: 'Systemic Complaints', href: '/advocate/complaints', activeMatch: '/advocate/complaints' },
  { icon: <ShieldAlert className="h-5 w-5" />, label: 'Vulnerability Center', href: '/advocate/vulnerability', activeMatch: '/advocate/vulnerability' },
]

export function AdvocateLayout() {
  return (
    <DashboardLayout
      role="advocate"
      navItems={ADVOCATE_NAV_ITEMS}
      breadcrumb="Advocate Console"
    >
      <Outlet />
    </DashboardLayout>
  )
}
