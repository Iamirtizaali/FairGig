import {
  ShieldAlert, Database, CheckCircle, StopCircle,
  AlertTriangle, Loader2, Clock3, Check
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import {
  useRoleRequestsQuery,
  useApproveRoleRequestMutation,
  useRejectRoleRequestMutation,
  extractApiMessage,
} from '@/features/auth/api'
import { useComplaintsQuery } from '@/features/grievance/api'
import { useShiftsQuery } from '@/features/shifts/api'
import { useState } from 'react'

export default function AdminOverviewPage() {
  const { data: roleData,       isLoading: rLoading } = useRoleRequestsQuery(1, 5)
  const { data: shiftsData,     isLoading: sLoading } = useShiftsQuery({ limit: 1 })
  const { data: complaintsData, isLoading: cLoading } = useComplaintsQuery({ limit: 1 })
  const { data: escalatedData }                       = useComplaintsQuery({ status: 'escalated', limit: 1 })

  const isLoading = rLoading || sLoading || cLoading

  const pendingTotal  = roleData?.meta?.total  ?? 0
  const totalShifts   = shiftsData?.meta?.total ?? 0
  const totalComplaints = complaintsData?.meta?.total ?? 0
  const escalatedCount  = escalatedData?.meta?.total ?? 0

  const recentRequests = (roleData?.requests ?? []).filter((r) => r.status === 'pending').slice(0, 3)

  const approveMutation = useApproveRoleRequestMutation()
  const rejectMutation  = useRejectRoleRequestMutation()
  const [actionErr, setActionErr] = useState<Record<string, string>>({})

  // Derive recent activity from verified/flagged shifts as audit-log proxy
  const { data: verifiedShifts } = useShiftsQuery({ limit: 4, verificationStatus: 'verified' })
  const recentActivity = useMemo(() => {
    const shifts = verifiedShifts?.shifts ?? []
    return shifts.map((s) => ({
      action: 'SHIFT_VERIFIED',
      actor:  'verifier',
      target: s.id.slice(0, 10),
      time:   new Date(s.updatedAt).toLocaleString(undefined, { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      type:   'info' as const,
    }))
  }, [verifiedShifts])

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Admin Control Center"
          subtext="Monitor system health, manage role upgrade requests, and view root-level activity."
        />

        {/* ── System Health Bar ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6EE7B7]"></span>
            </div>
            <span className={`text-sm font-bold text-white uppercase tracking-wider ${font.display}`}>All Systems Operational</span>
          </div>
          <div className="flex gap-6 text-sm flex-wrap">
            <div className="flex flex-col">
              <span className="text-[#94A3B8]">Total Shifts</span>
              <span className="text-white font-mono font-medium">{isLoading ? '…' : totalShifts.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#94A3B8]">Open Complaints</span>
              <span className="text-white font-mono font-medium">{isLoading ? '…' : totalComplaints.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#94A3B8]">Escalated</span>
              <span className={`font-mono font-medium ${escalatedCount > 0 ? 'text-[#F87171]' : 'text-white'}`}>
                {isLoading ? '…' : escalatedCount}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── KPIs ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={fadeUp}>
            <KpiTile label="Total Shifts" value={isLoading ? 0 : totalShifts} icon={<Database />} accentColor="#00D4FF" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Pending Role Requests" value={isLoading ? 0 : pendingTotal} icon={<ShieldAlert />} accentColor="#F59E0B" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Escalated Complaints" value={isLoading ? 0 : escalatedCount} icon={<AlertTriangle />} accentColor="#F87171" className="ring-1 ring-[#F87171]/20" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Total Complaints" value={isLoading ? 0 : totalComplaints} icon={<CheckCircle />} accentColor="#6EE7B7" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Role Requests ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden">
            <div className="p-5 border-b border-[#1E293B] flex justify-between items-center bg-[#111827]">
              <h3 className={`text-lg font-bold text-white ${font.display}`}>Role Escalation Requests</h3>
              <div className="flex items-center gap-2">
                {rLoading
                  ? <Loader2 className="h-4 w-4 animate-spin text-[#F59E0B]" />
                  : <Badge className="bg-[#F59E0B]/20 text-[#F59E0B] border-none">{pendingTotal} Pending</Badge>
                }
              </div>
            </div>
            <div className="flex-1 p-5 space-y-4">
              {rLoading && (
                <div className="flex items-center justify-center py-10 gap-2 text-[#94A3B8]">
                  <Loader2 className="h-5 w-5 animate-spin text-[#F59E0B]" />Loading requests…
                </div>
              )}
              {!rLoading && recentRequests.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <Clock3 className="h-8 w-8 text-[#1E293B]" />
                  <p className="text-[#94A3B8]">No pending role requests.</p>
                </div>
              )}
              {recentRequests.map((req) => {
                const isActing =
                  (approveMutation.isPending && approveMutation.variables === req.id) ||
                  (rejectMutation.isPending  && rejectMutation.variables?.id === req.id)
                return (
                  <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0A0E1A] rounded-xl border border-[#1E293B] gap-3">
                    <div>
                      <div className="font-bold text-white mb-1 text-sm">{req.userId.slice(0, 12)}…</div>
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <span className={font.mono}>{req.id.slice(0, 8)}</span>
                        <span>•</span>
                        <span>Requested: <strong className="text-white font-medium capitalize">{req.requestedRole}</strong></span>
                      </div>
                      {req.reason && <p className="text-xs text-[#94A3B8] mt-1 truncate max-w-xs">{req.reason}</p>}
                      {actionErr[req.id] && <p className="text-xs text-[#F87171] mt-1">{actionErr[req.id]}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline" size="sm"
                        onClick={() => {
                          setActionErr((p) => ({ ...p, [req.id]: '' }))
                          rejectMutation.mutate({ id: req.id }, {
                            onError: (err) => setActionErr((p) => ({ ...p, [req.id]: extractApiMessage(err) })),
                          })
                        }}
                        disabled={isActing}
                        className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10 h-8 px-3 text-xs"
                      >
                        {isActing && rejectMutation.variables?.id === req.id
                          ? <Loader2 className="h-3 w-3 animate-spin" />
                          : <><StopCircle className="h-3.5 w-3.5 mr-1" />Deny</>
                        }
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setActionErr((p) => ({ ...p, [req.id]: '' }))
                          approveMutation.mutate(req.id, {
                            onError: (err) => setActionErr((p) => ({ ...p, [req.id]: extractApiMessage(err) })),
                          })
                        }}
                        disabled={isActing}
                        className="bg-[#6EE7B7] text-[#0A0E1A] hover:bg-[#6EE7B7]/90 font-bold h-8 px-3 text-xs"
                      >
                        {isActing && approveMutation.variables === req.id
                          ? <Loader2 className="h-3 w-3 animate-spin" />
                          : <><Check className="h-3.5 w-3.5 mr-1" />Approve</>
                        }
                      </Button>
                    </div>
                  </div>
                )
              })}
              {!rLoading && pendingTotal > 3 && (
                <Button variant="ghost" className="w-full text-[#00D4FF] hover:bg-[#00D4FF]/10 mt-2" asChild>
                  <Link to="/admin/users">View All {pendingTotal} Requests</Link>
                </Button>
              )}
            </div>
          </motion.div>

          {/* ── Recent Activity ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden">
            <div className="p-5 border-b border-[#1E293B] flex justify-between items-center bg-[#111827]">
              <h3 className={`text-lg font-bold text-white ${font.display}`}>Recent Verified Activity</h3>
              <Button variant="ghost" size="sm" className="text-[#00D4FF] hover:bg-[#00D4FF]/10 text-xs" asChild>
                <Link to="/admin/audit">See full audit →</Link>
              </Button>
            </div>
            <div className="flex-1 p-5 space-y-4">
              {sLoading && (
                <div className="flex items-center justify-center py-10 gap-2 text-[#94A3B8]">
                  <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />Loading activity…
                </div>
              )}
              {!sLoading && recentActivity.length === 0 && (
                <p className="text-[#94A3B8] text-sm text-center py-10">No recent shift verifications.</p>
              )}
              {recentActivity.map((log, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-[#1E293B]/50 last:border-0 last:pb-0">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-[#00D4FF] shrink-0" />
                  <div className="flex-1">
                    <div className={`text-sm font-bold text-white ${font.mono}`}>{log.action}</div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-[#94A3B8]">Shift: <span className="text-white">{log.target}…</span></span>
                      <span className="text-[#94A3B8]">{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
