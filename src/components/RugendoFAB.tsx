"use client";

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/context/app-context';
import Image from 'next/image';

export function RugendoFAB() {
  const pathname = usePathname();
  const { setChatOpen } = useApp();

  if (pathname === '/splash' || pathname === '/splash/') return null;

  return (
    <motion.button
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setChatOpen(true)}
      className="absolute bottom-[88px] right-4 z-30 flex flex-col items-center gap-1"
    >
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
        {/* Green circle bubble */}
        <div className="relative w-[56px] h-[56px] rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center shadow-[0_6px_20px_rgba(0,184,92,0.4)] border-[3px] border-white">
          <Image
            src="https://assets.kiloapps.io/user_465c60a0-3d95-4712-ac67-4db616199442/5acef383-25d7-4044-8ec7-b13e367e211c/e80493e1-eb86-4e45-bc74-de15449a3015.jpg"
            alt="Rugendo AI"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
        {/* AI badge */}
        <div className="absolute -top-1 -right-1 w-[22px] h-[22px] rounded-full bg-accent text-white text-[8px] font-extrabold flex items-center justify-center border-[2px] border-white shadow-sm">
          AI
        </div>
      </div>
      <span className="text-[10px] font-bold text-primary bg-white/90 px-2 py-0.5 rounded-full shadow-sm">Rugendo</span>
    </motion.button>
  );
}
