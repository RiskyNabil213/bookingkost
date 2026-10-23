'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { formatIDR } from '@/lib/utils';
import {
  Key,
  Wifi,
  Zap,
  Sparkles,
  CreditCard,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  QrCode,
  Calendar,
  Plus,
  Wrench,
  Bell,
  X,
  Phone,
  Send,
  Upload,
  Receipt,
  Download,
  Info,
  ChevronRight,
} from 'lucide-react';
import { MaintenanceTicket } from '@/types/dashboard';

export const TenantDashboardView: React.FC = () => {
  const {
    user,
    invoices,
    payInvoice,
    tickets,
    createTicket,
    announcements,
  } = useAuth();

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'billing' | 'maintenance' | 'guide'>('overview');

  // Interactive States
  const [showPin, setShowPin] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [guestPin, setGuestPin] = useState<string | null>(null);

  // Billing & Payment Modal State
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bca' | 'mandiri' | 'qris'>('bca');
  const [proofFileUploaded, setProofFileUploaded] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptModalInvoice, setReceiptModalInvoice] = useState<any | null>(null);

  // New Maintenance Ticket Form Modal State
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketCategory, setTicketCategory] = useState<MaintenanceTicket['category']>('AC & Udara');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState<MaintenanceTicket['priority']>('Normal');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Electricity Top Up Simulator
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenAmount, setTokenAmount] = useState('100000');
  const [tokenPurchased, setTokenPurchased] = useState(false);

  // Filter tenant specific invoices
  const tenantInvoices = invoices.filter((i) => i.tenantId === (user?.id || 'usr-tenant-01'));
  const activeInvoice = tenantInvoices.find((i) => i.status === 'unpaid') || tenantInvoices[0];

  // Copy helpers
  const handleCopyPin = (pin: string) => {
    navigator.clipboard.writeText(pin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handleCopyWifi = (pass: string) => {
    navigator.clipboard.writeText(pass);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const generateGuestPin = () => {
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString() + '#';
    setGuestPin(randomPin);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) return;
    setIsPaying(true);
    setTimeout(() => {
      payInvoice(
        selectedInvoiceId,
        paymentMethod === 'bca'
          ? 'BCA Virtual Account'
          : paymentMethod === 'mandiri'
          ? 'Mandiri Virtual Account'
          : 'QRIS Dinamis'
      );
      setIsPaying(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setSelectedInvoiceId(null);
        setProofFileUploaded(false);
      }, 1500);
    }, 1200);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDescription) return;

    createTicket({
      category: ticketCategory,
      title: ticketTitle,
      description: ticketDescription,
      priority: ticketPriority,
      roomNumber: user?.roomNumber || 'A-01',
      tenantName: user?.name || 'Aura Salsabila',
      tenantPhone: user?.phone || '0812-9843-2190',
    });

    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setShowTicketModal(false);
      setTicketTitle('');
      setTicketDescription('');
      setActiveTab('maintenance');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcoming Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E1714] via-[#2A1F1B] to-[#16110E] text-white p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
            alt="Room Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1E1714]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portal Hunian Eksklusif Penghuni</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight">
              Selamat Datang, {user?.name || 'Aura Salsabila'}
            </h1>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Kamar Anda:{' '}
              <span className="text-white font-medium">
                {user?.roomName || 'The Royal Penthouse Suite'} (Unit {user?.roomNumber || 'A-01'}, {user?.floorLevel || 'Lantai 4'})
              </span>
              . Masa sewa aktif hingga{' '}
              <span className="text-[#C5A880] font-medium">{user?.contractEnd || '15 Januari 2027'}</span>.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={() => setSelectedInvoiceId(activeInvoice?.id || 'inv-2026-11-01')}
              className="px-5 py-3 rounded-full bg-[#C5A880] hover:bg-[#B89366] text-[#1A1412] text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {activeInvoice?.status === 'unpaid' ? 'Bayar Tagihan Bulan Ini' : 'Lihat Status Tagihan'}
              </span>
            </button>

            <button
              onClick={() => setShowTicketModal(true)}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-[#C5A880]" />
              <span>Lapor Kendala</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Access Utility Cards (Door PIN, WiFi, Electric, Housekeeping) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Smart Door Lock PIN */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Key className="w-5 h-5 text-[#C5A880]" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Pintu Terkunci Aman
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">PIN Smart Lock Pintu</p>
          <div className="flex items-center justify-between mt-1 mb-3">
            <span className="font-mono text-xl font-bold tracking-widest text-[#1A1412]">
              {showPin ? (user?.smartLockPin || '7391#') : '••••#'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowPin(!showPin)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                title={showPin ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleCopyPin(user?.smartLockPin || '7391#')}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                title="Salin PIN"
              >
                {copiedPin ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
            <button
              onClick={generateGuestPin}
              className="text-[11px] text-[#8C7B70] hover:text-[#1A1412] font-medium underline"
            >
              Buat PIN Tamu (24 Jam)
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={() => setShowQrModal(true)}
              className="text-[11px] text-[#C5A880] hover:underline font-semibold"
            >
              QR Gerbang
            </button>
          </div>
          {guestPin && (
            <div className="mt-2.5 p-2 bg-amber-50/80 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 flex items-center justify-between">
              <span>PIN Tamu: <strong>{guestPin}</strong></span>
              <button
                onClick={() => handleCopyPin(guestPin)}
                className="text-[10px] font-bold text-amber-800 underline"
              >
                Salin
              </button>
            </div>
          )}
        </div>

        {/* Card 2: Dedicated WiFi */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              150 Mbps Fiber
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">SSID: {user?.wifiSSID || 'GRIYA_LOGOS_WIFI'}</p>
          <div className="flex items-center justify-between mt-1 mb-3">
            <span className="font-mono text-sm font-semibold text-[#1A1412] truncate max-w-[140px]">
              {user?.wifiPassword || 'griyalogos-sda-2026'}
            </span>
            <button
              onClick={() => handleCopyWifi(user?.wifiPassword || 'griyalogos-sda-2026')}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 flex items-center gap-1 text-xs"
              title="Salin Password WiFi"
            >
              {copiedWifi ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#6E6259]">
            <span>Status: Terhubung Cepat</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Card 3: Electricity Meter */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Sisa Daya Aman
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">Token Listrik Kamar</p>
          <div className="flex items-baseline justify-between mt-1 mb-3">
            <span className="font-mono text-2xl font-bold text-[#1A1412]">
              {user?.electricityKwh || 148.5} <span className="text-xs font-normal text-stone-500">kWh</span>
            </span>
            <button
              onClick={() => setShowTokenModal(true)}
              className="text-[11px] font-semibold text-[#C5A880] hover:underline"
            >
              + Isi Token
            </button>
          </div>
          <div className="pt-2 border-t border-stone-100 text-[11px] text-[#6E6259] flex items-center justify-between">
            <span>Estimasi: 18 Hari</span>
            <span>Meter: 2200 VA</span>
          </div>
        </div>

        {/* Card 4: Housekeeping & Cleaning */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Free 2x Seminggu
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">Layanan Kebersihan</p>
          <div className="mt-1 mb-3">
            <p className="text-sm font-semibold text-[#1A1412]">Selasa & Jumat</p>
            <p className="text-[11px] text-stone-500">Ganti sprei & deep cleaning</p>
          </div>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => {
                setTicketCategory('Housekeeping');
                setTicketTitle('Request Cleaning Tambahan');
                setTicketDescription('Mohon bersihkan kamar mandi dan rapikan meja kerja.');
                setShowTicketModal(true);
              }}
              className="text-[11px] font-semibold text-[#1A1412] hover:text-[#C5A880] flex items-center gap-1"
            >
              <span>Jadwalkan Ekstra</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-[#E8E2D4] flex items-center gap-6 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap ${
            activeTab === 'overview'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          Ringkasan & Informasi
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'billing'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          <span>Tagihan & Pembayaran</span>
          {activeInvoice?.status === 'unpaid' && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap ${
            activeTab === 'maintenance'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          Lapor Kendala & Layanan ({tickets.filter(t => t.roomNumber === (user?.roomNumber || 'A-01')).length})
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap ${
            activeTab === 'guide'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          Buku Panduan & Aturan
        </button>
      </div>

      {/* 4. Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Active Billing Card & Current Maintenance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Billing Widget */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F5EE] flex items-center justify-center text-[#1A1412]">
                    <Receipt className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1412]">
                      Tagihan Sewa Bulan {activeInvoice?.month || 'November 2026'}
                    </h3>
                    <p className="text-xs text-[#8C7B70]">
                      Jatuh tempo: <span className="font-medium text-[#1A1412]">{activeInvoice?.dueDate}</span>
                    </p>
                  </div>
                </div>

                <div>
                  {activeInvoice?.status === 'unpaid' ? (
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
                      Belum Dibayar
                    </span>
                  ) : activeInvoice?.status === 'pending_verification' ? (
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Menunggu Verifikasi</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Lunas</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Amount Breakdown */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6E6259]">
                  <span>Sewa Kamar ({user?.roomName || 'Royal Penthouse Suite'})</span>
                  <span className="font-medium text-[#1A1412]">
                    {formatIDR(activeInvoice?.breakdown.rent || 4500000)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#6E6259]">
                  <span>Biaya Kebersihan & Pemeliharaan Bersama</span>
                  <span className="font-medium text-[#1A1412]">
                    {formatIDR(activeInvoice?.breakdown.utility || 100000)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#6E6259]">
                  <span>Slot Parkir Mobil Eksklusif B1</span>
                  <span className="font-medium text-[#1A1412]">
                    {formatIDR(activeInvoice?.breakdown.parking || 100000)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#6E6259]">
                  <span>Retribusi Sampah & Keamanan 24 Jam</span>
                  <span className="font-medium text-[#1A1412]">
                    {formatIDR(activeInvoice?.breakdown.trash || 50000)}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E8E2D4] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1412]">Total Tagihan</span>
                  <span className="font-serif text-xl font-bold text-[#1A1412]">
                    {formatIDR(activeInvoice?.amount || 4750000)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveTab('billing')}
                  className="text-xs text-[#8C7B70] hover:text-[#1A1412] font-medium"
                >
                  Lihat Riwayat Semua Invoice →
                </button>

                {activeInvoice?.status === 'unpaid' ? (
                  <button
                    onClick={() => setSelectedInvoiceId(activeInvoice.id)}
                    className="px-6 py-2.5 rounded-full bg-[#1A1412] hover:bg-[#2B231E] text-white text-xs font-bold shadow-md transition-transform active:scale-95"
                  >
                    Bayar Sekarang
                  </button>
                ) : activeInvoice?.status === 'pending_verification' ? (
                  <button
                    disabled
                    className="px-5 py-2.5 rounded-full bg-stone-100 text-stone-500 text-xs font-medium cursor-not-allowed"
                  >
                    Bukti Transfer Terkirim
                  </button>
                ) : (
                  <button
                    onClick={() => setReceiptModalInvoice(activeInvoice)}
                    className="px-5 py-2 rounded-full border border-stone-200 hover:bg-stone-50 text-xs text-[#1A1412] font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Kuitansi Lunas</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active Tickets List for this tenant */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[#C5A880]" />
                  <h3 className="font-serif text-lg font-bold text-[#1A1412]">
                    Status Permintaan & Tiket Kendala
                  </h3>
                </div>
                <button
                  onClick={() => setShowTicketModal(true)}
                  className="text-xs font-semibold text-[#C5A880] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Buat Tiket Baru</span>
                </button>
              </div>

              <div className="space-y-3">
                {tickets
                  .filter((t) => t.roomNumber === (user?.roomNumber || 'A-01'))
                  .slice(0, 3)
                  .map((tkt) => (
                    <div
                      key={tkt.id}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D4] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                            {tkt.category}
                          </span>
                          <span className="text-xs font-bold text-[#1A1412]">{tkt.title}</span>
                        </div>
                        <p className="text-xs text-[#6E6259] line-clamp-1">{tkt.description}</p>
                        {tkt.scheduledTime && (
                          <p className="text-[11px] text-[#C5A880] font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Jadwal teknisi: {tkt.scheduledTime} ({tkt.technicianName || 'Teknisi Siaga'})</span>
                          </p>
                        )}
                      </div>

                      <div>
                        {tkt.status === 'Selesai' ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Selesai</span>
                          </span>
                        ) : tkt.status === 'Diproses' ? (
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Dikerjakan</span>
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                            Menunggu
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column: Announcements & Emergency Contacts */}
          <div className="space-y-6">
            {/* Announcements Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D4] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#C5A880]" />
                  <h3 className="font-serif text-base font-bold text-[#1A1412]">
                    Pengumuman Pengelola
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold">
                  Update Terbaru
                </span>
              </div>

              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                      ann.isImportant
                        ? 'bg-rose-50/50 border-rose-200/80 text-rose-950'
                        : 'bg-[#FAF7F2] border-[#E8E2D4] text-[#1A1412]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">{ann.title}</span>
                      <span className="text-[10px] text-stone-400">{ann.date}</span>
                    </div>
                    <p className="text-[11px] text-[#6E6259] leading-relaxed">{ann.content}</p>
                    <p className="text-[10px] text-[#8C7B70] pt-1 italic">— {ann.sender}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency & Reception Contacts */}
            <div className="bg-[#1A1412] text-white rounded-3xl p-6 space-y-4 shadow-lg border border-white/10">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <h3 className="font-serif text-base font-bold text-white">
                  Kontak Penting & Concierge
                </h3>
              </div>
              <p className="text-xs text-white/70">
                Staff dan pengelola Griya Logos siap melayani untuk kenyamanan dan keamanan Anda.
              </p>

              <div className="space-y-2.5 pt-1">
                <a
                  href="https://wa.me/6282332660126?text=Halo%20Pengelola%20Griya%20Logos,%20saya%20penghuni%20Kamar%20204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs transition-colors"
                >
                  <span className="font-medium text-white">Pengelola Griya Logos</span>
                  <span className="text-[#C5A880] font-semibold">0823-3266-0126</span>
                </a>

                <a
                  href="tel:081199887766"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs transition-colors"
                >
                  <span className="font-medium text-white">Pos Security Utama</span>
                  <span className="text-white/80 font-mono">Ekstensi #101</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Billing & Invoices Detail */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                  Riwayat & Status Tagihan Sewa
                </h2>
                <p className="text-xs text-[#8C7B70]">
                  Semua transaksi sewa kamar, utilitas, dan bukti pembayaran yang tersimpan rapi.
                </p>
              </div>

              {activeInvoice?.status === 'unpaid' && (
                <button
                  onClick={() => setSelectedInvoiceId(activeInvoice.id)}
                  className="px-5 py-2.5 rounded-full bg-[#1A1412] text-white text-xs font-bold shadow-md hover:bg-[#2B231E]"
                >
                  Bayar Tagihan Sekarang ({formatIDR(activeInvoice.amount)})
                </button>
              )}
            </div>

            {/* Invoices Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E2D4] text-[#8C7B70] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">No. Invoice</th>
                    <th className="py-3 px-3">Periode Bulan</th>
                    <th className="py-3 px-3">Jatuh Tempo</th>
                    <th className="py-3 px-3">Total Nominal</th>
                    <th className="py-3 px-3">Metode Bayar</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-[#1A1412]">
                  {tenantInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-medium">{inv.invoiceNumber}</td>
                      <td className="py-3.5 px-3 font-medium">{inv.month}</td>
                      <td className="py-3.5 px-3 text-stone-500">{inv.dueDate}</td>
                      <td className="py-3.5 px-3 font-semibold">{formatIDR(inv.amount)}</td>
                      <td className="py-3.5 px-3 text-stone-600">{inv.paymentMethod || '—'}</td>
                      <td className="py-3.5 px-3">
                        {inv.status === 'paid' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-200">
                            Lunas
                          </span>
                        ) : inv.status === 'pending_verification' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold text-[11px] border border-amber-200">
                            Menunggu Verifikasi
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-semibold text-[11px] border border-rose-200">
                            Belum Dibayar
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        {inv.status === 'paid' ? (
                          <button
                            onClick={() => setReceiptModalInvoice(inv)}
                            className="text-[11px] text-[#C5A880] hover:underline font-semibold"
                          >
                            Kuitansi
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedInvoiceId(inv.id)}
                            className="px-3 py-1 rounded-full bg-[#1A1412] text-white font-medium text-[11px] hover:bg-stone-800"
                          >
                            Bayar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Maintenance & Service Tickets */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                  Layanan & Lapor Kendala Kamar
                </h2>
                <p className="text-xs text-[#8C7B70]">
                  Laporkan keluhan fasilitas kamar atau pesan layanan housekeeping ekstra.
                </p>
              </div>

              <button
                onClick={() => setShowTicketModal(true)}
                className="px-5 py-2.5 rounded-full bg-[#1A1412] text-white text-xs font-bold shadow-md hover:bg-[#2B231E] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#C5A880]" />
                <span>Buat Laporan Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets
                .filter((t) => t.roomNumber === (user?.roomNumber || 'A-01'))
                .map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D4] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-stone-500">{ticket.ticketNumber}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          ticket.status === 'Selesai'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ticket.status === 'Diproses'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#1A1412]">{ticket.title}</h4>
                      <p className="text-xs text-[#6E6259] mt-1">{ticket.description}</p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 text-[11px] text-stone-500 flex items-center justify-between">
                      <span>Kategori: {ticket.category}</span>
                      <span>Dibuat: {ticket.createdAt}</span>
                    </div>

                    {ticket.scheduledTime && (
                      <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 space-y-0.5">
                        <p className="font-semibold text-[11px] text-[#C5A880]">Kunjungan Teknisi:</p>
                        <p className="text-[11px]">{ticket.scheduledTime}</p>
                        {ticket.technicianName && (
                          <p className="text-[10px] text-stone-500">Oleh: {ticket.technicianName}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Resident Guide & Rules */}
      {activeTab === 'guide' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">
              Fasilitas Eksklusif & Jam Akses
            </h3>
            <ul className="space-y-3 text-xs text-[#6E6259]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5" />
                <span>
                  <strong>Rooftop Cave Pool & Sun Deck:</strong> Buka pukul 06:00 - 21:00 WIB setiap hari. Handuk tersedia di dekat shower bilas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5" />
                <span>
                  <strong>Co-Working Executive Lounge:</strong> Akses 24 jam dengan fasilitas kopi espresso mesin & printer laser gratis di Lantai 1.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5" />
                <span>
                  <strong>Gym & Wellness Center:</strong> Buka pukul 05:30 - 22:00 WIB di Lantai Mezzanine.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">
              Tata Tertib & Kenyamanan Bersama
            </h3>
            <ul className="space-y-3 text-xs text-[#6E6259]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5" />
                <span>
                  <strong>Jam Tenang (Quiet Hours):</strong> Pukul 22:00 - 06:00 WIB mohon menjaga volume audio & percakapan di area koridor.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5" />
                <span>
                  <strong>Tamu Berkunjung:</strong> Tamu bebas diterima di Lounge Lantai 1. Untuk tamu menginap wajib melapor ke Concierge maksimal pukul 20:00 WIB.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5" />
                <span>
                  <strong>Dilarang Merokok di Dalam Kamar:</strong> Smoking area khusus tersedia di Taman Terbuka Lantai 1 dan Rooftop Terrace.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* MODAL: QR Code Gate Access */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>
            <QrCode className="w-12 h-12 text-[#1A1412] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#1A1412]">
              QR Akses Gerbang & Lift
            </h3>
            <p className="text-xs text-[#6E6259]">
              Dekatkan kode QR ini ke scanner di gerbang utama atau sensor lift untuk akses lantai penghuni.
            </p>
            <div className="w-48 h-48 bg-stone-100 mx-auto rounded-2xl flex items-center justify-center border-2 border-dashed border-[#C5A880] p-4">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=KOST_SBY_GATE_ACCESS_VALID"
                alt="Gate QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[10px] text-stone-400 font-mono">ID: {user?.id} • Unit {user?.roomNumber || 'A-01'}</p>
          </div>
        </div>
      )}

      {/* MODAL: Interactive Payment Modal */}
      {selectedInvoiceId && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E8E2D4] relative my-auto">
            <button
              onClick={() => setSelectedInvoiceId(null)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                Checkout Pembayaran Sewa
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                Pembayaran Tagihan {activeInvoice?.month}
              </h3>
              <p className="text-xs text-[#6E6259]">
                Total tagihan:{' '}
                <strong className="text-[#1A1412]">
                  {formatIDR(activeInvoice?.amount || 4750000)}
                </strong>
              </p>
            </div>

            {paymentSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-50 text-center space-y-3 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-base">Pembayaran Berhasil Dikirim!</h4>
                <p className="text-xs text-emerald-700">
                  Bukti pembayaran Anda telah masuk ke dashboard pengelola untuk verifikasi. Status tagihan otomatis terupdate.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {/* Payment Methods */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#1A1412]">Pilih Saluran Pembayaran</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bca')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'bca'
                          ? 'border-[#1A1412] bg-[#FAF7F2] font-bold text-[#1A1412] shadow-sm'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <p className="text-xs">BCA VA</p>
                      <p className="text-[10px] text-stone-400">Otomatis</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mandiri')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'mandiri'
                          ? 'border-[#1A1412] bg-[#FAF7F2] font-bold text-[#1A1412] shadow-sm'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <p className="text-xs">Mandiri VA</p>
                      <p className="text-[10px] text-stone-400">Otomatis</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qris')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === 'qris'
                          ? 'border-[#1A1412] bg-[#FAF7F2] font-bold text-[#1A1412] shadow-sm'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <p className="text-xs">QRIS Instan</p>
                      <p className="text-[10px] text-stone-400">Scan Bebas</p>
                    </button>
                  </div>
                </div>

                {/* Account Details */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">Nomor Rekening / Virtual Account:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPin('8271081298432190')}
                      className="text-[#C5A880] font-semibold text-[11px] hover:underline"
                    >
                      Salin Nomor
                    </button>
                  </div>
                  <p className="font-mono text-base font-bold text-[#1A1412] tracking-wider">
                    {paymentMethod === 'bca'
                      ? '8271 0812 9843 2190'
                      : paymentMethod === 'mandiri'
                      ? '8890 0812 9843 2190'
                      : 'QRIS GRIYA LOGOS'}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Atas Nama: <strong>Pengelola Griya Logos (Aura Salsabila)</strong>
                  </p>
                </div>

                {/* Upload Proof */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1A1412]">
                    Unggah Bukti Transfer / Struk Bank
                  </label>
                  <div
                    onClick={() => setProofFileUploaded(true)}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-colors ${
                      proofFileUploaded
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                        : 'border-stone-300 hover:border-[#C5A880] bg-stone-50 text-stone-500'
                    }`}
                  >
                    {proofFileUploaded ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs font-semibold">Bukti_Transfer_BCA_Sukses.jpg Terlampir</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-5 h-5 mx-auto text-stone-400" />
                        <p className="text-xs">Klik di sini untuk upload screenshot transfer (Simulasi)</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPaying}
                  className="w-full py-3.5 rounded-full bg-[#1A1412] hover:bg-[#2B231E] text-white text-xs font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isPaying ? (
                    <span>Memproses Verifikasi...</span>
                  ) : (
                    <>
                      <span>Kirim Konfirmasi Pembayaran</span>
                      <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Create New Maintenance Ticket */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E8E2D4] relative my-auto">
            <button
              onClick={() => setShowTicketModal(false)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                Concierge & Maintenance
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                Formulir Laporan Kendala
              </h3>
              <p className="text-xs text-[#6E6259]">
                Unit {user?.roomNumber || 'A-01'} • Tim teknisi akan merespons dalam 1x24 jam kerja.
              </p>
            </div>

            {ticketSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 text-center space-y-3 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Tiket Berhasil Dibuat!</h4>
                <p className="text-xs text-emerald-700">
                  Laporan Anda telah diteruskan ke Pengelola dan Teknisi Siaga. Anda dapat memantau statusnya di tab Lapor Kendala.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#1A1412]">Kategori Layanan</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as any)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D4] rounded-xl py-2.5 px-3 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  >
                    <option value="AC & Udara">AC & Sirkulasi Udara</option>
                    <option value="Kelistrikan & Lampu">Kelistrikan, Stopkontak & Lampu</option>
                    <option value="Sanitasi & Air">Sanitasi, Kran & Water Heater</option>
                    <option value="Kunci & Pintu">Smart Lock & Kunci Pintu</option>
                    <option value="Housekeeping">Housekeeping / Pembersihan Kamar Ekstra</option>
                    <option value="Lainnya">Lainnya / Pertanyaan Umum</option>
                  </select>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#1A1412]">Judul Kendala</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: AC kamar kurang dingin, Lampu meja putus"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D4] rounded-xl py-2.5 px-3 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#1A1412]">Rincian Penjelasan</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Jelaskan detail kendala dan waktu Anda bersedia dikunjungi teknisi..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D4] rounded-xl py-2.5 px-3 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#1A1412]">Tingkat Urgensi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Normal', 'Penting', 'Darurat'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setTicketPriority(p)}
                        className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                          ticketPriority === p
                            ? 'bg-[#1A1412] text-white border-[#1A1412]'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#1A1412] hover:bg-[#2B231E] text-white text-xs font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Kirim Laporan Tiket</span>
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Electricity Token Top Up Simulator */}
      {showTokenModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-[#E8E2D4] relative my-auto">
            <button
              onClick={() => {
                setShowTokenModal(false);
                setTokenPurchased(false);
              }}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>

            <div className="space-y-1 mb-5">
              <Zap className="w-8 h-8 text-amber-500" />
              <h3 className="font-serif text-xl font-bold text-[#1A1412]">
                Isi Token Listrik PLN
              </h3>
              <p className="text-xs text-[#6E6259]">
                Meteran Unit {user?.roomNumber || 'A-01'} (ID PLN: 5410-9982-1200)
              </p>
            </div>

            {tokenPurchased ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 text-center space-y-2 border border-emerald-200">
                <p className="font-bold text-xs">Token Berhasil Dibeli!</p>
                <p className="font-mono text-base font-bold text-stone-900 tracking-wider">
                  4829 - 1092 - 7731 - 9912
                </p>
                <p className="text-[11px] text-stone-600">
                  Masukkan 20 digit angka di atas pada keypad meteran listrik kamar Anda.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {['50000', '100000', '200000', '500000'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTokenAmount(amt)}
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        tokenAmount === amt
                          ? 'border-[#1A1412] bg-[#FAF7F2] text-[#1A1412]'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {formatIDR(parseInt(amt))}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setTokenPurchased(true)}
                  className="w-full py-3 rounded-full bg-[#1A1412] text-white text-xs font-bold hover:bg-stone-800"
                >
                  Beli Token Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Receipt Preview */}
      {receiptModalInvoice && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E8E2D4] relative my-auto space-y-4">
            <button
              onClick={() => setReceiptModalInvoice(null)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>

            <div className="text-center pb-4 border-b border-stone-100 space-y-1">
              <span className="font-serif text-2xl font-bold text-[#1A1412]">griya logos.</span>
              <p className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                Kuitansi Resmi Pembayaran Sewa
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Nomor Kuitansi:</span>
                <span className="font-mono font-bold text-stone-900">{receiptModalInvoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Nama Penghuni:</span>
                <span className="font-bold text-stone-900">{receiptModalInvoice.tenantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Kamar:</span>
                <span className="font-bold text-stone-900">Unit {receiptModalInvoice.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Bulan:</span>
                <span className="font-bold text-stone-900">{receiptModalInvoice.month}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Metode Bayar:</span>
                <span className="font-medium text-stone-900">{receiptModalInvoice.paymentMethod || 'Transfer'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="font-bold text-stone-900">Total Lunas:</span>
                <span className="font-serif text-base font-bold text-[#1A1412]">
                  {formatIDR(receiptModalInvoice.amount)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-center font-bold text-xs border border-emerald-200">
              STATUS: LUNAS & TERVERIFIKASI
            </div>

            <button
              onClick={() => {
                alert('Mengunduh e-Kuitansi PDF...');
                setReceiptModalInvoice(null);
              }}
              className="w-full py-3 rounded-full bg-[#1A1412] hover:bg-stone-800 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#C5A880]" />
              <span>Unduh Dokumen PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
