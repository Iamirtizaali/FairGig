import {
  LayoutDashboard, TrendingDown, Map, MessageSquareWarning, ShieldAlert,
  Users, AlertTriangle, ArrowRight, Loader2
} from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useComplaintsQuery, useClustersQuery } from '@/features/grievance/api'
import { useAdvocateKpisQuery } from '@/features/analytics/api'

// Define the interface since it's declared here
interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  activeMatch: string;
}

export const ADVOCATE_NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Overview',             href: '/advocate/overview',      activeMatch: '/advocate/overview' },
  { icon: <TrendingDown className="h-5 w-5" />,    label: 'Commissions',           href: '/advocate/commissions',   activeMatch: '/advocate/commissions' },
  { icon: <Map className="h-5 w-5" />,             label: 'Zones Heatmap',         href: '/advocate/zones',         activeMatch: '/advocate/zones' },
  { icon: <MessageSquareWarning className="h-5 w-5" />, label: 'Complaints',       href: '/advocate/complaints',    activeMatch: '/advocate/complaints' },
  { icon: <ShieldAlert className="h-5 w-5" />,     label: 'Vulnerability Center',  href: '/advocate/vulnerability', activeMatch: '/advocate/vulnerability' },
]

export default function AdvocateOverviewPage() {
  const { data: complaintsData, isLoading: cLoading } = useComplaintsQuery({ limit: 1 })
  const { data: clustersData,   isLoading: clLoading } = useClustersQuery({ limit: 1 })
  const { data: escalatedData } = useComplaintsQuery({ status: 'escalated', limit: 1 })
  const { data: kpis, isLoading: kpiLoading } = useAdvocateKpisQuery()

  const isLoading = cLoading || clLoading || kpiLoading

  const activeComplaints  = complaintsData?.meta?.total ?? 0
  const clusterCount      = clustersData?.meta?.total ?? 0
  const criticalVuln      = escalatedData?.meta?.total ?? 0

  // Derive latest avg commission from the KPI trends
  const avgCommission = useMemo(() => {
    if (!kpis?.commission_trends) return 0
    const weeks = Object.keys(kpis.commission_trends).sort()
    if (weeks.length === 0) return 0
    const latestAvg = kpis.commission_trends[weeks[weeks.length - 1]]
    return Math.round(latestAvg * 10) / 10
  }, [kpis])

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        <PageHeader
          heading="Sovereign Advocate Dashboard"
          subtext="Monitor systemic issues, commission spikes, and worker vulnerability across platforms."
        />

        {/* ── KPIs ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={fadeUp}>
            <KpiTile
              label="Active Complaints"
              value={isLoading ? 0 : activeComplaints}
              icon={<MessageSquareWarning />}
              accentColor="#F59E0B"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile
              label="Avg Commission Rate"
              value={isLoading ? 0 : avgCommission}
              suffix="%"
              icon={<TrendingDown />}
              accentColor="#F87171"
              className="ring-1 ring-[#F87171]/20"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile
              label="Escalated Cases"
              value={isLoading ? 0 : criticalVuln}
              icon={<ShieldAlert />}
              accentColor="#00D4FF"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile
              label="Active Clusters"
              value={isLoading ? 0 : clusterCount}
              icon={<Users />}
              accentColor="#6EE7B7"
            />
          </motion.div>
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-8 gap-2 text-[#94A3B8]">
            <Loader2 className="h-4 w-4 animate-spin text-[#00D4FF]" />
            <span className="text-sm">Loading live data…</span>
          </div>
        )}

        {/* ── Quick Jumps ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 group cursor-pointer hover:border-[#00D4FF]/50 transition-colors">
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 bg-[#F87171]/10 text-[#F87171] rounded-xl">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <Button variant="ghost" className="text-[#00D4FF] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10 shrink-0" asChild>
                <Link to="/advocate/commissions">Analyze <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
            <h3 className={`text-xl font-bold text-white mb-2 ${font.display}`}>
              Commission Watch
            </h3>
            <p className="text-[#94A3B8]">
              {avgCommission > 20
                ? `Avg effective commission is ${avgCommission}% — above the 20% threshold. Review platform breakdown.`
                : `Avg effective commission is ${avgCommission}%. Track per-platform rate trends.`}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 group cursor-pointer hover:border-[#00D4FF]/50 transition-colors">
            <div className="flex items-start justify-between mb-8">
              <div className="p-3 bg-[#F59E0B]/10 text-[#F59E0B] rounded-xl">
                <Map className="h-6 w-6" />
              </div>
              <Button variant="ghost" className="text-[#00D4FF] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10 shrink-0" asChild>
                <Link to="/advocate/zones">View Heatmap <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
            <h3 className={`text-xl font-bold text-white mb-2 ${font.display}`}>
              Zones & Geographic Risk
            </h3>
            <p className="text-[#94A3B8]">
              Identify zones where average hourly earnings fall below the minimum wage threshold (Rs 250/hr).
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
