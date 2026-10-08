import { NextResponse } from 'next/server';
import { createContactMessage, addAuditLog } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Anti-spam honeypot
    if (body.hp_fax) {
      return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
    }

    // 2. Validation
    const { name, email, phone, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    // 3. Persist
    const savedMsg = await createContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      message: message.trim(),
    });

    await addAuditLog(
      'Public Visitor',
      'Sent Contact Message',
      'ContactMessage',
      savedMsg.id,
      `Message from ${name}`
    );

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
      id: savedMsg.id,
    }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Internal server error while sending message.' },
      { status: 500 }
    );
  }
}
