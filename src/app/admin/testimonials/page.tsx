import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getTestimonials } from '@/lib/db';
import { TestimonialsManager } from './TestimonialsManager';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const testimonials = await getTestimonials(false);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#1C1B1A]/8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
          Social Proof
        </span>
        <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
          Manage Testimonials ({testimonials.length})
        </h1>
        <p className="text-xs text-[#8C867F]">
          Create, edit, feature, and publish client endorsements.
        </p>
      </div>

      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  );
}
