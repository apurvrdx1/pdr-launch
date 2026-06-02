import { Icon } from '@iconify/react';
import Reveal from '@/components/launch/Reveal';
import ShinyGoldButton from '@/components/launch/ShinyGoldButton';
import { RESTAURANT_POINTS, PLANNER_POINTS } from '@/lib/content';

export const metadata = { title: 'PdR — Layout exploration' };

type Point = { icon: string; title: string; body: string };

function PointCard({ point, delay }: { point: Point; delay: number }) {
  return (
    <Reveal as="article" delay={delay} className="rounded-[1.75rem] bg-white/[0.04] p-1.5 ring-1 ring-white/10">
      <div className="h-full rounded-[calc(1.75rem-0.375rem)] bg-ink-deep p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
          <Icon icon={point.icon} className="text-lg" />
        </span>
        <h3 className="mt-4 text-base font-medium tracking-wide text-white">{point.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{point.body}</p>
      </div>
    </Reveal>
  );
}

type TrackProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  cta: string;
  image: string;
  points: Point[];
  flip?: boolean;
};

/** Media split: content (headline + CTA + 2x2 points) beside a full-height photo. */
function MediaSplitTrack({ eyebrow, title, intro, cta, image, points, flip }: TrackProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 md:px-12 md:py-18 lg:px-20">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Content column */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(1.875rem,3.4vw,3.25rem)] uppercase leading-[0.98] text-white">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">{intro}</p>
            <ShinyGoldButton className="mt-8 py-3 pl-6 pr-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
              {cta}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <Icon icon="ph:arrow-up-right" className="text-sm" />
              </span>
            </ShinyGoldButton>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <PointCard key={p.title} point={p} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* Full-height photo column */}
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
          <Reveal delay={120} className="h-full">
            <div
              className="relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] bg-cover bg-center ring-1 ring-white/10"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-ink">
      {/* Prototype banner */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-ink-deep/90 px-6 py-3 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <span className="font-display text-lg tracking-tight text-white">
            P<span className="font-serif-accent text-gold">d</span>R
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Layout exploration · Media split
          </span>
          <a
            href="../"
            className="text-[10px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
          >
            ← Back to site
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pt-12 md:px-12 lg:px-20">
        <p className="max-w-2xl text-sm leading-relaxed text-white/60">
          Prototype: the photo fills its column to match the content height, so the
          points and image stay balanced on wide screens — no dead zone. Restaurants =
          photo right; Planners = photo left (mirrored). View at desktop width.
        </p>
      </div>

      <MediaSplitTrack
        eyebrow="For Restaurants"
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

      <MediaSplitTrack
        eyebrow="For Planners"
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

      <div className="h-24" />
    </main>
  );
}
