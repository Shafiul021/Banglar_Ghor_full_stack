'use client';

import React from 'react';
import Link from 'next/link';
import { X, ArrowRight, Phone, Mail, Shield } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-[#1F1E1D] text-white h-full flex flex-col justify-between p-6 sm:p-8 z-10 shadow-2xl overflow-y-auto">
        <div>
          {/* Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="font-editorial-heading text-lg font-bold tracking-tight text-white block">
                BANLGAR GHOR
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A979]">
                Remodeling New York
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block text-base sm:text-lg font-editorial-heading text-white/90 hover:text-[#C9A979] transition-colors py-1.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Details & CTA */}
        <div className="pt-8 border-t border-white/10 space-y-5">
          <div className="space-y-2 text-xs text-[#DCD7CE]">
            <a
              href="tel:2125550198"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone size={14} className="text-[#C9A979]" />
              <span>(212) 555-0198</span>
            </a>
            <a
              href="mailto:concierge@banlgarghorremodeling.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail size={14} className="text-[#C9A979]" />
              <span>concierge@banlgarghorremodeling.com</span>
            </a>
          </div>

          <Link
            href="/consultation"
            onClick={onClose}
            className="w-full py-3.5 bg-[#9E7D4C] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#84653B] transition-colors"
          >
            <span>Request a Free Consultation</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/admin"
            onClick={onClose}
            className="w-full py-2.5 border border-white/20 text-white/80 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-2 hover:text-white hover:border-white transition-colors"
          >
            <Shield size={13} className="text-[#C9A979]" />
            <span>Admin Dashboard CMS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
