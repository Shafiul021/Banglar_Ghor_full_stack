import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProcessTimeline } from '@/components/ui/ProcessTimeline';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { getProcessSteps, getFAQs } from '@/lib/db';
import { ArrowRight } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Our Renovation Process',
  description:
    'Discover our structured 6-step residential renovation process: Consultation, Planning & Design, Proposal, Pre-Construction, Artisanal Construction, and Final Walkthrough.',
};

export default async function ProcessPage() {
  const [steps, faqs] = await Promise.all([
    getProcessSteps(true),
    getFAQs(true, 'Process'),
  ]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Disciplined Execution"
          title="The 6-Step Design-Build Journey"
          subtitle="By integrating architecture, permitting, procurement, and on-site construction under one master builder, we eliminate the traditional delays, misunderstandings, and budget surprises of NYC remodeling."
          bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Our Process' }]}
        />

        {/* Timeline Section */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessTimeline steps={steps} />
          </div>
        </section>

        {/* Process FAQs */}
        {faqs.length > 0 && (
          <section className="py-20 sm:py-28 bg-white border-t border-[#1C1B1A]/8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-14">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Clarity & Governance
                </span>
                <h2 className="text-3xl font-editorial-heading font-medium text-[#1F1E1D]">
                  Frequently Asked Process Questions
                </h2>
              </div>
              <FAQAccordion faqs={faqs} />
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-3">
              Step 1 Begins Here
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium mb-6">
              Initiate your architectural consultation.
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Our principal team will meet with you to review your property, goals, and outline a custom roadmap.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <span>Request a Free Consultation</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
