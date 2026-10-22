export type UserRole = 'penghuni' | 'pengelola';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  // Specific to tenant
  roomId?: string;
  roomName?: string;
  roomNumber?: string;
  floorLevel?: string;
  checkInDate?: string;
  contractEnd?: string;
  monthlyRent?: number;
  smartLockPin?: string;
  wifiSSID?: string;
  wifiPassword?: string;
  electricityKwh?: number;
  // Specific to owner
  propertyName?: string;
  propertyAddress?: string;
  totalRooms?: number;
}

export type InvoiceStatus = 'unpaid' | 'pending_verification' | 'paid';

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  month: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  breakdown: {
    rent: number;
    utility: number;
    parking: number;
    trash: number;
  };
  paymentDate?: string;
  paymentMethod?: string;
  proofUrl?: string;
}

export type TicketStatus = 'Menunggu' | 'Diproses' | 'Selesai';
export type TicketPriority = 'Normal' | 'Penting' | 'Darurat';

export interface MaintenanceTicket {
  id: string;
  ticketNumber: string;
  tenantName: string;
  tenantPhone: string;
  roomNumber: string;
  category: 'AC & Udara' | 'Kelistrikan & Lampu' | 'Sanitasi & Air' | 'Kunci & Pintu' | 'Housekeeping' | 'Lainnya';
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  scheduledTime?: string;
  technicianName?: string;
}

export type RoomOperationalStatus = 'Terisi' | 'Tersedia' | 'Maintenance' | 'Booking Menunggu';

export interface RoomInventoryItem {
  id: string;
  roomNumber: string;
  roomTitle: string;
  category: 'Putri' | 'Putra' | 'Campur' | 'Pasutri';
  floor: string;
  size: string;
  priceMonthly: number;
  status: RoomOperationalStatus;
  currentTenant?: {
    name: string;
    phone: string;
    contractEnd: string;
    paymentStatus: 'Lunas' | 'Jatuh Tempo' | 'Menunggu Verifikasi';
  };
  smartLockPin: string;
  electricityKwh: number;
  photoUrl: string;
}

export interface BookingLeadItem {
  id: string;
  applicantName: string;
  phone: string;
  email: string;
  roomRequested: string;
  occupantType: string;
  checkInDate: string;
  durationMonths: number;
  billingCycle: 'monthly' | 'yearly';
  status: 'Menunggu Review' | 'Disetujui' | 'Ditolak';
  notes?: string;
  createdAt: string;
}

export interface KostAnnouncement {
  id: string;
  title: string;
  content: string;
  category: 'Pemberitahuan' | 'Maintenance' | 'Acara Komunitas' | 'Penting';
  date: string;
  sender: string;
  isImportant?: boolean;
}
