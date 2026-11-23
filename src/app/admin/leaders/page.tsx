'use client';

import React, { useState } from 'react';
import { Leader } from '@/types';
import { mockLeaders } from '@/lib/data/mock-data';
import { Plus, Trash2, Edit } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { saveLeaderAction, deleteLeaderAction } from '@/lib/actions/admin';

export default function AdminLeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>(mockLeaders);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<Partial<Leader>>({
    name: '',
    role: '',
    bio: '',
    photo_url: '',
    photo_alt: 'Portrait of leader',
    is_active: true,
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!current.name || !current.role || !current.bio) return;
    setLoading(true);

    try {
      const res = await saveLeaderAction(current as any);
      if (!res.success) {
        alert(res.error || 'Failed to save leader.');
        setLoading(false);
        return;
      }

      if (current.id) {
        setLeaders(leaders.map((l) => (l.id === current.id ? ({ ...l, ...current } as Leader) : l)));
      } else {
        const newL: Leader = {
          ...current,
          id: Date.now().toString(),
          display_order: leaders.length + 1,
          is_active: true,
        } as Leader;
        setLeaders([...leaders, newL]);
      }
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this leader profile?')) {
      const res = await deleteLeaderAction(id);
      if (res.success) {
        setLeaders(leaders.filter((l) => l.id !== id));
      } else {
        alert(res.error || 'Failed to delete leader.');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Pastoral Team &amp; Leaders</h2>
          <p className="text-xs text-muted-foreground">
            Manage leader profiles, bios, photos, and display ordering.
          </p>
        </div>
        <CTAButton
          size="sm"
          variant="primary"
          onClick={() => {
            setCurrent({
              name: '',
              role: '',
              bio: '',
              photo_url: '',
              photo_alt: 'Portrait of leader',
              is_active: true,
            });
            setIsEditing(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" aria-hidden="true" /> Add Leader
        </CTAButton>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-foreground">
            {current.id ? 'Edit Leader' : 'New Leader'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Full Name" name="name" required>
              <input
                id="name"
                type="text"
                required
                value={current.name || ''}
                onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Ministry Role / Title" name="role" required>
              <input
                id="role"
                type="text"
                required
                placeholder="Senior Pastor, Associate Pastor, etc."
                value={current.role || ''}
                onChange={(e) => setCurrent({ ...current, role: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <FormField label="Biography" name="bio" required>
            <textarea
              id="bio"
              rows={3}
              required
              value={current.bio || ''}
              onChange={(e) => setCurrent({ ...current, bio: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Photo URL (Optional)" name="photo_url">
              <input
                id="photo_url"
                type="text"
                placeholder="/placeholder-leader.svg"
                value={current.photo_url || ''}
                onChange={(e) => setCurrent({ ...current, photo_url: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Photo Alt Text" name="photo_alt" required>
              <input
                id="photo_alt"
                type="text"
                required
                value={current.photo_alt || ''}
                onChange={(e) => setCurrent({ ...current, photo_alt: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <CTAButton type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </CTAButton>
            <CTAButton type="submit" variant="primary" size="sm" disabled={loading}>
              {loading ? 'Saving...' : 'Save Leader'}
            </CTAButton>
          </div>
        </form>
      )}

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Role</th>
              <th className="p-3 font-semibold">Bio Preview</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y border-border">
            {leaders.map((leader) => (
              <tr key={leader.id} className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">{leader.name}</td>
                <td className="p-3 text-muted-foreground">{leader.role}</td>
                <td className="p-3 text-muted-foreground line-clamp-1 max-w-sm">{leader.bio}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setCurrent(leader);
                      setIsEditing(true);
                    }}
                    className="p-1 hover:text-foreground text-muted-foreground"
                  >
                    <Edit className="h-3.5 w-3.5 inline" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(leader.id)}
                    className="p-1 hover:text-destructive text-muted-foreground"
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
