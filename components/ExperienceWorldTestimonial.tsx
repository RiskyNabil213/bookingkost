'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/mockData';

export const ExperienceWorldTestimonial: React.FC = () => {
  const testimonials = TESTIMONIALS_DATA;
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setCurrentIdx((p) => (p + 1) % testimonials.length);
  };

  const current = testimonials[currentIdx];
  const nextItem = testimonials[(currentIdx + 1) % testimonials.length];

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#EBE4D6] border-y border-[#DED5C6] text-[#1A1412] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Tag */}
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8C7B70]">
            ULASAN PENGHUNI GRIYA LOGOS
          </span>
        </div>

        {/* Headline with Embedded Inline Avatars */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A1412] leading-[1.25] tracking-tight">
            Kenyamanan tinggal yang{' '}
            <span className="inline-flex items-center align-middle mx-1 sm:mx-2 w-14 sm:w-20 h-7 sm:h-10 rounded-full overflow-hidden shadow-md ring-2 ring-white">
              <img
                src="/images/rooms/kamar-deluxe.jpg"
                alt="Griya Logos Room"
                className="w-full h-full object-cover"
              />
            </span>{' '}
            mendukung aktivitas harian{' '}
            <span className="inline-flex items-center align-middle mx-1 sm:mx-2 -space-x-2">
              <span className="inline-block w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-white">
                <img src={testimonials[0].avatar} alt="" className="w-full h-full object-cover" />
              </span>
              <span className="inline-block w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-white">
                <img src={testimonials[1].avatar} alt="" className="w-full h-full object-cover" />
              </span>
              <span className="inline-block w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-white">
                <img src={testimonials[2].avatar} alt="" className="w-full h-full object-cover" />
              </span>
            </span>{' '}
            Anda di Sidoarjo.
          </h2>
        </div>

        {/* Testimonial Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-5xl mx-auto">
          {/* Left Mini Metric Card */}
          <div className="lg:col-span-3">
            <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#DED5C6] shadow-sm space-y-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-serif text-2xl font-bold text-[#1A1412] block">
                4.9 / 5.0
              </span>
              <p className="text-[11px] text-[#6E6259] font-light leading-snug">
                Berdasarkan ulasan pekerja kantor, tenaga medis, dan profesional di Sidoarjo Kota.
              </p>
            </div>
          </div>

          {/* Main Card: Tenant Portrait + Attached Quote */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#DED5C6] shadow-xl">
            {/* Portrait Image */}
            <div className="sm:col-span-5 relative aspect-[3/4] sm:aspect-auto bg-stone-900">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#1A1412] flex items-center gap-1 shadow">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Penghuni Terverifikasi</span>
              </div>
            </div>

            {/* Quote & Author Info */}
            <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#C5A880] fill-[#C5A880]/20" />
                <p className="font-serif text-sm sm:text-base text-[#1A1412] leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </div>

              {/* Author & Slide Arrows */}
              <div className="pt-4 border-t border-[#DED5C6] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1A1412]">
                    {current.name}
                  </h4>
                  <p className="text-[11px] text-[#8C7B70]">
                    {current.role} • {current.roomStayed}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prev}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#1A1412] hover:text-white text-[#1A1412] border border-[#DED5C6] flex items-center justify-center transition-colors"
                    aria-label="Ulasan sebelumnya"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={next}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#1A1412] hover:text-white text-[#1A1412] border border-[#DED5C6] flex items-center justify-center transition-colors"
                    aria-label="Ulasan selanjutnya"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Peek of Next Tenant */}
          <div className="hidden lg:block lg:col-span-2">
            <div
              onClick={next}
              className="rounded-3xl overflow-hidden aspect-[3/4] opacity-50 hover:opacity-90 transition-opacity cursor-pointer relative shadow-md group border border-[#DED5C6]"
            >
              <img src={nextItem.avatar} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>

        {/* Bottom Navigation & Quote */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#DED5C6] max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <a
              href="#collection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1412] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              <span>Lihat Semua Kamar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </a>
            <a
              href="#vision"
              className="px-5 py-3 rounded-full bg-[#FAF7F2] border border-[#DED5C6] text-xs font-semibold text-[#1A1412] hover:bg-white transition-colors"
            >
              Tentang Griya Logos
            </a>
          </div>

          <p className="text-xs text-[#8C7B70] max-w-sm text-center sm:text-right font-light leading-relaxed">
            Menghadirkan lingkungan kost yang bersih, tenang, dan aman agar Anda dapat beristirahat maksimal setiap hari.
          </p>
        </div>
      </div>
    </section>
  );
};
