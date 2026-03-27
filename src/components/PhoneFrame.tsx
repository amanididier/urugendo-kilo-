"use client";

import { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div
        className="w-[390px] h-[844px] rounded-[52px] overflow-hidden relative border-[9px] border-[#111] shadow-[0_40px_80px_rgba(0,0,0,0.7)] bg-white"
      >
        {/* Dynamic Island */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[118px] h-[33px] bg-black rounded-[18px] z-[500]" />
        {/* Content - scrollable but no visible scrollbar */}
        <div
          className="w-full h-full overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
