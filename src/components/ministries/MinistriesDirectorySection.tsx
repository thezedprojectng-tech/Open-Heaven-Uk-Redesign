'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Sparkles, Heart } from 'lucide-react';
import { Ministry } from '@/types';
import { motion, useReducedMotion } from 'motion/react';

interface MinistriesDirectorySectionProps {
  ministries: Ministry[];
}

export function MinistriesDirectorySection({ ministries }: MinistriesDirectorySectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const curatedList = [
    {
      tag: 'YOUTH',
      tagColor: 'bg-[#16D958] text-black',
      title: 'Young Saints (Students)',
      desc: 'Middle and high schoolers finding honest conversations, good friends, and mentors who show up for them every Sunday.',
      href: '/young-saints',
      cta: 'Explore Students',
    },
    {
      tag: 'GROUPS',
      tagColor: 'bg-[#FFC700] text-black',
      title: 'Small Groups',
      desc: 'Eight to twelve people around a table each week in Edgware. It’s where most of us stopped being strangers.',
      href: '/home-groups',
      cta: 'Find a Group',
    },
    {
      tag: 'SERVING',
      tagColor: 'bg-[#00D2FF] text-black',
      title: 'Serving Teams',
      desc: 'Make coffee, welcome guests, run sound, or stock the food pantry. There’s a place for what you’re good at.',
      href: '/contact',
      cta: 'Start Serving',
    },
    {
      tag: 'ADULTS',
      tagColor: 'bg-[#FF2E93] text-white',
      title: 'Ignite Young Adults',
      desc: 'Twenties and thirties figuring out faith, work, purpose, and life in London together through regular hangouts.',
      href: '/ministries/ignite-youth',
      cta: 'Explore Young Adults',
    },
    {
      tag: 'OUTREACH',
      tagColor: 'bg-[#796BFF] text-white',
      title: 'Community Outreach',
      desc: 'Partnering with neighbors and local organizations to meet real physical and emotional needs in Edgware.',
      href: '/ministries/community-outreach',
      cta: 'Get Involved',
    },
    {
      tag: 'WORSHIP',
      tagColor: 'bg-[#FFC700] text-black',
      title: 'Worship Collective',
      desc: 'Singers, musicians, and audio/visual volunteers who help our Sunday gatherings feel honest and spiritually vibrant.',
      href: '/ministries/worship-collective',
      cta: 'Join the Team',
    },
  ];

  return (
    <section id="all-ministries" className="w-full py-16 sm:py-24 bg-[#FAF7F0] border-t-2 border-black text-black">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-black pb-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-black text-white font-mono text-xs font-black uppercase rounded-lg inline-block">
              DIRECTORY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-black">
              Find where you fit.
            </h2>
          </div>
          <p className="font-body text-sm font-semibold text-neutral-700 max-w-sm">
            All ministries meet weekly or bi-weekly. Step in whenever you are ready.
          </p>
        </div>

        {/* 6-Card Pop Grid (Zayd.dev / SpaceFM style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedList.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-white border-2 border-black rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-4">
                <span className={`px-3 py-1 border-2 border-black font-mono text-[11px] font-black uppercase rounded-lg inline-block ${item.tagColor}`}>
                  {item.tag}
                </span>
                <h3 className="font-display font-black text-2xl text-black uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-neutral-800 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <Link
                href={item.href}
                className="inline-flex items-center justify-between w-full p-3 bg-[#FAF7F0] hover:bg-black hover:text-white text-black border-2 border-black rounded-xl font-mono text-xs font-black uppercase transition-colors"
              >
                <span>{item.cta}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
