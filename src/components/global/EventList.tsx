'use client';

import React, { useState } from 'react';
import { EventItem } from '@/types';
import { EventCard } from './EventCard';
import { EmptyState } from './EmptyState';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface EventListProps {
  events: EventItem[];
}

export function EventList({ events }: EventListProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  if (events.length === 0) {
    return (
      <EmptyState
        title="No upcoming events scheduled"
        description="Check back soon for upcoming conferences, services, and special gatherings."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Toggle View mode */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="text-sm text-muted-foreground">
          Showing {events.length} upcoming {events.length === 1 ? 'event' : 'events'}
        </span>
        <div className="inline-flex rounded-md border border-border p-1 bg-muted/40" role="group">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-xs font-medium rounded ${
              viewMode === 'list'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={viewMode === 'list'}
          >
            <List className="h-3.5 w-3.5 inline mr-1" aria-hidden="true" />
            List
          </button>
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1 text-xs font-medium rounded ${
              viewMode === 'calendar'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={viewMode === 'calendar'}
          >
            <CalendarIcon className="h-3.5 w-3.5 inline mr-1" aria-hidden="true" />
            Calendar View
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="border border-border rounded-lg divide-y divide-border bg-card">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="text-center p-2 rounded border border-border bg-muted/30 min-w-16">
                  <span className="block text-xs uppercase font-bold text-muted-foreground">
                    {new Date(event.date).toLocaleString('en-GB', { month: 'short' })}
                  </span>
                  <span className="block text-2xl font-extrabold text-foreground">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-foreground">
                    <Link href={`/events/${event.slug}`} className="hover:underline">
                      {event.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(event.date)} · {event.start_time} - {event.end_time} · {event.venue}
                  </p>
                </div>
              </div>
              <Link
                href={`/events/${event.slug}`}
                className="text-xs font-semibold text-foreground underline hover:opacity-80"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
