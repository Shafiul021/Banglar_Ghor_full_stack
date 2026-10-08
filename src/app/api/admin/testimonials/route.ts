import { NextResponse } from 'next/server';
import { getTestimonials, createTestimonial, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const testimonials = await getTestimonials(false);
  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const created = await createTestimonial(body);

    await addAuditLog(
      session.full_name,
      'Created Testimonial',
      'Testimonial',
      created.id,
      `From ${created.name}`
    );

    return NextResponse.json({ success: true, testimonial: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial.' }, { status: 500 });
  }
}
