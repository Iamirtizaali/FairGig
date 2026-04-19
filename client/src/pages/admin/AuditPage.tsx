import { useState, useMemo } from 'react'
import { Search, Filter, Download, Terminal, ChevronRight, Activity, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useShiftsQuery } from '@/features/shifts/api'
import { useComplaintsQuery } from '@/features/grievance/api'
import type { Shift } from '@/types/earnings'
import type { ComplaintSummary } from '@/types/grievance'

// ─── Unified audit event ─────────────────────────────────────────────────────
interface AuditEntry {
  id:        string
  timestamp: string
  actor:     string
  action:    string
  status:    'SUCCESS' | 'WARNING' | 'ERROR'
  details:   string
}

function shiftToEntry(s: Shift): AuditEntry {
  const decision = s.verificationStatus === 'verified' ? 'Approved' : 'Flagged'
  const status   = s.verificationStatus === 'verified' ? 'SUCCESS' : 'WARNING'
  return {
    id:        `SH-${s.id.slice(0, 6)}`,
    timestamp: s.updatedAt,
    actor:     'verifier',
    action:    `SHIFT_${decision.toUpperCase()}`,
    status,
    details:   JSON.stringify({
      shiftId:      s.id.slice(0, 12),
      platform:     s.platform.name,
      gross:        s.grossPay,
      status:       s.verificationStatus,
    }),
  }
}

function complaintToEntry(c: ComplaintSummary): AuditEntry {
  const statusMap: Record<string, 'SUCCESS' | 'WARNING' | 'ERROR'> = {
    resolved:     'SUCCESS',
    open:         'WARNING',
    under_review: 'WARNING',
    escalated:    'ERROR',
    hidden:       'WARNING',
  }
  return {
    id:        `CP-${c.id.slice(0, 6)}`,
    timestamp: c.updatedAt ?? c.createdAt,
    actor:     'advocate',
    action:    `COMPLAINT_${c.status.toUpperCase().replace('_', '_')}`,
    status:    statusMap[c.status] ?? 'WARNING',
    details:   JSON.stringify({
      complaintId: c.id.slice(0, 12),
      title:       c.title.slice(0, 40),
      platform:    c.platform,
      status:      c.status,
    }),
  }
}

export default function AdminAuditPage() {
  const [search,        setSearch]        = useState('')
  const [statusFilter,  setStatusFilter]  = useState<'all' | 'SUCCESS' | 'WARNING' | 'ERROR'>('all')

  // Pull recent verified + flagged shifts as audit events
  const { data: verifiedData,   isLoading: vLoading } = useShiftsQuery({ limit: 50, verificationStatus: 'verified' })
  const { data: flaggedData,    isLoading: fLoading }  = useShiftsQuery({ limit: 50, verificationStatus: 'discrepancy_flagged' })
  const { data: complaintsData, isLoading: cLoading }  = useComplaintsQuery({ limit: 50 })

  const isLoading = vLoading || fLoading || cLoading

  // Merge → sort by timestamp desc
  const allEntries = useMemo<AuditEntry[]>(() => {
    const shiftEntries = [
      ...(verifiedData?.shifts ?? []).map(shiftToEntry),
      ...(flaggedData?.shifts  ?? []).map(shiftToEntry),
    ]
    const complaintEntries = (complaintsData?.complaints ?? []).map(complaintToEntry)
    return [...shiftEntries, ...complaintEntries]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [verifiedData, flaggedData, complaintsData])

  const filtered = useMemo(() =>
    allEntries.filter((e) => {
      const matchStatus = statusFilter === 'all' || e.status === statusFilter
      const q = search.toLowerCase()
      const matchSearch = !q || e.action.toLowerCase().includes(q) || e.actor.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)
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

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="System Audit Log"
          subtext="Chronological record of every critical state change, actor intervention, and automated systemic action."
          actions={
            <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
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
                placeholder="Search by action, actor, or ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#1B1F2C] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-white/5 shrink-0 bg-[#0A0E1A]">
                <Terminal className="h-4 w-4 mr-2" />Advanced Query
              </Button>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
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

            {!isLoading && (
              <div className="min-w-[900px] text-sm">
                {/* Header */}
                <div className={`grid grid-cols-12 gap-4 px-4 py-3 text-[#5A6B8B] uppercase tracking-wider font-semibold text-xs border-b border-[#1E293B]/50 ${font.mono}`}>
                  <div className="col-span-2">Timestamp</div>
                  <div className="col-span-2">Actor</div>
                  <div className="col-span-3">Action Trace</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-4">Payload/Details</div>
                </div>

                {filtered.length === 0 && (
                  <div className="flex items-center justify-center py-20 text-[#94A3B8]">
                    {search || statusFilter !== 'all' ? 'No events match the filter.' : 'No audit events yet.'}
                  </div>
                )}

                <motion.div variants={staggerContainer} className="py-2">
                  {filtered.map((log) => (
                    <motion.div
                      variants={fadeUp}
                      key={`${log.id}-${log.timestamp}`}
                      className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5 transition-colors group border-l-2 border-transparent hover:border-[#313442] cursor-pointer"
                    >
                      <div className={`col-span-2 text-[#94A3B8] ${font.mono} text-xs my-auto`}>
                        {new Date(log.timestamp).toLocaleString(undefined, {
                          month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
                        })}
                      </div>
                      <div className="col-span-2 flex items-center text-[#E2E8F0] font-medium break-all">
                        <div className={`mr-2 mt-0.5 w-2 h-2 rounded-full shrink-0 ${dotColor(log.status)}`} />
                        {log.actor}
                      </div>
                      <div className={`col-span-3 flex items-center text-[#00D4FF] ${font.mono} break-all`}>
                        <ChevronRight className="h-3 w-3 mr-1 opacity-50 shrink-0" />
                        {log.action}
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

          <div className="p-3 bg-[#111827] border-t border-[#1E293B] flex items-center justify-between text-xs text-[#5A6B8B]">
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              {isLoading ? 'Loading…' : `${filtered.length} events shown`}
            </div>
            <div>{isLoading ? '…' : `${allEntries.length} total events merged`}</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
