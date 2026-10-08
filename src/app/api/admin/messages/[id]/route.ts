import { NextResponse } from 'next/server';
import { updateContactMessageStatus, deleteContactMessage, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

interface Props {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const { status, internal_notes } = await request.json();
    const updated = await updateContactMessageStatus(id, status, internal_notes);
    if (!updated) return NextResponse.json({ error: 'Message not found' }, { status: 404 });

    await addAuditLog(
      session.full_name,
      'Updated Message Status',
      'ContactMessage',
      id,
      `Status: ${status}`
    );

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message status.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await deleteContactMessage(id);

  await addAuditLog(
    session.full_name,
    'Deleted Message',
    'ContactMessage',
    id,
    `Deleted Message ID ${id}`
  );

  return NextResponse.json({ success: true });
}
