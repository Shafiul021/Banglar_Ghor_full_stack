'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminSession } from '@/lib/auth';
import {
  LayoutDashboard,
  FolderKanban,
  Hammer,
  UserCheck,
  Mail,
  Star,
  HelpCircle,
  MapPin,
  Home,
  Building2,
  Image,
  Users,
  History,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

interface SidebarProps {
  session: AdminSession;
}

export function AdminSidebar({ session }: SidebarProps) {
  const pathname = usePathname();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { label: 'Services', href: '/admin/services', icon: Hammer },
    { label: 'Consultation Leads', href: '/admin/leads', icon: UserCheck },
    { label: 'Messages', href: '/admin/messages', icon: Mail },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
    { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Service Areas', href: '/admin/service-areas', icon: MapPin },
    { label: 'Homepage CMS', href: '/admin/homepage', icon: Home },
    { label: 'Company Settings', href: '/admin/company', icon: Building2 },
    { label: 'Media Library', href: '/admin/media', icon: Image },
    { label: 'Admin Users', href: '/admin/users', icon: Users },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: History },
  ];

  return (
    <>
      {/* Mobile Top Toggle Bar */}
      <div className="lg:hidden bg-[#1C1B1A] text-white p-4 flex items-center justify-between border-b border-white/10">
        <div>
          <span className="font-editorial-heading font-bold text-sm block">
            BANLGAR GHOR CMS
          </span>
          <span className="text-[10px] text-[#C9A979] uppercase tracking-wider">
            {session.role}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="p-2 text-white/80 hover:text-white"
        >
          {isOpenMobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`${
          isOpenMobile ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 bg-[#1C1B1A] text-white flex-shrink-0 border-r border-white/10 flex flex-col justify-between`}
      >
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="block">
              <span className="font-editorial-heading text-lg font-bold tracking-tight text-white block">
                BANLGAR GHOR
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A979] font-medium block">
                Content Management System
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpenMobile(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-sm transition-colors ${
                    isActive
                      ? 'bg-[#9E7D4C] text-white'
                      : 'text-[#DCD7CE] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-[#C9A979]'} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={13} />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & View Site link */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="p-3 bg-white/5 rounded-sm">
            <span className="text-xs font-semibold text-white block truncate">
              {session.full_name}
            </span>
            <span className="text-[10px] text-[#C9A979] uppercase tracking-wider block">
              {session.role}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </aside>
    </>
  );
}
