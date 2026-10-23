'use client';

import React from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GenderCategory } from '@/types';

interface VisionToRealityProps {
  onSelectCategory?: (category: GenderCategory) => void;
}

export const VisionToReality: React.FC<VisionToRealityProps> = ({ onSelectCategory }) => {
  const categoryCircles = [
    { name: 'Standard', tag: 'Campur', img: '/images/rooms/kamar-standard.jpg', desc: 'Lantai 1' },
    { name: 'Deluxe', tag: 'Putri', img: '/images/rooms/kamar-deluxe.jpg', desc: 'Queen Bed' },
    { name: 'Balkon', tag: 'Putra', img: '/images/rooms/kamar-balkon.jpg', desc: 'Balkon Luar' },
    { name: 'Superior', tag: 'Campur', img: '/images/rooms/kamar-superior.jpg', desc: 'Meja Kerja' },
    { name: 'Pasutri', tag: 'Pasutri', img: '/images/rooms/kamar-pasutri.jpg', desc: 'Bisa Pasutri' },
  ];

  return (
    <section id="vision" className="py-20 lg:py-28 bg-[#EBE4D6] border-y border-[#DED5C6] text-[#1A1412]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols): Wide Photo + Stats Bar Below */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-2xl group border border-[#DED5C6]">
              <img
                src="/images/rooms/kamar-superior.jpg"
                alt="Griya Logos Kost Eksklusif Sidoarjo"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1A1412] flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Lingkungan Bersih, Aman & Bebas Banjir</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-2 border-b border-[#DED5C6] pb-6">
              <div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1412]">
                  35
                </div>
                <div className="text-xs uppercase tracking-wider text-[#8C7B70] font-bold mt-1">
                  Kamar Siap Huni
                </div>
                <p className="text-[11px] text-[#6E6259] hidden sm:block mt-0.5">
                  Gedung modern di Sidoarjo Kota
                </p>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1412]">
                  100 Mbps
                </div>
                <div className="text-xs uppercase tracking-wider text-[#8C7B70] font-bold mt-1">
                  Dedicated WiFi
                </div>
                <p className="text-[11px] text-[#6E6259] hidden sm:block mt-0.5">
                  Access point di tiap lantai
                </p>
              </div>

              <div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1412]">
                  24 Jam
                </div>
                <div className="text-xs uppercase tracking-wider text-[#8C7B70] font-bold mt-1">
                  Akses RFID & CCTV
                </div>
                <p className="text-[11px] text-[#6E6259] hidden sm:block mt-0.5">
                  Bebas jam malam & aman
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Description, Categories, & Link */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C7B70] block">
                TENTANG GRIYA LOGOS
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1412] leading-[1.15] tracking-tight">
                Komitmen Kenyamanan Tinggal di Sidoarjo Kota
              </h3>

              <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed font-light">
                Griya Logos Kost Eksklusif berlokasi strategis di Sidoarjo Kota, Jawa Timur, dekat dengan akses Gerbang Tol Sidoarjo, Stasiun Sidoarjo, RSUD Sidoarjo, pusat perbelanjaan, dan kawasan perkantoran. Kami menyediakan hunian kost yang tenang, bersih, aman, dan nyaman untuk pekerja profesional maupun mahasiswa.
              </p>
            </div>

            {/* Row of Circular Thumbnails */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7B70] block mb-3">
                Pilihan Tipe Kamar:
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {categoryCircles.map((cat, idx) => (
                  <a
                    key={idx}
                    href="#collection"
                    onClick={() => onSelectCategory && onSelectCategory(cat.tag as GenderCategory)}
                    className="flex flex-col items-center gap-1.5 flex-shrink-0 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110 ring-1 ring-[#C5A880]">
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-[#1A1412] tracking-wide group-hover:text-[#8C7355]">
                      {cat.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Card */}
            <div className="pt-4 border-t border-[#DED5C6]">
              <a
                href="#collection"
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#DED5C6] hover:border-[#1A1412] shadow-sm transition-all duration-300"
              >
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1A1412] group-hover:text-[#8C7355] transition-colors">
                    Fasilitas Kamar Lengkap
                  </h4>
                  <p className="text-[11px] text-[#6E6259] font-light">
                    AC, High-Speed WiFi, Smart TV, KM Dalam, Water Heater, Dapur Bersama, & Parkir Mobil/Motor Luas
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#1A1412] text-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
