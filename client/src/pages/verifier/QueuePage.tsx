import { Users, Clock, History, Search, Filter, CheckCircle, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { KpiTile } from '@/components/shared/KpiTile'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { font } from '@/lib/fonts'

const NAV_ITEMS: NavItem[] = [
  { icon: <Users className="h-5 w-5" />, label: 'Verification Queue', href: '/verify/queue', activeMatch: '/verify/queue' },
  { icon: <History className="h-5 w-5" />, label: 'My History', href: '/verify/history' },
]

const QUEUE_DATA = [
  {
    id: 'SH-4092-1',
    workerId: 'W-9124',
    platform: 'Careem',
    submittedAt: '10 mins ago',
    amount: 'Rs 3,600',
    slaScore: 'High', // meaning SLA is close to breaching
    slaTime: '1h 50m left',
  },
  {
    id: 'SH-4091-8',
    workerId: 'W-1084',
    platform: 'Uber',
    submittedAt: '45 mins ago',
    amount: 'Rs 1,200',
    slaScore: 'Critical',
    slaTime: '15m left',
  },
  {
    id: 'SH-4093-2',
    workerId: 'W-0021',
    platform: 'inDrive',
    submittedAt: '2 hours ago',
    amount: 'Rs 8,500',
    slaScore: 'Low',
    slaTime: '22h 10m left',
  },
  {
    id: 'SH-4094-5',
    workerId: 'W-8812',
    platform: 'foodpanda',
    submittedAt: '5 mins ago',
    amount: 'Rs 950',
    slaScore: 'High',
    slaTime: '1h 55m left',
  }
]

export default function VerifierQueuePage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          heading="Verification Queue"
          subtext="Review incoming shifts. Prioritize critical SLAs to maintain your verifier score."
        />

        {/* ── KPIs ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUp}>
            <KpiTile label="Pending in Queue" value={124} icon={<Users />} trend={12} trendLabel="up from yeserday" accentColor="#00D4FF" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Critical SLAs (<1h)" value={18} icon={<AlertTriangle />} trend={5} trendLabel="up from yeserday" accentColor="#F87171" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <KpiTile label="Your Today's Review Count" value={45} icon={<CheckCircle />} trend={15} trendLabel="up from yesterday" accentColor="#6EE7B7" />
          </motion.div>
        </motion.div>

        {/* ── Queue List ── */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl overflow-hidden mt-6">
          {/* Controls */}
          <div className="p-4 border-b border-[#1E293B] flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
              <Input 
                placeholder="Search by Shift ID or Worker..." 
                className="pl-9 bg-[#111827] border-[#1E293B] text-white focus-visible:ring-[#00D4FF]"
              />
            </div>
            <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-[#1E293B] bg-[#111827]/50 text-xs uppercase text-[#94A3B8] tracking-wider">
                  <th className="p-4 font-semibold">Shift Info</th>
                  <th className="p-4 font-semibold">Platform</th>
                  <th className="p-4 font-semibold">Reported Earnings</th>
                  <th className="p-4 font-semibold">Time Remaining (SLA)</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {QUEUE_DATA.map((shift) => (
                  <tr key={shift.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className={`text-white font-medium ${font.mono}`}>{shift.id}</span>
                        <span className="text-xs text-[#94A3B8] mt-0.5">Worker: {shift.workerId}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <PlatformChip platform={shift.platform} />
                    </td>
                    <td className="p-4">
                      <span className={`text-white font-mono`}>{shift.amount}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {shift.slaScore === 'Critical' ? (
                          <AlertTriangle className="h-4 w-4 text-[#F87171]" />
                        ) : shift.slaScore === 'High' ? (
                          <Clock className="h-4 w-4 text-[#F59E0B]" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-[#6EE7B7]" />
                        )}
                        <span className={`text-sm font-medium ${
                          shift.slaScore === 'Critical' ? 'text-[#F87171]' : 
                          shift.slaScore === 'High' ? 'text-[#F59E0B]' : 'text-[#6EE7B7]'
                        }`}>
                          {shift.slaTime}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button asChild className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/verify/${shift.id}`}>
                          Review Shift
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-[#1E293B] flex items-center justify-between text-sm text-[#94A3B8]">
            <span>Showing 1 to 4 of 124 shifts</span>
            <div className="flex gap-2">
              <Button disabled variant="outline" size="sm" className="border-[#1E293B] text-white/50 bg-transparent">Previous</Button>
              <Button variant="outline" size="sm" className="border-[#1E293B] text-white hover:bg-white/5 bg-[#1B1F2C]">Next</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
