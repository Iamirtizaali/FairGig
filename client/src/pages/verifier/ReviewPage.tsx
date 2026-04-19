import {
  ArrowLeft, CheckCircle, XCircle, AlertTriangle, ZoomIn,
  Loader2, Image as ImageIcon, ExternalLink, Clock
} from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import {
  useShiftQuery,
  useScreenshotUrlQuery,
  useVerifyShiftMutation,
  extractApiMessage,
} from '@/features/shifts/api'
import type { VerifyShiftDecision } from '@/types/earnings'

// ─── SLA helpers ─────────────────────────────────────────────────────────────
const SLA_WINDOW_MS = 24 * 60 * 60 * 1000

function slaRemainingMs(updatedAt: string) {
  return Math.max(0, new Date(updatedAt).getTime() + SLA_WINDOW_MS - Date.now())
}

function formatSla(ms: number) {
  if (ms <= 0) return { text: 'Expired', color: 'text-[#F87171]' }
  const h = Math.floor(ms / (3600 * 1000))
  const m = Math.floor((ms % (3600 * 1000)) / 60000)
  const color = ms < 3600000 ? 'text-[#F87171]' : ms < 4 * 3600000 ? 'text-[#F59E0B]' : 'text-[#6EE7B7]'
  return { text: h > 0 ? `${h}h ${m}m left` : `${m}m left`, color }
}

export default function VerifierReviewPage() {
  const { shiftId }  = useParams<{ shiftId: string }>()
  const navigate     = useNavigate()

  // Form state
  const [notes, setNotes]                   = useState('')
  const [correctedGross, setCorrectedGross] = useState('')
  const [correctedNet, setCorrectedNet]     = useState('')
  const [submitting, setSubmitting]         = useState(false)
  const [formError, setFormError]           = useState<string | null>(null)

  // Data
  const { data: shift, isLoading, isError } = useShiftQuery(shiftId ?? '', !!shiftId)
  const { data: screenshotData }            = useScreenshotUrlQuery(
    shiftId ?? '',
    !!shiftId && (shift?.screenshots?.length ?? 0) > 0,
  )
  const verifyMutation = useVerifyShiftMutation()

  const handleDecision = async (decision: VerifyShiftDecision) => {
    if (!shiftId) return
    setFormError(null)
    setSubmitting(true)
    try {
      await verifyMutation.mutateAsync({
        id: shiftId,
        decision,
        notes: notes.trim() || undefined,
        correctedGross: correctedGross ? parseFloat(correctedGross) : undefined,
        correctedNet:   correctedNet   ? parseFloat(correctedNet) : undefined,
      })
      navigate('/verify/queue')
    } catch (err) {
      setFormError(extractApiMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  // ── Loading / Error guards ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center gap-3 text-[#94A3B8]">
        <Loader2 className="h-6 w-6 animate-spin text-[#00D4FF]" />
        Loading shift for review…
      </div>
    )
  }

  if (isError || !shift) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-[#F87171]">
        <AlertTriangle className="h-10 w-10" />
        <p>Shift not found or already reviewed.</p>
        <Button variant="outline" asChild className="border-[#1E293B] text-white hover:bg-white/5">
          <Link to="/verify/queue">Back to Queue</Link>
        </Button>
      </div>
    )
  }

  const sla = formatSla(slaRemainingMs(shift.updatedAt ?? shift.createdAt))
  const anomalies = shift.anomalyFlags ?? []

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-[#94A3B8] hover:text-white hover:bg-white/5 -ml-4" asChild>
              <Link to="/verify/queue">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Queue
              </Link>
            </Button>
            <h1 className={`text-xl font-bold text-white ${font.display}`}>
              Review Shift
            </h1>
            <PlatformChip platform={shift.platform.name} />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-[#94A3B8]" />
            <span className="text-[#94A3B8]">SLA:</span>
            <span className={`font-bold ${sla.color}`}>{sla.text}</span>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Left Panel: Screenshot Viewer ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible"
            className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#111827]">
              <h3 className="font-semibold text-white">Worker Provided Proof</h3>
              {screenshotData && (
                <a href={screenshotData.signedUrl} target="_blank" rel="noreferrer">
                  <Button size="icon" variant="ghost" className="text-[#94A3B8] hover:text-white">
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </a>
              )}
            </div>

            <div className="flex-1 bg-[#0A0E1A] p-6 flex flex-col items-center justify-center overflow-auto">
              {screenshotData ? (
                <div className="relative w-full max-w-[360px] rounded-xl overflow-hidden border border-[#262A37] shadow-xl group">
                  <img
                    src={screenshotData.signedUrl}
                    alt="Earnings Screenshot"
                    className="w-full object-contain"
                  />
                  <a
                    href={screenshotData.signedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
                  >
                    <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Full Image
                    </Button>
                  </a>
                </div>
              ) : shift.screenshots.length > 0 ? (
                <div className="flex items-center gap-3 text-[#94A3B8]">
                  <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />
                  Loading screenshot…
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#94A3B8]">
                  <ImageIcon className="h-12 w-12 opacity-20" />
                  <p className="text-sm">No screenshot uploaded by the worker.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Right Panel: Data & Decision ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            className="flex flex-col gap-6 overflow-y-auto pr-2">

            {/* Worker Submission Data */}
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
              <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Worker Submission Data</h3>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-[#94A3B8] text-xs">Shift Date</Label>
                  <p className="font-medium text-white">
                    {new Date(shift.shiftDate).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <Label className="text-[#94A3B8] text-xs">Duration</Label>
                  <p className="font-medium text-white">{Number(shift.hoursWorked).toFixed(1)} hrs</p>
                </div>
                <div>
                  <Label className="text-[#94A3B8] text-xs">Reported Gross</Label>
                  <p className={`text-xl font-medium text-white ${font.mono}`}>
                    Rs {Number(shift.grossPay).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-[#94A3B8] text-xs">Reported Net</Label>
                  <p className={`text-xl font-medium text-[#00D4FF] ${font.mono}`}>
                    Rs {Number(shift.netPay).toLocaleString()}
                  </p>
                </div>
                {shift.cityZone && (
                  <div className="col-span-2">
                    <Label className="text-[#94A3B8] text-xs">Zone</Label>
                    <p className="font-medium text-white">{shift.cityZone.city} – {shift.cityZone.zone}</p>
                  </div>
                )}
              </div>

              {/* Anomaly flags from ML */}
              {anomalies.length > 0 && (
                <div className="p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl flex gap-3 text-[#F59E0B]">
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">ML Anomaly Flags</p>
                    <ul className="text-sm space-y-1">
                      {anomalies.map((f) => (
                        <li key={f.id}>• {f.reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {shift.notes && (
                <div className="mt-4 p-3 bg-[#111827] rounded-xl border border-[#1E293B]">
                  <p className="text-xs text-[#94A3B8] mb-1">Worker Notes</p>
                  <p className="text-sm text-[#F1F5F9]">{shift.notes}</p>
                </div>
              )}
            </motion.div>

            {/* Decision Form */}
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 flex-1 flex flex-col">
              <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Decision</h3>

              <div className="space-y-4 mb-6 flex-1">
                <div className="space-y-2">
                  <Label className="text-white">Correction adjustments <span className="text-xs font-normal text-[#94A3B8]">(if discrepancy found)</span></Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Correct Gross (Optional)"
                      value={correctedGross}
                      onChange={(e) => setCorrectedGross(e.target.value)}
                      className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
                    />
                    <Input
                      type="number"
                      placeholder="Correct Net (Optional)"
                      value={correctedNet}
                      onChange={(e) => setCorrectedNet(e.target.value)}
                      className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Reviewer Notes <span className="text-xs font-normal text-[#94A3B8]">(internal)</span></Label>
                  <Textarea
                    placeholder="E.g. Approved — matches screenshot exactly."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF] resize-none h-24"
                  />
                </div>
              </div>

              {formError && (
                <div className="flex items-start gap-2 p-3 bg-[#F87171]/10 border border-[#F87171]/20 rounded-xl text-[#F87171] text-sm mb-4">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-auto">
                <Button
                  onClick={() => handleDecision('discrepancy_flagged')}
                  disabled={submitting}
                  className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border border-[#F87171]/20 h-14 text-base font-bold"
                >
                  {submitting
                    ? <Loader2 className="h-5 w-5 animate-spin" />
                    : <><XCircle className="h-5 w-5 mr-2" />Reject / Flag</>}
                </Button>
                <Button
                  onClick={() => handleDecision('verified')}
                  disabled={submitting}
                  className="bg-[#6EE7B7] text-[#0A0E1A] hover:bg-[#6EE7B7]/90 h-14 text-base font-bold"
                >
                  {submitting
                    ? <Loader2 className="h-5 w-5 animate-spin" />
                    : <><CheckCircle className="h-5 w-5 mr-2" />Approve Verified</>}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
