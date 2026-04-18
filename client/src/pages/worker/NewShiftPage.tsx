import { ArrowLeft, Clock, Activity, ShieldCheck, Upload, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { PLATFORM_META } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fadeUp, scaleIn } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts', activeMatch: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificates', href: '/worker/certificate' },
]

export default function WorkerNewShiftPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('careem')

  return (
    <div className="w-full h-full">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="text-[#94A3B8] hover:text-white hover:bg-white/5 mb-4 -ml-4" asChild>
          <Link to="/worker/shifts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shifts
          </Link>
        </Button>

        <PageHeader
          heading="Log New Shift"
          subtext="Upload a screenshot of your earnings to verify a new shift."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] p-6 lg:p-8"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* ── Platform Selection ── */}
            <div>
              <Label className="text-sm font-semibold text-white mb-4 block">Select Platform</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(PLATFORM_META).filter(([key]) => key !== 'other').map(([key, meta]) => {
                  const isSelected = selectedPlatform === key
                  return (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedPlatform(key)}
                      variants={scaleIn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className={cn(
                        'flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200',
                        isSelected 
                          ? 'border-(--platform-color) bg-(--platform-bg)'
                          : 'border-[#1E293B] bg-[#111827] hover:border-[#313442]'
                      )}
                      style={{ 
                        '--platform-color': meta.color,
                        '--platform-bg': meta.bg,
                      } as React.CSSProperties}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: meta.bg, color: meta.color }}
                      >
                        <span className="text-xl font-bold">{meta.label[0]}</span>
                      </div>
                      <span className={cn('text-sm font-medium', isSelected ? 'text-white' : 'text-[#94A3B8]')}>
                        {meta.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* ── Income Details ── */}
            <div>
              <Label className="text-sm font-semibold text-white mb-4 block">Income Details</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Total Earned (Rs)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 2500" 
                    className={`bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50 ${font.mono}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Platform Commission (Rs)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 500" 
                    className={`bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50 ${font.mono}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Date</Label>
                  <Input 
                    type="date" 
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50 w-full appearance-none m-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Duration (Hours)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 6.5" 
                    step="0.5"
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50"
                  />
                </div>
              </div>
            </div>

            {/* ── Screenshot Verification ── */}
            <div>
              <Label className="text-sm font-semibold text-white mb-4 block">Proof of Earnings</Label>
              <div className="border-2 border-dashed border-[#313442] hover:border-[#00D4FF]/50 bg-[#111827] rounded-xl p-8 transition-colors text-center cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-[#1B1F2C] group-hover:bg-[#00D4FF]/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                  <ImageIcon className="h-6 w-6 text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Click or drag a screenshot</h4>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
                  Upload a clear screenshot of your earnings summary from the gig platform app. PNG, JPG up to 5MB.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-[#1E293B]">
              <Button type="button" variant="ghost" className="text-[#94A3B8] hover:text-white hover:bg-white/5" asChild>
                <Link to="/worker/shifts">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold px-8">
                <Upload className="h-4 w-4 mr-2" />
                Submit for Verification
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
