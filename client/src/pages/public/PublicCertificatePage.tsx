import { Printer, ShieldCheck, CheckCircle, Clock, MapPin, Download, AlertTriangle } from 'lucide-react'
import { useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { font } from '@/lib/fonts'
import { PlatformChip } from '@/components/shared/PlatformChip'
import { Button } from '@/components/ui/button'

export default function PublicCertificatePage() {
  const { signedId } = useParams()
  
  // Dummy data based on the route or state
  const isExpired = false
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] p-4 sm:p-8 flex items-center justify-center font-sans relative">
      {/* Watermark / Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83-54.627 54.627-.83-.83zM0 54.627l.83.83L60 .83l-.83-.83z\' fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }} />
      
      <div className="max-w-3xl w-full relative">
        {/* Print / Download Controls (Hidden in print) */}
        <div className="flex justify-end gap-3 mb-6 print:hidden">
          <Button variant="outline" className="bg-white border-[#CBD5E1] text-[#334155] shadow-sm hover:bg-[#F1F5F9]">
            <Download className="h-4 w-4 mr-2" /> Download PDF
          </Button>
          <Button onClick={() => window.print()} className="bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm">
            <Printer className="h-4 w-4 mr-2" /> Print Document
          </Button>
        </div>

        {/* Certificate Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-none sm:rounded-2xl shadow-xl border border-[#E2E8F0] p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Status Banner */}
          {isExpired ? (
            <div className="absolute top-0 left-0 right-0 bg-[#FEF2F2] text-[#B91C1C] text-center p-2 text-sm font-bold flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4" /> This verification certificate has expired.
            </div>
          ) : (
             <div className="absolute top-0 right-0 w-32 h-32 bgGradient translate-x-16 -translate-y-16 rotate-45 transform" />
          )}

          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-8 mb-8 mt-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-6 w-6 text-[#00D4FF]" />
                <span className={`text-[#0F172A] font-bold tracking-tight text-xl ${font.display}`}>FairGig Framework</span>
              </div>
              <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mt-4 uppercase">Verification Certificate</h1>
              <p className="text-[#64748B] text-sm mt-1">Official Proof of Earnings & Work Duration</p>
            </div>
            
            {/* QR Code Placeholder */}
            <div className="w-24 h-24 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-2 flex items-center justify-center flex-col shrink-0">
               <div className="grid grid-cols-3 grid-rows-3 gap-0.5 w-full h-full opacity-50">
                  {/* Fake QR pattern */}
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`bg-[#0F172A] ${i % 2 === 0 ? 'rounded-tl' : ''} ${i === 4 ? 'opacity-0' : ''}`} />
                  ))}
               </div>
            </div>
          </div>

          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider mb-1">Certificate Issued To</h3>
              <p className={`text-xl font-bold text-[#0F172A] ${font.display}`}>Zain V.</p>
              <p className={`text-sm text-[#475569] font-mono mt-1`}>National ID: *****-***891-2</p>
            </div>
            <div>
              <h3 className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider mb-1">Signed Identifier</h3>
              <p className={`text-sm font-medium text-[#0F172A] ${font.mono}`}>{signedId || 'cert_9x8f7a2bcd4e'}</p>
              <div className="flex items-center gap-1 mt-2 text-[#059669] text-xs font-bold bg-[#D1FAE5] w-max px-2 py-1 rounded">
                <CheckCircle className="h-3 w-3" /> VERIFIED BY CONSENSUS
              </div>
            </div>
          </div>

          {/* Shift Details */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 mb-8">
            <h3 className="font-bold text-[#0F172A] mb-4 border-b border-[#E2E8F0] pb-2 text-sm uppercase tracking-wider">Shift Particulars</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-semibold"><Clock className="h-3 w-3" /> Date</span>
                <p className="font-medium text-[#0F172A]">Oct 24, 2023</p>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-semibold"><Clock className="h-3 w-3" /> Duration</span>
                <p className="font-medium text-[#0F172A]">6 hrs 30 mins</p>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-xs text-[#64748B] mb-1 font-semibold"><MapPin className="h-3 w-3" /> Zone</span>
                <p className="font-medium text-[#0F172A]">Saddar / District S.</p>
              </div>
              <div>
                <span className="block text-xs text-[#64748B] mb-1 font-semibold">Platform</span>
                <PlatformChip platform="Careem" />
              </div>
            </div>
          </div>

          {/* Financials */}
          <div className="mb-10">
            <h3 className="font-bold text-[#0F172A] mb-4 border-b border-[#E2E8F0] pb-2 text-sm uppercase tracking-wider">Financial Summary</h3>
            <div className="flex items-end justify-between py-2 border-b border-[#E2E8F0] border-dashed">
              <span className="text-[#475569] font-medium text-sm">Initial Gross Earnings (Declared)</span>
              <span className={`text-[#0F172A] font-medium font-mono`}>Rs 4,600.00</span>
            </div>
            <div className="flex items-end justify-between py-2 border-b border-[#E2E8F0] border-dashed">
              <span className="text-[#475569] font-medium text-sm">Platform Commission / Fees Deducted</span>
              <span className={`text-[#DC2626] font-medium font-mono`}>-Rs 1,150.00</span>
            </div>
            <div className="flex items-end justify-between py-4 mt-2">
              <span className="text-[#0F172A] font-bold text-lg">Net Hourly Average</span>
              <span className={`text-[#059669] font-bold text-2xl font-mono`}>Rs 530.76 / hr</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-[#E2E8F0]">
            <p className="text-[10px] text-[#94A3B8] leading-relaxed max-w-lg mx-auto">
              This document was generated automatically by the FairGig Decentralized Trust Framework. Its authenticity can be verified cryptographically by scanning the embedded QR code or visiting fairgig.org/verify. 
              <br/><br/>
              Document Hash: <span className={font.mono}>e3adc...98f</span>
            </p>
          </div>

        </motion.div>
        
        {/* App Link */}
        <div className="text-center mt-8 print:hidden">
           <Link to="/auth/sign-in" className="text-[#64748B] text-sm hover:text-[#0F172A] font-medium inline-flex items-center">
             Go to FairGig App
           </Link>
        </div>
      </div>
    </div>
  )
}
