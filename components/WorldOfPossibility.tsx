'use client';

import React from 'react';
import { ArrowRight, VolumeX, Bath, Wifi, Zap, ShieldCheck } from 'lucide-react';

export const WorldOfPossibility: React.FC = () => {
  return (
    <section id="possibility" className="py-20 lg:py-28 bg-[#F3EFE6] text-[#1A1412]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Top Centered Section Header */}
        <div className="text-center space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.06em] text-[#1A1412] uppercase">
            Bukan Sekadar Kamar Kost, Tapi Kenyamanan Nyata
          </h2>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C7B70] max-w-2xl mx-auto font-medium">
            35 UNIT KAMAR EKSKLUSIF DENGAN AC DAIKIN, KM DALAM, DAN WIFI 100 MBPS DI SURABAYA
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (5 cols): Headline & Micro Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1412] leading-[1.12] tracking-tight">
              Standar <br />
              Kenyamanan <br />
              Terbaik.
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#DED5C6] shadow-sm">
                <VolumeX className="w-5 h-5 text-[#8C7355] mb-1.5" />
                <span className="text-xs font-bold text-[#1A1412] block">Suasana Hening</span>
                <span className="text-[10px] text-[#6E6259]">Nyaman untuk istirahat & belajar</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#DED5C6] shadow-sm">
                <Bath className="w-5 h-5 text-[#8C7355] mb-1.5" />
                <span className="text-xs font-bold text-[#1A1412] block">Kamar Mandi Dalam</span>
                <span className="text-[10px] text-[#6E6259]">Water heater & shower Toto</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Dual Photo Composition */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Left Photo: Vertical Clean Room */}
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-xl group border border-[#DED5C6]">
              <img
                src="/images/rooms/kamar-deluxe.jpg"
                alt="Interior Kamar Kost Sby"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold">
                  <Wifi className="w-3 h-3 text-[#C5A880]" />
                  <span>WiFi Fiber 100 Mbps</span>
                </span>
                <p className="text-xs font-medium text-stone-100 mt-1.5">
                  Koneksi internet cepat dan stabil untuk WFH serta kuliah online
                </p>
              </div>
            </div>

            {/* Right Stack: Bathroom Photo + Description + Link */}
            <div className="space-y-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl group border border-[#DED5C6]">
                <img
                  src="/images/rooms/kamar-mandi.jpg"
                  alt="Kamar Mandi Dalam Bersih"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#1A1412] flex items-center gap-1.5">
                  <Bath className="w-3 h-3 text-[#8C7355]" />
                  <span>Kamar Mandi Dalam & Pemanas Air</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed font-light">
                  Kost Sby menyediakan 35 unit kamar siap huni di Wonokromo Surabaya. Setiap kamar dilengkapi kasur berkualitas, AC Daikin yang sejuk dan hemat daya, kamar mandi pribadi dengan water heater, meja kerja, serta akses kartu digital RFID 24 jam bebas jam malam.
                </p>

                <a
                  href="#collection"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1412] hover:text-[#8C7355] transition-colors group"
                >
                  <span>Lihat Pilihan Tipe Kamar</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
