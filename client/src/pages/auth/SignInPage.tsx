import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import { useLoginMutation, extractApiMessage } from '@/features/auth/api'

export default function SignInPage() {
  const loginMutation = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })

  const isLoading = loginMutation.isPending

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setError(null)
    loginMutation.mutate(
      { email: form.email, password: form.password },
      { onError: (err) => setError(extractApiMessage(err)) },
    )
  }

  return (
    <AuthLayout quote="Log once. Prove everywhere." quoteAuthor="FairGig">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6"
      >
        {/* Heading */}
        <motion.div variants={fadeUp}>
          <h1
            className={`text-3xl font-extrabold text-white tracking-tight ${font.display}`}
          >
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Sign in to your FairGig account</p>
        </motion.div>

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl p-4 bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-sm"
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-[#F87171]/60 hover:text-[#F87171]">
              ×
            </button>
          </motion.div>
        )}

        {/* Form */}
        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-sm text-[#94A3B8]">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ahmed@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              className={cn(
                'bg-[#0F172A] border-0 border-b-2 border-[#1E293B] rounded-lg text-white placeholder:text-[#475569]',
                'focus-visible:ring-0 focus-visible:border-b-[#00D4FF] transition-colors',
                error && 'border-b-[#F87171]'
              )}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm text-[#94A3B8]">
                Password
              </Label>
              <Link
                to="/auth/forgot-password"
                className="text-xs text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
                className={cn(
                  'bg-[#0F172A] border-0 border-b-2 border-[#1E293B] rounded-lg text-white placeholder:text-[#475569] pr-10',
                  'focus-visible:ring-0 focus-visible:border-b-[#00D4FF] transition-colors',
                  error && 'border-b-[#F87171]'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={form.rememberMe}
              onCheckedChange={(v) => setForm((p) => ({ ...p, rememberMe: !!v }))}
              className="border-[#1E293B] data-[state=checked]:bg-[#00D4FF] data-[state=checked]:border-[#00D4FF]"
            />
            <Label htmlFor="rememberMe" className="text-sm text-[#94A3B8] cursor-pointer">
              Remember me
            </Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00D4FF] text-[#0A0E1A] font-bold text-base py-5 hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.25)] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…
              </>
            ) : (
              'Sign In →'
            )}
          </Button>
        </motion.form>

        {/* Divider */}
        <motion.div variants={fadeUp} className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1E293B]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#0A0E1A] px-3 text-xs text-[#475569]">or</span>
          </div>
        </motion.div>

        {/* Footer links */}
        <motion.div variants={fadeUp} className="text-center space-y-2">
          <p className="text-sm text-[#94A3B8]">
            Don&apos;t have an account?{' '}
            <Link to="/auth/sign-up" className="text-[#00D4FF] hover:text-[#00D4FF]/80 font-medium transition-colors">
              Sign up →
            </Link>
          </p>
          <p className="text-xs text-[#475569]">
            <Link to="#" className="hover:text-[#94A3B8] transition-colors">
              Apply as a Verifier or Advocate →
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </AuthLayout>
  )
}
