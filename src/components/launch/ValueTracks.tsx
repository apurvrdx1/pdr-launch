'use client';

import { Icon } from '@iconify/react';
import Reveal from './Reveal';
import ShinyGoldButton from './ShinyGoldButton';
import { RESTAURANT_POINTS, PLANNER_POINTS } from '@/lib/content';

type Point = { icon: string; title: string; body: string };

function chooseRole(role: 'restaurant' | 'planner') {
  window.dispatchEvent(new CustomEvent('pdr:role', { detail: role }));
  document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' });
}

function PointCard({ point, delay }: { point: Point; delay: number }) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="rounded-[2rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10"
    >
      <div className="h-full rounded-[calc(2rem-0.375rem)] bg-ink-deep p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <Icon icon={point.icon} className="text-xl" />
        </span>
        <h3 className="mt-5 text-lg font-medium tracking-wide text-white">{point.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/85">{point.body}</p>
      </div>
    </Reveal>
  );
}

type TrackProps = {
  id: string;
  eyebrow: string;
  role: 'restaurant' | 'planner';
  title: React.ReactNode;
  intro: string;
  cta: string;
  image: string;
  points: Point[];
  flip?: boolean;
};

function Track({ id, eyebrow, role, title, intro, cta, image, points, flip }: TrackProps) {
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-6 py-14 md:px-12 md:py-18 lg:px-20">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Headline column */}
        <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(1.875rem,3.4vw,3.25rem)] uppercase leading-[0.98] text-white">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">{intro}</p>
            <ShinyGoldButton
              onClick={() => chooseRole(role)}
              className="mt-9 py-3 pl-6 pr-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            >
              {cta}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <Icon icon="ph:arrow-up-right" className="text-sm" />
              </span>
            </ShinyGoldButton>
          </Reveal>

          <Reveal delay={120} className="mt-10 overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <div
              className="relative aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Points bento */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <PointCard key={p.title} point={p} delay={i * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ValueTracks() {
  return (
    <>
      <Track
        id="restaurants"
        eyebrow="For Restaurants"
        role="restaurant"
        title={
          <>
            Fill the rooms
            <br />
            <span className="font-serif-accent lowercase text-gold">you already have.</span>
          </>
        }
        intro="Your private dining rooms are your highest-margin tables. PdR puts them in front of planners who book corporate and social events — and gives you six months to see the return before you commit."
        cta="List my restaurant"
        image="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600"
        points={RESTAURANT_POINTS}
      />

      <div className="mx-auto h-px max-w-[1180px] bg-white/10" />

      <Track
        id="planners"
        eyebrow="For Planners"
        role="planner"
        title={
          <>
            Source venues
            <br />
            <span className="font-serif-accent lowercase text-gold">in an afternoon.</span>
          </>
        }
        intro="Stop chasing availability across a dozen inboxes. Search by what actually matters — city, date, capacity, seated or standing, budget — compare rooms side by side, and inquire with the details already in hand."
        cta="Get planner access"
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600"
        points={PLANNER_POINTS}
        flip
      />
    </>
  );
}
