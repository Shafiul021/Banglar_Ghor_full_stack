import { NextResponse } from 'next/server';
import { updateFAQ, deleteFAQ, addAuditLog } from '@/lib/db';
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
    const updated = await updateFAQ(id, body);
    if (!updated) return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });

    await addAuditLog(session.full_name, 'Updated FAQ', 'FAQ', id, `Updated "${updated.question.slice(0, 30)}..."`);
    return NextResponse.json({ success: true, faq: updated });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: 'Failed to update FAQ.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await deleteFAQ(id);
  await addAuditLog(session.full_name, 'Deleted FAQ', 'FAQ', id, `Deleted ID ${id}`);
  return NextResponse.json({ success: true });
}
