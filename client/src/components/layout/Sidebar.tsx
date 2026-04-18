import { Link, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { SidebarUserFooter } from '@/components/auth/UserNav'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import type { NavItem } from '@/components/layout/DashboardLayout'

interface SidebarProps {
  navItems: NavItem[]
  role: string
  roleColor: string
  mobileOpen: boolean
  onMobileClose: () => void
}

function NavLink({ item, onClose }: { item: NavItem; onClose?: () => void }) {
  const location = useLocation()
  const isActive =
    location.pathname === item.href ||
    (item.activeMatch && location.pathname.startsWith(item.activeMatch))

  return (
    <Link
      to={item.href}
      onClick={onClose}
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
        isActive
          ? 'border-l-2 border-[#00D4FF] bg-[#00D4FF]/8 text-white rounded-l-none -ml-px'
          : 'text-[#94A3B8] hover:text-white hover:bg-white/5',
      )}
    >
      <span className={cn('shrink-0', isActive ? 'text-[#00D4FF]' : '')}>
        {item.icon}
      </span>
      {item.label}
    </Link>
  )
}

function SidebarContent({
  navItems,
  role,
  roleColor,
  onClose,
}: Omit<SidebarProps, 'mobileOpen' | 'onMobileClose'> & { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full py-6">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-5 mb-7" onClick={onClose}>
        <ShieldCheck className="h-7 w-7 text-[#00D4FF]" strokeWidth={2.5} />
        <span className={`text-xl font-bold text-white tracking-tight ${font.display}`}>
          FairGig
        </span>
      </Link>

      {/* Role badge */}
      <div className="px-5 mb-6">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider"
          style={{ background: `${roleColor}18`, color: roleColor }}
        >
          {role}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} onClose={onClose} />
        ))}
      </nav>

      {/* User footer — real auth store, sign-out, edit profile */}
      <SidebarUserFooter onNavigate={onClose} />
    </div>
  )
}

export function Sidebar({
  navItems,
  role,
  roleColor,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col w-60 shrink-0 bg-[#111827] border-r border-[#1E293B] fixed left-0 top-0 bottom-0 z-30"
      >
        <SidebarContent navItems={navItems} role={role} roleColor={roleColor} />
      </motion.aside>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
        <SheetContent
          side="left"
          className="w-64 p-0 bg-[#111827] border-r border-[#1E293B]"
        >
          <SidebarContent
            navItems={navItems}
            role={role}
            roleColor={roleColor}
            onClose={onMobileClose}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
