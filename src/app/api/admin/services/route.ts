import { NextResponse } from 'next/server';
import { getServices, createService, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const services = await getServices(false);
  return NextResponse.json({ services });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const newService = await createService(body);

    await addAuditLog(
      session.full_name,
      'Created Service',
      'Service',
      newService.id,
      `Created service "${newService.name}"`
    );

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service.' }, { status: 500 });
  }
}
