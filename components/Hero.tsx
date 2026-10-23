'use client';

import React from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Home,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Building,
} from 'lucide-react';
import { GenderCategory } from '@/types';

interface HeroProps {
  category: GenderCategory;
  setCategory: (cat: GenderCategory) => void;
  locationQuery: string;
  setLocationQuery: (loc: string) => void;
  roomTypeFilter: string;
  setRoomTypeFilter: (type: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  matchingCount: number;
  onApplySearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  category,
  setCategory,
  roomTypeFilter,
  setRoomTypeFilter,
  matchingCount,
  onApplySearch,
}) => {
  const tabs: { label: GenderCategory; display: string }[] = [
    { label: 'Semua', display: 'Semua Kamar' },
    { label: 'Putri', display: 'Kost Putri' },
    { label: 'Putra', display: 'Kost Putra' },
    { label: 'Campur', display: 'Kost Campur' },
    { label: 'Pasutri', display: 'Kost Pasutri' },
  ];

  return (
    <section className="relative isolate min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 1. Full-Bleed Background Photo */}
      <div className="absolute inset-0 z-0 bg-[#16110E]">
        <img
          src="/images/rooms/gedung-kost.jpg"
          alt="Griya Logos Kost Eksklusif Sidoarjo"
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* 2. Top Content: Centered Headline & Explore Button */}
      <div className="relative z-10 text-center max-w-4xl mx-auto my-auto space-y-4 pt-10 sm:pt-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A880] text-xs font-semibold tracking-wider uppercase mx-auto">
          <Building className="w-3.5 h-3.5" />
          <span>HUNIAN EKSKLUSIF DI SIDOARJO JAWA TIMUR</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.1] drop-shadow-lg">
          Hunian Eksklusif, Tenang & Strategis di <br />
          <span className="italic font-light text-[#F4ECE1]">Jantung Sidoarjo</span>
        </h1>

        <p className="text-xs sm:text-sm text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
          Kamar eksklusif berfasilitas unggulan di Sidoarjo Kota (Dekat Akses Tol Sidoarjo & Stasiun Sidoarjo) — AC, High-Speed WiFi, Smart TV, Kamar Mandi Dalam & Water Heater, Parkir Mobil/Motor Luas, Akses 24 Jam Bebas Bertanggung Jawab mulai <strong className="text-white font-semibold">Rp 1.350.000</strong>/bulan.
        </p>

        {/* Small Pill Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#collection"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/65 hover:bg-black text-white text-xs sm:text-sm font-light border border-white/30 backdrop-blur-md shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span>Lihat Kamar Tersedia</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </a>

          <a
            href="https://wa.me/6282332660126?text=Halo%20Pengelola%20Griya%20Logos,%20saya%20ingin%20tanya%20ketersediaan%20kamar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-light border border-white/20 backdrop-blur-md transition-all duration-300"
          >
            <span>Chat WhatsApp Pengelola</span>
          </a>
        </div>

        {/* Feature Badges beneath title */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-3 text-[11px] sm:text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Foto Asli Kamar</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Akses 24 Jam Bebas Bertanggung Jawab</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>High-Speed WiFi</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Parkir Mobil & Motor Luas</span>
          </span>
        </div>
      </div>

      {/* 3. Floating Glass Search & Filter Widget specifically for Griya Logos rooms */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-6 sm:mt-10">
        <div
          id="search-filter-box"
          className="rounded-3xl bg-black/55 backdrop-blur-2xl border border-white/20 p-5 sm:p-7 shadow-2xl text-white"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/15 gap-3">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-white tracking-wide flex items-center gap-2">
                <span>Cari Kamar Griya Logos</span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Total 35 Kamar
                </span>
              </h3>
              <p className="text-xs text-white/70 font-light">
                Sidoarjo Kota, Jawa Timur (Dekat Akses Tol Sidoarjo & Stasiun Sidoarjo)
              </p>
            </div>

            {/* Pill Tabs: Semua, Putri, Putra, Campur, Pasutri */}
            <div className="flex items-center gap-1 p-1 bg-white/10 rounded-full border border-white/15 backdrop-blur-md overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const isActive = category === tab.label;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setCategory(tab.label)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#F3EFE6] text-[#1A1412] shadow-md font-semibold'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.display}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Inputs Row (Filter by Room Type, Floor, Date, Duration) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-4 text-xs">
            {/* Input 1: Pilihan Tipe Kamar */}
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest block">
                Pilihan Tipe Kamar
              </span>
              <select
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
                className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer appearance-none text-xs sm:text-sm truncate"
              >
                <option value="" className="bg-[#1A1412] text-white">Semua Tipe Kamar</option>
                <option value="Standard" className="bg-[#1A1412] text-white">Kamar Standard (Rp 1.350.000)</option>
                <option value="Deluxe" className="bg-[#1A1412] text-white">Kamar Deluxe (Rp 1.400.000)</option>
                <option value="Balkon" className="bg-[#1A1412] text-white">Kamar Balkon (Rp 1.450.000)</option>
                <option value="Superior" className="bg-[#1A1412] text-white">Kamar Superior (Rp 1.550.000)</option>
                <option value="Pasutri" className="bg-[#1A1412] text-white">Kamar Pasutri (Rp 1.700.000)</option>
                <option value="Mezzanine" className="bg-[#1A1412] text-white">Kamar Mezzanine (Rp 1.850.000)</option>
              </select>
            </div>

            {/* Input 2: Rencana Check-in */}
            <div className="space-y-1 md:border-l md:border-white/15 md:pl-4">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest block">
                Rencana Check-in
              </span>
              <input
                type="date"
                defaultValue="2026-11-01"
                className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs sm:text-sm"
              />
            </div>

            {/* Input 3: Durasi Sewa */}
            <div className="space-y-1 md:border-l md:border-white/15 md:pl-4">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest block">
                Durasi Sewa
              </span>
              <select
                defaultValue="1 Bulan"
                className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer appearance-none text-xs sm:text-sm"
              >
                <option value="1 Bulan" className="bg-[#1A1412] text-white">1 Bulan (Fleksibel)</option>
                <option value="3 Bulan" className="bg-[#1A1412] text-white">3 Bulan</option>
                <option value="6 Bulan" className="bg-[#1A1412] text-white">6 Bulan (Hemat)</option>
                <option value="1 Tahun" className="bg-[#1A1412] text-white">1 Tahun (Diskon 10%)</option>
              </select>
            </div>

            {/* Input 4: Lantai Gedung */}
            <div className="space-y-1 md:border-l md:border-white/15 md:pl-4">
              <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest block">
                Pilihan Lantai
              </span>
              <select
                defaultValue=""
                className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer appearance-none text-xs sm:text-sm"
              >
                <option value="" className="bg-[#1A1412] text-white">Semua Lantai (1-3)</option>
                <option value="1" className="bg-[#1A1412] text-white">Lantai 1 (Dasar / Taman)</option>
                <option value="2" className="bg-[#1A1412] text-white">Lantai 2</option>
                <option value="3" className="bg-[#1A1412] text-white">Lantai 3 (Balkon & Rooftop)</option>
              </select>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="pt-2">
            <button
              onClick={onApplySearch}
              className="w-full py-3.5 px-6 rounded-full bg-[#F3EFE6] hover:bg-white text-[#1A1412] font-semibold text-xs sm:text-sm tracking-wide shadow-xl transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-[#1A1412]" />
              <span>Lihat Unit Kamar Tersedia ({matchingCount} Kamar Siap Huni)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
