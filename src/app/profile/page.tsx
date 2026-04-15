"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Users, CreditCard, Bell, Globe, HelpCircle, LogOut, X, Bus, User, ArrowRightLeft } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { t } from '@/lib/translations';

export default function ProfilePage() {
  const router = useRouter();
  const { bookings, language, setLanguage, setChatOpen, userRole, setUserRole } = useApp();
  const [pitchMode, setPitchMode] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
  const totalTrips = bookings.filter(b => b.status === 'past').length + upcomingCount;

  const handleLanguageToggle = () => {
    setLanguage(language === 'EN' ? 'RW' : 'EN');
  };

  const handleMenuClick = (label: string) => {
    if (label === t('language', language)) {
      handleLanguageToggle();
    } else if (label === t('helpSupport', language)) {
      setChatOpen(true);
    }
  };

  const menuItems = [
    { icon: Users, label: t('savedPassengers', language), bg: 'bg-purple-100', color: 'text-purple-600' },
    { icon: CreditCard, label: t('paymentMethods', language), bg: 'bg-yellow-100', color: 'text-yellow-600' },
    { icon: Bell, label: t('notifications', language), bg: 'bg-orange-100', color: 'text-orange-500' },
    { icon: Globe, label: t('language', language), bg: 'bg-teal-100', color: 'text-teal-600', value: language === 'EN' ? 'EN / RW' : 'RW / EN', action: handleLanguageToggle },
    { icon: HelpCircle, label: t('helpSupport', language), bg: 'bg-pink-100', color: 'text-pink-600', action: () => setChatOpen(true) },
  ];

  return (
    <div className="bg-white pb-[100px]">
      {/* Green header with avatar */}
      <div className="bg-primary pt-[60px] pb-8 rounded-b-3xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center mb-3 border-4 border-white/30">
            <span className="text-[24px] font-bold text-primary">JP</span>
          </div>
          <h1 className="text-[20px] font-bold text-white">Jean-Paul K.</h1>
          <p className="text-[14px] text-white/70">+250 789 123 456</p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 -mt-4 bg-white rounded-xl border border-border flex mb-5 relative z-10"
      >
        <div className="flex-1 py-4 text-center">
          <div className="text-[26px] font-bold text-primary">{upcomingCount}</div>
          <div className="text-[12px] text-text-muted">{t('upcoming', language)}</div>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 py-4 text-center">
          <div className="text-[26px] font-bold text-accent">{totalTrips}</div>
          <div className="text-[12px] text-text-muted">{t('totalTrips', language)}</div>
        </div>
        <div className="w-px bg-border" />
        <div className="flex-1 py-4 text-center">
          <div className="text-[26px] font-bold text-primary">4.8</div>
          <div className="text-[12px] text-text-muted">{t('rating', language)} ★</div>
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
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMenuClick(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 active:bg-primary-light transition-colors text-left ${
                i < menuItems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className={`w-[48px] h-[48px] rounded-xl ${item.bg} flex items-center justify-center`}>
                <Icon size={22} className={item.color} />
              </div>
              <span className="flex-1 text-[15px] font-medium text-text-primary">{item.label}</span>
              {item.value && (
                <span className="text-[13px] text-primary font-bold mr-1">{item.value}</span>
              )}
              <ChevronRight size={18} className="text-text-muted" />
            </motion.button>
          );
        })}
      </motion.div>

      {/* Switch Account */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mx-5 mt-4"
      >
        <button 
          onClick={() => setShowRoleSwitcher(true)}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-primary font-semibold text-[15px] active:bg-primary-light rounded-xl transition-colors"
        >
          <ArrowRightLeft size={20} />
          Switch Account
        </button>
      </motion.div>

      {/* Role Switcher Modal */}
      <AnimatePresence>
        {showRoleSwitcher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setShowRoleSwitcher(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full p-5 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-bold text-text-primary">Switch Account</h2>
                <button onClick={() => setShowRoleSwitcher(false)} className="p-2">
                  <X size={20} className="text-text-muted" />
                </button>
              </div>

              <p className="text-[13px] text-text-muted mb-4">
                Choose a role to switch to:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setUserRole('passenger');
                    setShowRoleSwitcher(false);
                    router.push('/home');
                  }}
                  className="w-full p-4 rounded-xl border border-border flex items-center gap-3 hover:bg-surface-secondary"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[14px] font-bold text-text-primary">Passenger</div>
                    <div className="text-[11px] text-text-muted">Book tickets, view my trips</div>
                  </div>
                  <ChevronRight size={18} className="text-text-muted" />
                </button>

                <button
                  onClick={() => {
                    setUserRole('agent');
                    setShowRoleSwitcher(false);
                    router.push('/agency');
                  }}
                  className="w-full p-4 rounded-xl border border-border flex items-center gap-3 hover:bg-surface-secondary"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bus size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[14px] font-bold text-text-primary">Agency</div>
                    <div className="text-[11px] text-text-muted">Manage trips, verify tickets, reports</div>
                  </div>
                  <ChevronRight size={18} className="text-text-muted" />
                </button>

                <button
                  onClick={() => {
                    setUserRole('driver');
                    setShowRoleSwitcher(false);
                    router.push('/driver');
                  }}
                  className="w-full p-4 rounded-xl border border-border flex items-center gap-3 hover:bg-surface-secondary"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <Bus size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[14px] font-bold text-text-primary">Driver</div>
                    <div className="text-[11px] text-text-muted">Verify passengers, view manifest</div>
                  </div>
                  <ChevronRight size={18} className="text-text-muted" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pitch Mode Toggle */}
      <div className="mx-5 mt-6 mb-8 text-center">
        <button
          onClick={() => setPitchMode(!pitchMode)}
          className="text-[11px] text-text-muted underline"
        >
          Presentation Mode
        </button>
        
        {/* Pitch Mode Overlay */}
        {pitchMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute top-0 left-0 right-0 bg-black/80 z-50 flex items-center justify-center py-3">
              <span className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full">
                AGENCY DEMO — Urugendo v6.0
              </span>
              <button
                onClick={() => setPitchMode(false)}
                className="absolute right-4"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-3 text-center">
              <span className="text-[11px] text-text-muted">
                V0 Pilot: 4 features · Full app: 12 features · Start date: your 2-week trial
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
