import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { TrustBadges } from '@/components/ui/TrustBadges';
import { getServices } from '@/lib/db';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Residential Remodeling Services',
  description:
    'Explore our comprehensive NYC residential remodeling services: luxury kitchen remodeling, primary bathroom transformations, brownstone gut renovations, basement finishing, and home additions.',
};

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Design-Build Excellence"
          title="Residential Remodeling Services in New York"
          subtitle="We combine architectural foresight, interior material curation, and disciplined construction superintendence to deliver extraordinary residences across Manhattan, Brooklyn, Queens, and Westchester."
          bgImage="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Services' }]}
        />

        {/* Services Grid */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Design-Build Philosophy Pillar */}
        <section className="py-20 bg-[#1C1B1A] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-3">
                Single-Source Accountability
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium tracking-tight mb-5">
                The Advantage of Design-Build Integration
              </h2>
              <p className="text-sm sm:text-base font-light text-[#DCD7CE] leading-relaxed">
                Traditional remodeling pits architects against general contractors. At Banlgar Ghor, design and construction collaborate from day one, preventing budget blowouts, accelerating permitting, and ensuring every finish aligns with your vision.
              </p>
            </div>

            <TrustBadges light={true} />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-white border-t border-[#1C1B1A]/8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D] mb-4">
              Discuss Your Renovation Project
            </h3>
            <p className="text-base font-light text-[#5C5854] mb-8 max-w-xl mx-auto">
              Schedule an in-home architectural discovery meeting with our principal design-builder.
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
