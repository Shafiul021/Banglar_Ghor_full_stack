'use client';

import React, { useState } from 'react';
import { FAQ } from '@/lib/db/types';
import { Plus, Minus } from 'lucide-react';

export function FAQAccordion({
  faqs,
  allowMultiple = false,
}: {
  faqs: FAQ[];
  allowMultiple?: boolean;
}) {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || '']);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-[#1C1B1A]/8 border-y border-[#1C1B1A]/8">
      {faqs.map((faq) => {
        const isOpen = openIds.includes(faq.id);
        const buttonId = `faq-btn-${faq.id}`;
        const panelId = `faq-panel-${faq.id}`;

        return (
          <div key={faq.id} className="py-6">
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full flex items-start justify-between gap-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9E7D4C]"
              >
                <span className="text-lg sm:text-xl font-editorial-heading font-medium text-[#1F1E1D] group-hover:text-[#9E7D4C] transition-colors leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                      : 'border-[#1C1B1A]/15 text-[#5C5854] group-hover:border-[#9E7D4C] group-hover:text-[#9E7D4C]'
                  }`}
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={`pt-4 text-sm sm:text-base font-light text-[#5C5854] leading-relaxed transition-all duration-300 ${
                isOpen ? 'block opacity-100' : 'hidden opacity-0'
              }`}
            >
              <div className="pr-12">{faq.answer}</div>
              <div className="mt-3">
                <span className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-[#F4EFEB] text-[#8C867F]">
                  Category: {faq.category}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
