'use client';

import React, { useState } from 'react';
import { HomeGroup } from '@/types';
import { mockHomeGroups } from '@/lib/data/mock-data';
import { Plus, Trash2, Edit } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { saveHomeGroupAction, deleteHomeGroupAction } from '@/lib/actions/admin';

export default function AdminHomeGroupsPage() {
  const [groups, setGroups] = useState<HomeGroup[]>(mockHomeGroups);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<Partial<HomeGroup>>({
    name: '',
    area: '',
    day_of_week: 'Tuesday',
    meeting_time: '19:30',
    leader_name: '',
    leader_email: 'edgware-group@openheavens.org.uk',
    virtual_instructions: '',
    is_active: true,
    description: '',
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!current.name || !current.area || !current.leader_name || !current.leader_email) return;
    setLoading(true);

    try {
      const res = await saveHomeGroupAction(current as any);
      if (!res.success) {
        alert(res.error || 'Failed to save home group.');
        setLoading(false);
        return;
      }

      if (current.id) {
        setGroups(groups.map((g) => (g.id === current.id ? ({ ...g, ...current } as HomeGroup) : g)));
      } else {
        const newG: HomeGroup = {
          ...current,
          id: Date.now().toString(),
          is_active: current.is_active ?? true,
        } as HomeGroup;
        setGroups([...groups, newG]);
      }
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this home group?')) {
      const res = await deleteHomeGroupAction(id);
      if (res.success) {
        setGroups(groups.filter((g) => g.id !== id));
      } else {
        alert(res.error || 'Failed to delete home group');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Home Groups Management</h2>
          <p className="text-xs text-muted-foreground">
            Manage cell groups by area (Edgware, Stanmore, Mill Hill, etc.). Street addresses are
            strictly disallowed.
          </p>
        </div>
        <CTAButton
          size="sm"
          variant="primary"
          onClick={() => {
            setCurrent({
              name: '',
              area: '',
              day_of_week: 'Tuesday',
              meeting_time: '19:30',
              leader_name: '',
              leader_email: 'leader@openheavens.org.uk',
              virtual_instructions: 'Contact leader for details.',
              is_active: true,
              description: '',
            });
            setIsEditing(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" aria-hidden="true" /> Add Group
        </CTAButton>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-foreground">
            {current.id ? 'Edit Home Group' : 'New Home Group'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Group Name" name="name" required>
              <input
                id="name"
                type="text"
                required
                value={current.name || ''}
                onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="General Area (No street address permitted)" name="area" required>
              <input
                id="area"
                type="text"
                required
                placeholder="e.g. Stanmore / Canons Park"
                value={current.area || ''}
                onChange={(e) => setCurrent({ ...current, area: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Day of Week" name="day_of_week" required>
              <select
                id="day_of_week"
                value={current.day_of_week || 'Tuesday'}
                onChange={(e) => setCurrent({ ...current, day_of_week: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </FormField>

            <FormField label="Meeting Time" name="meeting_time" required>
              <input
                id="meeting_time"
                type="text"
                placeholder="19:30"
                value={current.meeting_time || ''}
                onChange={(e) => setCurrent({ ...current, meeting_time: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Leader Name(s)" name="leader_name" required>
              <input
                id="leader_name"
                type="text"
                required
                value={current.leader_name || ''}
                onChange={(e) => setCurrent({ ...current, leader_name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Leader Email (Routing only)" name="leader_email" required>
              <input
                id="leader_email"
                type="email"
                required
                value={current.leader_email || ''}
                onChange={(e) => setCurrent({ ...current, leader_email: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <FormField label="Description" name="description">
            <textarea
              id="description"
              rows={2}
              value={current.description || ''}
              onChange={(e) => setCurrent({ ...current, description: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <CTAButton type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </CTAButton>
            <CTAButton type="submit" variant="primary" size="sm" disabled={loading}>
              {loading ? 'Saving...' : 'Save Group'}
            </CTAButton>
          </div>
        </form>
      )}

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Area</th>
              <th className="p-3 font-semibold">Group Name</th>
              <th className="p-3 font-semibold">Schedule</th>
              <th className="p-3 font-semibold">Leader</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {groups.map((g) => (
              <tr key={g.id} className="hover:bg-muted/20">
                <td className="p-3 font-semibold text-foreground">{g.area}</td>
                <td className="p-3 text-foreground">{g.name}</td>
                <td className="p-3 text-muted-foreground">
                  {g.day_of_week}s at {g.meeting_time}
                </td>
                <td className="p-3 text-muted-foreground">{g.leader_name}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setCurrent(g);
                      setIsEditing(true);
                    }}
                    className="p-1 hover:text-foreground text-muted-foreground"
                  >
                    <Edit className="h-3.5 w-3.5 inline" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
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
