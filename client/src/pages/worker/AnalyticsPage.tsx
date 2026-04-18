import { Activity, Clock, ShieldCheck, Download, Filter, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
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

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificates', href: '/worker/certificate' },
]

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const EARNINGS_TREND = [
  { date: '18 Oct', amount: 2400 },
  { date: '19 Oct', amount: 3800 },
  { date: '20 Oct', amount: 4200 },
  { date: '21 Oct', amount: 2750 },
  { date: '22 Oct', amount: 1450 },
  { date: '23 Oct', amount: 4700 },
  { date: '24 Oct', amount: 3450 },
]

const PLATFORM_SPLIT = [
  { name: 'Careem', value: 45000, color: CHART_COLORS.careem },
  { name: 'Uber', value: 35000, color: CHART_COLORS.uber },
  { name: 'inDrive', value: 20000, color: CHART_COLORS.indrive },
  { name: 'Bykea', value: 8000, color: CHART_COLORS.bykea },
]

const COMMISSION_RATES = [
  { name: 'Careem', rate: 25 },
  { name: 'Uber', rate: 22 },
  { name: 'inDrive', rate: 10 },
  { name: 'foodpanda', rate: 15 },
]

export default function WorkerAnalyticsPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Earnings Analytics"
          subtext="Deep dive into your income trends, platform comparisons, and commission rates."
          actions={
            <>
              <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                <Filter className="h-4 w-4 mr-2" />
                This Month
              </Button>
              <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </>
          }
        />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#1B1F2C] border border-[#1E293B] p-1 rounded-xl h-auto mb-6">
            <TabsTrigger 
              value="overview" 
              className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="platforms" 
              className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]"
            >
              Platform Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="border-0 p-0 m-0 focus-visible:ring-0">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* ── Main Trend Chart ── */}
              <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className={`text-lg font-bold text-white mb-1 ${font.display}`}>Income Trend (7 Days)</h3>
                    <div className="flex items-center gap-2 text-[#6EE7B7]">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+15% vs previous week</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#94A3B8] mb-1">Total</p>
                    <p className={`text-2xl font-bold text-white ${font.mono}`}>Rs 22,750</p>
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={EARNINGS_TREND}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid {...darkGridProps} />
                      <XAxis dataKey="date" {...axisStyle} />
                      <YAxis {...axisStyle} tickFormatter={(val) => `Rs ${val}`} width={80} />
                      <RechartsTooltip {...tooltipStyle as any} />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke={CHART_COLORS.primary} 
                        strokeWidth={3}
                        fill="url(#colorIncome)" 
                        activeDot={{ r: 8, fill: CHART_COLORS.primary, stroke: '#0A0E1A', strokeWidth: 4 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* ── Platform Split Donut ── */}
              <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex flex-col">
                <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Income by Platform</h3>
                
                <div className="h-[200px] w-full relative mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={PLATFORM_SPLIT}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {PLATFORM_SPLIT.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip {...tooltipStyle as any} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-sm text-[#94A3B8]">Total</span>
                    <span className={`text-lg font-bold text-white ${font.mono}`}>108k</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-auto space-y-3">
                  {PLATFORM_SPLIT.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: platform.color }} />
                        <span className="text-[#F1F5F9]">{platform.name}</span>
                      </div>
                      <span className={`font-medium text-[#94A3B8] ${font.mono}`}>
                        {Math.round((platform.value / 108000) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── Commission Rates ── */}
              <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:col-span-3">
                <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Effective Commission Rates</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={COMMISSION_RATES} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                      <CartesianGrid {...darkGridProps} horizontal={false} vertical={true} />
                      <XAxis type="number" {...axisStyle} tickFormatter={(val) => `${val}%`} />
                      <YAxis dataKey="name" type="category" {...axisStyle} width={100} />
                      <RechartsTooltip {...tooltipStyle as any} />
                      <Bar dataKey="rate" fill={CHART_COLORS.danger} radius={[0, 4, 4, 0]} maxBarSize={40}>
                        {COMMISSION_RATES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.rate > 20 ? CHART_COLORS.danger : CHART_COLORS.warning} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

            </motion.div>
          </TabsContent>
          
          <TabsContent value="platforms" className="border-0 p-0 m-0 focus-visible:ring-0">
             <div className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-12 text-center">
               <p className="text-[#94A3B8]">Additional comparison views would be implemented here.</p>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
