import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Griya Logos Kost Eksklusif Sidoarjo — Hunian Nyaman & Strategis",
  description:
    "Griya Logos Kost Eksklusif Sidoarjo: Hunian eksklusif, tenang, dan strategis di Sidoarjo Kota, Jawa Timur (Dekat Akses Tol Sidoarjo & Stasiun Sidoarjo). Dilengkapi AC, High-Speed WiFi, Smart TV, Kamar Mandi Dalam & Water Heater, Parkir Mobil/Motor Luas, Akses 24 Jam Bebas Bertanggung Jawab.",
  keywords: [
    "griya logos",
    "griya logos sidoarjo",
    "kost eksklusif sidoarjo",
    "kost sidoarjo kota",
    "kost dekat tol sidoarjo",
    "kost dekat stasiun sidoarjo",
    "sewa kost sidoarjo",
    "kost ac sidoarjo",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F3EFE6] text-[#1A1412] font-sans selection:bg-[#C5A880]/30 selection:text-[#1A1412]"
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
