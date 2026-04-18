import { Activity, Clock, DollarSign, Target, Plus, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { KpiTile } from '@/components/shared/KpiTile'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const MOCK_SHIFTS = [
  { id: 'SH-4092-1', platform: 'Careem', date: 'Oct 24 • 09:00 - 15:30', amount: 3450, status: 'VERIFIED' },
  { id: 'SH-4091-8', platform: 'Bykea', date: 'Oct 23 • 18:00 - 22:00', amount: 1800, status: 'PENDING' },
  { id: 'SH-4090-2', platform: 'Uber', date: 'Oct 23 • 07:00 - 13:00', amount: 2900, status: 'VERIFIED' },
  { id: 'SH-4089-9', platform: 'Foodpanda', date: 'Oct 22 • 11:00 - 15:00', amount: 1450, status: 'DISCREPANCY_FLAGGED' },
] as const

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts', activeMatch: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificates', href: '/worker/certificate' },
  // Add rest in next steps...
]

export default function WorkerDashboardPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          heading="Welcome back, Ahad."
          subtext="Overview of your recent earnings and verification statuses."
          actions={
            <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Link to="/worker/shifts/new">
                <Plus className="h-4 w-4 mr-2" />
                Log New Shift
              </Link>
            </Button>
          }
        />

        {/* ── KPI Tiles ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <KpiTile
            icon={<DollarSign className="w-5 h-5" />}
            label="Verified Income"
            value={85400}
            prefix="Rs "
            trend={12}
            trendLabel="12% vs last month"
            accentColor="#6EE7B7"
          />
          <KpiTile
            icon={<Clock className="w-5 h-5" />}
            label="Pending Verification"
            value={14200}
            prefix="Rs "
            accentColor="#F59E0B"
          />
          <KpiTile
            icon={<Target className="w-5 h-5" />}
            label="Trust Score"
            value={92}
            suffix="%"
            trend={2}
            trendLabel="2% vs last month"
            accentColor="#00D4FF"
          />
          <KpiTile
            icon={<Activity className="w-5 h-5" />}
            label="Active Disputes"
            value={1}
            trend={-1}
            trendLabel="Down from 2"
            accentColor="#F87171"
          />
        </motion.div>

        {/* ── Recent Shifts Table ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] overflow-hidden"
        >
          <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
            <h2 className={`text-lg font-bold text-white ${font.display}`}>Recent Shifts</h2>
            <Button variant="ghost" size="sm" asChild className="text-[#00D4FF] hover:text-[#00D4FF] hover:bg-[#00D4FF]/10">
              <Link to="/worker/shifts">View All</Link>
            </Button>
          </div>
          
          <Table>
            <TableHeader className="bg-[#111827]">
              <TableRow className="border-[#1E293B] hover:bg-transparent">
                <TableHead className="text-[#94A3B8] font-medium h-10">Shift ID</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10">Platform</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10">Date & Time</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Amount (PKR)</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_SHIFTS.map((shift) => (
                <TableRow key={shift.id} className="border-[#1E293B] hover:bg-white/5 transition-colors">
                  <TableCell className={`font-mono text-sm text-[#94A3B8] ${font.mono}`}>
                    <Link to={`/worker/shifts/${shift.id}`} className="hover:text-white transition-colors">
                      {shift.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <PlatformChip platform={shift.platform} />
                  </TableCell>
                  <TableCell className="text-[#F1F5F9]">{shift.date}</TableCell>
                  <TableCell className={`text-right font-medium text-white ${font.mono}`}>
                    Rs {shift.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={shift.status as any} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  )
}
