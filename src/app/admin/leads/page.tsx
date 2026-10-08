import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getConsultationRequests } from '@/lib/db';
import { LeadsManager } from './LeadsManager';

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const leads = await getConsultationRequests();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#1C1B1A]/8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
          Client Intake Pipeline
        </span>
        <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
          Consultation Requests ({leads.length})
        </h1>
        <p className="text-xs text-[#8C867F]">
          Review incoming homeowner inquiries, update statuses, and log internal notes.
        </p>
      </div>

      <LeadsManager initialLeads={leads} />
    </div>
  );
}
