"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bus, MapPin, Users, Clock, CheckCircle, Navigation, FileText, Phone, Activity } from 'lucide-react';

const sampleDriverTrips = [
  {
    id: 'driver-1',
    route: 'Kigali → Musanze',
    departureTime: '08:00',
    arrivalTime: '10:30',
    plateNumber: 'RAD 101A',
    status: 'departed' as const,
    location: { lat: -1.9536, lng: 29.8755 },
    passengers: [
      { name: 'Jean-Paul K.', seat: '3B', code: 'XK7P2Q', status: 'boarded' as const },
      { name: 'Marie U.', seat: '5A', code: 'MN8P4L', status: 'boarded' as const },
      { name: 'Pierre R.', seat: '7C', code: 'RT2W9K', status: 'booked' as const },
    ],
  },
  {
    id: 'driver-2',
    route: 'Musanze → Kigali',
    departureTime: '11:00',
    arrivalTime: '13:30',
    plateNumber: 'RAD 101A',
    status: 'assigned' as const,
    passengers: [
      { name: 'Alice M.', seat: '2A', code: 'AB1C2D', status: 'booked' as const },
      { name: 'Bob K.', seat: '4B', code: 'EF3G4H', status: 'booked' as const },
    ],
  },
];

export default function DriverDashboard() {
  const [trips] = useState(sampleDriverTrips);
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const [verifiedPassengers, setVerifiedPassengers] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'departed': return 'bg-blue-100 text-blue-700';
      case 'arrived': return 'bg-green-100 text-green-700';
      case 'boarding': return 'bg-amber-100 text-amber-700';
      case 'assigned': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const markBoarded = (passengerCode: string) => {
    if (!verifiedPassengers.includes(passengerCode)) {
      setVerifiedPassengers([...verifiedPassengers, passengerCode]);
    }
  };

  const currentTrip = trips.find(t => t.status === 'departed') || trips[0];
  const pendingPassengers = currentTrip?.passengers.filter(p => !verifiedPassengers.includes(p.code)) || [];
  const verifiedList = currentTrip?.passengers.filter(p => verifiedPassengers.includes(p.code)) || [];

  const generateManifest = () => {
    alert('Generating manifest PDF...');
  };

  return (
    <div className="bg-surface-secondary pb-[88px]">
      {/* Header */}
      <div className="bg-primary pt-[60px] px-5 pb-5 rounded-b-[28px]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            �driver
          </div>
          <div>
            <h1 className="text-[20px] font-extrabold text-white">Driver Dashboard</h1>
            <p className="text-[12px] text-white/70">Volcano Express</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3">
            <div className="text-[20px] font-bold text-white">12</div>
            <div className="text-[10px] text-white/70">Trips Today</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3">
            <div className="text-[20px] font-bold text-white">{pendingPassengers.length}</div>
            <div className="text-[10px] text-white/70">Pending</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3">
            <div className="text-[20px] font-bold text-white">{verifiedList.length}</div>
            <div className="text-[10px] text-white/70">Verified</div>
          </div>
        </div>
      </div>

      {/* Current Trip */}
      {currentTrip && (
        <div className="px-4 -mt-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-border p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-bold text-primary uppercase">Current Trip</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(currentTrip.status)}`}>
                {currentTrip.status.toUpperCase()}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-bold text-text-primary">{currentTrip.route}</div>
                <div className="text-[12px] text-text-muted">{currentTrip.plateNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-bold text-text-primary">{currentTrip.departureTime}</div>
                <div className="text-[10px] text-text-muted">Departed</div>
              </div>
            </div>

            {/* Live Location */}
            <button className="w-full bg-blue-50 rounded-xl p-3 flex items-center gap-3 border border-blue-200">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Navigation size={18} className="text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[13px] font-bold text-blue-800">Live Tracking Active</div>
                <div className="text-[11px] text-blue-600">Sharing location with passengers</div>
              </div>
            </button>
          </motion.div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={generateManifest}
            className="bg-white rounded-xl p-3 border border-border flex items-center gap-2"
          >
            <FileText size={18} className="text-primary" />
            <span className="text-[12px] font-semibold text-text-primary">Manifest PDF</span>
          </button>
          <button className="bg-white rounded-xl p-3 border border-border flex items-center gap-2">
            <Phone size={18} className="text-primary" />
            <span className="text-[12px] font-semibold text-text-primary">Contact HQ</span>
          </button>
        </div>
      </div>

      {/* Pending Passengers */}
      <div className="px-4 mt-4">
        <h3 className="text-[15px] font-bold text-text-primary mb-3">Pending ({pendingPassengers.length})</h3>
        
        <div className="space-y-2">
          {pendingPassengers.length === 0 ? (
            <div className="text-center py-4 text-text-muted text-[13px]">All passengers verified</div>
          ) : pendingPassengers.map((passenger, i) => (
            <motion.div
              key={passenger.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-border p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-[12px] font-bold text-text-primary">
                {passenger.seat}
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-text-primary">{passenger.name}</div>
                <div className="text-[11px] text-text-muted font-mono">{passenger.code}</div>
              </div>
              <button
                onClick={() => markBoarded(passenger.code)}
                className="bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-full"
              >
                Verify
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Verified Passengers */}
      {verifiedList.length > 0 && (
        <div className="px-4 mt-4">
          <h3 className="text-[15px] font-bold text-green-600 mb-3">Verified ({verifiedList.length})</h3>
          
          <div className="space-y-2">
            {verifiedList.map((passenger, i) => (
              <motion.div
                key={passenger.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-green-50 rounded-xl border border-green-200 p-3 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[12px] font-bold text-green-700">
                  {passenger.seat}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-green-800">{passenger.name}</div>
                  <div className="text-[11px] text-green-600 font-mono">{passenger.code}</div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={16} />
                  <span className="text-[11px] font-bold">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Other Trips */}
      <div className="px-4 mt-4">
        <h3 className="text-[15px] font-bold text-text-primary mb-3">Upcoming Trips</h3>
        
        <div className="space-y-2">
          {trips.filter(t => t.status === 'assigned').map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl border border-border p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold text-text-primary">{trip.route}</div>
                  <div className="text-[11px] text-text-muted">{trip.departureTime} • {trip.plateNumber}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(trip.status)}`}>
                  {trip.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points Info */}
      <div className="px-4 mt-4 pb-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl">⭐</div>
            <div className="flex-1">
              <div className="text-[14px] font-bold text-amber-800">30 Points Earned!</div>
              <div className="text-[11px] text-amber-700">Keep driving to earn more points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
