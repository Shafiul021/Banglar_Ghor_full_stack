import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { TrustBadges } from '@/components/ui/TrustBadges';
import { getTeamMembers, getCompanySettings } from '@/lib/db';
import { ArrowRight, Compass, ShieldCheck, Award, Users } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About Our Studio',
  description:
    'Discover the philosophy, master craftsmanship, and design-build team behind Banlgar Ghor Remodeling. Transforming New York residences with architectural clarity.',
};

export default async function AboutPage() {
  const [teamMembers, settings] = await Promise.all([
    getTeamMembers(true),
    getCompanySettings(),
  ]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Our Story & Philosophy"
          title="Architecture, Craftsmanship & The Art of Living"
          subtitle="Banlgar Ghor Remodeling was founded on a simple conviction: that a renovation should be an inspiring creative journey rather than an adversarial struggle."
          bgImage="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'About' }]}
        />

        {/* Narrative & Philosophy */}
        <section className="py-20 sm:py-28 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
              <div className="lg:col-span-5 relative aspect-[4/5] bg-[#EAE4DA] overflow-hidden border border-[#1C1B1A]/8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                  alt="Architectural studio vision"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block">
                  The Design-Build Advantage
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D]">
                  Bridging Architecture & Construction Under One Roof
                </h2>
                <p className="text-base font-light text-[#5C5854] leading-relaxed">
                  In New York City, traditional remodeling is notoriously fragmented. Homeowners hire an independent architect, wait months for drawings, and only then invite general contractors to bid—frequently discovering that the initial design exceeds their target budget by hundreds of thousands of dollars.
                </p>
                <p className="text-base font-light text-[#5C5854] leading-relaxed">
                  Banlgar Ghor unites architectural concepting, interior finish sourcing, Department of Buildings code compliance, and on-site master carpentry under one accountable design-build team. We eliminate the blame games, ensure fixed milestone accountability, and build residences that endure.
                </p>
              </div>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#1C1B1A]/8">
              <div className="p-8 bg-white border border-[#1C1B1A]/8">
                <Compass size={24} className="text-[#9E7D4C] mb-4" />
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                  Warm Minimalism
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#5C5854] leading-relaxed">
                  We believe in serene architectural spaces defined by natural materials, balanced daylighting, and unpretentious luxury rather than gratuitous ornamentation.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#1C1B1A]/8">
                <ShieldCheck size={24} className="text-[#9E7D4C] mb-4" />
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                  NYC Code Mastery
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#5C5854] leading-relaxed">
                  Decades navigating the Department of Buildings (DOB), Landmarks Preservation Commission (LPC), and stringent Fifth Avenue and Central Park West co-op alteration boards.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#1C1B1A]/8">
                <Award size={24} className="text-[#9E7D4C] mb-4" />
                <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                  Artisanal Integrity
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#5C5854] leading-relaxed">
                  Master woodworkers, certified Italian stone fabricators, and licensed MEP professionals committed to zero-defect execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 sm:py-28 bg-white border-y border-[#1C1B1A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-3">
                Studio Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D]">
                Meet Our Principal Design-Build Team
              </h2>
              <p className="text-sm sm:text-base font-light text-[#5C5854] mt-3">
                Dedicated professionals personally overseeing your home transformation from initial sketch to final walkthrough.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#FAF8F5] border border-[#1C1B1A]/8 overflow-hidden group"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#EAE4DA]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-editorial-heading font-medium text-[#1F1E1D]">
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#9E7D4C] font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs font-light text-[#5C5854] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                Confidence & Security
              </span>
              <h2 className="text-3xl font-editorial-heading font-medium text-[#1F1E1D]">
                Fully Licensed & Insured in New York
              </h2>
            </div>
            <TrustBadges />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium mb-6">
              Let&apos;s discuss your residence.
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Schedule an in-home architectural discovery meeting with Rahman Banlgar and our design directors.
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
