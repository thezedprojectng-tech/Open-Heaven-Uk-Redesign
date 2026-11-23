import { Metadata } from 'next';
import { PageShell } from '@/components/global/PageShell';
import { getSiteSettings } from '@/lib/data/db';
import { EmptyState } from '@/components/global/EmptyState';
import { Building2, ShieldCheck, CreditCard, Lock, ArrowRight } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';

export const metadata: Metadata = {
  title: 'Give Online & Tithes',
  description:
    'Support the mission and local outreach of Open Heavens Christian Centre in Edgware. Secure bank transfer, Gift Aid declarations, and online giving options.',
};

export default async function GivePage() {
  const settings = await getSiteSettings();

  if (!settings) {
    return (
      <PageShell
        title="Giving &amp; Stewardship"
        breadcrumbs={[{ label: 'Give' }]}
      >
        <EmptyState
          title="Donation details temporarily unavailable"
          description="We are currently unable to retrieve banking details from the server. Please visit in person or contact the church office."
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Giving &amp; Stewardship"
      description="Thank you for partnering with us in generosity. Every gift enables local outreach in Edgware, pastoral care, and discipleship across North London."
      breadcrumbs={[{ label: 'Give' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-black">
        {/* Left column: Giving options */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Direct Bank Transfer */}
          <section className="border-2 border-black rounded-2xl p-6 sm:p-8 bg-white space-y-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-[#FFC700] text-black border-2 border-black rounded-xl">
                  <Building2 className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <span className="px-2.5 py-0.5 bg-[#FFC700] text-black font-mono text-[10px] font-black uppercase rounded-md border border-black inline-block mb-1">
                    RECOMMENDED (0% FEES)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-black uppercase">Direct Bank Transfer (BACS)</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[#FAF7F0] p-5 rounded-xl border-2 border-black font-mono">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-black text-neutral-600">
                  Bank Name
                </span>
                <span className="font-black text-base text-black">{settings.bank_name}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-black text-neutral-600">
                  Account Name
                </span>
                <span className="font-black text-base text-black">{settings.bank_account_name}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-black text-neutral-600">
                  Sort Code
                </span>
                <span className="font-black text-base text-black">{settings.bank_sort_code}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-black text-neutral-600">
                  Account Number
                </span>
                <span className="font-black text-base text-black">
                  {settings.bank_account_number}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-700 font-bold leading-relaxed">
              <strong>Payment Reference:</strong> Please specify your transfer reference as{' '}
              <code className="bg-[#FFC700] text-black border border-black px-2 py-0.5 rounded-md font-mono font-black">
                TITHE
              </code>
              ,{' '}
              <code className="bg-[#00D2FF] text-black border border-black px-2 py-0.5 rounded-md font-mono font-black">
                OFFERING
              </code>
              , or{' '}
              <code className="bg-[#16D958] text-black border border-black px-2 py-0.5 rounded-md font-mono font-black">
                BUILDING
              </code>{' '}
              followed by your surname.
            </p>
          </section>

          {/* 2. UK Gift Aid Declaration */}
          <section className="border-2 border-black rounded-2xl p-6 sm:p-8 bg-white space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-3">
              <span className="p-2 bg-[#16D958] text-black border-2 border-black rounded-xl">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <span className="px-2.5 py-0.5 bg-[#16D958] text-black font-mono text-[10px] font-black uppercase rounded-md border border-black inline-block mb-1">
                  TAX RELIEF
                </span>
                <h2 className="text-xl font-display font-black text-black uppercase">Boost Your Giving with UK Gift Aid (+25%)</h2>
              </div>
            </div>
            <p className="text-sm text-neutral-800 font-medium leading-relaxed">{settings.gift_aid_notice}</p>
            <div className="p-4 rounded-xl border-2 border-black bg-[#FAF7F0] text-xs text-neutral-800 font-semibold space-y-2">
              <p>
                <strong>Gift Aid Declaration Criteria:</strong> You must be an individual UK
                taxpayer and have paid an amount of UK Income Tax and/or Capital Gains Tax equal to
                the amount that all charities and CASCs will reclaim on your donations in that tax year.
              </p>
              <p>
                To register your Gift Aid declaration with our finance office, email us with your
                full name and UK postcode at our church office.
              </p>
            </div>
          </section>

          {/* 3. Secure Card / Recurring Giving */}
          <section className="border-2 border-black rounded-2xl p-6 sm:p-8 bg-white space-y-4">
            <div className="flex items-center gap-3 border-b-2 border-black pb-3">
              <span className="p-2 bg-[#00D2FF] text-black border-2 border-black rounded-xl">
                <CreditCard className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-xl font-display font-black text-black uppercase">Debit / Credit Card &amp; Recurring Giving</h2>
            </div>
            <p className="text-sm text-neutral-800 font-medium leading-relaxed">
              Set up a secure debit/credit card donation or scheduled recurring monthly gift.
            </p>

            <div className="border-2 border-dashed border-black rounded-xl p-6 bg-[#FAF7F0] text-center space-y-3">
              <Lock className="h-6 w-6 mx-auto text-black" aria-hidden="true" />
              <p className="text-sm font-black text-black uppercase">
                Secure Stripe Checkout Integration
              </p>
              <p className="text-xs text-neutral-700 font-semibold max-w-sm mx-auto">
                Card processing integration will be connected with our registered charity Stripe
                account during the visual polish phase.
              </p>
              <div className="pt-2">
                <button disabled className="px-6 py-2.5 bg-neutral-300 text-neutral-600 border-2 border-neutral-400 rounded-xl font-mono text-xs font-black uppercase cursor-not-allowed">
                  Donate by Card (Coming Soon)
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right column: Charity transparency & FAQ */}
        <aside className="lg:col-span-4" aria-label="Charity Financial Information">
          <div className="border-2 border-black rounded-2xl p-6 bg-white space-y-6 sticky top-24">
            <span className="px-3 py-1 bg-[#FF2E93] text-white font-mono text-[10px] font-black uppercase rounded-lg border-2 border-black inline-block">
              CHARITY TRANSPARENCY
            </span>
            <h3 className="text-lg font-display font-black text-black uppercase">Registered Charity Details</h3>

            <div className="space-y-3 text-xs text-neutral-800 font-medium leading-relaxed">
              <p>
                <strong>Charity Commission No.:</strong> {settings.charity_number}
              </p>
              <p>
                <strong>Governing Body:</strong> Board of Trustees, Open Heavens Christian Centre
              </p>
              <p>
                Open Heavens Christian Centre operates in strict compliance with the UK Charities Act
                and submits annual audited returns to the Charity Commission for England and Wales.
              </p>
            </div>

            <div className="pt-4 border-t-2 border-black space-y-3 text-xs text-neutral-800">
              <h4 className="font-mono text-xs font-black uppercase text-black">Fund Allocations</h4>
              <ul className="space-y-1.5 list-disc pl-4 font-semibold">
                <li>Edgware community food support &amp; outreach</li>
                <li>Youth &amp; children’s education equipment</li>
                <li>Auditorium upkeep &amp; facilities</li>
                <li>Missions and benevolent relief</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
