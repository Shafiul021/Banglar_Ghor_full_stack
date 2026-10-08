'use client';

import React, { useState, useMemo } from 'react';
import { FAQ } from '@/lib/db/types';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Search } from 'lucide-react';

const CATEGORIES = [
  'All',
  'General',
  'Process',
  'Pricing',
  'Design',
  'Construction',
  'Timeline',
  'Financing',
];

export function FAQList({ initialFaqs }: { initialFaqs: FAQ[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All' || faq.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Category Pills & Search */}
      <div className="space-y-6 mb-12 pb-8 border-b border-[#1C1B1A]/8">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions (e.g., permits, cost, timeline, co-op board)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#1C1B1A]/12 text-sm text-[#1F1E1D] placeholder-[#8C867F] focus:outline-none focus:border-[#9E7D4C] transition-colors"
          />
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C867F]"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  isSelected
                    ? 'bg-[#1F1E1D] text-white'
                    : 'bg-white text-[#5C5854] hover:bg-[#F4EFEB] hover:text-[#1F1E1D] border border-[#1C1B1A]/8'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Results */}
      {filteredFaqs.length > 0 ? (
        <FAQAccordion faqs={filteredFaqs} allowMultiple={true} />
      ) : (
        <div className="py-16 text-center bg-white border border-dashed border-[#1C1B1A]/15 p-8">
          <p className="font-editorial-heading text-xl text-[#1F1E1D] mb-2">
            No matching questions found
          </p>
          <p className="text-xs sm:text-sm text-[#5C5854] mb-5 font-light">
            Try adjusting your search terms or browse all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-[#1F1E1D] text-white text-xs uppercase tracking-widest"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
