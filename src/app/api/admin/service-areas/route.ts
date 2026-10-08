import { NextResponse } from 'next/server';
import { getServiceAreas, createServiceArea, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const areas = await getServiceAreas(false);
  return NextResponse.json({ serviceAreas: areas });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const created = await createServiceArea(body);

    await addAuditLog(session.full_name, 'Created Service Area', 'ServiceArea', created.id, `Created ${created.name}`);
    return NextResponse.json({ success: true, serviceArea: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating service area:', error);
    return NextResponse.json({ error: 'Failed to create service area.' }, { status: 500 });
  }
}
