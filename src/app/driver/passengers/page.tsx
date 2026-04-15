"use client";

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { Users, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const samplePassengers = [
  { name: 'Jean-Paul K.', seat: '3B', code: 'XK7P2Q', status: 'pending' },
  { name: 'Marie U.', seat: '5A', code: 'MN8P4L', status: 'verified' },
  { name: 'Pierre R.', seat: '7C', code: 'RT2W9K', status: 'pending' },
  { name: 'Alice M.', seat: '2A', code: 'AB1C2D', status: 'verified' },
];

export default function DriverPassengersPage() {
  const router = useRouter();
  const { userRole } = useApp();
  const [passengers, setPassengers] = useState(samplePassengers);
  
  if (userRole !== 'driver') {
    router.push('/login');
    return null;
  }

  const verifyPassenger = (code: string) => {
    setPassengers(passengers.map(p => 
      p.code === code ? { ...p, status: 'verified' } : p
    ));
  };

  const pending = passengers.filter(p => p.status === 'pending');
  const verified = passengers.filter(p => p.status === 'verified');

  return (
    <div className="bg-white pb-[88px]">
      <div className="bg-primary pt-[60px] px-5 pb-5 rounded-b-[28px]">
        <button onClick={() => router.push('/driver')} className="mb-3">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="text-[24px] font-extrabold text-white">Passengers</h1>
        <p className="text-[13px] text-white/70">Verify passengers on board</p>
      </div>

      <div className="px-4 mt-4">
        {/* Search */}
        <input 
          type="text"
          placeholder="Search passenger or code..."
          className="w-full h-12 px-4 bg-surface-secondary rounded-xl border border-border text-[14px] mb-4"
        />

        {/* Pending */}
        <div className="mb-4">
          <h2 className="text-[14px] font-bold text-text-muted mb-2">Pending ({pending.length})</h2>
          {pending.map((p, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-3 mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                {p.seat}
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-text-primary">{p.name}</div>
                <div className="text-[12px] text-text-muted font-mono">{p.code}</div>
              </div>
              <button 
                onClick={() => verifyPassenger(p.code)}
                className="bg-primary text-white text-[12px] font-bold px-4 py-2 rounded-full"
              >
                Verify
              </button>
            </div>
          ))}
        </div>

        {/* Verified */}
        <div>
          <h2 className="text-[14px] font-bold text-green-600 mb-2">Verified ({verified.length})</h2>
          {verified.map((p, i) => (
            <div key={i} className="bg-green-50 rounded-xl border border-green-200 p-3 mb-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">
                {p.seat}
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-bold text-green-800">{p.name}</div>
                <div className="text-[12px] text-green-600 font-mono">{p.code}</div>
              </div>
              <CheckCircle size={20} className="text-green-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}