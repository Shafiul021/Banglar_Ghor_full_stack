'use client';

import { useState } from 'react';
import { AdminUser } from '@/lib/db/types';
import { UserCheck, UserPlus, Shield, Trash2, Edit2, Key, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface UsersManagerProps {
  initialUsers: AdminUser[];
  currentUserId: string;
}

export function UsersManager({ initialUsers, currentUserId }: UsersManagerProps) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // New user form state
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<AdminUser['role']>('Editor');

  // Edit user password reset state
  const [editPassword, setEditPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const roles: AdminUser['role'][] = [
    'Super Admin',
    'Content Manager',
    'Project Manager',
    'Sales',
    'Editor',
    'Viewer',
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newEmail,
          full_name: newName,
          password: newPassword,
          role: newRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');

      setUsers((prev) => [...prev, data.user]);
      setIsCreating(false);
      setNewEmail('');
      setNewName('');
      setNewPassword('');
      setSuccessMsg(`User ${data.user.email} created successfully.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error creating user');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const updatePayload: {
        full_name: string;
        role: AdminUser['role'];
        is_active: number;
        new_password?: string;
      } = {
        full_name: editingUser.full_name,
        role: editingUser.role,
        is_active: editingUser.is_active,
      };

      if (editPassword) {
        updatePayload.new_password = editPassword;
      }

      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update user');

      setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? data.user : u)));
      setEditingUser(null);
      setEditPassword('');
      setSuccessMsg(`User updated successfully.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (id === currentUserId) {
      alert('You cannot delete your own account while logged in.');
      return;
    }

    if (!confirm(`Are you sure you want to delete admin account for ${email}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete user');
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSuccessMsg(`User deleted.`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error deleting user');
    }
  };

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="flex items-center gap-2 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-4 bg-rose-950/40 border border-rose-500/30 rounded-lg text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Header action */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#9E978E]">
          {users.length} authorized staff members with dashboard permissions.
        </p>

        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4BC96] text-[#141312] px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#141312] text-[#9E978E] text-[11px] uppercase tracking-wider border-b border-[#2D2A26]">
              <tr>
                <th className="py-4 px-6 font-medium">User / Name</th>
                <th className="py-4 px-6 font-medium">Role</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Created</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D2A26]">
              {users.map((user) => {
                const isCurrent = user.id === currentUserId;
                return (
                  <tr key={user.id} className="hover:bg-[#252320]/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#252320] border border-[#3A3630] flex items-center justify-center text-[#C5A880] text-xs font-semibold">
                          {user.full_name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div>
                          <div className="font-medium text-[#FAF8F5] flex items-center gap-2">
                            <span>{user.full_name}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-[#C5A880]/20 text-[#C5A880] px-2 py-0.5 rounded font-normal">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#9E978E]">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#141312] border border-[#3A3630] text-[#D4BC96]">
                        <Shield className="w-3 h-3 text-[#C5A880]" />
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.is_active
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        <UserCheck className="w-3 h-3" />
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-[#9E978E]">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-1.5 text-[#9E978E] hover:text-[#FAF8F5] hover:bg-[#2D2A26] rounded transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {!isCurrent && (
                          <button
                            onClick={() => handleDelete(user.id, user.email)}
                            className="p-1.5 text-[#9E978E] hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl max-w-lg w-full p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#2D2A26] pb-4">
              <h2 className="text-lg font-serif text-[#FAF8F5]">Add New Admin Account</h2>
              <button
                onClick={() => setIsCreating(false)}
                className="text-[#9E978E] hover:text-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="elena@banlgarghor.com"
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
                  Access Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as AdminUser['role'])}
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#2D2A26]">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#9E978E] hover:text-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C5A880] hover:bg-[#D4BC96] text-[#141312] px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1B1A] border border-[#2D2A26] rounded-xl max-w-lg w-full p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#2D2A26] pb-4">
              <h2 className="text-lg font-serif text-[#FAF8F5]">Edit User: {editingUser.email}</h2>
              <button
                onClick={() => setEditingUser(null)}
                className="text-[#9E978E] hover:text-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editingUser.full_name}
                  onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
                  Access Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value as AdminUser['role'] })
                  }
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium">
                  Account Status
                </label>
                <select
                  value={editingUser.is_active}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, is_active: Number(e.target.value) })
                  }
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Disabled / Inactive</option>
                </select>
              </div>

              <div className="pt-2 border-t border-[#2D2A26]">
                <label className="block text-xs uppercase tracking-wider text-[#9E978E] mb-2 font-medium flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Reset Password (leave empty to keep current)</span>
                </label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Enter new password to reset"
                  className="w-full bg-[#141312] border border-[#2D2A26] rounded-lg px-4 py-2.5 text-[#FAF8F5] text-sm focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#2D2A26]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-[#9E978E] hover:text-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C5A880] hover:bg-[#D4BC96] text-[#141312] px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
