'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '@/data/mockData';

export const TestimonialCarousel: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = TESTIMONIALS_DATA;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIdx];

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#1A1412] text-[#FDFBF7] relative overflow-hidden">
      {/* Background Subtle Luxury Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8C7355]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C5A880] text-xs font-bold uppercase tracking-widest border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cerita Nyata Penghuni</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7]">
            Kepercayaan yang Dibangun dari Kenyamanan
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-normal">
            Dengar langsung pengalaman para residen dokter, insinyur perangkat lunak, dan profesional
            yang menjadikan Griya Logos sebagai rumah kedua mereka.
          </p>
        </div>

        {/* Carousel Card Presentation */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#241D1A] rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500">
            {/* Top Row: Quote Icon & Rating */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center">
                <Quote className="w-6 h-6 fill-[#C5A880]" />
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-[#C5A880]">5.0 Verified</span>
              </div>
            </div>

            {/* Quote Body Text */}
            <div className="py-8 min-h-[160px] flex items-center">
              <p className="font-serif text-lg sm:text-2xl text-stone-100 font-light italic leading-relaxed">
                “{current.quote}”
              </p>
            </div>

            {/* Bottom Row: Tenant Bio & Room Stayed */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#C5A880]"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] fill-[#25D366] text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{current.name}</span>
                    <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-white/10 text-[#C5A880]">
                      {current.highlightTag}
                    </span>
                  </h4>
                  <p className="text-xs text-stone-300 font-medium">
                    {current.role} • {current.universityOrCompany}
                  </p>
                  <p className="text-[11px] text-[#8C7B70] mt-0.5">
                    Tinggal di <span className="text-white font-medium">{current.roomStayed}</span> ({current.stayDuration})
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIdx(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? 'w-8 bg-[#C5A880]' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
