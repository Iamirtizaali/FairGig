import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, X, Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import type { NavItem } from './DashboardLayout'

interface SidebarProps {
  navItems: NavItem[]
  role: string
  roleColor: string
  userName?: string
  userInitials?: string
  mobileOpen: boolean
  onMobileClose: () => void
}

function NavLink({ item, onClose }: { item: NavItem; onClose?: () => void }) {
  const location = useLocation()
  const isActive = location.pathname === item.href ||
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
  userName,
  userInitials,
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

      {/* User bottom */}
      {(userName || userInitials) && (
        <div className="mt-6 px-5 pt-5 border-t border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1B1F2C] border border-[#1E293B] flex items-center justify-center text-xs font-bold text-[#00D4FF]">
              {userInitials ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName ?? 'User'}</p>
              <Link
                to="/auth/sign-in"
                className="text-xs text-[#94A3B8] hover:text-[#F87171] transition-colors"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function Sidebar({
  navItems,
  role,
  roleColor,
  userName,
  userInitials,
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
        <SidebarContent
          navItems={navItems}
          role={role}
          roleColor={roleColor}
          userName={userName}
          userInitials={userInitials}
        />
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
            userName={userName}
            userInitials={userInitials}
            onClose={onMobileClose}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
