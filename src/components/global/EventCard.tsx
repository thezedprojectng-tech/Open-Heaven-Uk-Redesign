import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { EventItem } from '@/types';
import { formatDate } from '@/lib/utils';
import { CTAButton } from '@/components/ui/CTAButton';

interface EventCardProps {
  event: EventItem;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="border border-border rounded-lg p-6 bg-card text-card-foreground flex flex-col justify-between hover:border-foreground/30 transition-colors">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {event.start_time} - {event.end_time}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground">
          <Link href={`/events/${event.slug}`} className="hover:underline">
            {event.title}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {event.description}
        </p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{event.venue}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <Link
          href={`/events/${event.slug}`}
          className="text-xs font-medium text-foreground hover:underline"
        >
          Event details →
        </Link>
        {event.registration_url && (
          <CTAButton href={event.registration_url} size="sm" variant="outline">
            Register
          </CTAButton>
        )}
      </div>
    </article>
  );
}
