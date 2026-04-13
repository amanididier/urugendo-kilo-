"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Users, Ticket, ArrowRight, MapPin, Bus, TrendingUp, DollarSign, Calendar, ChevronRight, Search, CheckCircle, XCircle } from 'lucide-react';

const sampleSchedules = [
  {
    id: 'sched-1',
    route: 'Kigali → Musanze',
    departureTime: '08:00',
    arrivalTime: '10:30',
    date: '2026-04-13',
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
    date: '2026-04-13',
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
    date: '2026-04-13',
    price: 2500,
    availableSeats: 18,
    totalSeats: 36,
    bookedCount: 18,
    paperCount: 22,
    status: 'scheduled' as const,
    plateNumber: 'RAD 103C',
    operator: 'RITCO',
  },
];

const stats = {
  todayBookings: 156,
  todayRevenue: 434000,
  weekBookings: 892,
  weekRevenue: 2456000,
  totalBuses: 12,
  activeRoutes: 3,
};

const samplePassengers = [
  { name: 'Jean-Paul K.', seat: '3B', code: 'XK7P2Q', type: 'digital' as const, verified: false },
  { name: 'Marie U.', seat: '5A', code: 'MN8P4L', type: 'digital' as const, verified: true },
  { name: 'Pierre R.', seat: '7C', code: 'RT2W9K', type: 'digital' as const, verified: false },
  { name: 'Alice M.', seat: '2A', code: 'AB1C2D', type: 'paper' as const, verified: false },
  { name: 'Bob K.', seat: '4B', code: 'EF3G4H', type: 'paper' as const, verified: false },
];

export default function AgencyDashboard() {
  const [schedules] = useState(sampleSchedules);
  const [activeTab, setActiveTab] = useState<'today' | 'schedule' | 'reports' | 'verify'>('today');
  const [searchSeat, setSearchSeat] = useState('');
  const [passengers, setPassengers] = useState(samplePassengers);
  const [verifyResult, setVerifyResult] = useState<{found: boolean; passenger?: typeof samplePassengers[0]} | null>(null);

  const totalUrugendo = schedules.reduce((sum, s) => sum + s.bookedCount, 0);
  const totalPaper = schedules.reduce((sum, s) => sum + s.paperCount, 0);
  const totalRevenue = schedules.reduce((sum, s) => sum + (s.bookedCount + s.paperCount) * s.price, 0);

  const handleVerify = () => {
    if (!searchSeat.trim()) {
      setVerifyResult({ found: false });
      return;
    }
    const seat = searchSeat.toUpperCase().trim();
    const found = passengers.find(p => p.seat.toUpperCase() === seat);
    if (found) {
      setVerifyResult({ found: true, passenger: found });
    } else {
      setVerifyResult({ found: false });
    }
  };

  const toggleVerify = (seatCode: string) => {
    setPassengers(passengers.map(p => 
      p.code === seatCode ? { ...p, verified: !p.verified } : p
    ));
  };

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
        
        {/* Agency Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="bg-white/10 rounded-xl p-2 text-center">
            <div className="text-[16px] font-bold text-white">{stats.todayBookings}</div>
            <div className="text-[8px] text-white/70">Today</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2 text-center">
            <div className="text-[16px] font-bold text-white">{(stats.todayRevenue/1000).toFixed(0)}K</div>
            <div className="text-[8px] text-white/70">Revenue</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2 text-center">
            <div className="text-[16px] font-bold text-white">{stats.totalBuses}</div>
            <div className="text-[8px] text-white/70">Buses</div>
          </div>
          <div className="bg-white/10 rounded-xl p-2 text-center">
            <div className="text-[16px] font-bold text-white">{stats.activeRoutes}</div>
            <div className="text-[8px] text-white/70">Routes</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-xl p-1 border border-border flex">
          {(['today', 'schedule', 'verify', 'reports'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-colors ${
                activeTab === tab ? 'bg-primary text-white' : 'text-text-muted'
              }`}
            >
              {tab === 'today' ? 'Today' : tab === 'schedule' ? 'Schedule' : tab === 'verify' ? 'Verify' : 'Reports'}
            </button>
          ))}
        </div>
      </div>

      {/* Today Tab */}
      {activeTab === 'today' && (
        <div className="px-4 mt-4">
          {/* Revenue Card */}
          <div className="bg-gradient-to-r from-green-500 to-primary rounded-2xl p-4 text-white mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-white/70">Today's Revenue</span>
              <DollarSign size={18} className="text-white/70" />
            </div>
            <div className="text-[28px] font-extrabold">{stats.todayRevenue.toLocaleString()} RWF</div>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-white/80">
              <TrendingUp size={14} />
              <span>+12% from yesterday</span>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-white rounded-xl p-3 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ticket size={14} className="text-primary" />
                </div>
                <span className="text-[10px] text-text-muted">Urugendo</span>
              </div>
              <div className="text-[20px] font-bold text-primary">{totalUrugendo}</div>
              <div className="text-[9px] text-text-muted">Digital bookings</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Ticket size={14} className="text-amber-600" />
                </div>
                <span className="text-[10px] text-text-muted">Paper</span>
              </div>
              <div className="text-[20px] font-bold text-amber-600">{totalPaper}</div>
              <div className="text-[9px] text-text-muted">Manual tickets</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-white rounded-xl py-3 border border-border flex items-center justify-center gap-2">
              <Plus size={16} className="text-primary" />
              <span className="text-[12px] font-semibold text-text-primary">Add Trip</span>
            </button>
            <button className="bg-white rounded-xl py-3 border border-border flex items-center justify-center gap-2">
              <Users size={16} className="text-primary" />
              <span className="text-[12px] font-semibold text-text-primary">Add Passenger</span>
            </button>
          </div>
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="px-4 mt-4">
          <button className="w-full bg-primary text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold mb-4">
            <Plus size={18} />
            Add New Departure
          </button>

          <div className="space-y-3">
            {schedules.map((schedule, i) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-border overflow-hidden"
              >
                <div className="px-4 py-2 bg-surface-secondary flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-text-muted" />
                    <span className="text-[13px] font-bold text-text-primary">{schedule.departureTime}</span>
                    <span className="text-[11px] text-text-muted">→ {schedule.arrivalTime}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(schedule.status)}`}>
                    {schedule.status.toUpperCase()}
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-primary" />
                      <span className="text-[12px] font-semibold text-text-primary">{schedule.route}</span>
                    </div>
                    <span className="text-[10px] text-text-muted">{schedule.plateNumber}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-[14px] font-bold text-primary">{schedule.bookedCount}</div>
                        <div className="text-[8px] text-text-muted">Urugendo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[14px] font-bold text-amber-600">{schedule.paperCount}</div>
                        <div className="text-[8px] text-text-muted">Paper</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] font-bold text-text-primary">{(schedule.price * (schedule.bookedCount + schedule.paperCount)).toLocaleString()}</div>
                      <div className="text-[8px] text-text-muted">RWF</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Verify Tab */}
      {activeTab === 'verify' && (
        <div className="px-4 mt-4">
          {/* Quick Verify by Seat */}
          <div className="bg-white rounded-xl border border-border p-4 mb-4">
            <h3 className="text-[14px] font-bold text-text-primary mb-3">Quick Verify by Seat</h3>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={searchSeat}
                  onChange={(e) => setSearchSeat(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                  placeholder="Enter seat (e.g., 3B)"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-[14px]"
                />
              </div>
              <button
                onClick={handleVerify}
                className="bg-primary text-white px-4 rounded-xl font-bold"
              >
                Verify
              </button>
            </div>

            {/* Result */}
            {verifyResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-xl ${
                  verifyResult.found && verifyResult.passenger?.verified
                    ? 'bg-green-50 border border-green-200'
                    : verifyResult.found
                    ? 'bg-amber-50 border border-amber-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {verifyResult.found ? (
                  <div className="flex items-center gap-3">
                    {verifyResult.passenger?.verified ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <XCircle size={24} className="text-amber-600" />
                    )}
                    <div className="flex-1">
                      <div className="text-[14px] font-bold text-text-primary">{verifyResult.passenger?.name}</div>
                      <div className="text-[12px] text-text-muted">
                        Seat {verifyResult.passenger?.seat} • {verifyResult.passenger?.type === 'digital' ? 'Urugendo' : 'Paper'} Ticket
                      </div>
                    </div>
                    <button
                      onClick={() => toggleVerify(verifyResult.passenger!.code)}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${
                        verifyResult.passenger?.verified
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {verifyResult.passenger?.verified ? 'Unverify' : 'Mark Verified'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-red-600 text-[13px]">No passenger found with that seat</div>
                )}
              </motion.div>
            )}
          </div>

          {/* All Passengers */}
          <div className="bg-white rounded-xl border border-border p-4">
            <h3 className="text-[14px] font-bold text-text-primary mb-3">All Passengers Today</h3>
            <div className="space-y-2">
              {passengers.map((p, i) => (
                <div
                  key={p.code}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    p.verified ? 'bg-green-50' : 'bg-surface-secondary'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    p.type === 'digital' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {p.seat}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-text-primary">{p.name}</div>
                    <div className="text-[11px] text-text-muted">{p.type === 'digital' ? 'Urugendo' : 'Paper'}</div>
                  </div>
                  {p.verified ? (
                    <div className="flex items-center gap-1 text-green-600 text-[11px] font-bold">
                      <CheckCircle size={14} />
                      Verified
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleVerify(p.code)}
                      className="text-[11px] font-bold text-primary"
                    >
                      Verify
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="px-4 mt-4">
          <div className="bg-white rounded-xl border border-border p-4 mb-4">
            <h3 className="text-[14px] font-bold text-text-primary mb-3">Weekly Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-muted">Total Bookings</span>
                <span className="text-[14px] font-bold text-text-primary">{stats.weekBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-muted">Total Revenue</span>
                <span className="text-[14px] font-bold text-green-600">{stats.weekRevenue.toLocaleString()} RWF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-text-muted">Avg per Trip</span>
                <span className="text-[14px] font-bold text-text-primary">{Math.round(stats.weekRevenue/stats.weekBookings).toLocaleString()} RWF</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-white border border-border rounded-xl py-3 flex items-center justify-center gap-2">
            <Calendar size={16} className="text-text-muted" />
            <span className="text-[13px] font-semibold text-text-primary">Generate Report</span>
            <ChevronRight size={16} className="text-text-muted" />
          </button>
        </div>
      )}
    </div>
  );
}
