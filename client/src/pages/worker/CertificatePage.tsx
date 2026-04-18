import { Activity, Clock, ShieldCheck, Download, Share2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificates', href: '/worker/certificate', activeMatch: '/worker/certificate' },
]

export default function WorkerCertificatePage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Income Certificate Builder"
          subtext="Generate verified proof of your earnings for loans, visas, or background checks."
          actions={
            <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <a href="#preview" className="lg:hidden">View Preview</a>
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* ── Left Column: Builder Form ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-2 space-y-6">
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
              <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Certificate Configuration</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-white">Time Period</Label>
                  <div className="flex gap-3">
                    <Input type="date" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                    <span className="text-[#94A3B8] self-center">to</span>
                    <Input type="date" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Label className="text-white">Recipient Institution</Label>
                  <Input placeholder="e.g. Meezan Bank (Optional)" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                  <p className="text-xs text-[#94A3B8]">Adding a recipient increases the certificate's authority.</p>
                </div>

                <div className="pt-4 border-t border-[#1E293B] space-y-4">
                  <h4 className="text-sm font-semibold text-white">Inclusions</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Include Pending Shifts</Label>
                      <p className="text-xs text-[#94A3B8]">Only verified shifts are included by default.</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Platform Split</Label>
                      <p className="text-xs text-[#94A3B8]">Breakdown earnings by Uber, Bykea, etc.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl p-5 flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[#F59E0B] mb-1">Blockchain Hash Embedded</h4>
                <p className="text-xs text-[#F59E0B]/80 leading-relaxed">
                  Every generated certificate contains a unique cryptographic hash. Institutions can scan the QR code to instantly verify this document's authenticity against our servers.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Live Preview ── */}
          <motion.div id="preview" variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-3">
            <div className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#111827]">
                <h3 className="font-semibold text-white">Live Preview</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button size="sm" className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {/* The "Paper" Document Preview */}
              <div className="flex-1 p-8 bg-[#0A0E1A] overflow-y-auto flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full max-w-[600px] min-h-[800px] bg-white rounded-lg shadow-[0_0_40px_rgba(0,212,255,0.06)] p-10 select-none relative"
                >
                  <div className="absolute top-10 right-10 w-24 h-24 border-4 border-[#00D4FF] rounded flex flex-col items-center justify-center p-1 opacity-20">
                     <div className="w-full h-full bg-[#00D4FF]/20" />
                  </div>

                  <div className="flex items-center gap-3 mb-10">
                    <ShieldCheck className="h-8 w-8 text-[#00677e]" />
                    <div>
                      <h1 className={`text-2xl font-bold text-[#003642] tracking-tight ${font.display}`}>FairGig</h1>
                      <p className="text-[#00586b] text-xs uppercase tracking-widest font-semibold">Verified Income Certificate</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-[#001f27]">
                    <div className="border-b border-[#dfe2f3] pb-6">
                      <p className="text-sm text-[#004e5f] mb-1">To Whom It May Concern,</p>
                      <p className="text-sm leading-relaxed">
                        This document certifies the gig-economy earnings for the individual listed below, cross-referenced using API integrations with the respective transportation and delivery platforms across Pakistan.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 text-sm border-b border-[#dfe2f3] pb-6">
                      <div>
                        <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">Worker Name</span>
                        <span className="font-medium text-lg">Ahad SE</span>
                      </div>
                      <div>
                        <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">CNIC / ID</span>
                        <span className={`font-medium text-lg ${font.mono}`}>42201-1234567-8</span>
                      </div>
                      <div>
                        <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">Period Covered</span>
                        <span className="font-medium">Sep 01 – Oct 25, 2023</span>
                      </div>
                      <div>
                        <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">Verified Status</span>
                        <span className="inline-flex items-center font-bold text-[#18a479] bg-[#80f9c8]/20 px-2 py-0.5 rounded text-xs gap-1">
                          <ShieldCheck className="w-3 h-3" /> VERIFIED
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#f8f9ff] border border-[#dfe2f3] rounded-lg p-6 my-8">
                      <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-2 text-center">Total Verified Income</span>
                      <div className={`text-4xl font-bold text-center text-[#003642] ${font.mono}`}>
                        PKR 108,450
                      </div>
                      <p className="text-center text-xs text-[#004e5f] mt-2 italic">One Hundred and Eight Thousand, Four Hundred and Fifty Rupees</p>
                    </div>

                    <div className="text-xs text-[#004e5f] leading-relaxed mt-16 pt-6 border-t border-[#dfe2f3]">
                      <p className="mb-2 font-bold">Certificate ID: FG-CERT-8X91M-11Z</p>
                      <p>Scan the QR code printed on the top right or visit verify.fairgig.pk to dynamically authenticate this document to ensure it has not been forged.</p>
                      <p className="mt-4 opacity-50">Generated on: 2023-10-25 14:32 PST</p>
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
