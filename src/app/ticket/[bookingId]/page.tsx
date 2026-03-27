"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/context/app-context';
import { formatPrice } from '@/lib/data';

export default function TicketConfirmPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const router = useRouter();
  const { bookings } = useApp();

  // Unwrap params for Next.js 16
  const { bookingId } = (() => {
    let resolved: { bookingId: string } = { bookingId: '' };
    try {
      // In Next.js 16, params is a Promise
      params.then(p => { resolved = p; }).catch(() => {});
    } catch {
      // fallback
    }
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

  return (
    <div className="bg-white pb-[20px]">
      {/* Success banner */}
      <div className="bg-primary pt-[70px] px-5 pb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-5xl mb-3"
          >
            ✅
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[24px] font-extrabold text-white mb-1"
          >
            Booking Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[13px] text-white/70"
          >
            Your e-ticket is ready
          </motion.p>
        </div>

        {/* Ticket card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-5 -mt-4 bg-white rounded-2xl border border-border overflow-hidden"
        >
          {/* Dark header */}
          <div className="bg-text-primary px-4 py-3 flex items-center justify-between">
            <span className="text-[16px] font-extrabold text-white">Urugendo<span className="text-accent">.</span></span>
            <span className="text-[12px] font-mono text-white/60">{booking.id}</span>
          </div>

          {/* White body */}
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-[12px] text-text-muted mb-0.5">From</div>
                <div className="text-[16px] font-bold text-text-primary">
                  {booking.trip.from.substring(0, 3).toUpperCase()}
                </div>
                <div className="text-[11px] text-text-muted">{booking.trip.terminalFrom}</div>
              </div>
              <div className="text-center">
                <div className="text-[24px] text-text-muted">→</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-text-muted mb-0.5">To</div>
                <div className="text-[16px] font-bold text-text-primary">
                  {booking.trip.to.substring(0, 3).toUpperCase()}
                </div>
                <div className="text-[11px] text-text-muted">{booking.trip.terminalTo}</div>
              </div>
            </div>

            <div className="border-t border-dashed border-border my-3" />

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <div className="text-[12px] text-text-muted">Date</div>
                <div className="text-[14px] font-semibold text-text-primary">{booking.trip.date}</div>
              </div>
              <div>
                <div className="text-[12px] text-text-muted">Time</div>
                <div className="text-[14px] font-semibold text-text-primary">{booking.trip.departureTime}</div>
              </div>
              <div>
                <div className="text-[12px] text-text-muted">Passenger</div>
                <div className="text-[14px] font-semibold text-text-primary">{booking.passengerName}</div>
              </div>
              <div>
                <div className="text-[12px] text-text-muted">Seat</div>
                <div className="text-[14px] font-semibold text-text-primary">{booking.seat}</div>
              </div>
            </div>

            {/* QR code placeholder */}
            <div className="flex justify-center py-4">
              <div className="w-[120px] h-[120px] bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-8 gap-0.5 p-3">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 ${(i * 7 + 3) % 5 > 1 ? 'bg-text-primary' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Green footer */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <span>{booking.trip.operator.emoji}</span>
              <span className="text-[13px] font-medium">{booking.trip.operator.name}</span>
            </div>
            <div className="text-white text-right">
              <span className="text-[15px] font-bold">{formatPrice(booking.totalAmount)}</span>
              <span className="text-[11px] text-white/70 ml-1">· {booking.paymentMethod}</span>
            </div>
          </div>
        </motion.div>

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
