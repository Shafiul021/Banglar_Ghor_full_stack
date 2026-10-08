import { NextResponse } from 'next/server';
import { getProjectById, updateProject, deleteProject, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  return NextResponse.json({ project });
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const { images, ...projectData } = body;

    const updated = await updateProject(id, projectData, images);
    if (!updated) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    await addAuditLog(
      session.full_name,
      'Updated Project',
      'Project',
      id,
      `Updated "${updated.title}" (published: ${updated.published})`
    );

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  await deleteProject(id);

  await addAuditLog(
    session.full_name,
    'Deleted Project',
    'Project',
    id,
    `Deleted "${project.title}"`
  );

  return NextResponse.json({ success: true });
}
