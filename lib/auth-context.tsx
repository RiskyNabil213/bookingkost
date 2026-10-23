'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AuthUser,
  UserRole,
  InvoiceItem,
  MaintenanceTicket,
  RoomInventoryItem,
  BookingLeadItem,
  KostAnnouncement,
  TicketStatus,
  RoomOperationalStatus,
} from '@/types/dashboard';
import {
  DEMO_TENANT,
  DEMO_OWNER,
  INITIAL_INVOICES,
  INITIAL_TICKETS,
  INITIAL_ROOMS_INVENTORY,
  INITIAL_BOOKING_LEADS,
  INITIAL_ANNOUNCEMENTS,
} from '@/data/dashboardMockData';

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loginAs: (role: UserRole, customData?: Partial<AuthUser>) => void;
  logout: () => void;
  switchRole: () => void;

  // Invoices & Payment
  invoices: InvoiceItem[];
  payInvoice: (invoiceId: string, paymentMethod: string, proofFileUrl?: string) => void;
  verifyInvoiceAsOwner: (invoiceId: string) => void;

  // Maintenance Tickets
  tickets: MaintenanceTicket[];
  createTicket: (data: {
    category: MaintenanceTicket['category'];
    title: string;
    description: string;
    priority: MaintenanceTicket['priority'];
    roomNumber: string;
    tenantName: string;
    tenantPhone: string;
  }) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus, technicianName?: string) => void;

  // Rooms Inventory
  rooms: RoomInventoryItem[];
  updateRoomStatus: (roomId: string, status: RoomOperationalStatus, newPrice?: number) => void;

  // Booking Leads
  leads: BookingLeadItem[];
  updateLeadStatus: (leadId: string, status: 'Disetujui' | 'Ditolak') => void;

  // Announcements
  announcements: KostAnnouncement[];
  broadcastAnnouncement: (announcement: {
    title: string;
    content: string;
    category: KostAnnouncement['category'];
    isImportant?: boolean;
  }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [rooms, setRooms] = useState<RoomInventoryItem[]>(INITIAL_ROOMS_INVENTORY);
  const [leads, setLeads] = useState<BookingLeadItem[]>(INITIAL_BOOKING_LEADS);
  const [announcements, setAnnouncements] = useState<KostAnnouncement[]>(INITIAL_ANNOUNCEMENTS);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('griyalogos_auth_role');
      if (savedRole === 'penghuni') {
        setUser(DEMO_TENANT);
      } else if (savedRole === 'pengelola') {
        setUser(DEMO_OWNER);
      }
    } catch {
      // Ignore storage errors in SSR
    }
  }, []);

  const loginAs = (targetRole: UserRole, customData?: Partial<AuthUser>) => {
    const baseUser = targetRole === 'penghuni' ? DEMO_TENANT : DEMO_OWNER;
    const finalUser: AuthUser = {
      ...baseUser,
      ...customData,
      role: targetRole,
    };
    setUser(finalUser);
    try {
      localStorage.setItem('griyalogos_auth_role', targetRole);
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('griyalogos_auth_role');
    } catch {}
  };

  const switchRole = () => {
    if (!user || user.role === 'penghuni') {
      loginAs('pengelola');
    } else {
      loginAs('penghuni');
    }
  };

  // Payment handlers
  const payInvoice = (invoiceId: string, paymentMethod: string, proofFileUrl?: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'pending_verification',
            paymentMethod,
            paymentDate: 'Hari ini',
            proofUrl:
              proofFileUrl ||
              'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
          };
        }
        return inv;
      })
    );
  };

  const verifyInvoiceAsOwner = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'paid',
            paymentDate: inv.paymentDate || 'Hari ini',
          };
        }
        return inv;
      })
    );

    // Also update room inventory tenant payment status
    const targetInv = invoices.find((i) => i.id === invoiceId);
    if (targetInv) {
      setRooms((prev) =>
        prev.map((room) => {
          if (room.roomNumber === targetInv.roomNumber && room.currentTenant) {
            return {
              ...room,
              currentTenant: {
                ...room.currentTenant,
                paymentStatus: 'Lunas',
              },
            };
          }
          return room;
        })
      );
    }
  };

  // Ticket handlers
  const createTicket = (data: {
    category: MaintenanceTicket['category'];
    title: string;
    description: string;
    priority: MaintenanceTicket['priority'];
    roomNumber: string;
    tenantName: string;
    tenantPhone: string;
  }) => {
    const newId = `tkt-${Date.now().toString().slice(-4)}`;
    const newTicket: MaintenanceTicket = {
      id: newId,
      ticketNumber: `TKT/2026/10/${Math.floor(100 + Math.random() * 900)}`,
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: 'Menunggu',
      roomNumber: data.roomNumber,
      tenantName: data.tenantName,
      tenantPhone: data.tenantPhone,
      createdAt: 'Baru saja',
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus, technicianName?: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status,
            technicianName: technicianName || t.technicianName,
            scheduledTime: status === 'Diproses' ? 'Hari ini, 15:00 WIB' : t.scheduledTime,
          };
        }
        return t;
      })
    );
  };

  // Rooms inventory handlers
  const updateRoomStatus = (roomId: string, status: RoomOperationalStatus, newPrice?: number) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return {
            ...r,
            status,
            priceMonthly: newPrice !== undefined ? newPrice : r.priceMonthly,
          };
        }
        return r;
      })
    );
  };

  // Booking leads handler
  const updateLeadStatus = (leadId: string, status: 'Disetujui' | 'Ditolak') => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  // Announcement handler
  const broadcastAnnouncement = (announcement: {
    title: string;
    content: string;
    category: KostAnnouncement['category'];
    isImportant?: boolean;
  }) => {
    const newAnn: KostAnnouncement = {
      id: `ann-${Date.now()}`,
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      date: 'Hari ini',
      sender: user?.name || 'Manajemen Griya Logos',
      isImportant: announcement.isImportant || false,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        loginAs,
        logout,
        switchRole,
        invoices,
        payInvoice,
        verifyInvoiceAsOwner,
        tickets,
        createTicket,
        updateTicketStatus,
        rooms,
        updateRoomStatus,
        leads,
        updateLeadStatus,
        announcements,
        broadcastAnnouncement,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
