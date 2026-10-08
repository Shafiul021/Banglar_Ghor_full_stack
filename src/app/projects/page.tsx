import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProjectGrid } from '@/components/ui/ProjectGrid';
import { getProjects } from '@/lib/db';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Project Portfolio',
  description:
    'Explore our curated portfolio of residential architecture and interior design projects across Manhattan, Brooklyn, Queens, and Westchester.',
};

export default async function ProjectsPage() {
  const projects = await getProjects({ publishedOnly: true });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Selected Portfolio"
          title="Featured Residential Projects"
          subtitle="A showcase of bespoke brownstone restorations, luxury kitchen transformations, primary spa suites, and subterranean retreats built with meticulous craftsmanship."
          bgImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Projects' }]}
        />

        {/* Gallery Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectGrid initialProjects={projects} />
          </div>
        </section>

        {/* Consultation Callout */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-3">
              Design & Build
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-heading font-medium mb-6">
              Have a similar residence in mind?
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Tell us what you are envisioning, and let our architectural team develop a tailored proposal for your home.
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
