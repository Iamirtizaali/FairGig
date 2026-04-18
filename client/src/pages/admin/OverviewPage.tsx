import { Activity, Users, ShieldAlert, Database, CheckCircle, StopCircle, RefreshCw, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'System Overview', href: '/admin/overview', activeMatch: '/admin/overview' },
  { icon: <Database className="h-5 w-5" />, label: 'Platforms & Config', href: '/admin/platforms', activeMatch: '/admin/platforms' },
  { icon: <Users className="h-5 w-5" />, label: 'User Directory', href: '/admin/users', activeMatch: '/admin/users' },
  { icon: <ShieldAlert className="h-5 w-5" />, label: 'Fraud & Audit', href: '/admin/audit', activeMatch: '/admin/audit' },
  { icon: <RefreshCw className="h-5 w-5" />, label: 'Network Seed', href: '/admin/seed', activeMatch: '/admin/seed' },
]

const ROLE_REQUESTS = [
  { id: 'REQ-881', user: 'Zain V.', role: 'Verifier', status: 'Pending Review', submitted: '2 hrs ago' },
  { id: 'REQ-882', user: 'Ali (Advocate)', role: 'Advocate', status: 'Verification', submitted: '1 day ago' },
  { id: 'REQ-880', user: 'Sarah K.', role: 'Verifier', status: 'Pending Review', submitted: '3 days ago' },
]

export default function AdminOverviewPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          heading="Admin Control Center"
          subtext="Monitor system health, manage role upgrade requests, and view root-level activity."
        />

        {/* ── System Health Bar ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6EE7B7]"></span>
             </div>
             <span className={`text-sm font-bold text-white uppercase tracking-wider ${font.display}`}>All Systems Operational</span>
          </div>
          <div className="flex gap-6 text-sm">
             <div className="flex flex-col">
               <span className="text-[#94A3B8]">API Uptime</span>
               <span className="text-white font-mono font-medium">99.99%</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[#94A3B8]">Database Load</span>
               <span className="text-white font-mono font-medium">24%</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[#94A3B8]">Verification Lag</span>
               <span className="text-white font-mono font-medium">1.2s</span>
             </div>
          </div>
        </motion.div>

        {/* ── KPIs ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={fadeUp}>
            <KpiTile label="Total Users" value={28450} icon={<Users />} trend={1250} trendLabel="this month" accentColor="#00D4FF" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Pending Verifiers" value={45} icon={<ShieldAlert />} trend={5} trendLabel="since yesterday" accentColor="#F59E0B" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Fraud Detections" value={12} icon={<AlertTriangle />} trend={-2} trendLabel="vs last week" accentColor="#F87171" className="ring-1 ring-[#F87171]/20" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Active Advocates" value={14} icon={<CheckCircle />} trend={0} trendLabel="no change" accentColor="#6EE7B7" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ── Role Requests ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden">
             <div className="p-5 border-b border-[#1E293B] flex justify-between items-center bg-[#111827]">
               <h3 className={`text-lg font-bold text-white ${font.display}`}>Role Escalation Requests</h3>
               <Badge className="bg-[#F59E0B]/20 text-[#F59E0B] border-none">45 Pending</Badge>
             </div>
             <div className="flex-1 p-5 space-y-4">
               {ROLE_REQUESTS.map(req => (
                 <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0A0E1A] rounded-xl border border-[#1E293B]">
                   <div className="mb-3 sm:mb-0">
                     <div className="font-bold text-white mb-1">{req.user}</div>
                     <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <span className={font.mono}>{req.id}</span>
                        <span>•</span>
                        <span>Requested: <strong className="text-white font-medium">{req.role}</strong></span>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     <Button variant="outline" size="sm" className="border-[#F87171]/30 text-[#F87171] hover:bg-[#F87171]/10">
                       <StopCircle className="h-4 w-4 mr-2" /> Deny
                     </Button>
                     <Button size="sm" className="bg-[#6EE7B7] text-[#0A0E1A] hover:bg-[#6EE7B7]/90 font-bold">
                       Review Details
                     </Button>
                   </div>
                 </div>
               ))}
               <Button variant="ghost" className="w-full text-[#00D4FF] hover:bg-[#00D4FF]/10 mt-2">
                 View All Requests
               </Button>
             </div>
          </motion.div>
          
          {/* ── System Audit Log (Preview) ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl flex flex-col overflow-hidden">
             <div className="p-5 border-b border-[#1E293B] flex justify-between items-center bg-[#111827]">
               <h3 className={`text-lg font-bold text-white ${font.display}`}>Recent Root Audit</h3>
             </div>
             <div className="flex-1 p-5 space-y-4">
               {[
                 { action: 'UPDATE_PLATFORM_FEE', user: 'admin_sys', target: 'Careem', time: '10 mins ago', type: 'warn' },
                 { action: 'CREATE_ZONE', user: 'admin_sys', target: 'Lyari_Zone_B', time: '2 hrs ago', type: 'info' },
                 { action: 'PROMOTE_USER', user: 'admin_sys', target: 'W-9124_to_VERIFIER', time: '5 hrs ago', type: 'info' },
                 { action: 'SYS_BACKUP_FAIL', user: 'system', target: 'db_cluster_02', time: '1 day ago', type: 'danger' },
               ].map((log, i) => (
                 <div key={i} className="flex items-start gap-3 pb-4 border-b border-[#1E293B]/50 last:border-0 last:pb-0">
                    <div className={`mt-0.5 w-2 h-2 rounded-full ${
                      log.type === 'danger' ? 'bg-[#F87171] shadow-[0_0_8px_#F87171]' :
                      log.type === 'warn' ? 'bg-[#F59E0B]' : 'bg-[#00D4FF]'
                    }`} />
                    <div className="flex-1">
                      <div className={`text-sm font-bold text-white ${font.mono}`}>{log.action}</div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-[#94A3B8]">Target: <span className="text-white">{log.target}</span></span>
                        <span className="text-[#94A3B8]">{log.time}</span>
                      </div>
                    </div>
                 </div>
               ))}
               <Button variant="ghost" className="w-full text-[#00D4FF] hover:bg-[#00D4FF]/10 mt-2">
                 Open Full Audit Log
               </Button>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
