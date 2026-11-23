import { Metadata } from 'next';
import { getMinistries } from '@/lib/data/db';
import { MinistriesHero } from '@/components/ministries/MinistriesHero';
import { MinistriesDirectorySection } from '@/components/ministries/MinistriesDirectorySection';
import { ComeAsYouAreBanner } from '@/components/home/ComeAsYouAreBanner';

export const metadata: Metadata = {
  title: 'Our Ministries | Open Heavens Edgware',
  description:
    'There’s a place for every age and every stage. Explore ministries at Open Heavens Christian Centre in Edgware: Kids & Families, Students, Small Groups, and Outreach.',
};

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <main className="w-full bg-[var(--paper)] overflow-hidden">
      {/* 01 — Hero matching screenshot media_1795328839305_aaf96a73.jpg */}
      <MinistriesHero />

      {/* 02 — Community Walk & Ministries Directory matching screenshot */}
      <MinistriesDirectorySection ministries={ministries} />

      {/* 03 — Come As You Are Banner */}
      <ComeAsYouAreBanner />
    </main>
  );
}
