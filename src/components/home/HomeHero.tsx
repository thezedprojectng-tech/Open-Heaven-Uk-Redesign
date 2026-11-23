'use client';

import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArrowRight, MapPin, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { SiteSettings, ServiceTime } from '@/types';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

interface HomeHeroProps {
  settings: SiteSettings | null;
  serviceTimes: ServiceTime[];
}

export function HomeHero({ settings, serviceTimes }: HomeHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const sundayService = serviceTimes.find((s) => s.day_of_week === 'Sunday') || serviceTimes[0];
  const serviceTimeText = sundayService ? sundayService.start_time : '10:30 AM';
  const locationText = settings
    ? `${settings.address_line1 || 'Edgware'}, ${settings.city || 'London'}`
    : 'Edgware, London';

  return (
    <section className="w-full bg-[#FAF7F0] pt-4 sm:pt-8 pb-12 sm:pb-16 text-black" aria-labelledby="hero-title">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: Headline & Manifesto (Col 1-7) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Pop Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1.5 bg-[#FFC700] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
                  ★ WELCOME TO OPEN HEAVENS
                </span>
                <span className="px-3.5 py-1.5 bg-[#00D2FF] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full">
                  EDGWARE, LONDON
                </span>
              </div>

              {/* Bold High-Impact Headline (Solid Black on Bright Cream) */}
              <h1
                id="hero-title"
                className="font-display font-black text-black text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight uppercase"
              >
                <span className="block text-black">Find your people.</span>
                <span className="block text-black">Grow in faith.</span>
                <span className="inline-block bg-[#FFC700] text-black px-4 py-1 border-2 border-black rounded-2xl mt-1.5">
                  Live with purpose.
                </span>
              </h1>

              {/* High-legibility Subtitle */}
              <p className="font-body text-base sm:text-lg text-black font-semibold leading-relaxed max-w-xl pt-2">
                Open Heavens is a community of ordinary people learning to follow Jesus together in Edgware. Lifelong believers, curious skeptics, families, and returners — come as you are.
              </p>
            </div>

            {/* Action Buttons (High contrast SpaceFM style) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <CTAButton href="/im-new" variant="primary" size="lg" showArrow>
                Plan Your Visit
              </CTAButton>
              <CTAButton href="/about" variant="outline" size="lg" showArrow>
                Explore Community
              </CTAButton>
            </div>
          </motion.div>

          {/* Right: Clean Service Card & Pulse (Col 8-12) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between gap-4"
          >
            {/* Card 1: Sunday Gathering Details */}
            <div className="bg-white border-2 border-black rounded-2xl p-5 sm:p-6 space-y-4 text-black">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#FFC700] border-2 border-black rounded-full animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                    Sunday Worship Service
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#FFC700] text-black border-2 border-black font-mono text-[11px] font-black rounded-lg">
                  Sundays @ {serviceTimeText}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 bg-[#FAF7F0] border-2 border-black rounded-xl">
                  <span className="text-[10px] text-neutral-600 uppercase block font-black">SERVICE TIME</span>
                  <p className="text-xl font-black text-black">{serviceTimeText}</p>
                  <p className="text-[10px] text-neutral-700 font-bold">Every Sunday morning</p>
                </div>
                <div className="p-3 bg-[#FAF7F0] border-2 border-black rounded-xl">
                  <span className="text-[10px] text-neutral-600 uppercase block font-black">LOCATION</span>
                  <p className="text-sm font-black text-black leading-tight truncate">{settings?.city || 'Edgware'}</p>
                  <p className="text-[10px] text-neutral-700 font-bold">London, HA8</p>
                </div>
              </div>

              <div className="p-3 bg-[#16D958] border-2 border-black rounded-xl flex items-center justify-between text-xs font-mono font-black text-black">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  <span>Children &amp; Youth Classes</span>
                </div>
                <span className="underline underline-offset-2">Young Saints Ready</span>
              </div>
            </div>

            {/* Card 2: Highlights (4 Pop Stat Stickers) */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border-2 border-black rounded-xl p-3 text-center space-y-1">
                <span className="font-display text-2xl font-black text-black block leading-none">
                  100%
                </span>
                <span className="font-mono text-[10px] font-black uppercase text-neutral-600 block leading-tight">
                  Welcome As You Are
                </span>
              </div>

              <div className="bg-[#00D2FF] text-black border-2 border-black rounded-xl p-3 text-center space-y-1">
                <span className="font-display text-2xl font-black text-black block leading-none">
                  75 MIN
                </span>
                <span className="font-mono text-[10px] font-black uppercase text-black block leading-tight">
                  Sunday Service
                </span>
              </div>

              <div className="bg-[#FF2E93] text-white border-2 border-black rounded-xl p-3 text-center space-y-1">
                <span className="font-display text-2xl font-black text-white block leading-none">
                  4 MIN
                </span>
                <span className="font-mono text-[10px] font-black uppercase text-white block leading-tight">
                  From Edgware Tube
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Panoramic Community Photo */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full border-2 border-black rounded-2xl bg-white group overflow-hidden"
        >
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
            <SafeImage
              src="/Hero.avif"
              alt="People and church community gathered together outdoors in fellowship"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1440px"
              className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
          </div>

          <div className="p-3.5 sm:p-4 bg-white border-t-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs font-bold text-black">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FFC700] border-2 border-black rounded-full" aria-hidden="true" />
              <span className="font-black text-black">Sunday service at {serviceTimeText} in Edgware, London</span>
            </div>
            <Link
              href="/im-new"
              className="text-xs font-black uppercase text-black hover:text-[#FF2E93] flex items-center gap-1 underline underline-offset-4 decoration-2"
            >
              <span>See What To Expect</span>
              <ArrowRight className="h-3 w-3 stroke-[3]" />
            </Link>
          </div>
        </motion.div>

        {/* 4-Column Pop Sticker Ledger (No Shadows, Rounded-2xl, Vibrant Colors) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Col 1: Bright Gold */}
          <div className="p-6 bg-[#FFC700] text-black border-2 border-black rounded-2xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-black uppercase text-black bg-white px-2 py-0.5 rounded-md border border-black">Sunday Worship</span>
                <Clock className="h-4 w-4 text-black" aria-hidden="true" />
              </div>
              <p className="font-display text-2xl font-black text-black mt-2">{serviceTimeText}</p>
              <p className="font-body text-xs text-black font-bold mt-1">Vibrant worship, practical teaching, warm coffee afterwards.</p>
            </div>
          </div>

          {/* Col 2: Electric Cyan */}
          <div className="p-6 bg-[#00D2FF] text-black border-2 border-black rounded-2xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-black uppercase text-black bg-white px-2 py-0.5 rounded-md border border-black">Location &amp; Parking</span>
                <MapPin className="h-4 w-4 text-black" aria-hidden="true" />
              </div>
              <p className="font-display text-xl font-black text-black mt-2 truncate">{locationText}</p>
              <p className="font-body text-xs text-black font-bold mt-1">Dedicated church bays + full step-free access throughout.</p>
            </div>
          </div>

          {/* Col 3: Bright Lime Green */}
          <div className="p-6 bg-[#16D958] text-black border-2 border-black rounded-2xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-black uppercase text-black bg-white px-2 py-0.5 rounded-md border border-black">Kids &amp; Youth</span>
                <Sparkles className="h-4 w-4 text-black" aria-hidden="true" />
              </div>
              <p className="font-display text-xl font-black text-black mt-2">Young Saints Classes</p>
              <p className="font-body text-xs text-black font-bold mt-1">DBS-checked team, check-in starts 15 mins before service.</p>
            </div>
          </div>

          {/* Col 4: Vivid Hot Pink */}
          <div className="p-6 bg-[#FF2E93] text-white border-2 border-black rounded-2xl flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-black uppercase text-white block border-b-2 border-white/40 pb-1">
                Visiting This Week?
              </span>
              <p className="font-display text-base font-black text-white uppercase mt-1">We would love to meet you</p>
            </div>
            <Link
              href="/im-new"
              className="w-full py-2.5 bg-white text-black text-center font-mono text-xs font-black uppercase rounded-xl border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Plan Your Visit</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
