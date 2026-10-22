'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { OwnerDashboardView } from '@/components/dashboard/OwnerDashboardView';

export default function OwnerDashboardPage() {
  const { role, loginAs } = useAuth();

  useEffect(() => {
    if (role !== 'pengelola') {
      loginAs('pengelola');
    }
  }, [role, loginAs]);

  return <OwnerDashboardView />;
}
