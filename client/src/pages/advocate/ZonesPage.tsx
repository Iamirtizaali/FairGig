import { Map, AlertTriangle, Navigation } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { darkGridProps, tooltipStyle, axisStyle } from '@/lib/recharts-theme'

const ZONE_DATA = [
  { name: 'Korangi', avgHourly: 240, activeGigs: 4500, risk: 'High' },
  { name: 'Saddar', avgHourly: 350, activeGigs: 8200, risk: 'Medium' },
  { name: 'Defence', avgHourly: 550, activeGigs: 3100, risk: 'Low' },
  { name: 'Gulshan', avgHourly: 420, activeGigs: 6400, risk: 'Low' },
  { name: 'Nazimabad', avgHourly: 310, activeGigs: 5800, risk: 'Medium' },
  { name: 'Lyari', avgHourly: 210, activeGigs: 1200, risk: 'High' },
].sort((a, b) => b.avgHourly - a.avgHourly)

export default function AdvocateZonesPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Zones & Geographic Risk"
          subtext="Identify areas where worker earnings are suppressed or where dispute volumes are uniquely high."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-2 bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-bold text-white ${font.display}`}>Hourly Earn Rate by Zone (PKR)</h3>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ZONE_DATA} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                  <CartesianGrid {...darkGridProps} horizontal={false} vertical={true} />
                  <XAxis type="number" {...axisStyle} tickFormatter={(val) => `Rs ${val}`} />
                  <YAxis dataKey="name" type="category" {...axisStyle} tickLine={false} axisLine={false} />
                  <RechartsTooltip {...tooltipStyle as any} formatter={(val: number) => [`Rs ${val}`, 'Avg Hrly Rate']}/>
                  <Bar dataKey="avgHourly" radius={[0, 4, 4, 0]} maxBarSize={32}>
                     {ZONE_DATA.map((entry, index) => (
                       <Cell 
                         key={`cell-${index}`} 
                         fill={entry.risk === 'High' ? '#F87171' : entry.risk === 'Medium' ? '#F59E0B' : '#00D4FF'} 
                       />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
            
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5 relative overflow-hidden group">
              <Map className="absolute -right-4 -bottom-4 w-32 h-32 text-[#00D4FF] opacity-5 group-hover:scale-110 transition-transform duration-500" />
              <h3 className={`text-lg font-bold text-white mb-2 ${font.display}`}>Interactive Heatmap</h3>
              <p className="text-sm text-[#94A3B8] mb-6">
                Our full GIS map requires WebGL context to render 14,000+ localized dispute points.
              </p>
              <Button className="w-full bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                <Navigation className="h-4 w-4 mr-2" />
                Launch 3D Map View
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#F87171]/10 border border-[#F87171]/20 rounded-2xl p-5">
               <div className="flex items-center gap-2 text-[#F87171] mb-2">
                 <AlertTriangle className="h-5 w-5" />
                 <h3 className="font-bold">Red Zones Warning</h3>
               </div>
               <p className="text-sm text-[#F87171]/80 leading-relaxed mb-4">
                 Earnings in Lyari and Korangi are currently falling below the minimum wage threshold (approx. Rs 250/hr).
               </p>
               <Button variant="outline" className="w-full bg-[#F87171]/10 text-[#F87171] border-[#F87171]/30 hover:bg-[#F87171]/20">
                 Draft Policy Alert
               </Button>
            </motion.div>
            
          </motion.div>

        </div>
      </div>
    </div>
  )
}
