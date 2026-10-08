import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'banlgar_ghor_remodeling_super_secret_jwt_key_2025_nyc_luxury'
);

export const SESSION_COOKIE_NAME = 'bg_admin_session';

export interface AdminSession {
  id: string;
  email: string;
  role: 'Super Admin' | 'Content Manager' | 'Project Manager' | 'Sales' | 'Editor' | 'Viewer';
  full_name: string;
}

export async function signAdminToken(payload: AdminSession): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as AdminSession['role'],
      full_name: payload.full_name as string,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
