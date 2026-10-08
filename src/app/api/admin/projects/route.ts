import { NextResponse } from 'next/server';
import { getProjects, createProject, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const projects = await getProjects({ publishedOnly: false });
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { images, ...projectData } = body;

    const newProject = await createProject(projectData, images);

    await addAuditLog(
      session.full_name,
      'Created Project',
      'Project',
      newProject.id,
      `Created project "${newProject.title}"`
    );

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}
