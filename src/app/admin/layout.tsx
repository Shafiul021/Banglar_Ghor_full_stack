import React from 'react';
import { getAdminSession } from '@/lib/auth';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

export const revalidate = 0;

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If unauthenticated (e.g., viewing /admin/login), render clean container
  if (!session) {
    return <div className="min-h-screen bg-[#1C1B1A] text-white">{children}</div>;
  }

  // If authenticated, render full CMS dashboard shell with Sidebar & Header
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1F1E1D] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <AdminSidebar session={session} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader session={session} />
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
