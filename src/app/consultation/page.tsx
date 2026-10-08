import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { ShieldCheck, Clock, CheckCircle2, Award } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Request a Free Consultation',
  description:
    'Schedule your private residential remodeling consultation with Banlgar Ghor Remodeling. Discover tailored solutions for kitchens, baths, brownstones, and whole-home renovations in New York.',
};

export default function ConsultationPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Project Intake"
          title="Request a Free Consultation"
          subtitle="Take the first step toward transforming your New York residence. Share your goals, property type, and target investment, and our senior architectural team will prepare an in-depth preliminary review."
          bgImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Request Consultation' }]}
        />

        {/* Multi-Step Form Container */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ConsultationForm />

            {/* Reassurance Badges */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-white border border-[#1C1B1A]/8">
                <Clock size={20} className="text-[#9E7D4C] mx-auto mb-2" />
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  24-Hour Response
                </h4>
                <p className="text-xs text-[#8C867F] font-light">
                  Our studio concierge personally reviews every submission within 1 business day.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#1C1B1A]/8">
                <ShieldCheck size={20} className="text-[#9E7D4C] mx-auto mb-2" />
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  Strict Confidentiality
                </h4>
                <p className="text-xs text-[#8C867F] font-light">
                  Your property specifications and contact details are never shared or commercialized.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#1C1B1A]/8">
                <Award size={20} className="text-[#9E7D4C] mx-auto mb-2" />
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-1">
                  No Obligation
                </h4>
                <p className="text-xs text-[#8C867F] font-light">
                  Our initial architectural discovery session is complimentary and non-binding.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
