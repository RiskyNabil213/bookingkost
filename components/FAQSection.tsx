'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '@/data/mockData';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#FDFBF7] border-t border-[#E8E2D4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EFE6] text-[#8C7355] text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1412]">
            Informasi & Panduan Lengkap
          </h2>
          <p className="text-[#6E6259] text-sm sm:text-base">
            Semua hal yang perlu Anda ketahui mengenai aturan, kenyamanan, dan proses sewa di Griya Logos Kost Eksklusif Sidoarjo.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq: { question: string; answer: string }, idx: number) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E2D4] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#1A1412] hover:text-[#8C7355] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#F9F6EE] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1A1412] text-white' : 'text-[#1A1412]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#6E6259] leading-relaxed border-t border-[#F3EFE6] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
