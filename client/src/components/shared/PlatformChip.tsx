import { cn } from '@/lib/utils'

// ─── Platform metadata ────────────────────────────────────────────────────────
export const PLATFORM_META: Record<string, { label: string; color: string; bg: string }> = {
  careem:    { label: 'Careem',     color: '#22C55E', bg: '#22C55E1A' },
  uber:      { label: 'Uber',       color: '#FFFFFF', bg: '#FFFFFF1A' },
  bykea:     { label: 'Bykea',      color: '#F97316', bg: '#F973161A' },
  foodpanda: { label: 'Foodpanda',  color: '#EF4444', bg: '#EF44441A' },
  indrive:   { label: 'inDrive',    color: '#3B82F6', bg: '#3B82F61A' },
  other:     { label: 'Other',      color: '#94A3B8', bg: '#94A3B81A' },
}

// ─── Component ────────────────────────────────────────────────────────────────
interface PlatformChipProps {
  platform: string
  className?: string
  size?: 'sm' | 'md'
}

export function PlatformChip({ platform, className, size = 'md' }: PlatformChipProps) {
  const key = platform.toLowerCase().replace(/\s+/g, '')
  const meta = PLATFORM_META[key] ?? PLATFORM_META.other

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        className,
      )}
      style={{ background: meta.bg, color: meta.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: meta.color }}
      />
      {meta.label}
    </span>
  )
}
