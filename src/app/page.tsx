import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { TrustBadges } from '@/components/ui/TrustBadges';
import {
  getCompanySettings,
  getProjects,
  getServices,
  getTestimonials,
  getServiceAreas,
  getProcessSteps,
} from '@/lib/db';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  CheckCircle,
  Building,
  Sparkles,
} from 'lucide-react';

export const revalidate = 0; // Dynamic server rendering for instant CMS updates

export default async function HomePage() {
  const [settings, featuredProjects, services, testimonials, serviceAreas, processSteps] =
    await Promise.all([
      getCompanySettings(),
      getProjects({ publishedOnly: true, featuredOnly: true }),
      getServices(true),
      getTestimonials(true, true),
      getServiceAreas(true),
      getProcessSteps(true),
    ]);

  // If fewer than 3 featured, get any published projects
  const displayProjects =
    featuredProjects.length >= 3
      ? featuredProjects
      : await getProjects({ publishedOnly: true });

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1B1A]">
          {/* Hero Background Image with Subtle Film Grain / Vignette */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={settings.hero_image}
              alt="Banlgar Ghor Remodeling - Architectural NYC Interior"
              className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.08] scale-100 transition-transform duration-1000"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          </div>

          {/* Hero Text Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FAF8F5] text-[11px] uppercase tracking-[0.28em] font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A979] animate-pulse" />
              <span>{settings.hero_eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial-heading font-medium text-white tracking-tight leading-[1.08] mb-8 drop-shadow-md">
              {settings.hero_heading}
            </h1>

            {/* Supporting Text */}
            <p className="max-w-2xl mx-auto text-base sm:text-xl font-light text-[#EAE4DA] leading-relaxed mb-12 drop-shadow-sm">
              {settings.hero_subtext}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/consultation"
                className="w-full sm:w-auto px-9 py-4 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-3 border border-[#C9A979]/40"
              >
                <span>Request a Free Consultation</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-9 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 border border-white/25 flex items-center justify-center gap-2"
              >
                <span>Explore Our Projects</span>
              </Link>
            </div>

            {/* Key Value Pill Under Hero */}
            <div className="mt-16 pt-10 border-t border-white/15 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <span className="block text-xl sm:text-2xl font-editorial-heading font-bold text-white">18+</span>
                <span className="text-[10px] uppercase tracking-widest text-[#DCD7CE]">Years NYC Experience</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-editorial-heading font-bold text-white">$5M</span>
                <span className="text-[10px] uppercase tracking-widest text-[#DCD7CE]">Liability Insured</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-editorial-heading font-bold text-white">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-[#DCD7CE]">DOB & Co-op Cleared</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-editorial-heading font-bold text-white">5.0 ★</span>
                <span className="text-[10px] uppercase tracking-widest text-[#DCD7CE]">Homeowner Satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BRAND STATEMENT / INTRODUCTION */}
        {/* ========================================================= */}
        <section className="py-24 sm:py-32 bg-[#FAF8F5] border-b border-[#1C1B1A]/8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-4">
              Architecture & Master Construction
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium text-[#1F1E1D] leading-tight mb-8">
              &ldquo;We don&apos;t just renovate residences; we curate the sanctuary where your life unfolds.&rdquo;
            </h2>
            <div className="w-16 h-[1.5px] bg-[#9E7D4C] mx-auto mb-8" />
            <p className="max-w-3xl mx-auto text-base sm:text-lg font-light text-[#5C5854] leading-relaxed">
              Serving Manhattan, Brooklyn, Queens, and Westchester, Banlgar Ghor Remodeling bridges visionary design and master-builder execution. From pre-war landmark alterations to contemporary brownstone open plans, our integrated design-build methodology guarantees architectural cohesion, uncompromising craftsmanship, and peace of mind.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURED PROJECTS */}
        {/* ========================================================= */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <SectionHeading
                eyebrow="Portfolio Highlights"
                title="Featured Renovations"
                description="Explore a selection of our recent residential transformations throughout New York City."
              />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] transition-colors pb-1 border-b border-[#1F1E1D] hover:border-[#9E7D4C]"
              >
                <span>View All Projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.slice(0, 3).map((project, idx) => (
                <ProjectCard key={project.id} project={project} priority={idx === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SIX CORE SERVICES */}
        {/* ========================================================= */}
        <section className="py-24 sm:py-32 bg-[#F4EFEB] border-y border-[#1C1B1A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <SectionHeading
                eyebrow="Our Capabilities"
                title="Comprehensive Remodeling Services"
                description="End-to-end design and construction solutions tailored for New York residences."
              />
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] transition-colors pb-1 border-b border-[#1F1E1D] hover:border-[#9E7D4C]"
              >
                <span>All Services Overview</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* WHY BANLGAR GHOR REMODELING */}
        {/* ========================================================= */}
        <section className="py-24 sm:py-32 bg-[#1C1B1A] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-3">
                Why Banlgar Ghor
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial-heading font-medium tracking-tight mb-6">
                {settings.why_us_heading}
              </h2>
              <p className="text-base sm:text-lg font-light text-[#DCD7CE] leading-relaxed">
                {settings.why_us_subtext}
              </p>
            </div>

            <TrustBadges light={true} />
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6-STEP PROCESS PREVIEW */}
        {/* ========================================================= */}
        <section className="py-24 sm:py-32 bg-white border-b border-[#1C1B1A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionHeading
                align="center"
                eyebrow="Our Methodology"
                title="The 6-Step Renovation Process"
                description="A disciplined, transparent journey designed to eliminate construction anxiety and deliver architectural perfection."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
              {processSteps.slice(0, 6).map((step) => (
                <div
                  key={step.id}
                  className="p-7 bg-[#FAF8F5] border border-[#1C1B1A]/8 hover:border-[#9E7D4C]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-editorial-heading text-[#9E7D4C] font-semibold">
                        0{step.step_number}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#8C867F]">
                        Phase
                      </span>
                    </div>
                    <h3 className="text-xl font-editorial-heading font-medium text-[#1F1E1D] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#8C867F] uppercase tracking-wider mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm font-light text-[#5C5854] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1C1B1A]/6">
                    <Link
                      href="/process"
                      className="text-xs font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Phase Details</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/process"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1F1E1D] hover:bg-[#9E7D4C] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Explore Full Step-by-Step Process</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TESTIMONIALS */}
        {/* ========================================================= */}
        <section className="py-24 sm:py-32 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <SectionHeading
                eyebrow="Client Testimonials"
                title="Praise from New York Homeowners"
                description="Read authentic experiences from clients who entrusted us with their private residences."
              />
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] transition-colors pb-1 border-b border-[#1F1E1D] hover:border-[#9E7D4C]"
              >
                <span>Read All Reviews</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-8 bg-white border border-[#1C1B1A]/8 flex flex-col justify-between"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-[#9E7D4C] mb-6">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#9E7D4C" />
                      ))}
                    </div>

                    <Quote size={28} className="text-[#9E7D4C]/30 mb-4" />

                    <p className="text-sm font-light text-[#1F1E1D] leading-relaxed italic mb-8">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#1C1B1A]/6 flex items-center gap-3">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#EAE4DA] text-[#1F1E1D] flex items-center justify-center text-xs font-semibold">
                        {item.name[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-[#1F1E1D]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#8C867F]">
                        {item.location} • {item.project_type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SERVICE AREAS OVERVIEW */}
        {/* ========================================================= */}
        <section className="py-24 sm:py-32 bg-white border-t border-[#1C1B1A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <SectionHeading
                eyebrow="Service Coverage"
                title="Transforming Residences Across New York"
                description="We operate across all five boroughs of New York City and premier Westchester communities."
              />
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] hover:text-[#9E7D4C] transition-colors pb-1 border-b border-[#1F1E1D] hover:border-[#9E7D4C]"
              >
                <span>View Detailed Areas</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {serviceAreas.slice(0, 6).map((area) => (
                <Link
                  key={area.id}
                  href={`/service-areas#${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative p-6 bg-[#FAF8F5] border border-[#1C1B1A]/8 hover:border-[#9E7D4C] transition-all text-center flex flex-col items-center justify-center"
                >
                  <Building size={22} className="text-[#9E7D4C] mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-editorial-heading font-medium text-[#1F1E1D] block mb-1">
                    {area.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C867F]">
                    {area.state_region}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FINAL EDITORIAL CTA */}
        {/* ========================================================= */}
        <section className="relative py-28 sm:py-36 bg-[#1C1B1A] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
              alt="Luxury residence background"
              className="w-full h-full object-cover object-center filter grayscale"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block mb-4">
              Begin The Conversation
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-heading font-medium tracking-tight mb-6 leading-tight">
              {settings.cta_heading}
            </h2>
            <p className="text-base sm:text-lg font-light text-[#DCD7CE] leading-relaxed mb-10 max-w-2xl mx-auto">
              {settings.cta_subtext}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/consultation"
                className="w-full sm:w-auto px-9 py-4 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-3 border border-[#C9A979]/40"
              >
                <span>Request a Free Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto px-9 py-4 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 border border-white/25 flex items-center justify-center"
              >
                <span>Explore Our Work</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
