import { useState, useMemo } from 'react'
import { Search, Filter, Download, Terminal, ChevronRight, Activity, Loader2, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useAdminAuditQuery } from '@/features/auth/api'
import type { AuditEvent } from '@/types/auth'

const PAGE_SIZE = 50

// ─── Unified audit row (row-level UI shape) ──────────────────────────────────
interface AuditEntry {
  id:        string
  timestamp: string
  actor:     string
  action:    string
  entity:    string
  status:    'SUCCESS' | 'WARNING' | 'ERROR'
  details:   string
}

// Classify a backend action string into a visual severity.
// Verbs like "created/approved/verified" → SUCCESS,
// "rejected/deleted/frozen/flagged" → WARNING,
// "error/failed" → ERROR; anything else → SUCCESS.
function classify(action: string): AuditEntry['status'] {
  const a = action.toLowerCase()
  if (/error|fail/.test(a)) return 'ERROR'
  if (/reject|delete|froze|frozen|flag|escalat|revoke|hidden/.test(a)) return 'WARNING'
  return 'SUCCESS'
}

function eventToEntry(e: AuditEvent): AuditEntry {
  return {
    id:        e.id,
    timestamp: e.createdAt,
    actor:     e.actorRole ? `${e.actorRole}:${(e.actorId ?? '—').slice(0, 8)}` : (e.actorId ? e.actorId.slice(0, 8) : 'system'),
    action:    e.action,
    entity:    `${e.entity}:${e.entityId.slice(0, 8)}`,
    status:    classify(e.action),
    details:   JSON.stringify(e.diff ?? {}),
  }
}

export default function AdminAuditPage() {
  const [search,       setSearch]       = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'SUCCESS' | 'WARNING' | 'ERROR'>('all')
  const [page,         setPage]         = useState(1)

  const { data, isLoading, isError, refetch } = useAdminAuditQuery({ page, limit: PAGE_SIZE })

  const allEntries = useMemo<AuditEntry[]>(
    () => (data?.events ?? []).map(eventToEntry),
    [data],
  )

  const filtered = useMemo(() =>
    allEntries.filter((e) => {
      const matchStatus = statusFilter === 'all' || e.status === statusFilter
      const q = search.toLowerCase()
      const matchSearch = !q
        || e.action.toLowerCase().includes(q)
        || e.actor.toLowerCase().includes(q)
        || e.entity.toLowerCase().includes(q)
        || e.id.toLowerCase().includes(q)
      return matchStatus && matchSearch
    })
  , [allEntries, statusFilter, search])

  const statusColor = (s: AuditEntry['status']) => ({
    SUCCESS: 'bg-[#6EE7B7]/10 text-[#6EE7B7]',
    WARNING: 'bg-[#F59E0B]/10 text-[#F59E0B]',
    ERROR:   'bg-[#F87171]/10 text-[#F87171]',
  }[s])

  const dotColor = (s: AuditEntry['status']) => ({
    SUCCESS: 'bg-[#6EE7B7]',
    WARNING: 'bg-[#F59E0B]',
    ERROR:   'bg-[#F87171] shadow-[0_0_8px_#F87171]',
  }[s])

  const total      = data?.meta?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function exportCsv() {
    const rows = [
      ['id', 'timestamp', 'actor', 'action', 'entity', 'status', 'details'],
      ...filtered.map((e) => [e.id, e.timestamp, e.actor, e.action, e.entity, e.status, e.details.replace(/"/g, '""')]),
    ]
    const csv = rows.map((r) => r.map((c) => `"${String(c)}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `fairgig-audit-p${page}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="System Audit Log"
          subtext="Chronological record of every critical state change, actor intervention, and automated systemic action."
          actions={
            <Button
              variant="outline"
              onClick={exportCsv}
              disabled={filtered.length === 0}
              className="border-[#1E293B] text-white hover:bg-white/5 disabled:opacity-40"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          }
        />

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col min-h-[600px]">
          {/* Top bar */}
          <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827]">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input
                placeholder="Search by action, actor, entity, or ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#1B1F2C] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-white/5 shrink-0 bg-[#0A0E1A]">
                <Terminal className="h-4 w-4 mr-2" />Advanced Query
              </Button>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as 'all' | 'SUCCESS' | 'WARNING' | 'ERROR')}>
                <SelectTrigger className="w-36 bg-[#1B1F2C] border-[#1E293B] text-white h-9 text-sm focus:ring-[#00D4FF]/50">
                  <Filter className="h-3.5 w-3.5 mr-1.5 text-[#94A3B8]" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="WARNING">Warning</SelectItem>
                  <SelectItem value="ERROR">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Terminal Feed */}
          <div className="flex-1 overflow-x-auto bg-[#0A0E1A] p-2">
            {isLoading && (
              <div className="flex items-center justify-center py-24 gap-3 text-[#94A3B8]">
                <Loader2 className="h-6 w-6 animate-spin text-[#00D4FF]" />Loading audit events…
              </div>
            )}

            {isError && !isLoading && (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <p className="text-[#F87171]">Failed to load audit log.</p>
                <Button onClick={() => refetch()} variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                  <RefreshCw className="h-4 w-4 mr-2" /> Retry
                </Button>
              </div>
            )}

            {!isLoading && !isError && (
              <div className="min-w-[900px] text-sm">
                {/* Header */}
                <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-[#5A6B8B] uppercase tracking-wider font-semibold text-xs border-b border-[#1E293B]/50 ${font.mono}`}>
                  <div className="col-span-2">Timestamp</div>
                  <div className="col-span-2">Actor</div>
                  <div className="col-span-3">Action · Entity</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-4">Payload / Diff</div>
                </div>

                {filtered.length === 0 && (
                  <div className="flex items-center justify-center py-20 text-[#94A3B8]">
                    {search || statusFilter !== 'all' ? 'No events match the filter.' : 'No audit events recorded yet.'}
                  </div>
                )}

                <motion.div variants={staggerContainer} className="py-2">
                  {filtered.map((log) => (
                    <motion.div
                      variants={fadeUp}
                      key={log.id}
                      className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-[#313442] cursor-pointer"
                    >
                      <div className={`col-span-2 text-[#94A3B8] ${font.mono} text-xs my-auto`}>
                        {new Date(log.timestamp).toLocaleString(undefined, {
                          month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
                        })}
                      </div>
                      <div className="col-span-2 flex items-center text-[#E2E8F0] font-medium break-all">
                        <div className={`mr-2 mt-0.5 w-2 h-2 rounded-full shrink-0 ${dotColor(log.status)}`} />
                        <span className={`${font.mono} text-xs`}>{log.actor}</span>
                      </div>
                      <div className={`col-span-3 flex flex-col text-[#00D4FF] ${font.mono} break-all`}>
                        <div className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-1 opacity-50 shrink-0" />
                          <span>{log.action}</span>
                        </div>
                        <span className="text-[10px] text-[#5A6B8B] ml-4">{log.entity}</span>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${statusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </div>
                      <div className={`col-span-4 text-[#94A3B8] ${font.mono} text-xs my-auto truncate group-hover:text-white transition-colors`}>
                        {log.details}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>

          {/* Footer / Pagination */}
          <div className="p-3 bg-[#111827] border-t border-[#1E293B] flex items-center justify-between text-xs text-[#5A6B8B]">
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              {isLoading ? 'Loading…' : `${filtered.length} shown · ${total.toLocaleString()} total`}
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                variant="outline" size="sm"
                className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C] disabled:opacity-40 h-7 px-3 text-xs"
              >
                Previous
              </Button>
              <span className="text-[#94A3B8]">Page {page} / {totalPages}</span>
              <Button
                disabled={page >= totalPages || isLoading}
                onClick={() => setPage((p) => p + 1)}
                variant="outline" size="sm"
                className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C] disabled:opacity-40 h-7 px-3 text-xs"
              >
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
