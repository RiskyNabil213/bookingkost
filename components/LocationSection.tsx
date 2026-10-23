'use client';

import React from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  GraduationCap,
  Train,
  ShoppingBag,
  HeartPulse,
  Coffee,
  Store,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { NEARBY_LANDMARKS } from '@/data/mockData';

interface LocationSectionProps {
  onOpenMapModal: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenMapModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'Train':
        return Train;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'HeartPulse':
        return HeartPulse;
      case 'Coffee':
        return Coffee;
      case 'Store':
      default:
        return Store;
    }
  };

  return (
    <section id="location" className="py-20 lg:py-28 bg-[#F9F6EE] border-t border-[#E8E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Location Info & Landmarks List (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFE6] text-[#8C7355] text-xs font-bold uppercase tracking-widest border border-[#E8E2D4]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Prime Central Location</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1412]">
                Akses Mudah, <br />
                <span className="italic font-normal text-[#C5A880]">Segalanya Dekat.</span>
              </h2>
              <p className="text-[#6E6259] text-sm sm:text-base leading-relaxed">
                Terletak di kawasan elit yang tenang, aman dari kebisingan jalan raya utama namun
                hanya selangkah menuju gerbang kampus, stasiun MRT/KRL, pusat perbelanjaan, dan
                coffee shop terbaik.
              </p>
            </div>

            {/* Address Banner */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E2D4] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1A1412] text-[#C5A880] flex items-center justify-center flex-shrink-0">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1412]">
                    Griya Logos Kost Eksklusif Sidoarjo
                  </h4>
                  <p className="text-xs text-[#6E6259]">
                    Sidoarjo Kota, Jawa Timur (Dekat Akses Tol Sidoarjo & Stasiun Sidoarjo)
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenMapModal}
                className="px-3.5 py-2 rounded-xl bg-[#F3EFE6] hover:bg-[#1A1412] text-[#1A1412] hover:text-[#FDFBF7] text-xs font-bold transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Buka Peta</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Nearby Points of Interest Grid */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-[#8C7B70] uppercase tracking-wider block">
                Jarak Tempuh ke Destinasi Penting
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {NEARBY_LANDMARKS.map((item, idx) => {
                  const Icon = getIcon(item.iconName);
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/90 border border-[#E8E2D4] flex items-center justify-between gap-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-8 h-8 rounded-lg bg-[#F9F6EE] text-[#8C7355] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-xs font-bold text-[#1A1412] block truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#8C7B70]">
                            {item.distance}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[11px] font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-md">
                          {item.timeWalking}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Map Simulation Card (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#E8E2D4] shadow-2xl bg-[#E8E2D4]/50 group">
              {/* Simulated Map Visual */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Map Area Overview"
                className="w-full h-[440px] object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/80 via-transparent to-black/20 pointer-events-none" />

              {/* Pin 1: Griya Logos (Center) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#1A1412] text-[#C5A880] flex items-center justify-center shadow-2xl ring-4 ring-white animate-bounce">
                    <MapPin className="w-6 h-6 fill-[#C5A880] text-[#1A1412]" />
                  </div>
                  <div className="absolute -inset-2 rounded-full bg-[#C5A880]/40 -z-10 animate-ping" />
                </div>
                <div className="mt-2 bg-[#1A1412] text-[#FDFBF7] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xl border border-white/20 whitespace-nowrap">
                  Griya Logos
                </div>
              </div>

              {/* Pin 2: Kampus Utama */}
              <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white text-[#1A1412] flex items-center justify-center shadow-lg border border-[#E8E2D4]">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="mt-1 bg-white/90 text-[#1A1412] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Kampus (350m)
                </span>
              </div>

              {/* Pin 3: Stasiun MRT */}
              <div className="absolute bottom-20 right-1/4 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white text-[#1A1412] flex items-center justify-center shadow-lg border border-[#E8E2D4]">
                  <Train className="w-4 h-4 text-blue-600" />
                </div>
                <span className="mt-1 bg-white/90 text-[#1A1412] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Stasiun Sidoarjo (900m)
                </span>
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-4 inset-x-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/60 shadow-xl">
                <div>
                  <span className="text-xs font-bold text-[#1A1412] block">
                    Peta Interaktif & Google Maps
                  </span>
                  <span className="text-[11px] text-[#6E6259]">
                    Dapatkan rute langsung & estimasi navigasi
                  </span>
                </div>
                <button
                  onClick={onOpenMapModal}
                  className="px-4 py-2 rounded-xl bg-[#1A1412] text-[#FDFBF7] text-xs font-semibold hover:bg-[#2B231E] transition-colors"
                >
                  Jelajahi Peta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
