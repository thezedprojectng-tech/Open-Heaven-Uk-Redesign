import { Metadata } from 'next';
import {
  getSiteSettings,
  getServiceTimes,
  getUpcomingEvents,
  getSermons,
  getMinistries,
} from '@/lib/data/db';
import { HomeHero } from '@/components/home/HomeHero';
import { TickerBanner } from '@/components/home/TickerBanner';
import { PlaceForYouSection } from '@/components/home/PlaceForYouSection';
import { VisitingGuideSection } from '@/components/home/VisitingGuideSection';
import { MinistriesWalkSection } from '@/components/home/MinistriesWalkSection';
import { ScriptureQuoteBanner } from '@/components/home/ScriptureQuoteBanner';
import { EventsShowcaseSection } from '@/components/home/EventsShowcaseSection';
import { MediaSermonSection } from '@/components/home/MediaSermonSection';
import { MissionPillarsSection } from '@/components/home/MissionPillarsSection';
import { ComeAsYouAreBanner } from '@/components/home/ComeAsYouAreBanner';

export const metadata: Metadata = {
  title: 'Open Heavens Christian Centre | Church in Edgware, London',
  description:
    'Find your people. Grow in faith. Live with purpose. Welcome to Open Heavens Christian Centre in Edgware, London. Join us for Sunday worship, vibrant children & youth programs, and community outreach.',
};

export default async function HomePage() {
  const [settings, serviceTimes, upcomingEvents, sermons, ministries] =
    await Promise.all([
      getSiteSettings(),
      getServiceTimes(),
      getUpcomingEvents(5),
      getSermons(),
      getMinistries(),
    ]);

  const latestSermon = sermons && sermons.length > 0 ? sermons[0] : null;

  return (
    <main id="main-content" className="flex-1 flex flex-col bg-paper">
      {/* 1. HERO SECTION */}
      <HomeHero
        settings={settings}
        serviceTimes={serviceTimes}
      />

      {/* 2. TICKER BANNER STRIP */}
      <TickerBanner />

      {/* 3. THERE'S A PLACE FOR YOU HERE */}
      <PlaceForYouSection />

      {/* 4. WHAT HAPPENS WHEN I VISIT (01-04 STEPS + FAQS) */}
      <VisitingGuideSection />

      {/* 5. FIND PEOPLE TO WALK WITH (MINISTRIES) */}
      <MinistriesWalkSection ministries={ministries} />

      {/* 6. SCRIPTURE QUOTE BANNER (MICAH 6:8) */}
      <ScriptureQuoteBanner />

      {/* 7. UPCOMING EVENTS */}
      <EventsShowcaseSection events={upcomingEvents} />

      {/* 8. MEDIA / LATEST TEACHING (DARK PANEL) */}
      <MediaSermonSection latestSermon={latestSermon} />

      {/* 9. MISSION PILLARS */}
      <MissionPillarsSection />

      {/* 10. COME AS YOU ARE (PANORAMIC BANNER) */}
      <ComeAsYouAreBanner />
    </main>
  );
}
