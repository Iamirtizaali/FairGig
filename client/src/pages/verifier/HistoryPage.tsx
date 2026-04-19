import { History, Award, CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { Badge } from '@/components/ui/badge'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { darkGridProps, tooltipStyle, axisStyle } from '@/lib/recharts-theme'
import { useShiftsQuery } from '@/features/shifts/api'
import type { Shift } from '@/types/earnings'

// ─── Derive 7-day chart from shifts ──────────────────────────────────────────
function daysAgo(n: number) {
  const d = new Date(); d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function deriveChartData(shifts: Shift[]) {
  // Build last-7-days map
  const map = new Map<string, { approved: number; rejected: number }>()
  for (let i = 6; i >= 0; i--) {
    map.set(daysAgo(i), { approved: 0, rejected: 0 })
  }
  shifts.forEach((s) => {
    const dateKey = s.shiftDate?.slice(0, 10) ?? s.createdAt?.slice(0, 10)
    if (!dateKey || !map.has(dateKey)) return
    const entry = map.get(dateKey)!
    if (s.verificationStatus === 'verified')             entry.approved++
    if (s.verificationStatus === 'discrepancy_flagged')  entry.rejected++
  })
  return Array.from(map.entries()).map(([date, v]) => ({
    day: DAY_LABELS[new Date(date).getDay()],
    ...v,
  }))
}

export default function VerifierHistoryPage() {
  const from = daysAgo(30)
  const to   = new Date().toISOString().slice(0, 10)

  // Fetch the last 30 days of verified/flagged shifts (role-filtered by backend to this verifier's decisions)
  const { data: verifiedData, isLoading: verLoading }  = useShiftsQuery({ verificationStatus: 'verified',            limit: 100, from, to })
  const { data: flaggedData,  isLoading: flagLoading } = useShiftsQuery({ verificationStatus: 'discrepancy_flagged', limit: 100, from, to })

  const isLoading = verLoading || flagLoading

  const verifiedShifts = verifiedData?.shifts ?? []
  const flaggedShifts  = flaggedData?.shifts ?? []
  const allShifts      = [...verifiedShifts, ...flaggedShifts]

  // KPIs
  const weeklyTotal = useMemo(() => {
    const weekAgo = daysAgo(7)
    return allShifts.filter((s) => (s.shiftDate ?? s.createdAt).slice(0, 10) >= weekAgo).length
  }, [allShifts])

  const accuracyPct = useMemo(() => {
    if (allShifts.length === 0) return 0
    // "Agreement rate" = verified / total (simplistic; backend would have a better signal)
    return Math.round((verifiedShifts.length / allShifts.length) * 100 * 10) / 10
  }, [verifiedShifts.length, allShifts.length])

  // Chart
  const chartData = useMemo(() => deriveChartData(allShifts), [allShifts])

  // Recent decisions log (latest 6 from combined, sorted by shift date desc)
  const recentDecisions = useMemo(() =>
    allShifts
      .slice()
      .sort((a, b) => (b.shiftDate ?? b.createdAt).localeCompare(a.shiftDate ?? a.createdAt))
      .slice(0, 8)
  , [allShifts])

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Reviewer Analytics & History"
          subtext="Track your verification accuracy, volume, and recent audit logs."
        />

        {/* ── KPIs ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Streak / top-evaluator card */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <div className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex items-center justify-between h-full relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-3xl group-hover:bg-[#F59E0B]/20 transition-all duration-500" />
              <div>
                <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold text-sm uppercase tracking-wider">Total Reviews (30d)</span>
                </div>
                {isLoading
                  ? <div className="flex items-center gap-2 text-[#94A3B8]"><Loader2 className="h-4 w-4 animate-spin text-[#00D4FF]" />Loading…</div>
                  : <><h3 className={`text-3xl font-bold text-white mb-1 ${font.display}`}>{allShifts.length}</h3>
                    <p className="text-[#94A3B8]">{verifiedShifts.length} approved · {flaggedShifts.length} flagged</p></>
                }
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-[#F59E0B] flex items-center justify-center bg-[#F59E0B]/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <span className="text-xl font-bold text-[#F59E0B]">🔥</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <KpiTile
              label="Reviews This Week"
              value={isLoading ? 0 : weeklyTotal}
              icon={<History />}
              accentColor="#00D4FF"
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile
              label="Approval Rate"
              value={isLoading ? 0 : accuracyPct}
              suffix="%"
              icon={<CheckCircle />}
              accentColor="#6EE7B7"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Bar Chart ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible"
            className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-2">
            <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Review Volume (Last 7 Days)</h3>
            {isLoading
              ? <div className="h-[300px] flex items-center justify-center gap-3 text-[#94A3B8]">
                  <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />Loading chart…
                </div>
              : allShifts.length === 0
                ? <div className="h-[300px] flex items-center justify-center text-[#94A3B8]">No review data yet.</div>
                : <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid {...darkGridProps} />
                        <XAxis dataKey="day" {...axisStyle} />
                        <YAxis {...axisStyle} allowDecimals={false} />
                        <RechartsTooltip {...tooltipStyle as any} />
                        <Bar dataKey="approved" name="Approved"        fill="#6EE7B7" stackId="a" radius={[0, 0, 4, 4]} maxBarSize={40} />
                        <Bar dataKey="rejected" name="Rejected/Flagged" fill="#F87171" stackId="a" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
            }
          </motion.div>

          {/* ── Action Log ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible"
            className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex flex-col">
            <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Recent Decisions</h3>

            {isLoading && (
              <div className="flex-1 flex items-center justify-center gap-2 text-[#94A3B8]">
                <Loader2 className="h-4 w-4 animate-spin text-[#00D4FF]" />Loading…
              </div>
            )}

            {!isLoading && recentDecisions.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 text-[#94A3B8]">
                <AlertTriangle className="h-8 w-8 opacity-20" />
                <p className="text-sm">No decisions yet.</p>
              </div>
            )}

            {!isLoading && recentDecisions.length > 0 && (
              <div className="space-y-3 flex-1 overflow-y-auto">
                {recentDecisions.map((s) => {
                  const isApproved = s.verificationStatus === 'verified'
                  return (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[#313442] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${isApproved ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-[#F87171]/10 text-[#F87171]'}`}>
                          {isApproved ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className={`text-sm font-medium text-white ${font.mono}`}>{s.id.slice(0, 12)}…</div>
                          <div className="text-xs text-[#94A3B8]">
                            {new Date(s.shiftDate ?? s.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' })}
                            {' · '}{s.platform.name}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`border-none shrink-0 ${isApproved ? 'bg-[#6EE7B7]/20 text-[#6EE7B7]' : 'bg-[#F87171]/20 text-[#F87171]'}`}>
                        {isApproved ? 'Approved' : 'Flagged'}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
