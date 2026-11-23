'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CTAButton } from '@/components/ui/CTAButton';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What should I wear?',
    answer:
      'Wear whatever makes you comfortable. You will see people in casual jeans and t-shirts, smart casual, and traditional dress. There is no dress code.',
  },
  {
    question: 'What about my kids?',
    answer:
      'We have dedicated, secure classes for young children through secondary youth. Our trained volunteers are fully DBS-checked, and parent check-in opens 15 minutes before the service.',
  },
  {
    question: 'Do I have to believe already?',
    answer:
      'Not at all. You are warmly welcome to come and explore, observe, and ask honest questions at your own pace.',
  },
  {
    question: 'Where do I park and how do I get there?',
    answer:
      'Dedicated church parking bays are located behind The Exchange with full step-free access. Edgware Tube Station is also just a 4-minute walk away.',
  },
];

export function VisitingGuideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      num: '01',
      tag: 'ARRIVAL',
      title: 'Arrive & Coffee',
      desc: 'Free parking, step-free access, and a warm welcome. Grab a tea or coffee in the lounge before things kick off.',
      cardColor: 'bg-[#FFC700] text-black',
      badgeBg: 'bg-black text-white',
    },
    {
      num: '02',
      tag: 'GATHERING',
      title: 'Worship & Word',
      desc: '75 minutes of uplifting music, reflective prayer, and practical Bible teaching that speaks directly to everyday London life.',
      cardColor: 'bg-[#00D2FF] text-black',
      badgeBg: 'bg-black text-white',
    },
    {
      num: '03',
      tag: 'COMMUNITY',
      title: 'Connect & Mingle',
      desc: 'Stay a while afterwards. Meet our pastors, chat with locals, or ask questions at the welcome table without pressure.',
      cardColor: 'bg-[#16D958] text-black',
      badgeBg: 'bg-black text-white',
    },
    {
      num: '04',
      tag: 'NEXT STEPS',
      title: 'Find Your Place',
      desc: 'When you are ready, join a midweek Home Group, plug into a ministry, or partner with us in serving our Edgware community.',
      cardColor: 'bg-[#FF2E93] text-white',
      badgeBg: 'bg-white text-black',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0]" aria-labelledby="visit-guide-heading">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Row: Clean Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-black">
          <div className="space-y-2">
            <span className="px-3.5 py-1 bg-[#16D958] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
              ★ Your First Visit
            </span>
            <h2
              id="visit-guide-heading"
              className="font-display font-black text-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight"
            >
              What happens when I visit?
            </h2>
          </div>
          <div className="lg:max-w-md bg-white p-4 border-2 border-black rounded-xl text-black">
            <p className="font-mono text-xs font-bold leading-relaxed uppercase">
              Sundays last approx 75 minutes. Casual dress. Nobody will ask you to stand up or introduce yourself in front of people.
            </p>
          </div>
        </div>

        {/* 4 Numbered Pop Cards in Regulated Grid (No Shadows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className={`p-6 border-2 border-black rounded-2xl flex flex-col justify-between space-y-4 ${step.cardColor}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b-2 border-black/30 pb-3">
                  <span className={`px-2.5 py-1 font-mono text-xs font-black uppercase rounded-lg ${step.badgeBg}`}>
                    STEP {step.num}
                  </span>
                </div>
                <h3 className="font-display text-xl font-black uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="font-body text-sm font-medium leading-relaxed opacity-90">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Area: FAQ Accordion Matrix */}
        <div className="p-6 sm:p-8 bg-white border-2 border-black rounded-2xl space-y-8 text-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-black uppercase text-black bg-[#FFC700] px-2.5 py-1 rounded-md border border-black tracking-wider inline-block">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase">
                Got questions before your visit?
              </h3>
            </div>
            <CTAButton href="/contact" variant="primary" size="sm" showArrow>
              Ask Our Team Directly
            </CTAButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.question}
                  className="bg-[#FAF7F0] border-2 border-black rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black bg-[#FAF7F0] hover:bg-white transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-black text-black uppercase tracking-tight pr-4">
                      {item.question}
                    </span>
                    <span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#FFC700] group-hover:text-black transition-colors">
                      {isOpen ? (
                        <Minus className="h-4 w-4 stroke-[3]" />
                      ) : (
                        <Plus className="h-4 w-4 stroke-[3]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-2 border-t-2 border-black bg-white text-sm font-body text-neutral-800 font-medium leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
