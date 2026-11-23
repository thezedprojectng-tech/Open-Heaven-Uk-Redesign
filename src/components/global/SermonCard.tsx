import React from 'react';
import { Sermon } from '@/types';
import { formatDate } from '@/lib/utils';
import { Video, Calendar, User } from 'lucide-react';
import Link from 'next/link';

interface SermonCardProps {
  sermon: Sermon;
}

export function SermonCard({ sermon }: SermonCardProps) {
  // Extract YouTube ID if valid
  const videoIdMatch = sermon.youtube_url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';

  return (
    <article className="border border-border rounded-lg bg-card text-card-foreground overflow-hidden flex flex-col justify-between">
      {/* Video or Placeholder Container */}
      <div className="aspect-video w-full bg-muted/50 border-b border-border flex items-center justify-center relative">
        {videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={sermon.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Video className="h-8 w-8" aria-hidden="true" />
            <span className="text-xs">Video Stream Placeholder</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {formatDate(sermon.date)}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" aria-hidden="true" />
            {sermon.speaker}
          </span>
          {sermon.series_title && (
            <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-semibold">
              {sermon.series_title}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-foreground">{sermon.title}</h3>

        {sermon.notes && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {sermon.notes}
          </p>
        )}
      </div>

      <div className="p-6 pt-0 border-t border-border flex items-center justify-between text-xs">
        <a
          href={sermon.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:text-foreground"
        >
          Watch on YouTube ↗
        </a>
        {sermon.audio_url && (
          <a
            href={sermon.audio_url}
            className="font-medium underline hover:text-foreground"
          >
            Audio (MP3) ↓
          </a>
        )}
      </div>
    </article>
  );
}
