'use client';

import React, { useState } from 'react';
import { Sermon } from '@/types';
import { mockSermons } from '@/lib/data/mock-data';
import { Plus, Trash2, Edit } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { saveSermonAction, deleteSermonAction } from '@/lib/actions/admin';

export default function AdminSermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>(mockSermons);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<Partial<Sermon>>({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0],
    speaker: 'Pastor John Adebayo',
    youtube_url: '',
    audio_url: '',
    notes: '',
    is_featured: false,
    status: 'published',
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!current.title || !current.youtube_url) return;
    setLoading(true);

    try {
      const res = await saveSermonAction(current as any);
      if (!res.success) {
        alert(res.error || 'Failed to save sermon.');
        setLoading(false);
        return;
      }

      if (current.id) {
        setSermons(sermons.map((s) => (s.id === current.id ? ({ ...s, ...current } as Sermon) : s)));
      } else {
        const newS: Sermon = {
          ...current,
          id: Date.now().toString(),
          slug: current.slug || current.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          status: current.status || 'published',
          is_featured: current.is_featured || false,
        } as Sermon;
        setSermons([newS, ...sermons]);
      }
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this sermon record?')) {
      const res = await deleteSermonAction(id);
      if (res.success) {
        setSermons(sermons.filter((s) => s.id !== id));
      } else {
        alert(res.error || 'Failed to delete sermon.');
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Sermons &amp; Media Management</h2>
          <p className="text-xs text-muted-foreground">
            Add YouTube live broadcasts, sermon audio links, speaker names, and study notes.
          </p>
        </div>
        <CTAButton
          size="sm"
          variant="primary"
          onClick={() => {
            setCurrent({
              title: '',
              slug: '',
              date: new Date().toISOString().split('T')[0],
              speaker: 'Pastor John Adebayo',
              youtube_url: '',
              audio_url: '',
              notes: '',
              is_featured: false,
              status: 'published',
            });
            setIsEditing(true);
          }}
        >
          <Plus className="h-4 w-4 mr-1" aria-hidden="true" /> Add Sermon
        </CTAButton>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-foreground">
            {current.id ? 'Edit Sermon' : 'New Sermon'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Sermon Title" name="title" required>
              <input
                id="title"
                type="text"
                required
                value={current.title || ''}
                onChange={(e) => setCurrent({ ...current, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Speaker" name="speaker" required>
              <input
                id="speaker"
                type="text"
                required
                value={current.speaker || ''}
                onChange={(e) => setCurrent({ ...current, speaker: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Sermon Date" name="date" required>
              <input
                id="date"
                type="date"
                required
                value={current.date || ''}
                onChange={(e) => setCurrent({ ...current, date: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="YouTube URL" name="youtube_url" required>
              <input
                id="youtube_url"
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={current.youtube_url || ''}
                onChange={(e) => setCurrent({ ...current, youtube_url: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>
          </div>

          <FormField label="Audio MP3 URL (Optional)" name="audio_url">
            <input
              id="audio_url"
              type="url"
              placeholder="https://..."
              value={current.audio_url || ''}
              onChange={(e) => setCurrent({ ...current, audio_url: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <FormField label="Scriptures &amp; Sermon Notes" name="notes">
            <textarea
              id="notes"
              rows={3}
              value={current.notes || ''}
              onChange={(e) => setCurrent({ ...current, notes: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
            />
          </FormField>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={current.is_featured || false}
              onChange={(e) => setCurrent({ ...current, is_featured: e.target.checked })}
              className="h-4 w-4 rounded border-border"
            />
            <label htmlFor="is_featured" className="text-xs font-semibold text-foreground">
              Feature as latest service on Homepage and Watch page
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <CTAButton type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </CTAButton>
            <CTAButton type="submit" variant="primary" size="sm" disabled={loading}>
              {loading ? 'Saving...' : 'Save Sermon'}
            </CTAButton>
          </div>
        </form>
      )}

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Speaker</th>
              <th className="p-3 font-semibold">Featured</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sermons.map((s) => (
              <tr key={s.id} className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">{s.title}</td>
                <td className="p-3 text-muted-foreground">{s.date}</td>
                <td className="p-3 text-muted-foreground">{s.speaker}</td>
                <td className="p-3">
                  {s.is_featured && (
                    <span className="px-2 py-0.5 rounded bg-warning-surface text-warning font-semibold uppercase text-[10px]">
                      Featured
                    </span>
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setCurrent(s);
                      setIsEditing(true);
                    }}
                    className="p-1 hover:text-foreground text-muted-foreground"
                  >
                    <Edit className="h-3.5 w-3.5 inline" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
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
