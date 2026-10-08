import { getAdminUsers } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { UsersManager } from './UsersManager';
import { Users } from 'lucide-react';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  const users = await getAdminUsers();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] mb-2 font-medium">
          <Users className="w-4 h-4" />
          <span>Security & Team Access</span>
        </div>
        <h1 className="text-3xl font-serif text-[#FAF8F5]">Admin Users & Roles</h1>
        <p className="text-sm text-[#9E978E] mt-1">
          Manage staff credentials, assigned editorial roles, and account access permissions.
        </p>
      </div>

      <UsersManager initialUsers={users} currentUserId={session?.id || ''} />
    </div>
  );
}
