import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Globe } from 'lucide-react'
import { slideInLeft, slideInRight } from '@/lib/motion'
import { font } from '@/lib/fonts'

interface AuthLayoutProps {
  children: ReactNode
  /** Illustration side quote */
  quote?: string
  /** Short descriptor shown below quote */
  quoteAuthor?: string
}

const TRUST_BADGES = [
  { icon: <Lock className="h-5 w-5 text-[#00D4FF]" />, label: 'JWT Secured' },
  { icon: <ShieldCheck className="h-5 w-5 text-[#6EE7B7]" />, label: 'Role Protected' },
  { icon: <Globe className="h-5 w-5 text-[#A78BFA]" />, label: 'Made for Pakistan' },
]

export function AuthLayout({ children, quote, quoteAuthor }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0E1A] flex">
      {/* ── Left illustration panel (hidden on mobile) ────────────── */}
      <motion.aside
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:w-[45%] flex-col items-center justify-between
                   bg-[#111827] px-12 py-12 relative overflow-hidden"
      >
        {/* Mesh background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00D4FF]/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-2 self-start">
          <ShieldCheck className="h-7 w-7 text-[#00D4FF]" strokeWidth={2.5} />
          <span
            className={`text-2xl font-bold text-white tracking-tight ${font.display}`}
          >
            FairGig
          </span>
        </Link>

        {/* Illustration placeholder — glowing card visual */}
        <div className="relative z-10 flex flex-col items-center gap-6 py-8">
          {/* Floating certificate mock */}
          <div
            className="animate-float w-72 rounded-2xl p-6 shadow-[0_0_60px_rgba(0,212,255,0.08)]"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#94A3B8] uppercase tracking-widest">Income Certificate</span>
              <span className="flex items-center gap-1 text-xs bg-[#6EE7B7]/15 text-[#6EE7B7] border border-[#6EE7B7]/30 rounded-full px-2 py-0.5">
                <ShieldCheck className="h-3 w-3" /> VERIFIED
              </span>
            </div>
            <div className="text-[#94A3B8] text-xs mb-1">Total Earnings</div>
            <div className={`text-3xl font-bold text-white mb-1 ${font.mono}`}>
              ₨1,24,500
            </div>
            <div className="text-xs text-[#94A3B8]">Apr 1 – Jun 30, 2026 · 32 verified shifts</div>
            <div className="mt-4 h-px bg-[#1E293B]" />
            <div className="mt-3 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#00D4FF]/20 flex items-center justify-center">
                <span className="text-[#00D4FF] text-xs font-bold">AK</span>
              </div>
              <div>
                <div className="text-xs text-white font-medium">Ahmed Khan</div>
                <div className="text-xs text-[#94A3B8]">Ride-Hailing · Lahore</div>
              </div>
            </div>
          </div>

          {/* Quote */}
          {quote && (
            <blockquote className="text-center">
              <p
                className={`text-lg font-medium text-white italic ${font.display}`}
              >
                &ldquo;{quote}&rdquo;
              </p>
              {quoteAuthor && (
                <cite className="mt-1 block text-sm text-[#94A3B8] not-italic">
                  — {quoteAuthor}
                </cite>
              )}
            </blockquote>
          )}
        </div>

        {/* Trust badges */}
        <div className="relative z-10 flex items-center gap-6">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/10">
                {b.icon}
              </div>
              <span className="text-xs text-[#94A3B8] whitespace-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* ── Right form panel ───────────────────────────────────────── */}
      <motion.main
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-0"
      >
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
          <ShieldCheck className="h-6 w-6 text-[#00D4FF]" strokeWidth={2.5} />
          <span className={`text-xl font-bold text-white ${font.display}`}>
            FairGig
          </span>
        </Link>

        <div className="w-full max-w-md">{children}</div>
      </motion.main>
    </div>
  )
}
