'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  ArrowLeft,
  LogOut,
  UserCheck,
  Building2,
} from 'lucide-react';

export const DashboardNavbar: React.FC = () => {
  const router = useRouter();
  const { user, role, loginAs, logout } = useAuth();

  const isOwner = role === 'pengelola';

  const handleSelectMode = (targetRole: 'penghuni' | 'pengelola') => {
    loginAs(targetRole);
    if (targetRole === 'penghuni') {
      router.push('/dashboard/penghuni');
    } else {
      router.push('/dashboard/pengelola');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#16110E] text-white border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Brand & Return to Home */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl font-normal tracking-tight text-white group-hover:text-[#C5A880] transition-colors">
                griya logos.
              </span>
              <span className="hidden md:inline-block text-[9px] uppercase tracking-[0.2em] text-[#C5A880] border-l border-white/20 pl-2.5 font-medium">
                Sidoarjo Kota, Jawa Timur
              </span>
            </Link>

            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ke Beranda</span>
            </Link>
          </div>

          {/* Center: Dynamic Role Switcher Pill for Pairing/Demo */}
          <div className="flex items-center bg-[#241C18] border border-white/10 rounded-full p-1 shadow-inner">
            <button
              onClick={() => handleSelectMode('penghuni')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !isOwner
                  ? 'bg-[#C5A880] text-[#1A1412] shadow-sm font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mode Penghuni</span>
            </button>

            <button
              onClick={() => handleSelectMode('pengelola')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                isOwner
                  ? 'bg-[#C5A880] text-[#1A1412] shadow-sm font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Mode Pengelola</span>
            </button>
          </div>

          {/* Right: User Profile & Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full py-1 px-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name || 'User'}
                className="w-7 h-7 rounded-full object-cover border border-[#C5A880]/50"
              />
              <div className="text-left text-xs leading-tight">
                <p className="font-semibold text-white truncate max-w-[120px]">
                  {user?.name || 'Aura Salsabila'}
                </p>
                <p className="text-[10px] text-[#C5A880]">
                  {isOwner ? 'Pemilik Kost' : user?.roomNumber || 'A-01'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Keluar dari Akun"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-rose-500/20 text-white/70 hover:text-rose-300 border border-white/10 hover:border-rose-400/30 text-xs flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
