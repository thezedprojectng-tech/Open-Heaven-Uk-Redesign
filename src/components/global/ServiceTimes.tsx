import React from 'react';
import { ServiceTime } from '@/types';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmptyState } from './EmptyState';

interface ServiceTimesProps {
  services: ServiceTime[];
  className?: string;
}

export function ServiceTimes({ services, className }: ServiceTimesProps) {
  if (!services || services.length === 0) {
    return (
      <EmptyState
        title="Service times currently unavailable"
        description="Please contact our church office directly or check back shortly for service times."
        className={className}
      />
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {services.map((service) => (
        <article
          key={service.id}
          className="border border-border rounded-lg p-6 bg-card text-card-foreground flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>
                {service.day_of_week}s · {service.start_time} - {service.end_time}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
            {service.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{service.venue}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
