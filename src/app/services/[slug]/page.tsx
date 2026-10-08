import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { getServiceBySlug, getServices, getProjects } from '@/lib/db';
import { FAQ } from '@/lib/db/types';
import { ArrowRight, Check, Sparkles, Hammer, Shield } from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.name,
    description: service.short_description,
    openGraph: {
      title: `${service.name} | Banlgar Ghor Remodeling`,
      description: service.short_description,
      images: [{ url: service.hero_image }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Parse JSON data
  let benefits: string[] = [];
  let scopeItems: string[] = [];
  let processSteps: { step: string; title: string; desc: string }[] = [];
  let faqItems: { q: string; a: string }[] = [];

  try { benefits = JSON.parse(service.benefits); } catch { benefits = []; }
  try { scopeItems = JSON.parse(service.scope_items); } catch { scopeItems = []; }
  try { processSteps = JSON.parse(service.process_steps); } catch { processSteps = []; }
  try { faqItems = JSON.parse(service.faq_items || '[]'); } catch { faqItems = []; }

  // Map faqItems to FAQ objects for FAQAccordion
  const serviceFaqs: FAQ[] = faqItems.map((f, idx) => ({
    id: `serv-faq-${idx}`,
    question: f.q,
    answer: f.a,
    category: 'Process',
    sort_order: idx + 1,
    published: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  // Fetch related projects in this category
  const allProjects = await getProjects({ publishedOnly: true });
  const relatedProjects = allProjects.filter((p) =>
    p.category.toLowerCase().includes(service.name.toLowerCase().replace(' remodeling', '').replace(' renovation', ''))
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Service Hero */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end bg-[#1C1B1A] pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.hero_image}
              alt={service.name}
              className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.08]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-black/30 to-black/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Breadcrumbs
              light={true}
              items={[
                { label: 'Services', href: '/services' },
                { label: service.name },
              ]}
            />

            <div className="max-w-3xl mt-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-3">
                Residential Specialty
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial-heading font-medium text-white mb-6">
                {service.name}
              </h1>
              <p className="text-base sm:text-lg font-light text-[#DCD7CE] leading-relaxed mb-8">
                {service.short_description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/consultation"
                  className="px-8 py-3.5 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
                >
                  <span>Request a Free Consultation</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="#scope"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold transition-colors border border-white/20"
                >
                  <span>View Scope & Process</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Philosophy */}
        <section className="py-20 sm:py-28 bg-white border-b border-[#1C1B1A]/8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-3">
                  Design & Execution
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D] leading-tight">
                  Elevating Everyday Living in New York
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-base sm:text-lg font-light text-[#5C5854] leading-relaxed mb-6">
                  {service.full_description}
                </p>
                <div className="p-6 bg-[#FAF8F5] border border-[#1C1B1A]/8">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] mb-3">
                    Curated Material Palette:
                  </h3>
                  <p className="text-sm font-light text-[#5C5854] leading-relaxed">
                    {service.materials_summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typical Scope & Benefits */}
        <section id="scope" className="py-20 sm:py-28 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Scope */}
              <div className="p-8 sm:p-10 bg-white border border-[#1C1B1A]/8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-3">
                  Scope of Work
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial-heading font-medium text-[#1F1E1D] mb-6">
                  Typical Project Elements
                </h3>
                <ul className="space-y-4 text-sm font-light text-[#5C5854]">
                  {scopeItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#FAF8F5] text-[#9E7D4C] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#9E7D4C]/30 text-xs font-semibold">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="p-8 sm:p-10 bg-white border border-[#1C1B1A]/8">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-3">
                  The Banlgar Ghor Difference
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial-heading font-medium text-[#1F1E1D] mb-6">
                  Key Homeowner Benefits
                </h3>
                <ul className="space-y-4 text-sm font-light text-[#5C5854]">
                  {benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check size={16} className="text-[#9E7D4C] mt-1 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        {processSteps.length > 0 && (
          <section className="py-20 sm:py-28 bg-white border-y border-[#1C1B1A]/8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-14">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-3">
                  Execution Pathway
                </span>
                <h2 className="text-3xl sm:text-4xl font-editorial-heading font-medium text-[#1F1E1D]">
                  How We Deliver Your {service.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-7 bg-[#FAF8F5] border border-[#1C1B1A]/8 hover:border-[#9E7D4C]/40 transition-colors"
                  >
                    <span className="text-2xl font-editorial-heading text-[#9E7D4C] font-semibold block mb-2">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-editorial-heading font-medium text-[#1F1E1D] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-light text-[#5C5854] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Service FAQs */}
        {serviceFaqs.length > 0 && (
          <section className="py-20 bg-[#FAF8F5]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Common Inquiries
                </span>
                <h2 className="text-3xl font-editorial-heading font-medium text-[#1F1E1D]">
                  {service.name} FAQs
                </h2>
              </div>
              <FAQAccordion faqs={serviceFaqs} />
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-24 bg-white border-t border-[#1C1B1A]/8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                    Case Studies
                  </span>
                  <h2 className="text-3xl font-editorial-heading font-medium text-[#1F1E1D]">
                    Related Projects
                  </h2>
                </div>
                <Link
                  href="/projects"
                  className="text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] transition-colors"
                >
                  View All Portfolio →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.slice(0, 3).map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-24 bg-[#1C1B1A] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-3">
              Start Your Renovation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-heading font-medium mb-6">
              Have a {service.name} project in mind?
            </h2>
            <p className="text-base font-light text-[#DCD7CE] mb-8 max-w-xl mx-auto">
              Schedule a personalized architectural discovery consultation with our team.
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
