import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, ZoomIn } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

const NAV_ITEMS: NavItem[] = [
  { icon: <CheckCircle className="h-5 w-5" />, label: 'Verification Queue', href: '/verify/queue', activeMatch: '/verify/queue' },
  { icon: <ArrowLeft className="h-5 w-5" />, label: 'My History', href: '/verify/history' },
]

export default function VerifierReviewPage() {
  const { shiftId } = useParams()

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-[#94A3B8] hover:text-white hover:bg-white/5 -ml-4" asChild>
              <Link to="/verify/queue">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Queue
              </Link>
            </Button>
            <h1 className={`text-xl font-bold text-white ${font.display}`}>Review Shift {shiftId || 'SH-4092'}</h1>
            <PlatformChip platform="Careem" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#94A3B8]">SLA Time Remaining:</span>
            <span className="font-bold text-[#F59E0B]">1h 45m</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ── Left Panel: Screenshot Viewer ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#111827]">
              <h3 className="font-semibold text-white">Worker Provided Proof</h3>
              <Button size="icon" variant="ghost" className="text-[#94A3B8] hover:text-white"><ZoomIn className="h-5 w-5" /></Button>
            </div>
            <div className="flex-1 bg-[#0A0E1A] p-6 flex flex-col items-center justify-center overflow-auto">
              <div className="relative w-full max-w-[360px] aspect-9/18 bg-[#111827] rounded-xl border border-[#262A37] shadow-xl overflow-hidden flex flex-col p-4">
                 {/* Dummy Screenshot UI */}
                 <div className="w-full text-center mb-6">
                   <div className="text-xl font-bold text-white">Careem Captain</div>
                   <div className="text-xs text-[#94A3B8]">October 24, 2023</div>
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between py-3 border-b border-[#1E293B]">
                     <span className="text-[#94A3B8]">Total Earnings</span>
                     <span className="text-white font-medium">Rs 4,600.00</span>
                   </div>
                   <div className="flex justify-between py-3 border-b border-[#1E293B]">
                     <span className="text-[#94A3B8]">Careem Fee</span>
                     <span className="text-[#F87171] font-medium">-Rs 1,150.00</span>
                   </div>
                   <div className="flex justify-between py-3 border-b border-[#1E293B] mt-auto">
                     <span className="text-[#94A3B8]">Cash Collected</span>
                     <span className="text-[#6EE7B7] font-medium">Rs 1,200.00</span>
                   </div>
                 </div>
                 <div className="mt-8 text-center bg-[#00D4FF]/10 text-[#00D4FF] py-3 rounded-xl font-bold text-xl">
                   Rs 3,450.00
                 </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Panel: Data & Decision Form ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6 overflow-y-auto pr-2">
            
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
              <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Worker Submission Data</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-[#94A3B8] text-xs">Reported Gross</Label>
                  <p className={`text-xl font-medium text-white ${font.mono}`}>Rs 4,600</p>
                </div>
                <div>
                  <Label className="text-[#94A3B8] text-xs">Reported Net</Label>
                  <p className={`text-xl font-medium text-[#00D4FF] ${font.mono}`}>Rs 3,450</p>
                </div>
                <div>
                  <Label className="text-[#94A3B8] text-xs">Reported Date</Label>
                  <p className="font-medium text-white">Oct 24, 2023</p>
                </div>
                <div>
                  <Label className="text-[#94A3B8] text-xs">Reported Duration</Label>
                  <p className="font-medium text-white">6.5 hrs</p>
                </div>
              </div>
              
              <div className="p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl flex gap-3 text-[#F59E0B]">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <p className="text-sm">Our ML model flags the net earning amount as <strong className="font-bold">potentially unusual</strong> for a 6.5 hour shift in this zone. Please verify manually.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex-1 flex flex-col">
              <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Decision</h3>
              
              <div className="space-y-4 mb-6 flex-1">
                <div className="space-y-2">
                  <Label className="text-white">Correction adjustments (if any)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Correct Gross (Optional)" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                    <Input placeholder="Correct Net (Optional)" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Reviewer Notes (Internal)</Label>
                  <Textarea 
                    placeholder="E.g. Approved, matches screenshot perfectly." 
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF] resize-none h-24" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                <Button className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border border-[#F87171]/20 h-14 text-base font-bold">
                  <XCircle className="h-5 w-5 mr-2" />
                  Reject / Flag
                </Button>
                <Button className="bg-[#6EE7B7] text-[#0A0E1A] hover:bg-[#6EE7B7]/90 h-14 text-base font-bold">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Approve Verified
                </Button>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
