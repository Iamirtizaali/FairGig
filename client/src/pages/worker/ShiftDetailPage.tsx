import {
  ArrowLeft, ShieldCheck, Download, ExternalLink, Calendar,
  MapPin, Receipt, Loader2, AlertTriangle, Clock, HelpCircle, Image as ImageIcon
} from 'lucide-react'
import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { StatusBadge, type VerificationStatus } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useShiftQuery, useScreenshotUrlQuery } from '@/features/shifts/api'
import type { ShiftVerificationStatus } from '@/types/earnings'

// ─── Status helpers ───────────────────────────────────────────────────────────
function toVerificationStatus(s: ShiftVerificationStatus): VerificationStatus {
  switch (s) {
    case 'verified':            return 'VERIFIED'
    case 'pending_review':      return 'PENDING'
    case 'discrepancy_flagged': return 'DISCREPANCY_FLAGGED'
    case 'unverifiable':        return 'UNVERIFIABLE'
    case 'self_attested':
    default:                    return 'SELF_ATTESTED'
  }
}

// Banner config per status
const STATUS_BANNER: Record<ShiftVerificationStatus, { border: string; bg: string; text: string; icon: React.ReactNode; title: string; desc: string }> = {
  verified: {
    border: 'border-[#6EE7B7]/20', bg: 'bg-[#6EE7B7]/5', text: 'text-[#6EE7B7]',
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Verification Complete',
    desc: 'This shift has been cross-referenced and verified by an independent verifier.',
  },
  pending_review: {
    border: 'border-[#00D4FF]/20', bg: 'bg-[#00D4FF]/5', text: 'text-[#00D4FF]',
    icon: <Loader2 className="h-6 w-6 animate-spin" />,
    title: 'Under Review',
    desc: 'Your shift is in the verification queue. A verifier will review it shortly.',
  },
  self_attested: {
    border: 'border-[#F59E0B]/20', bg: 'bg-[#F59E0B]/5', text: 'text-[#F59E0B]',
    icon: <Clock className="h-6 w-6" />,
    title: 'Self-Attested',
    desc: 'You logged this shift. Upload a screenshot to submit it for verification.',
  },
  discrepancy_flagged: {
    border: 'border-[#F87171]/20', bg: 'bg-[#F87171]/5', text: 'text-[#F87171]',
    icon: <AlertTriangle className="h-6 w-6" />,
    title: 'Discrepancy Flagged',
    desc: 'A verifier found a discrepancy in the earnings data for this shift.',
  },
  unverifiable: {
    border: 'border-[#94A3B8]/20', bg: 'bg-[#94A3B8]/5', text: 'text-[#94A3B8]',
    icon: <HelpCircle className="h-6 w-6" />,
    title: 'Unverifiable',
    desc: 'This shift could not be independently verified.',
  },
}

export default function WorkerShiftDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: shift, isLoading, isError } = useShiftQuery(id ?? '', !!id)
  const { data: screenshotData } = useScreenshotUrlQuery(id ?? '', !!id && (shift?.screenshots?.length ?? 0) > 0)

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
        <Loader2 className="h-6 w-6 animate-spin text-[#00D4FF] mr-3" />
        Loading shift…
      </div>
    )
  }

  if (isError || !shift) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-[#F87171]">
        <AlertTriangle className="h-10 w-10" />
        <p>Shift not found or failed to load.</p>
        <Button variant="outline" asChild className="border-[#1E293B] text-white hover:bg-white/5">
          <Link to="/worker/shifts">Back to Shifts</Link>
        </Button>
      </div>
    )
  }

  const banner = STATUS_BANNER[shift.verificationStatus]
  const verification = shift.verifications?.[0]

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
          heading={`Shift Detail`}
          subtext={`Detailed breakdown and verification status of shift ${id?.slice(0, 12)}…`}
          actions={
            <div className="flex items-center gap-2">
              <StatusBadge status={toVerificationStatus(shift.verificationStatus)} />
              <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          }
        />

        {/* ── Status Banner ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={`mb-6 p-4 rounded-xl border ${banner.border} ${banner.bg} flex items-start sm:items-center gap-4 flex-col sm:flex-row`}
        >
          <div className={`p-2 rounded-full ${banner.bg} ${banner.text} shrink-0`}>
            {banner.icon}
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${banner.text}`}>{banner.title}</h3>
            <p className="text-sm text-[#94A3B8] mt-0.5">{banner.desc}</p>
          </div>
          {verification && (
            <div className="shrink-0 text-sm text-[#94A3B8]">
              Reviewed {new Date(verification.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left Column: Data ── */}
          <motion.div className="lg:col-span-2 space-y-6" variants={staggerContainer} initial="hidden" animate="visible">

            {/* Core Details */}
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
                <h3 className={`font-semibold text-white ${font.display}`}>Shift Details</h3>
                <PlatformChip platform={shift.platform.name} />
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-[#94A3B8] mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Date</span>
                  </div>
                  <p className="font-medium text-white">
                    {new Date(shift.shiftDate).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#94A3B8] mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Duration</span>
                  </div>
                  <p className="font-medium text-white">{Number(shift.hoursWorked).toFixed(1)} hours</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#94A3B8] mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-semibold">Zone</span>
                  </div>
                  <p className="font-medium text-white">
                    {shift.cityZone ? `${shift.cityZone.city} – ${shift.cityZone.zone}` : '—'}
                  </p>
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
                  <span className={`font-medium ${font.mono}`}>Rs {Number(shift.grossPay).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[#F87171]">
                  <span>Platform Deductions</span>
                  <span className={`font-medium ${font.mono}`}>- Rs {Number(shift.deductions).toLocaleString()}</span>
                </div>
                <div className="my-2 border-t border-[#1E293B] border-dashed" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Net Pay</span>
                  <span className={`text-2xl font-bold text-[#00D4FF] ${font.mono}`}>
                    Rs {Number(shift.netPay).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Verifier notes */}
            {verification?.notes && (
              <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5">
                <h3 className={`font-semibold text-white mb-3 ${font.display}`}>Verifier Notes</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{verification.notes}</p>
              </motion.div>
            )}

            {/* Anomaly Flags */}
            {(shift.anomalyFlags?.length ?? 0) > 0 && (
              <motion.div variants={fadeUp} className="bg-[#F87171]/5 border border-[#F87171]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-[#F87171]" />
                  <h3 className={`font-semibold text-[#F87171] ${font.display}`}>Anomaly Flags</h3>
                </div>
                <ul className="space-y-2">
                  {shift.anomalyFlags.map((flag) => (
                    <li key={flag.id} className="text-sm text-[#94A3B8]">• {flag.reason}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* ── Right Column: Proof ── */}
          <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-5">
              <h3 className={`font-semibold text-white mb-4 ${font.display}`}>Provided Proof</h3>

              {screenshotData ? (
                <div className="relative aspect-9/16 bg-[#0A0E1A] rounded-xl overflow-hidden border border-[#262A37] group">
                  <img
                    src={screenshotData.signedUrl}
                    alt="Earnings Screenshot"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0A0E1A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <a href={screenshotData.signedUrl} target="_blank" rel="noreferrer">
                      <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Image
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="aspect-9/16 bg-[#0A0E1A] rounded-xl border border-[#262A37] flex flex-col items-center justify-center gap-3 text-[#94A3B8]">
                  <ImageIcon className="h-10 w-10 opacity-30" />
                  <p className="text-sm text-center px-4">
                    {shift.screenshots.length > 0 ? 'Loading screenshot…' : 'No screenshot uploaded yet.'}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
