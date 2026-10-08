import { NextResponse } from 'next/server';
import { updateConsultationRequestStatus, deleteConsultationRequest, addAuditLog } from '@/lib/db';
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
    const updated = await updateConsultationRequestStatus(id, status, internal_notes);
    if (!updated) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    await addAuditLog(
      session.full_name,
      'Updated Lead Status',
      'ConsultationRequest',
      id,
      `Changed status to ${status}`
    );

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Failed to update lead status.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await deleteConsultationRequest(id);

  await addAuditLog(
    session.full_name,
    'Deleted Lead',
    'ConsultationRequest',
    id,
    `Archived/Deleted Lead ID ${id}`
  );

  return NextResponse.json({ success: true });
}
