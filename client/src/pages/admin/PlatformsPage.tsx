import { useState } from 'react'
import { Plus, Search, Edit2, Power, Loader2, X, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'
import {
  useAdminPlatformsQuery,
  useAdminCreatePlatformMutation,
  useAdminUpdatePlatformMutation,
  extractApiMessage,
} from '@/features/shifts/api'
import type { Platform, CreatePlatformRequest } from '@/types/earnings'

// ─── Create/Edit Platform Dialog ──────────────────────────────────────────────
interface PlatformDialogProps {
  platform?: Platform
  onClose: () => void
}

function PlatformDialog({ platform, onClose }: PlatformDialogProps) {
  const [name,     setName]     = useState(platform?.name  ?? '')
  const [color,    setColor]    = useState(platform?.color ?? '#00D4FF')
  const [comRate,  setComRate]  = useState(String(platform?.officialCommissionRate ?? ''))
  const [flatFee,  setFlatFee]  = useState(String(platform?.officialFlatFee ?? ''))
  const [error,    setError]    = useState<string | null>(null)

  const createMutation = useAdminCreatePlatformMutation()
  const updateMutation = useAdminUpdatePlatformMutation()
  const isEditing      = !!platform

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const body: CreatePlatformRequest = {
      name,
      color,
      ...(comRate ? { officialCommissionRate: parseFloat(comRate) } : {}),
      ...(flatFee ? { officialFlatFee: parseFloat(flatFee) }        : {}),
    }
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: platform!.id, ...body })
      } else {
        await createMutation.mutateAsync(body)
      }
      onClose()
    } catch (err) { setError(extractApiMessage(err)) }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[#1B1F2C] border border-[#1E293B] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-white ${font.display}`}>
            {isEditing ? `Edit Platform: ${platform!.name}` : 'Add New Platform'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Platform Name *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required
              placeholder="e.g. Bykea"
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Brand Color *</Label>
            <div className="flex items-center gap-3">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer bg-transparent border-0" />
              <Input value={color} onChange={(e) => setColor(e.target.value)}
                placeholder="#00D4FF"
                className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50 flex-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[#94A3B8] text-sm">Commission Rate (%)</Label>
              <Input value={comRate} onChange={(e) => setComRate(e.target.value)} type="number" min="0" max="100" step="0.1"
                placeholder="e.g. 25"
                className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#94A3B8] text-sm">Flat Fee (PKR)</Label>
              <Input value={flatFee} onChange={(e) => setFlatFee(e.target.value)} type="number" min="0" step="1"
                placeholder="e.g. 15"
                className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
            </div>
          </div>
          {error && <p className="text-xs text-[#F87171]">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[#94A3B8] hover:text-white">
              <X className="h-4 w-4 mr-1" />Cancel
            </Button>
            <Button type="submit" disabled={isPending}
              className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (isEditing ? 'Save Changes' : 'Add Platform')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminPlatformsPage() {
  const [search,      setSearch]      = useState('')
  const [dialogOpen,  setDialogOpen]  = useState(false)
  const [editTarget,  setEditTarget]  = useState<Platform | undefined>()

  const { data, isLoading, isError, refetch } = useAdminPlatformsQuery()
  const updateMutation = useAdminUpdatePlatformMutation()

  const platforms = (data ?? []).filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleToggleActive = (p: Platform) => {
    updateMutation.mutate({ id: p.id, active: !(p.isActive ?? p.active) })
  }

  const openEdit = (p: Platform) => { setEditTarget(p); setDialogOpen(true) }
  const openCreate = () => { setEditTarget(undefined); setDialogOpen(true) }
  const closeDialog = () => { setDialogOpen(false); setEditTarget(undefined) }

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Platform Configurations"
          subtext="Manage active gig platforms in the system, set their expected commission rates, and define metadata."
          actions={
            <Button onClick={openCreate} className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Plus className="h-4 w-4 mr-2" />
              Add Platform
            </Button>
          }
        />

        {dialogOpen && <PlatformDialog platform={editTarget} onClose={closeDialog} />}

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
          {/* Controls */}
          <div className="p-4 border-b border-[#1E293B] flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input
                placeholder="Search platform name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
              />
            </div>
            {isError && (
              <Button variant="ghost" size="sm" onClick={() => refetch()} className="text-[#94A3B8] hover:text-white">
                <RefreshCw className="h-4 w-4 mr-1" />Retry
              </Button>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-20 gap-3 text-[#94A3B8]">
              <Loader2 className="h-6 w-6 animate-spin text-[#00D4FF]" />Loading platforms…
            </div>
          )}

          {/* Error */}
          {isError && !isLoading && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-[#F87171]">Failed to load platforms.</p>
            </div>
          )}

          {/* Table */}
          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                    <th className="p-4 font-semibold">Platform & ID</th>
                    <th className="p-4 font-semibold">Visual Identity</th>
                    <th className="p-4 font-semibold">Commission Rate</th>
                    <th className="p-4 font-semibold">Flat Fee (PKR)</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {platforms.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#94A3B8]">
                        {search ? 'No platforms match your search.' : 'No platforms configured yet.'}
                      </td>
                    </tr>
                  )}
                  {platforms.map((plat) => (
                    <tr key={plat.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">{plat.name}</span>
                          <span className={`text-xs text-[#94A3B8] mt-0.5 ${font.mono}`}>{plat.id.slice(0, 12)}…</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <PlatformChip platform={plat.name as any} />
                          <span className="text-xs font-mono text-[#94A3B8]">{plat.color}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-white font-bold">
                          {plat.officialCommissionRate != null ? `${plat.officialCommissionRate}%` : '—'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-[#94A3B8]">
                          {plat.officialFlatFee != null ? `Rs ${plat.officialFlatFee}` : 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        {(plat.isActive ?? plat.active)
                          ? <Badge className="bg-[#6EE7B7]/10 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 border-none font-medium">Active</Badge>
                          : <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20 border-none font-medium">Suspended</Badge>
                        }
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost" size="icon"
                            onClick={() => openEdit(plat)}
                            className="text-[#94A3B8] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost" size="icon"
                            onClick={() => handleToggleActive(plat)}
                            disabled={updateMutation.isPending && (updateMutation.variables as any)?.id === plat.id}
                            className={
                              (plat.isActive ?? plat.active)
                                ? 'text-[#94A3B8] hover:text-[#F59E0B] hover:bg-[#F59E0B]/10'
                                : 'text-[#94A3B8] hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/10'
                            }
                            title={(plat.isActive ?? plat.active) ? 'Suspend' : 'Activate'}
                          >
                            {updateMutation.isPending && (updateMutation.variables as any)?.id === plat.id
                              ? <Loader2 className="h-4 w-4 animate-spin" />
                              : <Power className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
