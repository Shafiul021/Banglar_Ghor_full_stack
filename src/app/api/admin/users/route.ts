import { NextResponse } from 'next/server';
import { getAdminUsers, createAdminUser, addAuditLog } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const users = await getAdminUsers();
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session || session.role !== 'Super Admin') {
    return NextResponse.json({ error: 'Forbidden: Super Admin access required' }, { status: 403 });
  }

  try {
    const { email, password, full_name, role } = await request.json();
    if (!email || !password || !full_name) {
      return NextResponse.json({ error: 'Email, password, and name are required.' }, { status: 400 });
    }

    const created = await createAdminUser({
      email,
      password,
      full_name,
      role: role || 'Editor',
    });

    await addAuditLog(
      session.full_name,
      'Created Admin User',
      'AdminUser',
      created.id,
      `Created ${created.email} with role ${created.role}`
    );

    return NextResponse.json({ success: true, user: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json({ error: 'Failed to create admin user.' }, { status: 500 });
  }
}
