'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Calendar,
} from 'lucide-react';
import { RoomItem } from '@/types';
import { formatIDR, getFacilityIcon, getCategoryBadgeStyle } from '@/lib/utils';

interface RoomCardProps {
  room: RoomItem;
  billingCycle: 'monthly' | 'yearly';
  onSelectDetail: (room: RoomItem) => void;
  onSelectBooking: (room: RoomItem) => void;
  onOpenVideoTour: (room: RoomItem) => void;
  onOpenLocation: (room: RoomItem) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  billingCycle,
  onSelectDetail,
  onSelectBooking,
  onOpenVideoTour,
  onOpenLocation,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const price = billingCycle === 'monthly' ? room.priceMonthly : room.priceYearly;
  const priceUnit = billingCycle === 'monthly' ? '/bulan' : '/tahun';
  const categoryBadge = getCategoryBadgeStyle(room.category);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % room.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + room.photos.length) % room.photos.length);
  };

  // Status badge config
  const getAvailabilityBadge = () => {
    if (room.availabilityStatus === 'Occupied' || room.availableCount === 0) {
      return {
        text: 'Penuh (Waitlist)',
        bg: 'bg-stone-900/80 text-stone-200',
        dot: 'bg-stone-400',
      };
    }
    if (room.availableCount <= 2) {
      return {
        text: `Tersisa ${room.availableCount} Kamar`,
        bg: 'bg-amber-950/80 text-amber-200 border border-amber-500/30',
        dot: 'bg-amber-400 animate-ping',
      };
    }
    return {
      text: `${room.availableCount} Kamar Ready`,
      bg: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/30',
      dot: 'bg-emerald-400',
    };
  };

  const statusBadge = getAvailabilityBadge();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D4] hover:border-[#C5A880]/70 luxury-card-shadow hover:luxury-card-shadow-hover transition-all duration-300 flex flex-col justify-between">
      {/* Media Top Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
        {/* Photo Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={room.photos[activePhotoIdx]}
          alt={room.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges Row */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {/* Gender / Category Pill */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border ${categoryBadge.bg} ${categoryBadge.text} ${categoryBadge.border}`}
          >
            Kost {room.category}
          </span>

          {/* Availability Status Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${statusBadge.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
            <span>{statusBadge.text}</span>
          </div>
        </div>

        {/* Slider Controls (Appear on hover) */}
        {room.photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1A1412] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#1A1412] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {room.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIdx(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activePhotoIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Virtual 360 / Video Tour Button */}
        <button
          onClick={() => onOpenVideoTour(room)}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1412]/85 hover:bg-[#1A1412] text-[#FDFBF7] text-xs font-semibold backdrop-blur-md shadow-md border border-white/20 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <Play className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
          <span>Video Tour</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-3">
          {/* Room Specs & Location Distance */}
          <div className="flex items-center justify-between text-xs text-[#8C7B70]">
            <span className="font-semibold text-[#1A1412] bg-[#F3EFE6] px-2.5 py-1 rounded-lg">
              {room.size} • {room.floor}
            </span>
            <button
              onClick={() => onOpenLocation(room)}
              className="flex items-center gap-1 text-[#6E6259] hover:text-[#1A1412] transition-colors"
              title="Lihat Jarak di Peta"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="truncate max-w-[170px]">{room.locationDistance}</span>
            </button>
          </div>

          {/* Title & Tagline */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412] group-hover:text-[#8C7355] transition-colors">
              {room.title}
            </h3>
            <p className="text-xs text-[#6E6259] mt-1 line-clamp-2">
              {room.subtitle}
            </p>
          </div>

          {/* Rules Tags Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {room.rules.slice(0, 3).map((rule, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-[#F9F6EE] text-[#6E6259] text-[11px] font-medium border border-[#E8E2D4]"
              >
                {rule}
              </span>
            ))}
          </div>

          {/* Key Facilities Icon Grid (6 items) */}
          <div className="pt-2 border-t border-[#E8E2D4]/70">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7B70] block mb-2">
              Fasilitas Unggulan Kamar
            </span>
            <div className="grid grid-cols-3 gap-2">
              {room.facilities.slice(0, 6).map((fac, idx) => {
                const Icon = getFacilityIcon(fac.iconName);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#FDFBF7] text-[#4A3E37] text-[11px] font-medium border border-[#E8E2D4]/60"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                    <span className="truncate" title={fac.name}>
                      {fac.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Price & Action CTAs */}
        <div className="pt-4 border-t border-[#E8E2D4] space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-[#8C7B70] uppercase font-medium tracking-wider block">
                Mulai dari
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold text-[#1A1412]">
                  {formatIDR(price)}
                </span>
                <span className="text-xs text-[#6E6259] font-medium">{priceUnit}</span>
              </div>
            </div>
            {billingCycle === 'yearly' && (
              <span className="text-[11px] font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full">
                Hemat Rp {(room.priceMonthly * 12 - room.priceYearly).toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Action Buttons: Detail & Booking */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onSelectDetail(room)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl border border-[#1A1412] text-[#1A1412] hover:bg-[#1A1412] hover:text-[#FDFBF7] text-xs font-semibold transition-all duration-200"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail Tipe</span>
            </button>
            <button
              onClick={() => onSelectBooking(room)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-[#1A1412] text-[#FDFBF7] hover:bg-[#2B231E] hover:shadow-lg text-xs font-semibold transition-all duration-200 active:scale-95"
            >
              <span>Booking</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
