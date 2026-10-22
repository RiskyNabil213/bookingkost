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
  title: "Kost Sby — Sewa Kamar Kost Bulanan di Wonokromo Surabaya",
  description:
    "Kost Sby: 35 kamar eksklusif berlokasi di Jl. Pulo Wonokromo No. 9, Wonokromo, Surabaya Selatan. Fasilitas AC Daikin, WiFi 100 Mbps, Kamar Mandi Dalam, Water Heater, Smart RFID 24 Jam.",
  keywords: [
    "kost sby",
    "kos rindu surabaya",
    "kost wonokromo",
    "kost bulanan surabaya",
    "kost ac surabaya selatan",
    "kost dekat royal plaza",
    "kost dekat unesa ketintang",
    "kost pulo wonokromo",
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
