import { ShieldCheck, Download, Share2, AlertCircle, Loader2, AlertTriangle, Copy, CheckCircle2, Link2Off } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import {
  useBuildCertificateQuery,
  useShareCertificateMutation,
  useRevokeCertificateMutation,
  extractApiMessage,
} from '@/features/certificate/api'
import { useAuthStore } from '@/stores/auth'
import type { CertificateData } from '@/types/certificate'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function today() { return new Date().toISOString().slice(0, 10) }
function monthsAgo(n: number) {
  const d = new Date(); d.setMonth(d.getMonth() - n)
  return d.toISOString().slice(0, 10)
}

function CertificatePreview({ data, workerName }: { data: CertificateData; workerName: string }) {
  return (
    <div className="w-full max-w-[600px] min-h-[800px] bg-white rounded-lg shadow-[0_0_40px_rgba(0,212,255,0.06)] p-10 select-none relative text-[#001f27]">
      {/* QR placeholder */}
      <div className="absolute top-10 right-10 w-20 h-20 border-4 border-[#00677e] rounded flex items-center justify-center opacity-20">
        <div className="w-full h-full bg-[#00D4FF]/20" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <ShieldCheck className="h-8 w-8 text-[#00677e]" />
        <div>
          <h1 className={`text-2xl font-bold text-[#003642] tracking-tight ${font.display}`}>FairGig</h1>
          <p className="text-[#00586b] text-xs uppercase tracking-widest font-semibold">Verified Income Certificate</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Intro */}
        <div className="border-b border-[#dfe2f3] pb-6">
          <p className="text-sm text-[#004e5f] mb-1">To Whom It May Concern,</p>
          <p className="text-sm leading-relaxed">
            This document certifies the gig-economy earnings for the individual listed below, cross-referenced using API integrations with the respective transportation and delivery platforms across Pakistan.
          </p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-y-4 text-sm border-b border-[#dfe2f3] pb-6">
          <div>
            <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">Worker Name</span>
            <span className="font-medium text-lg">{workerName}</span>
          </div>
          <div>
            <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">Issued On</span>
            <span className={`font-medium ${font.mono}`}>{data.issuedAt}</span>
          </div>
          <div>
            <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">Period Covered</span>
            <span className="font-medium">{data.periodStart} → {data.periodEnd}</span>
          </div>
          <div>
            <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-1">Verified Status</span>
            <span className="inline-flex items-center font-bold text-[#18a479] bg-[#80f9c8]/20 px-2 py-0.5 rounded text-xs gap-1">
              <ShieldCheck className="w-3 h-3" /> VERIFIED
            </span>
          </div>
        </div>

        {/* Total income */}
        <div className="bg-[#f8f9ff] border border-[#dfe2f3] rounded-lg p-6 my-8">
          <span className="block text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-2 text-center">Total Net Income</span>
          <div className={`text-4xl font-bold text-center text-[#003642] ${font.mono}`}>
            {data.currency} {Number(data.totals.net).toLocaleString()}
          </div>
          <p className="text-center text-xs text-[#004e5f] mt-2">From {data.totals.shifts} verified shifts · {data.totals.hours}h worked</p>
        </div>

        {/* Platform breakdown */}
        {data.platformBreakdown.length > 0 && (
          <div>
            <p className="text-xs uppercase text-[#004e5f] font-semibold tracking-wider mb-3">Platform Breakdown</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#004e5f] text-xs border-b border-[#dfe2f3]">
                  <th className="pb-2">Platform</th>
                  <th className="pb-2 text-right">Shifts</th>
                  <th className="pb-2 text-right">Gross</th>
                  <th className="pb-2 text-right">Net</th>
                </tr>
              </thead>
              <tbody>
                {data.platformBreakdown.map((row) => (
                  <tr key={row.platform} className="border-b border-[#f0f1f7]">
                    <td className="py-2">{row.platform}</td>
                    <td className="text-right py-2">{row.shifts}</td>
                    <td className={`text-right py-2 ${font.mono}`}>{row.currency} {Number(row.gross).toLocaleString()}</td>
                    <td className={`text-right py-2 font-medium ${font.mono}`}>{row.currency} {Number(row.net).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-[#004e5f] leading-relaxed mt-16 pt-6 border-t border-[#dfe2f3]">
          {data.shareToken && <p className="mb-2 font-bold">Certificate Token: {data.shareToken.slice(0, 20)}…</p>}
          <p>Visit verify.fairgig.pk to authenticate this document.</p>
          <p className="mt-4 opacity-50">Generated on: {data.issuedAt}</p>
        </div>
      </div>
    </div>
  )
}

export default function WorkerCertificatePage() {
  const user = useAuthStore((s) => s.user)
  const [from, setFrom]       = useState(monthsAgo(1))
  const [to, setTo]           = useState(today())
  const [ttlDays, setTtlDays] = useState(14)
  const [shareUrl, setShareUrl]    = useState<string | null>(null)
  const [copied, setCopied]        = useState(false)
  const [shareError, setShareError] = useState<string | null>(null)

  const { data: cert, isLoading, isError, refetch } = useBuildCertificateQuery({ from, to }, !!(from && to))
  const shareMutation  = useShareCertificateMutation()
  const revokeMutation = useRevokeCertificateMutation()

  // Extract token from existing shareUrl for revoke
  const shareToken = shareUrl ? shareUrl.split('/').pop() ?? null : null

  const handleShare = async () => {
    setShareError(null)
    try {
      const result = await shareMutation.mutateAsync({ from, to, ttlDays })
      setShareUrl(result.shareUrl)
    } catch (err) {
      setShareError(extractApiMessage(err))
    }
  }

  const handleRevoke = async () => {
    if (!shareToken) return
    try {
      await revokeMutation.mutateAsync(shareToken)
      setShareUrl(null)
    } catch (err) {
      setShareError(extractApiMessage(err))
    }
  }

  const handleCopy = () => {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Income Certificate Builder"
          subtext="Generate verified proof of your earnings for loans, visas, or background checks."
          actions={
            <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold lg:hidden">
              <a href="#preview">View Preview</a>
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Config ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-2 space-y-6">
            <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6">
              <h3 className={`text-lg font-bold text-white mb-6 ${font.display}`}>Certificate Configuration</h3>

              <div className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-white">Time Period</Label>
                  <div className="flex gap-3 items-center">
                    <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
                      className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                    <span className="text-[#94A3B8] shrink-0">to</span>
                    <Input type="date" value={to} onChange={(e) => setTo(e.target.value)}
                      className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Share Link TTL (days)</Label>
                  <Input type="number" min={1} max={90} value={ttlDays}
                    onChange={(e) => setTtlDays(Number(e.target.value))}
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                  <p className="text-xs text-[#94A3B8]">How long the public link stays active (1–90 days).</p>
                </div>

                <div className="pt-4 border-t border-[#1E293B] space-y-3">
                  {shareUrl ? (
                    <>
                      <div className="bg-[#111827] rounded-lg p-3 border border-[#1E293B]">
                        <p className="text-xs text-[#94A3B8] mb-1">Share URL</p>
                        <p className={`text-xs text-[#00D4FF] break-all ${font.mono}`}>{shareUrl}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleCopy} variant="outline" className="flex-1 border-[#1E293B] text-white hover:bg-white/5">
                          {copied ? <><CheckCircle2 className="h-4 w-4 mr-2 text-[#6EE7B7]" />Copied!</> : <><Copy className="h-4 w-4 mr-2" />Copy Link</>}
                        </Button>
                        <Button onClick={handleRevoke} disabled={revokeMutation.isPending} variant="ghost"
                          className="text-[#F87171] hover:text-[#F87171] hover:bg-[#F87171]/10">
                          {revokeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2Off className="h-4 w-4" />}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      onClick={handleShare}
                      disabled={shareMutation.isPending || isLoading}
                      className="w-full bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold"
                    >
                      {shareMutation.isPending
                        ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generating…</>
                        : <><Share2 className="h-4 w-4 mr-2" />Generate Share Link</>}
                    </Button>
                  )}

                  {shareError && (
                    <p className="text-xs text-[#F87171] flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />{shareError}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl p-5 flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[#F59E0B] mb-1">Only Verified Shifts Included</h4>
                <p className="text-xs text-[#F59E0B]/80 leading-relaxed">
                  Only shifts with status "Verified" appear in the certificate. Submit screenshots to get your shifts verified first.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Preview ── */}
          <motion.div id="preview" variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-3">
            <div className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#111827]">
                <h3 className="font-semibold text-white">Live Preview</h3>
                <Button size="sm" className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>

              <div className="flex-1 p-8 bg-[#0A0E1A] overflow-y-auto flex justify-center">
                {isLoading && (
                  <div className="flex items-center justify-center flex-1 gap-3 text-[#94A3B8]">
                    <Loader2 className="h-6 w-6 animate-spin text-[#00D4FF]" />
                    <span>Building certificate…</span>
                  </div>
                )}
                {isError && (
                  <div className="flex flex-col items-center justify-center flex-1 gap-4 text-[#F87171]">
                    <AlertTriangle className="h-8 w-8" />
                    <p>Failed to build certificate.</p>
                    <Button variant="outline" size="sm" onClick={() => refetch()} className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10">Retry</Button>
                  </div>
                )}
                {!isLoading && !isError && cert && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <CertificatePreview data={cert} workerName={user?.name ?? 'Worker'} />
                  </motion.div>
                )}
                {!isLoading && !isError && !cert && (
                  <div className="flex flex-col items-center justify-center flex-1 gap-2 text-[#94A3B8]">
                    <ShieldCheck className="h-10 w-10 opacity-20" />
                    <p className="text-sm">Select a date range to preview your certificate.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
