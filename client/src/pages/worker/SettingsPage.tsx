import { useState } from 'react'
import { Activity, Clock, ShieldCheck, User, Bell, Shield, Database, Trash2, ArrowUpCircle, Loader2, Check, X, Clock3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { useAuthStore } from '@/stores/auth'
import {
  useUpdateMeMutation,
  useChangePasswordMutation,
  useCreateRoleRequestMutation,
  extractApiMessage,
} from '@/features/auth/api'
import { GIG_CATEGORIES, PAKISTAN_CITIES } from '@/types/auth'
import { cn } from '@/lib/utils'
import { font } from '@/lib/fonts'

// ─── Tab trigger style helper ─────────────────────────────────────────────────
const TAB_CLS =
  'justify-start px-4 py-3 rounded-xl data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF] hover:bg-white/5 data-[state=active]:hover:bg-[#00D4FF]/10'

// ─────────────────────────────────────────────────────────────────────────────
// Profile Tab — wire real updateMe
// ─────────────────────────────────────────────────────────────────────────────
function ProfileTab() {
  const user = useAuthStore((s) => s.user)
  const updateMeMutation = useUpdateMeMutation()

  const [form, setForm] = useState({
    name:       user?.name ?? '',
    phone:      user?.phone ?? '',
    language:   (user?.language ?? 'en') as 'en' | 'ur',
    categories: user?.categories ?? [] as string[],
  })
  const [error, setError]     = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function toggleCategory(id: string) {
    setForm((p) => ({
      ...p,
      categories: p.categories.includes(id)
        ? p.categories.filter((c) => c !== id)
        : [...p.categories, id],
    }))
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
    setError(null); setSuccess(false)
    updateMeMutation.mutate(
      {
        name:       form.name.trim(),
        phone:      form.phone.trim() || undefined,
        language:   form.language,
        categories: form.categories,
      },
      {
        onSuccess: () => setSuccess(true),
        onError:   (err) => setError(extractApiMessage(err)),
      },
    )
  }

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible"
      className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-8">
      {/* Personal Info */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#94A3B8]">Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setError(null) }}
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#94A3B8]">Email <span className="text-[#475569] text-xs">(read-only)</span></Label>
            <Input
              value={user?.email ?? ''}
              disabled
              className="bg-[#111827] border-[#1E293B] text-[#94A3B8] opacity-70"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#94A3B8]">Phone Number <span className="text-[#475569] text-xs">(optional)</span></Label>
            <Input
              value={form.phone}
              onChange={(e) => { setForm((p) => ({ ...p, phone: e.target.value })); setError(null) }}
              placeholder="+92 300 1234567"
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#94A3B8]">Current Role</Label>
            <Input
              value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
              disabled
              className="bg-[#111827] border-[#1E293B] text-[#00D4FF] opacity-80 capitalize"
            />
          </div>
        </div>
      </div>

      {/* Language */}
      <div>
        <h3 className="text-base font-semibold text-white mb-3">Language Preference</h3>
        <div className="flex gap-2 max-w-xs">
          {(['en', 'ur'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setForm((p) => ({ ...p, language: lang }))}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-medium border transition-all',
                form.language === lang
                  ? 'bg-[#00D4FF]/15 border-[#00D4FF]/50 text-[#00D4FF]'
                  : 'bg-[#111827] border-[#1E293B] text-[#94A3B8] hover:border-[#475569]',
              )}
            >
              {lang === 'en' ? 'English' : 'اردو'}
            </button>
          ))}
        </div>
      </div>

      {/* Categories (workers only) */}
      {user?.role === 'worker' && (
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Work Categories</h3>
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
                    : 'bg-[#111827] text-[#94A3B8] border-[#1E293B] hover:border-[#475569]',
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-sm">
          <X className="h-4 w-4 shrink-0" />{error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] text-sm">
          <Check className="h-4 w-4 shrink-0" />Profile updated successfully.
        </div>
      )}

      <div className="pt-4 border-t border-[#1E293B] flex justify-end">
        <Button
          onClick={handleSave}
          disabled={updateMeMutation.isPending}
          className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold"
        >
          {updateMeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {updateMeMutation.isPending ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Role Request Tab — only shown to workers
// ─────────────────────────────────────────────────────────────────────────────
function RoleRequestTab() {
  const user = useAuthStore((s) => s.user)
  const roleRequestMutation = useCreateRoleRequestMutation()

  const [requestedRole, setRequestedRole] = useState<'verifier' | 'advocate'>('verifier')
  const [reason, setReason] = useState('')
  const [error, setError]   = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Non-workers see a message
  if (user?.role !== 'worker') {
    return (
      <motion.div variants={fadeUp} initial="hidden" animate="visible"
        className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4">
          <ArrowUpCircle className="h-6 w-6 text-[#A78BFA]" />
          <h3 className="text-lg font-bold text-white">Role Request</h3>
        </div>
        <p className="text-[#94A3B8]">
          You are currently a <span className="text-white font-medium capitalize">{user?.role}</span>.
          Role change requests are only available to Workers.
        </p>
      </motion.div>
    )
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center gap-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#A78BFA]/15 border-2 border-[#A78BFA]/40 flex items-center justify-center">
          <Clock3 className="h-8 w-8 text-[#A78BFA]" />
        </div>
        <div>
          <h3 className={`text-xl font-bold text-white mb-1 ${font.display}`}>Request Submitted!</h3>
          <p className="text-[#94A3B8] text-sm">
            Your request to become a{' '}
            <span className="text-white font-medium capitalize">{requestedRole}</span>{' '}
            has been sent to the admin team. You'll be notified once a decision is made.
          </p>
        </div>
        <Badge className="bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 text-xs py-1 px-3">
          Pending Review
        </Badge>
      </motion.div>
    )
  }

  function handleSubmit() {
    if (reason.trim().length < 10) {
      setError('Please provide a reason (minimum 10 characters).')
      return
    }
    setError(null)
    roleRequestMutation.mutate(
      { requestedRole, reason: reason.trim() },
      {
        onSuccess: () => setSubmitted(true),
        onError:   (err) => setError(extractApiMessage(err)),
      },
    )
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Info callout */}
      <motion.div variants={fadeUp}
        className="rounded-2xl p-5 bg-[#A78BFA]/8 border border-[#A78BFA]/20">
        <div className="flex gap-3">
          <ArrowUpCircle className="h-5 w-5 text-[#A78BFA] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white mb-1">Request a Role Upgrade</p>
            <p className="text-sm text-[#94A3B8]">
              As a Worker you can request to become a <strong className="text-white">Verifier</strong> (review shift records)
              or an <strong className="text-white">Advocate</strong> (monitor commissions & systemic issues).
              An admin will review your request and reach out if needed.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}
        className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white">New Role Request</h3>

        {/* Role selector */}
        <div className="space-y-2">
          <Label className="text-[#94A3B8]">Requested Role</Label>
          <div className="grid grid-cols-2 gap-3">
            {(['verifier', 'advocate'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRequestedRole(role)}
                className={cn(
                  'p-4 rounded-xl border text-left transition-all',
                  requestedRole === role
                    ? 'bg-[#A78BFA]/15 border-[#A78BFA]/50 text-[#A78BFA]'
                    : 'bg-[#111827] border-[#1E293B] text-[#94A3B8] hover:border-[#475569] hover:text-white',
                )}
              >
                <p className="font-semibold capitalize mb-1">{role}</p>
                <p className="text-xs opacity-70">
                  {role === 'verifier'
                    ? 'Review and verify shift records submitted by workers'
                    : 'Advocate for workers — monitor pay, zones, and systemic issues'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <Label className="text-[#94A3B8]">
            Why do you want this role?{' '}
            <span className="text-[#475569] text-xs">(min 10 characters, max 500)</span>
          </Label>
          <Textarea
            value={reason}
            onChange={(e) => { setReason(e.target.value); setError(null) }}
            placeholder="Describe your experience and why you're a good fit…"
            maxLength={500}
            rows={4}
            className="bg-[#111827] border-[#1E293B] text-white placeholder:text-[#475569] focus-visible:ring-[#A78BFA]/40 resize-none"
          />
          <p className="text-xs text-[#475569] text-right">{reason.length}/500</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-sm">
            <X className="h-4 w-4 shrink-0" />{error}
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={roleRequestMutation.isPending}
            className="bg-[#A78BFA] text-[#0A0E1A] hover:bg-[#A78BFA]/90 font-bold"
          >
            {roleRequestMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {roleRequestMutation.isPending ? 'Submitting…' : 'Submit Request →'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Security Tab — wire change password
// ─────────────────────────────────────────────────────────────────────────────
function SecurityTab() {
  const changePasswordMutation = useChangePasswordMutation()
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' })
  const [error, setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleChangePassword() {
    if (!form.oldPassword || !form.newPassword) {
      setError('Both fields are required.'); return
    }
    if (form.newPassword.length < 10) {
      setError('New password must be at least 10 characters.'); return
    }
    setError(null); setSuccess(false)
    changePasswordMutation.mutate(form, {
      onSuccess: () => setSuccess(true),
      onError:   (err) => setError(extractApiMessage(err)),
    })
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp}
        className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white mb-2">Update Password</h3>
        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label className="text-[#94A3B8]">Current Password</Label>
            <Input
              type="password"
              value={form.oldPassword}
              onChange={(e) => { setForm((p) => ({ ...p, oldPassword: e.target.value })); setError(null) }}
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#94A3B8]">New Password <span className="text-[#475569] text-xs">(min 10 chars + a number)</span></Label>
            <Input
              type="password"
              value={form.newPassword}
              onChange={(e) => { setForm((p) => ({ ...p, newPassword: e.target.value })); setError(null) }}
              className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F87171]/10 border border-[#F87171]/30 text-[#F87171] text-sm">
              <X className="h-4 w-4 shrink-0" />{error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#6EE7B7]/10 border border-[#6EE7B7]/30 text-[#6EE7B7] text-sm">
              <Check className="h-4 w-4 shrink-0" />Password updated — you will be signed out.
            </div>
          )}
          <Button
            onClick={handleChangePassword}
            disabled={changePasswordMutation.isPending}
            className="mt-2 bg-[#1E293B] hover:bg-[#313442] text-white"
          >
            {changePasswordMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Update Password
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}
        className="bg-[#F87171]/10 border border-[#F87171]/20 rounded-2xl p-6 lg:p-8">
        <h3 className="text-lg font-bold text-[#F87171] mb-2 flex items-center gap-2">
          <Trash2 className="h-5 w-5" /> Danger Zone
        </h3>
        <p className="text-sm text-[#F87171]/80 mb-4">
          Permanently delete your account and all associated earnings data. This action cannot be undone.
        </p>
        <Button variant="destructive" className="bg-[#F87171] text-white hover:bg-[#F87171]/90">
          Delete Account
        </Button>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Settings Page
// ─────────────────────────────────────────────────────────────────────────────
export default function WorkerSettingsPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="w-full h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        <PageHeader heading="Account Settings" />

        <div className="flex flex-col md:flex-row gap-8">
          <Tabs defaultValue="profile" className="flex-1 flex flex-col md:flex-row gap-8" orientation="vertical">
            <TabsList className="bg-transparent text-left justify-start items-stretch flex-col h-auto w-full md:w-64 shrink-0 space-y-1">
              <TabsTrigger value="profile" className={TAB_CLS}>
                <User className="h-4 w-4 mr-3" /> Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className={TAB_CLS}>
                <Bell className="h-4 w-4 mr-3" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className={TAB_CLS}>
                <Shield className="h-4 w-4 mr-3" /> Security
              </TabsTrigger>
              {/* Only workers can request a role change */}
              {user?.role === 'worker' && (
                <TabsTrigger value="role-request" className={TAB_CLS}>
                  <ArrowUpCircle className="h-4 w-4 mr-3" /> Role Request
                </TabsTrigger>
              )}
              <TabsTrigger value="data" className={TAB_CLS}>
                <Database className="h-4 w-4 mr-3" /> Data Export
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-w-0">
              <TabsContent value="profile" className="m-0 mt-0 focus-visible:ring-0">
                <ProfileTab />
              </TabsContent>

              <TabsContent value="notifications" className="m-0 mt-0 focus-visible:ring-0">
                <motion.div variants={fadeUp} initial="hidden" animate="visible"
                  className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white mb-2">Notification Preferences</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Verification Alerts', desc: 'Get notified when your shifts are verified or flagged.', defaultChecked: true },
                      { label: 'Community Updates', desc: 'Weekly digest of top complaints in your zone.', defaultChecked: true },
                      { label: 'Marketing Emails', desc: 'Receive offers and platform news.', defaultChecked: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-white text-base">{item.label}</Label>
                          <p className="text-sm text-[#94A3B8]">{item.desc}</p>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="security" className="m-0 mt-0 focus-visible:ring-0">
                <SecurityTab />
              </TabsContent>

              <TabsContent value="role-request" className="m-0 mt-0 focus-visible:ring-0">
                <RoleRequestTab />
              </TabsContent>

              <TabsContent value="data" className="m-0 mt-0 focus-visible:ring-0">
                <motion.div variants={fadeUp} initial="hidden" animate="visible"
                  className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Database className="h-5 w-5 text-[#00D4FF]" /> Export Data
                  </h3>
                  <p className="text-[#94A3B8] mb-6">
                    Download an archive of all your data on FairGig, including verification logs, shifts, and profile history.
                  </p>
                  <Button className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                    Request Archive
                  </Button>
                </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
