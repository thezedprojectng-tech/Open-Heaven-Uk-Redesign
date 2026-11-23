'use client';

import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

export function PlaceForYouSection() {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      num: '01',
      title: 'Lifelong Believers & Honest Skeptics',
      desc: 'You do not need to agree with everything to belong here. Bring your questions, your doubts, and your story.',
    },
    {
      num: '02',
      title: 'Community Without Pretense',
      desc: 'No dress codes, no spiritual performances. Just real people learning to care for each other through everyday life.',
    },
    {
      num: '03',
      title: 'Rooted in Edgware & Greater London',
      desc: 'We are committed to serving our local neighbors through food pantries, family events, and practical local partnerships.',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0]" aria-labelledby="welcome-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header Tag Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b-2 border-black">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-[#FF2E93] text-white border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
              ★ Welcome
            </span>
            <h2
              id="welcome-heading"
              className="font-display font-black text-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight"
            >
              There’s a place for you here.
            </h2>
          </div>
        </div>

        {/* 2-Column Clean Pop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Framed Photo Card */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] border-2 border-black rounded-2xl bg-white overflow-hidden group">
              <SafeImage
                src="/church-pew.jpg"
                alt="Wooden sanctuary curved seating inside church hall"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right: 3 Structured Principle Modules */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              {principles.map((p, idx) => {
                const cardColors = [
                  'bg-white text-black',
                  'bg-[#00D2FF] text-black',
                  'bg-[#16D958] text-black',
                ];

                return (
                  <div
                    key={p.num}
                    className={`p-6 border-2 border-black rounded-2xl space-y-2 ${cardColors[idx]}`}
                  >
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <span className="font-mono text-xs font-black px-2.5 py-0.5 bg-black text-white rounded-md">
                        {p.num}
                      </span>
                      {idx === 2 && (
                        <span className="font-mono text-[10px] font-black uppercase text-black px-2 py-0.5 bg-white border border-black rounded-md">
                          Community
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight">
                      {p.title}
                    </h3>
                    <p className="font-body text-sm font-medium leading-relaxed opacity-90">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <CTAButton href="/about" variant="primary" size="md" showArrow>
                Learn More About Our Church
              </CTAButton>
              <CTAButton href="/im-new" variant="outline" size="md" showArrow>
                What To Expect When You Visit
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
