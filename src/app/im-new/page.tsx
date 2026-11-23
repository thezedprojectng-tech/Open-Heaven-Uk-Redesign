import { Metadata } from 'next';
import { getSiteSettings, getServiceTimes } from '@/lib/data/db';
import { VisitHero } from '@/components/visit/VisitHero';
import { VisitingGuideSection } from '@/components/home/VisitingGuideSection';
import { ComeAsYouAreBanner } from '@/components/home/ComeAsYouAreBanner';
import { VisitorForm } from '@/components/forms/VisitorForm';
import { Train, Car, ShieldCheck, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plan Your Visit | Open Heavens Edgware',
  description:
    'Your first Sunday starts with a warm hello. Find out what to expect, service times, parking, and children’s check-in at Open Heavens Christian Centre in Edgware.',
};

export default async function ImNewPage() {
  const [settings, serviceTimes] = await Promise.all([getSiteSettings(), getServiceTimes()]);

  return (
    <main className="w-full bg-[var(--paper)] overflow-hidden">
      {/* 01 — Hero matching screenshot media_1795327912064_da5de8c3.jpg */}
      <VisitHero settings={settings} serviceTimes={serviceTimes} />

      {/* 02 — Visiting Guide & FAQ matching screenshot */}
      <div id="expect">
        <VisitingGuideSection />
      </div>

      {/* 03 — First-Time Visitor Pre-Registration & Facilities */}
      <section
        id="visitor-form"
        className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0] text-black"
        aria-labelledby="visitor-form-heading"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Introduction & Travel Details */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="px-3 py-1 bg-[#FFC700] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
                  ★ LET US KNOW YOU ARE COMING
                </span>
                <h2
                  id="visitor-form-heading"
                  className="font-display font-black text-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] uppercase"
                >
                  We will save you a seat.
                </h2>
                <p className="font-body text-base text-black font-medium leading-relaxed max-w-xl">
                  Let us know you are visiting and our hospitality team will meet you at the entrance, show you where everything is, and make your first Sunday relaxed and welcoming.
                </p>
              </div>

              {/* Getting Here & Amenities Grid (Pop Cards with 2px borders) */}
              <div className="space-y-4 pt-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-black font-black">
                  Good to Know
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border-2 border-black bg-white space-y-2">
                    <div className="flex items-center gap-2 text-black font-black text-sm">
                      <span className="p-1.5 bg-[#00D2FF] text-black border border-black rounded-lg">
                        <Train className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>Edgware Underground</span>
                    </div>
                    <p className="text-xs text-neutral-700 font-bold leading-relaxed">
                      Northern Line terminus is just a 4-minute walk (approx. 300m) to The Exchange.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border-2 border-black bg-white space-y-2">
                    <div className="flex items-center gap-2 text-black font-black text-sm">
                      <span className="p-1.5 bg-[#FFC700] text-black border border-black rounded-lg">
                        <Car className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>Free Church Parking</span>
                    </div>
                    <p className="text-xs text-neutral-700 font-bold leading-relaxed">
                      Dedicated bays behind The Exchange. Additional parking at Broadwalk Centre.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border-2 border-black bg-white space-y-2">
                    <div className="flex items-center gap-2 text-black font-black text-sm">
                      <span className="p-1.5 bg-[#16D958] text-black border border-black rounded-lg">
                        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>Step-Free Access</span>
                    </div>
                    <p className="text-xs text-neutral-700 font-bold leading-relaxed">
                      Ground level access, accessible restrooms, and hearing loop installed throughout.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border-2 border-black bg-white space-y-2">
                    <div className="flex items-center gap-2 text-black font-black text-sm">
                      <span className="p-1.5 bg-[#FF2E93] text-white border border-black rounded-lg">
                        <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>Young Saints Check-in</span>
                    </div>
                    <p className="text-xs text-neutral-700 font-bold leading-relaxed">
                      Secure, DBS-checked classes for babies through teens open 15 mins before service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visitor Form Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border-2 border-black bg-white p-6 sm:p-8 space-y-6">
                <div className="space-y-1.5 border-b-2 border-black pb-4">
                  <span className="px-2.5 py-1 bg-[#16D958] text-black font-mono text-[10px] font-black uppercase rounded-md border border-black inline-block">
                    WELCOME HOSTS READY
                  </span>
                  <h3 className="font-display font-black text-2xl text-black uppercase">
                    Tell us you are coming
                  </h3>
                  <p className="font-body text-xs text-neutral-600 font-bold">
                    No pressure, questions welcome. We look forward to meeting you.
                  </p>
                </div>
                <VisitorForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Come As You Are Banner */}
      <ComeAsYouAreBanner />
    </main>
  );
}
