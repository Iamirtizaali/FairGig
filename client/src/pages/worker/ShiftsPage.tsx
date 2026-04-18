import { Search, Download, Plus, AlertTriangle, Loader2, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge, type VerificationStatus } from '@/components/shared/StatusBadge'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useShiftsQuery, usePlatformsQuery } from '@/features/shifts/api'
import type { ShiftVerificationStatus, ListShiftsParams } from '@/types/earnings'

// ─── Status mapper ────────────────────────────────────────────────────────────
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

const PAGE_SIZE = 10

export default function WorkerShiftsPage() {
  const [page, setPage]             = useState(1)
  const [platformId, setPlatformId] = useState<string | undefined>()
  const [status, setStatus]         = useState<ShiftVerificationStatus | undefined>()
  const searchRef                   = useRef<HTMLInputElement>(null)

  const params: ListShiftsParams = { page, limit: PAGE_SIZE, platformId, verificationStatus: status }
  const { data, isLoading, isError, refetch } = useShiftsQuery(params)
  const { data: platforms } = usePlatformsQuery()

  const shifts    = data?.shifts ?? []
  const total     = data?.meta?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          heading="Shift History"
          subtext="View, filter, and export all your recorded gig platform shifts."
          actions={
            <>
              <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                <Link to="/worker/shifts/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Log New Shift
                </Link>
              </Button>
            </>
          }
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] overflow-hidden"
        >
          {/* ── Toolbar ── */}
          <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input
                ref={searchRef}
                placeholder="Search shifts…"
                className="pl-9 bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Platform filter */}
              <Select
                value={platformId ?? 'all'}
                onValueChange={(val) => { setPlatformId(val === 'all' ? undefined : val); setPage(1) }}
              >
                <SelectTrigger className="w-[160px] bg-[#111827] border-[#1E293B] text-white focus:ring-[#00D4FF]/50">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-[#94A3B8] shrink-0" />
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
                  <SelectItem value="all">All Platforms</SelectItem>
                  {(platforms ?? []).map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status filter */}
              <Select
                value={status ?? 'all'}
                onValueChange={(val) => { setStatus(val === 'all' ? undefined : val as ShiftVerificationStatus); setPage(1) }}
              >
                <SelectTrigger className="w-[170px] bg-[#111827] border-[#1E293B] text-white focus:ring-[#00D4FF]/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="self_attested">Self-Attested</SelectItem>
                  <SelectItem value="discrepancy_flagged">Flagged</SelectItem>
                  <SelectItem value="unverifiable">Unverifiable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── States ── */}
          {isLoading && (
            <div className="flex items-center justify-center py-20 gap-3 text-[#94A3B8]">
              <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />
              <span>Loading shifts…</span>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-[#F87171]">
              <AlertTriangle className="h-8 w-8" />
              <p>Failed to load shifts.</p>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10">
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && shifts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-[#94A3B8]">
              <p className="text-sm">No shifts match your filters.</p>
            </div>
          )}

          {/* ── Table ── */}
          {!isLoading && !isError && shifts.length > 0 && (
            <Table>
              <TableHeader className="bg-[#111827]">
                <TableRow className="border-[#1E293B] hover:bg-transparent">
                  <TableHead className="w-12 text-center">
                    <Checkbox className="border-[#313442] data-[state=checked]:bg-[#00D4FF] data-[state=checked]:text-[#0A0E1A]" />
                  </TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10">Shift ID</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10">Platform</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10">Date</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Hours</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Net (PKR)</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Verification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shifts.map((shift) => (
                  <TableRow key={shift.id} className="border-[#1E293B] hover:bg-white/5 transition-colors group">
                    <TableCell className="w-12 text-center">
                      <Checkbox className="border-[#313442] opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 data-[state=checked]:bg-[#00D4FF] data-[state=checked]:text-[#0A0E1A] transition-opacity" />
                    </TableCell>
                    <TableCell className={`font-mono text-sm text-[#94A3B8] ${font.mono}`}>
                      <Link to={`/worker/shifts/${shift.id}`} className="hover:text-white transition-colors">
                        {shift.id.slice(0, 10)}…
                      </Link>
                    </TableCell>
                    <TableCell>
                      <PlatformChip platform={shift.platform.name} />
                    </TableCell>
                    <TableCell className="text-[#F1F5F9]">
                      {new Date(shift.shiftDate).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right text-[#94A3B8]">
                      {Number(shift.hoursWorked).toFixed(1)}h
                    </TableCell>
                    <TableCell className={`text-right font-medium text-white ${font.mono}`}>
                      Rs {Number(shift.netPay).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={toVerificationStatus(shift.verificationStatus)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* ── Pagination ── */}
          {!isLoading && !isError && (
            <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-sm text-[#94A3B8]">
              <p>
                Showing {shifts.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{(page - 1) * PAGE_SIZE + shifts.length} of {total}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost" size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="text-[#94A3B8] disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="ghost" size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="text-white hover:bg-white/5 disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
