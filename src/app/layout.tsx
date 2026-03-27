import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/app-context";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { RugendoChat } from "@/components/RugendoChat";
import { CityPicker } from "@/components/CityPicker";
import { RugendoFAB } from "@/components/RugendoFAB";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Urugendo — Rwanda's Journey App",
  description: "Search, compare, and book bus tickets across Rwanda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} antialiased`}>
        <AppProvider>
          <PhoneFrame
            nav={<BottomNav />}
            fab={<RugendoFAB />}
            chat={<RugendoChat />}
            picker={<CityPicker />}
          >
            {children}
          </PhoneFrame>
        </AppProvider>
      </body>
    </html>
  );
}
