"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Ticket, User, Bus } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/tickets', icon: Ticket, label: 'Tickets' },
  { path: '/agency', icon: Bus, label: 'Agency' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/splash' || pathname === '/' || pathname === '/splash/') return null;

  const isActive = (path: string) => {
    if (path === '/home') return pathname === '/home' || pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border z-40">
      <div className="flex items-center justify-around h-[72px] px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2 relative"
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-primary-light rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: active ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative z-10"
              >
                <Icon
                  size={22}
                  className={active ? 'text-primary' : 'text-text-muted'}
                  strokeWidth={active ? 2.5 : 2}
                />
              </motion.div>
              <span
                className={`text-[11px] font-semibold relative z-10 ${
                  active ? 'text-primary' : 'text-text-muted'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
