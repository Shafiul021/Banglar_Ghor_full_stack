import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';
import { getDashboardStats } from '@/lib/db';
import {
  FolderKanban,
  Hammer,
  UserCheck,
  Mail,
  Star,
  HelpCircle,
  Plus,
  ArrowRight,
  Eye,
  CheckCircle,
  Clock,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 border border-[#1C1B1A]/8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
            Studio Management Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-editorial-heading font-medium text-[#1F1E1D]">
            Welcome back, {session.full_name}
          </h1>
          <p className="text-xs sm:text-sm font-light text-[#5C5854] mt-1">
            Live overview of website leads, published projects, and client inquiries.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/projects/new"
            className="px-4 py-2.5 bg-[#1F1E1D] hover:bg-[#9E7D4C] text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center gap-2"
          >
            <Plus size={14} />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/leads"
            className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#F4EFEB] border border-[#1C1B1A]/10 text-[#1F1E1D] text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
          >
            <span>View Leads ({stats.newLeads})</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="p-5 bg-white border border-[#1C1B1A]/8 shadow-sm">
          <div className="flex items-center justify-between text-[#8C867F] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Projects</span>
            <FolderKanban size={16} className="text-[#9E7D4C]" />
          </div>
          <span className="text-2xl sm:text-3xl font-editorial-heading font-bold text-[#1F1E1D] block">
            {stats.totalProjects}
          </span>
          <span className="text-[10px] text-[#5C5854]">
            {stats.publishedProjects} Published
          </span>
        </div>

        <div className="p-5 bg-white border border-[#1C1B1A]/8 shadow-sm">
          <div className="flex items-center justify-between text-[#8C867F] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Total Leads</span>
            <UserCheck size={16} className="text-[#9E7D4C]" />
          </div>
          <span className="text-2xl sm:text-3xl font-editorial-heading font-bold text-[#1F1E1D] block">
            {stats.totalLeads}
          </span>
          <span className="text-[10px] text-amber-700 font-medium">
            {stats.newLeads} New Requests
          </span>
        </div>

        <div className="p-5 bg-white border border-[#1C1B1A]/8 shadow-sm">
          <div className="flex items-center justify-between text-[#8C867F] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Messages</span>
            <Mail size={16} className="text-[#9E7D4C]" />
          </div>
          <span className="text-2xl sm:text-3xl font-editorial-heading font-bold text-[#1F1E1D] block">
            {stats.totalMessages}
          </span>
          <span className="text-[10px] text-amber-700 font-medium">
            {stats.newMessages} Unread
          </span>
        </div>

        <div className="p-5 bg-white border border-[#1C1B1A]/8 shadow-sm">
          <div className="flex items-center justify-between text-[#8C867F] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Services</span>
            <Hammer size={16} className="text-[#9E7D4C]" />
          </div>
          <span className="text-2xl sm:text-3xl font-editorial-heading font-bold text-[#1F1E1D] block">
            {stats.servicesCount}
          </span>
          <span className="text-[10px] text-emerald-700 font-medium">Active</span>
        </div>

        <div className="p-5 bg-white border border-[#1C1B1A]/8 shadow-sm">
          <div className="flex items-center justify-between text-[#8C867F] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Reviews</span>
            <Star size={16} className="text-[#9E7D4C]" />
          </div>
          <span className="text-2xl sm:text-3xl font-editorial-heading font-bold text-[#1F1E1D] block">
            {stats.testimonialsCount}
          </span>
          <span className="text-[10px] text-[#5C5854]">Published</span>
        </div>

        <div className="p-5 bg-white border border-[#1C1B1A]/8 shadow-sm">
          <div className="flex items-center justify-between text-[#8C867F] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">FAQs</span>
            <HelpCircle size={16} className="text-[#9E7D4C]" />
          </div>
          <span className="text-2xl sm:text-3xl font-editorial-heading font-bold text-[#1F1E1D] block">
            {stats.faqsCount}
          </span>
          <span className="text-[10px] text-[#5C5854]">Published</span>
        </div>

        <div className="p-5 bg-white border border-[#1C1B1A]/8 shadow-sm">
          <div className="flex items-center justify-between text-[#8C867F] mb-3">
            <span className="text-xs uppercase tracking-wider font-medium">Status</span>
            <CheckCircle size={16} className="text-emerald-600" />
          </div>
          <span className="text-sm font-semibold text-emerald-700 block mt-2">
            Online
          </span>
          <span className="text-[10px] text-[#5C5854]">DB Connected</span>
        </div>
      </div>

      {/* Two Column Layout: Recent Consultation Leads & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Consultation Leads */}
        <div className="bg-white border border-[#1C1B1A]/8 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1C1B1A]/8">
            <div>
              <h2 className="text-lg font-editorial-heading font-medium text-[#1F1E1D]">
                Recent Consultation Requests
              </h2>
              <span className="text-xs text-[#8C867F]">Prospective client project submissions</span>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs uppercase tracking-wider font-semibold text-[#9E7D4C] hover:text-[#84653B] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {stats.recentLeads.length > 0 ? (
            <div className="divide-y divide-[#1C1B1A]/6">
              {stats.recentLeads.map((lead) => (
                <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1F1E1D]">
                      {lead.name}
                    </h3>
                    <p className="text-xs text-[#8C867F]">
                      {lead.project_type} • {lead.budget} • ZIP {lead.zip_code}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm ${
                        lead.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : lead.status === 'Consultation Scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                    <Link
                      href="/admin/leads"
                      className="p-1.5 text-[#8C867F] hover:text-[#1F1E1D] transition-colors"
                      title="Inspect Lead"
                    >
                      <Eye size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8C867F] py-8 text-center">
              No consultation requests received yet.
            </p>
          )}
        </div>

        {/* Recent Contact Messages */}
        <div className="bg-white border border-[#1C1B1A]/8 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1C1B1A]/8">
            <div>
              <h2 className="text-lg font-editorial-heading font-medium text-[#1F1E1D]">
                Recent Inquiries & Messages
              </h2>
              <span className="text-xs text-[#8C867F]">Direct messages sent via contact page</span>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs uppercase tracking-wider font-semibold text-[#9E7D4C] hover:text-[#84653B] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {stats.recentMessages.length > 0 ? (
            <div className="divide-y divide-[#1C1B1A]/6">
              {stats.recentMessages.map((msg) => (
                <div key={msg.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-[#1F1E1D]">
                      {msg.name}
                    </h3>
                    <p className="text-xs text-[#5C5854] truncate">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm ${
                        msg.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {msg.status}
                    </span>
                    <Link
                      href="/admin/messages"
                      className="p-1.5 text-[#8C867F] hover:text-[#1F1E1D] transition-colors"
                      title="View Message"
                    >
                      <Eye size={15} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8C867F] py-8 text-center">
              No contact messages received yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
