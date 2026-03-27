"use client";

import { ReactNode } from 'react';

export function PhoneFrame({ children, nav, fab, chat, picker }: {
  children: ReactNode;
  nav: ReactNode;
  fab: ReactNode;
  chat: ReactNode;
  picker: ReactNode;
}) {
  return (
    <div className="h-screen bg-[#0F0F0F] flex items-center justify-center overflow-hidden">
      <div className="w-[390px] h-[844px] rounded-[52px] overflow-hidden relative border-[9px] border-[#111] shadow-[0_40px_80px_rgba(0,0,0,0.7)] bg-white flex flex-col">
        {/* Dynamic Island */}
        <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[118px] h-[33px] bg-black rounded-[18px] z-[500]" />

        {/* Scrollable content area */}
        <div
          className="flex-1 w-full overflow-y-auto overflow-x-hidden relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        {/* Fixed bottom nav — outside scroll */}
        {nav}

        {/* Floating elements — outside scroll */}
        {fab}
        {chat}
        {picker}
      </div>
    </div>
  );
}
