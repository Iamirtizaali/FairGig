import { Download, TrendingUp, Loader2, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from 'recharts'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { CHART_COLORS, darkGridProps, tooltipStyle, axisStyle } from '@/lib/recharts-theme'
import { useShiftsQuery } from '@/features/shifts/api'
import type { Shift } from '@/types/earnings'

// ─── Date helpers ─────────────────────────────────────────────────────────────
function today()     { return new Date().toISOString().slice(0, 10) }
function daysAgo(n: number) {
  const d = new Date(); d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

// ─── Derivations ──────────────────────────────────────────────────────────────
function deriveChartData(shifts: Shift[]) {
  // Daily earnings trend (last 7 days by shiftDate)
  const dayMap = new Map<string, number>()
  shifts.forEach((s) => {
    const key = s.shiftDate.slice(0, 10)
    dayMap.set(key, (dayMap.get(key) ?? 0) + Number(s.netPay))
  })
  const earningsTrend = Array.from(dayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' }),
      amount: Math.round(amount),
    }))

  // Platform split for donut
  const platformMap = new Map<string, { name: string; value: number }>()
  shifts.forEach((s) => {
    const key = s.platformId
    const existing = platformMap.get(key) ?? { name: s.platform.name, value: 0 }
    existing.value += Number(s.netPay)
    platformMap.set(key, existing)
  })
  const platformSplit = Array.from(platformMap.values()).map((p, i) => ({
    ...p,
    value:  Math.round(p.value),
    color: [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.warning, CHART_COLORS.danger][i % 4],
  }))
  const totalNet = platformSplit.reduce((sum, p) => sum + p.value, 0)

  // Commission bar from real deduction %
  const commissionMap = new Map<string, { name: string; grossTotal: number; dedTotal: number }>()
  shifts.forEach((s) => {
    const key = s.platformId
    const existing = commissionMap.get(key) ?? { name: s.platform.name, grossTotal: 0, dedTotal: 0 }
    existing.grossTotal += Number(s.grossPay)
    existing.dedTotal   += Number(s.deductions)
    commissionMap.set(key, existing)
  })
  const commissionRates = Array.from(commissionMap.values()).map((p) => ({
    name: p.name,
    rate: p.grossTotal > 0 ? Math.round((p.dedTotal / p.grossTotal) * 100) : 0,
  }))

  return { earningsTrend, platformSplit, totalNet, commissionRates }
}

export default function WorkerAnalyticsPage() {
  const [from, setFrom]   = useState(daysAgo(30))
  const [to, setTo]       = useState(today())

  const { data, isLoading, isError } = useShiftsQuery({ limit: 100, from, to })
  const shifts = data?.shifts ?? []

  const { earningsTrend, platformSplit, totalNet, commissionRates } = useMemo(
    () => deriveChartData(shifts),
    [shifts],
  )

  const totalPeriodEarnings = earningsTrend.reduce((s, r) => s + r.amount, 0)

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Earnings Analytics"
          subtext="Deep dive into your income trends, platform comparisons, and commission rates."
          actions={
            <>
              {/* date range quick filter */}
              <div className="flex items-center gap-2">
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
                  className="bg-[#1B1F2C] border border-[#1E293B] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]" />
                <span className="text-[#94A3B8] text-sm">to</span>
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
                  className="bg-[#1B1F2C] border border-[#1E293B] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]" />
              </div>
              <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </>
          }
        />

        {isLoading && (
          <div className="flex items-center justify-center py-24 gap-3 text-[#94A3B8]">
            <Loader2 className="h-6 w-6 animate-spin text-[#00D4FF]" />
            Loading analytics…
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center py-24 gap-3 text-[#F87171]">
            <AlertTriangle className="h-6 w-6" />
            Failed to load analytics data.
          </div>
        )}

        {!isLoading && !isError && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-[#1B1F2C] border border-[#1E293B] p-1 rounded-xl h-auto mb-6">
              <TabsTrigger value="overview" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]">Overview</TabsTrigger>
              <TabsTrigger value="platforms" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]">Platform Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="border-0 p-0 m-0 focus-visible:ring-0">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Income Trend Chart ── */}
                <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-2">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className={`text-lg font-bold text-white mb-1 ${font.display}`}>Income Trend</h3>
                      {earningsTrend.length > 1 && (
                        <div className="flex items-center gap-2 text-[#6EE7B7]">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">{earningsTrend.length} days of data</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#94A3B8] mb-1">Total</p>
                      <p className={`text-2xl font-bold text-white ${font.mono}`}>Rs {totalPeriodEarnings.toLocaleString()}</p>
                    </div>
                  </div>

                  {earningsTrend.length === 0 ? (
                    <div className="h-[300px] flex items-center justify-center text-[#94A3B8]">No shift data in this range.</div>
                  ) : (
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsTrend}>
                          <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%"  stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid {...darkGridProps} />
                          <XAxis dataKey="date" {...axisStyle} />
                          <YAxis {...axisStyle} tickFormatter={(v) => `Rs ${v}`} width={80} />
                          <RechartsTooltip {...tooltipStyle as any} />
                          <Area type="monotone" dataKey="amount" stroke={CHART_COLORS.primary} strokeWidth={3}
                            fill="url(#colorIncome)" activeDot={{ r: 8, fill: CHART_COLORS.primary, stroke: '#0A0E1A', strokeWidth: 4 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </motion.div>

                {/* ── Platform Split Donut ── */}
                <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex flex-col">
                  <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Income by Platform</h3>

                  {platformSplit.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-[#94A3B8] text-sm">No data</div>
                  ) : (
                    <>
                      <div className="h-[200px] w-full relative mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={platformSplit} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                              {platformSplit.map((entry, i) => (
                                <Cell key={`cell-${i}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <RechartsTooltip {...tooltipStyle as any} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-sm text-[#94A3B8]">Total</span>
                          <span className={`text-lg font-bold text-white ${font.mono}`}>Rs {(totalNet / 1000).toFixed(0)}k</span>
                        </div>
                      </div>

                      <div className="mt-auto space-y-3">
                        {platformSplit.map((p) => (
                          <div key={p.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                              <span className="text-[#F1F5F9]">{p.name}</span>
                            </div>
                            <span className={`font-medium text-[#94A3B8] ${font.mono}`}>
                              {totalNet > 0 ? Math.round((p.value / totalNet) * 100) : 0}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>

                {/* ── Commission Rates ── */}
                <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-3">
                  <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Effective Commission Rates</h3>
                  {commissionRates.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-[#94A3B8]">No data</div>
                  ) : (
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={commissionRates} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                          <CartesianGrid {...darkGridProps} horizontal={false} vertical={true} />
                          <XAxis type="number" {...axisStyle} tickFormatter={(v) => `${v}%`} />
                          <YAxis dataKey="name" type="category" {...axisStyle} width={100} />
                          <RechartsTooltip {...tooltipStyle as any} />
                          <Bar dataKey="rate" radius={[0, 4, 4, 0]} maxBarSize={40}>
                            {commissionRates.map((entry, i) => (
                              <Cell key={`cell-${i}`} fill={entry.rate > 20 ? CHART_COLORS.danger : CHART_COLORS.warning} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="platforms" className="border-0 p-0 m-0 focus-visible:ring-0">
              <div className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
                <h3 className={`text-lg font-bold text-white mb-4 ${font.display}`}>Platform Breakdown Detail</h3>
                {platformSplit.length === 0 ? (
                  <p className="text-[#94A3B8] text-sm">No data in the selected range.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-[#94A3B8] border-b border-[#1E293B]">
                          <th className="pb-3 pr-6">Platform</th>
                          <th className="pb-3 pr-6 text-right">Net Earnings</th>
                          <th className="pb-3 text-right">Share</th>
                        </tr>
                      </thead>
                      <tbody>
                        {platformSplit.map((p) => (
                          <tr key={p.name} className="border-b border-[#1E293B]/50">
                            <td className="py-3 pr-6">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                                <span className="text-white">{p.name}</span>
                              </div>
                            </td>
                            <td className={`py-3 pr-6 text-right text-white ${font.mono}`}>
                              Rs {p.value.toLocaleString()}
                            </td>
                            <td className={`py-3 text-right text-[#94A3B8] ${font.mono}`}>
                              {totalNet > 0 ? Math.round((p.value / totalNet) * 100) : 0}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
