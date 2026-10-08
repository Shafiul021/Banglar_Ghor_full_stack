import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { getTestimonials } from '@/lib/db';
import { Star, Quote, ArrowRight, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials',
  description:
    'Read verified client testimonials and experiences from homeowners across Chelsea, Park Slope, Upper West Side, and Westchester who renovated with Banlgar Ghor Remodeling.',
};

export default async function ReviewsPage() {
  const testimonials = await getTestimonials(true);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Homeowner Experiences"
          title="Client Reviews & Endorsements"
          subtitle="The greatest testament to our craftsmanship is the enduring relationships we build with New York homeowners across Manhattan, Brooklyn, Queens, and Westchester."
          bgImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Reviews' }]}
        />

        {/* Reviews Grid */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-8 sm:p-10 bg-white border border-[#1C1B1A]/8 hover:border-[#9E7D4C]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-1 text-[#9E7D4C] mb-6">
                      {[...Array(Math.max(1, Math.min(5, Math.floor(t.rating || 5))))].map((_, i) => (
                        <Star key={i} size={16} fill="#9E7D4C" />
                      ))}
                    </div>

                    <Quote size={32} className="text-[#9E7D4C]/25 mb-4" />

                    <p className="text-sm sm:text-base font-light text-[#1F1E1D] leading-relaxed italic mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#1C1B1A]/6 flex items-center gap-3.5">
                    {t.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.image_url}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#EAE4DA] text-[#1F1E1D] flex items-center justify-center text-sm font-semibold">
                        {t.name[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-editorial-heading font-medium text-[#1F1E1D]">
                        {t.name}
                      </h4>
                      <p className="text-xs text-[#8C867F]">
                        {t.location}
                      </p>
                      <span className="inline-block text-[10px] uppercase tracking-wider text-[#9E7D4C] font-semibold mt-0.5">
                        {t.project_type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium mb-6">
              Experience the difference firsthand.
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Schedule your complimentary architectural design consultation.
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
