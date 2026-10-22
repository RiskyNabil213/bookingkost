'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import {
  Menu,
  X,
  ArrowUpRight,
  User,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  Building2,
  UserCheck,
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onScrollToSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onScrollToSearch }) => {
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Katalog Kamar', href: '#collection' },
    { label: 'Fasilitas Kost', href: '#possibility' },
    { label: 'Keunggulan', href: '#vision' },
    { label: 'Ulasan Penghuni', href: '#reviews' },
    { label: 'Pesan Kamar', href: '#booking-section' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#16110E]/90 backdrop-blur-md shadow-xl border-b border-white/10 py-3.5'
            : 'bg-gradient-to-b from-black/70 via-black/25 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white transition-opacity group-hover:opacity-85">
                kost sby.
              </span>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.25em] text-[#C5A880] border-l border-white/30 pl-2.5 font-medium">
                Wonokromo Surabaya
              </span>
            </Link>

            {/* Center Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-light text-white/90 tracking-wide">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-white relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20Kost%20Sby,%20saya%20ingin%20tanya%20ketersediaan%20kamar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="hidden lg:inline">Tanya Admin</span>
              </a>

              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-5 h-5 rounded-full object-cover border border-[#C5A880]"
                    />
                    <span className="font-medium max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C5A880] text-[#1A1412] font-semibold">
                      {role === 'pengelola' ? 'Pengelola' : 'Penghuni'}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#1E1714] border border-white/15 shadow-2xl p-2 text-xs text-white space-y-1 animate-in fade-in duration-150">
                      <div className="p-2 border-b border-white/10">
                        <p className="font-semibold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-white/60 truncate">{user.email}</p>
                        <p className="text-[10px] text-[#C5A880] mt-0.5 font-medium">
                          {role === 'pengelola' ? 'Owner / Pengelola Kost' : `Kamar ${user.roomNumber || 'A-01'}`}
                        </p>
                      </div>

                      <Link
                        href={role === 'pengelola' ? '/dashboard/pengelola' : '/dashboard/penghuni'}
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 text-white"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#C5A880]" />
                        <span>Buka Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          switchRole();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white text-left"
                      >
                        {role === 'pengelola' ? (
                          <>
                            <UserCheck className="w-4 h-4 text-blue-400" />
                            <span>Ganti Mode: Penghuni</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="w-4 h-4 text-amber-400" />
                            <span>Ganti Mode: Pengelola</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-rose-500/20 text-rose-300 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar Akun</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-light text-white hover:text-[#C5A880] transition-colors"
                >
                  Masuk
                </button>
              )}

              <button
                onClick={onScrollToSearch}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1A1412] hover:bg-black text-white text-xs sm:text-sm font-medium border border-white/20 shadow-lg hover:shadow-black/40 transition-all duration-300 transform active:scale-95"
              >
                <span>Cari Kost</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onScrollToSearch}
                className="px-3 py-1.5 rounded-full bg-[#C5A880] text-[#1A1412] text-xs font-semibold"
              >
                Cari Kost
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#16110E] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto text-white">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-serif text-2xl tracking-tight text-white">kost sby.</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-light text-white/90 py-2 px-3 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href={role === 'pengelola' ? '/dashboard/pengelola' : '/dashboard/penghuni'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#C5A880] text-[#1A1412] text-sm font-semibold shadow-md"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>
                      Buka Dashboard ({role === 'pengelola' ? 'Pengelola' : 'Penghuni'})
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      switchRole();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-white/20 text-xs font-light text-white"
                  >
                    <span>Beralih ke {role === 'pengelola' ? 'Mode Penghuni' : 'Mode Pengelola'}</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-xs text-rose-300 hover:underline"
                  >
                    Keluar Akun
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 text-sm font-light text-white"
                >
                  <User className="w-4 h-4" />
                  <span>Portal Masuk Penghuni & Pengelola</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FAF7F2] text-[#1A1412] text-sm font-semibold shadow-md"
              >
                <span>Cari Kamar Tersedia</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
