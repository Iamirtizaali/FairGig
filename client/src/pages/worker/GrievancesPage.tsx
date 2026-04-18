import {
  MessageSquare, AlertTriangle, CheckCircle, Clock, Plus, Search,
  MessageCircle, Loader2, X, ChevronLeft, ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { font } from '@/lib/fonts'
import {
  useComplaintsQuery,
  useBulletinBoardQuery,
  useCreateComplaintMutation,
  extractApiMessage,
} from '@/features/grievance/api'
import type { ComplaintStatus, ComplaintVisibility } from '@/types/grievance'

// Status badge helpers
function statusColor(status: ComplaintStatus) {
  switch (status) {
    case 'resolved':    return 'bg-[#6EE7B7]/20 text-[#6EE7B7] border-none hover:bg-[#6EE7B7]/20'
    case 'open':        return 'bg-[#00D4FF]/20 text-[#00D4FF] border-none hover:bg-[#00D4FF]/20'
    case 'under_review': return 'bg-[#F59E0B]/20 text-[#F59E0B] border-none hover:bg-[#F59E0B]/20'
    case 'escalated':   return 'bg-[#F87171]/20 text-[#F87171] border-none hover:bg-[#F87171]/20'
    case 'hidden':      return 'bg-[#94A3B8]/20 text-[#94A3B8] border-none hover:bg-[#94A3B8]/20'
  }
}

function statusIcon(status: ComplaintStatus) {
  switch (status) {
    case 'resolved':    return <CheckCircle className="h-5 w-5" />
    case 'escalated':   return <AlertTriangle className="h-5 w-5" />
    default:            return <Clock className="h-5 w-5" />
  }
}

function statusBg(status: ComplaintStatus) {
  switch (status) {
    case 'resolved':    return 'bg-[#6EE7B7]/10 text-[#6EE7B7]'
    case 'escalated':   return 'bg-[#F87171]/10 text-[#F87171]'
    default:            return 'bg-[#00D4FF]/10 text-[#00D4FF]'
  }
}

// ─── File Complaint Dialog ────────────────────────────────────────────────────
interface FileComplaintDialogProps { open: boolean; onClose: () => void }
function FileComplaintDialog({ open, onClose }: FileComplaintDialogProps) {
  const [platform, setPlatform]       = useState('')
  const [category, setCategory]       = useState('')
  const [title, setTitle]             = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility]   = useState<ComplaintVisibility>('public_anon')
  const [error, setError]             = useState<string | null>(null)

  const createMutation = useCreateComplaintMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await createMutation.mutateAsync({ platform, category, title, description, visibility })
      onClose()
      // Reset form
      setPlatform(''); setCategory(''); setTitle(''); setDescription('')
    } catch (err) {
      setError(extractApiMessage(err))
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[#1B1F2C] border border-[#1E293B] text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className={`text-white ${font.display}`}>File a Complaint</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[#94A3B8] text-sm">Platform</Label>
              <Input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g. Careem"
                required className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#94A3B8] text-sm">Category</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Unfair Deactivation"
                required className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary (3–200 chars)"
              required className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Description</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail (10–5000 chars)"
              required
              rows={4}
              className="w-full rounded-md bg-[#111827] border border-[#1E293B] text-white px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Visibility</Label>
            <Select value={visibility} onValueChange={(v) => setVisibility(v as ComplaintVisibility)}>
              <SelectTrigger className="bg-[#111827] border-[#1E293B] text-white focus:ring-[#00D4FF]/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
                <SelectItem value="public_anon">Public (anonymous)</SelectItem>
                <SelectItem value="internal">Internal (advocates/admins only)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-xs text-[#F87171] flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />{error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[#94A3B8] hover:text-white hover:bg-white/5">
              <X className="h-4 w-4 mr-1" />Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}
              className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              {createMutation.isPending
                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</>
                : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const BOARD_LIMIT = 10

export default function WorkerGrievancesPage() {
  const [activeTab, setActiveTab]         = useState('my-complaints')
  const [myPage, setMyPage]               = useState(1)
  const [boardPage, setBoardPage]         = useState(1)
  const [showFileDialog, setShowFileDialog] = useState(false)

  const { data: myComplaints, isLoading: myLoading } = useComplaintsQuery({ page: myPage, limit: 10 })
  const { data: boardData, isLoading: boardLoading }  = useBulletinBoardQuery(boardPage, BOARD_LIMIT)

  const complaints  = myComplaints?.complaints ?? []
  const myTotal     = myComplaints?.meta?.total ?? 0
  const myTotalPages = Math.max(1, Math.ceil(myTotal / 10))

  const boardItems  = boardData?.complaints ?? []
  const boardTotal  = boardData?.meta?.total ?? 0
  const boardTotalPages = Math.max(1, Math.ceil(boardTotal / BOARD_LIMIT))

  return (
    <div className="w-full h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        <PageHeader
          heading="Grievances & Community"
          subtext="Report unfair practices, track your disputes, and see what other workers are discussing."
          actions={
            <Button onClick={() => setShowFileDialog(true)} className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Plus className="h-4 w-4 mr-2" />
              File Complaint
            </Button>
          }
        />

        <FileComplaintDialog open={showFileDialog} onClose={() => setShowFileDialog(false)} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#1B1F2C] border border-[#1E293B] p-1 rounded-xl h-auto mb-6">
            <TabsTrigger value="my-complaints" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]">
              My Complaints {myTotal > 0 && <span className="ml-1.5 bg-[#0A0E1A]/20 text-xs px-1.5 py-0.5 rounded-full">{myTotal}</span>}
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]">
              Community Board
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* ── My Complaints ── */}
              {activeTab === 'my-complaints' && (
                <div className="space-y-4">
                  {myLoading && (
                    <div className="flex items-center justify-center py-16 gap-3 text-[#94A3B8]">
                      <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />
                      Loading complaints…
                    </div>
                  )}
                  {!myLoading && complaints.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-[#94A3B8]">
                      <MessageSquare className="h-10 w-10 opacity-20" />
                      <p>No complaints yet. File your first complaint above.</p>
                    </div>
                  )}
                  {!myLoading && complaints.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-[#1B1F2C] border border-[#1E293B] hover:border-[#313442] transition-colors rounded-xl p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full shrink-0 ${statusBg(item.status)}`}>
                          {statusIcon(item.status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold ${font.mono} text-[#94A3B8]`}>{item.id.slice(0, 8)}…</span>
                            <Badge variant="outline" className="text-xs border-[#1E293B] text-[#94A3B8] font-normal">{item.platform}</Badge>
                            <Badge variant="outline" className="text-xs border-[#1E293B] text-[#94A3B8] font-normal">{item.category}</Badge>
                          </div>
                          <h3 className="text-white font-medium mb-1">{item.title}</h3>
                          <p className="text-sm text-[#94A3B8]">{new Date(item.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 sm:flex-col sm:items-end">
                        <Badge className={statusColor(item.status)}>{item.status.replace('_', ' ')}</Badge>
                        <div className="flex items-center gap-1 text-sm text-[#94A3B8]">
                          <MessageSquare className="h-4 w-4" />
                          <span>{item.commentCount} replies</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* My complaints pagination */}
                  {!myLoading && myTotal > 10 && (
                    <div className="flex items-center justify-between text-sm text-[#94A3B8] pt-2">
                      <span>Page {myPage} of {myTotalPages}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled={myPage <= 1} onClick={() => setMyPage(p => p - 1)} className="text-[#94A3B8] disabled:opacity-40">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled={myPage >= myTotalPages} onClick={() => setMyPage(p => p + 1)} className="text-white hover:bg-white/5 disabled:opacity-40">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Community Board ── */}
              {activeTab === 'community' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                      <Input placeholder="Search community discussions…" className="pl-9 bg-[#111827] border-[#1E293B] text-white w-full focus-visible:ring-[#00D4FF]" />
                    </div>
                  </div>

                  {boardLoading && (
                    <div className="flex items-center justify-center py-16 gap-3 text-[#94A3B8]">
                      <Loader2 className="h-5 w-5 animate-spin text-[#00D4FF]" />
                      Loading community board…
                    </div>
                  )}
                  {!boardLoading && boardItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 gap-2 text-[#94A3B8]">
                      <p>No public complaints yet.</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {!boardLoading && boardItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-[#111827] border border-[#1E293B] hover:border-[#313442] transition-colors rounded-xl p-5 group cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="bg-[#1B1F2C] border-[#1E293B] text-[#94A3B8] font-normal">{item.platform}</Badge>
                            {item.tags.map((t) => (
                              <Badge key={t.id} variant="outline" className="bg-[#1B1F2C] border-[#1E293B] text-[#00D4FF] font-normal">{t.label}</Badge>
                            ))}
                          </div>
                          <span className="text-xs text-[#94A3B8] shrink-0 ml-2">
                            {new Date(item.createdAt).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>

                        <h3 className="text-lg font-medium text-white mb-4 group-hover:text-[#00D4FF] transition-colors">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-[#94A3B8] pt-4 border-t border-[#1E293B]">
                          <div className="flex items-center gap-1.5">
                            <MessageCircle className="h-4 w-4" />
                            <span>{item.commentCount} comments</span>
                          </div>
                          <Badge className={statusColor(item.status)}>{item.status.replace('_', ' ')}</Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Board pagination */}
                  {!boardLoading && boardTotal > BOARD_LIMIT && (
                    <div className="flex items-center justify-between text-sm text-[#94A3B8] pt-2">
                      <span>Page {boardPage} of {boardTotalPages}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled={boardPage <= 1} onClick={() => setBoardPage(p => p - 1)} className="text-[#94A3B8] disabled:opacity-40">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled={boardPage >= boardTotalPages} onClick={() => setBoardPage(p => p + 1)} className="text-white hover:bg-white/5 disabled:opacity-40">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}
