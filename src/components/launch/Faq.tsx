'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';
import Reveal from './Reveal';
import { FAQS } from '@/lib/content';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-[1180px] px-6 py-14 md:px-12 md:py-18">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Questions</p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] uppercase leading-[0.95] text-white">
              Good to <span className="font-serif-accent lowercase text-gold">know.</span>
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-lg font-medium tracking-wide text-white md:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        isOpen ? 'rotate-45 border-gold/50 text-gold' : 'text-white/60'
                      }`}
                    >
                      <Icon icon="ph:plus" className="text-base" />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      isOpen ? 'grid-rows-[1fr] pb-7 opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
