export interface City {
  code: string;
  name: string;
  terminal: string;
  flag: string;
}

export interface Operator {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
}

export interface Trip {
  id: string;
  operator: Operator;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  date: string;
  terminalFrom: string;
  terminalTo: string;
}

export interface Seat {
  id: string;
  row: number;
  col: string;
  status: 'available' | 'taken' | 'selected';
}

export interface Booking {
  id: string;
  trip: Trip;
  seat: string;
  passengerName: string;
  passengerPhone: string;
  paymentMethod: string;
  totalAmount: number;
  bookingFee: number;
  status: 'upcoming' | 'past' | 'cancelled';
  bookingDate: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'rugendo';
  timestamp: number;
}

export type Language = 'EN' | 'RW';
export type PaymentMethod = 'mtn' | 'airtel' | 'card';
export type SearchFilter = 'all' | 'earliest' | 'cheapest' | 'ac' | 'wifi';
