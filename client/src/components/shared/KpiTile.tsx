import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import { useCountUp } from '@/hooks/useScrollAnimation'
import { scaleIn } from '@/lib/motion'

interface KpiTileProps {
  icon: ReactNode
  label: string
  value: number
  prefix?: string
  suffix?: string
  /** Positive = up, Negative = down, 0 = neutral */
  trend?: number
  trendLabel?: string
  accentColor?: string
  className?: string
}

export function KpiTile({
  icon,
  label,
  value,
  prefix = '',
  suffix = '',
  trend,
  trendLabel,
  accentColor = '#00D4FF',
  className,
}: KpiTileProps) {
  const countRef = useCountUp(value, prefix, suffix)

  const trendColor =
    trend === undefined ? '#94A3B8'
    : trend > 0 ? '#6EE7B7'
    : trend < 0 ? '#F87171'
    : '#F59E0B'

  const TrendIcon =
    trend === undefined ? null
    : trend > 0 ? TrendingUp
    : trend < 0 ? TrendingDown
    : Minus

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, boxShadow: `0 8px 32px ${accentColor}18` }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative rounded-2xl p-5 bg-[#1B1F2C] overflow-hidden cursor-default',
        className,
      )}
    >
      {/* Subtle accent glow top-right */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-xl"
        style={{ background: accentColor }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${accentColor}18`, color: accentColor }}
      >
        {icon}
      </div>

      {/* Label */}
      <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-widest mb-1">
        {label}
      </p>

      {/* Value */}
      <span
        ref={countRef}
        className={`text-2xl font-bold text-white tabular-nums ${font.mono}`}
      >
        {prefix}0{suffix}
      </span>

      {/* Trend */}
      {TrendIcon && trendLabel && (
        <div className="mt-2 flex items-center gap-1" style={{ color: trendColor }}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{trendLabel}</span>
        </div>
      )}
    </motion.div>
  )
}
