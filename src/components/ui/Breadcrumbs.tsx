import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  light = false,
}: {
  items: BreadcrumbItem[];
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest">
        <li>
          <Link
            href="/"
            className={`transition-colors ${
              light
                ? 'text-[#C9A979] hover:text-white'
                : 'text-[#8C867F] hover:text-[#1F1E1D]'
            }`}
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight
                size={12}
                className={light ? 'text-[#8C867F]' : 'text-[#A8A196]'}
              />
              {isLast || !item.href ? (
                <span
                  className={`font-medium ${
                    light ? 'text-white' : 'text-[#1F1E1D]'
                  }`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    light
                      ? 'text-[#C9A979] hover:text-white'
                      : 'text-[#8C867F] hover:text-[#1F1E1D]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
