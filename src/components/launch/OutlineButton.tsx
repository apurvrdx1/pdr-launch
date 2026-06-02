'use client';

import { Icon } from '@iconify/react';

function cn(...parts: (string | undefined | false | null)[]) {
  return parts.filter(Boolean).join(' ');
}

type Tone = 'white' | 'gold';

const TONES: Record<Tone, { border: string; circle: string }> = {
  white: { border: 'border-white/30 text-white hover:border-white/60', circle: 'bg-white/10' },
  gold: { border: 'border-gold/50 text-gold hover:border-gold', circle: 'bg-gold/15' },
};

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  /** Optional trailing icon rendered in its own circle (button-in-button). */
  icon?: string;
  /** 'white' = default ghost; 'gold' = gold-hued outline for special secondary CTAs. */
  tone?: Tone;
  onClick?: () => void;
  'aria-label'?: string;
};

type AnchorProps = BaseProps & { href: string };
type ButtonProps = BaseProps & { href?: undefined; type?: 'button' | 'submit'; disabled?: boolean };
type Props = AnchorProps | ButtonProps;

/**
 * Secondary / ghost outline button. Same silhouette as the primary
 * ShinyGoldButton but transparent with a hairline border. `tone="gold"`
 * swaps the white outline + text for the brand gold hue.
 */
export default function OutlineButton(props: Props) {
  const { children, className, icon, tone = 'white', ...rest } = props;
  const t = TONES[tone];

  const base = cn(
    'group inline-flex items-center justify-center gap-3 rounded-full border bg-white/[0.03] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
    t.border,
    className
  );

  const inner = (
    <>
      {children}
      {icon && (
        <span
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105',
            t.circle
          )}
        >
          <Icon icon={icon} className="text-base" />
        </span>
      )}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, onClick } = props as AnchorProps;
    return (
      <a href={href} onClick={onClick} aria-label={props['aria-label']} className={base}>
        {inner}
      </a>
    );
  }

  const { onClick, type = 'button', disabled } = rest as ButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={props['aria-label']} className={base}>
      {inner}
    </button>
  );
}
