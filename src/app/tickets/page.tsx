"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/app-context';

const tabs = ['Upcoming', 'Past', 'Cancelled'] as const;
type Tab = typeof tabs[number];

export default function TicketsPage() {
  const { bookings } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('Upcoming');

  const filtered = bookings.filter(b => {
    if (activeTab === 'Upcoming') return b.status === 'upcoming';
    if (activeTab === 'Past') return b.status === 'past';
    return b.status === 'cancelled';
  });

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Title */}
        <div className="pt-[60px] px-5 pb-4">
          <h1 className="text-[28px] font-extrabold text-text-primary">My Tickets</h1>
        </div>

        {/* Tab bar */}
        <div className="px-5 mb-4">
          <div className="relative flex bg-gray-100 rounded-xl p-1">
            <motion.div
              layoutId="ticket-tab"
              className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
              style={{
                width: `${100 / 3}%`,
                left: `${(tabs.indexOf(activeTab) * 100) / 3}%`,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[13px] font-semibold relative z-10 transition-colors ${
                  activeTab === tab ? 'text-text-primary' : 'text-text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket cards */}
        <div className="px-5 space-y-3">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16"
              >
                <div className="text-5xl mb-4">🎫</div>
                <p className="text-[14px] text-text-muted text-center">
                  {activeTab === 'Upcoming'
                    ? 'No upcoming trips. Book your next journey!'
                    : activeTab === 'Past'
                    ? 'No past trips yet'
                    : 'No cancelled tickets'}
                </p>
              </motion.div>
            ) : (
              filtered.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-xl border border-border p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[18px] font-bold text-text-primary">
                      {booking.trip.from} → {booking.trip.to}
                    </div>
                    <span className="text-[13px] font-semibold text-primary">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-text-muted flex-wrap">
                    <span>📅 {booking.trip.date}</span>
                    <span>🕐 {booking.trip.departureTime}</span>
                    <span>{booking.trip.operator.emoji} {booking.trip.operator.name}</span>
                    <span>💺 {booking.seat}</span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
