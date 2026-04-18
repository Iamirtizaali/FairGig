import { Plus, Search, Edit2, Trash2, Power, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'

const PLATFORMSData = [
  { id: 'PLT-001', name: 'foodpanda', color: '#ff2b85', comRate: '0%', flatFee: 'N/A', status: 'Active' },
  { id: 'PLT-002', name: 'Careem', color: '#00B960', comRate: '25%', flatFee: 'N/A', status: 'Active' },
  { id: 'PLT-003', name: 'inDrive', color: '#baff00', comRate: '15%', flatFee: 'N/A', status: 'Active' },
  { id: 'PLT-004', name: 'Uber', color: '#FFFFFF', comRate: '25%', flatFee: 'N/A', status: 'Active' },
  { id: 'PLT-005', name: 'Bykea', color: '#10B981', comRate: '12%', flatFee: 'Rs 15', status: 'Suspended' },
]

export default function AdminPlatformsPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Platform Configurations"
          subtext="Manage active gig platforms in the system, set their expected commission rates, and define metadata."
          actions={
            <Button className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Plus className="h-4 w-4 mr-2" />
              Add Platform
            </Button>
          }
        />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
           {/* Controls */}
           <div className="p-4 border-b border-[#1E293B] flex items-center justify-between gap-4">
             <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
               <Input 
                 placeholder="Search platform name..." 
                 className="pl-9 bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
               />
             </div>
             <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
               <Filter className="h-4 w-4 mr-2" />
               Status
             </Button>
           </div>
           
           {/* Table */}
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                 <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                   <th className="p-4 font-semibold">Platform & ID</th>
                   <th className="p-4 font-semibold">Visual Identity</th>
                   <th className="p-4 font-semibold">Claimed Commission</th>
                   <th className="p-4 font-semibold">Flat Fee (If any)</th>
                   <th className="p-4 font-semibold">Status</th>
                   <th className="p-4 font-semibold text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#1E293B]">
                 {PLATFORMSData.map((plat) => (
                   <tr key={plat.id} className="hover:bg-white/5 transition-colors group">
                     <td className="p-4">
                       <div className="flex flex-col">
                         <span className="text-white font-medium">{plat.name}</span>
                         <span className={`text-xs text-[#94A3B8] mt-0.5 ${font.mono}`}>{plat.id}</span>
                       </div>
                     </td>
                     <td className="p-4">
                       <PlatformChip platform={plat.name as any} />
                     </td>
                     <td className="p-4">
                       <span className="text-white font-bold">{plat.comRate}</span>
                     </td>
                     <td className="p-4">
                       <span className="text-[#94A3B8]">{plat.flatFee}</span>
                     </td>
                     <td className="p-4">
                       {plat.status === 'Active' ? (
                         <Badge className="bg-[#6EE7B7]/10 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 border-none font-medium">
                           Active
                         </Badge>
                       ) : (
                         <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20 border-none font-medium">
                           Suspended
                         </Badge>
                       )}
                     </td>
                     <td className="p-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10">
                           <Edit2 className="h-4 w-4" />
                         </Button>
                         <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-[#F59E0B] hover:bg-[#F59E0B]/10">
                           <Power className="h-4 w-4" />
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
