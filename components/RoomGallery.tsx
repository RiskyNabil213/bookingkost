'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { RoomItem, GenderCategory } from '@/types';
import { RoomCard } from './RoomCard';

interface RoomGalleryProps {
  rooms: RoomItem[];
  category: GenderCategory;
  setCategory: (cat: GenderCategory) => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  onSelectDetail: (room: RoomItem) => void;
  onSelectBooking: (room: RoomItem) => void;
  onOpenVideoTour: (room: RoomItem) => void;
  onOpenLocation: (room: RoomItem) => void;
  onResetFilters: () => void;
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({
  rooms,
  category,
  setCategory,
  billingCycle,
  setBillingCycle,
  onSelectDetail,
  onSelectBooking,
  onOpenVideoTour,
  onOpenLocation,
  onResetFilters,
}) => {
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'availability'>('recommended');

  const categories: GenderCategory[] = ['Semua', 'Putri', 'Putra', 'Campur', 'Pasutri'];

  // Sorting logic
  const sortedRooms = [...rooms].sort((a, b) => {
    const priceA = billingCycle === 'monthly' ? a.priceMonthly : a.priceYearly;
    const priceB = billingCycle === 'monthly' ? b.priceMonthly : b.priceYearly;

    if (sortBy === 'priceAsc') return priceA - priceB;
    if (sortBy === 'priceDesc') return priceB - priceA;
    if (sortBy === 'availability') return b.availableCount - a.availableCount;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8E2D4]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] text-[#8C7355] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Living Spaces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1412]">
              Koleksi Kamar & Tipe Suite
            </h2>
            <p className="text-[#6E6259] text-sm sm:text-base max-w-xl">
              Setiap kamar didesain dengan proporsi harmonis, pencahayaan alami berlimpah, dan
              furniture ergonomis standar hunian kelas atas.
            </p>
          </div>

          {/* Billing Cycle Pill Button */}
          <div className="flex items-center gap-2 p-1.5 bg-[#F9F6EE] border border-[#E8E2D4] rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#1A1412] text-[#FDFBF7] shadow-sm'
                  : 'text-[#6E6259] hover:text-[#1A1412]'
              }`}
            >
              Bayar Bulanan
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-[#1A1412] text-[#FDFBF7] shadow-sm'
                  : 'text-[#6E6259] hover:text-[#1A1412]'
              }`}
            >
              <span>Bayar Tahunan</span>
              <span className="bg-[#C5A880] text-[#1A1412] text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                -10%
              </span>
            </button>
          </div>
        </div>

        {/* Filter and Sorting Control Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  category === cat
                    ? 'bg-[#1A1412] text-[#FDFBF7] shadow-md'
                    : 'bg-white text-[#6E6259] border border-[#E8E2D4] hover:border-[#1A1412] hover:text-[#1A1412]'
                }`}
              >
                {cat === 'Semua' ? 'Semua Kategori' : `Kost ${cat}`}
              </button>
            ))}
          </div>

          {/* Right Sorter & Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="text-xs text-[#8C7B70] font-medium">
              Menampilkan <strong className="text-[#1A1412] font-bold">{sortedRooms.length}</strong> tipe kamar
            </span>

            <div className="flex items-center gap-1.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E8E2D4] rounded-xl py-2 px-3 text-xs font-medium text-[#1A1412] focus:outline-none focus:ring-1 focus:ring-[#C5A880] cursor-pointer"
              >
                <option value="recommended">Rekomendasi Pilihan</option>
                <option value="priceAsc">Harga Terendah</option>
                <option value="priceDesc">Harga Tertinggi</option>
                <option value="availability">Ketersediaan Kamar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        {sortedRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                billingCycle={billingCycle}
                onSelectDetail={onSelectDetail}
                onSelectBooking={onSelectBooking}
                onOpenVideoTour={onOpenVideoTour}
                onOpenLocation={onOpenLocation}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#E8E2D4] p-8 max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#F3EFE6] text-[#8C7355] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1A1412]">
              Kamar Tidak Ditemukan
            </h3>
            <p className="text-sm text-[#6E6259]">
              Tidak ada tipe kamar yang cocok dengan kriteria filter Anda saat ini. Cobalah ubah
              kategori atau naikkan batas budget harga.
            </p>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1412] text-[#FDFBF7] text-xs font-semibold hover:bg-[#2B231E]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
