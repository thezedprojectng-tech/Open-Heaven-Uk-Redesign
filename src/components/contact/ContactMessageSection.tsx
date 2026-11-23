'use client';

import React, { useState } from 'react';
import { submitContactForm } from '@/lib/actions/forms';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

export function ContactMessageSection() {
  const shouldReduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitContactForm(formData);
    setLoading(false);

    if (res.success) {
      setFeedback({ success: true, message: res.message || 'Thank you! Your message has been sent.' });
      (e.target as HTMLFormElement).reset();
    } else {
      setFeedback({ success: false, message: res.error || 'Failed to send message. Please try again.' });
    }
  }

  return (
    <section
      id="message-section"
      className="w-full py-16 sm:py-24 border-t-2 border-black bg-[#FAF7F0] text-black"
      aria-labelledby="contact-form-heading"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Description (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            <span className="px-3.5 py-1.5 bg-[#FFC700] text-black border-2 border-black font-mono text-xs font-black uppercase tracking-wider rounded-full inline-block">
              ★ SAY HELLO
            </span>

            <h2
              id="contact-form-heading"
              className="font-display font-black text-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] uppercase"
            >
              Send us a message.
            </h2>

            <p className="font-body text-base text-black font-medium leading-relaxed max-w-md">
              Whether you need prayer, have questions about faith, or want to connect with our pastoral team, we’d love to hear from you.
            </p>
          </motion.div>

          {/* Right Column: Form (7 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6">
              {feedback && (
                <div
                  className={`p-4 rounded-xl border-2 border-black flex items-center gap-3 font-mono text-xs font-black uppercase ${
                    feedback.success ? 'bg-[#16D958] text-black' : 'bg-[#FF2E93] text-white'
                  }`}
                  role="alert"
                >
                  {feedback.success ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block font-mono text-xs font-black uppercase text-black">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#FAF7F0] text-black border-2 border-black rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block font-mono text-xs font-black uppercase text-black">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-[#FAF7F0] text-black border-2 border-black rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block font-mono text-xs font-black uppercase text-black">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="General inquiry, prayer request, home groups..."
                    className="w-full px-4 py-3 bg-[#FAF7F0] text-black border-2 border-black rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block font-mono text-xs font-black uppercase text-black">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we help or pray for you today?"
                    className="w-full px-4 py-3 bg-[#FAF7F0] text-black border-2 border-black rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-body font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
