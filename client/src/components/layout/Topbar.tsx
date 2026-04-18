import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/auth/UserNav'
import { font } from '@/lib/fonts'

interface TopbarProps {
  breadcrumb?: string
  notificationCount?: number
  onMenuOpen: () => void
}

export function Topbar({
  breadcrumb,
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

      {/* Right: bell + user dropdown */}
      <div className="flex items-center gap-2">
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

        {/* Real auth-aware user dropdown */}
        <UserNav />
      </div>
    </header>
  )
}
