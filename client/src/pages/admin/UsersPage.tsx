import { useState } from 'react'
import {
  Search, Shield, Lock, UserCheck,
  AlertTriangle, Clock3, Check, X, Loader2, RefreshCw,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import {
  useAdminUsersQuery,
  useRoleRequestsQuery,
  useApproveRoleRequestMutation,
  useRejectRoleRequestMutation,
  useUpdateUserStatusMutation,
  extractApiMessage,
} from '@/features/auth/api'
import type { AuthUser, UserRole, UserStatus } from '@/types/auth'

const PAGE_SIZE = 20

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

// ─── All Users Panel ──────────────────────────────────────────────────────────
function AllUsersPanel() {
  const [search,     setSearch]     = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all')
  const [statFilter, setStatFilter] = useState<'all' | UserStatus>('all')
  const [page,       setPage]       = useState(1)

  const { data, isLoading, isError, refetch } = useAdminUsersQuery({
    page,
    limit:  PAGE_SIZE,
    role:   roleFilter === 'all' ? undefined : roleFilter,
    status: statFilter === 'all' ? undefined : statFilter,
    search: search.trim() || undefined,
  })
  const updateStatus = useUpdateUserStatusMutation()
  const [actionError, setActionError] = useState<Record<string, string>>({})

  function toggleFreeze(u: AuthUser) {
    const next: 'active' | 'frozen' = u.status === 'frozen' ? 'active' : 'frozen'
    setActionError((p) => ({ ...p, [u.id]: '' }))
    updateStatus.mutate({ id: u.id, status: next }, {
      onError: (err) => setActionError((p) => ({ ...p, [u.id]: extractApiMessage(err) })),
    })
  }

  const users = data?.users ?? []
  const total = data?.meta?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible"
      className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
      {/* Controls */}
      <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827]">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-9 bg-[#1B1F2C] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v as 'all' | UserRole); setPage(1) }}>
            <SelectTrigger className="w-36 bg-[#1B1F2C] border-[#1E293B] text-white h-9 text-sm">
              <Shield className="h-3.5 w-3.5 mr-1.5 text-[#94A3B8]" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="worker">Worker</SelectItem>
              <SelectItem value="verifier">Verifier</SelectItem>
              <SelectItem value="advocate">Advocate</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statFilter} onValueChange={(v) => { setStatFilter(v as 'all' | UserStatus); setPage(1) }}>
            <SelectTrigger className="w-36 bg-[#1B1F2C] border-[#1E293B] text-white h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="frozen">Frozen</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#00D4FF]" />
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-[#F87171]">Failed to load users.</p>
            <Button onClick={() => refetch()} variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
              <RefreshCw className="h-4 w-4 mr-2" /> Retry
            </Button>
          </div>
        )}
        {!isLoading && !isError && (
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                <th className="p-4 font-semibold">User Info</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Language</th>
                <th className="p-4 font-semibold">Joined</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-[#94A3B8]">
                    No users match the current filter.
                  </td>
                </tr>
              )}
              {users.map((user) => {
                const isActing = updateStatus.isPending && updateStatus.variables?.id === user.id
                return (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group align-top">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#111827] border border-[#1E293B] flex items-center justify-center shrink-0">
                          <span className="text-xs text-[#00D4FF] font-bold">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-medium">{user.name}</span>
                          <span className={`text-xs text-[#94A3B8] mt-0.5 ${font.mono}`}>{user.email}</span>
                          <span className={`text-[10px] text-[#5A6B8B] ${font.mono}`}>{user.id.slice(0, 8)}…</span>
                          {actionError[user.id] && (
                            <span className="text-[11px] text-[#F87171] mt-1">{actionError[user.id]}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        'text-sm font-medium capitalize',
                        user.role === 'admin'    ? 'text-[#A78BFA]' :
                        user.role === 'advocate' ? 'text-[#F59E0B]' :
                        user.role === 'verifier' ? 'text-[#6EE7B7]' : 'text-white',
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.status === 'active'  && <Badge className="bg-[#6EE7B7]/10 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 border-none">Active</Badge>}
                      {user.status === 'frozen'  && <Badge className="bg-[#F87171]/10 text-[#F87171] hover:bg-[#F87171]/20 border-none">Frozen</Badge>}
                      {user.status === 'deleted' && <Badge className="bg-[#5A6B8B]/10 text-[#94A3B8] hover:bg-[#5A6B8B]/20 border-none">Deleted</Badge>}
                    </td>
                    <td className="p-4 text-[#94A3B8] text-sm uppercase">{user.language}</td>
                    <td className="p-4 text-[#94A3B8] text-sm whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString('en-PK', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {user.status === 'deleted' ? (
                          <AlertTriangle className="h-4 w-4 text-[#5A6B8B]" />
                        ) : isActing ? (
                          <Loader2 className="h-4 w-4 animate-spin text-[#94A3B8]" />
                        ) : user.status === 'frozen' ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFreeze(user)}
                            className="text-[#6EE7B7] hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/10"
                            title="Reactivate user"
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFreeze(user)}
                            className="text-[#F87171] hover:text-[#F87171] hover:bg-[#F87171]/10"
                            title="Freeze user"
                          >
                            <Lock className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-sm text-[#94A3B8] bg-[#111827]">
        <span>
          {total === 0
            ? 'No users'
            : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} of ${total.toLocaleString()}`}
        </span>
        <div className="flex gap-2">
          <Button
            disabled={page <= 1 || isLoading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            variant="outline" size="sm"
            className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C] disabled:opacity-40"
          >
            Previous
          </Button>
          <Button
            disabled={page >= totalPages || isLoading}
            onClick={() => setPage((p) => p + 1)}
            variant="outline" size="sm"
            className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C] disabled:opacity-40"
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Admin Users Page
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminUsersPage() {
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

          <TabsContent value="users" className="mt-4 focus-visible:ring-0">
            <AllUsersPanel />
          </TabsContent>

          <TabsContent value="role-requests" className="mt-4 focus-visible:ring-0">
            <motion.div variants={fadeUp} initial="hidden" animate="visible"
              className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-[#1E293B] bg-[#111827] flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Pending Role Requests</h3>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Workers requesting Verifier or Advocate status</p>
                </div>
              </div>
              <RoleRequestsPanel />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
