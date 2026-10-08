import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/db/types';

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex flex-col bg-white border border-[#1C1B1A]/8 hover:border-[#9E7D4C]/40 transition-all duration-500 overflow-hidden">
      {/* Image Container with editorial aspect ratio */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/11] overflow-hidden bg-[#EAE4DA]"
        aria-label={`View case study: ${project.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.hero_image}
          alt={`${project.title} - ${project.category} in ${project.location}`}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#1F1E1D]/85 backdrop-blur-md text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-medium border border-white/10">
          {project.category}
        </div>

        {/* Budget pill if available */}
        {project.budget_display && (
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md text-[#1F1E1D] text-[10px] uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.budget_display}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#8C867F] mb-2 font-medium">
            <span>{project.neighborhood ? `${project.neighborhood}, ${project.location}` : project.location}</span>
            <span>{project.timeline}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-editorial-heading font-medium text-[#1F1E1D] group-hover:text-[#9E7D4C] transition-colors mb-3 leading-snug">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="text-sm font-light text-[#5C5854] line-clamp-2 leading-relaxed mb-6">
            {project.short_description || project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-[#1C1B1A]/6 flex items-center justify-between">
          <span className="text-xs text-[#8C867F] font-light">
            Completed {project.year_completed}
          </span>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#1F1E1D] group-hover:text-[#9E7D4C] transition-colors"
          >
            <span>View Project</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
