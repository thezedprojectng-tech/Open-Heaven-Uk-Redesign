'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { inviteUserAction, updateUserRoleAction, deleteUserAction } from '@/lib/actions/admin';

interface UserRole {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'editor';
}

const mockUsers: UserRole[] = [
  {
    id: 'u-1',
    email: 'admin@openheavens.org.uk',
    full_name: 'Church Administrator',
    role: 'super_admin',
  },
  {
    id: 'u-2',
    email: 'media@openheavens.org.uk',
    full_name: 'Media & Communications Team',
    role: 'editor',
  },
  {
    id: 'u-3',
    email: 'safeguarding@openheavens.org.uk',
    full_name: 'Sarah Jenkins (Safeguarding Lead)',
    role: 'editor',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRole[]>(mockUsers);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<'super_admin' | 'editor'>('editor');
  const [loading, setLoading] = useState(false);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;
    setLoading(true);

    try {
      const res = await inviteUserAction(inviteEmail, inviteName, inviteRole);
      if (!res.success) {
        alert(res.error || 'Failed to invite user (Super admin privileges required).');
        setLoading(false);
        return;
      }

      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          email: inviteEmail,
          full_name: inviteName,
          role: inviteRole,
        },
      ]);
      setInviteEmail('');
      setInviteName('');
      alert(`Staff invitation recorded for ${inviteEmail} as ${inviteRole}.`);
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(id: string, newRole: 'super_admin' | 'editor') {
    const res = await updateUserRoleAction(id, newRole);
    if (res.success) {
      setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    } else {
      alert(res.error || 'Failed to update role. Super admin required.');
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Revoke access for this user?')) {
      const res = await deleteUserAction(id);
      if (res.success) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert(res.error || 'Failed to revoke access. Super admin required.');
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">User Roles &amp; Team Permissions</h2>
        <p className="text-xs text-muted-foreground">
          Manage editor and super_admin permissions. Strictly restricted to Super Administrators.
        </p>
      </div>

      {/* Invite Staff Form */}
      <form onSubmit={handleInvite} className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Invite Staff Member or Ministry Editor
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Full Name" name="name" required>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g. Samuel Ade"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Staff Email" name="email" required>
            <input
              id="email"
              type="email"
              required
              placeholder="samuel@openheavens.org.uk"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Assigned Role" name="role">
            <select
              id="role"
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            >
              <option value="editor">Editor (Can edit content &amp; events)</option>
              <option value="super_admin">Super Admin (Full administrative access)</option>
            </select>
          </FormField>
        </div>

        <div className="flex justify-end">
          <CTAButton type="submit" size="sm" variant="primary" disabled={loading}>
            {loading ? 'Inviting...' : 'Send Invitation'}
          </CTAButton>
        </div>
      </form>

      {/* Users Table */}
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Role</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">{u.full_name}</td>
                <td className="p-3 text-muted-foreground">{u.email}</td>
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                    className="px-2 py-1 text-xs border border-input rounded bg-background"
                  >
                    <option value="editor">Editor</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="p-1 hover:text-destructive text-muted-foreground"
                    title="Remove user"
                  >
                    <Trash2 className="h-3.5 w-3.5 inline" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
