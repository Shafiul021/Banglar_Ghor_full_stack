import { NextResponse } from 'next/server';
import { updateAdminUser, deleteAdminUser, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

interface Props {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session || session.role !== 'Super Admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = await updateAdminUser(id, body);
    if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    await addAuditLog(session.full_name, 'Updated Admin User', 'AdminUser', id, `Updated ${updated.email}`);
    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error('Error updating admin user:', error);
    return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session || session.role !== 'Super Admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  if (id === session.id) {
    return NextResponse.json({ error: 'Cannot delete yourself.' }, { status: 400 });
  }

  await deleteAdminUser(id);
  await addAuditLog(session.full_name, 'Deleted Admin User', 'AdminUser', id, `Deleted user ID ${id}`);
  return NextResponse.json({ success: true });
}
