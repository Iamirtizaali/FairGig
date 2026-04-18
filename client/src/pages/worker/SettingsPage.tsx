import { Activity, Clock, ShieldCheck, User, Bell, Shield, Database, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fadeUp, staggerContainer } from '@/lib/motion'

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Settings', href: '/worker/settings', activeMatch: '/worker/settings' },
]

export default function WorkerSettingsPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        <PageHeader
          heading="Account Settings"
        />

        <div className="flex flex-col md:flex-row gap-8">
          <Tabs defaultValue="profile" className="flex-1 flex flex-col md:flex-row gap-8" orientation="vertical">
            <TabsList className="bg-transparent text-left justify-start items-stretch flex-col h-auto w-full md:w-64 shrink-0 space-y-1">
              <TabsTrigger 
                value="profile" 
                className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF] hover:bg-white/5 data-[state=active]:hover:bg-[#00D4FF]/10"
              >
                <User className="h-4 w-4 mr-3" /> Profile
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF] hover:bg-white/5 data-[state=active]:hover:bg-[#00D4FF]/10"
              >
                <Bell className="h-4 w-4 mr-3" /> Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF] hover:bg-white/5 data-[state=active]:hover:bg-[#00D4FF]/10"
              >
                <Shield className="h-4 w-4 mr-3" /> Security
              </TabsTrigger>
              <TabsTrigger 
                value="data" 
                className="justify-start px-4 py-3 rounded-xl data-[state=active]:bg-[#00D4FF]/10 data-[state=active]:text-[#00D4FF] hover:bg-white/5 data-[state=active]:hover:bg-[#00D4FF]/10"
              >
                <Database className="h-4 w-4 mr-3" /> Data Export
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 min-w-0">
              <TabsContent value="profile" className="m-0 mt-0 focus-visible:ring-0">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#94A3B8]">Full Name</Label>
                        <Input defaultValue="Ahad SE" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#94A3B8]">CNIC</Label>
                        <Input defaultValue="42201-1234567-8" disabled className="bg-[#111827] border-[#1E293B] text-[#94A3B8] opacity-70" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#94A3B8]">Email</Label>
                        <Input defaultValue="ahad@example.com" type="email" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#94A3B8]">Phone Number</Label>
                        <Input defaultValue="+92 300 1234567" type="tel" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-[#1E293B] flex justify-end">
                    <Button className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                      Save Changes
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="notifications" className="m-0 mt-0 focus-visible:ring-0">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white mb-2">Notification Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white text-base">Verification Alerts</Label>
                        <p className="text-sm text-[#94A3B8]">Get notified when your shifts are verified or flagged.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white text-base">Community Updates</Label>
                        <p className="text-sm text-[#94A3B8]">Weekly digest of top complaints in your zone.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white text-base">Marketing Emails</Label>
                        <p className="text-sm text-[#94A3B8]">Receive offers and platform news.</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="security" className="m-0 mt-0 focus-visible:ring-0">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={fadeUp} className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white mb-2">Update Password</h3>
                    <div className="space-y-4 max-w-sm">
                      <div className="space-y-2">
                        <Label className="text-[#94A3B8]">Current Password</Label>
                        <Input type="password" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#94A3B8]">New Password</Label>
                        <Input type="password" className="bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]" />
                      </div>
                      <Button className="mt-4 bg-[#1E293B] hover:bg-[#313442] text-white">Update Password</Button>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={fadeUp} className="bg-[#F87171]/10 border border-[#F87171]/20 rounded-2xl p-6 lg:p-8">
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
              </TabsContent>

              <TabsContent value="data" className="m-0 mt-0 focus-visible:ring-0">
                 <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 lg:p-8 space-y-6">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Database className="h-5 w-5 text-[#00D4FF]" /> Export Data
                    </h3>
                    <p className="text-[#94A3B8] mb-6">Download an archive of all your data on FairGig, including verification logs, shifts, and profile history.</p>
                    <Button className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">Request Archive</Button>
                 </motion.div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
