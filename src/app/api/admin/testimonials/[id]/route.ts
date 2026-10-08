import { NextResponse } from 'next/server';
import { updateTestimonial, deleteTestimonial, addAuditLog } from '@/lib/db';
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
    const updated = await updateTestimonial(id, body);
    if (!updated) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });

    await addAuditLog(session.full_name, 'Updated Testimonial', 'Testimonial', id, `Updated ${updated.name}`);
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await deleteTestimonial(id);
  await addAuditLog(session.full_name, 'Deleted Testimonial', 'Testimonial', id, `Deleted ID ${id}`);
  return NextResponse.json({ success: true });
}
