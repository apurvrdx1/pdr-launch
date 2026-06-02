'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { HERO_IMAGES } from '@/lib/content';

/** Preset the early-access role and scroll to the form. */
function chooseRole(role: 'restaurant' | 'planner') {
  window.dispatchEvent(new CustomEvent('pdr:role', { detail: role }));
  document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
    >
      {/* Background photography */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              i === slide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      </div>

      {/* Decorative vertical grid lines */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden justify-between px-12 opacity-[0.08] md:flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-full w-px bg-white" />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pb-16 pt-36 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Early access · founding members
            </span>

            <h1 className="text-shadow-lux mt-7 font-display text-[clamp(1.5rem,4.5vw,4.25rem)] uppercase text-white">
              Private dining,
              <br />
              <span className="font-serif-accent lowercase text-gold">finally</span> on one table.
            </h1>

            <p className="text-shadow-lux mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              PdR is where the world&apos;s private dining rooms meet the people who book them.
              Restaurants list their rooms. Planners discover, compare, and book — without the
              endless email chains.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => chooseRole('restaurant')}
                className="group flex items-center justify-between gap-3 rounded-full bg-gold py-3.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold-deep active:scale-[0.98]"
              >
                I run a restaurant
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <Icon icon="ph:arrow-up-right" className="text-base" />
                </span>
              </button>
              <button
                onClick={() => chooseRole('planner')}
                className="group flex items-center justify-between gap-3 rounded-full border border-white/30 bg-white/[0.03] py-3.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/60 active:scale-[0.98]"
              >
                I plan events
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <Icon icon="ph:arrow-up-right" className="text-base" />
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <div className="max-w-xs border-l border-white/25 pl-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">By The Creative Connoisseur</p>
              <p className="text-shadow-lux mt-3 text-sm leading-relaxed text-white/80">
                Built by event producers behind private dinners and parties for the world&apos;s
                most demanding clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pb-8 md:px-12 lg:px-20">
        <div className="flex gap-2">
          {HERO_IMAGES.map((img, i) => (
            <button
              key={img}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-0.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                i === slide ? 'w-10 bg-gold' : 'w-5 bg-white/30'
              }`}
            />
          ))}
        </div>
        <span className="text-shadow-lux flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/75">
          Scroll <Icon icon="ph:arrow-down" className="text-sm" />
        </span>
      </div>
    </section>
  );
}
