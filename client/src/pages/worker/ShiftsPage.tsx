import { Search, Filter, Download, Plus, Clock, Activity, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'

const MOCK_SHIFTS = [
  { id: 'SH-4092-1', platform: 'Careem', date: 'Oct 24, 2023', duration: '6.5h', income: 3450, tips: 150, bonus: 0, status: 'VERIFIED' },
  { id: 'SH-4091-8', platform: 'Bykea', date: 'Oct 23, 2023', duration: '4.0h', income: 1800, tips: 0, bonus: 200, status: 'PENDING' },
  { id: 'SH-4090-2', platform: 'Uber', date: 'Oct 23, 2023', duration: '6.0h', income: 2900, tips: 100, bonus: 0, status: 'VERIFIED' },
  { id: 'SH-4089-9', platform: 'Foodpanda', date: 'Oct 22, 2023', duration: '4.0h', income: 1450, tips: 50, bonus: 0, status: 'DISCREPANCY_FLAGGED' },
  { id: 'SH-4088-3', platform: 'inDrive', date: 'Oct 21, 2023', duration: '5.5h', income: 2750, tips: 0, bonus: 0, status: 'VERIFIED' },
  { id: 'SH-4087-4', platform: 'Careem', date: 'Oct 20, 2023', duration: '8.0h', income: 4200, tips: 300, bonus: 500, status: 'SELF_ATTESTED' },
  { id: 'SH-4086-5', platform: 'Uber', date: 'Oct 19, 2023', duration: '7.5h', income: 3800, tips: 250, bonus: 0, status: 'VERIFIED' },
] as const

const NAV_ITEMS: NavItem[] = [
  { icon: <Activity className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts', activeMatch: '/worker/shifts' },
  { icon: <ShieldCheck className="h-5 w-5" />, label: 'Certificates', href: '/worker/certificate' },
]

export default function WorkerShiftsPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          heading="Shift History"
          subtext="View, filter, and export all your recorded gig platform shifts."
          actions={
            <>
              <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
                <Link to="/worker/shifts/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Log New Shift
                </Link>
              </Button>
            </>
          }
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-[#1B1F2C] rounded-2xl border border-[#1E293B] overflow-hidden"
        >
          {/* ── Toolbar ── */}
          <div className="p-4 border-b border-[#1E293B] flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input 
                placeholder="Search shift ID or platform..." 
                className="pl-9 bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]/50"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto border-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-white/5">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {/* ── Table ── */}
          <Table>
            <TableHeader className="bg-[#111827]">
              <TableRow className="border-[#1E293B] hover:bg-transparent">
                <TableHead className="w-12 text-center">
                  <Checkbox className="border-[#313442] data-[state=checked]:bg-[#00D4FF] data-[state=checked]:text-[#0A0E1A]" />
                </TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10">Shift ID</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10">Platform</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10">Date</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Duration</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Income</TableHead>
                <TableHead className="text-[#94A3B8] font-medium h-10 text-right">Verification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_SHIFTS.map((shift) => (
                <TableRow key={shift.id} className="border-[#1E293B] hover:bg-white/5 transition-colors group">
                  <TableCell className="w-12 text-center">
                    <Checkbox className="border-[#313442] opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100 data-[state=checked]:bg-[#00D4FF] data-[state=checked]:text-[#0A0E1A] transition-opacity" />
                  </TableCell>
                  <TableCell className={`font-mono text-sm text-[#94A3B8] ${font.mono}`}>
                    <Link to={`/worker/shifts/${shift.id}`} className="hover:text-white transition-colors">
                      {shift.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <PlatformChip platform={shift.platform} />
                  </TableCell>
                  <TableCell className="text-[#F1F5F9]">{shift.date}</TableCell>
                  <TableCell className="text-right text-[#94A3B8]">{shift.duration}</TableCell>
                  <TableCell className={`text-right font-medium text-white ${font.mono}`}>
                    Rs {shift.income.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={shift.status as any} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* ── Pagination Footer ── */}
          <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-sm text-[#94A3B8]">
            <p>Showing 1 to 7 of 42 entries</p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled className="text-[#94A3B8]">Previous</Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/5">Next</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
