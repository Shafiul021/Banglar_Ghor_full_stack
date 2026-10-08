import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data protection standards for Banlgar Ghor Remodeling clients and visitors.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        <PageHeader
          eyebrow="Compliance & Governance"
          title="Privacy Policy"
          subtitle="Our commitment to safeguarding client privacy and proprietary residential information."
          bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Privacy Policy' }]}
        />

        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 border border-[#1C1B1A]/8 space-y-8 text-sm font-light text-[#5C5854] leading-relaxed">
            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                1. Information We Collect
              </h2>
              <p>
                Banlgar Ghor Remodeling (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects information that you provide voluntarily when requesting a consultation, submitting a contact inquiry, or engaging our architectural design-build services. This may include your full name, email address, telephone number, residential address, project budget, and property specifications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                We use collected information exclusively to prepare project estimates, conduct on-site architectural discovery sessions, coordinate DOB and building alteration filings, and communicate with you regarding your residence. We do not sell, rent, or commercialize your personal information to third-party marketers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                3. Confidentiality & Security
              </h2>
              <p>
                We employ physical, technical, and administrative safeguards to protect your personal and project information. Access to client project files is restricted to authorized project managers, architects, and superintendents actively working on your renovation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                4. Contact & Inquiries
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request the removal of your contact information from our studio records, please email concierge@banlgarghorremodeling.com or contact our office at 445 Park Avenue, 9th Floor, New York, NY 10022.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
