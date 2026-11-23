'use client';

import React, { useState } from 'react';
import { ServiceTime } from '@/types';
import { motion, useReducedMotion } from 'motion/react';
import { Video, MapPin, Clock } from 'lucide-react';

interface WeekSlot {
  id: string;
  name: string;
  day: string; // 'Monday' | 'Tuesday' | ...
  dayIndex: number; // 0 = Mon, 6 = Sun
  startTime: string;
  endTime: string;
  startHour: number; // For vertical placement on time axis (e.g. 10.5 for 10:30)
  durationHours: number;
  location: string;
  isOnline: boolean;
  description: string;
}

interface WeekPlanProps {
  serviceTimes: ServiceTime[];
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const FULL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function WeekPlan({ serviceTimes }: WeekPlanProps) {
  const shouldReduceMotion = useReducedMotion();

  // Convert service times into slot coordinates on time axis (8:00 to 23:00)
  const slots: WeekSlot[] = serviceTimes.map((service) => {
    const dayIdx = FULL_DAYS.indexOf(service.day_of_week);
    const [startH, startM] = service.start_time.split(':').map(Number);
    const [endH, endM] = service.end_time.split(':').map(Number);

    const startDecimal = (startH || 10) + (startM || 0) / 60;
    let endDecimal = (endH || 12) + (endM || 0) / 60;
    if (endDecimal < startDecimal) endDecimal += 24; // overnight services like Night of Overflow

    const isOnline =
      service.venue.toLowerCase().includes('online') ||
      service.venue.toLowerCase().includes('livestream') ||
      service.description.toLowerCase().includes('online');

    return {
      id: service.id,
      name: service.title,
      day: service.day_of_week,
      dayIndex: dayIdx >= 0 ? dayIdx : 6,
      startTime: service.start_time,
      endTime: service.end_time,
      startHour: startDecimal,
      durationHours: Math.max(endDecimal - startDecimal, 1.5),
      location: service.venue,
      isOnline,
      description: service.description,
    };
  });

  // Default selected slot is the Sunday service
  const initialSlot = slots.find((s) => s.day === 'Sunday') || slots[0] || null;
  const [activeSlot, setActiveSlot] = useState<WeekSlot | null>(initialSlot);

  // Time axis reference bounds: 8:00 (0%) to 24:00 (100%)
  const minHour = 8;
  const maxHour = 24;
  const totalHours = maxHour - minHour;

  return (
    <section
      className="w-full bg-surface rounded-panel p-6 sm:p-10 lg:p-12 border border-line"
      aria-labelledby="week-plan-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-line pb-6">
        <div>
          <span className="font-mono-meta text-[11px] text-muted block mb-1">
            001 / Single Source of Truth
          </span>
          <h2 id="week-plan-heading" className="font-display text-3xl sm:text-4xl text-ink">
            The Plan of the <em>Week</em>
          </h2>
        </div>
        <p className="font-mono-meta text-[11px] text-muted max-w-xs">
          Select or hover any gathering to view schedule, location, and online broadcast access.
        </p>
      </div>

      {/* Desktop & Tablet: Hairline 7-Day Drawing Plan */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 items-start">
        {/* The 7 Day Columns Grid (9 cols) */}
        <div className="md:col-span-8 lg:col-span-9 relative">
          {/* Animated SVG Hairlines Drawing */}
          <div className="w-full h-12 grid grid-cols-7 border-b border-line pb-2 mb-2">
            {DAYS.map((day, idx) => (
              <div key={day} className="text-center font-mono-meta text-xs text-ink/80">
                {day}
                <span className="text-[9px] text-muted block lowercase">
                  {FULL_DAYS[idx].slice(0, 3)}
                </span>
              </div>
            ))}
          </div>

          {/* Time axis container (height 380px) */}
          <div className="relative h-[380px] w-full grid grid-cols-7 border-l border-r border-line">
            {/* Background horizontal guide lines */}
            {[10, 14, 18, 22].map((hour) => {
              const topPercent = ((hour - minHour) / totalHours) * 100;
              return (
                <div
                  key={hour}
                  className="absolute inset-x-0 border-t border-line/40 pointer-events-none flex items-center justify-end pr-2"
                  style={{ top: `${topPercent}%` }}
                >
                  <span className="font-mono text-[9px] text-muted select-none">
                    {hour}:00
                  </span>
                </div>
              );
            })}

            {/* Vertical day column dividers drawn with SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <motion.line
                  key={col}
                  x1={`${(col / 7) * 100}%`}
                  y1="0%"
                  x2={`${(col / 7) * 100}%`}
                  y2="100%"
                  stroke="var(--line)"
                  strokeWidth="1.5"
                  initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </svg>

            {/* Day columns slots container */}
            {DAYS.map((_, dayColIdx) => {
              const daySlots = slots.filter((s) => s.dayIndex === dayColIdx);

              return (
                <div key={dayColIdx} className="relative h-full px-1">
                  {daySlots.map((slot) => {
                    const topPercent = Math.min(
                      Math.max(((slot.startHour - minHour) / totalHours) * 100, 2),
                      85
                    );
                    const heightPercent = Math.min(
                      (slot.durationHours / totalHours) * 100,
                      35
                    );
                    const isSelected = activeSlot?.id === slot.id;

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setActiveSlot(slot)}
                        onMouseEnter={() => setActiveSlot(slot)}
                        onFocus={() => setActiveSlot(slot)}
                        className={`absolute inset-x-1 border border-ink/40 rounded p-1.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          isSelected
                            ? 'bg-accent/25 border-accent text-ink font-medium shadow-none'
                            : 'bg-paper/70 hover:bg-accent/15 text-ink'
                        }`}
                        style={{
                          top: `${topPercent}%`,
                          height: `${Math.max(heightPercent, 14)}%`,
                        }}
                        aria-label={`${slot.name} on ${slot.day} at ${slot.startTime}`}
                      >
                        <span className="block font-mono text-[10px] leading-tight text-ink/70">
                          {slot.startTime}
                        </span>
                        <span className="block text-xs font-medium font-body leading-tight truncate">
                          {slot.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="pt-3 flex items-center justify-between text-muted">
            <span className="font-mono-meta text-[10px]">
              Single Source: live church schedule from database
            </span>
            <span className="font-mono-meta text-[10px]">Time axis: 08:00 to 24:00 GMT</span>
          </div>
        </div>

        {/* Selected Slot Information Aside (3-4 cols) */}
        <aside
          className="md:col-span-4 lg:col-span-3 border border-line rounded-lg p-5 bg-paper space-y-4"
          aria-live="polite"
        >
          {activeSlot ? (
            <div className="space-y-3">
              <div>
                <span className="font-mono-meta text-[10px] text-accent block">
                  {activeSlot.day.toUpperCase()} · {activeSlot.startTime} to {activeSlot.endTime}
                </span>
                <h3 className="font-display text-xl font-medium text-ink leading-tight pt-1">
                  {activeSlot.name}
                </h3>
              </div>

              <div className="space-y-2 pt-2 border-t border-line text-xs font-body text-muted">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-ink shrink-0" aria-hidden="true" />
                  <span>{activeSlot.location}</span>
                </p>

                {activeSlot.isOnline && (
                  <p className="flex items-center gap-2 text-ink font-medium">
                    <Video className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                    <span>Broadcast online via live stream</span>
                  </p>
                )}
              </div>

              {activeSlot.description && (
                <p className="text-xs font-body text-ink/80 leading-relaxed pt-2 border-t border-line/60">
                  {activeSlot.description}
                </p>
              )}
            </div>
          ) : (
            <p className="font-mono text-xs text-muted">Select a gathering on the plan.</p>
          )}
        </aside>
      </div>

      {/* Mobile Day-by-Day List with Hover/Tap Behaviour */}
      <div className="md:hidden space-y-3">
        {FULL_DAYS.map((fullDay) => {
          const daySlots = slots.filter((s) => s.day === fullDay);
          if (daySlots.length === 0) return null;

          return (
            <div key={fullDay} className="border border-line rounded bg-paper/60 p-3 space-y-2">
              <span className="font-mono-meta text-[11px] text-ink block font-medium">
                {fullDay}
              </span>
              <div className="space-y-2">
                {daySlots.map((slot) => {
                  const isSelected = activeSlot?.id === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setActiveSlot(slot)}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        isSelected
                          ? 'bg-accent/20 border-accent'
                          : 'bg-paper border-line hover:bg-accent/10'
                      }`}
                      aria-label={`${slot.name} at ${slot.startTime}`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-muted mb-1">
                        <span>
                          {slot.startTime} to {slot.endTime}
                        </span>
                        {slot.isOnline && (
                          <span className="text-[10px] text-ink font-semibold uppercase">
                            Online
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-base font-medium text-ink leading-tight">
                        {slot.name}
                      </h4>
                      <p className="text-xs text-muted pt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3 inline" aria-hidden="true" />
                        <span>{slot.location}</span>
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Selected Slot Information Beneath on Mobile */}
        {activeSlot && (
          <aside className="border border-line rounded-lg p-4 bg-paper space-y-2 mt-4" aria-live="polite">
            <span className="font-mono-meta text-[10px] text-accent block">
              {activeSlot.day} {activeSlot.startTime} to {activeSlot.endTime}
            </span>
            <h4 className="font-display text-lg font-medium text-ink">{activeSlot.name}</h4>
            <p className="text-xs text-muted">{activeSlot.location}</p>
            {activeSlot.description && (
              <p className="text-xs text-ink/80 pt-1 leading-relaxed border-t border-line/60">
                {activeSlot.description}
              </p>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
