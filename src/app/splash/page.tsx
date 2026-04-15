"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/context/app-context';
import { t } from '@/lib/translations';
import Image from 'next/image';

export default function SplashScreen() {
  const router = useRouter();
  const { language, setLanguage, setUserRole } = useApp();

  useEffect(() => {
    // Don't auto-navigate - let user choose
    // const timer = setTimeout(() => router.push('/home'), 3500);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background image — bus station / terminal */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 6, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Green gradient glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%]"
        style={{ background: 'linear-gradient(to top, rgba(0,184,92,0.55) 0%, rgba(0,184,92,0.15) 40%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-[70px] pb-8">
        {/* Language toggle */}
        <div className="self-end flex items-center bg-white/15 backdrop-blur-md rounded-full p-1 mb-auto border border-white/20">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all ${
              language === 'EN' ? 'bg-primary text-white shadow-md' : 'text-white/80 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('RW')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all ${
              language === 'RW' ? 'bg-primary text-white shadow-md' : 'text-white/80 hover:text-white'
            }`}
          >
            RW
          </button>
        </div>

        {/* App branding */}
        <div className="mt-auto">
          {/* App icon - logo in green circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="mb-5"
          >
            <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center shadow-[0_8px_30px_rgba(0,184,92,0.4)] border-[3px] border-white/30 p-1.5">
              <Image
                src="https://assets.kiloapps.io/user_465c60a0-3d95-4712-ac67-4db616199442/5acef383-25d7-4044-8ec7-b13e367e211c/e80493e1-eb86-4e45-bc74-de15449a3015.jpg"
                alt="Urugendo Logo"
                width={68}
                height={68}
                className="rounded-full"
              />
            </div>
          </motion.div>

          {/* App name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-white text-[44px] font-extrabold leading-tight mb-1"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Urugendo<span className="text-accent">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="text-white/90 text-[15px] mb-10 flex items-center gap-1.5"
          >
            <span>📍</span> {t('tagline', language)}
          </motion.p>

          {/* Get Started - Go to Login */}
          <motion.button
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onClick={() => router.push('/login')}
            className="w-full h-14 rounded-full bg-primary text-white text-[16px] font-bold mb-3 active:scale-[0.97] transition-transform shadow-[0_6px_20px_rgba(0,184,92,0.4)]"
          >
            {t('getStarted', language)}
          </motion.button>

          {/* Quick Role Selection */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => router.push('/home')}
              className="py-2 rounded-lg bg-white/10 text-white text-[12px] font-medium border border-white/20"
            >
              Passenger
            </button>
            <button
              onClick={() => {
                localStorage.setItem('urugendo_role', 'driver'); setUserRole('driver');
                router.push('/driver');
              }}
              className="py-2 rounded-lg bg-amber-500/20 text-amber-400 text-[12px] font-medium border border-amber-500/30"
            >
              Driver
            </button>
            <button
              onClick={() => {
                localStorage.setItem('urugendo_role', 'agent'); setUserRole('agent');
                router.push('/agency');
              }}
              className="py-2 rounded-lg bg-blue-500/20 text-blue-400 text-[12px] font-medium border border-blue-500/30"
            >
              Agency
            </button>
          </div>

          {/* Social buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="flex justify-center gap-4 mb-6"
          >
            {[
              { label: 'G' },
              { label: '' },
              { label: 'f' },
            ].map((btn) => (
              <button
                key={btn.label}
                className="w-[52px] h-[52px] rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-[18px] font-semibold active:scale-95 transition-transform border border-white/20"
              >
                {btn.label}
              </button>
            ))}
          </motion.div>

          {/* Footer - Login as Driver/Agency at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.3 }}
            className="text-center"
          >
            <p className="text-white/50 text-[13px] mb-3">
              Are you a driver or agency?
            </p>
            <button
              onClick={() => router.push('/login')}
              className="text-primary font-bold text-[14px] underline"
            >
              Login as Driver or Agency
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
