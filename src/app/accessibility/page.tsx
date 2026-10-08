import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Digital accessibility commitment and WCAG compliance standards for Banlgar Ghor Remodeling.',
};

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        <PageHeader
          eyebrow="Commitment to Digital Inclusion"
          title="Accessibility Statement"
          subtitle="Ensuring our digital portfolio and design services are universally accessible to all individuals."
          bgImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Accessibility' }]}
        />

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 border border-[#1C1B1A]/8 space-y-8 text-sm font-light text-[#5C5854] leading-relaxed">
            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                1. Our Commitment
              </h2>
              <p>
                Banlgar Ghor Remodeling is dedicated to ensuring digital accessibility for all visitors, including individuals with disabilities. We continually optimize the user experience and apply relevant accessibility standards (WCAG 2.1 Level AA).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                2. Measures Taken
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>High-contrast editorial typography adhering to readable contrast ratios.</li>
                <li>Keyboard accessibility for interactive components including the before/after sliders, accordions, and multi-step forms.</li>
                <li>Descriptive alternative text for architectural and interior photography.</li>
                <li>Clear ARIA landmark roles and semantic HTML structure across all pages.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                3. Feedback & Assistance
              </h2>
              <p>
                We welcome your feedback on the accessibility of our website. If you encounter any barriers or require assistance with any component, please contact us at concierge@banlgarghorremodeling.com or call (212) 555-0198.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
