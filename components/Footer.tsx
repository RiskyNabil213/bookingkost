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
              griya logos.
            </span>
            <p className="text-xs text-white/70 font-light max-w-sm leading-relaxed">
              Hunian kost eksklusif, tenang, dan strategis di Sidoarjo Kota, Jawa Timur. Dilengkapi AC, High-Speed WiFi, Smart TV, Kamar Mandi Dalam & Water Heater, Parkir Mobil/Motor Luas, serta Akses 24 Jam Bebas Bertanggung Jawab.
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/70 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] mt-0.5 shrink-0" />
                <span>Sidoarjo Kota, Jawa Timur (Dekat Akses Tol Sidoarjo & Stasiun Sidoarjo)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+62 823-3266-0126 (Pengelola Griya Logos)</span>
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
              <li><a href="#booking-section" className="hover:text-white transition-colors">Akses Tol Sidoarjo</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Stasiun Sidoarjo</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Alun-Alun Sidoarjo</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">RSUD Sidoarjo</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Suncity Mall Sidoarjo</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Lippo Plaza Sidoarjo</a></li>
            </ul>
          </div>

          {/* Col 4: Informasi (2 cols) */}
          <div className="col-span-2 md:col-span-2 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white block">
              Informasi
            </span>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><a href="#vision" className="hover:text-white transition-colors">Tentang Griya Logos</a></li>
              <li><a href="#possibility" className="hover:text-white transition-colors">Fasilitas Kost</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Ulasan Penghuni</a></li>
              <li><a href="#booking-section" className="hover:text-white transition-colors">Tata Cara Sewa</a></li>
            </ul>
          </div>
        </div>

        {/* MASSIVE "griya logos" Typography */}
        <div className="pt-6 select-none overflow-hidden text-center">
          <span className="font-serif text-4xl sm:text-7xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-normal tracking-tight text-white/90 leading-none inline-block">
            griya logos
          </span>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50 font-light">
          <span>Griya Logos Kost Eksklusif Sidoarjo — Hunian Nyaman & Strategis</span>
          <span>© 2026 Griya Logos Kost Eksklusif Sidoarjo. Hak Cipta Dilindungi.</span>
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
