'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Home,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { RoomItem } from '@/types';
import { ROOMS_DATA } from '@/data/mockData';
import { formatIDR } from '@/lib/utils';

interface QuickBookingWidgetProps {
  onQuickBook: (params: {
    room: RoomItem;
    checkInDate: string;
    durationMonths: number;
    occupants: number;
  }) => void;
}

export const QuickBookingWidget: React.FC<QuickBookingWidgetProps> = ({ onQuickBook }) => {
  const rooms = ROOMS_DATA;
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
  const [checkInDate, setCheckInDate] = useState('2026-11-01');
  const [minDate, setMinDate] = useState('2026-11-01');
  const [durationMonths, setDurationMonths] = useState(1);
  const [occupants, setOccupants] = useState(1);

  React.useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    setCheckInDate(today.toISOString().split('T')[0]);
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // Calculation
  const isYearly = durationMonths >= 12;
  const baseMonthlyPrice = selectedRoom.priceMonthly;
  const calculatedTotal = isYearly
    ? (selectedRoom.priceYearly / 12) * durationMonths
    : baseMonthlyPrice * durationMonths;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook({
      room: selectedRoom,
      checkInDate,
      durationMonths,
      occupants,
    });
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#16110E] text-[#FDFBF7] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A880]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C5A880] text-xs font-bold uppercase tracking-widest border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Reservation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Cek Ketersediaan & Direct Booking
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Pilih tipe kamar, tentukan tanggal masuk, dan dapatkan kepastian hunian dengan proses
            cepat tanpa biaya perantara.
          </p>
        </div>

        {/* Embedded Booking Widget Box */}
        <div className="max-w-4xl mx-auto bg-[#221C18]/90 rounded-3xl p-6 sm:p-10 border border-[#C5A880]/30 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Field 1: Pilih Tipe Kamar */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5" />
                  Pilih Kamar
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-[#2E2520] border border-white/15 rounded-2xl py-3 px-3.5 text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#1A1412] text-white">
                      {r.title} ({r.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 2: Tanggal Check-in */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  min={minDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-[#2E2520] border border-white/15 rounded-2xl py-3 px-3.5 text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                  required
                />
              </div>

              {/* Field 3: Durasi Sewa */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Durasi Sewa
                </label>
                <select
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full bg-[#2E2520] border border-white/15 rounded-2xl py-3 px-3.5 text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                >
                  <option value={1} className="bg-[#1A1412] text-white">1 Bulan (Fleksibel)</option>
                  <option value={3} className="bg-[#1A1412] text-white">3 Bulan</option>
                  <option value={6} className="bg-[#1A1412] text-white">6 Bulan (Hemat)</option>
                  <option value={12} className="bg-[#1A1412] text-white">1 Tahun (Diskon 10%)</option>
                </select>
              </div>

              {/* Field 4: Jumlah Penghuni */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Penghuni
                </label>
                <select
                  value={occupants}
                  onChange={(e) => setOccupants(Number(e.target.value))}
                  className="w-full bg-[#2E2520] border border-white/15 rounded-2xl py-3 px-3.5 text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                >
                  <option value={1} className="bg-[#1A1412] text-white">1 Orang</option>
                  <option
                    value={2}
                    disabled={selectedRoom.category !== 'Pasutri' && selectedRoom.category !== 'Campur'}
                    className="bg-[#1A1412] text-white"
                  >
                    2 Orang {selectedRoom.category === 'Putri' || selectedRoom.category === 'Putra' ? '(Hanya Suite Pasutri)' : ''}
                  </option>
                </select>
              </div>
            </div>

            {/* Price Preview & CTA Row */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-300 block">
                  Estimasi Total ({durationMonths} Bulan):
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {formatIDR(calculatedTotal)}
                  </span>
                  {isYearly && (
                    <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/20 px-2 py-0.5 rounded-full">
                      Hemat 10% Bayar Tahunan
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C5A880] text-[#1A1412] font-bold text-sm hover:bg-[#d9bc94] shadow-xl shadow-[#C5A880]/20 transition-all duration-300 transform active:scale-95"
              >
                <span>Cek Ketersediaan & Direct Booking</span>
                <ArrowRight className="w-4 h-4 text-[#1A1412]" />
              </button>
            </div>
          </form>

          {/* Quick Perks Row */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left text-xs text-stone-300 font-medium">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
              <span>Tanpa Biaya Admin & Agen</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Garansi Kamar Sesuai Foto 100%</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>Langsung Terhubung ke Pengelola</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
