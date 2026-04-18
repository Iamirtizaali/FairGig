import { LayoutDashboard, TrendingDown, Map, MessageSquareWarning, ShieldAlert, Users, AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

export const ADVOCATE_NAV_ITEMS: NavItem[] = [
  { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Overview', href: '/advocate/overview', activeMatch: '/advocate/overview' },
  { icon: <TrendingDown className="h-5 w-5" />, label: 'Commissions', href: '/advocate/commissions', activeMatch: '/advocate/commissions' },
  { icon: <Map className="h-5 w-5" />, label: 'Zones Heatmap', href: '/advocate/zones', activeMatch: '/advocate/zones' },
  { icon: <MessageSquareWarning className="h-5 w-5" />, label: 'Complaints', href: '/advocate/complaints', activeMatch: '/advocate/complaints' },
  { icon: <ShieldAlert className="h-5 w-5" />, label: 'Vulnerability Center', href: '/advocate/vulnerability', activeMatch: '/advocate/vulnerability' },
]

export default function AdvocateOverviewPage() {
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
            <KpiTile label="Active Complaints" value={142} icon={<MessageSquareWarning />} trend={24} trendLabel="vs last week" accentColor="#F59E0B" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Avg Commission Rate" value={22.4} suffix="%" icon={<TrendingDown />} trend={1.2} trendLabel="up from last month" accentColor="#F87171" className="ring-1 ring-[#F87171]/20" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Critical Vulnerability" value={18} icon={<ShieldAlert />} trend={4} trendLabel="new cases" accentColor="#00D4FF" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Active Workers (Protected)" value={12400} icon={<Users />} trend={14} trendLabel="registered" accentColor="#6EE7B7" />
          </motion.div>
        </motion.div>

        {/* ── Quick Jumps (Instead of mini charts for Overview) ── */}
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
            <h3 className={`text-xl font-bold text-white mb-2 ${font.display}`}>Silent Commission Spikes</h3>
            <p className="text-[#94A3B8]">
              Our trackers detected an undocumented increase in InDrive commission rates starting Oct 1st.
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
            <h3 className={`text-xl font-bold text-white mb-2 ${font.display}`}>Zone: Korangi Decline</h3>
            <p className="text-[#94A3B8]">
              Average hourly earnings in Korangi have dropped by 34% this month despite similar shift volume.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}
