'use client';

import React from 'react';
import {
  ArrowRight,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#130E0C] text-[#FDFBF7] pt-20 pb-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-10 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Contact Info (5 cols) */}
          <div className="col-span-2 md:col-span-5 space-y-4">
            <span className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight block">
              kost sby.
            </span>
            <p className="text-xs text-white/70 font-light max-w-sm leading-relaxed">
              Hunian kost nyaman, bersih, dan strategis dengan 35 kamar eksklusif di Wonokromo, Surabaya Selatan. Dilengkapi akses RFID 24 jam, AC Daikin, WiFi fiber, dan kamar mandi dalam.
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/70 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] mt-0.5 shrink-0" />
                <span>Jl. Pulo Wonokromo No. 9, Wonokromo, Surabaya Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+62 812-3456-7890 (Pengelola Kost Sby)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Jam Layanan Survei: 08.00 - 20.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Col 2: Pilihan Kamar (3 cols) */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white block">
              Pilihan Kamar
            </span>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><a href="#collection" className="hover:text-white transition-colors">Tipe Standard</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Tipe Deluxe</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Tipe Balkon</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Tipe Superior</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Tipe Pasutri</a></li>
            </ul>
          </div>

          {/* Col 3: Titik Terdekat (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white block">
              Titik Terdekat
            </span>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><a href="#booking-section" className="hover:text-white transition-colors">Stasiun Wonokromo</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">DTC Wonokromo</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Royal Plaza</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">RS Islam Surabaya</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Kampus Unesa</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Terminal Joyoboyo</a></li>
            </ul>
          </div>

          {/* Col 4: Informasi (2 cols) */}
          <div className="col-span-2 md:col-span-2 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white block">
              Informasi
            </span>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><a href="#vision" className="hover:text-white transition-colors">Tentang Kost Sby</a></li>
              <li><a href="#possibility" className="hover:text-white transition-colors">Fasilitas Kost</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Ulasan Penghuni</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Tata Cara Sewa</a></li>
            </ul>
          </div>
        </div>

        {/* MASSIVE "kost sby" Typography */}
        <div className="pt-6 select-none overflow-hidden text-center">
          <span className="font-serif text-5xl sm:text-8xl md:text-[11rem] lg:text-[14rem] xl:text-[17rem] font-normal tracking-tight text-white/90 leading-none inline-block">
            kost sby
          </span>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50 font-light">
          <span>Hunian Kost Nyaman & Strategis di Wonokromo Surabaya</span>
          <span>© 2026 Kost Sby (Kos Rindu SBY). Hak Cipta Dilindungi.</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
