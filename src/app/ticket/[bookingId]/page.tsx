"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/context/app-context';
import { formatPrice } from '@/lib/data';
import { useState, useEffect } from 'react';

function LiveTimer() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-1 bg-black/10 px-2 py-1 rounded-lg">
      <motion.div 
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-red-500"
      />
      <span className="text-[11px] font-mono text-text-muted">{time}</span>
    </div>
  );
}

function SpinningLogo() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      className="text-xl"
    >
      ✦
    </motion.div>
  );
}

export default function TicketConfirmPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const router = useRouter();
  const { bookings } = useApp();

  const { bookingId } = (() => {
    let resolved: { bookingId: string } = { bookingId: '' };
    try {
      params.then(p => { resolved = p; }).catch(() => {});
    } catch {}
    return resolved;
  })();

  const booking = bookings.find(b => b.id === bookingId) || bookings[0];

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6 pb-20">
        <div className="text-4xl mb-4">🎫</div>
        <h2 className="text-[20px] font-bold text-text-primary mb-2">Booking not found</h2>
        <button onClick={() => router.push('/')} className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-[14px]">
          Back to Home
        </button>
      </div>
    );
  }

  const isBoarded = booking.status === 'boarded';
  const busColor = booking.trip.busColor || '#FF6B1A';

  return (
    <div className="bg-white pb-[20px]">
      {/* Success banner */}
      <div className={`${isBoarded ? 'bg-gray-400' : 'bg-primary'} pt-[70px] px-5 pb-6 text-center`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-5xl mb-3"
          >
            {isBoarded ? '✓' : '✅'}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[24px] font-extrabold text-white mb-1"
          >
            {isBoarded ? 'BOARDED' : 'Booking Confirmed!'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[13px] text-white/70"
          >
            {isBoarded ? 'Have a safe journey' : 'Your e-ticket is ready'}
          </motion.p>
        </div>

        {/* Ticket card - white background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-5 -mt-4 rounded-2xl border border-border overflow-hidden bg-white shadow-lg"
        >
          {/* Header with agency logo */}
          <div className="px-4 py-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-secondary flex items-center justify-center text-2xl">
                {booking.trip.operator.logo || booking.trip.operator.emoji}
              </div>
              <div>
                <span className="text-[16px] font-extrabold text-text-primary">{booking.trip.operator.name}</span>
                <div className="text-[11px] text-text-muted">{booking.trip.plateNumber || 'RAD 101A'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SpinningLogo />
            </div>
          </div>

          {/* Main code section - with colored code text */}
          <div className="p-6 flex flex-col items-center justify-center bg-surface-secondary">
            <div className="text-[12px] text-text-muted mb-2 uppercase tracking-wide">Your Code</div>
            <div 
              className="text-[52px] font-extrabold tracking-wider"
              style={{ color: isBoarded ? '#9CA3AF' : busColor }}
            >
              {booking.shortCode || 'XY12'}
            </div>
            <div className="flex items-center gap-2 mt-3">
              {!isBoarded && <LiveTimer />}
            </div>
          </div>

          {/* Route section */}
          <div className="p-5 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-[12px] text-text-muted mb-0.5">From</div>
                <div className="text-[20px] font-bold text-text-primary">
                  {booking.trip.from.substring(0, 3).toUpperCase()}
                </div>
                <div className="text-[11px] text-text-muted">{booking.trip.terminalFrom}</div>
              </div>
              <div className="text-center">
                <div className="text-[28px] text-primary">→</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-text-muted mb-0.5">To</div>
                <div className="text-[20px] font-bold text-text-primary">
                  {booking.trip.to.substring(0, 3).toUpperCase()}
                </div>
                <div className="text-[11px] text-text-muted">{booking.trip.terminalTo}</div>
              </div>
            </div>

            <div className="border-t border-dashed border-border my-3" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[12px] text-text-muted">Date</div>
                <div className="text-[15px] font-semibold text-text-primary">{booking.trip.date}</div>
              </div>
              <div>
                <div className="text-[12px] text-text-muted">Time</div>
                <div className="text-[15px] font-semibold text-text-primary">{booking.trip.departureTime}</div>
              </div>
              <div>
                <div className="text-[12px] text-text-muted">Seat</div>
                <div className="text-[15px] font-semibold text-text-primary">{booking.seat}</div>
              </div>
              <div>
                <div className="text-[12px] text-text-muted">Passenger</div>
                <div className="text-[15px] font-semibold text-text-primary">{booking.passengerName}</div>
              </div>
            </div>
          </div>

          {/* Price footer */}
          <div className="px-4 py-3 flex items-center justify-between bg-surface-secondary border-t border-border">
            <div className="flex items-center gap-2 text-text-primary">
              <span>{booking.trip.operator.emoji}</span>
              <span className="text-[13px] font-medium">{booking.trip.operator.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[15px] font-bold text-text-primary">{formatPrice(booking.totalAmount)}</span>
              <span className="text-[11px] text-text-muted ml-1">· {booking.paymentMethod}</span>
            </div>
          </div>
        </motion.div>

        {/* Verification indicator */}
        {!isBoarded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-5 mt-3 bg-green-50 rounded-xl p-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg">👁️</span>
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-text-primary">Lightning Fast Verification</div>
              <div className="text-[11px] text-text-muted">Show this screen to board - driver scans instantly</div>
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-5 mt-4 space-y-2.5"
        >
          <button className="w-full h-12 rounded-full bg-primary text-white font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
            📥 Download Ticket
          </button>
          <button className="w-full h-12 rounded-full bg-white border border-border text-text-primary font-bold text-[15px] flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
            📤 Share Ticket
          </button>
          <button
            onClick={() => router.push('/home')}
            className="w-full h-12 rounded-full bg-white border border-border text-text-primary font-bold text-[15px] flex items-center justify-center gap-2 active:bg-gray-50 transition-colors"
          >
            🏠 Back to Home
          </button>
        </motion.div>
      </div>
  );
}