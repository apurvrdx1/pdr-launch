'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '../../../public/logo.png';
import ShinyGoldButton from './ShinyGoldButton';

const LINKS = [
  { label: 'For Restaurants', href: '#restaurants' },
  { label: 'For Planners', href: '#planners' },
  { label: 'How it works', href: '#how' },
  { label: 'FAQ', href: '#faq' },
];

export function Wordmark({ className = '', height = 30 }: { className?: string; height?: number }) {
  return (
    <a href="#top" aria-label="PdR — Private Dining Room" className={`inline-flex ${className}`}>
      <Image
        src={logo}
        alt="PdR — Private Dining Room"
        height={height}
        style={{ height, width: 'auto' }}
        priority
      />
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav
          className={`mt-4 flex w-full max-w-[1180px] items-center justify-between rounded-full border border-white/12 px-5 py-3 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:px-7 ${
            scrolled ? 'bg-black/60 shadow-[0_18px_50px_rgba(0,0,0,0.55)]' : 'bg-black/30'
          }`}
        >
          <Wordmark />

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 transition-colors duration-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ShinyGoldButton
              href="#access"
              className="hidden py-2 pl-5 pr-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:inline-flex"
              contentClassName="gap-2"
            >
              Request access
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <Icon icon="ph:arrow-up-right" className="text-sm" />
              </span>
            </ShinyGoldButton>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? 'rotate-45' : '-translate-y-1'
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? '-rotate-45' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-black/85 px-8 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            className={`font-display text-5xl tracking-tight text-white/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {l.label}
          </a>
        ))}
        <ShinyGoldButton
          href="#access"
          onClick={() => setOpen(false)}
          style={{ transitionDelay: open ? `${120 + LINKS.length * 60}ms` : '0ms' }}
          className={`mt-8 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Request early access
        </ShinyGoldButton>
      </div>
    </>
  );
}
