import { ShieldAlert, Loader2, TrendingUp, TrendingDown as TrendDn } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { CHART_COLORS, darkGridProps, tooltipStyle, axisStyle } from '@/lib/recharts-theme'
import { useAdvocateCommissionTrendsQuery } from '@/features/analytics/api'

const PLATFORM_LINE_COLORS: Record<string, string> = {
  Careem:    CHART_COLORS.careem,
  Uber:      CHART_COLORS.uber,
  inDrive:   CHART_COLORS.indrive,
  foodpanda: CHART_COLORS.foodpanda ?? '#F472B6',
  Bykea:     CHART_COLORS.bykea ?? '#A78BFA',
}

function getPlatformColor(name: string, idx: number) {
  return PLATFORM_LINE_COLORS[name] ?? ['#00D4FF', '#6EE7B7', '#F87171'][idx % 3]
}

export default function AdvocateCommissionsPage() {
  const { data, isLoading } = useAdvocateCommissionTrendsQuery()
  const rawPlatforms = data?.platforms ?? {}

  // The backend returns { platforms: { "Uber": [{ week: "2026-W14", avg_deduction_pct: 12.5 }, ...] } }
  // We need to convert this to generic chart format: [{ time_label: "2026-W14", Uber: 12.5, Careem: 20 }]
  const platforms = Object.keys(rawPlatforms)

  const { trend, spikes, avgRate } = useMemo(() => {
    // 1. Build a map of week -> data
    const weekMap: Record<string, any> = {}
    
    platforms.forEach(p => {
      rawPlatforms[p].forEach(pt => {
        if (!weekMap[pt.week]) weekMap[pt.week] = { time_label: pt.week }
        weekMap[pt.week][p] = pt.avg_deduction_pct
      })
    })

    const chartTrend = Object.values(weekMap).sort((a, b) => a.time_label.localeCompare(b.time_label))

    // 2. Detect spikes (delta >= 2 percentage points)
    const detectedSpikes: any[] = []
    platforms.forEach(p => {
      for (let i = 1; i < chartTrend.length; i++) {
        const prev = chartTrend[i - 1][p]
        const curr = chartTrend[i][p]
        if (prev != null && curr != null && curr - prev >= 2) {
          detectedSpikes.push({
            platform: p,
            time_label: chartTrend[i].time_label,
            previous_rate: prev,
            new_rate: curr,
            spike_amount: Math.round((curr - prev) * 10) / 10
          })
        }
      }
    })

    // 3. Compute overall latest average
    let overallAvg = 0
    if (chartTrend.length > 0) {
      const latest = chartTrend[chartTrend.length - 1]
      let sum = 0, count = 0
      platforms.forEach(p => {
        if (latest[p] != null) {
          sum += latest[p]
          count++
        }
      })
      overallAvg = count > 0 ? Math.round((sum / count) * 10) / 10 : 0
    }

    return { trend: chartTrend, spikes: detectedSpikes.slice(-3), avgRate: overallAvg }
  }, [rawPlatforms, platforms])

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Commission Watch"
          subtext="Monitor effective commission rates via k-anonymised backend aggregations vs officially stated rates."
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── Main Chart ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-3 bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h3 className={`text-lg font-bold text-white ${font.display}`}>Effective Rate Trend</h3>
                <p className="text-sm text-[#94A3B8] mt-1">
                  {isLoading ? 'Loading…' : `Overall avg currently: ${avgRate}%`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {spikes.length > 0 && (
                  <Badge className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border-none">
                    {spikes.length} Spike{spikes.length > 1 ? 's' : ''} Detected
                  </Badge>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center gap-3 text-[#94A3B8]">
                <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />Loading commission data…
              </div>
            ) : trend.length < 2 ? (
              <div className="h-[400px] flex items-center justify-center text-[#94A3B8]">
                Not enough data in selected period to draw a trend.
              </div>
            ) : (
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend}>
                    <CartesianGrid {...darkGridProps} />
                    <XAxis dataKey="time_label" {...axisStyle} tickFormatter={(v) => v.split('-W').pop() ? `W${v.split('-W').pop()}` : v} />
                    <YAxis {...axisStyle} tickFormatter={(v) => `${v}%`} domain={[0, 'auto']} />
                    <RechartsTooltip {...tooltipStyle as any} formatter={(v: number) => [`${v}%`, '']} labelFormatter={(label) => `Week: ${label}`} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    {platforms.map((p, i) => (
                      <Line key={p} type="stepAfter" dataKey={p} stroke={getPlatformColor(p, i)} strokeWidth={3} dot={false} connectNulls />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          {/* ── Right Sidebar ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">

            {/* Detected Spikes */}
            <motion.div variants={fadeUp} className="bg-[#F87171]/10 border border-[#F87171]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-[#F87171] mb-4">
                <ShieldAlert className="h-5 w-5" />
                <h3 className="font-bold">Detected Spikes</h3>
              </div>

              {isLoading && <div className="text-sm text-[#94A3B8]">Loading…</div>}

              {!isLoading && spikes.length === 0 && (
                <p className="text-sm text-[#94A3B8]">No commission spikes ≥ 2% detected in selected period.</p>
              )}

              <div className="space-y-4">
                {spikes.map((anm, i) => (
                  <div key={i} className="bg-[#111827] border border-[#1E293B] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <PlatformChip platform={anm.platform} className="scale-75 origin-left" />
                      <span className="text-xs text-[#94A3B8]">{anm.time_label}</span>
                    </div>
                    <p className="text-sm text-white mb-2 leading-snug">
                      Rate rose from <span className="font-semibold text-[#F59E0B]">{anm.previous_rate}%</span> to <span className="font-semibold text-[#F87171]">{anm.new_rate}%</span>
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#94A3B8]">Increase</span>
                      <span className="font-bold flex items-center gap-1 text-[#F87171]">
                        <TrendingUp className="h-3 w-3" />{anm.spike_amount}pp
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Collective Actions */}
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5">
              <h3 className={`text-md font-bold text-white mb-4 ${font.display}`}>Collective Actions</h3>
              <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">
                Use aggregated commission data evidence from the backend analytical engine to draft a collaborative policy alert.
              </p>
              <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold">
                <TrendDn className="h-4 w-4 mr-2" />
                Draft Report
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
