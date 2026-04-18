import { ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'
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

const COMMISSION_TREND = [
  { month: 'Jan', Careem: 20, Uber: 22, inDrive: 10, Bykea: 15 },
  { month: 'Feb', Careem: 20, Uber: 22, inDrive: 10, Bykea: 15 },
  { month: 'Mar', Careem: 22, Uber: 22, inDrive: 10, Bykea: 15 }, // Careem bump
  { month: 'Apr', Careem: 22, Uber: 22, inDrive: 10, Bykea: 15 },
  { month: 'May', Careem: 22, Uber: 25, inDrive: 10, Bykea: 15 }, // Uber bump
  { month: 'Jun', Careem: 22, Uber: 25, inDrive: 10, Bykea: 15 },
  { month: 'Jul', Careem: 25, Uber: 25, inDrive: 10, Bykea: 15 }, // Careem bump
  { month: 'Aug', Careem: 25, Uber: 25, inDrive: 12, Bykea: 15 }, // inDrive slight bump
  { month: 'Sep', Careem: 25, Uber: 25, inDrive: 12, Bykea: 15 },
  { month: 'Oct', Careem: 25, Uber: 25, inDrive: 15, Bykea: 18 }, // inDrive & Bykea bump
]

const ANOMALIES = [
  {
    id: 'ANM-901',
    date: 'Oct 01, 2023',
    platform: 'inDrive',
    description: 'Average effective commission rose from 12% to 15% without public policy update.',
    confidence: 96,
  },
  {
    id: 'ANM-856',
    date: 'Oct 05, 2023',
    platform: 'Bykea',
    description: 'Dynamic pricing cap removed leading to effective 18% cut on long trips.',
    confidence: 89,
  }
]

export default function AdvocateCommissionsPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Commission Watch"
          subtext="Monitor effective commission rates deduced from worker uploaded receipts vs officially stated rates."
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chart */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-3 bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
             <div className="flex items-center justify-between mb-6">
               <h3 className={`text-lg font-bold text-white ${font.display}`}>Effective Rate Trend (2023)</h3>
               <div className="flex gap-2">
                 <Badge className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border-none">
                   2 Spikes Detected
                 </Badge>
               </div>
             </div>
             
             <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={COMMISSION_TREND}>
                   <CartesianGrid {...darkGridProps} />
                   <XAxis dataKey="month" {...axisStyle} />
                   <YAxis {...axisStyle} tickFormatter={(val) => `${val}%`} />
                   <RechartsTooltip {...tooltipStyle as any} />
                   <Legend wrapperStyle={{ paddingTop: '20px' }} />
                   <Line type="stepAfter" dataKey="Careem" stroke={CHART_COLORS.careem} strokeWidth={3} dot={false} />
                   <Line type="stepAfter" dataKey="Uber" stroke={CHART_COLORS.uber} strokeWidth={3} dot={false} />
                   <Line type="stepAfter" dataKey="inDrive" stroke={CHART_COLORS.indrive} strokeWidth={3} dot={false} />
                   <Line type="stepAfter" dataKey="Bykea" stroke={CHART_COLORS.bykea} strokeWidth={3} dot={false} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
            
             <motion.div variants={fadeUp} className="bg-[#F87171]/10 border border-[#F87171]/20 rounded-2xl p-5">
               <div className="flex items-center gap-2 text-[#F87171] mb-4">
                 <ShieldAlert className="h-5 w-5" />
                 <h3 className="font-bold">Detected Anomalies</h3>
               </div>
               <div className="space-y-4">
                 {ANOMALIES.map(anm => (
                   <div key={anm.id} className="bg-[#111827] border border-[#1E293B] rounded-xl p-3">
                     <div className="flex items-center justify-between mb-2">
                       <PlatformChip platform={anm.platform} className="scale-75 origin-left" />
                       <span className="text-xs text-[#94A3B8]">{anm.date}</span>
                     </div>
                     <p className="text-sm text-white mb-2 leading-snug">{anm.description}</p>
                     <div className="flex flex-col gap-1">
                       <div className="flex justify-between text-xs">
                         <span className="text-[#94A3B8]">Confidence</span>
                         <span className="text-[#00D4FF] font-medium">{anm.confidence}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                         <div className="h-full bg-[#00D4FF]" style={{ width: `${anm.confidence}%` }} />
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>

             <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5">
               <h3 className={`text-md font-bold text-white mb-4 ${font.display}`}>Collective Actions</h3>
               <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">
                 Generate an open letter and proof package leveraging the 1,402 verified receipts highlighting the October inDrive shift.
               </p>
               <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold">
                 Draft Report
               </Button>
             </motion.div>

          </motion.div>

        </div>
      </div>
    </div>
  )
}
