import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck, ArrowRight, TrendingUp, FileText, AlertTriangle,
  ClipboardList, ScanSearch, Award, BarChart3, Megaphone,
  Star, AlertOctagon, Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/layout/Navbar'
import { useCountUp } from '@/hooks/useScrollAnimation'
import { staggerContainer, fadeUp, slideInRight, scaleIn } from '@/lib/motion'
import { font } from '@/lib/fonts'

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCounter({
  value, prefix = '', suffix = '', label,
}: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useCountUp(value, prefix, suffix)
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        ref={ref}
        className={`text-3xl font-bold text-white tabular-nums ${font.mono}`}
      >
        0
      </span>
      <span className="text-sm text-[#94A3B8]">{label}</span>
    </div>
  )
}

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: <ClipboardList className="h-7 w-7" />,
    title: 'Log Your Shifts',
    desc: 'Manual form or bulk CSV upload — quick enough for between deliveries.',
  },
  {
    step: '02',
    icon: <ScanSearch className="h-7 w-7" />,
    title: 'Get Verified',
    desc: 'Upload a screenshot. Our volunteer verifiers confirm within 72 hours.',
  },
  {
    step: '03',
    icon: <Award className="h-7 w-7" />,
    title: 'Get Proof',
    desc: 'Download or share your income certificate anywhere — banks, landlords, courts.',
  },
]

const FEATURES = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Track Every Rupee',
    desc: 'Weekly/monthly charts show exactly where your income goes.',
    color: '#00D4FF',
  },
  {
    icon: <AlertOctagon className="h-6 w-6" />,
    title: 'Spot Commission Cuts',
    desc: 'Automated anomaly detection flags rate changes instantly.',
    color: '#F59E0B',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Income Certificate',
    desc: 'Formal, verified income proof for banks and landlords.',
    color: '#6EE7B7',
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: 'Report Unfairness',
    desc: 'Anonymous grievance board — your voice, safely amplified.',
    color: '#A78BFA',
  },
]

const TESTIMONIALS = [
  {
    quote: 'FairGig ka certificate dekh ke bank ne mujhe loan de diya. Pehle mera koi record nahi tha.',
    name: 'Ahmed K.',
    city: 'Lahore',
    platform: 'Careem',
    rating: 5,
  },
  {
    quote: 'Commission cut detect ho gayi thi mujhe pehle. Main ne uss waqt complaint file ki aur kuch to hua.',
    name: 'Sara M.',
    city: 'Karachi',
    platform: 'Foodpanda',
    rating: 5,
  },
  {
    quote: 'Rent ke liye income proof chahiye tha. FairGig ne 5 minute mein poora certificate bana diya.',
    name: 'Bilal R.',
    city: 'Islamabad',
    platform: 'Bykea',
    rating: 5,
  },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LandingPage() {
  const featuresRef = useRef<HTMLElement>(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' })

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Mesh background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge className="bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/30 hover:bg-[#00D4FF]/20 mb-2 inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                Built for Pakistan's Gig Workers
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className={`text-5xl lg:text-7xl font-extrabold leading-none tracking-tight ${font.display}`}
            >
              Your earnings.{' '}
              <span className="text-[#00D4FF]" style={{ textShadow: '0 0 40px rgba(0,212,255,0.4)' }}>
                Your proof.
              </span>{' '}
              Your rights.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-[#94A3B8] max-w-lg leading-relaxed">
              Log your gig work, get it verified, and generate income certificates
              banks and landlords actually accept.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#00D4FF] text-[#0A0E1A] font-bold text-base px-8 hover:bg-[#00D4FF]/90 shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
              >
                <Link to="/auth/sign-up">
                  Start Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#00D4FF]/50 bg-transparent"
              >
                See a Sample Certificate
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — floating certificate card */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center"
          >
            <div className="animate-float relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-[#00D4FF]/10 blur-2xl scale-110" />

              <div
                className="relative rounded-3xl p-8 w-80 shadow-[0_0_60px_rgba(0,212,255,0.1)]"
                style={{
                  background: 'rgba(26,34,54,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0,212,255,0.15)',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-[#00D4FF]" />
                    <span className="text-sm font-medium text-[#94A3B8]">Income Certificate</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs bg-[#6EE7B7]/15 text-[#6EE7B7] border border-[#6EE7B7]/30 rounded-full px-2.5 py-0.5 font-medium">
                    <ShieldCheck className="h-3 w-3" /> VERIFIED
                  </span>
                </div>

                <div className="mb-1 text-xs text-[#94A3B8] uppercase tracking-widest">Total Earnings</div>
                <div className={`text-4xl font-bold text-white mb-1 ${font.mono}`}>
                  ₨1,24,500
                </div>
                <div className="text-xs text-[#94A3B8] mb-6">Apr 1 – Jun 30, 2026</div>

                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Verified Shifts', value: '32 / 37', color: '#6EE7B7' },
                    { label: 'Platforms', value: 'Careem, Uber' },
                    { label: 'City', value: 'Lahore — DHA Zone' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-[#94A3B8]">{row.label}</span>
                      <span style={{ color: row.color ?? '#F1F5F9' }} className="font-medium">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] font-bold text-sm">
                      AK
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">Ahmed Khan</div>
                      <div className="text-xs text-[#94A3B8]">Ride-Hailing Driver</div>
                    </div>
                    <div className="ml-auto text-[#6EE7B7]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BANNER ─────────────────────────────────────────────── */}
      <section className="py-16 border-y border-[#1E293B]" style={{ background: '#111827' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <StatCounter value={10000} suffix="+" label="Workers Logged" />
            <StatCounter value={4200000000} prefix="₨" suffix="+" label="Earnings Tracked" />
            <StatCounter value={92} suffix="%" label="Verification Rate" />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className={`text-4xl font-extrabold ${font.display}`}>
                How It Works
              </h2>
              <p className="mt-3 text-[#94A3B8]">Three steps to financial proof</p>
            </motion.div>

            <div className="relative grid md:grid-cols-3 gap-8">
              {/* Connecting dotted line */}
              <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px border-t-2 border-dashed border-[#1E293B]" />

              {HOW_IT_WORKS.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  custom={i}
                  className="relative flex flex-col items-center text-center gap-4 p-6 rounded-2xl"
                  style={{ background: '#111827' }}
                >
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF]">
                    {step.icon}
                  </div>
                  <div className={`absolute -top-3 -right-3 text-6xl font-black text-[#1E293B] leading-none select-none ${font.mono}`}>
                    {step.step}
                  </div>
                  <h3 className={`text-lg font-bold text-white ${font.display}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOR WORKERS FEATURES ─────────────────────────────────────── */}
      <section
        id="features"
        ref={featuresRef as React.RefObject<HTMLElement>}
        className="py-24"
        style={{ background: '#0D1117' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className={`text-4xl font-extrabold ${font.display}`}>
                For Workers
              </h2>
              <p className="mt-3 text-[#94A3B8]">Everything you need to earn with dignity</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <motion.div
                  key={f.title}
                  variants={scaleIn}
                  whileHover={{ y: -6, boxShadow: `0 0 30px ${f.color}22` }}
                  className="group relative flex flex-col gap-4 p-6 rounded-2xl cursor-default transition-colors"
                  style={{ background: '#1A2236', border: '1px solid #1E293B' }}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{ background: `${f.color}18`, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <h3 className={`text-base font-bold text-white ${font.display}`}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{f.desc}</p>
                  {/* Hover accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOR ADVOCATES ────────────────────────────────────────────── */}
      <section id="advocates" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-3xl p-10 lg:p-16 overflow-hidden relative"
            style={{ background: '#111827', border: '1px solid #1E293B' }}
          >
            {/* Purple ambient glow */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#A78BFA]/5 blur-[100px] pointer-events-none" />

            <motion.div variants={fadeUp} className="mb-2">
              <Badge className="bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30">
                For Labour Rights Advocates
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className={`text-3xl font-extrabold mt-3 mb-4 ${font.display}`}
            >
              Powering Labour Rights Research
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#94A3B8] mb-10 max-w-xl">
              Aggregate, anonymised data from thousands of verified shifts — the evidence base
              Pakistan's gig economy needs.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  icon: <TrendingUp className="h-5 w-5" />,
                  title: 'Commission Trends',
                  desc: 'Track how platforms change rates across cities, weeks, and categories.',
                  color: '#A78BFA',
                },
                {
                  icon: <FileText className="h-5 w-5" />,
                  title: 'Income Distribution',
                  desc: 'Compare median earnings by city zone, platform, and work category.',
                  color: '#6EE7B7',
                },
                {
                  icon: <AlertTriangle className="h-5 w-5" />,
                  title: 'Vulnerability Alerts',
                  desc: 'Identify workers with sudden income drops — before it becomes a crisis.',
                  color: '#F59E0B',
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  variants={scaleIn}
                  className="rounded-xl p-6"
                  style={{ background: '#1A2236', border: '1px solid #1E293B' }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                    style={{ background: `${card.color}18`, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <h4 className={`font-bold text-white mb-2 ${font.display}`}>
                    {card.title}
                  </h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#0D1117' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className={`text-4xl font-extrabold ${font.display}`}>
                Workers Trust FairGig
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.name}
                  variants={scaleIn}
                  className="p-6 rounded-2xl"
                  style={{ background: '#1A2236', border: '1px solid #1E293B' }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#94A3B8] italic leading-relaxed mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#00D4FF]/15 flex items-center justify-center text-[#00D4FF] font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{t.name}</div>
                      <div className="text-xs text-[#94A3B8]">{t.city} · {t.platform}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              className={`text-4xl lg:text-5xl font-extrabold mb-6 ${font.display}`}
            >
              Start building your{' '}
              <span className="text-[#00D4FF]" style={{ textShadow: '0 0 30px rgba(0,212,255,0.4)' }}>
                financial proof
              </span>{' '}
              today.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#94A3B8] text-lg mb-8">
              Free to join. Verified in 72 hours. Trusted by 10,000+ workers across Pakistan.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                asChild
                size="lg"
                className="bg-[#00D4FF] text-[#0A0E1A] font-bold text-base px-10 py-6 shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[0_0_60px_rgba(0,212,255,0.5)] transition-all"
              >
                <Link to="/auth/sign-up">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1E293B] py-12" style={{ background: '#0A0E1A' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-[#00D4FF]" />
                <span className={`text-lg font-bold text-white ${font.display}`}>
                  FairGig
                </span>
              </div>
              <p className="text-sm text-[#94A3B8]">Your earnings. Your proof. Your rights.</p>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white mb-4">Links</h5>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                {['About', 'Privacy', 'Terms', 'API Docs'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white mb-4">Language</h5>
              <div className="flex gap-3">
                <button className="px-4 py-1.5 rounded-full text-sm border border-[#00D4FF]/50 text-[#00D4FF]">EN</button>
                <button className="px-4 py-1.5 rounded-full text-sm border border-[#1E293B] text-[#94A3B8] hover:border-[#00D4FF]/30 transition-colors">
                  اردو
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#1E293B] text-center text-xs text-[#475569]">
            © 2026 FairGig. Built for Pakistan's gig workers.
          </div>
        </div>
      </footer>
    </div>
  )
}
