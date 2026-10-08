import { NextResponse } from 'next/server';
import { updateServiceArea, deleteServiceArea, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

interface Props {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await updateServiceArea(id, body);
    if (!updated) return NextResponse.json({ error: 'Service area not found' }, { status: 404 });

    await addAuditLog(session.full_name, 'Updated Service Area', 'ServiceArea', id, `Updated ${updated.name}`);
    return NextResponse.json({ success: true, serviceArea: updated });
  } catch (error) {
    console.error('Error updating service area:', error);
    return NextResponse.json({ error: 'Failed to update service area.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await deleteServiceArea(id);
  await addAuditLog(session.full_name, 'Deleted Service Area', 'ServiceArea', id, `Deleted ID ${id}`);
  return NextResponse.json({ success: true });
}
