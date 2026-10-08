import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { FAQList } from './FAQList';
import { getFAQs } from '@/lib/db';
import { ArrowRight } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about NYC home remodeling costs, timelines, co-op board approvals, DOB permits, design-build process, and financing.',
};

export default async function FAQPage() {
  const faqs = await getFAQs(true);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Homeowner Knowledge Base"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about navigating luxury residential design, budgeting, building approvals, and master construction in New York."
          bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'FAQ' }]}
        />

        {/* Searchable and Filterable FAQ Component */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQList initialFaqs={faqs} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium mb-6">
              Have a question not listed here?
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Our architectural concierge is at your service. Contact us directly or book your discovery consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#1F1E1D] text-xs uppercase tracking-widest font-semibold hover:bg-[#FAF8F5] transition-colors"
              >
                Send Us a Message
              </Link>
              <Link
                href="/consultation"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#9E7D4C] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#84653B] transition-colors flex items-center justify-center gap-2"
              >
                <span>Request a Free Consultation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
