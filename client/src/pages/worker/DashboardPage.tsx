import { Activity, Clock, DollarSign, Target, Plus, AlertTriangle, Loader2 } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { StatusBadge, type VerificationStatus } from '@/components/shared/StatusBadge'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { useShiftsQuery } from '@/features/shifts/api'
import { useWorkerSummaryQuery } from '@/features/analytics/api'
import { useAuthStore } from '@/stores/auth'
import type { ShiftVerificationStatus } from '@/types/earnings'

// ─── Map backend status → StatusBadge key ─────────────────────────────────────
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

export default function WorkerDashboardPage() {
  const user = useAuthStore((s) => s.user)
  
  // ── 1. Fetch recent shifts for the table (limited to 4) ──
  const { data, isLoading: shiftsLoading, isError: shiftsError } = useShiftsQuery({ page: 1, limit: 4 })
  const recentShifts = data?.shifts ?? []

  // ── 2. Fetch full macro summary from Analytics Service (FastAPI) ──
  const { data: summary, isLoading: summaryLoading, isError: summaryError } = useWorkerSummaryQuery()

  const isLoading = shiftsLoading || summaryLoading
  const isError = shiftsError || summaryError

  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          heading={`Welcome back, ${user?.name?.split(' ')[0] ?? 'Worker'}.`}
          subtext="Overview of your recent earnings and verification statuses."
          actions={
            <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Link to="/worker/shifts/new">
                <Plus className="h-4 w-4 mr-2" />
                Log New Shift
              </Link>
            </Button>
          }
        />

        {/* ── KPI Tiles ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <KpiTile
            icon={<DollarSign className="w-5 h-5" />}
            label="This Week Earnings"
            value={summary?.this_week_earnings ?? 0}
            prefix="Rs "
            accentColor="#6EE7B7"
          />
          <KpiTile
            icon={<Clock className="w-5 h-5" />}
            label="Average Hourly Rate"
            value={summary?.average_hourly_rate ? Math.round(summary.average_hourly_rate) : 0}
            prefix="Rs "
            suffix="/hr"
            accentColor="#F59E0B"
          />
          <KpiTile
            icon={<Target className="w-5 h-5" />}
            label="Verification Ratio"
            value={summary?.verification_percentage ? Math.round(summary.verification_percentage) : 0}
            suffix="%"
            accentColor="#00D4FF"
          />
          <KpiTile
            icon={<Activity className="w-5 h-5" />}
            label="Monthly Total"
            value={summary?.this_month_earnings ?? 0}
            prefix="Rs "
            accentColor="#A78BFA"
          />
        </motion.div>

        {/* ── Recent Shifts Table ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] overflow-hidden"
        >
          <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
            <h2 className={`text-lg font-bold text-white ${font.display}`}>Recent Shifts</h2>
            <Button variant="ghost" size="sm" asChild className="text-[#00D4FF] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10">
              <Link to="/worker/shifts">View All</Link>
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-16 gap-3 text-[#94A3B8]">
              <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />
              <span>Loading data…</span>
            </div>
          )}

          {isError && (
            <div className="flex items-center justify-center py-16 gap-3 text-[#F87171]">
              <AlertTriangle className="h-5 w-5" />
              <span>Failed to load data. Check your connection.</span>
            </div>
          )}

          {!isLoading && !isError && recentShifts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-[#94A3B8]">
              <Activity className="h-8 w-8 opacity-30" />
              <p className="text-sm">No shifts yet. Log your first shift to get started.</p>
            </div>
          )}

          {!isLoading && !isError && recentShifts.length > 0 && (
            <Table>
              <TableHeader className="bg-[#111827]">
                <TableRow className="border-[#1E293B] hover:bg-transparent">
                  <TableHead className="text-[#94A3B8] font-medium h-10">Shift ID</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10">Platform</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10">Date</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Amount (PKR)</TableHead>
                  <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Verification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentShifts.map((shift) => (
                  <TableRow key={shift.id} className="border-[#1E293B] hover:bg-white/5 transition-colors">
                    <TableCell className={`font-mono text-sm text-[#94A3B8] ${font.mono}`}>
                      <Link to={`/worker/shifts/${shift.id}`} className="hover:text-white transition-colors">
                        {shift.id.slice(0, 12)}…
                      </Link>
                    </TableCell>
                    <TableCell>
                      <PlatformChip platform={shift.platform.name} />
                    </TableCell>
                    <TableCell className="text-[#F1F5F9]">
                      {new Date(shift.shiftDate).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
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
        </motion.div>
      </div>
    </div>
  )
}

