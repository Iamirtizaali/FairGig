import { Download, TrendingUp, Loader2, AlertTriangle, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react'
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

// Hooks
import { useShiftsQuery } from '@/features/shifts/api'
import { useWorkerTrendQuery, useWorkerCommissionTrackerQuery } from '@/features/analytics/api'
import { useAnomalyDetectMutation } from '@/features/anomaly/api'
import { useAuthStore } from '@/stores/auth'

import type { Shift } from '@/types/earnings'

// ─── Date helpers ─────────────────────────────────────────────────────────────
function today()     { return new Date().toISOString().slice(0, 10) }
function daysAgo(n: number) {
  const d = new Date(); d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

// ─── Local Derivations (for Platform Pie Chart) ──────────────────────────────
function derivePlatformSplit(shifts: Shift[]) {
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
  return { platformSplit, totalNet }
}

export default function WorkerAnalyticsPage() {
  const user = useAuthStore((s) => s.user)
  const [from, setFrom]   = useState(daysAgo(30))
  const [to, setTo]       = useState(today())

  // 1. Shift History (for pie chart and anomaly detection payload)
  const { data: shiftsData, isLoading: shiftsLoading, isError: shiftsError } = useShiftsQuery({ limit: 100, from, to })
  const shifts = shiftsData?.shifts ?? []
  
  // Local pie chart calc
  const { platformSplit, totalNet } = useMemo(() => derivePlatformSplit(shifts), [shifts])

  // 2. FastAPI Data: Income Trend (12 weeks)
  const { data: trendData, isLoading: trendLoading } = useWorkerTrendQuery('week')
  const earningsTrend = trendData?.series ?? []
  const totalPeriodEarnings = earningsTrend.reduce((s, r) => s + r.earnings, 0)

  // 3. FastAPI Data: Commission Tracker (12 weeks per platform)
  // We query 'Uber' by default just to trigger it—backend returns series for ALL platforms.
  const { data: commData, isLoading: commLoading } = useWorkerCommissionTrackerQuery('Uber')

  // Transform commission series into latest averages for the bar chart
  const commissionRates = useMemo(() => {
    if (!commData?.platform_series) return []
    return Object.entries(commData.platform_series).map(([platName, series]) => {
      // average all data points for the bar chart summarizing the last 12 weeks
      const avg = series.reduce((sum, pt) => sum + pt.earnings, 0) / (series.length || 1)
      return { name: platName, rate: Math.round(avg) }
    })
  }, [commData])

  // 4. FastAPI Data: Anomaly Detection Mutation (Sprint 5)
  const detectMutation = useAnomalyDetectMutation()

  const handleRunAnomalyScan = () => {
    if (!user || shifts.length === 0) return
    detectMutation.mutate({
      worker_id: user.id,
      shifts: shifts.map(s => ({
        date: s.shiftDate.slice(0, 10),
        platform: s.platform.name,
        hours_worked: Number(s.hoursWorked),
        gross_earned: Number(s.grossPay),
        platform_deductions: Number(s.deductions),
        net_received: Number(s.netPay)
      })),
      options: { z_threshold: 2.5, mom_drop_pct: 20.0 }
    })
  }

  const isLoading = shiftsLoading || trendLoading || commLoading
  const isError = shiftsError

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Earnings Analytics"
          subtext="Deep dive into your income trends, platform comparisons, and commission rates."
          actions={
            <>
              {/* date range quick filter (only applies to pie chart & shift table) */}
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
              <TabsTrigger value="anomalies" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0A0E1A] flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> Anomaly Scan
              </TabsTrigger>
            </TabsList>

            {/* ── Overview Tab ── */}
            <TabsContent value="overview" className="border-0 p-0 m-0 focus-visible:ring-0">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Income Trend Chart (FastAPI /worker/trend) ── */}
                <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-2">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className={`text-lg font-bold text-white mb-1 ${font.display}`}>Income Trend (12 Weeks)</h3>
                      {earningsTrend.length > 1 && (
                        <div className="flex items-center gap-2 text-[#6EE7B7]">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">{earningsTrend.length} weeks of data</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#94A3B8] mb-1">Total (12W)</p>
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
                          <XAxis dataKey="label" {...axisStyle} tickFormatter={(v) => v.slice(5)} /> {/* 2026-W14 -> W14 */}
                          <YAxis {...axisStyle} tickFormatter={(v) => `Rs ${v}`} width={80} />
                          <RechartsTooltip {...tooltipStyle as any} />
                          <Area type="monotone" dataKey="earnings" stroke={CHART_COLORS.primary} strokeWidth={3}
                            fill="url(#colorIncome)" activeDot={{ r: 8, fill: CHART_COLORS.primary, stroke: '#0A0E1A', strokeWidth: 4 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </motion.div>

                {/* ── Platform Split Donut (Local Filter) ── */}
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

                {/* ── Commission Rates (FastAPI /worker/commission-tracker) ── */}
                <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-3">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-bold text-white ${font.display}`}>Effective Commission Rates (12W Avg)</h3>
                    {commData?.trend === 'concerning' && (
                      <span className="inline-flex flex-row items-center bg-[#F87171]/20 text-[#F87171] text-xs px-2 py-1 rounded-full">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Spike detected
                      </span>
                    )}
                  </div>

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

            {/* ── Platform Comparison Tab ── */}
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

            {/* ── Anomaly Scan Tab (FastAPI /detect) ── */}
            <TabsContent value="anomalies" className="border-0 p-0 m-0 focus-visible:ring-0">
              <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`text-lg font-bold text-white flex items-center gap-2 mb-1 ${font.display}`}>
                      <ShieldAlert className="h-5 w-5 text-[#F59E0B]" />
                      Advanced Statistical Scan
                    </h3>
                    <p className="text-[#94A3B8] text-sm">
                      Powered by FairGig's Python Anomaly Engine. Detects hidden spikes in platform 
                      commissions or drastic drops in hourly pay.
                    </p>
                  </div>
                  <Button 
                    className="bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#0A0E1A] font-bold"
                    onClick={handleRunAnomalyScan}
                    disabled={detectMutation.isPending || shifts.length === 0}
                  >
                    {detectMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Activity className="h-4 w-4 mr-2" />
                        Run Scan Now
                      </>
                    )}
                  </Button>
                </div>

                {shifts.length === 0 && (
                  <div className="text-[#94A3B8] text-sm text-center py-6">
                    You need to log some shifts before running a scan.
                  </div>
                )}

                {/* Scan Results */}
                {detectMutation.isError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500 text-red-500 text-sm mt-4">
                    Could not complete the anomaly scan. Either invalid data was submitted or the Analysis service is unavailable.
                  </div>
                )}

                {detectMutation.isSuccess && (
                  <div className="mt-8 space-y-4">
                    <h4 className="text-white font-medium mb-3">Scan Results</h4>
                    {detectMutation.data?.status === 'clean' ? (
                      <div className="p-4 rounded-xl bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-[#6EE7B7] mt-0.5" />
                        <div>
                          <p className="text-[#6EE7B7] font-medium mb-1">Your income patterns look healthy.</p>
                          <p className="text-[#94A3B8] text-sm">
                            Analysed {detectMutation.data.summary.shifts_analysed} shifts across weekly and monthly windows. 
                            We found no significant commission spikes or abnormal pay drops versus your 60-day baseline.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {detectMutation.data?.anomalies.map((anom, idx) => (
                          <div key={idx} className="p-5 rounded-xl bg-[#F87171]/10 border border-[#F87171] relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-[#F87171] text-xs font-bold text-white px-3 py-1 rounded-bl-lg uppercase">
                              {anom.severity} Risk
                            </div>
                            <h5 className="text-[#F87171] font-bold mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5" /> 
                              {anom.kind.replace(/_/g, ' ').toUpperCase()}
                            </h5>
                            <p className="text-white mb-4">{anom.explanation}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#F87171]/20">
                              <div>
                                <p className="text-[#94A3B8] text-xs uppercase mb-1">Window</p>
                                <p className="text-[#F1F5F9] text-sm">{anom.window}</p>
                              </div>
                              <div>
                                <p className="text-[#94A3B8] text-xs uppercase mb-1">Metric</p>
                                <p className="text-[#F1F5F9] text-sm font-mono">{anom.metric}</p>
                              </div>
                              <div>
                                <p className="text-[#94A3B8] text-xs uppercase mb-1">Baseline Mean</p>
                                <p className="text-[#F1F5F9] text-sm font-mono">
                                  {anom.metric.includes('pct') 
                                    ? `${(anom.baseline_mean * 100).toFixed(1)}%` 
                                    : `Rs ${anom.baseline_mean.toLocaleString()}`}
                                </p>
                              </div>
                              <div>
                                <p className="text-[#94A3B8] text-xs uppercase mb-1">Observed Value</p>
                                <p className="text-white font-bold text-sm font-mono">
                                  {anom.metric.includes('pct') 
                                    ? `${(anom.observed * 100).toFixed(1)}%` 
                                    : `Rs ${anom.observed.toLocaleString()}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
