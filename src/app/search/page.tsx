"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { getTripsForRoute, formatPrice } from '@/lib/data';
import { SearchFilter, Trip } from '@/lib/types';
import { t } from '@/lib/translations';
import { format } from 'date-fns';

const filters: { key: SearchFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'earliest', label: 'Earliest' },
  { key: 'cheapest', label: 'Cheapest' },
  { key: 'ac', label: '⚡AC' },
  { key: 'wifi', label: '📶WiFi' },
];

export default function SearchPage() {
  const router = useRouter();
  const { search, setSelectedTrip, language } = useApp();
  const [activeFilter, setActiveFilter] = useState<SearchFilter>('all');

  if (!search.from || !search.to) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white px-6 pb-20">
        <div className="text-4xl mb-4">🔍</div>
        <h2 className="text-[20px] font-bold text-text-primary mb-2">{t('noRoute', language)}</h2>
        <p className="text-[14px] text-text-muted text-center mb-6">
          {t('goBackHome', language)}
        </p>
        <button
          onClick={() => router.push('/home')}
          className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-[14px]"
        >
          {t('backToHome', language)}
        </button>
      </div>
    );
  }

  const allTrips = getTripsForRoute(search.from, search.to, search.date);

  const filteredTrips = allTrips.filter(trip => {
    if (activeFilter === 'ac') return trip.amenities.includes('❄️');
    if (activeFilter === 'wifi') return trip.amenities.includes('📶');
    return true;
  }).sort((a, b) => {
    if (activeFilter === 'earliest') return a.departureTime.localeCompare(b.departureTime);
    if (activeFilter === 'cheapest') return a.price - b.price;
    return 0;
  });

  const handleSelect = (trip: Trip) => {
    setSelectedTrip(trip);
    router.push(`/seats/${trip.id}`);
  };

  const getSeatBadge = (available: number) => {
    if (available <= 2) return { bg: 'bg-badge-red-bg', text: 'text-badge-red-text', label: `${available} left!` };
    if (available <= 5) return { bg: 'bg-badge-amber-bg', text: 'text-badge-amber-text', label: `${available} left` };
    return { bg: 'bg-badge-green-bg', text: 'text-badge-green-text', label: `${available} seats` };
  };

  return (
    <div className="bg-white pb-[100px]">
      {/* Header with green accent */}
      <div className="bg-primary pt-[60px] px-5 pb-4 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => router.push('/home')} className="p-1 -ml-1">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[18px] font-bold text-white truncate">{search.from} → {search.to}</h1>
            <p className="text-[13px] text-white/70">
              {format(new Date(search.date), 'MMM dd')} · {search.passengers} passenger{search.passengers > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        className="flex gap-2 px-5 py-3 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
              activeFilter === f.key
                ? 'bg-primary text-white'
                : 'bg-white border border-border text-text-secondary hover:border-primary/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="px-5 py-1">
        <p className="text-[14px] text-text-muted">
          <span className="font-bold text-primary">{filteredTrips.length}</span> {t('busesFound', language)}
        </p>
      </div>

      {/* Results */}
      <div className="px-5 space-y-3">
        {filteredTrips.map((trip, i) => {
          const badge = getSeatBadge(trip.availableSeats);
          return (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-border p-4 overflow-hidden"
            >
              {/* Operator row */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: trip.operator.gradient }}
                >
                  {trip.operator.emoji}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-text-primary">{trip.operator.name}</div>
                </div>
                <div className={`px-2.5 py-1 rounded-full ${badge.bg}`}>
                  <span className={`text-[11px] font-bold ${badge.text}`}>{badge.label}</span>
                </div>
              </div>

              {/* Time row */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-[32px] font-black text-text-primary leading-none">{trip.departureTime}</div>
                  <div className="text-[11px] text-text-muted mt-1 truncate">{trip.terminalFrom}</div>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <span className="text-[12px] text-primary font-medium">{trip.duration}</span>
                  <div className="w-14 h-[2px] bg-primary/20 relative rounded-full">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <div className="text-[32px] font-black text-text-primary leading-none">{trip.arrivalTime}</div>
                  <div className="text-[11px] text-text-muted mt-1 truncate">{trip.terminalTo}</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex gap-2 mb-3">
                {trip.amenities.map((a, j) => (
                  <div key={j} className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-[14px]">
                    {a}
                  </div>
                ))}
              </div>

              {/* Price + Select */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-text-muted">{t('perSeat', language)}</div>
                  <div className="text-[20px] font-bold text-primary">{formatPrice(trip.price)}</div>
                </div>
                <button
                  onClick={() => handleSelect(trip)}
                  className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-[14px] active:scale-[0.97] transition-transform"
                >
                  {t('select', language)}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
