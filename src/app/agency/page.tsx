"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Users, Ticket, ArrowRight, MapPin, Bus } from 'lucide-react';
import { t } from '@/lib/translations';
import { useApp } from '@/context/app-context';

const sampleSchedules = [
  {
    id: 'sched-1',
    route: 'Kigali → Musanze',
    departureTime: '08:00',
    arrivalTime: '10:30',
    date: '2026-04-12',
    price: 3500,
    availableSeats: 12,
    totalSeats: 36,
    bookedCount: 24,
    paperCount: 8,
    status: 'boarding' as const,
    plateNumber: 'RAD 101A',
    operator: 'Volcano Express',
  },
  {
    id: 'sched-2',
    route: 'Kigali → Musanze',
    departureTime: '10:00',
    arrivalTime: '12:30',
    date: '2026-04-12',
    price: 3500,
    availableSeats: 28,
    totalSeats: 36,
    bookedCount: 8,
    paperCount: 15,
    status: 'scheduled' as const,
    plateNumber: 'RAD 102B',
    operator: 'Volcano Express',
  },
  {
    id: 'sched-3',
    route: 'Kigali → Huye',
    departureTime: '09:00',
    arrivalTime: '11:15',
    date: '2026-04-12',
    price: 2500,
    availableSeats: 18,
    totalSeats: 36,
    bookedCount: 18,
    paperCount: 22,
    status: 'scheduled' as const,
    plateNumber: 'RAD 103C',
    operator: 'RITCO',
  },
  {
    id: 'sched-4',
    route: 'Kigali → Rubavu',
    departureTime: '07:00',
    arrivalTime: '10:00',
    date: '2026-04-12',
    price: 4000,
    availableSeats: 5,
    totalSeats: 36,
    bookedCount: 31,
    paperCount: 12,
    status: 'departed' as const,
    plateNumber: 'RAD 104D',
    operator: 'Virunga Express',
  },
];

export default function AgencyDashboard() {
  const { language } = useApp();
  const [schedules, setSchedules] = useState(sampleSchedules);
  const [activeTab, setActiveTab] = useState<'today' | 'all'>('today');

  const totalUrugendo = schedules.reduce((sum, s) => sum + s.bookedCount, 0);
  const totalPaper = schedules.reduce((sum, s) => sum + s.paperCount, 0);
  const totalRevenue = schedules.reduce((sum, s) => sum + (s.bookedCount + s.paperCount) * s.price, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding': return 'bg-green-100 text-green-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'departed': return 'bg-gray-100 text-gray-600';
      case 'arrived': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'boarding': return 'Boarding';
      case 'scheduled': return 'Scheduled';
      case 'departed': return 'Departed';
      case 'arrived': return 'Arrived';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="bg-surface-secondary pb-[88px]">
      {/* Header */}
      <div className="bg-primary pt-[60px] px-5 pb-5 rounded-b-[28px]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            🏢
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold text-white">Agency Dashboard</h1>
            <p className="text-[12px] text-white/70">Volcano Express</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-3">
        <div className="grid grid-cols-3 gap-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-3 border border-border"
          >
            <div className="text-[24px] font-bold text-primary">{totalUrugendo}</div>
            <div className="text-[10px] text-text-muted">Urugendo</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-3 border border-border"
          >
            <div className="text-[24px] font-bold text-amber-500">{totalPaper}</div>
            <div className="text-[10px] text-text-muted">Paper</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-3 border border-border"
          >
            <div className="text-[20px] font-bold text-text-primary">{(totalRevenue / 1000).toFixed(0)}K</div>
            <div className="text-[10px] text-text-muted">Revenue</div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <button className="w-full bg-primary text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold">
          <Plus size={18} />
          Add New Departure
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 bg-white rounded-xl p-1 border border-border">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
              activeTab === 'today' ? 'bg-primary text-white' : 'text-text-muted'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-colors ${
              activeTab === 'all' ? 'bg-primary text-white' : 'text-text-muted'
            }`}
          >
            All Routes
          </button>
        </div>
      </div>

      {/* Schedule List */}
      <div className="px-4 mt-4 space-y-3">
        {schedules.map((schedule, i) => (
          <motion.div
            key={schedule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-surface-secondary flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-text-muted" />
                <span className="text-[14px] font-bold text-text-primary">{schedule.departureTime}</span>
                <span className="text-[12px] text-text-muted">→ {schedule.arrivalTime}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(schedule.status)}`}>
                {getStatusLabel(schedule.status)}
              </span>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  <span className="text-[13px] font-semibold text-text-primary">{schedule.route}</span>
                </div>
                <span className="text-[11px] text-text-muted">{schedule.plateNumber}</span>
              </div>

              {/* Seats */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-text-muted">Available Seats</span>
                  <span className="font-bold text-text-primary">{schedule.availableSeats}/{schedule.totalSeats}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${((schedule.totalSeats - schedule.availableSeats) / schedule.totalSeats) * 100}%` }}
                  />
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Ticket size={12} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-primary">{schedule.bookedCount}</div>
                    <div className="text-[9px] text-text-muted">Urugendo</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    <Ticket size={12} className="text-amber-600" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-amber-600">{schedule.paperCount}</div>
                    <div className="text-[9px] text-text-muted">Paper</div>
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-[14px] font-bold text-text-primary">{(schedule.price * (schedule.bookedCount + schedule.paperCount)).toLocaleString()} RWF</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <div className="px-4 mt-4 pb-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Bus size={18} className="text-blue-600" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-blue-800">Booking Insight</div>
              <div className="text-[11px] text-blue-600 mt-1">
                {totalUrugendo > totalPaper 
                  ? `Urugendo bookings are leading! ${Math.round((totalUrugendo / (totalUrugendo + totalPaper)) * 100)}% of your customers book digitally.`
                  : `Paper tickets still popular. Consider promoting Urugendo to increase digital bookings.`
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}