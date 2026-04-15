"use client";

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/app-context';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const sampleSchedule = [
  { id: 1, route: 'Kigali → Musanze', time: '08:00', status: 'completed' },
  { id: 2, route: 'Kigali → Musanze', time: '10:00', status: 'in-progress' },
  { id: 3, route: 'Kigali → Huye', time: '09:00', status: 'scheduled' },
  { id: 4, route: 'Kigali → Rubavu', time: '07:00', status: 'scheduled' },
];

export default function AgencySchedulePage() {
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
        <h1 className="text-[24px] font-extrabold text-white">Schedule</h1>
        <p className="text-[13px] text-white/70">Manage your trips</p>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {sampleSchedule.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[16px] font-bold text-text-primary">{trip.route}</span>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                trip.status === 'completed' ? 'bg-green-100 text-green-700' :
                trip.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {trip.status}
              </span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Clock size={14} />
              <span className="text-[14px]">{trip.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}