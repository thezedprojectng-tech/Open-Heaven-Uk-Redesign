'use client';

import React from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArrowRight } from 'lucide-react';
import { Ministry } from '@/types';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

interface MinistriesWalkSectionProps {
  ministries: Ministry[];
}

export function MinistriesWalkSection({ ministries }: MinistriesWalkSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const groups = [
    {
      tag: 'YOUTH & STUDENTS',
      title: 'Ignite Youth & Students',
      desc: 'Middle and high schoolers finding honest conversations, deep friendships, and leaders who show up for them.',
      href: '/young-saints',
      badgeBg: 'bg-[var(--neo-mint)] text-ink',
    },
    {
      tag: 'MIDWEEK GROUPS',
      title: 'Home Groups Around Edgware',
      desc: 'Eight to twelve people around a living room table each week sharing food, life, and Scripture together.',
      href: '/home-groups',
      badgeBg: 'bg-[var(--neo-yellow)] text-ink',
    },
    {
      tag: 'LOCAL OUTREACH',
      title: 'Community Action & Food Pantry',
      desc: 'Showing love to our London borough through practical food distribution, family support, and community care.',
      href: '/ministries',
      badgeBg: 'bg-[var(--neo-lilac)] text-ink',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0]" aria-labelledby="walk-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-black">
          <div className="space-y-2">
            <span className="px-3.5 py-1 bg-[#00D2FF] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
              ★ Community
            </span>
            <h2
              id="walk-heading"
              className="font-display font-black text-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight"
            >
              Find people to walk with.
            </h2>
          </div>

          <CTAButton href="/ministries" variant="primary" size="sm" showArrow>
            View All Ministries
          </CTAButton>
        </div>

        {/* 2-Column Regulated Grid: Left Major Card, Right 3 Structured Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: Featured Young Saints / Families Box (Vivid Lime Green) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 bg-[#16D958] border-2 border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 text-black"
          >
            <div className="space-y-4">
              <div className="relative w-full aspect-[16/10] border-2 border-black rounded-xl overflow-hidden bg-white group">
                <SafeImage
                  src="/church-garden.jpg"
                  alt="Sunlight filtering through trees for youth and families"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-black text-white font-mono text-[11px] font-black uppercase rounded-lg">
                    Kids &amp; Youth
                  </span>
                  <span className="font-mono text-xs text-black font-bold uppercase">
                    Sundays 10:30 AM
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
                  Young Saints Children &amp; Youth
                </h3>
                <p className="font-body text-sm sm:text-base text-black/90 leading-relaxed font-medium">
                  A safe, joyful place for children to ask big questions, make lifelong friends, and encounter God’s love while parents enjoy the main service.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-black font-black">DBS-CHECKED VOLUNTEERS</span>
              <CTAButton href="/young-saints" variant="primary" size="sm" showArrow>
                Explore Young Saints
              </CTAButton>
            </div>
          </motion.div>

          {/* Right: 3 Pop Ministry Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {groups.map((group, idx) => {
              const cardColors = [
                'bg-[#FFC700] text-black',
                'bg-[#00D2FF] text-black',
                'bg-white text-black',
              ];

              return (
                <motion.div
                  key={group.title}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`p-6 border-2 border-black rounded-2xl flex flex-col justify-between space-y-3 ${cardColors[idx]}`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between border-b-2 border-black/30 pb-2">
                      <span className="px-2.5 py-0.5 font-mono text-[10px] font-black uppercase rounded-md bg-black text-white">
                        {group.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-black uppercase tracking-tight">
                      {group.title}
                    </h3>

                    <p className="font-body text-xs sm:text-sm font-medium leading-relaxed opacity-90">
                      {group.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link
                      href={group.href}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-black uppercase text-black hover:underline group"
                    >
                      <span>Learn More &amp; Join</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform stroke-[3]" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
