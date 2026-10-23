'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/types/dashboard';
import {
  X,
  Sparkles,
  User,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  UserCheck,
  Zap,
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const router = useRouter();
  const { loginAs } = useAuth();

  const [role, setRole] = useState<UserRole>('penghuni');
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role, {
      email: email || (role === 'penghuni' ? 'aura.salsabila@gmail.com' : 'hendrawan@griyalogos.com'),
      name: name || (role === 'penghuni' ? 'Aura Salsabila' : 'Bpk. Hendrawan Pratama'),
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      if (role === 'penghuni') {
        router.push('/dashboard/penghuni');
      } else {
        router.push('/dashboard/pengelola');
      }
    }, 1200);
  };

  const handleQuickDemoLogin = (targetRole: UserRole) => {
    loginAs(targetRole);
    setRole(targetRole);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      if (targetRole === 'penghuni') {
        router.push('/dashboard/penghuni');
      } else {
        router.push('/dashboard/pengelola');
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E8E2D4] overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3EFE6] hover:bg-[#1A1412] hover:text-white flex items-center justify-center text-[#1A1412] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#1A1412] text-[#FDFBF7] flex items-center justify-center mx-auto font-serif text-xl font-bold shadow-md">
            g.
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1A1412]">
            {isRegister ? 'Daftar Akun Baru' : 'Masuk ke Portal Griya Logos'}
          </h3>
          <p className="text-xs text-[#6E6259]">
            Pilih peran Anda untuk diarahkan ke halaman dashboard yang sesuai.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-5 p-1 bg-[#F0ECE1] rounded-2xl flex items-center border border-[#E8E2D4]">
          <button
            type="button"
            onClick={() => setRole('penghuni')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              role === 'penghuni'
                ? 'bg-white text-[#1A1412] shadow-sm'
                : 'text-[#6E6259] hover:text-[#1A1412]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Penghuni Kost</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('pengelola')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              role === 'pengelola'
                ? 'bg-white text-[#1A1412] shadow-sm'
                : 'text-[#6E6259] hover:text-[#1A1412]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pemilik / Pengelola</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 text-emerald-800">
            <ShieldCheck className="w-10 h-10 mx-auto text-emerald-600 animate-bounce" />
            <p className="font-bold text-sm">
              Berhasil Masuk sebagai {role === 'penghuni' ? 'Penghuni' : 'Pengelola Properti'}!
            </p>
            <p className="text-xs text-emerald-700">
              Mengalihkan ke Dashboard {role === 'penghuni' ? 'Penghuni Kost' : 'Manajemen Pengelola'}...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Quick 1-Click Demo Login Presets */}
            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D4] space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8C7B70] uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Akses Cepat 1-Klik (Demo Testing)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('penghuni')}
                  className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-[#E8E2D4] text-left transition-all hover:border-[#C5A880]"
                >
                  <p className="font-bold text-xs text-[#1A1412]">Aura Salsabila</p>
                  <p className="text-[10px] text-stone-500">Penghuni Kamar 204</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('pengelola')}
                  className="p-2.5 rounded-xl bg-white hover:bg-stone-50 border border-[#E8E2D4] text-left transition-all hover:border-[#C5A880]"
                >
                  <p className="font-bold text-xs text-[#1A1412]">Bpk. Hendrawan</p>
                  <p className="text-[10px] text-stone-500">Pengelola Griya Logos</p>
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-[#E8E2D4] w-full" />
              <span className="bg-[#FDFBF7] px-3 text-[11px] text-stone-400 uppercase tracking-widest font-medium">
                atau login akun
              </span>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {isRegister && (
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#1A1412]">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder={role === 'penghuni' ? 'Nama Penghuni' : 'Nama Pengelola'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#E8E2D4] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-[#1A1412]">Email atau WhatsApp</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={
                      role === 'penghuni' ? 'aura.salsabila@gmail.com' : 'hendrawan@griyalogos.com'
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D4] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-[#1A1412]">Kata Sandi</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D4] rounded-xl py-2.5 pl-9 pr-3 text-xs text-[#1A1412] focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1A1412] hover:bg-[#2B231E] text-white font-bold text-xs sm:text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>
                  {isRegister
                    ? `Daftar sebagai ${role === 'penghuni' ? 'Penghuni' : 'Pengelola'}`
                    : `Masuk Dashboard ${role === 'penghuni' ? 'Penghuni' : 'Pengelola'}`}
                </span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-[#6E6259] hover:text-[#1A1412] font-medium"
                >
                  {isRegister
                    ? 'Sudah memiliki akun? Masuk di sini'
                    : 'Belum memiliki akun? Buat akun baru'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
