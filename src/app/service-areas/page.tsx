import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { getServiceAreas } from '@/lib/db';
import { ArrowRight, MapPin, Building, Check } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Service Areas & NYC Coverage',
  description:
    'Discover Banlgar Ghor Remodeling coverage areas across New York City and Westchester County. High-end residential remodeling tailored to local building rules and landmarks.',
};

export default async function ServiceAreasPage() {
  const serviceAreas = await getServiceAreas(true);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="New York Territory"
          title="Neighborhoods & Communities We Serve"
          subtitle="From landmark brownstone blocks in Park Slope and pre-war cooperatives on the Upper East Side to sprawling estates in Westchester, our team understands the unique municipal codes, alteration boards, and architectural vernacular of each locality."
          bgImage="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Service Areas' }]}
        />

        {/* Service Areas Cards */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {serviceAreas.map((area) => {
                let neighborhoods: string[] = [];
                try {
                  neighborhoods = JSON.parse(area.neighborhoods);
                } catch {
                  neighborhoods = [];
                }

                return (
                  <div
                    key={area.id}
                    id={area.name.toLowerCase().replace(/\s+/g, '-')}
                    className="bg-white border border-[#1C1B1A]/8 hover:border-[#9E7D4C]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image */}
                      <div className="aspect-[16/10] overflow-hidden bg-[#EAE4DA]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={area.image_url}
                          alt={area.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-7">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] uppercase tracking-widest text-[#9E7D4C] font-semibold">
                            {area.state_region}
                          </span>
                        </div>
                        <h3 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D] mb-3">
                          {area.name}
                        </h3>
                        <p className="text-sm font-light text-[#5C5854] leading-relaxed mb-6">
                          {area.description}
                        </p>

                        {neighborhoods.length > 0 && (
                          <div className="pt-4 border-t border-[#1C1B1A]/6">
                            <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block mb-3">
                              Featured Neighborhoods:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {neighborhoods.map((n, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#1C1B1A]/8 text-[11px] text-[#5C5854]"
                                >
                                  {n}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-7 pt-0">
                      <Link
                        href={`/consultation?area=${encodeURIComponent(area.name)}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] transition-colors"
                      >
                        <span>Renovate in {area.name}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Neighborhood Callout Banner */}
            <div className="p-8 sm:p-12 bg-white border border-[#9E7D4C]/30 text-center max-w-4xl mx-auto shadow-sm">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                Unlisted Communities
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial-heading font-medium text-[#1F1E1D] mb-4">
                Don&apos;t see your specific neighborhood?
              </h3>
              <p className="text-sm sm:text-base font-light text-[#5C5854] leading-relaxed mb-8 max-w-2xl mx-auto">
                We frequently accept specialized residential renovations and architectural additions in neighboring Hudson Valley, Long Island Gold Coast, and Northern New Jersey communities upon request.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1F1E1D] hover:bg-[#9E7D4C] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Contact Us to Discuss Your Location</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium mb-6">
              Let&apos;s build your dream home in New York.
            </h2>
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
