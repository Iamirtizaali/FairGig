import { useState } from 'react'
import { Plus, Search, Edit2, Power, Loader2, X, RefreshCw, MapPin, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { fadeUp } from '@/lib/motion'
import {
  useAdminCityZonesQuery,
  useAdminCreateCityZoneMutation,
  useAdminUpdateCityZoneMutation,
  extractApiMessage,
} from '@/features/shifts/api'
import type { CityZone, CreateCityZoneRequest } from '@/types/earnings'
import { font } from '@/lib/fonts'

// ─── Risk level derived from baselineHourlyRate ───────────────────────────────
const MIN_WAGE = 250
function zoneRisk(z: CityZone): 'Critical' | 'High' | 'Medium' | 'Low' {
  const rate = z.baselineHourlyRate ?? 0
  if (rate === 0)         return 'Critical'
  if (rate < MIN_WAGE)    return 'Critical'
  if (rate < MIN_WAGE * 1.4) return 'High'
  if (rate < MIN_WAGE * 2)   return 'Medium'
  return 'Low'
}

// ─── Create/Edit Zone Dialog ──────────────────────────────────────────────────
interface ZoneDialogProps {
  zone?: CityZone
  onClose: () => void
}

function ZoneDialog({ zone, onClose }: ZoneDialogProps) {
  const [zoneName,  setZoneName]  = useState(zone?.zone    ?? '')
  const [city,      setCity]      = useState(zone?.city     ?? '')
  const [country,   setCountry]   = useState(zone?.country  ?? 'Pakistan')
  const [baseRate,  setBaseRate]  = useState(String(zone?.baselineHourlyRate ?? ''))
  const [error,     setError]     = useState<string | null>(null)

  const createMutation = useAdminCreateCityZoneMutation()
  const updateMutation = useAdminUpdateCityZoneMutation()
  const isEditing      = !!zone
  const isPending      = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const body: CreateCityZoneRequest = {
      zone: zoneName,
      city,
      country,
      ...(baseRate ? { baselineHourlyRate: parseFloat(baseRate) } : {}),
    }
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: zone!.id, ...body })
      } else {
        await createMutation.mutateAsync(body)
      }
      onClose()
    } catch (err) { setError(extractApiMessage(err)) }
  }

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[#1B1F2C] border border-[#1E293B] text-white max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-white ${font.display}`}>
            {isEditing ? `Edit Zone: ${zone!.zone}` : 'Define New Zone'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Zone Name *</Label>
            <Input value={zoneName} onChange={(e) => setZoneName(e.target.value)} required
              placeholder="e.g. Korangi Industrial"
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[#94A3B8] text-sm">City *</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} required
                placeholder="e.g. Karachi"
                className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#94A3B8] text-sm">Country *</Label>
              <Input value={country} onChange={(e) => setCountry(e.target.value)} required
                className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[#94A3B8] text-sm">Baseline Hourly Rate (PKR)</Label>
            <Input value={baseRate} onChange={(e) => setBaseRate(e.target.value)} type="number" min="0" step="1"
              placeholder="e.g. 300"
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50" />
          </div>
          {error && <p className="text-xs text-[#F87171]">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[#94A3B8] hover:text-white">
              <X className="h-4 w-4 mr-1" />Cancel
            </Button>
            <Button type="submit" disabled={isPending}
              className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (isEditing ? 'Save Changes' : 'Create Zone')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminZonesPage() {
  const [search,      setSearch]      = useState('')
  const [dialogOpen,  setDialogOpen]  = useState(false)
  const [editTarget,  setEditTarget]  = useState<CityZone | undefined>()

  const { data, isLoading, isError, refetch } = useAdminCityZonesQuery()
  const updateMutation = useAdminUpdateCityZoneMutation()

  const zones = (data ?? []).filter((z) =>
    z.zone.toLowerCase().includes(search.toLowerCase()) ||
    z.city.toLowerCase().includes(search.toLowerCase())
  )

  const handleToggleActive = (z: CityZone) => {
    updateMutation.mutate({ id: z.id, active: !(z.isActive ?? z.active) })
  }

  const openEdit   = (z: CityZone) => { setEditTarget(z); setDialogOpen(true) }
  const openCreate = () => { setEditTarget(undefined); setDialogOpen(true) }
  const closeDialog = () => { setDialogOpen(false); setEditTarget(undefined) }

  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Geographic Zones"
          subtext="Manage operational zones, set localized baseline earning thresholds, and update polygon bounding coordinates."
          actions={
            <Button onClick={openCreate} className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Plus className="h-4 w-4 mr-2" />
              Define New Zone
            </Button>
          }
        />

        {dialogOpen && <ZoneDialog zone={editTarget} onClose={closeDialog} />}

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col">
          {/* Controls */}
          <div className="p-4 border-b border-[#1E293B] flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input
                placeholder="Search zone name or city…"
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

          {isLoading && (
            <div className="flex items-center justify-center py-20 gap-3 text-[#94A3B8]">
              <Loader2 className="h-6 w-6 animate-spin text-[#00D4FF]" />Loading city zones…
            </div>
          )}

          {isError && !isLoading && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="text-[#F87171]">Failed to load city zones.</p>
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                    <th className="p-4 font-semibold">Zone Identifier</th>
                    <th className="p-4 font-semibold">City / Country</th>
                    <th className="p-4 font-semibold">Baseline Rate (PKR/hr)</th>
                    <th className="p-4 font-semibold">Risk State</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {zones.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#94A3B8]">
                        {search ? 'No zones match your search.' : 'No city zones defined yet.'}
                      </td>
                    </tr>
                  )}
                  {zones.map((zone) => {
                    const risk = zoneRisk(zone)
                    return (
                      <tr key={zone.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#111827] border border-[#1E293B] p-2 rounded-lg text-[#00D4FF]">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white font-medium">{zone.zone}</span>
                              <span className="text-xs text-[#94A3B8] mt-0.5 font-mono">{zone.id.slice(0, 12)}…</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-[#94A3B8]">
                          <span className="text-white">{zone.city}</span>, {zone.country}
                        </td>
                        <td className="p-4 text-white font-medium">
                          {zone.baselineHourlyRate != null ? `Rs ${zone.baselineHourlyRate}` : '—'}
                        </td>
                        <td className="p-4">
                          {risk === 'Critical' && <Badge className="bg-[#F87171]/20 text-[#F87171] border-none"><AlertCircle className="w-3 h-3 mr-1" />Critical</Badge>}
                          {risk === 'High'     && <Badge className="bg-[#F59E0B]/20 text-[#F59E0B] border-none">High</Badge>}
                          {risk === 'Medium'   && <Badge className="bg-[#00D4FF]/20 text-[#00D4FF] border-none">Medium</Badge>}
                          {risk === 'Low'      && <Badge className="bg-[#6EE7B7]/20 text-[#6EE7B7] border-none">Low</Badge>}
                        </td>
                        <td className="p-4">
                          {(zone.isActive ?? zone.active)
                            ? <span className="text-sm text-[#6EE7B7]">Active</span>
                            : <span className="text-sm text-[#F87171]">Suspended</span>
                          }
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost" size="icon"
                              onClick={() => openEdit(zone)}
                              className="text-[#94A3B8] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost" size="icon"
                              onClick={() => handleToggleActive(zone)}
                              disabled={updateMutation.isPending && (updateMutation.variables as any)?.id === zone.id}
                              className={
                                (zone.isActive ?? zone.active)
                                  ? 'text-[#94A3B8] hover:text-[#F59E0B] hover:bg-[#F59E0B]/10'
                                  : 'text-[#94A3B8] hover:text-[#6EE7B7] hover:bg-[#6EE7B7]/10'
                              }
                              title={(zone.isActive ?? zone.active) ? 'Suspend' : 'Activate'}
                            >
                              {updateMutation.isPending && (updateMutation.variables as any)?.id === zone.id
                                ? <Loader2 className="h-4 w-4 animate-spin" />
                                : <Power className="h-4 w-4" />
                              }
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
