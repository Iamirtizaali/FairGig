import { useState } from 'react'
import { useNavigate } from 'react-router'
import { User, Settings, LogOut, Edit3, Loader2, Check, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/auth'
import { useLogoutMutation, useUpdateMeMutation, extractApiMessage } from '@/features/auth/api'
import { GIG_CATEGORIES } from '@/types/auth'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'

// ─── Role colors (mirrors DashboardLayout) ────────────────────────────────────
const ROLE_BADGE_COLOR: Record<string, string> = {
  worker:   'bg-[#00D4FF]/15 text-[#00D4FF] border-[#00D4FF]/30',
  verifier: 'bg-[#A78BFA]/15 text-[#A78BFA] border-[#A78BFA]/30',
  advocate: 'bg-[#A78BFA]/15 text-[#A78BFA] border-[#A78BFA]/30',
  admin:    'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
}

// ─── Role-specific settings path ──────────────────────────────────────────────
const ROLE_SETTINGS: Record<string, string> = {
  worker:   '/worker/settings',
  verifier: '/verify/queue',      // verifiers have no settings page yet
  advocate: '/advocate/overview', // same
  admin:    '/admin/overview',
}

// ─────────────────────────────────────────────────────────────────────────────
// Update Profile Dialog
// Fields: name, phone, language, categories
// (cityZoneId accepts a UUID — we show city names for UX, but skip UUID lookup for now)
// ─────────────────────────────────────────────────────────────────────────────
function UpdateProfileDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const user = useAuthStore((s) => s.user)
  const updateMeMutation = useUpdateMeMutation()

  const [form, setForm] = useState({
    name:       user?.name ?? '',
    phone:      user?.phone ?? '',
    language:   (user?.language ?? 'en') as 'en' | 'ur',
    categories: user?.categories ?? [] as string[],
  })
  const [error, setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isLoading = updateMeMutation.isPending

  function toggleCategory(id: string) {
    setForm((p) => ({
      ...p,
      categories: p.categories.includes(id)
        ? p.categories.filter((c) => c !== id)
        : [...p.categories, id],
    }))
  }

  function handleClose() {
    // reset on close
    setError(null)
    setSuccess(false)
    setForm({
      name:       user?.name ?? '',
      phone:      user?.phone ?? '',
      language:   user?.language ?? 'en',
      categories: user?.categories ?? [],
    })
    onClose()
  }

  function handleSave() {
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError('Name must be at least 2 characters.')
      return
    }
    if (form.phone && !/^\+?[0-9]{7,15}$/.test(form.phone)) {
      setError('Phone must be 7–15 digits, optionally starting with +.')
      return
    }
    setError(null)
    setSuccess(false)
    updateMeMutation.mutate(
      {
        name:       form.name.trim(),
        phone:      form.phone.trim() || undefined,
        language:   form.language,
        categories: form.categories,
      },
      {
        onSuccess: () => { setSuccess(true); setTimeout(handleClose, 900) },
        onError:   (err) => setError(extractApiMessage(err)),
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose() }}>
      <DialogContent className="bg-[#111827] border border-[#1E293B] text-[#F1F5F9] max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-lg font-bold text-white ${font.display}`}>
            Edit Profile
          </DialogTitle>
          {user && (
            <p className="text-sm text-[#94A3B8]">{user.email}</p>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-4 py-3">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-[#94A3B8]">Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setError(null) }}
              placeholder="Ahmed Khan"
              className="bg-[#0F172A] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/40"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-[#94A3B8]">Phone <span className="text-[#475569]">(optional)</span></Label>
            <Input
              value={form.phone}
              onChange={(e) => { setForm((p) => ({ ...p, phone: e.target.value })); setError(null) }}
              placeholder="+92 300 1234567"
              className="bg-[#0F172A] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/40"
            />
          </div>

          {/* Language */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm text-[#94A3B8]">Language</Label>
            <div className="flex gap-2">
              {(['en', 'ur'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, language: lang }))}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium border transition-all',
                    form.language === lang
                      ? 'bg-[#00D4FF]/15 border-[#00D4FF]/50 text-[#00D4FF]'
                      : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:border-[#475569]',
                  )}
                >
                  {lang === 'en' ? 'English' : 'اردو'}
                </button>
              ))}
            </div>
          </div>

          {/* Work categories (worker-only) */}
          {user?.role === 'worker' && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-[#94A3B8]">Work Categories</Label>
              <div className="flex flex-wrap gap-2">
                {GIG_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                      form.categories.includes(c.id)
                        ? 'bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/50'
                        : 'bg-[#0F172A] text-[#94A3B8] border-[#1E293B] hover:border-[#475569]',
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error / success feedback */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-sm">
              <X className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] text-sm">
              <Check className="h-4 w-4 shrink-0" />
              Profile updated!
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="border-[#1E293B] text-[#94A3B8] hover:text-white bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || success}
            className="bg-[#00D4FF] text-[#0A0E1A] font-bold hover:bg-[#00D4FF]/90"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {isLoading ? 'Saving…' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// UserNav  — avatar button + dropdown (for Topbar)
// ─────────────────────────────────────────────────────────────────────────────
export function UserNav() {
  const user        = useAuthStore((s) => s.user)
  const logoutMutation = useLogoutMutation()
  const navigate    = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  const displayName = user?.name ?? 'User'
  const initials    = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const role        = user?.role ?? 'worker'
  const settingsHref = ROLE_SETTINGS[role] ?? '/worker/settings'

  function handleLogout() {
    logoutMutation.mutate()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[#00D4FF]/20 text-[#00D4FF] text-xs font-bold">
                {initials || <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-[#1B1F2C] border-[#1E293B] text-[#F1F5F9] min-w-52"
        >
          {/* User info header */}
          <div className="px-3 py-2.5">
            <p className="text-sm font-semibold text-white truncate">{displayName}</p>
            <p className="text-xs text-[#475569] truncate">{user?.email ?? ''}</p>
            <Badge
              variant="outline"
              className={cn(
                'mt-1.5 text-[10px] uppercase tracking-wider font-semibold border rounded-md px-1.5 py-0.5',
                ROLE_BADGE_COLOR[role],
              )}
            >
              {role}
            </Badge>
          </div>

          <DropdownMenuSeparator className="bg-[#1E293B]" />

          <DropdownMenuItem
            onClick={() => setProfileOpen(true)}
            className="hover:bg-white/5 focus:bg-white/5 cursor-pointer gap-2"
          >
            <Edit3 className="h-4 w-4 text-[#94A3B8]" />
            Edit Profile
          </DropdownMenuItem>

          {role === 'worker' && (
            <DropdownMenuItem
              onClick={() => navigate(settingsHref)}
              className="hover:bg-white/5 focus:bg-white/5 cursor-pointer gap-2"
            >
              <Settings className="h-4 w-4 text-[#94A3B8]" />
              Settings
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator className="bg-[#1E293B]" />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="hover:bg-[#F87171]/10 focus:bg-[#F87171]/10 cursor-pointer gap-2 text-[#F87171]"
          >
            {logoutMutation.isPending
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <LogOut className="h-4 w-4" />
            }
            {logoutMutation.isPending ? 'Signing out…' : 'Sign Out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateProfileDialog open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SidebarUserFooter — bottom of sidebar (shows user + sign-out inline)
// ─────────────────────────────────────────────────────────────────────────────
export function SidebarUserFooter({ onNavigate }: { onNavigate?: () => void }) {
  const user           = useAuthStore((s) => s.user)
  const logoutMutation = useLogoutMutation()
  const [profileOpen, setProfileOpen] = useState(false)

  const displayName = user?.name ?? 'User'
  const initials    = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <>
      <div className="mt-6 px-5 pt-5 border-t border-[#1E293B]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setProfileOpen(true); onNavigate?.() }}
            className="w-8 h-8 rounded-full bg-[#1B1F2C] border border-[#1E293B] flex items-center justify-center text-xs font-bold text-[#00D4FF] hover:border-[#00D4FF]/50 transition-colors shrink-0"
          >
            {initials || <User className="h-3.5 w-3.5" />}
          </button>
          <div className="flex-1 min-w-0">
            <button
              onClick={() => { setProfileOpen(true); onNavigate?.() }}
              className="text-sm font-medium text-white truncate hover:text-[#00D4FF] transition-colors text-left w-full"
            >
              {displayName}
            </button>
            <button
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="text-xs text-[#94A3B8] hover:text-[#F87171] transition-colors disabled:opacity-50"
            >
              {logoutMutation.isPending ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}
