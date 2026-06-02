import { Icon } from '@iconify/react';
import { Fragment } from 'react';
import { COMING_SOON } from '@/lib/content';

/**
 * One set of items. Text and diamond separators alternate with a single
 * uniform gap, so every diamond sits exactly centered between two texts.
 * `pr-8` matches the gap so the spacing carries across the loop seam.
 */
function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {COMING_SOON.map((item, i) => (
        <Fragment key={i}>
          <span className="shrink-0 font-display text-xl uppercase tracking-tight text-white/60">
            {item}
          </span>
          <Icon icon="ph:diamond" className="shrink-0 text-[10px] text-gold/60" />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="border-y border-white/10 bg-ink-deep py-6">
      <p className="mb-5 text-center text-[10px] uppercase tracking-[0.4em] text-white/60">
        Launching in Toronto · coming soon to
      </p>
      <div className="relative overflow-hidden no-scrollbar" aria-hidden="true">
        {/* Two identical groups → translateX(-50%) loops seamlessly. */}
        <div className="flex w-max animate-marquee items-center">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-deep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-deep to-transparent" />
      </div>
    </section>
  );
}
