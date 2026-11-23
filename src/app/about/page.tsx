import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { TickerBanner } from '@/components/home/TickerBanner';
import { PlaceForYouSection } from '@/components/home/PlaceForYouSection';
import { ScriptureQuoteBanner } from '@/components/home/ScriptureQuoteBanner';
import { MissionPillarsSection } from '@/components/home/MissionPillarsSection';
import { ComeAsYouAreBanner } from '@/components/home/ComeAsYouAreBanner';

export const metadata: Metadata = {
  title: 'About Us | Open Heavens Christian Centre',
  description:
    'Ordinary people. Learning together. Serving our city. Learn about Open Heavens Christian Centre in Edgware, London: our community, values, and mission.',
};

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1 flex flex-col bg-paper">
      {/* 1. HERO SECTION */}
      <AboutHero />

      {/* 2. CONTINUOUS SCROLLING MARQUEE BANNER */}
      <TickerBanner />

      {/* 3. THERE'S A PLACE FOR YOU HERE */}
      <PlaceForYouSection />

      {/* 4. SCRIPTURE QUOTE BANNER (MICAH 6:8) */}
      <ScriptureQuoteBanner />

      {/* 5. WE'RE LEARNING TO LOVE GOD, LOVE PEOPLE, AND SERVE OUR CITY */}
      <MissionPillarsSection />

      {/* 6. COME AS YOU ARE BANNER */}
      <ComeAsYouAreBanner />
    </main>
  );
}
