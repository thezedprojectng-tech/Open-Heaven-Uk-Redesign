'use client';

import React, { useState } from 'react';
import { Ministry } from '@/types';
import { mockMinistries } from '@/lib/data/mock-data';
import { Plus, Trash2, Edit } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { saveMinistryAction, deleteMinistryAction } from '@/lib/actions/admin';

export default function AdminMinistriesPage() {
  const [ministries, setMinistries] = useState<Ministry[]>(mockMinistries);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<Partial<Ministry>>({
    name: '',
    slug: '',
    description: '',
    times: '',
    location: '',
    leader_name: '',
    contact_email: '',
    is_active: true,
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!current.name || !current.description) return;
    setLoading(true);

    try {
      const res = await saveMinistryAction(current as any);
      if (!res.success) {
        alert(res.error || 'Failed to save ministry');
        setLoading(false);
        return;
      }

      if (current.id) {
        setMinistries(ministries.map((m) => (m.id === current.id ? ({ ...m, ...current } as Ministry) : m)));
      } else {
        const newM: Ministry = {
          ...current,
          id: Date.now().toString(),
          slug: current.slug || current.name!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          image_url: '',
          image_alt: `${current.name} group at church`,
          is_active: current.is_active ?? true,
          display_order: ministries.length + 1,
        } as Ministry;
        setMinistries([...ministries, newM]);
      }
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this ministry?')) {
      const res = await deleteMinistryAction(id);
      if (res.success) {
        setMinistries(ministries.filter((m) => m.id !== id));
      } else {
        alert(res.error || 'Failed to delete ministry');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Ministries Management</h2>
          <p className="text-xs text-muted-foreground">
            Manage church ministries with server persistence, Zod validation, and audit tracking.
          </p>
        </div>
        <CTAButton
          size="sm"
          variant="primary"
          onClick={() => {
            setCurrent({
              name: '',
              slug: '',
              description: '',
              times: '',
              location: 'Church Auditorium, Edgware',
              leader_name: '',
              contact_email: '',
              is_active: true,
            });
            setIsEditing(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" aria-hidden="true" /> Add Ministry
        </CTAButton>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-foreground">
            {current.id ? 'Edit Ministry' : 'New Ministry'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Ministry Name" name="name" required>
              <input
                id="name"
                type="text"
                required
                value={current.name || ''}
                onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="URL Slug" name="slug">
              <input
                id="slug"
                type="text"
                value={current.slug || ''}
                onChange={(e) => setCurrent({ ...current, slug: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <FormField label="Description" name="description" required>
            <textarea
              id="description"
              rows={3}
              required
              value={current.description || ''}
              onChange={(e) => setCurrent({ ...current, description: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Meeting Times" name="times" required>
              <input
                id="times"
                type="text"
                required
                placeholder="e.g. Saturdays at 10:00 AM"
                value={current.times || ''}
                onChange={(e) => setCurrent({ ...current, times: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Location / Venue" name="location" required>
              <input
                id="location"
                type="text"
                required
                placeholder="Church Fellowship Hall"
                value={current.location || ''}
                onChange={(e) => setCurrent({ ...current, location: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Leader Name" name="leader_name">
              <input
                id="leader_name"
                type="text"
                value={current.leader_name || ''}
                onChange={(e) => setCurrent({ ...current, leader_name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Contact Email" name="contact_email">
              <input
                id="contact_email"
                type="email"
                value={current.contact_email || ''}
                onChange={(e) => setCurrent({ ...current, contact_email: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <CTAButton type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </CTAButton>
            <CTAButton type="submit" variant="primary" size="sm" disabled={loading}>
              {loading ? 'Saving...' : 'Save Ministry'}
            </CTAButton>
          </div>
        </form>
      )}

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Meeting Schedule</th>
              <th className="p-3 font-semibold">Location</th>
              <th className="p-3 font-semibold">Leader</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ministries.map((m) => (
              <tr key={m.id} className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">{m.name}</td>
                <td className="p-3 text-muted-foreground">{m.times}</td>
                <td className="p-3 text-muted-foreground">{m.location}</td>
                <td className="p-3 text-muted-foreground">{m.leader_name || '—'}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setCurrent(m);
                      setIsEditing(true);
                    }}
                    className="p-1 hover:text-foreground text-muted-foreground"
                  >
                    <Edit className="h-3.5 w-3.5 inline" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
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
