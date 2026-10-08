import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAdminUserByEmail, addAuditLog } from '@/lib/db';
import { signAdminToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = await getAdminUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid administrator email or password.' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid administrator email or password.' },
        { status: 401 }
      );
    }

    // Sign session token
    const token = await signAdminToken({
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    });

    await addAuditLog(user.full_name, 'Admin Login', 'Auth', user.id, 'Logged in to CMS');

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Error in /api/admin/login:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login.' },
      { status: 500 }
    );
  }
}
