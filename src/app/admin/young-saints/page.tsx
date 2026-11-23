'use client';

import React, { useState } from 'react';
import { YoungSaintsClass } from '@/types';
import { mockYoungSaintsClasses } from '@/lib/data/mock-data';
import { Plus, Trash2, Edit, Shield } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import {
  saveYoungSaintsClassAction,
  deleteYoungSaintsClassAction,
  updateSafeguardingLeadAction,
} from '@/lib/actions/admin';

export default function AdminYoungSaintsPage() {
  const [classes, setClasses] = useState<YoungSaintsClass[]>(mockYoungSaintsClasses);
  const [dslName, setDslName] = useState('Sarah Jenkins');
  const [dslEmail, setDslEmail] = useState('safeguarding@openheavens.org.uk');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<Partial<YoungSaintsClass>>({
    name: '',
    age_range: '',
    time: '10:45 - 12:30',
    room: '',
    leader_name: '',
    description: '',
  });

  async function handleSaveClass(e: React.FormEvent) {
    e.preventDefault();
    if (!current.name || !current.age_range || !current.room) return;
    setLoading(true);

    try {
      const res = await saveYoungSaintsClassAction(current as any);
      if (!res.success) {
        alert(res.error || 'Failed to save class.');
        setLoading(false);
        return;
      }

      if (current.id) {
        setClasses(classes.map((c) => (c.id === current.id ? ({ ...c, ...current } as YoungSaintsClass) : c)));
      } else {
        const newC: YoungSaintsClass = {
          ...current,
          id: Date.now().toString(),
          display_order: classes.length + 1,
        } as YoungSaintsClass;
        setClasses([...classes, newC]);
      }
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this class?')) {
      const res = await deleteYoungSaintsClassAction(id);
      if (res.success) {
        setClasses(classes.filter((c) => c.id !== id));
      } else {
        alert(res.error || 'Failed to delete class.');
      }
    }
  }

  async function handleUpdateLead() {
    const res = await updateSafeguardingLeadAction(dslName, dslEmail);
    if (res.success) {
      alert('Safeguarding Lead details updated and logged to audit trail.');
    } else {
      alert(res.error || 'Failed to update safeguarding lead.');
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">Young Saints Management</h2>
        <p className="text-xs text-muted-foreground">
          Configure Sunday school classes, age ranges, teacher assignments, and safeguarding officer details.
        </p>
      </div>

      {/* Safeguarding Lead Settings Card */}
      <div className="border border-border rounded-lg p-6 bg-card space-y-4">
        <div className="flex items-center gap-2 font-bold text-foreground text-sm">
          <Shield className="h-4 w-4" aria-hidden="true" />
          <h3>Designated Safeguarding Lead (DSL) Configuration</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Named Safeguarding Officer" name="dslName">
            <input
              id="dslName"
              type="text"
              value={dslName}
              onChange={(e) => setDslName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Safeguarding Officer Email" name="dslEmail">
            <input
              id="dslEmail"
              type="email"
              value={dslEmail}
              onChange={(e) => setDslEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>
        </div>

        <div className="flex justify-end">
          <CTAButton size="sm" variant="outline" onClick={handleUpdateLead}>
            Update Safeguarding Lead
          </CTAButton>
        </div>
      </div>

      {/* Classes list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">Sunday School Classes</h3>
          <CTAButton
            size="sm"
            variant="primary"
            onClick={() => {
              setCurrent({
                name: '',
                age_range: '',
                time: '10:45 - 12:30',
                room: '',
                leader_name: '',
                description: '',
              });
              setIsEditing(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" aria-hidden="true" /> Add Class
          </CTAButton>
        </div>

        {isEditing && (
          <form onSubmit={handleSaveClass} className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground">
              {current.id ? 'Edit Class' : 'New Class'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Class Name" name="name" required>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Kingdom Sparks"
                  value={current.name || ''}
                  onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="Age Range" name="age_range" required>
                <input
                  id="age_range"
                  type="text"
                  required
                  placeholder="e.g. 3 - 5 years"
                  value={current.age_range || ''}
                  onChange={(e) => setCurrent({ ...current, age_range: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Classroom / Location" name="room" required>
                <input
                  id="room"
                  type="text"
                  required
                  placeholder="Room 102 (Lower Hall)"
                  value={current.room || ''}
                  onChange={(e) => setCurrent({ ...current, room: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="Lead Teacher" name="leader_name" required>
                <input
                  id="leader_name"
                  type="text"
                  required
                  value={current.leader_name || ''}
                  onChange={(e) => setCurrent({ ...current, leader_name: e.target.value })}
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
                {loading ? 'Saving...' : 'Save Class'}
              </CTAButton>
            </div>
          </form>
        )}

        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border text-muted-foreground">
              <tr>
                <th className="p-3 font-semibold">Class Name</th>
                <th className="p-3 font-semibold">Age Range</th>
                <th className="p-3 font-semibold">Time &amp; Room</th>
                <th className="p-3 font-semibold">Lead Teacher</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classes.map((c) => (
                <tr key={c.id} className="hover:bg-muted/20">
                  <td className="p-3 font-medium text-foreground">{c.name}</td>
                  <td className="p-3 text-muted-foreground">{c.age_range}</td>
                  <td className="p-3 text-muted-foreground">
                    {c.time} · {c.room}
                  </td>
                  <td className="p-3 text-muted-foreground">{c.leader_name}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setCurrent(c);
                        setIsEditing(true);
                      }}
                      className="p-1 hover:text-foreground text-muted-foreground"
                    >
                      <Edit className="h-3.5 w-3.5 inline" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
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
    </div>
  );
}
