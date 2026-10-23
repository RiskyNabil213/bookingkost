'use client';

import React, { useState } from 'react';
import {
  X,
  MapPin,
  Play,
  ArrowRight,
  Check,
} from 'lucide-react';
import { RoomItem } from '@/types';
import { formatIDR, getCategoryBadgeStyle } from '@/lib/utils';

interface RoomDetailModalProps {
  room: RoomItem | null;
  onClose: () => void;
  onSelectBooking: (room: RoomItem) => void;
  onOpenVideoTour: (room: RoomItem) => void;
  billingCycle: 'monthly' | 'yearly';
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onSelectBooking,
  onOpenVideoTour,
  billingCycle,
}) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'rules'>('specs');

  if (!room) return null;

  const price = billingCycle === 'monthly' ? room.priceMonthly : room.priceYearly;
  const priceUnit = billingCycle === 'monthly' ? '/bulan' : '/tahun';
  const categoryBadge = getCategoryBadgeStyle(room.category);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8E2D4] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E2D4] bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryBadge.bg} ${categoryBadge.text} ${categoryBadge.border}`}
            >
              Kost {room.category}
            </span>
            <span className="text-xs text-[#8C7B70] font-medium">
              {room.size} • {room.floor}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F3EFE6] hover:bg-[#1A1412] hover:text-white flex items-center justify-center text-[#1A1412] transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Main Photo Gallery & Thumbnails */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-900 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={room.photos[selectedPhotoIdx]}
                alt={room.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onOpenVideoTour(room)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1412]/90 hover:bg-[#1A1412] text-white text-xs font-medium backdrop-blur-md shadow-lg border border-white/20 transition-transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
                <span>Video Unit Kamar</span>
              </button>
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {room.photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhotoIdx(i)}
                  className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedPhotoIdx === i
                      ? 'border-[#1A1412] ring-2 ring-[#C5A880]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-1.5 pt-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1412]">
              {room.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#6E6259]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
              <span>{room.address} — {room.locationDistance}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed pt-2">
              {room.description}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-[#E8E2D4]">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'specs'
                    ? 'border-[#1A1412] text-[#1A1412]'
                    : 'border-transparent text-[#8C7B70] hover:text-[#1A1412]'
                }`}
              >
                Spesifikasi & Fasilitas
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'features'
                    ? 'border-[#1A1412] text-[#1A1412]'
                    : 'border-transparent text-[#8C7B70] hover:text-[#1A1412]'
                }`}
              >
                Perlengkapan Kamar
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'rules'
                    ? 'border-[#1A1412] text-[#1A1412]'
                    : 'border-transparent text-[#8C7B70] hover:text-[#1A1412]'
                }`}
              >
                Aturan & Ketentuan
              </button>
            </div>
          </div>

          {/* Tab 1: Specs & Facilities */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              {/* Clean Structured Table of Specs */}
              <div>
                <h4 className="text-[11px] font-bold uppercase text-[#8C7B70] tracking-wider mb-2.5">
                  Rincian Unit
                </h4>
                <div className="rounded-2xl border border-[#E8E2D4] overflow-hidden bg-white text-xs divide-y divide-[#E8E2D4]">
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Ukuran Kamar</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{room.size}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Posisi Lantai</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{room.floor}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Tipe Tempat Tidur</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{room.specifications.bedType}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Kapasitas Maksimal</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{room.specifications.maxOccupants} Orang</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Fasilitas Kamar Mandi</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{room.specifications.bathroom}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Sistem Listrik</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{room.specifications.electricCapacity}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Arah Ventilasi Jendela</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{room.specifications.windowOrientation}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-[#8C7B70] font-medium">Deposit Jaminan</span>
                    <span className="col-span-2 text-[#1A1412] font-semibold">{formatIDR(room.deposit)} (Dikembalikan utuh saat check-out)</span>
                  </div>
                </div>
              </div>

              {/* Clean Facilities Grid without icon clutter */}
              <div>
                <h4 className="text-[11px] font-bold uppercase text-[#8C7B70] tracking-wider mb-2.5">
                  Fasilitas Termasuk
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {room.facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-[#E8E2D4] text-[#1A1412] flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-[#8C7355] flex-shrink-0" />
                      <span className="font-medium truncate">{fac.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Perlengkapan Kamar & Sanitasi */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {/* Furnitur Kamar */}
              <div>
                <h4 className="text-[11px] font-bold uppercase text-[#8C7B70] tracking-wider mb-2.5">
                  Furnitur & Interior Kamar
                </h4>
                <div className="bg-white rounded-2xl border border-[#E8E2D4] p-4 space-y-2 text-xs">
                  {room.roomFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[#1A1412]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kamar Mandi */}
              <div>
                <h4 className="text-[11px] font-bold uppercase text-[#8C7B70] tracking-wider mb-2.5">
                  Kamar Mandi Pribadi
                </h4>
                <div className="bg-white rounded-2xl border border-[#E8E2D4] p-4 space-y-2 text-xs">
                  {room.bathroomFeatures.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[#1A1412]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: House Rules */}
          {activeTab === 'rules' && (
            <div className="space-y-4 text-xs">
              <div className="bg-white rounded-2xl border border-[#E8E2D4] p-4 space-y-3">
                <h4 className="text-[11px] font-bold uppercase text-[#8C7B70] tracking-wider">
                  Tata Tertib Hunian Griya Logos
                </h4>
                <div className="space-y-2.5 text-[#1A1412]">
                  {room.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-md bg-[#F3EFE6] text-[#1A1412] font-semibold text-[11px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{rule}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-[#F3EFE6] text-[#1A1412] font-semibold text-[11px] flex items-center justify-center flex-shrink-0">
                      {room.rules.length + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">
                      Dilarang membawa hewan peliharaan demi menjaga kebersihan lingkungan bersama.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-md bg-[#F3EFE6] text-[#1A1412] font-semibold text-[11px] flex items-center justify-center flex-shrink-0">
                      {room.rules.length + 2}
                    </span>
                    <span className="leading-relaxed pt-0.5">
                      Tamu berkunjung diterima di area lobby/ruang tamu komunal maksimal pukul 22.00 WIB.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F9F6EE] border border-[#E8E2D4] text-[#6E6259] leading-relaxed">
                Akses masuk bangunan menggunakan kartu pintar RFID yang aktif 24 jam. Setiap penghuni bertanggung jawab menjaga ketertiban, kebersihan, dan ketenangan lingkungan.
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 sm:p-6 border-t border-[#E8E2D4] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          <div>
            <span className="text-[10px] text-[#8C7B70] uppercase font-bold tracking-wider block">
              Tarif Sewa ({billingCycle === 'monthly' ? 'Bulanan' : 'Tahunan'})
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1412]">
                {formatIDR(price)}
              </span>
              <span className="text-xs text-[#6E6259]">{priceUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onSelectBooking(room);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-3 px-8 rounded-full bg-[#1A1412] hover:bg-black text-[#FDFBF7] text-xs sm:text-sm font-semibold shadow-lg transition-transform active:scale-95"
            >
              <span>Booking Kamar Ini</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
