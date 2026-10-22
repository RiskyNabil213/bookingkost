'use client';

import React from 'react';
import {
  X,
  MapPin,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import { NEARBY_LANDMARKS } from '@/data/mockData';

interface LocationModalProps {
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8E2D4] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E2D4] bg-white sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block">
              Peta Lokasi & Akses
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
              Kost Sby — Kos Rindu Wonokromo
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F3EFE6] hover:bg-[#1A1412] hover:text-white flex items-center justify-center text-[#1A1412] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Map Visual Preview Container */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#E8E2D4] shadow-md bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5703911485424!2d112.7346226!3d-7.3079022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb89f3b7a2c7%3A0x8c5b5d5f5d5f5d5f!2sJl.%20Pulo%20Wonokromo%20No.9!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Kost Sby Wonokromo"
            />

            <a
              href="https://maps.google.com/?q=Jl.+Pulo+Wonokromo+No.+9+Surabaya"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#1A1412] text-xs font-bold shadow-xl hover:bg-[#1A1412] hover:text-white transition-colors"
            >
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Full Address */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E2D4] space-y-1">
            <span className="text-[10px] font-bold text-[#8C7B70] uppercase tracking-wider block">
              Alamat Lengkap
            </span>
            <p className="text-sm font-semibold text-[#1A1412]">
              Jl. Pulo Wonokromo No. 9, Wonokromo, Surabaya Selatan, Jawa Timur 60241
            </p>
            <p className="text-xs text-[#6E6259]">
              Patokan: 3 menit dari Stasiun Wonokromo dan DTC (Darmo Trade Center), akses jalan mudah dilalui motor dan mobil dengan area parkir berkanopi.
            </p>
          </div>

          {/* Landmarks Matrix */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#8C7B70] uppercase tracking-wider">
              Estimasi Jarak Tempuh Titik Penting
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {NEARBY_LANDMARKS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E8E2D4] flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#1A1412]">{item.name}</span>
                  <div className="flex items-center gap-2 text-[#6E6259]">
                    <span>{item.distance}</span>
                    <span className="bg-[#25D366]/15 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                      {item.timeWalking}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#E8E2D4] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1A1412] text-white text-xs font-bold hover:bg-[#2B231E]"
          >
            Tutup Peta
          </button>
        </div>
      </div>
    </div>
  );
};
