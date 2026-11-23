import React from 'react';
import Link from 'next/link';
import { Ministry } from '@/types';
import { Clock, MapPin } from 'lucide-react';

interface MinistryCardProps {
  ministry: Ministry;
}

export function MinistryCard({ ministry }: MinistryCardProps) {
  return (
    <article className="border border-border rounded-lg p-6 bg-card text-card-foreground flex flex-col justify-between hover:border-foreground/30 transition-colors">
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-foreground">
          <Link href={`/ministries/${ministry.slug}`} className="hover:underline">
            {ministry.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {ministry.description}
        </p>

        <div className="space-y-1.5 pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{ministry.times}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{ministry.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Link
          href={`/ministries/${ministry.slug}`}
          className="text-xs font-semibold text-foreground underline hover:opacity-80"
        >
          Learn more &amp; join →
        </Link>
      </div>
    </article>
  );
}
