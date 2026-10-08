import React from 'react';
import { ShieldCheck, Compass, Hammer, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export function TrustBadges({ light = false }: { light?: boolean }) {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Licensed & Insured',
      description: 'NYC DCA License #2049182 with $5,000,000 comprehensive liability & workers’ comp coverage.',
    },
    {
      icon: Compass,
      title: 'Design-Build Integration',
      description: 'Unified architectural planning, interior styling, and master construction under one accountable team.',
    },
    {
      icon: Hammer,
      title: 'Master Craftsmanship',
      description: 'Specialized tradespeople experienced in pre-war framing, historic brownstone joists, and fine joinery.',
    },
    {
      icon: Building2,
      title: 'NYC DOB & LPC Experts',
      description: 'Full management of co-op alteration agreements, Landmarks filings, and Department of Buildings permits.',
    },
    {
      icon: Sparkles,
      title: 'Curated Materials',
      description: 'Direct relationships with Italian marble quarries, custom timber workshops, and luxury appliance brands.',
    },
    {
      icon: CheckCircle2,
      title: 'Fixed-Price Integrity',
      description: 'Detailed transparent line-item proposals and milestone billing with zero hidden surprises.',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <div
            key={idx}
            className={`p-7 border transition-all duration-300 ${
              light
                ? 'bg-white/5 border-white/10 hover:border-[#C9A979]/50 text-white'
                : 'bg-white border-[#1C1B1A]/8 hover:border-[#9E7D4C]/40 text-[#1F1E1D]'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-sm flex items-center justify-center mb-5 ${
                light ? 'bg-white/10 text-[#C9A979]' : 'bg-[#F4EFEB] text-[#9E7D4C]'
              }`}
            >
              <Icon size={24} />
            </div>
            <h4
              className={`text-lg font-editorial-heading font-medium mb-2 ${
                light ? 'text-[#FAF8F5]' : 'text-[#1F1E1D]'
              }`}
            >
              {badge.title}
            </h4>
            <p
              className={`text-sm font-light leading-relaxed ${
                light ? 'text-[#DCD7CE]' : 'text-[#5C5854]'
              }`}
            >
              {badge.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
