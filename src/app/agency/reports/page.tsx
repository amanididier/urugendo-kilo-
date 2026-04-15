"use client";

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { FileText, Download, Share, ArrowLeft } from 'lucide-react';

export default function AgencyReportsPage() {
  const router = useRouter();
  const { userRole } = useApp();
  
  if (userRole !== 'agent') {
    router.push('/login');
    return null;
  }

  return (
    <div className="bg-white pb-[88px]">
      <div className="bg-primary pt-[60px] px-5 pb-5 rounded-b-[28px]">
        <button onClick={() => router.push('/agency')} className="mb-3">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-[24px] font-extrabold text-white">Reports</h1>
        <p className="text-[13px] text-white/70">View and export reports</p>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl border border-border p-4 mb-4">
          <h2 className="text-[16px] font-bold text-text-primary mb-3">Today's Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[24px] font-bold text-primary">23</div>
              <div className="text-[12px] text-text-muted">Urugendo</div>
            </div>
            <div>
              <div className="text-[24px] font-bold text-amber-600">17</div>
              <div className="text-[12px] text-text-muted">Paper</div>
            </div>
            <div>
              <div className="text-[24px] font-bold text-text-primary">40</div>
              <div className="text-[12px] text-text-muted">Total</div>
            </div>
            <div>
              <div className="text-[24px] font-bold text-green-600">140K</div>
              <div className="text-[12px] text-text-muted">Revenue</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2">
            <Download size={18} />
            <span className="text-[14px] font-bold">Export PDF</span>
          </button>
          <button className="flex-1 bg-green-500 text-white py-3 rounded-xl flex items-center justify-center gap-2">
            <Share size={18} />
            <span className="text-[14px] font-bold">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}