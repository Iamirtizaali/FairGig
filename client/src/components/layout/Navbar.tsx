import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Workers', href: '#features' },
  { label: 'For Advocates', href: '#advocates' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isAuthPage = location.pathname.startsWith('/auth')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || isAuthPage
          ? 'bg-[#0A0E1A]/90 backdrop-blur-md border-b border-[#1E293B]'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
        >
          <ShieldCheck className="h-6 w-6 text-[#00D4FF]" strokeWidth={2.5} />
          <span
            className={`text-xl font-bold tracking-tight ${font.display}`}
          >
            FairGig
          </span>
        </Link>

        {/* Desktop nav links — only on landing */}
        {!isAuthPage && (
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-xs text-[#94A3B8] border border-[#1E293B] rounded-full px-3 py-1 cursor-pointer hover:border-[#00D4FF]/50 transition-colors">
            EN | اردو
          </span>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth/sign-in" className="text-[#94A3B8] hover:text-white">
              Sign In
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-[#00D4FF] text-[#0A0E1A] font-semibold hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.25)]"
          >
            <Link to="/auth/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#94A3B8] hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#111827] border-b border-[#1E293B] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {!isAuthPage &&
                NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="py-3 text-sm text-[#94A3B8] hover:text-white transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-[#1E293B] pt-3">
                <Button variant="ghost" size="sm" asChild className="justify-start">
                  <Link to="/auth/sign-in">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-[#00D4FF] text-[#0A0E1A] font-semibold"
                >
                  <Link to="/auth/sign-up">Get Started →</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
