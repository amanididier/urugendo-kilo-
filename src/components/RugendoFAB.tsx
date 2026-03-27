"use client";

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useApp } from '@/context/app-context';

export function RugendoFAB() {
  const pathname = usePathname();
  const { setChatOpen } = useApp();

  if (pathname === '/splash') return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
      onClick={() => setChatOpen(true)}
      className="absolute bottom-[88px] right-5 w-[52px] h-[52px] rounded-[18px] bg-primary flex items-center justify-center text-xl z-30 shadow-[0_8px_24px_rgba(0,184,92,0.35)]"
    >
      <span>🚌</span>
      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
        AI
      </div>
    </motion.button>
  );
}
