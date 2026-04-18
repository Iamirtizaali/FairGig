import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'

interface TopbarProps {
  breadcrumb?: string
  userName?: string
  userInitials?: string
  notificationCount?: number
  onMenuOpen: () => void
}

export function Topbar({
  breadcrumb,
  userName,
  userInitials,
  notificationCount = 0,
  onMenuOpen,
}: TopbarProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#0A0E1A]/80 backdrop-blur-md border-b border-[#1E293B] sticky top-0 z-20">
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-[#94A3B8] hover:text-white hover:bg-white/5"
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {breadcrumb && (
          <span className={`text-base font-semibold text-white ${font.display}`}>
            {breadcrumb}
          </span>
        )}
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-[#94A3B8] hover:text-white hover:bg-white/5"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#00D4FF] text-[#0A0E1A] text-[10px] font-bold flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </Button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-[#00D4FF]/20 text-[#00D4FF] text-xs font-bold">
                  {userInitials ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#1B1F2C] border-[#1E293B] text-[#F1F5F9] min-w-44"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-white">{userName ?? 'User'}</p>
            </div>
            <DropdownMenuSeparator className="bg-[#1E293B]" />
            <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
              <Link to="/worker/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-white/5 focus:bg-white/5 cursor-pointer text-[#F87171]">
              <Link to="/auth/sign-in">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
