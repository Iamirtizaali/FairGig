import { useState } from 'react'
import {
  Search, Filter, Shield, MoreVertical, Lock, UserCheck,
  AlertTriangle, Clock3, Check, X, Loader2, RefreshCw,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import {
  useRoleRequestsQuery,
  useApproveRoleRequestMutation,
  useRejectRoleRequestMutation,
  useUpdateUserStatusMutation,
  extractApiMessage,
} from '@/features/auth/api'

// ─── Static demo users (user listing endpoint not in scope yet) ───────────────
const USERS_DATA = [
  { id: 'W-9121', name: 'Zain V.',       role: 'Worker',   status: 'Active', verification: 'Verified',        joined: 'Oct 10, 2023' },
  { id: 'W-9122', name: 'Ali (Advocate)', role: 'Advocate', status: 'Active', verification: 'System Verified', joined: 'Sep 05, 2023' },
  { id: 'W-9123', name: 'Hassan R.',     role: 'Worker',   status: 'Frozen', verification: 'Flagged',          joined: 'Oct 22, 2023' },
  { id: 'W-9124', name: 'Sarah K.',      role: 'Verifier', status: 'Active', verification: 'Verified',         joined: 'Aug 14, 2023' },
  { id: 'W-9125', name: 'Kamran M.',     role: 'Worker',   status: 'Active', verification: 'Pending',          joined: 'Oct 25, 2023' },
]

// ─── Role request status badge ─────────────────────────────────────────────
function StatusBadge({ status }: { status: 'pending' | 'approved' | 'rejected' }) {
  const map = {
    pending:  { cls: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30', icon: <Clock3 className="h-3 w-3" />, label: 'Pending' },
    approved: { cls: 'bg-[#6EE7B7]/10 text-[#6EE7B7] border-[#6EE7B7]/30', icon: <Check   className="h-3 w-3" />, label: 'Approved' },
    rejected: { cls: 'bg-[#F87171]/10 text-[#F87171] border-[#F87171]/30', icon: <X       className="h-3 w-3" />, label: 'Rejected' },
  }
  const { cls, icon, label } = map[status]
  return (
    <Badge className={cn('border flex items-center gap-1 text-xs font-medium py-0.5', cls)}>
      {icon}{label}
    </Badge>
  )
}

// ─── Role Requests Panel ──────────────────────────────────────────────────────
function RoleRequestsPanel() {
  const { data, isLoading, isError, refetch } = useRoleRequestsQuery(1, 50)
  const approveMutation = useApproveRoleRequestMutation()
  const rejectMutation  = useRejectRoleRequestMutation()

  const [actionError, setActionError] = useState<Record<string, string>>({})

  function handleApprove(id: string) {
    setActionError((p) => ({ ...p, [id]: '' }))
    approveMutation.mutate(id, {
      onError: (err) => setActionError((p) => ({ ...p, [id]: extractApiMessage(err) })),
    })
  }

  function handleReject(id: string) {
    setActionError((p) => ({ ...p, [id]: '' }))
    rejectMutation.mutate({ id }, {
      onError: (err) => setActionError((p) => ({ ...p, [id]: extractApiMessage(err) })),
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#A78BFA]" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-[#F87171]">Failed to load role requests.</p>
        <Button onClick={() => refetch()} variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    )
  }

  const requests = data?.requests ?? []

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <Clock3 className="h-10 w-10 text-[#1E293B]" />
        <p className="text-[#94A3B8]">No pending role requests at this time.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
            <th className="p-4 font-semibold">User ID</th>
            <th className="p-4 font-semibold">Requested Role</th>
            <th className="p-4 font-semibold">Reason</th>
            <th className="p-4 font-semibold">Submitted</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]">
          {requests.map((req) => {
            const isPending  = req.status === 'pending'
            const isActing   = (approveMutation.isPending || rejectMutation.isPending) &&
              (approveMutation.variables === req.id || rejectMutation.variables?.id === req.id)

            return (
              <tr key={req.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <span className={`text-xs text-[#94A3B8] ${font.mono}`}>{req.userId.slice(0, 8)}…</span>
                </td>
                <td className="p-4">
                  <span className={cn(
                    'text-sm font-semibold capitalize',
                    req.requestedRole === 'verifier' ? 'text-[#00D4FF]' : 'text-[#A78BFA]',
                  )}>
                    {req.requestedRole}
                  </span>
                </td>
                <td className="p-4 max-w-xs">
                  <p className="text-sm text-[#94A3B8] truncate" title={req.reason ?? ''}>
                    {req.reason ?? <span className="italic opacity-50">No reason provided</span>}
                  </p>
                  {actionError[req.id] && (
                    <p className="text-xs text-[#F87171] mt-1">{actionError[req.id]}</p>
                  )}
                </td>
                <td className="p-4 text-[#94A3B8] text-sm whitespace-nowrap">
                  {new Date(req.createdAt).toLocaleDateString('en-PK', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </td>
                <td className="p-4">
                  <StatusBadge status={req.status} />
                </td>
                <td className="p-4 text-right">
                  {isPending && (
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(req.id)}
                        disabled={isActing}
                        className="bg-[#6EE7B7]/15 text-[#6EE7B7] hover:bg-[#6EE7B7]/25 border border-[#6EE7B7]/30 h-7 px-3 text-xs font-semibold"
                      >
                        {isActing && approveMutation.variables === req.id
                          ? <Loader2 className="h-3 w-3 animate-spin" />
                          : <><Check className="h-3.5 w-3.5 mr-1" />Approve</>
                        }
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReject(req.id)}
                        disabled={isActing}
                        className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border border-[#F87171]/30 h-7 px-3 text-xs font-semibold"
                      >
                        {isActing && rejectMutation.variables?.id === req.id
                          ? <Loader2 className="h-3 w-3 animate-spin" />
                          : <><X className="h-3.5 w-3.5 mr-1" />Reject</>
                        }
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Admin Users Page
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminUsersPage() {
  const updateStatusMutation = useUpdateUserStatusMutation()

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="User Directory & Roles"
          subtext="Manage all users on the FairGig network. Approve role escalations or issue account freezes."
        />

        <Tabs defaultValue="users">
          <TabsList className="bg-[#111827] border border-[#1E293B] h-auto p-1 gap-1">
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-[#00D4FF]/15 data-[state=active]:text-[#00D4FF] text-[#94A3B8] hover:text-white px-4 py-2"
            >
              All Users
            </TabsTrigger>
            <TabsTrigger
              value="role-requests"
              className="data-[state=active]:bg-[#A78BFA]/15 data-[state=active]:text-[#A78BFA] text-[#94A3B8] hover:text-white px-4 py-2"
            >
              Role Requests
            </TabsTrigger>
          </TabsList>

          {/* ── All Users Tab ── */}
          <TabsContent value="users" className="mt-4 focus-visible:ring-0">
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
              {/* Controls */}
              <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827]">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                  <Input
                    placeholder="Search by Worker ID or Name..."
                    className="pl-9 bg-[#1B1F2C] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                    <Shield className="h-4 w-4 mr-2" /> Role
                  </Button>
                  <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                    <Filter className="h-4 w-4 mr-2" /> Status
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                      <th className="p-4 font-semibold">User Info</th>
                      <th className="p-4 font-semibold">Current Role</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Verification Level</th>
                      <th className="p-4 font-semibold">Joined</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]">
                    {USERS_DATA.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#1E293B] flex items-center justify-center shrink-0">
                              <span className="text-xs text-[#00D4FF] font-bold">{user.name.charAt(0)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white font-medium">{user.name}</span>
                              <span className={`text-xs text-[#94A3B8] mt-0.5 ${font.mono}`}>{user.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            'text-sm font-medium',
                            user.role === 'Advocate' ? 'text-[#F59E0B]' :
                            user.role === 'Verifier' ? 'text-[#6EE7B7]' : 'text-white',
                          )}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          {user.status === 'Active'
                            ? <Badge className="bg-[#6EE7B7]/10 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 border-none">Active</Badge>
                            : <Badge className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border-none">Frozen</Badge>
                          }
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-sm">
                            {user.verification === 'Verified'        && <Shield className="h-4 w-4 text-[#00D4FF]" />}
                            {user.verification === 'System Verified' && <Shield className="h-4 w-4 text-[#F59E0B]" />}
                            {user.verification === 'Flagged'         && <AlertTriangle className="h-4 w-4 text-[#F87171]" />}
                            <span className={user.verification === 'Flagged' ? 'text-[#F87171]' : 'text-[#94A3B8]'}>
                              {user.verification}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-[#94A3B8] text-sm">{user.joined}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {updateStatusMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin text-[#94A3B8]" />
                            ) : user.status === 'Frozen' ? (
                              <Button variant="ghost" size="icon" className="text-[#6EE7B7] hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/10">
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" className="text-[#F87171] hover:text-[#F87171] hover:bg-[#F87171]/10">
                                <Lock className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-white hover:bg-white/5">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-sm text-[#94A3B8] bg-[#111827]">
                <span>Showing 1 to 5 of 28,450 users</span>
                <div className="flex gap-2">
                  <Button disabled variant="outline" size="sm" className="border-[#1E293B] text-white/50 bg-transparent">Previous</Button>
                  <Button variant="outline" size="sm" className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C]">Next</Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* ── Role Requests Tab ── */}
          <TabsContent value="role-requests" className="mt-4 focus-visible:ring-0">
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-[#1E293B] bg-[#111827] flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Pending Role Requests</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Workers requesting Verifier or Advocate status</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#94A3B8] hover:text-white hover:bg-white/5"
                  onClick={() => window.location.reload()}
                  title="Refresh"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <RoleRequestsPanel />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
