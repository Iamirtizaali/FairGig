import {
  Filter, Search, ArrowRight, Flag, Shield, Loader2, AlertTriangle,
  CheckCircle, Clock, ChevronLeft, ChevronRight, Plus, X
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'
import {
  useComplaintsQuery,
  useClustersQuery,
  useUpdateComplaintStatusMutation,
  useAttachToClusterMutation,
  useCreateClusterMutation,
  extractApiMessage,
} from '@/features/grievance/api'
import { useAdvocateTopComplaintsQuery } from '@/features/analytics/api'
import type { ComplaintStatus } from '@/types/grievance'

// Badge colours per status
function statusColors(s: ComplaintStatus) {
  switch (s) {
    case 'resolved':     return 'bg-[#6EE7B7]/20 text-[#6EE7B7] border-none'
    case 'open':         return 'bg-[#00D4FF]/20 text-[#00D4FF] border-none'
    case 'under_review': return 'bg-[#F59E0B]/20 text-[#F59E0B] border-none'
    case 'escalated':    return 'bg-[#F87171]/20 text-[#F87171] border-none'
    case 'hidden':       return 'bg-[#94A3B8]/20 text-[#94A3B8] border-none'
  }
}

// Create Cluster Dialog
function CreateClusterDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle]       = useState('')
  const [description, setDesc]  = useState('')
  const [error, setError]       = useState<string | null>(null)
  const createMutation           = useCreateClusterMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await createMutation.mutateAsync({ title, description: description || undefined })
      onClose(); setTitle(''); setDesc('')
    } catch (err) { setError(extractApiMessage(err)) }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[#1B1F2C] border border-[#1E293B] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-white ${font.display}`}>Create Dispute Cluster</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required
              placeholder="e.g. Unpaid waiting time — foodpanda"
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Description <span className="text-xs">(optional)</span></Label>
            <textarea value={description} onChange={(e) => setDesc(e.target.value)} rows={3}
              placeholder="Pattern description…"
              className="w-full rounded-md bg-[#111827] border border-[#1E293B] text-white px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50" />
          </div>
          {error && <p className="text-xs text-[#F87171]">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[#94A3B8] hover:text-white">
              <X className="h-4 w-4 mr-1" />Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}
              className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Cluster'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function AdvocateComplaintsPage() {
  const [page, setPage]                     = useState(1)
  const [search, setSearch]                 = useState('')
  const [statusFilter, setStatusFilter]     = useState<'all' | ComplaintStatus>('all')
  const [showClusterDialog, setShowCluster] = useState(false)
  const [attachingId, setAttachingId]       = useState<string | null>(null)

  const params = {
    page,
    limit: 10,
    ...(statusFilter !== 'all' ? { status: statusFilter as ComplaintStatus } : {}),
  }

  const { data, isLoading } = useComplaintsQuery(params)
  const { data: clustersData } = useClustersQuery({ limit: 20 })
  const { data: topCats, isLoading: catsLoading } = useAdvocateTopComplaintsQuery('30d')

  const complaints     = data?.complaints ?? []
  const total          = data?.meta?.total ?? 0
  const totalPages     = Math.max(1, Math.ceil(total / 10))
  const clusters       = clustersData?.clusters ?? []

  const statusMutation = useUpdateComplaintStatusMutation()
  const attachMutation = useAttachToClusterMutation()

  const handleAttach = async (complaintId: string, clusterId: string) => {
    setAttachingId(complaintId)
    try {
      await attachMutation.mutateAsync({ clusterId, complaintIds: [complaintId] })
    } finally {
      setAttachingId(null)
    }
  }

  const handleStatusChange = (id: string, status: ComplaintStatus) => {
    statusMutation.mutate({ id, status })
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Systemic Grievances"
          subtext="Identify clusters of matching worker complaints to build strong collective dispute cases."
          actions={
            <Button onClick={() => setShowCluster(true)} className="bg-[#F87171] text-white hover:bg-[#F87171]/90 font-bold border-none">
              <Flag className="h-4 w-4 mr-2" />
              New Dispute Cluster
            </Button>
          }
        />

        <CreateClusterDialog open={showClusterDialog} onClose={() => setShowCluster(false)} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── Sidebar ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-1 space-y-8">
            
            {/* Top Complaint Categories */}
            <div className="space-y-4">
              <h3 className={`text-sm font-semibold text-white uppercase tracking-wider ${font.display}`}>Top Issues (30d)</h3>
              {catsLoading ? (
                <div className="text-xs text-[#94A3B8]">Loading top categories…</div>
              ) : topCats?.top_categories?.length === 0 ? (
                <div className="text-xs text-[#94A3B8]">No categorized complaints recently.</div>
              ) : (
                <div className="space-y-2">
                  {topCats?.top_categories.map((tc, idx) => (
                    <div key={idx} className="bg-[#1B1F2C] border border-[#1E293B] rounded-xl p-3 flex items-center justify-between">
                      <span className="text-sm text-white font-medium">{tc.category}</span>
                      <div className="text-right">
                        <div className="text-[#00D4FF] font-bold text-sm leading-none">{tc.count}</div>
                        <div className="text-[10px] text-[#94A3B8]">{Math.round(tc.percentage)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Clusters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-semibold text-white uppercase tracking-wider ${font.display}`}>Clusters</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCluster(true)} className="text-[#00D4FF] hover:bg-[#00D4FF]/10 h-7 w-7">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {clusters.length === 0 && (
                <p className="text-xs text-[#94A3B8]">No clusters yet. Create one to group complaints.</p>
              )}
              {clusters.map((cluster) => (
                <div key={cluster.id} className="bg-[#1B1F2C] border border-[#1E293B] rounded-xl p-4 cursor-pointer hover:border-[#313442] transition-colors relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#00D4FF]`} />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#00D4FF] font-bold text-lg leading-none">{cluster.complaintCount ?? '—'}</span>
                    <Badge variant="outline" className="bg-[#111827] border-[#1E293B] text-[#94A3B8] font-normal text-xs">cluster</Badge>
                  </div>
                  <p className="text-sm text-white font-medium group-hover:text-[#00D4FF] transition-colors line-clamp-2">{cluster.title}</p>
                </div>
              ))}
            </div>
            </div>
          </motion.div>

          {/* ── Main Feed ── */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 bg-[#1B1F2C] border border-[#1E293B] p-2 rounded-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                <Input
                  placeholder="Search grievances…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-transparent border-none text-white focus-visible:ring-0 shadow-none"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as any); setPage(1) }}>
                <SelectTrigger className="bg-[#111827] border-[#1E293B] text-white w-40 focus:ring-[#00D4FF]/50">
                  <Filter className="h-3.5 w-3.5 mr-2 text-[#94A3B8]" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-16 gap-3 text-[#94A3B8]">
                <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />Loading complaints…
              </div>
            )}

            {!isLoading && complaints.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-2 text-[#94A3B8]">
                <AlertTriangle className="h-8 w-8 opacity-20" />
                <p>No complaints match the current filter.</p>
              </div>
            )}

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
              {complaints.map((c) => (
                <motion.div key={c.id} variants={fadeUp} className="bg-[#111827] border border-[#1E293B] hover:border-[#313442] transition-colors rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1B1F2C] flex items-center justify-center shrink-0 border border-[#1E293B]">
                        <span className={`text-sm text-[#94A3B8] font-bold ${font.mono}`}>A</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-white font-medium ${font.mono} text-sm`}>{c.id.slice(0, 12)}…</span>
                          <span className="text-xs text-[#94A3B8]">
                            {new Date(c.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <PlatformChip platform={c.platform} className="scale-90 origin-left" />
                          <Badge variant="outline" className="text-xs border-[#1E293B] text-[#94A3B8]">{c.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className={statusColors(c.status)}>{c.status.replace('_', ' ')}</Badge>
                  </div>

                  <h3 className="text-base text-white font-medium mb-2">{c.title}</h3>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#1E293B] flex-wrap">
                    {/* Quick status controls */}
                    {c.status !== 'escalated' && (
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(c.id, 'escalated')}
                        disabled={statusMutation.isPending}
                        className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10 text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />Escalate
                      </Button>
                    )}
                    {c.status !== 'resolved' && (
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(c.id, 'resolved')}
                        disabled={statusMutation.isPending}
                        className="border-[#6EE7B7]/30 text-[#6EE7B7] hover:bg-[#6EE7B7]/10 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />Resolve
                      </Button>
                    )}
                    {c.status !== 'under_review' && c.status !== 'resolved' && (
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(c.id, 'under_review')}
                        disabled={statusMutation.isPending}
                        className="border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/10 text-xs">
                        <Clock className="h-3 w-3 mr-1" />Mark Review
                      </Button>
                    )}

                    {/* Attach to cluster */}
                    {clusters.length > 0 && (
                      <Select
                        onValueChange={(clusterId) => handleAttach(c.id, clusterId)}
                        value=""
                      >
                        <SelectTrigger className="w-auto h-8 text-xs bg-transparent border-dashed border-[#1E293B] text-white hover:bg-white/5 focus:ring-[#00D4FF]/50">
                          <Shield className="h-3 w-3 mr-1.5 text-[#00D4FF]" />
                          {attachingId === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Add to Cluster'}
                        </SelectTrigger>
                        <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
                          {clusters.map((cl) => (
                            <SelectItem key={cl.id} value={cl.id}>{cl.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    <Button variant="ghost" size="sm" className="text-[#00D4FF] hover:text-white hover:bg-white/5 ml-auto text-xs">
                      View Details <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {!isLoading && total > 10 && (
              <div className="flex items-center justify-between text-sm text-[#94A3B8] pt-2">
                <span>Page {page} of {totalPages} ({total} total)</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="disabled:opacity-40">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="text-white disabled:opacity-40">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
