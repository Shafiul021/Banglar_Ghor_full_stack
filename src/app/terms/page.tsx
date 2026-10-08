import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of service and website usage conditions for Banlgar Ghor Remodeling.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        <PageHeader
          eyebrow="Legal & Terms"
          title="Terms of Use"
          subtitle="Terms of service, engagement protocols, and digital conditions of use."
          bgImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Terms of Use' }]}
        />

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 border border-[#1C1B1A]/8 space-y-8 text-sm font-light text-[#5C5854] leading-relaxed">
            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                1. General Provisions
              </h2>
              <p>
                By accessing or using this website, you agree to comply with and be bound by these Terms of Use. The architectural content, project photographs, scope descriptions, and pricing guidelines provided on this website are for informational and conceptual presentation purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                2. Project Estimates & Contracting
              </h2>
              <p>
                Online budget ranges, calculators, or consultation intake responses do not constitute a formal binding construction contract. Binding commitments, milestone billing schedules, and project specifications are created solely through signed written architectural agreements and NYC DCA-compliant home improvement contracts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                3. Intellectual Property
              </h2>
              <p>
                All photographic imagery, text, architectural drawings, and branding assets featured on this website are the intellectual property of Banlgar Ghor Remodeling or its licensing partners and may not be reproduced or utilized without prior written consent.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
