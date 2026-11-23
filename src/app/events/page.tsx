import { Metadata } from 'next';
import { getUpcomingEvents } from '@/lib/data/db';
import { EventsHero } from '@/components/events/EventsHero';
import { EventsShowcaseSection } from '@/components/home/EventsShowcaseSection';
import { ComeAsYouAreBanner } from '@/components/home/ComeAsYouAreBanner';

export const metadata: Metadata = {
  title: 'Upcoming Events | Open Heavens Edgware',
  description:
    'Dinners, prayer, and days out near you. Discover all upcoming gatherings, conferences, and community fellowship at Open Heavens Christian Centre in Edgware.',
};

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <main className="w-full bg-[var(--paper)] overflow-hidden">
      {/* 01 — Hero matching screenshot media_1795337831407_3696dee6.jpg */}
      <EventsHero />

      {/* 02 — Gather / Upcoming Events Showcase matching screenshot */}
      <div id="all-events">
        <EventsShowcaseSection events={events} />
      </div>

      {/* 03 — Come As You Are Banner */}
      <ComeAsYouAreBanner />
    </main>
  );
}
