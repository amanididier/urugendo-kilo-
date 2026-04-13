"use client";

import { useApp } from "@/context/app-context";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { RugendoChat } from "@/components/RugendoChat";
import { CityPicker } from "@/components/CityPicker";
import { RugendoFAB } from "@/components/RugendoFAB";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { userRole } = useApp();
  
  return (
    <PhoneFrame
      nav={<BottomNav role={userRole} />}
      fab={<RugendoFAB />}
      chat={<RugendoChat />}
      picker={<CityPicker />}
    >
      {children}
    </PhoneFrame>
  );
}
