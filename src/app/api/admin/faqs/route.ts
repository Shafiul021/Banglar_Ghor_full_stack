import { NextResponse } from 'next/server';
import { getFAQs, createFAQ, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const faqs = await getFAQs(false);
  return NextResponse.json({ faqs });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const created = await createFAQ(body);

    await addAuditLog(session.full_name, 'Created FAQ', 'FAQ', created.id, `Created "${created.question.slice(0, 30)}..."`);
    return NextResponse.json({ success: true, faq: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ.' }, { status: 500 });
  }
}
