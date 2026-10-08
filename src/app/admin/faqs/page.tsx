import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getFAQs } from '@/lib/db';
import { FAQsManager } from './FAQsManager';

export const revalidate = 0;

export default async function AdminFAQsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const faqs = await getFAQs(false);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#1C1B1A]/8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
          Knowledge Base
        </span>
        <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
          Manage FAQs ({faqs.length})
        </h1>
        <p className="text-xs text-[#8C867F]">
          Maintain customer questions across General, Pricing, Process, Design, and Financing categories.
        </p>
      </div>

      <FAQsManager initialFaqs={faqs} />
    </div>
  );
}
