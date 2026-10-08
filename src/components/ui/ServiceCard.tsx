import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/lib/db/types';

export function ServiceCard({ service }: { service: Service }) {
  let scopeList: string[] = [];
  try {
    scopeList = JSON.parse(service.scope_items);
  } catch {
    scopeList = [];
  }

  return (
    <article className="group flex flex-col bg-white border border-[#1C1B1A]/8 hover:border-[#9E7D4C]/40 transition-all duration-500 overflow-hidden">
      {/* Image */}
      <Link
        href={`/services/${service.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[#EAE4DA]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.hero_image}
          alt={service.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A979] font-medium block mb-1">
            Service Scope
          </span>
          <h3 className="text-xl sm:text-2xl font-editorial-heading font-medium text-white">
            {service.name}
          </h3>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-sm font-light text-[#5C5854] leading-relaxed mb-6">
            {service.short_description}
          </p>

          {scopeList.length > 0 && (
            <div className="space-y-2 mb-6">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1F1E1D] block">
                Typical Scope:
              </span>
              <ul className="text-xs text-[#5C5854] space-y-1.5 font-light">
                {scopeList.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#9E7D4C] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#1C1B1A]/6 flex items-center justify-between">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] group-hover:text-[#9E7D4C] transition-colors"
          >
            <span>Explore Service</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/consultation"
            className="text-[11px] uppercase tracking-wider text-[#8C867F] hover:text-[#1F1E1D] transition-colors"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
