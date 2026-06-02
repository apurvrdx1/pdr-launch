import Reveal from './Reveal';
import { STEPS } from '@/lib/content';

export default function HowItWorks() {
  return (
    <section id="how" className="bg-ink-deep py-14 md:py-18">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">How it works</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4.25rem)] uppercase leading-[0.95] text-white">
            Three steps to <span className="font-serif-accent lowercase text-gold">the table.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] ring-1 ring-white/10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.no}
              delay={i * 110}
              className="relative bg-white/[0.03] p-9 md:p-11"
            >
              <span className="font-display text-6xl text-white/55">{step.no}</span>
              <h3 className="mt-5 text-xl font-medium tracking-wide text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
