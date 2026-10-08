import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${
        align === 'center' ? 'mx-auto text-center' : ''
      } ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs uppercase tracking-[0.25em] font-semibold mb-3 ${
            light ? 'text-[#C9A979]' : 'text-[#9E7D4C]'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-editorial-heading font-medium tracking-tight leading-[1.15] mb-5 ${
          light ? 'text-[#FAF8F5]' : 'text-[#1F1E1D]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base sm:text-lg font-light leading-relaxed ${
            light ? 'text-[#DCD7CE]' : 'text-[#5C5854]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
