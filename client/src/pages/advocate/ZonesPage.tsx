import { Map, AlertTriangle, Navigation, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { darkGridProps, tooltipStyle, axisStyle } from '@/lib/recharts-theme'
import { useAdvocateKpisQuery } from '@/features/analytics/api'

const MIN_WAGE_HOURLY = 250 // PKR

// ─── Zone Derivation from Analytics Service ─────────────────────────────────
interface ZoneRow {
  name: string
  medianHourly: number
  risk: 'High' | 'Medium' | 'Low'
}

function riskColor(r: ZoneRow['risk']) {
  return r === 'High' ? '#F87171' : r === 'Medium' ? '#F59E0B' : '#00D4FF'
}

export default function AdvocateZonesPage() {
  const { data: kpis, isLoading } = useAdvocateKpisQuery()

  // Convert map of zone -> percentiles into the format needed for the BarChart
  const zoneData = useMemo(() => {
    if (!kpis?.income_distribution_percentiles) return []
    const raw = kpis.income_distribution_percentiles
    
    const rows: ZoneRow[] = []
    Object.entries(raw).forEach(([zoneName, percentiles]) => {
      if (!percentiles || percentiles.p50 === undefined) return
      
      const medianHourly = Math.round(percentiles.p50)
      let risk: ZoneRow['risk'] = 'Low'
      
      if (medianHourly < MIN_WAGE_HOURLY) risk = 'High'
      else if (medianHourly < MIN_WAGE_HOURLY * 1.5) risk = 'Medium'
      
      rows.push({ name: zoneName, medianHourly, risk })
    })

    return rows.sort((a, b) => b.medianHourly - a.medianHourly).slice(0, 10) // top 10 zones
  }, [kpis])

  const redZones = useMemo(() => zoneData.filter((z) => z.medianHourly < MIN_WAGE_HOURLY), [zoneData])

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Zones & Geographic Risk"
          subtext="Identify areas where median hourly worker earnings fall below thresholds."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Main: Bar Chart ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2 bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`text-lg font-bold text-white ${font.display}`}>Median Hourly Earn Rate by Zone (PKR)</h3>
                <p className="text-sm text-[#94A3B8] mt-1">
                  {isLoading ? 'Loading…' : 'Based on 30-day trailing statistics with k-anonymity (k=5)'}
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center gap-3 text-[#94A3B8]">
                <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />Loading zone data…
              </div>
            ) : zoneData.length === 0 ? (
              <div className="h-[400px] flex flex-col items-center justify-center gap-3 text-[#94A3B8]">
                <Map className="h-12 w-12 opacity-20" />
                <p>No zone data available yet.</p>
                <p className="text-xs text-center max-w-xs">Shifts with city zone information will appear here once anonymous cohorts reach minimum size.</p>
              </div>
            ) : (
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid {...darkGridProps} horizontal={false} vertical={true} />
                    <XAxis type="number" {...axisStyle} tickFormatter={(v) => `Rs ${v}`} />
                    <YAxis dataKey="name" type="category" {...axisStyle} tickLine={false} axisLine={false} width={80} />
                    <RechartsTooltip
                      {...tooltipStyle as any}
                      formatter={(val: number, _name: string) => [
                        `Rs ${val}/hr`,
                        'Median Hourly',
                      ]}
                    />
                    <Bar dataKey="medianHourly" radius={[0, 4, 4, 0]} maxBarSize={32}>
                      {zoneData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={riskColor(entry.risk)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          {/* ── Right Sidebar ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">

            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5 relative overflow-hidden group">
              <Map className="absolute -right-4 -bottom-4 w-32 h-32 text-[#00D4FF] opacity-5 group-hover:scale-110 transition-transform duration-500" />
              <h3 className={`text-lg font-bold text-white mb-2 ${font.display}`}>Interactive Heatmap</h3>
              <p className="text-sm text-[#94A3B8] mb-6">
                Our full GIS map requires WebGL context to render localized dispute points.
              </p>
              <Button className="w-full bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                <Navigation className="h-4 w-4 mr-2" />
                Launch 3D Map View
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#F87171]/10 border border-[#F87171]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-[#F87171] mb-2">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-bold">
                  Red Zones Warning {redZones.length > 0 && <span>({redZones.length})</span>}
                </h3>
              </div>
              {isLoading ? (
                <p className="text-sm text-[#F87171]/60">Loading…</p>
              ) : redZones.length === 0 ? (
                <p className="text-sm text-[#F87171]/80">No zones currently have a median below minimum wage (Rs {MIN_WAGE_HOURLY}/hr).</p>
              ) : (
                <>
                  <p className="text-sm text-[#F87171]/80 leading-relaxed mb-3">
                    Median earnings in{' '}
                    <span className="font-semibold">{redZones.map((z) => z.name).join(', ')}</span>{' '}
                    are currently falling below the minimum wage threshold (Rs {MIN_WAGE_HOURLY}/hr).
                  </p>
                  <div className="space-y-1.5 mb-4">
                    {redZones.map((z) => (
                      <div key={z.name} className="flex justify-between text-xs">
                        <span className="text-[#F87171]/80">{z.name}</span>
                        <span className="font-semibold text-[#F87171]">Rs {z.medianHourly}/hr</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full bg-[#F87171]/10 text-[#F87171] border-[#F87171]/30 hover:bg-[#F87171]/20">
                    Draft Policy Alert
                  </Button>
                </>
              )}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
