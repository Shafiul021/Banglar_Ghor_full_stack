import { NextResponse } from 'next/server';
import { createConsultationRequest, addAuditLog } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Anti-spam honeypot check:
    // If the hidden 'hp_company' field is filled, silently reject or reject
    if (body.hp_company) {
      return NextResponse.json(
        { error: 'Spam detected.' },
        { status: 400 }
      );
    }

    // 2. Server-side validation
    const { name, email, phone, zip_code, project_type, property_type, budget, timeline, project_details, address, preferred_contact_method } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    if (!zip_code || typeof zip_code !== 'string') {
      return NextResponse.json({ error: 'ZIP code is required.' }, { status: 400 });
    }

    // 3. Persist to real database
    const savedLead = await createConsultationRequest({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      zip_code: zip_code.trim(),
      project_type: project_type || 'Kitchen Remodeling',
      property_type: property_type || 'Condominium',
      budget: budget || '$100k–$250k',
      timeline: timeline || '1–3 Months',
      project_details: (project_details || '').trim(),
      address: (address || '').trim(),
      preferred_contact_method: preferred_contact_method || 'Email',
    });

    await addAuditLog(
      'Public Visitor',
      'Submitted Consultation Request',
      'ConsultationRequest',
      savedLead.id,
      `Lead from ${name} for ${project_type}`
    );

    return NextResponse.json({
      success: true,
      message: 'Consultation request received successfully.',
      leadId: savedLead.id,
    }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/consultation:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing consultation.' },
      { status: 500 }
    );
  }
}
