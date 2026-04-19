import { ShieldCheck, Clock, AlertTriangle, HelpCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Status type ──────────────────────────────────────────────────────────────
export type VerificationStatus =
  | 'VERIFIED'
  | 'SELF_ATTESTED'
  | 'DISCREPANCY_FLAGGED'
  | 'UNVERIFIABLE'
  | 'PENDING'

// ─── Config map ───────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  VerificationStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  VERIFIED: {
    label: 'Verified',
    icon: <ShieldCheck className="h-3 w-3" />,
    className: 'bg-[#6EE7B7]/10 text-[#6EE7B7] border-[#6EE7B7]/20',
  },
  SELF_ATTESTED: {
    label: 'Self-Attested',
    icon: <Clock className="h-3 w-3" />,
    className: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  },
  DISCREPANCY_FLAGGED: {
    label: 'Flagged',
    icon: <AlertTriangle className="h-3 w-3" />,
    className: 'bg-[#F87171]/10 text-[#F87171] border-[#F87171]/20',
  },
  UNVERIFIABLE: {
    label: 'Unverifiable',
    icon: <HelpCircle className="h-3 w-3" />,
    className: 'bg-[#94A3B8]/10 text-[#94A3B8] border-[#94A3B8]/20',
  },
  PENDING: {
    label: 'Pending',
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
    className: 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
interface StatusBadgeProps {
  status: VerificationStatus
  className?: string
  showIcon?: boolean
}

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full',
        'text-xs font-medium border',
        config.className,
        className,
      )}
    >
      {showIcon && config.icon}
      {config.label}
    </span>
  )
}
