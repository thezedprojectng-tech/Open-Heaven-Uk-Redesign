'use client';

import React, { useState } from 'react';
import { Sermon } from '@/types';
import { ArrowRight, Play, Volume2, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface MessagesPlayerSectionProps {
  sermons: Sermon[];
}

export function MessagesPlayerSection({ sermons }: MessagesPlayerSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedSermon, setSelectedSermon] = useState<Sermon>(
    sermons[0] || {
      id: '1',
      title: 'Finding Your Way Home',
      slug: 'finding-your-way-home',
      date: '2026-11-01',
      series_title: 'The Long Road Back',
      speaker: 'Pastor Michael',
      scripture: 'Luke 15:11, 32',
      duration: '34 min',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: 'What the story of the prodigal son says to anyone who wonders if it’s too late to come back.',
      is_featured: true,
      status: 'published',
    }
  );

  const [activeMedia, setActiveMedia] = useState<'video' | 'audio' | null>(null);

  // Filter list of recent sermons (excluding or highlighting the current selected)
  const recentList = sermons.length > 1 ? sermons.slice(1, 5) : [
    {
      id: '2',
      title: 'Faith in Ordinary Life',
      slug: 'faith-in-ordinary-life',
      speaker: 'Pastor Michael',
      duration: '29 min',
      date: '2026-10-25',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      is_featured: false,
      status: 'published' as const,
    },
    {
      id: '3',
      title: 'The Courage to Begin',
      slug: 'the-courage-to-begin',
      speaker: 'Pastor Michael',
      duration: '31 min',
      date: '2026-10-18',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      is_featured: false,
      status: 'published' as const,
    },
    {
      id: '4',
      title: 'Hope for the Journey',
      slug: 'hope-for-the-journey',
      speaker: 'Guest Speaker',
      duration: '37 min',
      date: '2026-10-11',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      is_featured: false,
      status: 'published' as const,
    },
  ];

  function formatDisplayDate(dateStr: string) {
    if (!dateStr) return 'Nov 1, 2026';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  // Extract YouTube ID if valid
  function getYouTubeId(url: string) {
    if (!url) return 'dQw4w9WgXcQ';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : 'dQw4w9WgXcQ';
  }

  return (
    <section
      id="latest-message"
      className="w-full bg-[var(--paper)] text-paper-on-dark py-16 sm:py-24 relative overflow-hidden"
      aria-labelledby="player-section-heading"
    >
      {/* Subtle warm ambient glow behind dark container */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Latest / Selected Message (7 cols) */}
          <motion.div
            key={selectedSermon.id}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Meta Kicker */}
            <div className="space-y-2">
              <span className="font-mono-meta text-xs text-accent font-semibold tracking-widest block">
                01 &middot; LATEST MESSAGE
              </span>
              <p className="font-body text-sm sm:text-base text-muted-on-dark font-medium">
                {selectedSermon.series_title || 'The Long Road Back'}
              </p>
            </div>

            {/* Sermon Title */}
            <h2
              id="player-section-heading"
              className="font-display font-bold text-paper-on-dark text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.12]"
            >
              {selectedSermon.title}
            </h2>

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-xs sm:text-sm text-muted-on-dark">
              <span className="font-medium text-paper-on-dark/90">{selectedSermon.speaker || 'Pastor Michael'}</span>
              <span className="text-muted" aria-hidden="true">&middot;</span>
              <span>{formatDisplayDate(selectedSermon.date)}</span>
              {selectedSermon.scripture && (
                <>
                  <span className="text-muted" aria-hidden="true">&middot;</span>
                  <span>{selectedSermon.scripture}</span>
                </>
              )}
              {selectedSermon.duration && (
                <>
                  <span className="text-muted" aria-hidden="true">&middot;</span>
                  <span>{selectedSermon.duration}</span>
                </>
              )}
            </div>

            {/* Sermon Description */}
            <p className="font-body text-sm sm:text-base text-paper-on-dark/90 leading-relaxed max-w-2xl">
              {selectedSermon.notes ||
                'What the story of the prodigal son says to anyone who wonders if it is too late to come back.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveMedia(activeMedia === 'video' ? null : 'video')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-on-accent font-medium text-xs sm:text-sm hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all shadow-md group cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                <span>{activeMedia === 'video' ? 'Hide Video' : 'Watch Message'}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setActiveMedia(activeMedia === 'audio' ? null : 'audio')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-line-on-dark bg-surface-dark text-paper-on-dark font-medium text-xs sm:text-sm hover:bg-surface-dark hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer"
              >
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                <span>{activeMedia === 'audio' ? 'Hide Audio' : 'Listen to Audio'}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>

            {/* Expandable Embedded Video Player */}
            {activeMedia === 'video' && (
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="pt-4 overflow-hidden"
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-line-on-dark bg-ink shadow-2xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(
                      selectedSermon.youtube_url
                    )}?autoplay=1&rel=0`}
                    title={`Video broadcast: ${selectedSermon.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => setActiveMedia(null)}
                    aria-label="Close video player"
                    className="absolute top-3 right-3 p-2 rounded-full bg-ink/70 hover:bg-ink text-paper-on-dark transition-colors"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Expandable Audio Player */}
            {activeMedia === 'audio' && (
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-xl border border-line-on-dark bg-surface-dark/90 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span className="text-xs font-semibold text-paper-on-dark">Audio Podcast Broadcast</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveMedia(null)}
                    aria-label="Close audio player"
                    className="text-muted-on-dark hover:text-paper-on-dark"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <audio
                  controls
                  className="w-full h-10 accent-accent"
                  src={selectedSermon.audio_url || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
                >
                  Your browser does not support the audio element.
                </audio>
                <p className="text-[11px] text-muted-on-dark">
                  Audio streaming powered by Open Heavens Media. Full recordings also available on Spotify &amp; Apple Podcasts.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Recent Messages (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:pt-2">
            <span className="font-mono-meta text-xs text-muted-on-dark font-semibold tracking-wider block uppercase">
              RECENT MESSAGES
            </span>

            <div className="divide-y divide-line-on-dark border-y border-line-on-dark">
              {recentList.map((sermon) => {
                const isSelected = selectedSermon.id === sermon.id;
                return (
                  <button
                    key={sermon.id}
                    type="button"
                    onClick={() => {
                      setSelectedSermon(sermon);
                      setActiveMedia(null);
                    }}
                    className={`w-full text-left py-5 group transition-colors flex items-center justify-between gap-4 cursor-pointer ${
                      isSelected ? 'opacity-100 text-paper-on-dark' : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div className="space-y-1">
                      <h3
                        className={`font-display text-base sm:text-lg font-bold transition-colors ${
                          isSelected ? 'text-accent' : 'text-paper-on-dark group-hover:text-accent'
                        }`}
                      >
                        {sermon.title}
                      </h3>
                      <p className="font-mono-meta text-xs text-muted-on-dark">
                        {sermon.speaker || 'Pastor Michael'} &middot; {sermon.duration || '30 min'}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                      <ArrowRight
                        className={`h-4 w-4 transition-transform group-hover:translate-x-1.5 ${
                          isSelected ? 'text-accent' : 'text-muted group-hover:text-paper-on-dark'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
