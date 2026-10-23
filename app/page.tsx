'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WorldOfPossibility } from '@/components/WorldOfPossibility';
import { VisionToReality } from '@/components/VisionToReality';
import { OurCollection } from '@/components/OurCollection';
import { ExperienceWorldTestimonial } from '@/components/ExperienceWorldTestimonial';
import { PerfectStayBooking } from '@/components/PerfectStayBooking';
import { Footer } from '@/components/Footer';

import { RoomDetailModal } from '@/components/RoomDetailModal';
import { BookingModal } from '@/components/BookingModal';
import { VideoTourModal } from '@/components/VideoTourModal';
import { LocationModal } from '@/components/LocationModal';
import { AuthModal } from '@/components/AuthModal';

import { ROOMS_DATA } from '@/data/mockData';
import { RoomItem, GenderCategory } from '@/types';

export default function Home() {
  // Search & Filter State
  const [category, setCategory] = useState<GenderCategory>('Semua');
  const [locationQuery, setLocationQuery] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Modals State
  const [detailRoom, setDetailRoom] = useState<RoomItem | null>(null);
  const [bookingRoom, setBookingRoom] = useState<RoomItem | null>(null);
  const [bookingPrefill, setBookingPrefill] = useState<{
    checkInDate?: string;
    durationMonths?: number;
    occupants?: number;
  }>({});
  const [videoRoom, setVideoRoom] = useState<RoomItem | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleScrollToSearch = () => {
    const el = document.getElementById('search-filter-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplySearch = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBook = (params: {
    room: RoomItem;
    checkInDate: string;
    durationMonths: number;
    occupants: number;
  }) => {
    setBookingRoom(params.room);
    setBookingPrefill({
      checkInDate: params.checkInDate,
      durationMonths: params.durationMonths,
      occupants: params.occupants,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#1A1412]">
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenAuth={() => setShowAuthModal(true)}
        onScrollToSearch={handleScrollToSearch}
      />

      <main className="flex-1">
        {/* 2. Hero Section: Full photo, Where Luxury Meets the Extraordinary, & Floating Search Box */}
        <Hero
          category={category}
          setCategory={setCategory}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          roomTypeFilter={roomTypeFilter}
          setRoomTypeFilter={setRoomTypeFilter}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          matchingCount={ROOMS_DATA.length}
          onApplySearch={handleApplySearch}
        />

        {/* 3. Section 2: NOT JUST A STAY, A WORLD OF POSSIBILITY & Discover Exceptional Stays */}
        <WorldOfPossibility />

        {/* 4. Section 3: We're Committed to Turning your Vision into Reality + Stats & Category Circles */}
        <VisionToReality />

        {/* 5. Section 4: OUR COLLECTION - Exceptional Stays that define the Art of Travel */}
        <OurCollection
          onSelectDetail={(room) => setDetailRoom(room)}
          onSelectBooking={(room) => {
            setBookingRoom(room);
            setBookingPrefill({});
          }}
          onOpenVideoTour={(room) => setVideoRoom(room)}
        />

        {/* 6. Section 5: A stay can change the [badge] way you experience [avatars] the world */}
        <ExperienceWorldTestimonial />

        {/* 7. Section 6: Find Your Perfect Stay (Cave Pool Sanctuary + Floating Booking Card) */}
        <PerfectStayBooking
          onQuickBook={handleQuickBook}
          onOpenMapModal={() => setShowLocationModal(true)}
        />
      </main>

      {/* 8. Section 7: Dark Footer with Massive "griya logos" Typography */}
      <Footer />

      {/* Interactive Modals */}
      {detailRoom && (
        <RoomDetailModal
          room={detailRoom}
          billingCycle={billingCycle}
          onClose={() => setDetailRoom(null)}
          onSelectBooking={(r) => {
            setDetailRoom(null);
            setBookingRoom(r);
            setBookingPrefill({});
          }}
          onOpenVideoTour={(r) => {
            setDetailRoom(null);
            setVideoRoom(r);
          }}
        />
      )}

      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          initialCheckInDate={bookingPrefill.checkInDate}
          initialDuration={bookingPrefill.durationMonths}
          initialOccupants={bookingPrefill.occupants}
          onClose={() => {
            setBookingRoom(null);
            setBookingPrefill({});
          }}
        />
      )}

      {videoRoom && (
        <VideoTourModal
          room={videoRoom}
          onClose={() => setVideoRoom(null)}
          onSelectBooking={(r) => {
            setVideoRoom(null);
            setBookingRoom(r);
            setBookingPrefill({});
          }}
        />
      )}

      {showLocationModal && (
        <LocationModal onClose={() => setShowLocationModal(false)} />
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
