import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/data/db';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactMessageSection } from '@/components/contact/ContactMessageSection';
import { ComeAsYouAreBanner } from '@/components/home/ComeAsYouAreBanner';

export const metadata: Metadata = {
  title: 'Contact Us | Open Heavens Christian Centre',
  description:
    'We’d love to hear from you. Questions, prayer requests, or just saying hello. Reach out to Open Heavens Christian Centre in Edgware, London.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <main id="main-content" className="flex-1 flex flex-col bg-paper">
      {/* 01 — Contact Hero with 4-Column Quick-Info Bar */}
      <ContactHero settings={settings} />

      {/* 02 — Say Hello Form Section matching screenshot */}
      <ContactMessageSection />

      {/* 03 — Come As You Are Banner */}
      <ComeAsYouAreBanner />
    </main>
  );
}
