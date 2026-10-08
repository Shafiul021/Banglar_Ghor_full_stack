import React from 'react';
import Image from 'next/image';
import { Breadcrumbs, BreadcrumbItem } from '@/components/ui/Breadcrumbs';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  bgImage: string;
  breadcrumbs: BreadcrumbItem[];
  badge?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  bgImage,
  breadcrumbs,
  badge,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative min-h-[44vh] sm:min-h-[50vh] flex items-end bg-[#1C1B1A] pt-32 sm:pt-36 pb-14 sm:pb-20 overflow-hidden border-b border-[#1C1B1A]/20">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.45] contrast-[1.08]"
        />
        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A] via-[#1C1B1A]/65 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,168,128,0.12),transparent_70%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Breadcrumbs light={true} items={breadcrumbs} />

        <div className="max-w-3xl mt-3 sm:mt-4">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {eyebrow && (
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A979] font-semibold block">
                {eyebrow}
              </span>
            )}
            {badge && (
              <span className="px-2.5 py-0.5 bg-white/10 backdrop-blur-md text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-medium border border-white/15">
                {badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-heading font-medium text-white leading-[1.12] mb-4 sm:mb-5 tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base lg:text-lg font-light text-[#DCD7CE] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}
