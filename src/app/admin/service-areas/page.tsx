import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getServiceAreas } from '@/lib/db';
import { ServiceAreasManager } from './ServiceAreasManager';

export const revalidate = 0;

export default async function AdminServiceAreasPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const areas = await getServiceAreas(false);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#1C1B1A]/8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
          Geographic Coverage
        </span>
        <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
          Manage Service Areas ({areas.length})
        </h1>
        <p className="text-xs text-[#8C867F]">
          Manage boroughs, Westchester coverage, and local neighborhood listings.
        </p>
      </div>

      <ServiceAreasManager initialAreas={areas} />
    </div>
  );
}
