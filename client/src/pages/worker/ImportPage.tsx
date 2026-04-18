import { UploadCloud, FileType, CheckCircle2, AlertCircle, Clock, Activity, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { fadeUp, scaleIn } from '@/lib/motion'

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts', activeMatch: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificates', href: '/worker/certificate' },
]

export default function WorkerImportPage() {
  const [step, setStep] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle')
  const [progress, setProgress] = useState(0)

  // Simulation handler for the UI flow
  const handleUploadClick = () => {
    setStep('uploading')
    let val = 0
    const int = setInterval(() => {
      val += 15
      setProgress(Math.min(val, 100))
      
      if (val >= 120) {
        setStep('processing')
      }
      
      if (val >= 200) {
        clearInterval(int)
        setStep('success')
        setProgress(100)
      }
    }, 300)
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          heading="Bulk Import Data"
          subtext="Upload weekly or monthly earnings reports exports from gig platforms."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] p-6 lg:p-10"
        >
          <AnimatePresence mode="wait">
            
            {/* ── Step 1: Idle Dropzone ── */}
            {step === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div 
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-[#1E293B] hover:border-[#00D4FF]/50 bg-[#111827] rounded-xl p-12 transition-all cursor-pointer group mb-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1B1F2C] group-hover:bg-[#00D4FF]/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                    <UploadCloud className="h-8 w-8 text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Click or drag a CSV file here</h3>
                  <p className="text-sm text-[#94A3B8] max-w-sm mx-auto">
                    Supported formats: CSV, XLS. Download your earnings report directly from the Foodpanda or Uber driver app and upload it here.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-left">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">Please ensure the CSV is not modified. Tampering with platform exports will result in account suspension.</p>
                </div>
              </motion.div>
            )}

            {/* ── Step 2 & 3: Uploading / Processing ── */}
            {(step === 'uploading' || step === 'processing') && (
              <motion.div
                key="processing"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#1B1F2C] flex items-center justify-center mx-auto mb-6 relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-2 border-transparent border-t-[#00D4FF] border-r-[#00D4FF] rounded-full"
                  />
                  <FileType className="h-6 w-6 text-[#00D4FF]" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">
                  {step === 'uploading' ? 'Uploading file...' : 'Processing 124 records...'}
                </h3>
                <p className="text-sm text-[#94A3B8] mb-6">
                  {step === 'uploading' ? 'Please do not close this window.' : 'Cross-referencing with our fraud models.'}
                </p>

                <Progress value={progress} className="h-2 w-full max-w-sm mx-auto bg-[#1E293B] [&>div]:bg-[#00D4FF]" />
              </motion.div>
            )}

            {/* ── Step 4: Success ── */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-[#6EE7B7]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-[#6EE7B7]" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">Import Successful</h3>
                <p className="text-[#94A3B8] mb-8">
                  Successfully imported <strong className="text-white">124 shifts</strong>. They have been added to your queue for verification.
                </p>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5" onClick={() => setStep('idle')}>
                    Import Another File
                  </Button>
                  <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                    <Link to="/worker/shifts">
                      View Shifts
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
