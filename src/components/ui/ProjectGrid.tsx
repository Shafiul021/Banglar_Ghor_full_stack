'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/lib/db/types';
import { ProjectCard } from './ProjectCard';
import { Search } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Whole-Home Renovation',
  'Basement Finishing',
  'Home Addition',
  'Custom Renovations',
];

export function ProjectGrid({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Home Addition' && p.category.toLowerCase().includes('addition'));

      const matchesSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Filters & Search Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#1C1B1A]/8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-300 font-medium ${
                  isSelected
                    ? 'bg-[#1F1E1D] text-[#FAF8F5] shadow-sm'
                    : 'bg-white text-[#5C5854] hover:bg-[#F4EFEB] hover:text-[#1F1E1D] border border-[#1C1B1A]/8'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px] max-w-sm">
          <input
            type="text"
            placeholder="Search projects or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#1C1B1A]/10 text-[#1F1E1D] placeholder-[#8C867F] focus:outline-none focus:border-[#9E7D4C] transition-colors"
          />
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C867F]"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={idx < 3}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-[#1C1B1A]/15 bg-white/50 p-8">
          <p className="font-editorial-heading text-2xl text-[#1F1E1D] mb-2">
            No projects found
          </p>
          <p className="text-sm text-[#5C5854] mb-6 font-light">
            No projects match the selected category or search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 bg-[#1F1E1D] text-white text-xs uppercase tracking-widest hover:bg-[#9E7D4C] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
