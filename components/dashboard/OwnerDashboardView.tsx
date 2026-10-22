'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { formatIDR } from '@/lib/utils';
import {
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wrench,
  Search,
  Filter,
  Plus,
  Send,
  MessageCircle,
  Eye,
  Check,
  X,
  Calendar,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { RoomInventoryItem, RoomOperationalStatus, TicketStatus } from '@/types/dashboard';

export const OwnerDashboardView: React.FC = () => {
  const {
    user,
    rooms,
    updateRoomStatus,
    leads,
    updateLeadStatus,
    invoices,
    verifyInvoiceAsOwner,
    tickets,
    updateTicketStatus,
    announcements,
    broadcastAnnouncement,
  } = useAuth();

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'leads' | 'finance' | 'tickets' | 'broadcast'>('overview');

  // Room Filter
  const [roomFilter, setRoomFilter] = useState<'Semua' | 'Terisi' | 'Tersedia' | 'Maintenance'>('Semua');

  // Edit Room Modal
  const [editingRoom, setEditingRoom] = useState<RoomInventoryItem | null>(null);
  const [editStatus, setEditStatus] = useState<RoomOperationalStatus>('Terisi');
  const [editPrice, setEditPrice] = useState<number>(3500000);

  // View Payment Proof Modal
  const [verifyingInvoiceId, setVerifyingInvoiceId] = useState<string | null>(null);
  const selectedInvoice = invoices.find((i) => i.id === verifyingInvoiceId);

  // Broadcast Modal / Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<'Pemberitahuan' | 'Maintenance' | 'Acara Komunitas' | 'Penting'>('Pemberitahuan');
  const [annImportant, setAnnImportant] = useState(false);
  const [annSubmitted, setAnnSubmitted] = useState(false);

  // KPI Calculations
  const totalOccupancy = rooms.filter((r) => r.status === 'Terisi').length;
  const occupancyPercentage = Math.round((totalOccupancy / rooms.length) * 100);
  const pendingInvoices = invoices.filter((i) => i.status === 'pending_verification');
  const totalPendingAmount = pendingInvoices.reduce((acc, curr) => acc + curr.amount, 0);
  const activeTicketsCount = tickets.filter((t) => t.status !== 'Selesai').length;

  const filteredRooms = rooms.filter((r) => {
    if (roomFilter === 'Semua') return true;
    return r.status === roomFilter;
  });

  const handleSaveRoomChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom) return;
    updateRoomStatus(editingRoom.id, editStatus, editPrice);
    setEditingRoom(null);
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    broadcastAnnouncement({
      title: annTitle,
      content: annContent,
      category: annCategory,
      isImportant: annImportant,
    });

    setAnnSubmitted(true);
    setTimeout(() => {
      setAnnSubmitted(false);
      setAnnTitle('');
      setAnnContent('');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Executive Property Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16110E] via-[#221A16] to-[#1A1412] text-white p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] text-xs font-medium">
              <Building2 className="w-3.5 h-3.5" />
              <span>Property Management Executive Suite</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight">
              {user?.propertyName || 'Kost Sby — Kos Rindu Wonokromo Surabaya'}
            </h1>
            <p className="text-white/70 text-xs sm:text-sm">
              Pengelola:{' '}
              <span className="text-white font-medium">{user?.name || 'Bpk. Hendrawan Pratama'}</span> •{' '}
              {user?.propertyAddress || 'Jl. Pulo Wonokromo No. 9, Wonokromo, Surabaya Selatan'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('leads')}
              className="px-5 py-3 rounded-full bg-[#C5A880] hover:bg-[#B89366] text-[#1A1412] text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>
                Booking Baru ({leads.filter((l) => l.status === 'Menunggu Review').length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-[#C5A880]" />
              <span>Broadcast Pengumuman</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Executive KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Monthly Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              +12.4% MoM
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">Pemasukan Bulan Berjalan</p>
          <p className="font-serif text-2xl font-bold text-[#1A1412] mt-1 mb-2">
            Rp 54.200.000
          </p>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#6E6259]">
            <span>Target: Rp 61.500.000</span>
            <span className="font-semibold text-emerald-600">88.1% Tercapai</span>
          </div>
        </div>

        {/* KPI 2: Realtime Occupancy */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Sangat Tinggi
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">Tingkat Okupansi Hunian</p>
          <p className="font-serif text-2xl font-bold text-[#1A1412] mt-1 mb-2">
            {occupancyPercentage}%{' '}
            <span className="text-xs font-normal text-stone-500">
              ({totalOccupancy}/{rooms.length} Kamar)
            </span>
          </p>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-[#6E6259]">
            <span>Kamar Kosong: {rooms.filter((r) => r.status === 'Tersedia').length} Unit</span>
            <span className="text-[#C5A880] font-semibold">Siap Jual</span>
          </div>
        </div>

        {/* KPI 3: Pending Payment Verification */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Perlu Tindakan
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">Verifikasi Pembayaran</p>
          <p className="font-serif text-2xl font-bold text-[#1A1412] mt-1 mb-2">
            {pendingInvoices.length} Bukti{' '}
            <span className="text-xs font-normal text-stone-500">
              ({formatIDR(totalPendingAmount)})
            </span>
          </p>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
            <button
              onClick={() => setActiveTab('finance')}
              className="text-[#C5A880] font-semibold hover:underline"
            >
              Lihat Bukti Transfer →
            </button>
          </div>
        </div>

        {/* KPI 4: Active Maintenance Tickets */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D4] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Teknisi Siaga
            </span>
          </div>
          <p className="text-xs text-[#6E6259]">Tiket Keluhan Aktif</p>
          <p className="font-serif text-2xl font-bold text-[#1A1412] mt-1 mb-2">
            {activeTicketsCount}{' '}
            <span className="text-xs font-normal text-stone-500">Permintaan</span>
          </p>
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
            <button
              onClick={() => setActiveTab('tickets')}
              className="text-[#1A1412] font-semibold hover:underline"
            >
              Kelola Tiket Kamar →
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
          Ringkasan Properti
        </button>

        <button
          onClick={() => setActiveTab('rooms')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap ${
            activeTab === 'rooms'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          Manajemen Kamar & Hunian ({rooms.length})
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'leads'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          <span>Pengajuan Booking</span>
          {leads.filter((l) => l.status === 'Menunggu Review').length > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {leads.filter((l) => l.status === 'Menunggu Review').length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'finance'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          <span>Keuangan & Verifikasi</span>
          {pendingInvoices.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap ${
            activeTab === 'tickets'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          Layanan & Perawatan ({activeTicketsCount})
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors relative whitespace-nowrap ${
            activeTab === 'broadcast'
              ? 'text-[#1A1412] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A880]'
              : 'text-[#8C7B70] hover:text-[#1A1412]'
          }`}
        >
          Broadcast Pengumuman
        </button>
      </div>

      {/* 4. Tab Content */}
      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left: Real-time Cashflow & Pending Verification Queue */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Payments Alert Card */}
            {pendingInvoices.length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-amber-900">
                    <Clock className="w-5 h-5 text-amber-700" />
                    <h3 className="font-bold text-sm">
                      {pendingInvoices.length} Bukti Pembayaran Sewa Perlu Verifikasi
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-amber-800">
                    Total: {formatIDR(totalPendingAmount)}
                  </span>
                </div>

                <div className="space-y-2">
                  {pendingInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="bg-white rounded-xl p-3.5 border border-amber-200/80 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-stone-900">
                          {inv.tenantName} — Kamar {inv.roomNumber}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          {inv.month} • {inv.paymentMethod} • {formatIDR(inv.amount)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setVerifyingInvoiceId(inv.id)}
                          className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs text-stone-700 font-medium flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Slip</span>
                        </button>

                        <button
                          onClick={() => verifyInvoiceAsOwner(inv.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Room Snapshot */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1412]">
                    Kondisi Kamar Terkini (Room Status)
                  </h3>
                  <p className="text-xs text-[#8C7B70]">
                    Pemantauan status penghuni dan ketersediaan unit kamar secara real-time.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className="text-xs font-semibold text-[#C5A880] hover:underline"
                >
                  Lihat Semua Kamar →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rooms.slice(0, 4).map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D4] flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1A1412]">Unit {r.roomNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 font-semibold">
                          {r.floor}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">{r.roomTitle}</p>
                      <p className="text-[11px] text-stone-500">
                        {r.currentTenant ? `Penghuni: ${r.currentTenant.name}` : 'Kamar Kosong'}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          r.status === 'Terisi'
                            ? 'bg-blue-100 text-blue-800'
                            : r.status === 'Tersedia'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {r.status}
                      </span>
                      <p className="text-xs font-bold text-[#1A1412] mt-1">
                        {formatIDR(r.priceMonthly)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: New Leads & Operational Expense Summary */}
          <div className="space-y-6">
            {/* Incoming Leads Widget */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8E2D4] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A880]" />
                  <h3 className="font-serif text-base font-bold text-[#1A1412]">
                    Pengajuan Sewa Terbaru
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-semibold text-[#C5A880] hover:underline"
                >
                  Detail
                </button>
              </div>

              <div className="space-y-3">
                {leads.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D4] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1A1412]">{lead.applicantName}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          lead.status === 'Disetujui'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600">{lead.roomRequested}</p>
                    <p className="text-[10px] text-stone-500">
                      Check-in: {lead.checkInDate} • {lead.durationMonths} Bulan
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Operating Expense Breakdown */}
            <div className="bg-[#1A1412] text-white rounded-3xl p-6 space-y-4 shadow-lg border border-white/10">
              <h3 className="font-serif text-base font-bold text-white">
                Beban Operasional Properti (Bulan Ini)
              </h3>
              <div className="space-y-2.5 text-xs text-white/80">
                <div className="flex justify-between">
                  <span>Listrik Area Publik & AC Sentral</span>
                  <span className="font-medium text-white">Rp 4.200.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Dedicated Fiber Optic Internet 300M</span>
                  <span className="font-medium text-white">Rp 1.850.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Gaji Tim Keamanan & Housekeeping</span>
                  <span className="font-medium text-white">Rp 9.500.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Pemeliharaan Kolam & Tandon Air</span>
                  <span className="font-medium text-white">Rp 800.000</span>
                </div>
                <div className="pt-2 border-t border-white/20 flex justify-between font-bold text-sm text-white">
                  <span>Total Pengeluaran</span>
                  <span className="text-[#C5A880]">Rp 16.350.000</span>
                </div>
                <div className="pt-1 flex justify-between text-xs text-emerald-400 font-semibold">
                  <span>Estimasi Laba Bersih (Net Cashflow)</span>
                  <span>Rp 37.850.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROOMS MANAGEMENT TAB */}
      {activeTab === 'rooms' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                  Daftar Kamar & Inventaris Hunian
                </h2>
                <p className="text-xs text-[#8C7B70]">
                  Atur status ketersediaan, ubah harga sewa bulanan, dan pantau penghuni aktif.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {(['Semua', 'Terisi', 'Tersedia', 'Maintenance'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setRoomFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      roomFilter === filter
                        ? 'bg-[#1A1412] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="rounded-2xl border border-[#E8E2D4] bg-[#FAF7F2] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={room.photoUrl}
                      alt={room.roomTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-xs font-bold">
                      Unit {room.roomNumber}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${
                          room.status === 'Terisi'
                            ? 'bg-blue-600 text-white'
                            : room.status === 'Tersedia'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {room.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1">
                    <div>
                      <h4 className="font-bold text-sm text-[#1A1412] line-clamp-1">{room.roomTitle}</h4>
                      <p className="text-xs text-stone-500">
                        {room.floor} • Luas: {room.size} • Kategori: {room.category}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200/80 space-y-1 text-xs">
                      {room.currentTenant ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Penghuni:</span>
                            <span className="font-bold text-stone-900">{room.currentTenant.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Kontrak Berakhir:</span>
                            <span className="text-stone-800">{room.currentTenant.contractEnd}</span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-stone-100">
                            <span className="text-stone-500">Status Tagihan:</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                room.currentTenant.paymentStatus === 'Lunas'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {room.currentTenant.paymentStatus}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-2 text-stone-400 text-xs">
                          Unit Kosong — Siap Dihuni
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div>
                        <p className="text-[10px] text-stone-500">Harga Sewa / Bulan</p>
                        <p className="font-serif text-base font-bold text-[#1A1412]">
                          {formatIDR(room.priceMonthly)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {room.currentTenant && (
                          <a
                            href={`https://wa.me/${room.currentTenant.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl border border-stone-200 hover:bg-white text-emerald-600"
                            title="Chat Penghuni via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => {
                            setEditingRoom(room);
                            setEditStatus(room.status);
                            setEditPrice(room.priceMonthly);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#1A1412] text-white font-medium text-xs hover:bg-stone-800"
                        >
                          Ubah Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOOKING LEADS TAB */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-6">
            <div className="pb-4 border-b border-stone-100">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                Pengajuan Sewa dari Calon Penghuni
              </h2>
              <p className="text-xs text-[#8C7B70]">
                Calon penghuni yang telah mengisi formulir booking kamar dari halaman landing page website.
              </p>
            </div>

            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D4] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1A1412]">{lead.applicantName}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1A1412] text-white">
                        {lead.occupantType}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          lead.status === 'Disetujui'
                            ? 'bg-emerald-100 text-emerald-800'
                            : lead.status === 'Ditolak'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600">
                      Kamar Diminati: <strong>{lead.roomRequested}</strong> • Durasi Sewa: {lead.durationMonths} Bulan
                    </p>

                    <p className="text-[11px] text-stone-500">
                      Rencana Check-in: <strong>{lead.checkInDate}</strong> • WhatsApp: {lead.phone} • Email: {lead.email}
                    </p>

                    {lead.notes && (
                      <p className="text-xs text-[#C5A880] italic bg-white p-2 rounded-lg border border-stone-200">
                        Catatan Calon Penghuni: &ldquo;{lead.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(lead.applicantName)},%20kami%20dari%20Pengelola%20Kost%20Sby%20menindaklanjuti%20booking%20kamar%20Anda`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {lead.status === 'Menunggu Review' && (
                      <>
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'Disetujui')}
                          className="px-3.5 py-2 rounded-xl bg-[#1A1412] hover:bg-stone-800 text-white text-xs font-semibold"
                        >
                          Setujui Booking
                        </button>

                        <button
                          onClick={() => updateLeadStatus(lead.id, 'Ditolak')}
                          className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FINANCE & VERIFICATION TAB */}
      {activeTab === 'finance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                  Keuangan & Verifikasi Bukti Transfer
                </h2>
                <p className="text-xs text-[#8C7B70]">
                  Cek kesesuaian slip transfer bank dari penghuni sebelum mengonfirmasi status sewa lunas.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E2D4] text-[#8C7B70] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">No. Invoice</th>
                    <th className="py-3 px-3">Penghuni & Kamar</th>
                    <th className="py-3 px-3">Bulan</th>
                    <th className="py-3 px-3">Nominal</th>
                    <th className="py-3 px-3">Metode Bayar</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Aksi Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-[#1A1412]">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-medium">{inv.invoiceNumber}</td>
                      <td className="py-3.5 px-3">
                        <p className="font-bold text-stone-900">{inv.tenantName}</p>
                        <p className="text-[11px] text-stone-500">Unit {inv.roomNumber}</p>
                      </td>
                      <td className="py-3.5 px-3 font-medium">{inv.month}</td>
                      <td className="py-3.5 px-3 font-bold">{formatIDR(inv.amount)}</td>
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
                            Belum Bayar
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        {inv.status === 'pending_verification' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setVerifyingInvoiceId(inv.id)}
                              className="px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-[11px] font-medium"
                            >
                              Lihat Slip
                            </button>
                            <button
                              onClick={() => verifyInvoiceAsOwner(inv.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px]"
                            >
                              Konfirmasi Lunas
                            </button>
                          </div>
                        ) : inv.status === 'paid' ? (
                          <span className="text-[11px] text-stone-400">Terverifikasi</span>
                        ) : (
                          <span className="text-[11px] text-rose-500">Menunggu Pembayaran</span>
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

      {/* TICKETS & MAINTENANCE MANAGEMENT TAB */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-6">
            <div className="pb-4 border-b border-stone-100">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                Pusat Layanan & Tiket Perawatan Properti
              </h2>
              <p className="text-xs text-[#8C7B70]">
                Tugaskan teknisi, perbarui status pengerjaan, dan pastikan fasilitas kost beroperasi sempurna.
              </p>
            </div>

            <div className="space-y-4">
              {tickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D4] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1A1412]">
                        Unit {tkt.roomNumber} ({tkt.tenantName})
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                        {tkt.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tkt.priority === 'Darurat'
                            ? 'bg-rose-100 text-rose-800'
                            : tkt.priority === 'Penting'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        Prioritas: {tkt.priority}
                      </span>
                    </div>

                    <h4 className="font-semibold text-xs text-[#1A1412]">{tkt.title}</h4>
                    <p className="text-xs text-[#6E6259]">{tkt.description}</p>
                    <p className="text-[10px] text-stone-400">
                      ID: {tkt.ticketNumber} • Dibuat: {tkt.createdAt}
                      {tkt.technicianName && ` • Teknisi: ${tkt.technicianName}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {tkt.status !== 'Selesai' && (
                      <button
                        onClick={() =>
                          updateTicketStatus(tkt.id, 'Diproses', 'Pak Budi (Teknisi Rekanan)')
                        }
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                      >
                        Tugaskan Teknisi
                      </button>
                    )}

                    {tkt.status !== 'Selesai' ? (
                      <button
                        onClick={() => updateTicketStatus(tkt.id, 'Selesai')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Tandai Selesai</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Pengerjaan Selesai</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BROADCAST ANNOUNCEMENT TAB */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D4] shadow-sm space-y-6">
            <div className="pb-3 border-b border-stone-100">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1412]">
                Kirim Pengumuman Baru ke Seluruh Penghuni
              </h2>
              <p className="text-xs text-[#8C7B70]">
                Pengumuman yang dikirim akan langsung tampil di dashboard hunian seluruh penghuni kost.
              </p>
            </div>

            {annSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 text-center space-y-3 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Pengumuman Berhasil Diterbitkan!</h4>
                <p className="text-xs text-emerald-700">
                  Notifikasi telah disiarkan ke seluruh portal penghuni Kost Sby.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1412]">Kategori</label>
                  <select
                    value={annCategory}
                    onChange={(e) => setAnnCategory(e.target.value as any)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D4] rounded-xl py-2.5 px-3 text-xs text-[#1A1412]"
                  >
                    <option value="Pemberitahuan">Pemberitahuan Umum</option>
                    <option value="Maintenance">Jadwal Perawatan & Maintenance</option>
                    <option value="Penting">Pemberitahuan Penting / Urgent</option>
                    <option value="Acara Komunitas">Acara Komunitas / Gathering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1412]">Judul Pengumuman</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pembersihan Toren Air Hari Sabtu, Fogging Nyamuk"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D4] rounded-xl py-2.5 px-3 text-xs text-[#1A1412]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1A1412]">Isi Pesan Pengumuman</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan detail informasi yang perlu diketahui penghuni..."
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E8E2D4] rounded-xl py-2.5 px-3 text-xs text-[#1A1412]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="importantCheck"
                    checked={annImportant}
                    onChange={(e) => setAnnImportant(e.target.checked)}
                    className="w-4 h-4 text-[#C5A880] rounded"
                  />
                  <label htmlFor="importantCheck" className="text-xs text-stone-700 font-medium">
                    Tandai sebagai pengumuman prioritas tinggi (Highlight merah)
                  </label>
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-full bg-[#1A1412] hover:bg-stone-800 text-white text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Siarkan Pengumuman Sekarang</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Broadcast History */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8E2D4] shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-[#1A1412] pb-2 border-b border-stone-100">
              Riwayat Pengumuman Terbit
            </h3>

            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E2D4] text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-900">{a.title}</span>
                    <span className="text-[10px] text-stone-400">{a.date}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Room Status & Price */}
      {editingRoom && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E8E2D4] relative my-auto">
            <button
              onClick={() => setEditingRoom(null)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>

            <div className="space-y-1 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                Inventaris Kamar
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1A1412]">
                Ubah Status Kamar {editingRoom.roomNumber}
              </h3>
              <p className="text-xs text-[#6E6259]">{editingRoom.roomTitle}</p>
            </div>

            <form onSubmit={handleSaveRoomChanges} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1412]">Status Operasional</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Tersedia', 'Terisi', 'Maintenance'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setEditStatus(st)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-colors ${
                        editStatus === st
                          ? 'bg-[#1A1412] text-white border-[#1A1412]'
                          : 'bg-white text-stone-600 border-stone-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1A1412]">Harga Sewa / Bulan (IDR)</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#FAF7F2] border border-[#E8E2D4] rounded-xl py-2.5 px-3 text-xs text-[#1A1412] font-semibold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#1A1412] hover:bg-stone-800 text-white text-xs font-bold shadow-md"
              >
                Simpan Perubahan Kamar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: View Payment Proof */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E8E2D4] relative my-auto space-y-4">
            <button
              onClick={() => setVerifyingInvoiceId(null)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5 text-stone-500" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                Verifikasi Bukti Transfer
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1A1412]">
                {selectedInvoice.tenantName} — Kamar {selectedInvoice.roomNumber}
              </h3>
              <p className="text-xs text-[#6E6259]">
                Nominal Transfer: <strong>{formatIDR(selectedInvoice.amount)}</strong> ({selectedInvoice.paymentMethod})
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-100 h-64 flex items-center justify-center">
              <img
                src={selectedInvoice.proofUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'}
                alt="Bukti Transfer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  verifyInvoiceAsOwner(selectedInvoice.id);
                  setVerifyingInvoiceId(null);
                }}
                className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Konfirmasi Lunas</span>
              </button>

              <button
                onClick={() => setVerifyingInvoiceId(null)}
                className="py-3 px-5 rounded-full border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
