import { NextResponse } from 'next/server';
import { getServiceById, updateService, deleteService, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

  return NextResponse.json({ service });
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await updateService(id, body);
    if (!updated) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    await addAuditLog(
      session.full_name,
      'Updated Service',
      'Service',
      id,
      `Updated "${updated.name}"`
    );

    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

  await deleteService(id);

  await addAuditLog(
    session.full_name,
    'Deleted Service',
    'Service',
    id,
    `Deleted "${service.name}"`
  );

  return NextResponse.json({ success: true });
}
