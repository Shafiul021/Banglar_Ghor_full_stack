'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/db/types';
import { Edit2, Trash2, ExternalLink, Star, Eye, EyeOff, Search } from 'lucide-react';

export function ProjectTable({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  const handleTogglePublish = async (project: Project) => {
    const newStatus = project.published === 1 ? 0 : 1;
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: newStatus }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, published: newStatus } : p))
        );
      }
    } catch (err) {
      console.error('Failed to toggle publish:', err);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    const newFeatured = project.featured === 1 ? 0 : 1;
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newFeatured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, featured: newFeatured } : p))
        );
      }
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Published' && p.published === 1) ||
      (statusFilter === 'Draft' && p.published === 0);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#1C1B1A]/8 shadow-sm">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-xs focus:outline-none focus:border-[#9E7D4C]"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C867F]" />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {(['All', 'Published', 'Draft'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                statusFilter === status
                  ? 'bg-[#1F1E1D] text-white'
                  : 'bg-[#FAF8F5] text-[#5C5854] hover:bg-[#EAE4DA]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-[#1C1B1A]/8 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1C1B1A]/8 bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#8C867F] font-semibold">
              <th className="py-3 px-4">Project</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Budget</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Featured</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1B1A]/6 text-xs text-[#1F1E1D]">
            {filtered.map((project) => (
              <tr key={project.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                <td className="py-3.5 px-4 font-medium">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.hero_image}
                      alt=""
                      className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                    />
                    <div>
                      <span className="font-semibold text-sm block">{project.title}</span>
                      <span className="text-[10px] text-[#8C867F]">{project.timeline}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#5C5854]">{project.category}</td>
                <td className="py-3.5 px-4 text-[#5C5854]">{project.neighborhood || project.location}</td>
                <td className="py-3.5 px-4 font-mono text-[11px]">{project.budget_display}</td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(project)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-colors ${
                      project.published === 1
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {project.published === 1 ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>{project.published === 1 ? 'Published' : 'Draft'}</span>
                  </button>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(project)}
                    className={`p-1.5 transition-colors ${
                      project.featured === 1
                        ? 'text-amber-600 hover:text-amber-700'
                        : 'text-[#C5BEB3] hover:text-amber-500'
                    }`}
                    title={project.featured === 1 ? 'Featured on Homepage' : 'Not Featured'}
                  >
                    <Star size={16} fill={project.featured === 1 ? 'currentColor' : 'none'} />
                  </button>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-1.5 text-[#8C867F] hover:text-[#1F1E1D] transition-colors"
                      title="View Live Page"
                    >
                      <ExternalLink size={15} />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-1.5 text-[#9E7D4C] hover:text-[#84653B] transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 size={15} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#8C867F]">
            No projects match the search filter.
          </div>
        )}
      </div>
    </div>
  );
}
