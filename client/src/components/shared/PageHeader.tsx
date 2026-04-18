import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import { fadeUp } from '@/lib/motion'

interface PageHeaderProps {
  heading: string
  subtext?: string
  actions?: ReactNode
  className?: string
}

export function PageHeader({ heading, subtext, actions, className }: PageHeaderProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={cn('flex items-start justify-between gap-4 mb-8', className)}
    >
      <div>
        <h1 className={`text-2xl font-extrabold text-white tracking-tight ${font.display}`}>
          {heading}
        </h1>
        {subtext && (
          <p className="mt-1 text-sm text-[#94A3B8]">{subtext}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </motion.div>
  )
}
