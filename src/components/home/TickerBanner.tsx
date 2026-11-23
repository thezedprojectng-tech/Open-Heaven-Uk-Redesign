'use client';

import React from 'react';

const ITEMS = [
  'Come as you are',
  'Sundays at 10:30 AM',
  'Edgware, London',
  'Find your people',
  'Children & Youth classes',
  'In-person & streaming online',
  'Everyone is welcome',
];

export function TickerBanner() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      className="w-full bg-[#FFC700] text-black border-y-2 border-black py-3.5 overflow-hidden select-none"
      role="region"
      aria-label="Church highlights scrolling marquee"
    >
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation-play-state: paused; }
        }
      `}</style>

      <div className="ticker-track flex items-center gap-0 whitespace-nowrap will-change-transform w-max">
        {track.map((item, i) => (
          <React.Fragment key={i}>
            <span className="font-display text-sm sm:text-base font-black tracking-tight px-6 uppercase text-black">
              {item}
            </span>
            <span className="text-black font-black text-sm select-none px-2" aria-hidden="true">
              ★
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
