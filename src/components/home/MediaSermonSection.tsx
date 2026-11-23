'use client';

import React from 'react';
import Link from 'next/link';
import { Sermon } from '@/types';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

interface MediaSermonSectionProps {
  latestSermon: Sermon | null;
}

export function MediaSermonSection({ latestSermon }: MediaSermonSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const sermon = latestSermon || {
    id: 'sample',
    title: 'Finding Your Way Home',
    slug: 'finding-your-way-home',
    date: 'Nov 1, 2026',
    speaker: 'Pastor David & Bola',
    series_title: 'The Long Road Back',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    audio_url: '#',
    notes: 'Luke 15:11-32',
    is_featured: true,
    status: 'published' as const,
  };

  const recentMessages = [
    { title: 'Faith in Ordinary Life', speaker: 'Pastor David', duration: '29 min', code: 'EP. 48' },
    { title: 'The Courage to Begin', speaker: 'Sister Bola', duration: '31 min', code: 'EP. 47' },
    { title: 'Hope for the Journey', speaker: 'Deacon Marcus', duration: '27 min', code: 'EP. 46' },
  ];

  return (
    <section className="w-full py-16 sm:py-24 border-y-2 border-black bg-[#FFC700] text-black select-text" aria-labelledby="teaching-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header Row (SpaceFM Bar Style) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b-2 border-black">
          <div className="space-y-2">
            <span className="px-3.5 py-1 bg-black text-white font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
              ★ Watch &amp; Listen
            </span>
            <h2
              id="teaching-heading"
              className="font-display font-black text-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight"
            >
              Latest Teaching &amp; Messages
            </h2>
            <p className="font-body text-base text-black/85 font-medium max-w-xl">
              Practical Bible teaching and honest hope for everyday London life.
            </p>
          </div>

          <CTAButton href="/watch" variant="primary" size="md" showArrow>
            Explore Full Archive
          </CTAButton>
        </div>

        {/* Clean Modern Media Grid (No Shadows, Rounded Cards) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Latest Sermon Display (7 cols) */}
          <div className="lg:col-span-7 bg-white text-black border-2 border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#FF2E93] text-white border-2 border-black font-mono text-xs font-black uppercase rounded-lg">
                  Series: {sermon.series_title || 'The Long Road Back'}
                </span>
                <span className="font-mono text-xs text-neutral-600 font-bold uppercase">
                  {sermon.date}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight leading-tight">
                {sermon.title}
              </h3>

              {/* Metadata block */}
              <div className="p-3 bg-[#FAF7F0] border-2 border-black rounded-xl font-mono text-xs flex flex-wrap items-center gap-x-4 gap-y-2 text-black font-bold">
                <span>SPEAKER: {sermon.speaker}</span>
                <span>•</span>
                <span>PASSAGE: {sermon.notes || 'Luke 15:11-32'}</span>
                <span>•</span>
                <span>34 MIN</span>
              </div>

              <p className="font-body text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
                What the story of the prodigal son says to anyone who wonders if it’s too late to come back home. Real hope, real mercy, without condemnation.
              </p>

              {/* Scrubber visualization */}
              <div className="space-y-1.5 pt-2 font-mono text-xs text-neutral-500">
                <div className="h-3 w-full bg-[#FAF7F0] border-2 border-black rounded-full overflow-hidden flex items-center">
                  <div className="h-full w-2/5 bg-[#00D2FF]" />
                </div>
                <div className="flex justify-between text-[11px] font-black text-black">
                  <span>14:20</span>
                  <span>34:00</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <CTAButton href="/watch" variant="primary" size="md" showArrow>
                Watch Message Video
              </CTAButton>
              <CTAButton href="/watch" variant="outline" size="md" showArrow>
                Listen to Podcast
              </CTAButton>
            </div>
          </div>

          {/* Right: Recent Broadcast Docket (5 cols) */}
          <div className="lg:col-span-5 bg-white text-black border-2 border-black rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-wider text-black block border-b-2 border-black pb-2">
                Recent Teachings
              </span>

              <div className="space-y-3 mt-4">
                {recentMessages.map((msg) => (
                  <Link
                    key={msg.title}
                    href="/watch"
                    className="group block p-4 bg-[#FAF7F0] border-2 border-black rounded-xl hover:bg-[#00D2FF] transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600 font-bold pb-1">
                      <span>{msg.code}</span>
                      <span>{msg.duration}</span>
                    </div>
                    <h4 className="font-display text-base font-black text-black uppercase tracking-tight group-hover:text-black transition-colors">
                      {msg.title}
                    </h4>
                    <p className="text-xs font-mono text-neutral-600 font-bold mt-0.5">
                      {msg.speaker}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/watch"
                className="w-full py-3 bg-[#FAF7F0] text-black font-mono text-xs font-black uppercase rounded-xl flex items-center justify-center gap-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                <span>Browse All Teachings</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
