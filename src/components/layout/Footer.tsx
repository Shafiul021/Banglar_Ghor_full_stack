import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Kitchen Remodeling', href: '/services/kitchen-remodeling' },
    { label: 'Bathroom Remodeling', href: '/services/bathroom-remodeling' },
    { label: 'Basement Finishing', href: '/services/basement-finishing' },
    { label: 'Whole-Home Renovation', href: '/services/whole-home-renovation' },
    { label: 'Home Additions', href: '/services/home-additions' },
    { label: 'Custom Renovations', href: '/services/custom-renovations' },
  ];

  const companyLinks = [
    { label: 'About Our Studio', href: '/about' },
    { label: 'Design-Build Process', href: '/process' },
    { label: 'Project Portfolio', href: '/projects' },
    { label: 'Client Reviews', href: '/reviews' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: 'Financing Solutions', href: '/financing' },
    { label: 'Frequently Asked Questions', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const serviceAreas = [
    'Manhattan (UES, UWS, Chelsea, Tribeca, SoHo)',
    'Brooklyn (Park Slope, Brooklyn Heights, Cobble Hill)',
    'Queens (Astoria, Long Island City, Forest Hills)',
    'Westchester County (Scarsdale, Rye, Bronxville)',
    'The Bronx & Staten Island Estates',
  ];

  return (
    <footer className="bg-[#1C1B1A] text-[#FAF8F5] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Consultation Teaser Banner */}
        <div className="pb-16 border-b border-white/10 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-medium block mb-2">
              Start Your Renovation
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-heading font-medium text-white max-w-2xl leading-tight">
              Ready to create a residence tailored to your lifestyle?
            </h3>
          </div>
          <Link
            href="/consultation"
            className="self-start lg:self-center px-8 py-4 bg-[#9E7D4C] hover:bg-[#84653B] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-3 flex-shrink-0"
          >
            <span>Request a Free Consultation</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-editorial-heading text-2xl font-bold tracking-tight text-white block">
                BANLGAR GHOR
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A979]">
                REMODELING • NEW YORK
              </span>
            </Link>

            <p className="text-sm font-light text-[#DCD7CE] leading-relaxed">
              Banlgar Ghor Remodeling creates thoughtfully designed kitchens, bathrooms, additions, and whole-home renovations throughout New York City and surrounding areas.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-[#A8A196]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#C9A979] flex-shrink-0" />
                <span>NYC DCA License #2049182 • Fully Licensed General Contractor</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#C9A979] flex-shrink-0" />
                <span>$5,000,000 Comprehensive Commercial General Liability</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#DCD7CE] font-light">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="hover:text-[#C9A979] transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#DCD7CE] font-light">
              {companyLinks.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="hover:text-[#C9A979] transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Coverage (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-6">
              Office & Contact
            </h4>
            <div className="space-y-3 text-xs text-[#DCD7CE] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#C9A979] flex-shrink-0 mt-0.5" />
                <span>445 Park Avenue, 9th Floor, New York, NY 10022</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C9A979] flex-shrink-0" />
                <a href="tel:2125550198" className="hover:text-white transition-colors">
                  (212) 555-0198
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#C9A979] flex-shrink-0" />
                <a
                  href="mailto:concierge@banlgarghorremodeling.com"
                  className="hover:text-white transition-colors"
                >
                  concierge@banlgarghorremodeling.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={15} className="text-[#C9A979] flex-shrink-0 mt-0.5" />
                <span>Mon – Fri: 8:00 AM – 6:00 PM<br />Sat: By Appointment</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#C9A979] font-medium block mb-2">
                Primary Service Territories:
              </span>
              <ul className="text-[11px] text-[#A8A196] space-y-1 font-light">
                {serviceAreas.slice(0, 3).map((area, idx) => (
                  <li key={idx}>• {area}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C867F] font-light">
          <p>
            © {currentYear} Banlgar Ghor Remodeling. All rights reserved. Registered General Contractor, New York.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
            <Link href="/admin" className="text-[#C9A979] hover:underline">
              Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
