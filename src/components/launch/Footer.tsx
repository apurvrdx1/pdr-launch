import { Icon } from '@iconify/react';
import { Wordmark } from './Nav';

const SOCIAL = [
  { icon: 'ph:instagram-logo', href: '#', label: 'Instagram' },
  { icon: 'ph:linkedin-logo', href: '#', label: 'LinkedIn' },
  { icon: 'ph:envelope-simple', href: 'mailto:hello@the-cc.ca', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-deep">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              The private-dining marketplace. List your rooms, or find the perfect one — without the
              endless email chains.
            </p>
            <a
              href="#access"
              className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:text-white"
            >
              Request early access <Icon icon="ph:arrow-up-right" className="text-sm" />
            </a>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-white/55">
              <a href="#restaurants" className="transition-colors hover:text-white">Restaurants</a>
              <a href="#planners" className="transition-colors hover:text-white">Planners</a>
              <a href="#how" className="transition-colors hover:text-white">How it works</a>
              <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
            </nav>
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-gold/50 hover:text-gold"
                >
                  <Icon icon={s.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-[10px] uppercase tracking-[0.2em] text-white/35 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} PdR · The Creative Connoisseur</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white/70">Privacy</a>
            <a href="#" className="transition-colors hover:text-white/70">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
