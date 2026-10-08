import { NextResponse } from 'next/server';
import { getCompanySettings, updateCompanySettings, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const settings = await getCompanySettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const updated = await updateCompanySettings(body);

    await addAuditLog(
      session.full_name,
      'Updated Company & Homepage Settings',
      'CompanySettings',
      updated.id,
      'Updated global company information & homepage content'
    );

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Error updating company settings:', error);
    return NextResponse.json({ error: 'Failed to update company settings.' }, { status: 500 });
  }
}
