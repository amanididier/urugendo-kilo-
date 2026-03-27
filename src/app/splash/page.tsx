"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/context/app-context';

export default function SplashScreen() {
  const router = useRouter();
  const { language, setLanguage } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background image with Ken Burns */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/38" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-[70px] pb-8">
        {/* Language toggle */}
        <div className="self-end flex items-center bg-white/90 rounded-full p-1 mb-auto">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all ${
              language === 'EN' ? 'bg-white text-text-primary shadow-sm' : 'text-text-muted'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('RW')}
            className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all ${
              language === 'RW' ? 'bg-white text-text-primary shadow-sm' : 'text-text-muted'
            }`}
          >
            RW
          </button>
        </div>

        {/* App branding */}
        <div className="mt-auto">
          {/* App icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-[72px] h-[72px] rounded-[18px] bg-primary mb-5"
          />

          {/* App name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white text-[42px] font-extrabold leading-tight mb-2"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Urugendo<span className="text-accent">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white/80 text-[15px] mb-8 flex items-center gap-1.5"
          >
            <span>📍</span> Your personal secure journey app
          </motion.p>

          {/* Get Started */}
          <motion.button
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onClick={() => router.push('/')}
            className="w-full h-14 rounded-full bg-primary text-white text-[16px] font-bold mb-5 active:scale-[0.97] transition-transform"
          >
            Get Started
          </motion.button>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="text-white/60 text-[13px] text-center mb-4"
          >
            or continue with
          </motion.div>

          {/* Social buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="flex justify-center gap-4 mb-6"
          >
            {[
              { label: 'G', icon: '' },
              { label: '🍎', icon: '' },
              { label: 'f', icon: '' },
            ].map((btn) => (
              <button
                key={btn.label}
                className="w-[52px] h-[52px] rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-[18px] font-semibold active:scale-95 transition-transform"
              >
                {btn.label}
              </button>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.3 }}
            className="text-center text-[13px]"
          >
            <span className="text-white/60">Don&apos;t have an account? </span>
            <span className="text-primary font-bold">Create one</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
