import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { ProjectForm } from '../ProjectForm';

export default async function AdminNewProjectPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return <ProjectForm isEditing={false} />;
}
