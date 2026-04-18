import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Loader2 } from 'lucide-react'

interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'default'
  onConfirm: () => Promise<void> | void
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    setLoading(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1B1F2C] border-[#1E293B] max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            {variant === 'danger' && (
              <div className="w-9 h-9 rounded-xl bg-[#F87171]/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-[#F87171]" />
              </div>
            )}
            <DialogTitle className="text-white">{title}</DialogTitle>
          </div>
          {description && (
            <DialogDescription className="text-[#94A3B8] leading-relaxed">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="gap-2 mt-2">
          <Button
            variant="ghost"
            className="text-[#94A3B8] hover:text-white hover:bg-white/5"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className={
              variant === 'danger'
                ? 'bg-[#F87171] text-white hover:bg-[#F87171]/90'
                : 'bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90'
            }
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
