"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language, Trip, Booking, ChatMessage, PaymentMethod } from '@/lib/types';
import { sampleBookings, generateBookingId } from '@/lib/data';

type UserRole = 'passenger' | 'agent' | 'driver';

interface SearchState {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  search: SearchState;
  setSearch: (search: Partial<SearchState>) => void;
  selectedTrip: Trip | null;
  setSelectedTrip: (trip: Trip | null) => void;
  selectedSeat: string | null;
  setSelectedSeat: (seat: string | null) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => string;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (text: string, sender: 'user' | 'rugendo') => void;
  cityPickerOpen: boolean;
  setCityPickerOpen: (open: boolean) => void;
  cityPickerField: 'from' | 'to';
  setCityPickerField: (field: 'from' | 'to') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');
  
  // Try to get role from localStorage or default to passenger
  const getInitialRole = (): UserRole => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('urugendo_role');
      if (saved === 'driver' || saved === 'agent' || saved === 'passenger') {
        return saved;
      }
    }
    return 'passenger';
  };
  
  const [userRole, setUserRole] = useState<UserRole>(getInitialRole);
  
  // Persist role to localStorage when changed
  const handleSetRole = useCallback((role: UserRole) => {
    setUserRole(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('urugendo_role', role);
    }
  }, []);
  const [search, setSearchState] = useState<SearchState>({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
  });
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mtn');
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [cityPickerField, setCityPickerField] = useState<'from' | 'to'>('from');

  const setSearch = useCallback((partial: Partial<SearchState>) => {
    setSearchState(prev => ({ ...prev, ...partial }));
  }, []);

  const addBooking = useCallback((booking: Omit<Booking, 'id'>): string => {
    const id = generateBookingId();
    const newBooking = { ...booking, id };
    setBookings(prev => [newBooking, ...prev]);
    return id;
  }, []);

  const addChatMessage = useCallback((text: string, sender: 'user' | 'rugendo') => {
    const msg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      text,
      sender,
      timestamp: Date.now(),
    };
    setChatMessages(prev => [...prev, msg]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        userRole,
        setUserRole: handleSetRole,
        search,
        setSearch,
        selectedTrip,
        setSelectedTrip,
        selectedSeat,
        setSelectedSeat,
        paymentMethod,
        setPaymentMethod,
        bookings,
        addBooking,
        chatOpen,
        setChatOpen,
        chatMessages,
        addChatMessage,
        cityPickerOpen,
        setCityPickerOpen,
        cityPickerField,
        setCityPickerField,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
