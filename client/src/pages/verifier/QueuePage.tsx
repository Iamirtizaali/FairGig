import {
  Users, Clock, Search, CheckCircle, AlertTriangle,
  Loader2, ChevronLeft, ChevronRight
} from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { KpiTile } from '@/components/shared/KpiTile'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useVerificationQueueQuery } from '@/features/shifts/api'
import type { QueueItem } from '@/types/earnings'

const PAGE_SIZE = 20

// ─── SLA helpers — uses QueueItem type ───────────────────────────────────────
const SLA_WINDOW_MS = 24 * 60 * 60 * 1000 // 24h window from submission

function slaRemaining(item: QueueItem): number {
  const submitted = new Date(item.updatedAt ?? item.createdAt).getTime()
  return Math.max(0, submitted + SLA_WINDOW_MS - Date.now())
}

function slaLevel(ms: number): 'Critical' | 'High' | 'Low' {
  if (ms < 60 * 60 * 1000)      return 'Critical'
  if (ms < 4 * 60 * 60 * 1000)  return 'High'
  return 'Low'
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return 'Expired'
  const h = Math.floor(ms / (3600 * 1000))
  const m = Math.floor((ms % (3600 * 1000)) / 60000)
  return h > 0 ? `${h}h ${m}m left` : `${m}m left`
}

export default function VerifierQueuePage() {
  const [page, setPage]   = useState(1)
  const [search, setSearch] = useState('')

  const { data, isLoading, isError, refetch } = useVerificationQueueQuery(page, PAGE_SIZE)

  const queueItems = data?.queue ?? []
  const total      = data?.meta?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  // KPIs — derived from current page items
  const kpis = useMemo(() => {
    const critical = queueItems.filter((s) => slaLevel(slaRemaining(s)) === 'Critical').length
    return { total, critical }
  }, [queueItems, total])

  // Client-side search filter
  const filtered = search.trim()
    ? queueItems.filter((s) =>
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.workerId.toLowerCase().includes(search.toLowerCase()),
      )
    : queueItems

  // Sort by SLA urgency (most critical first)
  const sorted = filtered.slice().sort((a, b) => slaRemaining(a) - slaRemaining(b))

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Verification Queue"
          subtext="Review incoming shifts. Prioritize critical SLAs to maintain your verifier score."
        />

        {/* ── KPIs ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUp}>
            <KpiTile label="Pending in Queue" value={kpis.total} icon={<Users />} accentColor="#00D4FF" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Critical SLAs (<1h)" value={kpis.critical} icon={<AlertTriangle />} accentColor="#F87171" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Visible this Page" value={filtered.length} icon={<CheckCircle />} accentColor="#6EE7B7" />
          </motion.div>
        </motion.div>

        {/* ── Queue List ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden mt-6">

          {/* Controls */}
          <div className="p-4 border-b border-[#1E293B] flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input
                placeholder="Search by Shift ID or Worker…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
              />
            </div>
            <div className="text-sm text-[#94A3B8] shrink-0">Sorted by SLA urgency</div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-20 gap-3 text-[#94A3B8]">
              <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />
              <span>Loading verification queue…</span>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-[#F87171]">
              <AlertTriangle className="h-8 w-8" />
              <p>Failed to load queue.</p>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10">
                Retry
              </Button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && sorted.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-2 text-[#94A3B8]">
              <CheckCircle className="h-10 w-10 opacity-20 text-[#6EE7B7]" />
              <p className="font-medium">Queue is clear.</p>
              <p className="text-sm">No shifts pending review right now.</p>
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && sorted.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                    <th className="p-4 font-semibold">Shift Info</th>
                    <th className="p-4 font-semibold">Platform</th>
                    <th className="p-4 font-semibold">Reported Net</th>
                    <th className="p-4 font-semibold">SLA Remaining</th>
                    <th className="p-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {sorted.map((item) => {
                    const remaining = slaRemaining(item)
                    const level     = slaLevel(remaining)
                    return (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className={`text-white font-medium ${font.mono}`}>{item.id.slice(0, 14)}…</span>
                            <span className="text-xs text-[#94A3B8] mt-0.5">
                              {item.workerName ?? `Worker: ${item.workerId.slice(0, 10)}…`}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <PlatformChip platform={item.platform.name} />
                        </td>
                        <td className="p-4">
                          <span className={`text-white ${font.mono}`}>Rs {Number(item.netPay).toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {level === 'Critical'
                              ? <AlertTriangle className="h-4 w-4 text-[#F87171]" />
                              : level === 'High'
                                ? <Clock className="h-4 w-4 text-[#F59E0B]" />
                                : <CheckCircle className="h-4 w-4 text-[#6EE7B7]" />}
                            <span className={`text-sm font-medium ${
                              level === 'Critical' ? 'text-[#F87171]'
                              : level === 'High' ? 'text-[#F59E0B]'
                              : 'text-[#6EE7B7]'
                            }`}>
                              {formatRemaining(remaining)}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            asChild
                            className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Link to={`/verify/${item.id}`}>Review Shift</Link>
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !isError && (
            <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-sm text-[#94A3B8]">
              <span>
                Showing {sorted.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{(page - 1) * PAGE_SIZE + sorted.length} of {total}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline" size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="border-[#1E293B] text-white/50 bg-transparent hover:bg-white/5 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />Previous
                </Button>
                <Button
                  variant="outline" size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C] disabled:opacity-40"
                >
                  Next<ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
