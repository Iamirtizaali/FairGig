import { Clock, History, Award, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { Badge } from '@/components/ui/badge'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { darkGridProps, tooltipStyle, axisStyle } from '@/lib/recharts-theme'

const NAV_ITEMS: NavItem[] = [
  { icon: <Clock className="h-5 w-5" />, label: 'Verification Queue', href: '/verify/queue' },
  { icon: <History className="h-5 w-5" />, label: 'My History', href: '/verify/history', activeMatch: '/verify/history' },
]

const PERFORMANCE_DATA = [
  { day: 'Mon', approved: 45, rejected: 12 },
  { day: 'Tue', approved: 52, rejected: 8 },
  { day: 'Wed', approved: 38, rejected: 15 },
  { day: 'Thu', approved: 65, rejected: 10 },
  { day: 'Fri', approved: 48, rejected: 9 },
  { day: 'Sat', approved: 30, rejected: 5 },
  { day: 'Sun', approved: 25, rejected: 3 },
]

const HISTORY_LOG = [
  { id: 'SH-4011', date: 'Today, 14:32', action: 'Approved', accuracy: '100%' },
  { id: 'SH-4009', date: 'Today, 14:15', action: 'Flagged', accuracy: '95%' },
  { id: 'SH-3998', date: 'Today, 13:40', action: 'Approved', accuracy: '100%' },
  { id: 'SH-3995', date: 'Today, 13:22', action: 'Approved', accuracy: '100%' },
]

export default function VerifierHistoryPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Reviewer Analytics & History"
          subtext="Track your verification accuracy, volume, and recent audit logs."
        />

        {/* ── KPIs ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div variants={fadeUp} className="md:col-span-2">
            <div className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex items-center justify-between h-full relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-3xl group-hover:bg-[#F59E0B]/20 transition-all duration-500" />
              <div>
                <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold text-sm uppercase tracking-wider">Top Evaluator</span>
                </div>
                <h3 className={`text-3xl font-bold text-white mb-1 ${font.display}`}>14 Days</h3>
                <p className="text-[#94A3B8]">Current perfect accuracy streak</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-[#F59E0B] flex items-center justify-center bg-[#F59E0B]/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <span className="text-xl font-bold text-[#F59E0B]">🔥</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Reviews This Week" value={343} icon={<History />} trend={8} trendLabel="up from last week" accentColor="#00D4FF" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Peer Agreement Rate" value={98.5} suffix="%" icon={<CheckCircle />} trend={1} trendLabel="up from last week" accentColor="#6EE7B7" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Bar Chart ── */}
          <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-2">
            <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Review Volume (Last 7 Days)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERFORMANCE_DATA} stackOffset="sign">
                  <CartesianGrid {...darkGridProps} />
                  <XAxis dataKey="day" {...axisStyle} />
                  <YAxis {...axisStyle} />
                  <RechartsTooltip {...tooltipStyle as any} />
                  <Bar dataKey="approved" name="Approved" fill="#6EE7B7" stackId="a" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="rejected" name="Rejected/Flagged" fill="#F87171" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ── Action Log ── */}
          <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex flex-col">
            <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Recent Decisions</h3>
            <div className="space-y-4 flex-1">
              {HISTORY_LOG.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[#313442] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${log.action === 'Approved' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-[#F87171]/10 text-[#F87171]'}`}>
                      {log.action === 'Approved' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className={`text-sm font-medium text-white ${font.mono}`}>{log.id}</div>
                      <div className="text-xs text-[#94A3B8]">{log.date}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`border-none ${log.action === 'Approved' ? 'bg-[#6EE7B7]/20 text-[#6EE7B7]' : 'bg-[#F87171]/20 text-[#F87171]'}`}>
                    {log.action}
                  </Badge>
                </div>
              ))}
            </div>
            <button className="text-sm text-[#00D4FF] hover:text-white transition-colors text-center mt-4 pt-4 border-t border-[#1E293B] w-full block">
              View Full Audit Log
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
