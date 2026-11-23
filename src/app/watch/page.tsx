import { Metadata } from 'next';
import { getSermons } from '@/lib/data/db';
import { MessagesHero } from '@/components/messages/MessagesHero';
import { MessagesPlayerSection } from '@/components/messages/MessagesPlayerSection';
import { ComeAsYouAreBanner } from '@/components/home/ComeAsYouAreBanner';

export const metadata: Metadata = {
  title: 'Messages | Open Heavens Christian Centre',
  description:
    'Missed a Sunday? Catch up here, any time. Watch or listen to recent messages, sermons, and teaching series from Open Heavens Christian Centre in Edgware, London.',
};

export default async function WatchPage() {
  const sermons = await getSermons();

  return (
    <main id="main-content" className="flex-1 flex flex-col bg-paper">
      {/* 01 — Messages Hero with Curved Pew and Headline */}
      <MessagesHero />

      {/* 02 — Dark Mood Player Section: Latest Message + Recent Messages */}
      <MessagesPlayerSection sermons={sermons} />

      {/* 03 — Come As You Are Banner */}
      <ComeAsYouAreBanner />
    </main>
  );
}
