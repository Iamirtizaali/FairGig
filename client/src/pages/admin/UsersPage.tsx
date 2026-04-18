import { Search, Filter, Shield, MoreVertical, Lock, UserCheck, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'

const USERS_DATA = [
  { id: 'W-9121', name: 'Zain V.', role: 'Worker', status: 'Active', verification: 'Verified', joined: 'Oct 10, 2023' },
  { id: 'W-9122', name: 'Ali (Advocate)', role: 'Advocate', status: 'Active', verification: 'System Verified', joined: 'Sep 05, 2023' },
  { id: 'W-9123', name: 'Hassan R.', role: 'Worker', status: 'Frozen', verification: 'Flagged', joined: 'Oct 22, 2023' },
  { id: 'W-9124', name: 'Sarah K.', role: 'Verifier', status: 'Active', verification: 'Verified', joined: 'Aug 14, 2023' },
  { id: 'W-9125', name: 'Kamran M.', role: 'Worker', status: 'Active', verification: 'Pending', joined: 'Oct 25, 2023' },
]

export default function AdminUsersPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="User Directory & Roles"
          subtext="Manage all users on the FairGig network. Approve role escalations or issue account freezes."
        />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
           {/* Controls */}
           <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827]">
             <div className="relative flex-1 max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
               <Input 
                 placeholder="Search by Worker ID or Name..." 
                 className="pl-9 bg-[#1B1F2C] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
               />
             </div>
             <div className="flex items-center gap-2">
               <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                 <Shield className="h-4 w-4 mr-2" /> Role
               </Button>
               <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                 <Filter className="h-4 w-4 mr-2" /> Status
               </Button>
             </div>
           </div>
           
           {/* Table */}
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[900px]">
               <thead>
                 <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                   <th className="p-4 font-semibold">User Info</th>
                   <th className="p-4 font-semibold">Current Role</th>
                   <th className="p-4 font-semibold">Status</th>
                   <th className="p-4 font-semibold">Verification Level</th>
                   <th className="p-4 font-semibold">Joined</th>
                   <th className="p-4 font-semibold text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-[#1E293B]">
                 {USERS_DATA.map((user) => (
                   <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                     <td className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#1E293B] flex items-center justify-center shrink-0">
                           <span className="text-xs text-[#00D4FF] font-bold">{user.name.charAt(0)}</span>
                         </div>
                         <div className="flex flex-col">
                           <span className="text-white font-medium">{user.name}</span>
                           <span className={`text-xs text-[#94A3B8] mt-0.5 ${font.mono}`}>{user.id}</span>
                         </div>
                       </div>
                     </td>
                     <td className="p-4">
                       <span className={`text-sm font-medium ${
                         user.role === 'Advocate' ? 'text-[#F59E0B]' :
                         user.role === 'Verifier' ? 'text-[#6EE7B7]' : 'text-white'
                       }`}>{user.role}</span>
                     </td>
                     <td className="p-4">
                       {user.status === 'Active' ? (
                         <Badge className="bg-[#6EE7B7]/10 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 border-none">Active</Badge>
                       ) : (
                         <Badge className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border-none">Frozen</Badge>
                       )}
                     </td>
                     <td className="p-4">
                       <div className="flex items-center gap-1.5 text-sm">
                         {user.verification === 'Verified' && <Shield className="h-4 w-4 text-[#00D4FF]" />}
                         {user.verification === 'System Verified' && <Shield className="h-4 w-4 text-[#F59E0B]" />}
                         {user.verification === 'Flagged' && <AlertTriangle className="h-4 w-4 text-[#F87171]" />}
                         <span className={user.verification === 'Flagged' ? 'text-[#F87171]' : 'text-[#94A3B8]'}>
                           {user.verification}
                         </span>
                       </div>
                     </td>
                     <td className="p-4 text-[#94A3B8] text-sm">
                       {user.joined}
                     </td>
                     <td className="p-4 text-right">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         {user.status === 'Frozen' ? (
                           <Button variant="ghost" size="icon" className="text-[#6EE7B7] hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/10">
                             <UserCheck className="h-4 w-4" />
                           </Button>
                         ) : (
                           <Button variant="ghost" size="icon" className="text-[#F87171] hover:text-[#F87171] hover:bg-[#F87171]/10">
                             <Lock className="h-4 w-4" />
                           </Button>
                         )}
                         <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-white hover:bg-white/5">
                           <MoreVertical className="h-4 w-4" />
                         </Button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           {/* Pagination */}
           <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-sm text-[#94A3B8] bg-[#111827]">
             <span>Showing 1 to 5 of 28,450 users</span>
             <div className="flex gap-2">
               <Button disabled variant="outline" size="sm" className="border-[#1E293B] text-white/50 bg-transparent">Previous</Button>
               <Button variant="outline" size="sm" className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C]">Next</Button>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  )
}
