"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bell, ArrowRightLeft, ChevronRight, MapPin, Clock, Zap } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { popularRoutes, getTripsForRoute, formatPrice } from '@/lib/data';
import { format } from 'date-fns';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const { search, setSearch, setCityPickerOpen, setCityPickerField, setSelectedTrip, setChatOpen } = useApp();

  const openCityPicker = (field: 'from' | 'to') => {
    setCityPickerField(field);
    setCityPickerOpen(true);
  };

  const swapCities = () => {
    setSearch({ from: search.to, to: search.from });
  };

  const handleSearch = () => {
    if (search.from && search.to) {
      router.push('/search');
    }
  };

  const handleRouteClick = (route: typeof popularRoutes[0]) => {
    setSearch({ from: route.from, to: route.to });
    router.push('/search');
  };

  const handleLiveDeparture = (route: typeof popularRoutes[0]) => {
    const trips = getTripsForRoute(route.from, route.to, search.date);
    if (trips[0]) {
      setSearch({ from: route.from, to: route.to });
      setSelectedTrip(trips[0]);
      router.push(`/seats/${trips[0].id}`);
    }
  };

  const liveRoutes = popularRoutes.slice(0, 3);

  return (
    <div className="bg-surface-secondary pb-[88px]">
      {/* Top bar with green header */}
      <div className="bg-primary pt-[60px] px-5 pb-5 rounded-b-[28px]">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-full bg-white/20 p-0.5">
              <Image
                src="https://assets.kiloapps.io/user_465c60a0-3d95-4712-ac67-4db616199442/5acef383-25d7-4044-8ec7-b13e367e211c/e80493e1-eb86-4e45-bc74-de15449a3015.jpg"
                alt="Urugendo"
                width={34}
                height={34}
                className="rounded-full"
              />
            </div>
            <h1 className="text-[22px] font-extrabold text-white">
              Urugendo<span className="text-accent">.</span>
            </h1>
          </motion.div>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
            <Bell size={20} className="text-white" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-primary" />
          </button>
        </div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[14px] text-white/70 mb-0.5">Muraho 👋</p>
          <h2 className="text-[26px] font-extrabold text-white">Where to today?</h2>
        </motion.div>
      </div>

      {/* Search card - overlapping */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-4 -mt-5 bg-white rounded-[20px] p-4 mb-5 relative z-10 border border-border"
      >
        {/* FROM */}
        <button
          onClick={() => openCityPicker('from')}
          className="w-full flex items-center gap-3 py-2.5"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-primary flex-shrink-0 border-2 border-primary/20" />
          <span className={`text-[15px] ${search.from ? 'text-text-primary font-semibold' : 'text-text-muted'}`}>
            {search.from || 'From (e.g. Kigali)'}
          </span>
        </button>

        <div className="border-t border-dashed border-border relative">
          <button
            onClick={swapCities}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center z-10 active:scale-90 transition-transform"
          >
            <ArrowRightLeft size={14} />
          </button>
        </div>

        {/* TO */}
        <button
          onClick={() => openCityPicker('to')}
          className="w-full flex items-center gap-3 py-2.5"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-accent flex-shrink-0 border-2 border-accent/20" />
          <span className={`text-[15px] ${search.to ? 'text-text-primary font-semibold' : 'text-text-muted'}`}>
            {search.to || 'To (e.g. Musanze)'}
          </span>
        </button>

        <div className="border-t border-border" />

        {/* Date + passengers */}
        <div className="flex items-center gap-3 py-2.5">
          <div className="flex-1 flex items-center gap-2 bg-surface-secondary rounded-xl px-3 py-2.5">
            <Clock size={16} className="text-primary" />
            <span className="text-[14px] text-text-secondary font-medium">
              {format(new Date(search.date), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearch({ passengers: Math.max(1, search.passengers - 1) })}
              className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-primary text-[18px] font-bold active:bg-primary-light"
            >
              −
            </button>
            <span className="text-[15px] font-bold text-text-primary w-5 text-center">{search.passengers}</span>
            <button
              onClick={() => setSearch({ passengers: Math.min(10, search.passengers + 1) })}
              className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-primary text-[18px] font-bold active:bg-primary-light"
            >
              +
            </button>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={!search.from || !search.to}
          className={`w-full h-12 rounded-2xl font-bold text-white text-[15px] mt-1 flex items-center justify-center gap-2 active:scale-[0.97] transition-all ${
            search.from && search.to
              ? 'bg-primary shadow-[0_4px_12px_rgba(0,184,92,0.3)]'
              : 'bg-primary/25 text-primary/50'
          }`}
        >
          Search Buses
        </button>
      </motion.div>

      {/* Quick info strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 px-4 mb-5"
      >
        {[
          { icon: <MapPin size={14} />, label: '8 Cities', bg: 'bg-primary-light', color: 'text-primary' },
          { icon: <Zap size={14} />, label: '4 Operators', bg: 'bg-amber-50', color: 'text-accent' },
          { icon: <Clock size={14} />, label: '24/7 AI', bg: 'bg-blue-50', color: 'text-blue-600' },
        ].map((item, i) => (
          <div key={i} className={`flex-1 flex items-center justify-center gap-1.5 ${item.bg} rounded-xl py-2.5`}>
            <span className={item.color}>{item.icon}</span>
            <span className={`text-[12px] font-bold ${item.color}`}>{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Popular Routes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-5"
      >
        <div className="flex items-center justify-between px-5 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-primary" />
            <h3 className="text-[17px] font-bold text-text-primary">Popular Routes</h3>
          </div>
          <button className="text-[13px] text-primary font-semibold">See all</button>
        </div>
        <div
          className="flex gap-3 px-5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularRoutes.map((route, i) => (
            <motion.button
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              onClick={() => handleRouteClick(route)}
              className="flex-shrink-0 bg-white rounded-2xl border border-border p-4 min-w-[155px] active:scale-[0.97] transition-transform text-left"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={14} className="text-primary" />
                </div>
                <span className="text-[13px] font-bold text-text-primary">
                  {route.from} → {route.to}
                </span>
              </div>
              <div className="text-[18px] font-extrabold text-primary">{formatPrice(route.price)}</div>
              <div className="text-[12px] text-text-muted mt-1">{route.duration}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Live Departures */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="px-4 mb-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full bg-primary" />
          <h3 className="text-[17px] font-bold text-text-primary">Live Departures</h3>
          <div className="flex items-center gap-1 bg-badge-green-bg px-2 py-0.5 rounded-full">
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-badge-green-text"
            />
            <span className="text-[11px] font-bold text-badge-green-text">Live</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {liveRoutes.map((route, i) => {
            const trips = getTripsForRoute(route.from, route.to, search.date);
            const trip = trips[i % trips.length];
            return (
              <motion.button
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                onClick={() => handleLiveDeparture(route)}
                className="w-full bg-white rounded-2xl border border-border p-3.5 flex items-center gap-3 active:bg-primary-light transition-colors text-left"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: trip.operator.gradient }}
                >
                  {trip.operator.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-text-primary">
                    {route.from} → {route.to}
                  </div>
                  <div className="text-[12px] text-text-muted mt-0.5">
                    <span className="text-primary font-semibold">{trip.operator.name}</span>
                    <span className="mx-1.5">·</span>
                    <span>{trip.departureTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[16px] font-extrabold text-primary">{formatPrice(trip.price)}</div>
                  <div className="text-[11px] text-badge-green-text font-medium">{trip.availableSeats} seats</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Rugendo AI tip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-4 mb-6 bg-gradient-to-r from-primary-light to-green-50 rounded-2xl p-4 flex items-center gap-3 cursor-pointer border border-primary/15 active:scale-[0.98] transition-transform"
        onClick={() => setChatOpen(true)}
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center flex-shrink-0 p-0.5 shadow-[0_4px_12px_rgba(0,184,92,0.25)]">
          <Image
            src="https://assets.kiloapps.io/user_465c60a0-3d95-4712-ac67-4db616199442/5acef383-25d7-4044-8ec7-b13e367e211c/e80493e1-eb86-4e45-bc74-de15449a3015.jpg"
            alt="Rugendo"
            width={38}
            height={38}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-text-primary">Rugendo says hi! 👋</div>
          <div className="text-[12px] text-text-muted mt-0.5">Ask me about routes, prices, or booking help</div>
        </div>
        <ChevronRight size={18} className="text-primary" />
      </motion.div>

      {/* Footer */}
      <div className="text-center pb-4">
        <p className="text-[11px] text-text-muted">
          Made with 💚 for Rwanda&apos;s travellers
        </p>
      </div>
    </div>
  );
}
