import { Plus, Search, Edit2, Trash2, Filter, MapPin, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { fadeUp } from '@/lib/motion'

const ZONES_DATA = [
  { id: 'ZN-KOR', name: 'Korangi Industrial', status: 'Active', riskLevel: 'High', baseRate: 'Rs 240/hr', bounds: 'Polygon(18 vertices)' },
  { id: 'ZN-SAD', name: 'Saddar Central', status: 'Active', riskLevel: 'Medium', baseRate: 'Rs 350/hr', bounds: 'Polygon(12 vertices)' },
  { id: 'ZN-DEF', name: 'Defence Housing Auth', status: 'Active', riskLevel: 'Low', baseRate: 'Rs 550/hr', bounds: 'Polygon(45 vertices)' },
  { id: 'ZN-GUL', name: 'Gulshan-e-Iqbal', status: 'Active', riskLevel: 'Low', baseRate: 'Rs 420/hr', bounds: 'Polygon(22 vertices)' },
  { id: 'ZN-LYA', name: 'Lyari District', status: 'Suspended (Review)', riskLevel: 'Critical', baseRate: 'Rs 210/hr', bounds: 'Polygon(8 vertices)' },
]

export default function AdminZonesPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Geographic Zones"
          subtext="Manage operational zones, set localized baseline earning thresholds, and update polygon bounding coordinates."
          actions={
            <Button className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Plus className="h-4 w-4 mr-2" />
              Define New Zone
            </Button>
          }
        />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
           {/* Controls */}
           <div className="p-4 border-b border-[#1E293B] flex items-center justify-between gap-4">
             <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
               <Input 
                 placeholder="Search zone name or ID..." 
                 className="pl-9 bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
               />
             </div>
             <div className="flex items-center gap-2">
                 <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                   <Filter className="h-4 w-4 mr-2" />
                   Status
                 </Button>
                 <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                   <Filter className="h-4 w-4 mr-2" />
                   Risk Level
                 </Button>
             </div>
           </div>
           
           {/* Table */}
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[900px]">
               <thead>
                 <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                   <th className="p-4 font-semibold">Zone Identifier</th>
                   <th className="p-4 font-semibold">Geo-Bounds</th>
                   <th className="p-4 font-semibold">Base Rate (Threshold)</th>
                   <th className="p-4 font-semibold">Risk State</th>
                   <th className="p-4 font-semibold">Status</th>
                   <th className="p-4 font-semibold text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#1E293B]">
                 {ZONES_DATA.map((zone) => (
                   <tr key={zone.id} className="hover:bg-white/5 transition-colors group">
                     <td className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="bg-[#111827] border border-[#1E293B] p-2 rounded-lg text-[#00D4FF]">
                            <MapPin className="h-5 w-5" />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-white font-medium">{zone.name}</span>
                           <span className="text-xs text-[#94A3B8] mt-0.5 font-mono">{zone.id}</span>
                         </div>
                       </div>
                     </td>
                     <td className="p-4 text-sm text-[#94A3B8] font-mono">
                       {zone.bounds}
                     </td>
                     <td className="p-4 text-white font-medium">
                       {zone.baseRate}
                     </td>
                     <td className="p-4">
                       {zone.riskLevel === 'Critical' && <Badge className="bg-[#F87171]/20 text-[#F87171] border-none"><AlertCircle className="w-3 h-3 mr-1" /> Critical</Badge>}
                       {zone.riskLevel === 'High' && <Badge className="bg-[#F59E0B]/20 text-[#F59E0B] border-none">High</Badge>}
                       {zone.riskLevel === 'Medium' && <Badge className="bg-[#00D4FF]/20 text-[#00D4FF] border-none">Medium</Badge>}
                       {zone.riskLevel === 'Low' && <Badge className="bg-[#6EE7B7]/20 text-[#6EE7B7] border-none">Low</Badge>}
                     </td>
                     <td className="p-4">
                       <span className={`text-sm ${zone.status === 'Active' ? 'text-[#6EE7B7]' : 'text-[#F87171]'}`}>{zone.status}</span>
                     </td>
                     <td className="p-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10">
                           <Edit2 className="h-4 w-4" />
                         </Button>
                         <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-[#F87171] hover:bg-[#F87171]/10">
                           <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </motion.div>

      </div>
    </div>
  )
}
