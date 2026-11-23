'use client';

import React from 'react';
import Link from 'next/link';
import { EventItem } from '@/types';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EmptyState } from '@/components/global/EmptyState';

interface UpcomingEventsIndexProps {
  events: EventItem[];
}

export function UpcomingEventsIndex({ events }: UpcomingEventsIndexProps) {
  const shouldReduceMotion = useReducedMotion();

  function formatDate(dateStr: string) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).toUpperCase();
    } catch {
      return dateStr;
    }
  }

  return (
    <section
      className="w-full bg-ink text-paper py-16 sm:py-20 lg:py-24 border-t border-b border-paper/10"
      aria-labelledby="events-index-heading"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-paper/15 mb-4">
          <div className="space-y-2">
            <span className="font-mono-meta text-[11px] text-paper/60 block">
              003 / CALENDAR &amp; GATHERINGS
            </span>
            <h2
              id="events-index-heading"
              className="font-display font-medium text-paper text-[clamp(2.5rem,5vw,4rem)] leading-[1.0] tracking-tight"
            >
              Upcoming <em className="italic font-normal text-accent">gatherings</em>
            </h2>
          </div>
          <p className="font-mono-meta text-xs text-paper/60 max-w-xs">
            Mark your calendar for special services, conferences, and community projects.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="py-12">
            <EmptyState
              title="No upcoming events scheduled"
              description="Check back soon for upcoming gatherings and seasonal announcements."
            />
          </div>
        ) : (
          <div className="divide-y divide-paper/15">
            {events.map((event, index) => {
              const formattedDate = formatDate(event.date);
              const timeDisplay = event.start_time
                ? `${event.start_time}${event.end_time ? ` to ${event.end_time}` : ''}`
                : 'See details';

              return (
                <motion.div
                  key={event.id}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.03,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  <Link
                    href={`/events/${event.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-6 sm:py-7 items-baseline hover:bg-paper/[0.04] px-3 sm:px-4 -mx-3 sm:-mx-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    {/* Column 1: Date in mono (3 cols) */}
                    <div className="md:col-span-3">
                      <span className="font-mono-meta text-xs sm:text-sm text-paper/80 font-medium">
                        {formattedDate}
                      </span>
                    </div>

                    {/* Column 2: Title in Fraunces 22px (6 cols) */}
                    <div className="md:col-span-6 flex items-baseline gap-2">
                      <h3 className="font-display text-[22px] text-paper font-medium group-hover:text-accent transition-colors leading-snug">
                        {event.title}
                      </h3>
                      <ArrowRight
                        className="h-4 w-4 text-paper/40 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 self-center"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Column 3: Venue and time in body (3 cols) */}
                    <div className="md:col-span-3 text-xs sm:text-sm font-body text-paper/70 flex flex-col md:text-right">
                      <span>{event.venue}</span>
                      <span className="font-mono text-xs text-paper/50 mt-0.5">{timeDisplay}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* All events link beneath with arrow circle */}
        <div className="pt-10 flex justify-end">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 font-mono-meta text-xs text-paper hover:text-accent transition-colors py-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <span className="uppercase tracking-wider">Browse complete event archive</span>
            <span className="w-7 h-7 rounded-full border border-paper/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent transition-all">
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
