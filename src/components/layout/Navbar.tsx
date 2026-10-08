'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer upon route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Our Process', href: '/process' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: 'Financing', href: '/financing' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md py-3.5 border-b border-[#1C1B1A]/8 shadow-sm text-[#1F1E1D]'
            : 'bg-transparent py-5 text-[#FAF8F5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col group focus:outline-none"
              aria-label="Banlgar Ghor Remodeling Home"
            >
              <span
                className={`font-editorial-heading text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                  isScrolled
                    ? 'text-[#1F1E1D] group-hover:text-[#9E7D4C]'
                    : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:text-[#C9A979]'
                }`}
              >
                BANLGAR GHOR
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.3em] font-medium transition-colors ${
                  isScrolled
                    ? 'text-[#8C867F]'
                    : 'text-[#DCD7CE] drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                }`}
              >
                REMODELING • NEW YORK
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs uppercase tracking-widest font-medium transition-colors hover:text-[#9E7D4C] relative py-1 ${
                      isActive
                        ? isScrolled
                          ? 'text-[#9E7D4C] font-semibold'
                          : 'text-[#C9A979] font-semibold'
                        : isScrolled
                        ? 'text-[#5C5854]'
                        : 'text-[#FAF8F5] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9E7D4C]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/admin"
                className={`text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded-sm ${
                  isScrolled
                    ? 'text-[#8C867F] hover:text-[#1F1E1D] hover:bg-[#1C1B1A]/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
                }`}
                title="Admin Content Management Portal"
              >
                <Shield size={13} className="text-[#9E7D4C]" />
                <span>Admin CMS</span>
              </Link>

              <Link
                href="/consultation"
                className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  isScrolled
                    ? 'bg-[#1F1E1D] text-white hover:bg-[#9E7D4C] border-[#1F1E1D] hover:border-[#9E7D4C]'
                    : 'bg-white text-[#1F1E1D] hover:bg-[#FAF8F5] hover:text-[#9E7D4C] border-white shadow-lg'
                }`}
              >
                <span>Free Consultation</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile / Tablet Toggle */}
            <div className="flex items-center gap-3 xl:hidden">
              <Link
                href="/consultation"
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold border ${
                  isScrolled
                    ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                    : 'bg-white text-[#1F1E1D] border-white'
                }`}
              >
                Consultation
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open Navigation Menu"
                className={`p-2 transition-colors focus:outline-none ${
                  isScrolled
                    ? 'text-[#1F1E1D] hover:text-[#9E7D4C]'
                    : 'text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] hover:text-[#C9A979]'
                }`}
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
