'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { TenantDashboardView } from '@/components/dashboard/TenantDashboardView';
import { OwnerDashboardView } from '@/components/dashboard/OwnerDashboardView';

export default function DashboardPage() {
  const { role, loginAs, user } = useAuth();

  // If user visits /dashboard directly without having logged in, initialize as demo tenant
  useEffect(() => {
    if (!user) {
      loginAs('penghuni');
    }
  }, [user, loginAs]);

  if (role === 'pengelola') {
    return <OwnerDashboardView />;
  }

  return <TenantDashboardView />;
}
