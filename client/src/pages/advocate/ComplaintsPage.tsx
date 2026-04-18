import { Filter, Search, ArrowRight, Flag, Shield, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

const COMPLAINT_CLUSTERS = [
  { title: 'Unpaid waiting time', count: 45, platform: 'foodpanda', severity: 'High' },
  { title: 'Hidden commission fees', count: 32, platform: 'inDrive', severity: 'Medium' },
  { title: 'App crashes dropping shifts', count: 28, platform: 'Careem', severity: 'High' },
  { title: 'Account banned w/o cause', count: 15, platform: 'Uber', severity: 'Critical' },
]

export default function AdvocateComplaintsPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Systemic Grievances"
          subtext="Identify clusters of matching worker complaints to build strong collective dispute cases."
          actions={
            <Button className="bg-[#F87171] text-white hover:bg-[#F87171]/90 font-bold border-none">
              <Flag className="h-4 w-4 mr-2" />
              File Collective Dispute
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* ── Sidebar: Clusters ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-1 space-y-4">
            <h3 className={`text-sm font-semibold text-white uppercase tracking-wider ${font.display}`}>Trending Clusters</h3>
            <div className="space-y-3">
              {COMPLAINT_CLUSTERS.map((cluster, i) => (
                <div key={i} className="bg-[#1B1F2C] border border-[#1E293B] rounded-xl p-4 cursor-pointer hover:border-[#313442] transition-colors relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    cluster.severity === 'Critical' ? 'bg-[#F87171]' :
                    cluster.severity === 'High' ? 'bg-[#F59E0B]' : 'bg-[#6EE7B7]'
                  }`} />
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-[#111827] border-[#1E293B] text-[#94A3B8] font-normal text-xs">{cluster.platform}</Badge>
                    <span className="text-[#00D4FF] font-bold text-lg leading-none">{cluster.count}</span>
                  </div>
                  <p className="text-sm text-white font-medium group-hover:text-[#00D4FF] transition-colors">{cluster.title}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Main Feed ── */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between bg-[#1B1F2C] border border-[#1E293B] p-2 rounded-xl gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <Input 
                  placeholder="Search individual grievances..." 
                  className="pl-9 bg-transparent border-none text-white focus-visible:ring-0 shadow-none"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-white shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div key={i} variants={fadeUp} className="bg-[#111827] border border-[#1E293B] hover:border-[#313442] transition-colors rounded-xl p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1B1F2C] flex items-center justify-center shrink-0 border border-[#1E293B]">
                        <span className={`text-sm text-[#94A3B8] font-bold ${font.mono}`}>W</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-white font-medium ${font.mono}`}>W-209{i}</span>
                          <span className="text-xs text-[#94A3B8]">2 hours ago</span>
                        </div>
                        <PlatformChip platform="foodpanda" className="scale-90 origin-left mt-1" />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-[#94A3B8]"><MoreVertical className="h-4 w-4" /></Button>
                  </div>
                  
                  <h3 className="text-lg text-white font-medium mb-2">Unpaid waiting time at KFC branch</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 line-clamp-2">
                    I waited for over 45 minutes for the order to be prepared, but support refused to compensate for the wait time stating it was within standard expected delays. This happens every evening at this specific location.
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-[#1E293B]">
                    <Button variant="outline" size="sm" className="border-[#1E293B] text-white hover:bg-white/5 border-dashed">
                      <Shield className="h-3 w-3 mr-2 text-[#00D4FF]" /> Assign to Dispute Case
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#00D4FF] hover:text-white hover:bg-white/5 ml-auto">
                      View Details <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
