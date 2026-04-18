import { ArrowLeft, Clock, Activity, ShieldCheck, Download, ExternalLink, Calendar, MapPin, Receipt } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts', activeMatch: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificates', href: '/worker/certificate' },
]

export default function WorkerShiftDetailPage() {
  const { id } = useParams()

  return (
    <div className="w-full h-full">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="text-[#94A3B8] hover:text-white hover:bg-white/5 mb-4 -ml-4" asChild>
          <Link to="/worker/shifts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shifts
          </Link>
        </Button>

        <PageHeader
          heading={`Shift ${id || 'SH-4092-1'}`}
          subtext="Detailed breakdown and verification status of your shift."
          actions={
            <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          }
        />

        {/* ── Status Banner ── */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 p-4 rounded-xl border border-[#6EE7B7]/20 bg-[#6EE7B7]/5 flex items-start sm:items-center gap-4 flex-col sm:flex-row"
        >
          <div className="p-2 rounded-full bg-[#6EE7B7]/10 text-[#6EE7B7] shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#6EE7B7]">Verification Complete</h3>
            <p className="text-sm text-[#94A3B8] mt-0.5">This shift has been cross-referenced and verified by an independent verifier.</p>
          </div>
          <div className="shrink-0 text-sm text-[#94A3B8]">
            Verified on Oct 25, 2023
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left Column: Data ── */}
          <motion.div className="lg:col-span-2 space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
            
            {/* Core Details */}
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
                <h3 className={`font-semibold text-white ${font.display}`}>Shift Details</h3>
                <PlatformChip platform="Careem" />
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-[#94A3B8] mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Date</span>
                  </div>
                  <p className="font-medium text-white">Oct 24, 2023</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#94A3B8] mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Duration</span>
                  </div>
                  <p className="font-medium text-white">09:00 - 15:30 (6.5h)</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#94A3B8] mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Zone</span>
                  </div>
                  <p className="font-medium text-white">Karachi South</p>
                </div>
              </div>
            </motion.div>

            {/* Financial Breakdown */}
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-6">
                <Receipt className="h-5 w-5 text-[#00D4FF]" />
                <h3 className={`font-semibold text-white ${font.display}`}>Earnings Breakdown</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[#F1F5F9]">
                  <span>Gross Earnings</span>
                  <span className={`font-medium ${font.mono}`}>Rs 4,600</span>
                </div>
                <div className="flex justify-between items-center text-[#F87171]">
                  <span>Platform Commission (-25%)</span>
                  <span className={`font-medium ${font.mono}`}>- Rs 1,150</span>
                </div>
                <div className="my-2 border-t border-[#1E293B] border-dashed" />
                <div className="flex justify-between items-center text-[#F1F5F9]">
                  <span>Net Fare</span>
                  <span className={`font-medium ${font.mono}`}>Rs 3,450</span>
                </div>
                <div className="flex justify-between items-center text-[#6EE7B7]">
                  <span>Tips & Bonuses</span>
                  <span className={`font-medium ${font.mono}`}>+ Rs 150</span>
                </div>
                <div className="my-4 border-t border-[#1E293B]" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total Take-Home</span>
                  <span className={`text-2xl font-bold text-[#00D4FF] ${font.mono}`}>Rs 3,600</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* ── Right Column: Proof ── */}
          <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
            
            {/* Verification Proof */}
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5">
              <h3 className={`font-semibold text-white mb-4 ${font.display}`}>Provided Proof</h3>
              <div className="relative aspect-9/16 bg-[#0A0E1A] rounded-xl overflow-hidden border border-[#262A37] group">
                {/* Simulated screenshot skeleton */}
                <div className="absolute inset-0 bg-linear-to-b from-[#111827] to-[#0A0E1A] flex flex-col p-4">
                  <div className="h-6 w-1/3 bg-[#1E293B] rounded-md mb-8" />
                  <div className="h-24 w-full bg-[#1E293B] rounded-xl mb-4" />
                  <div className="h-8 w-2/3 bg-[#1E293B] rounded-md mx-auto mb-auto" />
                  <div className="h-12 w-full bg-[#22C55E]/20 rounded-xl" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0A0E1A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Image
                  </Button>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
