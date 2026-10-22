'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  Home,
  Check,
  Copy,
} from 'lucide-react';
import { RoomItem } from '@/types';
import { formatIDR } from '@/lib/utils';

interface BookingModalProps {
  room: RoomItem | null;
  initialCheckInDate?: string;
  initialDuration?: number;
  initialOccupants?: number;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  room,
  initialCheckInDate,
  initialDuration = 1,
  initialOccupants = 1,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(1); // 1: form, 2: success
  const [tenantName, setTenantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [occupantType, setOccupantType] = useState('Mahasiswa');
  const [checkInDate, setCheckInDate] = useState(initialCheckInDate || '2026-11-01');
  const [minDate, setMinDate] = useState('2026-11-01');
  const [durationMonths, setDurationMonths] = useState(initialDuration);
  const [occupants, setOccupants] = useState(initialOccupants);
  const [bookingType, setBookingType] = useState<'survey' | 'direct'>('direct');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  React.useEffect(() => {
    if (!initialCheckInDate) {
      const d = new Date();
      d.setDate(d.getDate() + 3);
      setCheckInDate(d.toISOString().split('T')[0]);
    }
    setMinDate(new Date().toISOString().split('T')[0]);
  }, [initialCheckInDate]);

  if (!room) return null;

  const isYearly = durationMonths >= 12;
  const unitPrice = isYearly ? room.priceYearly / 12 : room.priceMonthly;
  const totalRent = unitPrice * durationMonths;
  const deposit = room.deposit;
  const grandTotal = totalRent + deposit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `KST-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(code);
    setStep(2);
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `*KONFIRMASI BOOKING KOST SBY*\n` +
      `No. Ref: *${bookingCode}*\n` +
      `----------------------------------------\n` +
      `• *Tipe Kamar*: ${room.title} (${room.category})\n` +
      `• *Nama Penyewa*: ${tenantName}\n` +
      `• *WhatsApp*: ${phoneNumber}\n` +
      `• *Status*: ${occupantType}\n` +
      `• *Rencana Masuk*: ${checkInDate}\n` +
      `• *Durasi Sewa*: ${durationMonths} Bulan\n` +
      `• *Jumlah Penghuni*: ${occupants} Orang\n` +
      `• *Tipe Pengajuan*: ${bookingType === 'survey' ? 'Jadwalkan Survei Lokasi' : 'Booking Langsung Kamar'}\n` +
      `• *Estimasi Total*: ${formatIDR(grandTotal)}\n` +
      `----------------------------------------\n` +
      `Halo Pengelola Kost Sby, mohon konfirmasi ketersediaan kamar di atas.`
    );
    return `https://wa.me/6281234567890?text=${text}`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8E2D4] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E2D4] bg-white sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-bold text-[#8C7355] uppercase tracking-wider block">
              Reservasi Kamar
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
              {step === 1 ? 'Formulir Pemesanan Kamar' : 'Reservasi Berhasil Diajukan!'}
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
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Selected Summary Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D4] flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room.photos[0]}
                  alt={room.title}
                  className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F3EFE6] text-[#8C7355]">
                      Kost {room.category}
                    </span>
                    <span className="text-xs text-[#8C7B70]">{room.size}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1A1412] truncate mt-0.5">
                    {room.title}
                  </h4>
                  <p className="text-xs text-[#6E6259]">
                    {formatIDR(room.priceMonthly)} / bulan
                  </p>
                </div>
              </div>

              {/* Booking Option Type: Direct vs Survey */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#8C7B70] uppercase tracking-wider block">
                  Tujuan Pengajuan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingType('direct')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      bookingType === 'direct'
                        ? 'bg-[#1A1412] text-white border-[#1A1412] shadow-md'
                        : 'bg-white text-[#1A1412] border-[#E8E2D4] hover:bg-[#F9F6EE]'
                    }`}
                  >
                    <span className="text-xs font-bold block">Booking Langsung</span>
                    <span className={`text-[11px] block mt-0.5 ${bookingType === 'direct' ? 'text-stone-300' : 'text-[#6E6259]'}`}>
                      Amankan kamar langsung
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('survey')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      bookingType === 'survey'
                        ? 'bg-[#1A1412] text-white border-[#1A1412] shadow-md'
                        : 'bg-white text-[#1A1412] border-[#E8E2D4] hover:bg-[#F9F6EE]'
                    }`}
                  >
                    <span className="text-xs font-bold block">Jadwalkan Survei</span>
                    <span className={`text-[11px] block mt-0.5 ${bookingType === 'survey' ? 'text-stone-300' : 'text-[#6E6259]'}`}>
                      Lihat fisik kamar langsung
                    </span>
                  </button>
                </div>
              </div>

              {/* Rental Schedule Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#8C7B70]">Tanggal Masuk</label>
                  <input
                    type="date"
                    value={checkInDate}
                    min={minDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs font-medium text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#8C7B70]">Durasi Sewa</label>
                  <select
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs font-medium text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  >
                    <option value={1}>1 Bulan</option>
                    <option value={3}>3 Bulan</option>
                    <option value={6}>6 Bulan</option>
                    <option value={12}>1 Tahun (Hemat 10%)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#8C7B70]">Jumlah Orang</label>
                  <select
                    value={occupants}
                    onChange={(e) => setOccupants(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs font-medium text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  >
                    <option value={1}>1 Orang</option>
                    <option
                      value={2}
                      disabled={room.category !== 'Pasutri' && room.category !== 'Campur'}
                    >
                      2 Orang
                    </option>
                  </select>
                </div>
              </div>

              {/* Tenant Profile Form */}
              <div className="space-y-3 pt-2 border-t border-[#E8E2D4]">
                <h4 className="text-xs font-bold text-[#8C7B70] uppercase tracking-wider">
                  Informasi Calon Penghuni
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#1A1412]">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="e.g. Amanda Putri"
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#1A1412]">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="e.g. 081234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#1A1412]">Alamat Email</label>
                    <input
                      type="email"
                      placeholder="e.g. amanda@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#1A1412]">Status Calon Penghuni</label>
                    <select
                      value={occupantType}
                      onChange={(e) => setOccupantType(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs font-medium text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                    >
                      <option value="Mahasiswa">Mahasiswa / Mahasiswi</option>
                      <option value="Karyawan / Profesional">Karyawan / Profesional</option>
                      <option value="Dokter / Tenaga Medis">Dokter / Tenaga Medis</option>
                      <option value="Pasangan Suami Istri">Pasangan Suami Istri Sah</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#1A1412]">Catatan Tambahan (Opsional)</label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Perlu slot parkir mobil, bawa sepeda lipat, atau rencana check-in jam 10 pagi..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D4] rounded-xl p-2.5 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>
              </div>

              {/* Pricing Breakdown Summary */}
              <div className="p-4 rounded-2xl bg-[#F9F6EE] border border-[#E8E2D4] space-y-2 text-xs">
                <div className="flex justify-between text-[#6E6259]">
                  <span>Biaya Sewa ({durationMonths} Bulan):</span>
                  <span>{formatIDR(totalRent)}</span>
                </div>
                <div className="flex justify-between text-[#6E6259]">
                  <span>Deposit Jaminan (Refundable):</span>
                  <span>{formatIDR(deposit)}</span>
                </div>
                <div className="flex justify-between text-[#25D366] font-medium">
                  <span>Biaya Admin & Komisi:</span>
                  <span>GRATIS (Rp 0)</span>
                </div>
                <div className="pt-2 border-t border-[#E8E2D4] flex justify-between font-bold text-[#1A1412] text-sm">
                  <span>Estimasi Total:</span>
                  <span className="font-serif text-lg text-[#1A1412]">{formatIDR(grandTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1A1412] hover:bg-[#2B231E] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>Lanjutkan Reservasi Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </form>
          ) : (
            /* Step 2: Booking Confirmation Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1412]">
                  Pemesanan Anda Telah Dicatat!
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6259] max-w-md mx-auto">
                  Terima kasih, <strong className="text-[#1A1412]">{tenantName}</strong>. Pengajuan
                  reservasi Anda untuk <strong className="text-[#1A1412]">{room.title}</strong> telah
                  terkirim ke sistem kami.
                </p>
              </div>

              {/* Booking Reference Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D4] max-w-sm mx-auto flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C7B70] block">
                    Nomor Referensi Booking
                  </span>
                  <span className="font-mono text-base font-bold text-[#1A1412]">
                    {bookingCode}
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  className="px-3 py-1.5 rounded-lg bg-[#F3EFE6] text-[#1A1412] hover:bg-[#1A1412] hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              {/* WhatsApp Quick Direct Link */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-xl transition-transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Kirim Konfirmasi via WhatsApp Sekarang</span>
                </a>
                <p className="text-[11px] text-[#8C7B70]">
                  Klik tombol di atas untuk langsung terhubung dengan Pengelola Kost Sby.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full border border-[#1A1412] text-xs font-semibold text-[#1A1412] hover:bg-[#1A1412] hover:text-white transition-colors"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
