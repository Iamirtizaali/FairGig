import { Database, Play, Terminal, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { fadeUp } from '@/lib/motion'
import { font } from '@/lib/fonts'

const SEED_TASKS = [
  { id: 1, name: 'Clear Active Schema', status: 'DONE' },
  { id: 2, name: 'Migrate Core Network Models', status: 'DONE' },
  { id: 3, name: 'Seed SuperAdmin & Advocates', status: 'DONE' },
  { id: 4, name: 'Generate Mock Shift Data (100k+)', status: 'IN_PROGRESS' },
  { id: 5, name: 'Build Dispute Clustering Indices', status: 'PENDING' },
]

export default function AdminSeedPage() {
  return (
    <div className="w-full h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        <PageHeader
          heading="Database Seed & Reset"
          subtext="CAUTION: This interface runs massive automated generation jobs to simulate city-wide network activity for demonstration."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#F87171]/50 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#F87171]/10 rounded-full blur-3xl group-hover:bg-[#F87171]/20 transition-all" />
            <AlertTriangle className="h-8 w-8 text-[#F87171] mb-4" />
            <h3 className={`text-xl font-bold text-white mb-2 ${font.display}`}>NuClear Reset</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              Truncate all tables immediately. This action deletes all user records, shift logs, verifier scores, and advocate clusters locally.
            </p>
            <Button className="w-full bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/30 hover:bg-[#F87171]/20 font-bold">
              Execute Truncate
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#1B1F2C] border border-[#1E293B] rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#00D4FF]/10 rounded-full blur-3xl group-hover:bg-[#00D4FF]/20 transition-all" />
            <Database className="h-8 w-8 text-[#00D4FF] mb-4" />
            <h3 className={`text-xl font-bold text-white mb-2 ${font.display}`}>Demo Network Seed</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              Generate 15,000+ shifts, 28,000 users, and historical ML anomalies across 5 platforms spanning the last 6 months.
            </p>
            <Button className="w-full bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Play className="h-4 w-4 mr-2" /> Start Demo Seeder
            </Button>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="bg-[#0A0E1A] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col h-[400px]">
          <div className="bg-[#111827] border-b border-[#1E293B] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#94A3B8] text-sm font-medium">
              <Terminal className="h-4 w-4" /> Execution Progress Console
            </div>
            <div className="text-xs text-[#00D4FF] font-bold tracking-wider animate-pulse">RUNNING</div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {SEED_TASKS.map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  {task.status === 'DONE' && <CheckCircle className="h-5 w-5 text-[#6EE7B7]" />}
                  {task.status === 'IN_PROGRESS' && <RefreshCw className="h-5 w-5 text-[#00D4FF] animate-spin" />}
                  {task.status === 'PENDING' && <div className="h-5 w-5 rounded-full border-2 border-[#1E293B] shrink-0" />}
                  <span className={`text-sm ${task.status === 'PENDING' ? 'text-[#94A3B8]' : 'text-white'}`}>{task.name}</span>
                </div>
              ))}
            </div>
            
            <div className={`flex-1 bg-[#111827] rounded-xl border border-[#1E293B] p-4 text-xs text-[#6EE7B7] ${font.mono} overflow-y-auto`}>
              <div className="opacity-50">[INFO] Job initiated at 14:30:12</div>
              <div className="opacity-50">[INFO] Schema cleared mapping: success</div>
              <div className="opacity-50">[INFO] Core networks bound</div>
              <div className="opacity-50">[INFO] Creating 20 advocate instances</div>
              <div className="opacity-50">[INFO] Creating 45 verifier instances</div>
              <div className="text-[#00D4FF] mt-2 mb-1">» Generating Mock Shifts. Batch 1/100...</div>
              <div className="animate-pulse">Loading mock profiles to pg_bulk... 45%</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
