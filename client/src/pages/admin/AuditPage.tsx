import { Search, Filter, Download, Terminal, ChevronRight, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

const AUDIT_LOGS = [
  { id: 'LOG-992', timestamp: '2023-10-25T14:32:00Z', actor: 'system_cron', action: 'ZONE_AVERAGE_COMPUTE', status: 'SUCCESS', details: '{"zoneId":"ZN-KOR","newAvg":240.5,"var":-12}' },
  { id: 'LOG-991', timestamp: '2023-10-25T14:15:22Z', actor: 'Hassan (Advocate)', action: 'DISPUTE_FILE', status: 'SUCCESS', details: '{"clusterId":"CL-901","platform":"foodpanda","count":45}' },
  { id: 'LOG-990', timestamp: '2023-10-25T12:05:10Z', actor: 'admin_sys', action: 'FREEZE_USER', status: 'WARNING', details: '{"userId":"W-9123","reason":"Automated fraud detection on 3 recent shifts"}' },
  { id: 'LOG-989', timestamp: '2023-10-25T10:00:00Z', actor: 'system_core', action: 'DB_REPLICATION', status: 'ERROR', details: '{"errMsg":"Connection timeout to replica-node-2","retry":1}' },
  { id: 'LOG-988', timestamp: '2023-10-24T22:30:15Z', actor: 'Zain V. (Verifier)', action: 'REVIEW_SUBMIT', status: 'SUCCESS', details: '{"shiftId":"SH-4092","decision":"Approved","mlMatch":true}' },
]

export default function AdminAuditPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="System Audit Log"
          subtext="Chronological record of every critical state change, actor intervention, and automated systemic action."
          actions={
            <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          }
        />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col min-h-[600px]">
           {/* Top bar */}
           <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827]">
             <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
               <Input 
                 placeholder="Search logs by Trace ID or Actor..." 
                 className="pl-9 bg-[#1B1F2C] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
               />
             </div>
             <div className="flex items-center gap-2">
               <Button variant="outline" className="border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-white/5 shrink-0 bg-[#0A0E1A]">
                 <Terminal className="h-4 w-4 mr-2" /> Advanced Query
               </Button>
               <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                 <Filter className="h-4 w-4 mr-2" /> Filter
               </Button>
             </div>
           </div>
           
           {/* Terminal Feed */}
           <div className="flex-1 overflow-x-auto bg-[#0A0E1A] p-2">
             <div className="min-w-[900px] text-sm">
                
                {/* Header pseudo */}
                <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-[#5A6B8B] uppercase tracking-wider font-semibold text-xs border-b border-[#1E293B]/50 ${font.mono}`}>
                  <div className="col-span-2">Timestamp</div>
                  <div className="col-span-2">Actor</div>
                  <div className="col-span-3">Action Trace</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-4">Payload/Details</div>
                </div>

                <motion.div variants={staggerContainer} className="py-2">
                  {AUDIT_LOGS.map((log) => (
                    <motion.div variants={fadeUp} key={log.id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-[#313442] cursor-pointer">
                      
                      <div className={`col-span-2 text-[#94A3B8] ${font.mono} text-xs my-auto`}>
                        {new Date(log.timestamp).toLocaleString(undefined, {
                          month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
                        })}
                      </div>
                      
                      <div className="col-span-2 flex items-center text-[#E2E8F0] font-medium break-all">
                        {log.actor}
                      </div>
                      
                      <div className={`col-span-3 flex items-center text-[#00D4FF] ${font.mono} break-all`}>
                        <ChevronRight className="h-3 w-3 mr-1 opacity-50" />
                        {log.action}
                      </div>
                      
                      <div className="col-span-1 flex items-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          log.status === 'SUCCESS' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' :
                          log.status === 'WARNING' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                          'bg-[#F87171]/10 text-[#F87171]'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      
                      <div className={`col-span-4 text-[#94A3B8] ${font.mono} text-xs my-auto truncate group-hover:text-white transition-colors`}>
                        {log.details}
                      </div>

                    </motion.div>
                  ))}
                </motion.div>

             </div>
           </div>

           <div className="p-3 bg-[#111827] border-t border-[#1E293B] flex items-center justify-between text-xs text-[#5A6B8B]">
             <div className="flex items-center gap-2">
               <Activity className="h-3 w-3" /> Live tail active
             </div>
             <div>5 of 1.2M rows</div>
           </div>

        </motion.div>
      </div>
    </div>
  )
}
