'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

export function MissionPillarsSection() {
  const shouldReduceMotion = useReducedMotion();

  const anchors = [
    {
      code: '01',
      title: 'Sunday Worship',
      desc: 'Gathering around Jesus every week with vibrant praise, earnest prayer, and practical, life-giving biblical truth.',
    },
    {
      code: '02',
      title: 'Local Community',
      desc: 'Walking alongside each other across dinner tables, mid-week groups, and everyday WhatsApp chats so no one walks alone.',
    },
    {
      code: '03',
      title: 'Serving Our City',
      desc: 'Showing up for Edgware and London through our community food pantry, schools outreach, and family care initiatives.',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0] select-text" aria-labelledby="about-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 pb-6 border-b-2 border-black">
          <span className="px-3.5 py-1 bg-[#FFC700] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
            ★ About Us
          </span>
          <h2
            id="about-heading"
            className="font-display font-black text-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight max-w-4xl leading-[1.05]"
          >
            We’re learning to love God, love people, and serve our city.
          </h2>
          <p className="font-mono text-xs sm:text-sm font-bold text-neutral-600 uppercase max-w-2xl">
            A neighborhood church in Edgware for people at every stage of faith, including none at all.
          </p>
        </div>

        {/* 3 Pop Anchor Pillar Cards (Gold, Cyan, Lime Green - No Shadows) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {anchors.map((anchor, idx) => {
            const cardColors = [
              'bg-[#FFC700] text-black',
              'bg-[#00D2FF] text-black',
              'bg-[#16D958] text-black',
            ];

            return (
              <motion.div
                key={anchor.code}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`p-6 sm:p-8 border-2 border-black rounded-2xl flex flex-col justify-between space-y-4 ${cardColors[idx]}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b-2 border-black/30 pb-3">
                    <span className="px-3 py-1 font-mono text-xs font-black uppercase rounded-lg bg-black text-white">
                      {anchor.code}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black uppercase tracking-tight">
                    {anchor.title}
                  </h3>

                  <p className="font-body text-sm font-medium leading-relaxed opacity-90">
                    {anchor.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner with Action Prompt */}
        <div className="p-6 sm:p-8 bg-white border-2 border-black rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-black">
          <div className="space-y-1">
            <h4 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight">
              Have questions about our beliefs or mission?
            </h4>
            <p className="font-body text-xs sm:text-sm text-neutral-600 font-bold">
              We would love to chat over a coffee or answer your questions anytime.
            </p>
          </div>
          <CTAButton href="/contact" variant="primary" size="md" showArrow>
            Get In Touch With Us
          </CTAButton>
        </div>

      </div>
    </section>
  );
}
