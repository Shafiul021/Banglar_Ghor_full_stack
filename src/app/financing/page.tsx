import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { getFAQs } from '@/lib/db';
import { ArrowRight, ShieldCheck, DollarSign, Calculator, HelpCircle, FileText } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Project Financing Options',
  description:
    'Learn how flexible financing solutions and staged milestone schedules can help distribute your residential remodeling investment in New York.',
};

export default async function FinancingPage() {
  const financingFaqs = await getFAQs(true, 'Financing');

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Investment Flexibility"
          title="Residential Remodeling Financing"
          subtitle="Investing in a high-end New York residence creates long-term lifestyle enjoyment and enduring asset value. We offer transparent payment milestones and partner with premier lending specialists to make financing straightforward."
          bgImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Financing' }]}
        />

        {/* Informational Pillars */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="p-8 bg-white border border-[#1C1B1A]/8">
                <Calculator size={26} className="text-[#9E7D4C] mb-5" />
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                  Distribute Capital Flow
                </h3>
                <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                  Financing allows you to maintain liquidity in other portfolios while securing the architectural finishes and bespoke craftsmanship you truly desire without compromise.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#1C1B1A]/8">
                <FileText size={26} className="text-[#9E7D4C] mb-5" />
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                  Milestone-Based Billing
                </h3>
                <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                  We structure contracts around verified on-site progress milestones (Framing, Rough MEP, Stone Installation, Final Walkthrough). You only disburse funds as completed work is inspected.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#1C1B1A]/8">
                <ShieldCheck size={26} className="text-[#9E7D4C] mb-5" />
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                  Lender Collaboration
                </h3>
                <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                  If you are utilizing a construction loan, Fannie Mae Homestyle, or a Home Equity Line of Credit (HELOC), our project management team coordinates all inspector draw requests and lien waivers seamlessly.
                </p>
              </div>
            </div>

            {/* Transparency Disclaimer Banner */}
            <div className="p-8 bg-white border border-[#1C1B1A]/10 max-w-4xl mx-auto">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#8C867F] block mb-2">
                Financing Information & Transparency Note
              </span>
              <p className="text-xs text-[#5C5854] font-light leading-relaxed">
                Banlgar Ghor Remodeling is a licensed general contractor, not a direct financial lender. Financing options are provided through independent third-party financial institutions and are subject to credit qualification, underwriting approval, and individual institutional terms. Homeowners are advised to review all loan terms, APRs, and commitments carefully with their financial advisor.
              </p>
            </div>
          </div>
        </section>

        {/* Financing FAQs */}
        {financingFaqs.length > 0 && (
          <section className="py-20 bg-white border-t border-[#1C1B1A]/8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Frequently Asked Questions
                </span>
                <h2 className="text-3xl font-editorial-heading font-medium text-[#1F1E1D]">
                  Financing & Payment FAQs
                </h2>
              </div>
              <FAQAccordion faqs={financingFaqs} />
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium mb-6">
              Discuss your project budget with our team.
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Schedule a private consultation to receive a transparent preliminary scope and investment roadmap.
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
