'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

type Role = 'restaurant' | 'planner';

const FIELDS = [
  { key: 'fullName', label: 'Full name', type: 'text', placeholder: 'Jordan Avery', autoComplete: 'name' },
  { key: 'email', label: 'Work email', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
  { key: 'company', label: 'Company', type: 'text', placeholder: 'Company name', autoComplete: 'organization' },
  { key: 'title', label: 'Title', type: 'text', placeholder: 'Your role', autoComplete: 'organization-title' },
] as const;

type FormState = Record<(typeof FIELDS)[number]['key'], string>;

const EMPTY: FormState = { fullName: '', email: '', company: '', title: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EarlyAccess() {
  const [role, setRole] = useState<Role>('restaurant');
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hero / track CTAs preset the role and scroll here.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Role;
      if (detail === 'restaurant' || detail === 'planner') setRole(detail);
    };
    window.addEventListener('pdr:role', handler);
    return () => window.removeEventListener('pdr:role', handler);
  }, []);

  const set = (key: keyof FormState, value: string) => {
    if (error) setError('');
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const missing = FIELDS.filter((f) => !form[f.key].trim());
    if (missing.length) {
      setError('Please fill in every field.');
      return;
    }
    if (!EMAIL_RE.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    // Front-end only: simulate a request. Wire to the real endpoint later.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    setForm(EMPTY);
  };

  return (
    <section id="access" className="relative overflow-hidden py-14 md:py-18">
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2400)",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Pitch */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Early access</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.92] text-white">
              Hold your <span className="font-serif-accent lowercase text-gold">seat.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
              We&apos;re onboarding founding members in waves. Tell us who you are and we&apos;ll be
              in touch about your place in the next one.
            </p>
            <ul className="mt-8 space-y-3">
              {['Founding-member pricing', 'Priority onboarding & setup', 'Shape the product before launch'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <Icon icon="ph:check-circle" className="text-lg text-gold" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Form card — double bezel */}
          <div className="rounded-[2rem] bg-white/[0.05] p-1.5 ring-1 ring-white/12">
            <div className="rounded-[calc(2rem-0.375rem)] bg-ink-deep p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-xl md:p-9">
              {done ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                    <Icon icon="ph:check" className="text-3xl" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl uppercase text-white">You&apos;re on the list</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                    Thank you. We&apos;ll reach out about onboarding for the next founding-member wave.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-7 text-[11px] uppercase tracking-[0.25em] text-gold transition-colors hover:text-white"
                  >
                    Register someone else
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  {/* Role toggle */}
                  <p id="role-label" className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/60">
                    I am a…
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby="role-label"
                    className="mb-7 grid grid-cols-2 gap-1.5 rounded-full bg-black/40 p-1.5 ring-1 ring-white/10"
                  >
                    {(['restaurant', 'planner'] as Role[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        role="radio"
                        aria-checked={role === r}
                        onClick={() => setRole(r)}
                        className={`rounded-full py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          role === r ? 'bg-gold text-ink' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {r === 'restaurant' ? 'Restaurant' : 'Event planner'}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {FIELDS.map((f) => (
                      <div key={f.key} className={f.key === 'fullName' || f.key === 'email' ? 'sm:col-span-2' : ''}>
                        <label
                          htmlFor={f.key}
                          className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/55"
                        >
                          {f.label}
                        </label>
                        <input
                          id={f.key}
                          type={f.type}
                          autoComplete={f.autoComplete}
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={(e) => set(f.key, e.target.value)}
                          className="w-full rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition-colors duration-300 focus:border-gold"
                        />
                      </div>
                    ))}
                  </div>

                  {error && (
                    <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
                      <Icon icon="ph:warning-circle" className="text-base" />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold-deep active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Icon icon="ph:spinner" className="animate-spin text-base" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Request early access
                        <Icon
                          icon="ph:arrow-right"
                          className="text-base transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/60">
                    No spam · onboarding details only
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
