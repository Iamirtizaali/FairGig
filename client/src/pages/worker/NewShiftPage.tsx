import {
  ArrowLeft, Upload, Image as ImageIcon, Loader2, AlertTriangle, CheckCircle2, X
} from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fadeUp, scaleIn } from '@/lib/motion'
import { font } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import {
  usePlatformsQuery,
  useCityZonesQuery,
  useCreateShiftMutation,
  usePresignUploadMutation,
  useConfirmScreenshotMutation,
  extractApiMessage,
} from '@/features/shifts/api'
import axios from 'axios'

// ─── A thin platform card ─────────────────────────────────────────────────────
interface PlatformCardProps { id: string; name: string; selected: boolean; onSelect: () => void }
function PlatformCard({ id, name, selected, onSelect }: PlatformCardProps) {
  return (
    <motion.button
      key={id}
      onClick={onSelect}
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      className={cn(
        'flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200',
        selected
          ? 'border-[#00D4FF] bg-[#00D4FF]/10'
          : 'border-[#1E293B] bg-[#111827] hover:border-[#313442]',
      )}
    >
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0',
        selected ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 'bg-[#1E293B] text-[#94A3B8]',
      )}>
        {name[0]}
      </div>
      <span className={cn('text-sm font-medium', selected ? 'text-white' : 'text-[#94A3B8]')}>{name}</span>
    </motion.button>
  )
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
type AllowedType = typeof ALLOWED_TYPES[number]

export default function WorkerNewShiftPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('')
  const [cityZoneId, setCityZoneId]   = useState<string>('')
  const [shiftDate, setShiftDate]     = useState('')
  const [hoursWorked, setHoursWorked] = useState('')
  const [grossPay, setGrossPay]       = useState('')
  const [deductions, setDeductions]   = useState('')
  const [notes, setNotes]             = useState('')

  // Screenshot state
  const [file, setFile]           = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Error / success
  const [formError, setFormError]   = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Queries
  const { data: platforms, isLoading: platformsLoading } = usePlatformsQuery()
  const { data: zones, isLoading: zonesLoading }         = useCityZonesQuery()

  // Mutations
  const createShift      = useCreateShiftMutation()
  const presign          = usePresignUploadMutation()
  const confirmScreenshot = useConfirmScreenshotMutation()

  // Computed net pay
  const computedNetPay = grossPay && deductions
    ? Math.max(0, parseFloat(grossPay) - parseFloat(deductions))
    : grossPay
      ? parseFloat(grossPay)
      : 0

  const handleFileChange = useCallback((selectedFile: File | null) => {
    setUploadError(null)
    if (!selectedFile) { setFile(null); setFilePreview(null); return }
    if (!ALLOWED_TYPES.includes(selectedFile.type as AllowedType)) {
      setUploadError('Only JPEG, PNG, and WebP files are accepted.')
      return
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadError('File must be under 5 MB.')
      return
    }
    setFile(selectedFile)
    setFilePreview(URL.createObjectURL(selectedFile))
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFileChange(e.dataTransfer.files[0] ?? null)
  }, [handleFileChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!selectedPlatformId) { setFormError('Please select a platform.'); return }
    if (!shiftDate)          { setFormError('Please enter the shift date.'); return }
    if (!hoursWorked || parseFloat(hoursWorked) <= 0) { setFormError('Please enter valid hours worked.'); return }
    if (!grossPay || parseFloat(grossPay) <= 0)       { setFormError('Please enter a valid gross pay amount.'); return }

    const gross = parseFloat(grossPay)
    const ded   = deductions ? parseFloat(deductions) : 0
    const net   = parseFloat((gross - ded).toFixed(2))

    setIsSubmitting(true)
    try {
      // 1) Create shift
      const { shift } = await createShift.mutateAsync({
        platformId: selectedPlatformId,
        cityZoneId: cityZoneId || undefined,
        shiftDate,
        hoursWorked: parseFloat(hoursWorked),
        grossPay: gross,
        deductions: ded,
        netPay: net,
        notes: notes || undefined,
      })

      // 2) Optional screenshot upload (presign → PUT → confirm)
      if (file) {
        const { signedUrl, storageKey } = await presign.mutateAsync({
          shiftId: shift.id,
          mimeType: file.type as AllowedType,
          sizeBytes: file.size,
        })
        await axios.put(signedUrl, file, { headers: { 'Content-Type': file.type } })
        await confirmScreenshot.mutateAsync({
          shiftId: shift.id,
          storageKey,
          sizeBytes: file.size,
          mimeType: file.type as AllowedType,
        })
      }

      navigate('/worker/shifts')
    } catch (err) {
      setFormError(extractApiMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full h-full">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="text-[#94A3B8] hover:text-white hover:bg-white/5 mb-4 -ml-4" asChild>
          <Link to="/worker/shifts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shifts
          </Link>
        </Button>

        <PageHeader
          heading="Log New Shift"
          subtext="Record your gig earnings and upload a screenshot to submit for verification."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] p-6 lg:p-8"
        >
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* ── Platform Selection ── */}
            <div>
              <Label className="text-sm font-semibold text-white mb-4 block">Select Platform</Label>
              {platformsLoading ? (
                <div className="flex items-center gap-2 text-[#94A3B8]">
                  <Loader2 className="h-4 w-4 animate-spin text-[#00D4FF]" />
                  <span className="text-sm">Loading platforms…</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(platforms ?? []).map((p) => (
                    <PlatformCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      selected={selectedPlatformId === p.id}
                      onSelect={() => setSelectedPlatformId(p.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── Income + Date ── */}
            <div>
              <Label className="text-sm font-semibold text-white mb-4 block">Shift Details</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Shift Date</Label>
                  <Input
                    id="shiftDate"
                    type="date"
                    value={shiftDate}
                    onChange={(e) => setShiftDate(e.target.value)}
                    required
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Duration (Hours)</Label>
                  <Input
                    id="hoursWorked"
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    placeholder="e.g. 6.5"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(e.target.value)}
                    required
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Gross Earnings (PKR)</Label>
                  <Input
                    id="grossPay"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 3500"
                    value={grossPay}
                    onChange={(e) => setGrossPay(e.target.value)}
                    required
                    className={`bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50 ${font.mono}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#94A3B8]">Platform Deductions (PKR)</Label>
                  <Input
                    id="deductions"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g. 500"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    className={`bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50 ${font.mono}`}
                  />
                </div>

                {/* Net pay display */}
                <div className="sm:col-span-2 bg-[#111827] rounded-xl border border-[#1E293B] p-4 flex items-center justify-between">
                  <span className="text-[#94A3B8] text-sm">Calculated Net Pay</span>
                  <span className={`text-xl font-bold text-[#00D4FF] ${font.mono}`}>
                    Rs {computedNetPay.toLocaleString()}
                  </span>
                </div>

                {/* City Zone */}
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-[#94A3B8]">City / Zone <span className="text-xs opacity-60">(optional)</span></Label>
                  <Select value={cityZoneId} onValueChange={setCityZoneId}>
                    <SelectTrigger className="bg-[#111827] border-[#1E293B] text-white focus:ring-[#00D4FF]/50">
                      <SelectValue placeholder={zonesLoading ? 'Loading…' : 'Select city zone'} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1B1F2C] border-[#1E293B] text-white">
                      {(zones ?? []).map((z) => (
                        <SelectItem key={z.id} value={z.id}>{z.city} – {z.zone}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-[#94A3B8]">Notes <span className="text-xs opacity-60">(optional)</span></Label>
                  <Input
                    placeholder="Any additional context about this shift"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50"
                  />
                </div>
              </div>
            </div>

            {/* ── Screenshot Upload ── */}
            <div>
              <Label className="text-sm font-semibold text-white mb-4 block">
                Proof of Earnings <span className="text-xs font-normal text-[#94A3B8]">(optional, but required for verification)</span>
              </Label>

              {filePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-[#1E293B] group">
                  <img src={filePreview} alt="Screenshot preview" className="w-full max-h-64 object-contain bg-[#111827]" />
                  <button
                    type="button"
                    onClick={() => { setFile(null); setFilePreview(null) }}
                    className="absolute top-3 right-3 bg-black/70 text-white p-1.5 rounded-full hover:bg-black transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/70 text-[#6EE7B7] text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {file?.name}
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-[#313442] hover:border-[#00D4FF]/50 bg-[#111827] rounded-xl p-8 transition-colors text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#1B1F2C] group-hover:bg-[#00D4FF]/10 flex items-center justify-center mx-auto mb-4 transition-colors">
                    <ImageIcon className="h-6 w-6 text-[#94A3B8] group-hover:text-[#00D4FF] transition-colors" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Click or drag a screenshot</h4>
                  <p className="text-xs text-[#94A3B8]">PNG, JPG, or WebP · Max 5 MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />

              {uploadError && (
                <p className="mt-2 text-xs text-[#F87171] flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {uploadError}
                </p>
              )}
            </div>

            {/* ── Form Error ── */}
            {formError && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F87171]/10 border border-[#F87171]/20 text-[#F87171]">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-sm">{formError}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t border-[#1E293B]">
              <Button type="button" variant="ghost" className="text-[#94A3B8] hover:text-white hover:bg-white/5" asChild>
                <Link to="/worker/shifts">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold px-8"
              >
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</>
                ) : (
                  <><Upload className="h-4 w-4 mr-2" />Submit for Verification</>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
