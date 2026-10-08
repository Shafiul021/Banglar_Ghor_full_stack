import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getContactMessages } from '@/lib/db';
import { MessagesManager } from './MessagesManager';

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const messages = await getContactMessages();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#1C1B1A]/8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E7D4C] font-semibold block mb-1">
          Direct Inquiries
        </span>
        <h1 className="text-2xl font-editorial-heading font-medium text-[#1F1E1D]">
          Contact Messages ({messages.length})
        </h1>
        <p className="text-xs text-[#8C867F]">
          Review and respond to client inquiries sent via the public contact page.
        </p>
      </div>

      <MessagesManager initialMessages={messages} />
    </div>
  );
}
