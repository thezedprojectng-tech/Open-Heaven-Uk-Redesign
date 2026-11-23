'use client';

import React from 'react';
import Link from 'next/link';
import { EventItem } from '@/types';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

interface EventsShowcaseSectionProps {
  events: EventItem[];
}

export function EventsShowcaseSection({ events }: EventsShowcaseSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const featured = events[0];

  const defaultList = [
    {
      date: 'November 18',
      title: 'Prayer Night',
      category: 'PRAYER',
      time: '7:00 PM',
      venue: 'The Chapel',
      slug: 'prayer-night',
    },
    {
      date: 'November 20',
      title: 'Youth Gathering',
      category: 'YOUTH',
      time: '7:00 PM',
      venue: 'Student Center',
      slug: 'youth-gathering',
    },
    {
      date: 'December 5',
      title: 'Volunteer Day',
      category: 'SERVING',
      time: '9:00 AM',
      venue: 'Community Food Pantry',
      slug: 'volunteer-day',
    },
    {
      date: 'December 24',
      title: 'Christmas Eve Worship',
      category: 'WORSHIP',
      time: '5:00 PM',
      venue: 'Sanctuary',
      slug: 'christmas-eve-worship',
    },
  ];

  function formatDisplayDate(dateStr: string) {
    if (!dateStr) return 'November 18';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <section className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0]" aria-labelledby="events-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-black">
          <div className="space-y-2">
            <span className="px-3.5 py-1 bg-[#FF2E93] text-white border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
              ★ Events
            </span>
            <h2
              id="events-heading"
              className="font-display font-black text-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight"
            >
              Upcoming events
            </h2>
          </div>

          <CTAButton href="/events" variant="primary" size="sm" showArrow>
            View All Events
          </CTAButton>
        </div>

        {/* Featured Event Card: Vivid Hot Pink (SpaceFM Style) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="border-2 border-black rounded-2xl bg-[#FF2E93] text-white p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image with 2px border */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] border-2 border-black rounded-xl overflow-hidden bg-white group">
                <SafeImage
                  src={featured?.image_url || '/community-dinner.jpg'}
                  alt={featured?.image_alt || 'Community dinner feast table'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-black text-white font-mono text-xs font-black uppercase rounded-lg">
                  Featured Event
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {featured?.title || 'Community Dinner'}
              </h3>

              {/* Event Ledger Info */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold text-black">
                <div className="p-3 bg-white border-2 border-black rounded-xl">
                  <span className="text-[10px] text-neutral-500 uppercase block font-bold">DATE</span>
                  <p className="text-black text-sm font-black">
                    {featured?.date ? formatDisplayDate(featured.date) : 'Nov 14, 2026'}
                  </p>
                </div>
                <div className="p-3 bg-white border-2 border-black rounded-xl">
                  <span className="text-[10px] text-neutral-500 uppercase block font-bold">TIME &amp; VENUE</span>
                  <p className="text-black text-xs font-black truncate">
                    {featured?.start_time || '6:30 PM'} • {featured?.venue || 'Main Hall'}
                  </p>
                </div>
              </div>

              <p className="font-body text-sm text-white/90 leading-relaxed font-medium">
                {featured?.description ||
                  'Bring a dish if you can, or just bring yourself. Long tables, good food, and plenty of room for people who are new.'}
              </p>

              <div className="pt-2">
                <CTAButton
                  href={featured ? `/events/${featured.slug}` : '/events'}
                  variant="primary"
                  size="md"
                  showArrow
                >
                  Save Your Seat
                </CTAButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regulated Ticket Docket Rows (No Shadows) */}
        <div className="space-y-3">
          {(events.length > 1 ? events.slice(1, 5) : defaultList).map((evt, idx) => {
            const isCustom = 'category' in evt;
            const dateText = isCustom ? (evt as any).date : formatDisplayDate(evt.date);
            const titleText = evt.title;
            const categoryText = isCustom ? (evt as any).category : 'GATHER';
            const timeText = isCustom ? (evt as any).time : evt.start_time;
            const venueText = evt.venue;
            const slug = evt.slug;

            const dateColors = ['bg-[#FFC700]', 'bg-[#00D2FF]', 'bg-[#16D958]', 'bg-[#FF2E93] text-white'];

            return (
              <motion.div
                key={slug || idx}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <Link
                  href={`/events/${slug}`}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white border-2 border-black rounded-xl transition-all text-black hover:border-black"
                >
                  {/* Left: Date Block + Title */}
                  <div className="flex items-center gap-4">
                    <div className={`px-3.5 py-2.5 ${dateColors[idx % 4]} text-black border-2 border-black rounded-xl text-center min-w-[95px] shrink-0`}>
                      <span className="font-mono text-xs sm:text-sm font-black uppercase block leading-tight">
                        {dateText}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#FAF7F0] border border-black rounded-md font-mono text-[10px] font-black uppercase text-black">
                          {categoryText}
                        </span>
                      </div>
                      <h4 className="font-display text-base sm:text-lg font-black text-black uppercase tracking-tight group-hover:text-[#FF2E93] transition-colors">
                        {titleText}
                      </h4>
                    </div>
                  </div>

                  {/* Right: Time, Venue & Action Button */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 font-mono text-xs font-bold pt-2 sm:pt-0 border-t sm:border-t-0 border-black/10">
                    <div className="text-left sm:text-right">
                      <p className="text-black font-bold">{timeText}</p>
                      <p className="text-neutral-500 text-[11px] font-bold truncate max-w-[140px]">{venueText}</p>
                    </div>

                    <div className="px-4 py-2 bg-black text-white rounded-lg font-mono text-xs font-black uppercase group-hover:bg-[#FFC700] group-hover:text-black transition-colors flex items-center gap-1">
                      <span>RSVP</span>
                      <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
