import React from 'react';
import {
  Wifi,
  Wind,
  Bath,
  Flame,
  Bed,
  Tv,
  Compass,
  Coffee,
  Laptop,
  KeyRound,
  Shirt,
  Sparkles,
  Car,
  GraduationCap,
  Train,
  ShoppingBag,
  HeartPulse,
  Store,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Volume2,
  VolumeX,
  Info,
  Maximize2,
  Phone,
  Mail,
  HelpCircle,
  LucideIcon
} from 'lucide-react';

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getFacilityIcon(iconName: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    Wifi,
    Wind,
    Bath,
    Flame,
    Bed,
    Tv,
    Compass,
    Coffee,
    Laptop,
    KeyRound,
    Shirt,
    Sparkles,
    Car,
    GraduationCap,
    Train,
    ShoppingBag,
    HeartPulse,
    Store,
    ShieldCheck,
    CheckCircle2,
    Clock,
    MapPin,
    Calendar,
    Users,
    Search,
    Star,
    ChevronRight,
    ChevronLeft,
    X,
    Play,
    Volume2,
    VolumeX,
    Info,
    Maximize2,
    Phone,
    Mail,
    HelpCircle,
  };

  return iconMap[iconName] || Sparkles;
}

export function getCategoryBadgeStyle(category: string): { bg: string; text: string; border: string } {
  switch (category) {
    case 'Putri':
      return {
        bg: 'bg-rose-50',
        text: 'text-rose-800',
        border: 'border-rose-200',
      };
    case 'Putra':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
      };
    case 'Pasutri':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200',
      };
    case 'Campur':
    default:
      return {
        bg: 'bg-stone-100',
        text: 'text-stone-800',
        border: 'border-stone-300',
      };
  }
}
