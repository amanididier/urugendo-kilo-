"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useApp } from '@/context/app-context';
import { getSmartReply } from '@/lib/chat';
import { t } from '@/lib/translations';
import Image from 'next/image';

export function RugendoChat() {
  const { chatOpen, setChatOpen, chatMessages, addChatMessage, language } = useApp();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, typing]);

  useEffect(() => {
    if (chatOpen && chatMessages.length === 0) {
      setTimeout(() => {
        addChatMessage(t('rugendoWelcome1', language), 'rugendo');
      }, 300);
      setTimeout(() => {
        addChatMessage(t('rugendoWelcome2', language), 'rugendo');
      }, 1200);
    }
  }, [chatOpen, chatMessages.length, addChatMessage, language]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    addChatMessage(msg, 'user');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addChatMessage(getSmartReply(msg), 'rugendo');
    }, 1200);
  };

  const suggestions = [
    t('suggestion1', language),
    t('suggestion2', language),
    t('suggestion3', language),
    t('suggestion4', language),
  ];

  return (
    <AnimatePresence>
      {chatOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-[460]"
            onClick={() => setChatOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[28px] z-[470] flex flex-col"
            style={{ maxHeight: '76%' }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-[36px] h-[4px] bg-gray-300 rounded-full" />
            </div>

            {/* Header with logo instead of bus emoji */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center p-0.5 shadow-[0_4px_12px_rgba(0,184,92,0.25)]">
                <Image
                  src="https://assets.kiloapps.io/user_465c60a0-3d95-4712-ac67-4db616199442/5acef383-25d7-4044-8ec7-b13e367e211c/e80493e1-eb86-4e45-bc74-de15449a3015.jpg"
                  alt="Rugendo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-text-primary text-[15px]">{t('rugendo', language)}</div>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                  <span className="text-[12px] text-primary font-medium">{t('online', language)}</span>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-muted hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'none' }}>
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-gray-100 text-text-primary rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 rounded-full bg-text-muted"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {chatMessages.length >= 2 && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        addChatMessage(s, 'user');
                        setTyping(true);
                        setTimeout(() => {
                          setTyping(false);
                          addChatMessage(getSmartReply(s), 'rugendo');
                        }, 1200);
                      }}
                      className="px-3 py-1.5 rounded-full border border-border text-[12px] text-text-secondary font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={t('askRugendo', language)}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-[14px] text-text-primary outline-none placeholder:text-text-muted"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
