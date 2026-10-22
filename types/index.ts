export type GenderCategory = 'Semua' | 'Putri' | 'Putra' | 'Campur' | 'Pasutri';

export type AvailabilityStatus = 'Available' | 'Limited' | 'Occupied';

export interface RoomFacility {
  name: string;
  iconName: string;
  category?: 'utama' | 'kamar' | 'kamar_mandi' | 'bersama';
}

export interface RoomSpecification {
  bedType: string;
  maxOccupants: number;
  bathroom: string;
  windowOrientation: string;
  electricCapacity: string;
  floorLevel: string;
}

export interface RoomItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'Putri' | 'Putra' | 'Campur' | 'Pasutri';
  rules: string[];
  size: string;
  floor: string;
  availabilityStatus: AvailabilityStatus;
  availableCount: number;
  priceMonthly: number;
  priceYearly: number;
  deposit: number;
  electricity: string;
  facilities: RoomFacility[];
  photos: string[];
  videoUrl: string;
  videoPreviewImg: string;
  description: string;
  locationDistance: string;
  address: string;
  specifications: RoomSpecification;
  roomFeatures: string[];
  bathroomFeatures: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  universityOrCompany: string;
  avatar: string;
  roomStayed: string;
  rating: number;
  quote: string;
  stayDuration: string;
  verified: boolean;
  highlightTag: string;
}

export interface Landmark {
  name: string;
  category: 'Kampus' | 'Transportasi' | 'Lifestyle' | 'Kesehatan' | 'Kuliner';
  distance: string;
  timeWalking: string;
  timeDriving: string;
  iconName: string;
}

export interface FilterState {
  category: GenderCategory;
  locationQuery: string;
  roomTypeFilter: string;
  maxPrice: number;
  billingCycle: 'monthly' | 'yearly';
  ruleFilter: string;
}

export interface BookingFormData {
  roomId: string;
  roomTitle: string;
  tenantName: string;
  phoneNumber: string;
  email: string;
  occupantType: 'Mahasiswa' | 'Karyawan / Profesional' | 'Pasangan Suami Istri';
  checkInDate: string;
  durationMonths: number;
  occupantCount: number;
  billingCycle: 'monthly' | 'yearly';
  notes?: string;
  includeParking: boolean;
}
