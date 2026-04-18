import {
  UploadCloud, FileType, CheckCircle2, AlertCircle, Download, AlertTriangle, X
} from 'lucide-react'
import { Link } from 'react-router'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { fadeUp, scaleIn } from '@/lib/motion'
import {
  useUploadCsvMutation,
  useImportStatusQuery,
  downloadCsvTemplate,
  extractApiMessage,
} from '@/features/shifts/api'

type UploadStep = 'idle' | 'uploading' | 'processing' | 'success' | 'failed'

export default function WorkerImportPage() {
  const [step, setStep]         = useState<UploadStep>('idle')
  const [importId, setImportId] = useState<string | null>(null)
  const [filename, setFilename] = useState<string>('')
  const [error, setError]       = useState<string | null>(null)
  const fileInputRef            = useRef<HTMLInputElement>(null)

  const uploadMutation = useUploadCsvMutation()

  // Auto-polls while step is uploading/processing
  const { data: importStatus } = useImportStatusQuery(
    importId ?? '',
    !!importId && (step === 'uploading' || step === 'processing'),
  )

  // Reflect server status in local step
  const serverStatus = importStatus?.status
  if (serverStatus === 'done'   && step !== 'success') setStep('success')
  if (serverStatus === 'failed' && step !== 'failed')  { setStep('failed'); setError('Import failed on the server. Check the template format.') }
  if ((serverStatus === 'queued' || serverStatus === 'processing') && step === 'uploading') setStep('processing')

  const processUploadedRows = importStatus?.rowsOk ?? null
  const totalRows           = importStatus?.rowsTotal ?? null

  const progressValue = (() => {
    if (step === 'uploading') return 35
    if (step === 'processing' && totalRows && processUploadedRows !== null)
      return Math.round(35 + (processUploadedRows / totalRows) * 65)
    if (step === 'processing') return 60
    if (step === 'success') return 100
    return 0
  })()

  const handleFile = useCallback(async (file: File | null) => {
    if (!file) return
    if (!file.name.endsWith('.csv')) {
      setError('Only CSV files are supported.')
      return
    }
    setError(null)
    setFilename(file.name)
    setStep('uploading')
    try {
      const result = await uploadMutation.mutateAsync(file)
      setImportId(result.importId)
      // Step will advance to 'processing' once polling starts
    } catch (err) {
      setStep('failed')
      setError(extractApiMessage(err))
    }
  }, [uploadMutation])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0] ?? null)
  }, [handleFile])

  const reset = () => {
    setStep('idle')
    setImportId(null)
    setFilename('')
    setError(null)
  }

  const handleDownloadTemplate = async () => {
    await downloadCsvTemplate()
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          heading="Bulk Import Shifts"
          subtext="Upload weekly or monthly earnings reports exported from gig platforms."
          actions={
            <Button variant="outline" onClick={handleDownloadTemplate} className="border-[#1E293B] text-white hover:bg-white/5">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          }
        />

        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] p-6 lg:p-10">
          <AnimatePresence mode="wait">

            {/* ── Idle ── */}
            {step === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-[#1E293B] hover:border-[#00D4FF]/50 bg-[#111827] rounded-xl p-12 transition-all cursor-pointer group mb-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#1B1F2C] group-hover:bg-[#00D4FF]/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                    <UploadCloud className="h-8 w-8 text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Click or drag a CSV file here</h3>
                  <p className="text-sm text-[#94A3B8]">Download the template above, fill it in, then upload it here.</p>
                </div>

                <input ref={fileInputRef} type="file" accept=".csv" className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />

                <div className="flex items-center gap-2 p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-left">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">Please ensure the CSV is not modified. Tampering with platform exports will result in account suspension.</p>
                </div>
              </motion.div>
            )}

            {/* ── Uploading / Processing ── */}
            {(step === 'uploading' || step === 'processing') && (
              <motion.div key="processing" variants={scaleIn} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.95 }} className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#1B1F2C] flex items-center justify-center mx-auto mb-6 relative">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                    className="absolute inset-0 border-2 border-transparent border-t-[#00D4FF] border-r-[#00D4FF] rounded-full" />
                  <FileType className="h-6 w-6 text-[#00D4FF]" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {step === 'uploading' ? `Uploading ${filename}…` : 'Processing records…'}
                </h3>
                <p className="text-sm text-[#94A3B8] mb-6">
                  {step === 'uploading'
                    ? 'Please do not close this window.'
                    : totalRows
                      ? `Processing ${processUploadedRows ?? 0} / ${totalRows} records. Cross-referencing with fraud models.`
                      : 'Cross-referencing with fraud models. This may take a moment.'}
                </p>

                <Progress value={progressValue} className="h-2 w-full max-w-sm mx-auto bg-[#1E293B] [&>div]:bg-[#00D4FF]" />
              </motion.div>
            )}

            {/* ── Success ── */}
            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#6EE7B7]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-[#6EE7B7]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Import Successful</h3>
                <p className="text-[#94A3B8] mb-8">
                  Successfully imported <strong className="text-white">{importStatus?.rowsOk ?? 0} shifts</strong>
                  {(importStatus?.rowsFailed ?? 0) > 0 && (
                    <> · <span className="text-[#F87171]">{importStatus!.rowsFailed} rows skipped</span></>
                  )}. They have been added to your queue for verification.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5" onClick={reset}>
                    Import Another File
                  </Button>
                  <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                    <Link to="/worker/shifts">View Shifts</Link>
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── Failed ── */}
            {step === 'failed' && (
              <motion.div key="failed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#F87171]/10 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-8 w-8 text-[#F87171]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Import Failed</h3>
                <p className="text-[#94A3B8] mb-2">{error}</p>
                {(importStatus?.errors?.length ?? 0) > 0 && (
                  <pre className="text-xs text-[#F87171] bg-[#111827] border border-[#1E293B] rounded-lg p-4 text-left max-h-40 overflow-y-auto mt-4 mb-6">
                    {JSON.stringify(importStatus?.errors, null, 2)}
                  </pre>
                )}
                <div className="flex justify-center gap-4 mt-6">
                  <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5" onClick={reset}>
                    <X className="h-4 w-4 mr-2" />
                    Try Again
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
