import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getProjectById } from '@/lib/db';
import { ProjectForm } from '../../ProjectForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProjectPage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectForm initialProject={project} isEditing={true} />;
}
