import { Icon } from '@iconify/react';
import { CREDIBILITY } from '@/lib/content';

export default function Marquee() {
  const items = [...CREDIBILITY, ...CREDIBILITY];
  return (
    <section className="border-y border-white/10 bg-ink-deep py-6">
      <p className="mb-5 text-center text-[10px] uppercase tracking-[0.4em] text-white/60">
        Born from real private-event production
      </p>
      <div className="relative overflow-hidden no-scrollbar" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-3 font-display text-xl uppercase tracking-tight text-white/60"
            >
              {item}
              <Icon icon="ph:diamond" className="text-[10px] text-gold/60" />
            </span>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-deep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-deep to-transparent" />
      </div>
    </section>
  );
}
