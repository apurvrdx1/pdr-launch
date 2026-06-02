'use client';

import { Icon } from '@iconify/react';
import { Tabs } from '@ark-ui/react/tabs';
import { useEffect, useRef, useState } from 'react';
import ShinyGoldButton from './ShinyGoldButton';

type Role = 'restaurant' | 'planner';

type FieldDef = {
  key: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  /** Span both columns. */
  full?: boolean;
};

// Role-specific intake fields. NOTE: these keys don't match the existing
// submitConsultation API shape — see the PORTING NOTE in submit() before wiring.
const FIELDS_BY_ROLE: Record<Role, FieldDef[]> = {
  restaurant: [
    { key: 'city', label: 'City', type: 'text', placeholder: 'Toronto', autoComplete: 'address-level2', full: true },
    { key: 'restaurantName', label: 'Restaurant name', type: 'text', placeholder: 'Your restaurant', autoComplete: 'organization', full: true },
    { key: 'contactName', label: 'Primary contact name', type: 'text', placeholder: 'Jordan Avery', autoComplete: 'name' },
    { key: 'email', label: 'Contact email', type: 'email', placeholder: 'you@restaurant.com', autoComplete: 'email' },
    { key: 'phone', label: 'Phone number', type: 'tel', placeholder: '(555) 000-0000', autoComplete: 'tel', full: true },
  ],
  planner: [
    { key: 'city', label: 'City', type: 'text', placeholder: 'Toronto', autoComplete: 'address-level2', full: true },
    { key: 'company', label: 'Agency / company', type: 'text', placeholder: 'Your agency', autoComplete: 'organization', full: true },
    { key: 'fullName', label: 'Full name', type: 'text', placeholder: 'Jordan Avery', autoComplete: 'name' },
    { key: 'email', label: 'Work email', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
    { key: 'phone', label: 'Phone number', type: 'tel', placeholder: '(555) 000-0000', autoComplete: 'tel', full: true },
  ],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EarlyAccess() {
  const [role, setRole] = useState<Role>('restaurant');
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const fields = FIELDS_BY_ROLE[role];

  // Hero / track CTAs preset the role and scroll here.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Role;
      if (detail === 'restaurant' || detail === 'planner') setRole(detail);
    };
    window.addEventListener('pdr:role', handler);
    return () => window.removeEventListener('pdr:role', handler);
  }, []);

  const set = (key: string, value: string) => {
    if (error) setError('');
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const missing = fields.filter((f) => !(form[f.key] || '').trim());
    if (missing.length) {
      setError('Please fill in every field.');
      return;
    }
    if (!EMAIL_RE.test(form.email || '')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    // ───────────────────────────────────────────────────────────────────────
    // PORTING NOTE — for the agent/harness moving this into the main PdR repo.
    //
    // This form is FRONT-END ONLY. The block below just simulates a request.
    // To make it capture real submissions, replace the setTimeout with the
    // existing service in the Customer codebase:
    //
    //   pdrConsultationService.submitConsultation(payload)   // src/lib/api/pdr-consultation
    //
    // ⚠️ FIELD-SHAPE MISMATCH: that endpoint currently expects
    //   { userType, fullName, email, companyName, title }
    // but this form now collects ROLE-SPECIFIC fields (see FIELDS_BY_ROLE):
    //   restaurant -> { city, restaurantName, contactName, email, phone }
    //   planner    -> { city, company, fullName, email, phone }
    //
    // Pick ONE before wiring:
    //   (A) PREFERRED — extend the API/Mongo schema (and the admin views) to
    //       persist the new fields (city, phone, restaurantName/contactName).
    //       Don't silently drop city/phone — they're the point of this form.
    //   (B) STOPGAP — map onto the existing shape and accept data loss:
    //         userType    = role
    //         companyName = restaurant ? restaurantName : company
    //         fullName    = restaurant ? contactName   : fullName
    //         title       = ''                 // not collected here
    //         // city + phone have NOWHERE to go under (B) — they'd be lost.
    //
    // Also: add real error handling here (try/catch around the call, surface
    // err -> setError) — right now the happy path is assumed.
    // ───────────────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 900));

    setSubmitting(false);
    setDone(true);
    setForm({});
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
            <h2 className="mt-5 font-display text-[clamp(1.875rem,3.4vw,3.25rem)] uppercase leading-[0.98] text-white">
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
                  {/* Role selector — underline tabs (Ark UI), controlled by `role` */}
                  <p id="role-label" className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/60">
                    I am a…
                  </p>
                  <Tabs.Root
                    value={role}
                    onValueChange={(d) => setRole(d.value as Role)}
                    className="mb-8"
                  >
                    <Tabs.List aria-labelledby="role-label" className="flex gap-8 border-b border-white/12">
                      {(
                        [
                          { value: 'restaurant', label: 'Restaurant', icon: 'ph:fork-knife' },
                          { value: 'planner', label: 'Event planner', icon: 'ph:calendar-check' },
                        ] as { value: Role; label: string; icon: string }[]
                      ).map((t) => (
                        <Tabs.Trigger
                          key={t.value}
                          value={t.value}
                          className="-mb-px flex items-center gap-2 border-b-2 border-transparent px-1 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors duration-300 hover:text-white data-[selected]:border-gold data-[selected]:text-gold"
                        >
                          <Icon icon={t.icon} className="text-base" />
                          {t.label}
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>
                    {(['restaurant', 'planner'] as Role[]).map((r) => (
                      <Tabs.Content key={r} value={r} className="sr-only">
                        {r === 'restaurant'
                          ? "You're registering as a restaurant."
                          : "You're registering as an event planner."}
                      </Tabs.Content>
                    ))}
                  </Tabs.Root>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {fields.map((f) => (
                      <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
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
                          value={form[f.key] || ''}
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

                  <ShinyGoldButton
                    type="submit"
                    disabled={submitting}
                    className="mt-7 w-full py-4 text-[12px] font-semibold uppercase tracking-[0.2em]"
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
                  </ShinyGoldButton>

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
