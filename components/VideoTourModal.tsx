'use client';

import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import { RoomItem } from '@/types';
import { formatIDR } from '@/lib/utils';

interface VideoTourModalProps {
  room: RoomItem | null;
  onClose: () => void;
  onSelectBooking: (room: RoomItem) => void;
}

export const VideoTourModal: React.FC<VideoTourModalProps> = ({
  room,
  onClose,
  onSelectBooking,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!room) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#1A1412] rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 text-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <div>
              <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-widest block">
                Virtual Room Walkthrough
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {room.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={room.videoUrl}
            poster={room.videoPreviewImg}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Floating Controls Overlay */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10 pointer-events-auto">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20"
                aria-label="Play/Pause"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20"
                aria-label="Mute/Unmute"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[11px] text-stone-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              Video Tour Asli Unit Kamar
            </div>
          </div>
        </div>

        {/* Bottom Booking Action Bar */}
        <div className="p-4 sm:p-6 bg-[#221C18] flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div>
            <span className="text-xs text-stone-400 block">Sewa mulai dari:</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-white">
              {formatIDR(room.priceMonthly)} <span className="text-xs font-normal text-stone-300">/ bulan</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onSelectBooking(room);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] text-[#1A1412] font-bold text-xs sm:text-sm hover:bg-[#d4bc97] transition-all"
            >
              <span>Booking Kamar Ini</span>
              <ArrowRight className="w-4 h-4 text-[#1A1412]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
