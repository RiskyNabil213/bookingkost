'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Eye,
  Calendar,
  MapPin,
  Play,
  Wifi,
  Wind,
  Bath,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { RoomItem, GenderCategory } from '@/types';
import { ROOMS_DATA } from '@/data/mockData';
import { formatIDR } from '@/lib/utils';

interface OurCollectionProps {
  onSelectDetail: (room: RoomItem) => void;
  onSelectBooking: (room: RoomItem) => void;
  onOpenVideoTour: (room: RoomItem) => void;
}

export const OurCollection: React.FC<OurCollectionProps> = ({
  onSelectDetail,
  onSelectBooking,
  onOpenVideoTour,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GenderCategory>('Semua');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const categories: GenderCategory[] = ['Semua', 'Putri', 'Putra', 'Campur', 'Pasutri'];

  const filteredRooms = ROOMS_DATA.filter((r) => {
    if (selectedCategory !== 'Semua' && r.category !== selectedCategory) return false;
    return true;
  });

  return (
    <section id="collection" className="py-20 lg:py-28 bg-[#F3EFE6] text-[#1A1412]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8C7B70] block">
            PILIHAN UNIT KOST SBY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1412] leading-[1.15] tracking-tight">
            Katalog Kamar Kos Rindu SBY
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6259] font-light max-w-xl mx-auto leading-relaxed">
            Semua unit kamar telah dilengkapi furnitur lengkap, AC, kamar mandi dalam, akses kunci pintar RFID 24 jam, dan WiFi dedicated.
          </p>
        </div>

        {/* Filter Bar & Billing Cycle Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#FAF7F2] border border-[#DED5C6] shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#1A1412] text-white shadow-md'
                    : 'bg-[#F3EFE6] text-[#6E6259] hover:text-[#1A1412] hover:bg-white'
                }`}
              >
                {cat === 'Semua' ? 'Semua Tipe' : `Kost ${cat}`}
              </button>
            ))}
          </div>

          {/* Billing Switch: Bulanan vs Tahunan */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-medium">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#1A1412] text-white font-bold'
                  : 'text-[#6E6259] hover:text-[#1A1412]'
              }`}
            >
              Bayar Bulanan
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#1A1412] text-white font-bold'
                  : 'text-[#6E6259] hover:text-[#1A1412]'
              }`}
            >
              <span>Bayar Tahunan</span>
              <span className="bg-[#C5A880] text-[#1A1412] text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                Diskon 10%
              </span>
            </button>
          </div>
        </div>

        {/* UNIFORM ROOM CARDS GRID — Equal image sizes, clean and responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredRooms.map((room) => {
            const price = billingCycle === 'monthly' ? room.priceMonthly : room.priceYearly;

            return (
              <div
                key={room.id}
                onClick={() => onSelectDetail(room)}
                className="group rounded-3xl bg-[#FAF7F2] border border-[#DED5C6] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* 1. Image Container with Fixed Uniform Aspect Ratio (16/10) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-200">
                  <img
                    src={room.photos[0]}
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Top Status Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-[#1A1412]/85 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
                      Kost {room.category}
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-medium flex items-center gap-1.5 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{room.availableCount} Kamar Tersedia</span>
                    </span>
                  </div>

                  {/* Video Tour Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenVideoTour(room);
                    }}
                    className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/65 hover:bg-black text-white text-[10px] font-medium flex items-center gap-1 backdrop-blur-md border border-white/20 transition-colors"
                  >
                    <Play className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
                    <span>Tur Video</span>
                  </button>
                </div>

                {/* 2. Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#8C7B70]">
                      <span>{room.size}</span>
                      <span>{room.floor}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1A1412] group-hover:text-[#8C7B70] transition-colors line-clamp-1">
                      {room.title}
                    </h3>

                    <p className="text-xs text-[#6E6259] line-clamp-2 leading-relaxed">
                      {room.subtitle}
                    </p>
                  </div>

                  {/* Facilities Pill Row */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8E2D4] text-[11px] text-[#6E6259]">
                    <span className="px-2 py-0.5 rounded-md bg-[#F3EFE6] border border-[#DED5C6]">
                      WiFi 100 Mbps
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F3EFE6] border border-[#DED5C6]">
                      AC Daikin
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F3EFE6] border border-[#DED5C6]">
                      KM Dalam
                    </span>
                  </div>

                  {/* 3. Pricing & Action Buttons */}
                  <div className="pt-3 border-t border-[#E8E2D4] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#8C7B70] uppercase tracking-wider block">
                        Tarif Sewa
                      </span>
                      <p className="font-serif text-lg sm:text-xl font-bold text-[#1A1412]">
                        {formatIDR(price)}
                        <span className="text-[11px] font-normal text-stone-500">
                          {billingCycle === 'monthly' ? ' /bln' : ' /thn'}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDetail(room);
                        }}
                        className="px-3.5 py-2 rounded-full border border-[#DED5C6] hover:bg-white text-xs font-semibold text-[#1A1412] transition-colors"
                      >
                        Detail
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBooking(room);
                        }}
                        className="w-9 h-9 rounded-full bg-[#1A1412] hover:bg-black text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
                        title="Pesan Kamar Ini"
                      >
                        <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button to explore all rooms */}
        <div className="text-center pt-4">
          <a
            href="#booking-section"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1A1412] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-lg transition-transform active:scale-95"
          >
            <span>Pesan Kamar Langsung di Kost Sby</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </a>
        </div>
      </div>
    </section>
  );
};
