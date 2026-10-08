import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';
import { getProjects } from '@/lib/db';
import { ProjectTable } from './ProjectTable';
import { Plus } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const projects = await getProjects({ publishedOnly: false });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C1B1A]/8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
            Portfolio Management
          </span>
          <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
            Projects & Case Studies ({projects.length})
          </h1>
          <p className="text-xs text-[#8C867F]">
            Manage published portfolio case studies, images, and before/after comparisons.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="self-start sm:self-center px-4 py-2.5 bg-[#1F1E1D] hover:bg-[#9E7D4C] text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center gap-2"
        >
          <Plus size={14} />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Interactive Project Table */}
      <ProjectTable initialProjects={projects} />
    </div>
  );
}
