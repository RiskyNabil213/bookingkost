'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { TenantDashboardView } from '@/components/dashboard/TenantDashboardView';

export default function TenantDashboardPage() {
  const { role, loginAs } = useAuth();

  useEffect(() => {
    if (role !== 'penghuni') {
      loginAs('penghuni');
    }
  }, [role, loginAs]);

  return <TenantDashboardView />;
}
