import { MessageSquare, AlertTriangle, CheckCircle, Clock, Plus, Search, ThumbsUp, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { font } from '@/lib/fonts'

const NAV_ITEMS: NavItem[] = [
  { icon: <MessageSquare className="h-5 w-5" />, label: 'Dashboard', href: '/worker/dashboard' },
  { icon: <Clock className="h-5 w-5" />, label: 'Shifts & Earnings', href: '/worker/shifts' },
  { icon: <MessageSquare className="h-5 w-5" />, label: 'Grievances', href: '/worker/grievances', activeMatch: '/worker/grievances' },
]

const MY_COMPLAINTS = [
  {
    id: 'G-2091',
    title: 'Unpaid waiting time at restaurant',
    platform: 'Foodpanda',
    status: 'In Progress',
    date: 'Oct 24, 2023',
    replies: 2,
  },
  {
    id: 'G-1084',
    title: 'Account suspended without reason',
    platform: 'Uber',
    status: 'Resolved',
    date: 'Oct 15, 2023',
    replies: 5,
  }
]

const COMMUNITY_BOARD = [
  {
    id: 'C-9921',
    author: 'Ali K.',
    zone: 'Karachi South',
    title: 'Careem blocking accounts for high cancellation rate despite traffic',
    upvotes: 142,
    comments: 34,
    time: '2h ago',
    tag: 'Unfair Deactivation'
  },
  {
    id: 'C-9920',
    author: 'Usman R.',
    zone: 'Lahore Central',
    title: 'InDrive commission increased beyond 10% silently?',
    upvotes: 89,
    comments: 12,
    time: '4h ago',
    tag: 'Commission Issue'
  }
]

export default function WorkerGrievancesPage() {
  const [activeTab, setActiveTab] = useState('my-complaints')

  return (
    <div className="w-full h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        <PageHeader
          heading="Grievances & Community"
          subtext="Report unfair practices, track your disputes, and see what other workers are discussing."
          actions={
            <Button className="bg-[#00D4FF] text-[#0A0E1A] hover:bg-[#00D4FF]/90 font-bold">
              <Plus className="h-4 w-4 mr-2" />
              File Complaint
            </Button>
          }
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-[#1B1F2C] border border-[#1E293B] p-1 rounded-xl h-auto mb-6">
            <TabsTrigger 
              value="my-complaints" 
              className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]"
            >
              My Complaints
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="rounded-lg px-6 py-2.5 data-[state=active]:bg-[#00D4FF] data-[state=active]:text-[#0A0E1A]"
            >
              Community Board
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'my-complaints' && (
                <div className="space-y-4">
                  {MY_COMPLAINTS.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="bg-[#1B1F2C] border border-[#1E293B] hover:border-[#313442] transition-colors rounded-xl p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full shrink-0 ${item.status === 'Resolved' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-[#00D4FF]/10 text-[#00D4FF]'}`}>
                          {item.status === 'Resolved' ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold ${font.mono} text-[#94A3B8]`}>{item.id}</span>
                            <Badge variant="outline" className="text-xs border-[#1E293B] text-[#94A3B8] font-normal">{item.platform}</Badge>
                          </div>
                          <h3 className="text-white font-medium mb-1">{item.title}</h3>
                          <p className="text-sm text-[#94A3B8]">Filed on {item.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 sm:flex-col sm:items-end">
                        <Badge 
                          className={item.status === 'Resolved' ? 'bg-[#6EE7B7]/20 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 border-none' : 'bg-[#00D4FF]/20 text-[#00D4FF] hover:bg-[#00D4FF]/20 border-none'}
                        >
                          {item.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-[#94A3B8]">
                          <MessageSquare className="h-4 w-4" />
                          <span>{item.replies} replies</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'community' && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                      <Input 
                        placeholder="Search community discussions..." 
                        className="pl-9 bg-[#111827] border-[#1E293B] text-white w-full focus-visible:ring-[#00D4FF]"
                      />
                    </div>
                    <Button variant="outline" className="border-[#1E293B] text-white hover:bg-white/5 shrink-0">
                      Sort by Trending
                    </Button>
                  </div>

                  {/* Feed */}
                  <div className="space-y-4">
                    {COMMUNITY_BOARD.map((item) => (
                      <motion.div 
                        key={item.id}
                        className="bg-[#111827] border border-[#1E293B] hover:border-[#313442] transition-colors rounded-xl p-5 group cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="outline" className="bg-[#1B1F2C] border-[#1E293B] text-[#94A3B8] font-normal">
                            {item.tag}
                          </Badge>
                          <span className="text-xs text-[#94A3B8]">{item.time}</span>
                        </div>
                        
                        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-4">
                          <span className="font-medium text-[#c0cad6]">{item.author}</span>
                          <span>•</span>
                          <span>{item.zone}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-[#94A3B8] pt-4 border-t border-[#1E293B]">
                          <button className="flex items-center gap-1.5 hover:text-[#00D4FF] transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{item.upvotes}</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-[#00D4FF] transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>{item.comments} discussions</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}
