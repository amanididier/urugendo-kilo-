"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/app-context';
import { cities } from '@/lib/data';
import { t } from '@/lib/translations';

export function CityPicker() {
  const { cityPickerOpen, setCityPickerOpen, cityPickerField, setSearch, language } = useApp();

  const handleSelect = (cityName: string) => {
    setSearch({ [cityPickerField]: cityName });
    setCityPickerOpen(false);
  };

  return (
    <AnimatePresence>
      {cityPickerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-[460]"
            onClick={() => setCityPickerOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] z-[470] flex flex-col"
            style={{ maxHeight: '70%' }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-[36px] h-[4px] bg-gray-300 rounded-full" />
            </div>

            <div className="px-5 py-3">
              <h2 className="text-[18px] font-bold text-text-primary">
                {cityPickerField === 'from' ? t('selectDeparture', language) : t('selectDestination', language)}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-6">
              {cities.map((city, i) => (
                <motion.button
                  key={city.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => handleSelect(city.name)}
                  className="w-full flex items-center gap-3 py-3.5 border-b border-border last:border-0 active:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">{city.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-text-primary text-[15px]">{city.name}</div>
                    <div className="text-[12px] text-text-muted">{city.terminal}</div>
                  </div>
                  <span className="text-[13px] font-mono text-text-muted">{city.code}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
