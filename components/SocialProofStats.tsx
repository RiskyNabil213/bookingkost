'use client';

import React from 'react';
import { ShieldCheck, Star, Sparkles, CheckCircle2, Users } from 'lucide-react';
import { STATS_ITEMS, TENANT_PERSONAS } from '@/data/mockData';
import { GenderCategory } from '@/types';

interface SocialProofStatsProps {
  onSelectCategory: (category: GenderCategory) => void;
  onFilterTag: (tag: string) => void;
}

export const SocialProofStats: React.FC<SocialProofStatsProps> = ({
  onSelectCategory,
  onFilterTag,
}) => {
  const verifiedAvatars = [
    {
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      name: 'dr. Nadya',
      role: 'Residen Medis',
    },
    {
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      name: 'Alex C.',
      role: 'Software Eng.',
    },
    {
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      name: 'Clarissa',
      role: 'Mahasiswi FEB',
    },
    {
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      name: 'Dimas & Istri',
      role: 'Pasutri Muda',
    },
  ];

  return (
    <section id="stats" className="py-14 bg-[#F9F6EE] border-y border-[#E8E2D4]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics Row Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-[#E8E2D4]">
          {STATS_ITEMS.map((item: { value: string; label: string; desc: string }, idx: number) => (
            <div key={idx} className="text-center sm:text-left space-y-1">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1412] tracking-tight">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#1A1412] uppercase tracking-wide">
                {item.label}
              </div>
              <p className="text-xs text-[#6E6259] hidden sm:block">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Tenant Avatars & Category Chips Row */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Avatar Social Proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3 overflow-hidden p-1">
              {verifiedAvatars.map((u, i) => (
                <div key={i} className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={u.img}
                    alt={u.name}
                    className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-white object-cover shadow-sm transition-transform group-hover:scale-110"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366] text-white" />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A1412]">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span>4.96/5.0</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6E6259]">
                Komunitas profesional & mahasiswa terpilih
              </p>
            </div>
          </div>

          {/* Interactive Persona Filter Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2">
            <span className="text-xs font-semibold text-[#8C7B70] uppercase tracking-wider mr-1 hidden sm:inline">
              Filter Cepat:
            </span>
            {TENANT_PERSONAS.map((persona: { query: string; label: string }, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  if (['Putri', 'Putra', 'Campur', 'Pasutri'].includes(persona.query)) {
                    onSelectCategory(persona.query as GenderCategory);
                  } else {
                    onFilterTag(persona.query);
                  }
                  const el = document.getElementById('rooms');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#1A1412] hover:text-[#FDFBF7] text-[#1A1412] border border-[#E8E2D4] text-xs font-medium shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {persona.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
