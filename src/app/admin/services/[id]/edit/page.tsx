import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getServiceById } from '@/lib/db';
import { ServiceEditForm } from '../../ServiceEditForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditServicePage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return <ServiceEditForm service={service} />;
}
