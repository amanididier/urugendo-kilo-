"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Check } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { formatPrice, generateShortCode } from '@/lib/data';
import { t } from '@/lib/translations';

export default function PaymentPage() {
  const router = useRouter();
  const { selectedTrip, selectedSeat, paymentMethod, setPaymentMethod, addBooking, language } = useApp();
  const [processing, setProcessing] = useState(false);

  if (!selectedTrip || !selectedSeat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6 pb-20">
        <div className="text-4xl mb-4">💳</div>
        <h2 className="text-[20px] font-bold text-text-primary mb-2">{t('noBooking', language)}</h2>
        <button onClick={() => router.push('/home')} className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-[14px]">
          {t('backToHome', language)}
        </button>
      </div>
    );
  }

  const bookingFee = Math.round(selectedTrip.price * 0.025);
  const total = selectedTrip.price + bookingFee;

  const handlePay = () => {
    setProcessing(true);
    const phone = '+250 789 123 456';
    setTimeout(() => {
      const bookingId = addBooking({
        trip: selectedTrip,
        seat: selectedSeat,
        passengerName: 'Jean-Paul K.',
        passengerPhone: phone,
        shortCode: generateShortCode(),
        paymentMethod: paymentMethod === 'mtn' ? 'MTN MoMo' : paymentMethod === 'airtel' ? 'Airtel Money' : 'Bank Card',
        totalAmount: total,
        bookingFee,
        status: 'upcoming',
        bookingDate: new Date().toISOString().split('T')[0],
      });
      router.push(`/ticket/${bookingId}`);
    }, 1600);
  };

  return (
    <div className="bg-white pb-[100px]">
      {/* Header */}
      <div className="pt-[60px] px-5 pb-3">
          <div className="flex items-center gap-3 mb-1">
            <button onClick={() => router.back()} className="p-1 -ml-1">
              <ChevronLeft size={24} className="text-text-primary" />
            </button>
            <h1 className="text-[20px] font-bold text-text-primary">{t('payment', language)}</h1>
          </div>
          <p className="text-[13px] text-text-muted ml-8">{t('almostThere', language)}</p>
        </div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 bg-white rounded-2xl border border-border p-4 mb-4"
        >
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[14px] text-text-muted">{t('route', language)}</span>
              <span className="text-[14px] font-semibold text-text-primary">{selectedTrip.from} → {selectedTrip.to}</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex justify-between">
              <span className="text-[14px] text-text-muted">{t('dateTime', language)}</span>
              <span className="text-[14px] font-semibold text-text-primary">{selectedTrip.date} · {selectedTrip.departureTime}</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex justify-between">
              <span className="text-[14px] text-text-muted">{t('operator', language)}</span>
              <span className="text-[14px] font-semibold text-text-primary">{selectedTrip.operator.emoji} {selectedTrip.operator.name}</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex justify-between">
              <span className="text-[14px] text-text-muted">{t('seat', language)}</span>
              <span className="text-[14px] font-semibold text-text-primary">{selectedSeat}</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex justify-between">
              <span className="text-[14px] text-text-muted">{t('baseFare', language)}</span>
              <span className="text-[14px] font-semibold text-text-primary">{formatPrice(selectedTrip.price)}</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex justify-between">
              <span className="text-[14px] text-text-muted">{t('bookingFee', language)}</span>
              <span className="text-[14px] font-semibold text-text-primary">{formatPrice(bookingFee)}</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex justify-between">
              <span className="text-[14px] font-bold text-text-primary">{t('totalLabel', language)}</span>
              <span className="text-[20px] font-bold text-primary">{formatPrice(total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-5 bg-white rounded-2xl border border-border p-4 mb-4"
        >
          <h3 className="text-[15px] font-bold text-text-primary mb-3">{t('paymentMethod', language)}</h3>
          <div className="space-y-2">
            {[
              { id: 'mtn' as const, name: t('mtnMomo', language), emoji: '📱', badge: t('recommended', language), disabled: false },
              { id: 'airtel' as const, name: t('airtelMoney', language), emoji: '🔴', badge: null, disabled: false },
              { id: 'card' as const, name: t('bankCard', language), emoji: '💳', badge: t('comingSoon', language), disabled: true },
            ].map(method => (
              <button
                key={method.id}
                disabled={method.disabled}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary-light'
                    : method.disabled
                    ? 'border-border bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-border active:bg-gray-50'
                }`}
              >
                <span className="text-xl">{method.emoji}</span>
                <div className="flex-1 text-left">
                  <div className="text-[14px] font-semibold text-text-primary">{method.name}</div>
                </div>
                {method.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    method.badge === 'Recommended' ? 'bg-badge-green-bg text-badge-green-text' : 'bg-gray-100 text-text-muted'
                  }`}>
                    {method.badge}
                  </span>
                )}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === method.id ? 'border-primary' : 'border-border'
                }`}>
                  {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Security note */}
        <div className="text-center text-[12px] text-text-muted mb-4">
          🔐 {t('security', language)}
        </div>

      {/* Pay button */}
      <div className="absolute bottom-[72px] left-0 right-0 bg-white border-t border-border px-5 py-3 z-30">
        <button
          onClick={handlePay}
          disabled={processing}
          className="w-full h-12 rounded-full bg-primary text-white font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.97] transition-all"
        >
          {processing ? (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {t('processing', language)}
            </motion.span>
          ) : (
            <>🔒 Pay {formatPrice(total)}</>
          )}
        </button>
      </div>
    </div>
  );
}
