'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { RoomItem } from '@/types';
import { ROOMS_DATA, NEARBY_LANDMARKS } from '@/data/mockData';
import { formatIDR } from '@/lib/utils';

interface PerfectStayBookingProps {
  onQuickBook: (params: {
    room: RoomItem;
    checkInDate: string;
    durationMonths: number;
    occupants: number;
  }) => void;
  onOpenMapModal: () => void;
}

export const PerfectStayBooking: React.FC<PerfectStayBookingProps> = ({
  onQuickBook,
  onOpenMapModal,
}) => {
  const rooms = ROOMS_DATA;
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
  const [checkInDate, setCheckInDate] = useState('2026-11-01');
  const [durationMonths, setDurationMonths] = useState(1);
  const [occupants, setOccupants] = useState(1);

  React.useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    setCheckInDate(today.toISOString().split('T')[0]);
  }, []);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  const isYearly = durationMonths >= 12;
  const calculatedTotal = isYearly
    ? (selectedRoom.priceYearly / 12) * durationMonths
    : selectedRoom.priceMonthly * durationMonths;

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
    <section id="booking-section" className="py-20 lg:py-28 bg-[#16110E] text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Pesan Kamar di Griya Logos
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
            PILIH KAMAR SESUAI KEBUTUHAN ANDA DI SIDOARJO DENGAN FASILITAS LENGKAP.
          </p>
        </div>

        {/* Large Rounded Container with Background */}
        <div className="relative isolate rounded-[2.5rem] overflow-hidden min-h-[520px] sm:min-h-[580px] p-6 sm:p-12 flex items-center shadow-2xl border border-white/10">
          <div className="absolute inset-0 z-0 bg-[#16110E]">
            <img
              src="/images/rooms/kamar-balkon.jpg"
              alt="Griya Logos Kost Eksklusif Sidoarjo"
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />
          </div>

          {/* Floating Booking Form Card */}
          <div className="relative z-10 w-full max-w-md bg-[#FAF7F2]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 text-[#1A1412]">
            <div className="space-y-1 pb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1412]">
                Rencanakan Sewa Kamar
              </h3>
              <p className="text-xs text-[#6E6259] font-light">
                Pilih kamar, tanggal masuk, dan durasi untuk cek ketersediaan langsung.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              {/* Field 1: Choose Room */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-[#8C7B70] tracking-wider block">
                  Pilih Tipe Kamar
                </label>
                <div className="relative">
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full bg-white border border-[#DED5C6] rounded-2xl py-3 px-3.5 text-xs font-semibold text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title} ({r.category}) — {formatIDR(r.priceMonthly)}/bln
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 2: Check-in Date */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-[#8C7B70] tracking-wider block">
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-white border border-[#DED5C6] rounded-2xl py-3 px-3.5 text-xs font-semibold text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                  required
                />
              </div>

              {/* Field 3: Duration & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#8C7B70] tracking-wider block">
                    Durasi Sewa
                  </label>
                  <select
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full bg-white border border-[#DED5C6] rounded-2xl py-3 px-3 text-xs font-semibold text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                  >
                    <option value={1}>1 Bulan</option>
                    <option value={3}>3 Bulan</option>
                    <option value={6}>6 Bulan</option>
                    <option value={12}>1 Tahun (Hemat 10%)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-[#8C7B70] tracking-wider block">
                    Jumlah Penghuni
                  </label>
                  <select
                    value={occupants}
                    onChange={(e) => setOccupants(Number(e.target.value))}
                    className="w-full bg-white border border-[#DED5C6] rounded-2xl py-3 px-3 text-xs font-semibold text-[#1A1412] focus:outline-none focus:ring-2 focus:ring-[#C5A880] cursor-pointer"
                  >
                    <option value={1}>1 Orang</option>
                    <option
                      value={2}
                      disabled={selectedRoom.category !== 'Pasutri' && selectedRoom.category !== 'Campur'}
                    >
                      2 Orang
                    </option>
                  </select>
                </div>
              </div>

              {/* Live Price Estimation */}
              <div className="pt-2 flex items-baseline justify-between text-xs">
                <span className="text-[#6E6259]">Estimasi Biaya ({durationMonths} Bulan):</span>
                <span className="font-serif font-bold text-base text-[#1A1412]">
                  {formatIDR(calculatedTotal)}
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1A1412] hover:bg-black text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xl transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Cek Ketersediaan & Booking Kamar</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Strategic Landmarks & Maps Matrix */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 gap-4">
            <div>
              <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider block">
                Lokasi Strategis di Sidoarjo Kota
              </span>
              <p className="text-xs text-stone-300 font-light">
                Sidoarjo Kota, Jawa Timur — Dekat Akses Tol Sidoarjo & Stasiun Sidoarjo
              </p>
            </div>
            <button
              onClick={onOpenMapModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#16110E] text-xs font-semibold transition-colors border border-white/20"
            >
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>Buka Peta Lokasi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {NEARBY_LANDMARKS.slice(0, 4).map((l, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                <span className="font-semibold text-white block truncate">{l.name}</span>
                <div className="flex items-center justify-between mt-2 text-[11px] text-stone-300">
                  <span>{l.distance}</span>
                  <span className="bg-[#25D366]/20 text-[#25D366] font-bold px-2 py-0.5 rounded-md">
                    {l.timeWalking}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
