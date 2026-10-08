'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminSession } from '@/lib/auth';
import { LogOut, Plus, User, Shield } from 'lucide-react';

export function AdminHeader({ session }: { session: AdminSession }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="bg-white border-b border-[#1C1B1A]/8 px-4 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="System Online" />
        <span className="text-xs uppercase tracking-wider text-[#8C867F] font-semibold">
          Banlgar Ghor Studio Management
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick action buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/admin/projects/new"
            className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-[#1F1E1D] hover:border-[#9E7D4C] text-xs font-semibold rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus size={13} className="text-[#9E7D4C]" />
            <span>Add Project</span>
          </Link>

          <Link
            href="/admin/leads"
            className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#1C1B1A]/10 text-[#1F1E1D] hover:border-[#9E7D4C] text-xs font-semibold rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <span>View Leads</span>
          </Link>
        </div>

        {/* User & Logout */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#1C1B1A]/10">
          <div className="text-right hidden md:block">
            <span className="text-xs font-semibold text-[#1F1E1D] block">
              {session.full_name}
            </span>
            <span className="text-[10px] text-[#8C867F] block uppercase tracking-wider">
              {session.role}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 text-[#8C867F] hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
