'use client';

import React from 'react';
import { Sparkles, Shield, Wifi, Bath, VolumeX, CheckCircle2, ArrowRight } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Acoustic Soundproofing & Total Serenity',
      desc: 'Pintu solid wood dengan sound-seal gasket dan insulasi dinding khusus untuk kesenyapan maksimal saat belajar, bekerja, dan beristirahat.',
      icon: VolumeX,
    },
    {
      number: '02',
      title: 'Private En-Suite Marble Bathroom',
      desc: 'Setiap kamar dilengkapi kamar mandi dalam berlapis marmer, rain shower bertekanan tinggi, water heater otomatis, dan exhaust blower.',
      icon: Bath,
    },
    {
      number: '03',
      title: 'Dedicated 150 Mbps Mesh Fiber WiFi',
      desc: 'Koneksi internet tanpa lag dengan router mesh terdistribusi dan port kabel LAN di setiap kamar untuk konferensi video global.',
      icon: Wifi,
    },
    {
      number: '04',
      title: 'Bi-Weekly Housekeeping & Fresh Linen',
      desc: 'Pembersihan kamar berkala oleh staf profesional dan penggantian sprei 400 thread-count serta fasilitas laundry pakaian gratis.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="highlights" className="py-20 lg:py-28 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Philosophy & Pillars (7 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFE6] text-[#8C7355] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Elevated Living Experience</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1412] leading-[1.18]">
                Not Just a Room, <br />
                <span className="italic font-normal text-[#C5A880]">A Place to Thrive.</span>
              </h2>
              <p className="text-[#6E6259] text-base sm:text-lg leading-relaxed font-normal">
                Kami memahami bahwa tempat tinggal bukan sekadar tempat tidur, melainkan tempat
                di mana ide-ide besar lahir, energi dipulihkan, dan standar hidup Anda dijaga
                dengan penuh martabat.
              </p>
            </div>

            {/* Feature Pillars List */}
            <div className="space-y-6 pt-2">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.number}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-[#E8E2D4] hover:border-[#C5A880] hover:bg-white hover:shadow-lg hover:shadow-[#1A1412]/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1A1412] text-[#C5A880] flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
                      {item.number}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-[#1A1412] group-hover:text-[#8C7355] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6E6259] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <a
                href="#rooms"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1412] text-[#FDFBF7] text-sm font-semibold hover:bg-[#2B231E] hover:shadow-xl transition-all duration-300"
              >
                <span>Lihat Koleksi Kamar Eksklusif</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </a>
            </div>
          </div>

          {/* Right Column: Asymmetric Image Collage (5 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Room Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1A1412]/10 border border-[#E8E2D4] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Bedroom Suite Interior"
                  className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium tracking-wide uppercase">
                    Sanctuary Living
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold mt-2">
                    Warm Ambient Suites
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1">
                    Dirancang dengan perpaduan Scandinavian & Japandi untuk ketenangan visual.
                  </p>
                </div>
              </div>

              {/* Overlapping Bottom-Right Card (Bathroom) */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FDFBF7] hidden sm:block group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
                  alt="Marble En-Suite Bathroom"
                  className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[11px] text-white font-medium">
                  Kamar Mandi Dalam & Water Heater
                </div>
              </div>

              {/* Overlapping Top-Left Floating Metric Card */}
              <div className="absolute -top-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#E8E2D4] max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#8C7355]" />
                  </div>
                  <span className="text-lg font-bold text-[#1A1412] font-serif">99.2%</span>
                </div>
                <p className="text-[11px] text-[#6E6259] mt-1 font-medium leading-tight">
                  Penghuni merasa produktivitas & kualitas istirahat meningkat drastis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
