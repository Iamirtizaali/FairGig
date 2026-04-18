import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowLeft, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { staggerContainer, fadeUp, scaleIn } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import { useResetPasswordMutation, extractApiMessage } from '@/features/auth/api'

function getPasswordStrength(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['', '#F87171', '#F59E0B', '#6EE7B7', '#00D4FF']
  return { score, label: labels[score], color: colors[score] }
}

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()
  const resetMutation = useResetPasswordMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isExpired, setIsExpired] = useState(false)
  const [form, setForm] = useState({ password: '', confirmPassword: '' })

  const isLoading = resetMutation.isPending
  const passwordStrength = getPasswordStrength(form.password)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.password) { setError('Please enter a new password.'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (passwordStrength.score < 2) { setError('Please choose a stronger password.'); return }
    setError(null)
    // Backend expects: { token: string, password: string }
    resetMutation.mutate(
      { token: token!, password: form.password },
      {
        onSuccess: () => setSuccess(true),
        onError: (err) => {
          const msg = extractApiMessage(err)
          // 400 INVALID_RESET_TOKEN = link is expired/used
          if (msg.toLowerCase().includes('invalid') || msg.toLowerCase().includes('expired')) {
            setIsExpired(true)
          } else {
            setError(msg)
          }
        },
      },
    )
  }

  return (
    <AuthLayout quote="A new password. A fresh start." quoteAuthor="FairGig">
      <AnimatePresence mode="wait">
        {/* ── Expired token state ── */}
        {isExpired && (
          <motion.div
            key="expired"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F87171]/10 border border-[#F87171]/30">
              <AlertCircle className="h-8 w-8 text-[#F87171]" />
            </div>
            <div>
              <h1 className={`text-2xl font-extrabold text-white ${font.display}`}>
                Link expired
              </h1>
              <p className="mt-2 text-sm text-[#94A3B8]">
                This reset link has expired or is invalid.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Button asChild className="w-full bg-[#00D4FF] text-[#0A0E1A] font-bold">
                <Link to="/auth/forgot-password">Request a new link →</Link>
              </Button>
              <Link to="/auth/sign-in" className="inline-flex justify-center items-center gap-1 text-sm text-[#94A3B8] hover:text-white">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── Success state ── */}
        {!isExpired && success && (
          <motion.div
            key="success"
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
                Password updated!
              </h1>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Redirecting you to sign in…
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 bg-[#1E293B] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#6EE7B7] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}

        {/* ── Reset form ── */}
        {!isExpired && !success && (
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
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                <Lock className="h-8 w-8 text-[#00D4FF]" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="text-center">
              <h1 className={`text-3xl font-extrabold text-white ${font.display}`}>
                Set new password
              </h1>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Choose a strong password for your account.
              </p>
            </motion.div>

            {/* Error banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-xl p-3 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-sm"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* New password */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm text-[#94A3B8]">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); if (error) setError(null) }}
                    disabled={isLoading}
                    className={cn(
                      'bg-[#0F172A] border-0 border-b-2 border-[#1E293B] rounded-lg text-white placeholder:text-[#475569] pr-10',
                      'focus-visible:ring-0 focus-visible:border-b-[#00D4FF] transition-colors'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Strength bars */}
                {form.password && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{ background: i <= passwordStrength.score ? passwordStrength.color : '#1E293B' }}
                        />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirmPassword" className="text-sm text-[#94A3B8]">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter new password"
                  value={form.confirmPassword}
                  onChange={(e) => { setForm((p) => ({ ...p, confirmPassword: e.target.value })); if (error) setError(null) }}
                  disabled={isLoading}
                  className={cn(
                    'bg-[#0F172A] border-0 border-b-2 rounded-lg text-white placeholder:text-[#475569]',
                    'focus-visible:ring-0 transition-colors',
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? 'border-b-[#F87171]'
                      : 'border-b-[#1E293B] focus-visible:border-b-[#00D4FF]'
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !form.password || !form.confirmPassword}
                className="w-full bg-[#00D4FF] text-[#0A0E1A] font-bold py-5 hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating…</>
                ) : (
                  'Update Password →'
                )}
              </Button>
            </motion.form>

            <div className="text-center">
              <Link
                to="/auth/sign-in"
                className="inline-flex items-center gap-1 text-sm text-[#94A3B8] hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
