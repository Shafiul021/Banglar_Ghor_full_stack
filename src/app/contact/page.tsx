import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { getCompanySettings } from '@/lib/db';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Banlgar Ghor Remodeling. Connect with our Manhattan studio concierge to discuss your upcoming residential renovation, townhouse restoration, or kitchen remodel.',
};

export default async function ContactPage() {
  const settings = await getCompanySettings();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* Page Header with Architectural Background Image */}
        <PageHeader
          eyebrow="Concierge & Inquiries"
          title="Connect With Our Studio"
          subtitle="Whether you have an imminent renovation or wish to explore preliminary feasibility for a future property acquisition, our team is at your disposal."
          bgImage="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2000&auto=format&fit=crop"
          breadcrumbs={[{ label: 'Contact' }]}
        />

        {/* Contact Info & Form */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Office Details */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-editorial-heading font-medium text-[#1F1E1D] mb-4">
                    Manhattan Design Studio
                  </h2>
                  <p className="text-sm font-light text-[#5C5854] leading-relaxed mb-6">
                    Our principal office is centrally located on Park Avenue in Midtown Manhattan. Consultations are hosted in-studio or directly at your residence.
                  </p>
                </div>

                <div className="space-y-6 border-y border-[#1C1B1A]/8 py-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-white border border-[#1C1B1A]/8 flex items-center justify-center flex-shrink-0 text-[#9E7D4C]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block mb-1">
                        Studio Address
                      </span>
                      <p className="text-sm font-light text-[#5C5854]">
                        {settings.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-white border border-[#1C1B1A]/8 flex items-center justify-center flex-shrink-0 text-[#9E7D4C]">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block mb-1">
                        Direct Telephone
                      </span>
                      <a
                        href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                        className="text-sm font-light text-[#5C5854] hover:text-[#9E7D4C] transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-white border border-[#1C1B1A]/8 flex items-center justify-center flex-shrink-0 text-[#9E7D4C]">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block mb-1">
                        Email Concierge
                      </span>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-sm font-light text-[#5C5854] hover:text-[#9E7D4C] transition-colors"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-white border border-[#1C1B1A]/8 flex items-center justify-center flex-shrink-0 text-[#9E7D4C]">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block mb-1">
                        Business Hours
                      </span>
                      <p className="text-sm font-light text-[#5C5854]">
                        {settings.business_hours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-[#1C1B1A]/8 space-y-3">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1F1E1D] block">
                    Looking for a comprehensive Project Estimate?
                  </span>
                  <p className="text-xs font-light text-[#5C5854]">
                    If you already have a target budget and timeline, complete our structured consultation intake to receive faster scheduling.
                  </p>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#9E7D4C] hover:text-[#84653B]"
                  >
                    <span>Structured Consultation Form</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#1C1B1A]/8 shadow-sm">
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-2">
                  Direct Message
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial-heading font-medium text-[#1F1E1D] mb-6">
                  Send a Message to Our Team
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
