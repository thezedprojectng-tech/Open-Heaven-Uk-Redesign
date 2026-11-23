'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface LazyYouTubeFacadeProps {
  youtubeUrl: string;
  title: string;
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function LazyYouTubeFacade({ youtubeUrl, title }: LazyYouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeId(youtubeUrl);

  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-ink/80 border border-paper/10 flex items-center justify-center p-6 text-center">
        <p className="font-mono text-xs text-paper/60">
          Video broadcast recording available on YouTube.
        </p>
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video rounded overflow-hidden bg-ink border border-paper/15 shadow-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative w-full aspect-video rounded overflow-hidden bg-ink/60 border border-paper/15 group">
      {/* Poster image */}
      <Image
        src={thumbnailUrl}
        alt={`Video thumbnail for ${title}`}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors duration-300" />

      {/* Accessible Play Button */}
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        aria-label={`Play sermon recording: ${title}`}
        className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent text-on-accent flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
      >
        <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-current ml-1" aria-hidden="true" />
      </button>

      {/* Meta badge */}
      <div className="absolute bottom-3 left-3 bg-ink/90 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-paper/80 border border-paper/10 pointer-events-none">
        Click to Play (Loads on Demand)
      </div>
    </div>
  );
}
