'use client';

import React, { useState } from 'react';
import { EventItem } from '@/types';
import { mockEvents } from '@/lib/data/mock-data';
import { Plus, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';
import { FormField } from '@/components/forms/FormField';
import { saveEventAction, deleteEventAction, autoArchivePastEventsAction } from '@/lib/actions/admin';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<EventItem>>({
    title: '',
    slug: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    start_time: '18:00',
    end_time: '20:00',
    venue: 'Main Auditorium, Edgware',
    image_url: '',
    image_alt: '',
    registration_url: '',
    online_link: '',
    status: 'draft',
    is_recurring: false,
  });
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setLoading(true);

    try {
      const res = await saveEventAction(currentEvent as any);
      if (!res.success) {
        setFormError(res.error || 'Failed to save event.');
        setLoading(false);
        return;
      }

      if (currentEvent.id) {
        setEvents(events.map((ev) => (ev.id === currentEvent.id ? ({ ...ev, ...currentEvent } as EventItem) : ev)));
      } else {
        const newEvent: EventItem = {
          ...currentEvent,
          id: Date.now().toString(),
          slug: currentEvent.slug || currentEvent.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        } as EventItem;
        setEvents([newEvent, ...events]);
      }
      setIsEditing(false);
    } catch (err: any) {
      setFormError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      const res = await deleteEventAction(id);
      if (res.success) {
        setEvents(events.filter((e) => e.id !== id));
      } else {
        alert(res.error || 'Unable to delete event.');
      }
    }
  }

  async function handleAutoArchivePast() {
    const res = await autoArchivePastEventsAction();
    if (res.success) {
      const today = new Date().toISOString().split('T')[0];
      const updated = events.map((ev) => {
        if (ev.date < today && ev.status === 'published') {
          return { ...ev, status: 'archived' as const };
        }
        return ev;
      });
      setEvents(updated);
      alert('Past events have been automatically moved to Archived status in database.');
    } else {
      alert(res.error || 'Failed to auto-archive.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Events Management</h2>
          <p className="text-xs text-muted-foreground">
            Create, edit, and auto-archive events with server validation and audit trail logging.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CTAButton size="sm" variant="outline" onClick={handleAutoArchivePast}>
            Auto-Archive Past Events
          </CTAButton>
          <CTAButton
            size="sm"
            variant="primary"
            onClick={() => {
              setCurrentEvent({
                title: '',
                slug: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                start_time: '18:00',
                end_time: '20:00',
                venue: 'Main Auditorium, Edgware',
                image_url: '',
                image_alt: 'Event banner description',
                registration_url: '',
                online_link: '',
                status: 'draft',
                is_recurring: false,
              });
              setIsEditing(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" aria-hidden="true" /> Add Event
          </CTAButton>
        </div>
      </div>

      {isEditing && (
        <div className="border border-border rounded-lg p-6 bg-card shadow-sm space-y-4">
          <h3 className="text-base font-bold text-foreground">
            {currentEvent.id ? 'Edit Event' : 'New Event'}
          </h3>

          {formError && (
            <div className="p-3 rounded text-xs bg-destructive/10 text-destructive flex items-center gap-2" role="alert">
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Event Title" name="title" required>
                <input
                  id="title"
                  type="text"
                  required
                  value={currentEvent.title || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="URL Slug (Optional)" name="slug">
                <input
                  id="slug"
                  type="text"
                  placeholder="auto-generated-from-title"
                  value={currentEvent.slug || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, slug: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Date" name="date" required>
                <input
                  id="date"
                  type="date"
                  required
                  value={currentEvent.date || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="Start Time" name="start_time" required>
                <input
                  id="start_time"
                  type="text"
                  placeholder="10:30"
                  required
                  value={currentEvent.start_time || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, start_time: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="End Time" name="end_time" required>
                <input
                  id="end_time"
                  type="text"
                  placeholder="12:30"
                  required
                  value={currentEvent.end_time || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, end_time: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>
            </div>

            <FormField label="Venue Location" name="venue" required>
              <input
                id="venue"
                type="text"
                required
                value={currentEvent.venue || ''}
                onChange={(e) => setCurrentEvent({ ...currentEvent, venue: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <FormField label="Description (Real text, no baked-in image text)" name="description" required>
              <textarea
                id="description"
                rows={3}
                required
                value={currentEvent.description || ''}
                onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Image URL (Optional)" name="image_url">
                <input
                  id="image_url"
                  type="text"
                  placeholder="/placeholder-event.svg"
                  value={currentEvent.image_url || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, image_url: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="Image Alt Text (Required for accessibility)" name="image_alt" required>
                <input
                  id="image_alt"
                  type="text"
                  required
                  placeholder="Descriptive text for screen readers"
                  value={currentEvent.image_alt || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, image_alt: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Registration URL (Optional)" name="registration_url">
                <input
                  id="registration_url"
                  type="url"
                  placeholder="https://..."
                  value={currentEvent.registration_url || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, registration_url: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="Online Meeting Link (Shown only when set)" name="online_link">
                <input
                  id="online_link"
                  type="url"
                  placeholder="https://..."
                  value={currentEvent.online_link || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, online_link: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                />
              </FormField>

              <FormField label="Publication Status" name="status">
                <select
                  id="status"
                  value={currentEvent.status || 'draft'}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-input rounded bg-background"
                >
                  <option value="draft">Draft (Hidden from Public)</option>
                  <option value="published">Published (Visible on site)</option>
                  <option value="archived">Archived (Hidden)</option>
                </select>
              </FormField>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <CTAButton type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </CTAButton>
              <CTAButton type="submit" variant="primary" size="sm" disabled={loading}>
                {loading ? 'Saving...' : 'Save Event'}
              </CTAButton>
            </div>
          </form>
        </div>
      )}

      {/* Events Table */}
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground">
            <tr>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Date &amp; Time</th>
              <th className="p-3 font-semibold">Venue</th>
              <th className="p-3 font-semibold">Alt Text</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((ev) => (
              <tr key={ev.id} className="hover:bg-muted/20">
                <td className="p-3 font-medium text-foreground">{ev.title}</td>
                <td className="p-3 text-muted-foreground">
                  {ev.date} · {ev.start_time}-{ev.end_time}
                </td>
                <td className="p-3 text-muted-foreground">{ev.venue}</td>
                <td className="p-3 text-muted-foreground truncate max-w-xs">{ev.image_alt || '—'}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      ev.status === 'published'
                        ? 'bg-admin-teal-surface text-admin-teal'
                        : ev.status === 'archived'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-warning-surface text-warning'
                    }`}
                  >
                    {ev.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      setCurrentEvent(ev);
                      setIsEditing(true);
                    }}
                    className="p-1 hover:text-foreground text-muted-foreground"
                    title="Edit event"
                  >
                    <Edit className="h-3.5 w-3.5 inline" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
                    className="p-1 hover:text-destructive text-muted-foreground"
                    title="Delete event"
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
