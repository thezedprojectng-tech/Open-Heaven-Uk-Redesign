import React from 'react';
import { Leader } from '@/types';
import { User } from 'lucide-react';

interface LeaderCardProps {
  leader: Leader;
}

export function LeaderCard({ leader }: LeaderCardProps) {
  return (
    <article className="border border-border rounded-lg p-6 bg-card text-card-foreground flex flex-col items-start gap-4">
      {/* Photo Placeholder */}
      <div className="w-20 h-20 rounded-full border border-border bg-muted flex items-center justify-center text-muted-foreground">
        <User className="h-10 w-10" aria-hidden="true" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">{leader.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {leader.role}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed pt-2">{leader.bio}</p>
      </div>
    </article>
  );
}
