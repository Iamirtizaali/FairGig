import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { staggerContainer, fadeUp, scaleIn } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import { useForgotPasswordMutation, extractApiMessage } from '@/features/auth/api'

export default function ForgotPasswordPage() {
  const forgotMutation = useForgotPasswordMutation()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendCooldown, setResendCooldown] = useState(0)

  const isLoading = forgotMutation.isPending

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) { setError('Please enter your email address.'); return }
    setError(null)
    // Backend always returns 200 regardless of whether the email exists (security)
    forgotMutation.mutate(
      { email },
      {
        onSuccess: () => { setSent(true); setResendCooldown(45) },
        onError: (err) => setError(extractApiMessage(err)),
      },
    )
  }

  async function handleResend() {
    if (resendCooldown > 0) return
    forgotMutation.mutate(
      { email },
      { onSuccess: () => setResendCooldown(45) },
    )
  }

  return (
    <AuthLayout quote="Your account is always recoverable." quoteAuthor="FairGig">
      <AnimatePresence mode="wait">
        {!sent ? (
          /* ── Request form ── */
          <motion.div
            key="form"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            className="flex flex-col gap-6"
          >
            {/* Icon */}
            <motion.div variants={scaleIn} className="flex justify-center">
              <div className="relative animate-pulse-dot">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                  <Mail className="h-8 w-8 text-[#00D4FF]" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <h1 className={`text-3xl font-extrabold text-white ${font.display}`}>
                Reset your password
              </h1>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Enter your email and we&apos;ll send a reset link.
              </p>
            </motion.div>

            {/* Error banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-xl p-4 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-sm"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm text-[#94A3B8]">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ahmed@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(null) }}
                  disabled={isLoading}
                  className={cn(
                    'bg-[#0F172A] border-0 border-b-2 border-[#1E293B] rounded-lg text-white placeholder:text-[#475569]',
                    'focus-visible:ring-0 focus-visible:border-b-[#00D4FF] transition-colors',
                    error && 'border-b-[#F87171]'
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00D4FF] text-[#0A0E1A] font-bold py-5 hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
                ) : (
                  'Send Reset Link →'
                )}
              </Button>
            </motion.form>

            <motion.div variants={fadeUp} className="text-center">
              <Link
                to="/auth/sign-in"
                className="inline-flex items-center gap-1 text-sm text-[#94A3B8] hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Sent state ── */
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="flex items-center justify-center w-20 h-20 rounded-full bg-[#6EE7B7]/15 border-2 border-[#6EE7B7]/40"
            >
              <CheckCircle className="h-10 w-10 text-[#6EE7B7]" />
            </motion.div>

            <div>
              <h1 className={`text-3xl font-extrabold text-white ${font.display}`}>
                Check your inbox
              </h1>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Link sent to{' '}
                <span className="text-white font-medium">{email}</span>
              </p>
            </div>

            {/* Resend with cooldown ring */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0 || isLoading}
                className={cn(
                  'text-sm font-medium transition-colors',
                  resendCooldown > 0
                    ? 'text-[#475569] cursor-not-allowed'
                    : 'text-[#00D4FF] hover:text-[#00D4FF]/80'
                )}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend link'}
              </button>
              {/* Circular progress ring */}
              {resendCooldown > 0 && (
                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="#1E293B" strokeWidth="2" />
                  <circle
                    cx="12" cy="12" r="10" fill="none"
                    stroke="#00D4FF" strokeWidth="2"
                    strokeDasharray={`${(resendCooldown / 45) * 63} 63`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
              )}
            </div>

            <Link
              to="/auth/sign-in"
              className="inline-flex items-center gap-1 text-sm text-[#94A3B8] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
