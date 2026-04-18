import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, EyeOff, Loader2, Check, ChevronRight, ChevronLeft,
  Bike, Car, Pizza, Monitor, Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { stepSlideIn, staggerContainer, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import type { AuthStep } from '@/types/auth'
import { GIG_CATEGORIES, GIG_PLATFORMS, PAKISTAN_CITIES } from '@/types/auth'

// ─── Category icon map ────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'delivery':     <Bike className="h-4 w-4" />,
  'ride-hailing': <Car className="h-4 w-4" />,
  'food-courier': <Pizza className="h-4 w-4" />,
  'freelancer':   <Monitor className="h-4 w-4" />,
  'domestic':     <Home className="h-4 w-4" />,
}

// ─── Password strength helper ─────────────────────────────────────────────────
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

// ─── Step progress indicator ──────────────────────────────────────────────────
function StepIndicator({ currentStep }: { currentStep: AuthStep }) {
  const steps = [
    { n: 1, label: 'Account' },
    { n: 2, label: 'About You' },
    { n: 3, label: 'Ready!' },
  ]
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-2">
          <div
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300',
              currentStep > s.n
                ? 'bg-[#6EE7B7] text-[#0A0E1A]'
                : currentStep === s.n
                  ? 'bg-[#00D4FF] text-[#0A0E1A]'
                  : 'bg-[#1E293B] text-[#475569]'
            )}
          >
            {currentStep > s.n ? <Check className="h-4 w-4" /> : s.n}
          </div>
          <span
            className={cn(
              'text-xs font-medium hidden sm:block',
              currentStep === s.n ? 'text-white' : 'text-[#475569]'
            )}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={cn(
                'w-8 h-0.5 transition-all duration-500',
                currentStep > s.n ? 'bg-[#6EE7B7]' : 'bg-[#1E293B]'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SignUpPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<AuthStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    categories: [] as string[], city: '', zone: '', platforms: [] as string[],
  })

  const passwordStrength = getPasswordStrength(form.password)

  function updateField(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
  }

  function toggleMulti(field: 'categories' | 'platforms', id: string) {
    setForm((p) => ({
      ...p,
      [field]: p[field].includes(id) ? p[field].filter((x) => x !== id) : [...p[field], id],
    }))
  }

  function next() { if (step < 3) setStep((s) => (s + 1) as AuthStep) }
  function back() { if (step > 1) setStep((s) => (s - 1) as AuthStep) }

  async function submit() {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    next()
  }

  return (
    <AuthLayout quote="One account. Every proof you need." quoteAuthor="FairGig">
      <StepIndicator currentStep={step} />

      <AnimatePresence mode="wait">
        {/* ── STEP 1: Account ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepSlideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-6"
          >
            <div>
              <h1 className={`text-3xl font-extrabold text-white ${font.display}`}>
                Create your account
              </h1>
              <p className="mt-1 text-sm text-[#94A3B8]">Free to join. Always.</p>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-4">
              {[
                { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Ahmed Khan', autoComplete: 'name' },
                { id: 'email', label: 'Email address', type: 'email', placeholder: 'ahmed@example.com', autoComplete: 'email' },
                { id: 'phone', label: 'Phone (Pakistan)', type: 'tel', placeholder: '+92 300 1234567', autoComplete: 'tel' },
              ].map((field) => (
                <motion.div key={field.id} variants={fadeUp} className="flex flex-col gap-1.5">
                  <Label htmlFor={field.id} className="text-sm text-[#94A3B8]">{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    value={form[field.id as keyof typeof form] as string}
                    onChange={(e) => updateField(field.id, e.target.value)}
                    className="bg-[#0F172A] border-0 border-b-2 border-[#1E293B] rounded-lg text-white placeholder:text-[#475569] focus-visible:ring-0 focus-visible:border-b-[#00D4FF] transition-colors"
                  />
                </motion.div>
              ))}

              {/* Password with strength meter */}
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm text-[#94A3B8]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    className="bg-[#0F172A] border-0 border-b-2 border-[#1E293B] rounded-lg text-white placeholder:text-[#475569] pr-10 focus-visible:ring-0 focus-visible:border-b-[#00D4FF] transition-colors"
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
                          style={{
                            background: i <= passwordStrength.score ? passwordStrength.color : '#1E293B',
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <Label htmlFor="confirmPassword" className="text-sm text-[#94A3B8]">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  className={cn(
                    'bg-[#0F172A] border-0 border-b-2 rounded-lg text-white placeholder:text-[#475569] focus-visible:ring-0 focus-visible:border-b-[#00D4FF] transition-colors',
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? 'border-b-[#F87171]'
                      : 'border-b-[#1E293B]'
                  )}
                />
              </motion.div>

              {/* Info callout */}
              <motion.div
                variants={fadeUp}
                className="rounded-xl p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30"
              >
                <p className="text-xs text-[#F59E0B]">
                  🔵 Starting as a <strong>Worker</strong> — you can request Verifier or Advocate status later from settings.
                </p>
              </motion.div>
            </motion.div>

            <Button
              onClick={next}
              disabled={!form.fullName || !form.email || !form.password || form.password !== form.confirmPassword}
              className="w-full bg-[#00D4FF] text-[#0A0E1A] font-bold py-5 hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            >
              Continue <ChevronRight className="ml-1 h-4 w-4" />
            </Button>

            <p className="text-center text-sm text-[#94A3B8]">
              Already have an account?{' '}
              <Link to="/auth/sign-in" className="text-[#00D4FF] hover:text-[#00D4FF]/80 font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        )}

        {/* ── STEP 2: About You ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepSlideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-6"
          >
            <div>
              <h1 className={`text-3xl font-extrabold text-white ${font.display}`}>
                Tell us about you
              </h1>
              <p className="mt-1 text-sm text-[#94A3B8]">Helps us personalise your experience</p>
            </div>

            {/* Work categories */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-[#94A3B8]">I work as:</Label>
              <div className="flex flex-wrap gap-2">
                {GIG_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleMulti('categories', c.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                      form.categories.includes(c.id)
                        ? 'bg-[#00D4FF] text-[#0A0E1A] border-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                        : 'bg-[#0F172A] text-[#94A3B8] border-[#1E293B] hover:border-[#00D4FF]/40 hover:text-white'
                    )}
                  >
                    {CATEGORY_ICONS[c.id]}
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="city" className="text-sm text-[#94A3B8]">My city:</Label>
              <select
                id="city"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="w-full bg-[#0F172A] border border-[#1E293B] rounded-lg text-white py-2.5 px-3 text-sm focus:outline-none focus:border-[#00D4FF] transition-colors"
              >
                <option value="">Select city…</option>
                {PAKISTAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Platforms */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-[#94A3B8]">Main platforms I use:</Label>
              <div className="flex flex-wrap gap-2">
                {GIG_PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggleMulti('platforms', p.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200',
                      form.platforms.includes(p.id)
                        ? 'bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/50'
                        : 'bg-[#0F172A] text-[#94A3B8] border-[#1E293B] hover:border-[#94A3B8]'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={back}
                className="flex-1 border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#94A3B8] bg-transparent"
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={submit}
                disabled={isLoading || !form.city}
                className="flex-2 bg-[#00D4FF] text-[#0A0E1A] font-bold hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create Account <ChevronRight className="ml-1 h-4 w-4" /></>}
              </Button>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Success ── */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepSlideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-6 text-center"
          >
            {/* Animated success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              className="flex items-center justify-center w-24 h-24 rounded-full bg-[#6EE7B7]/15 border-2 border-[#6EE7B7]/40"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Check className="h-12 w-12 text-[#6EE7B7]" strokeWidth={3} />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className={`text-3xl font-extrabold text-white ${font.display}`}>
                Your account is ready!
              </h1>
              <p className="mt-2 text-[#94A3B8]">Welcome to FairGig, {form.fullName.split(' ')[0]}.</p>
            </motion.div>

            {/* Summary card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="w-full rounded-2xl p-5 text-left"
              style={{ background: '#111827', border: '1px solid #1E293B' }}
            >
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Name', value: form.fullName },
                  { label: 'Role', value: 'Worker' },
                  { label: 'City', value: form.city || '—' },
                  { label: 'Categories', value: GIG_CATEGORIES.filter((c) => form.categories.includes(c.id)).map((c) => c.icon + ' ' + c.label).join(', ') || '—' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-start gap-4">
                    <span className="text-[#475569] shrink-0">{row.label}</span>
                    <span className="text-white text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full"
            >
              <Button
                onClick={() => navigate('/worker/dashboard')}
                className="w-full bg-[#00D4FF] text-[#0A0E1A] font-bold py-5 hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              >
                Go to my Dashboard →
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
