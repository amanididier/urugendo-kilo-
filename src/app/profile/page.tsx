"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronRight, Users, CreditCard, Bell, Globe, HelpCircle, LogOut } from 'lucide-react';
import { useApp } from '@/context/app-context';

const menuItems = [
  { icon: Users, label: 'Saved Passengers', bg: 'bg-purple-100', color: 'text-purple-600' },
  { icon: CreditCard, label: 'Payment Methods', bg: 'bg-yellow-100', color: 'text-yellow-600' },
  { icon: Bell, label: 'Notifications', bg: 'bg-yellow-100', color: 'text-yellow-600' },
  { icon: Globe, label: 'Language', bg: 'bg-teal-100', color: 'text-teal-600', value: 'EN / RW' },
  { icon: HelpCircle, label: 'Help & Support', bg: 'bg-pink-100', color: 'text-pink-600' },
];

export default function ProfilePage() {
  const { bookings } = useApp();

  const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
  const totalTrips = bookings.filter(b => b.status === 'past').length + upcomingCount;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center pt-[70px] pb-4"
        >
          <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center mb-3">
            <span className="text-[24px] font-bold text-white">JP</span>
          </div>
          <h1 className="text-[20px] font-bold text-text-primary">Jean-Paul K.</h1>
          <p className="text-[14px] text-text-muted">+250 789 123 456</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-5 bg-white rounded-xl border border-border flex mb-5"
        >
          <div className="flex-1 py-4 text-center">
            <div className="text-[26px] font-bold text-text-primary">{upcomingCount}</div>
            <div className="text-[12px] text-text-muted">Upcoming</div>
          </div>
          <div className="w-px bg-border" />
          <div className="flex-1 py-4 text-center">
            <div className="text-[26px] font-bold text-accent">{totalTrips}</div>
            <div className="text-[12px] text-text-muted">Total Trips</div>
          </div>
          <div className="w-px bg-border" />
          <div className="flex-1 py-4 text-center">
            <div className="text-[26px] font-bold text-primary">4.8</div>
            <div className="text-[12px] text-text-muted">Rating ★</div>
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-5 bg-white rounded-xl border border-border overflow-hidden"
        >
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50 transition-colors text-left ${
                  i < menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className={`w-[48px] h-[48px] rounded-xl ${item.bg} flex items-center justify-center`}>
                  <Icon size={22} className={item.color} />
                </div>
                <span className="flex-1 text-[15px] font-medium text-text-primary">{item.label}</span>
                {item.value && (
                  <span className="text-[13px] text-text-muted mr-1">{item.value}</span>
                )}
                <ChevronRight size={18} className="text-text-muted" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mx-5 mt-4"
        >
          <button className="w-full flex items-center justify-center gap-2 py-3.5 text-badge-red-text font-semibold text-[15px] active:bg-red-50 rounded-xl transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
}
