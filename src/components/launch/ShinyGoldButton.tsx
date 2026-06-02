'use client';

import { useEffect, useRef } from 'react';

function cn(...parts: (string | undefined | false | null)[]) {
  return parts.filter(Boolean).join(' ');
}

type BaseProps = {
  children: React.ReactNode;
  /** Wrapper classes — sizing, padding, layout, text styling (inherited by content). */
  className?: string;
  /** Inner content flex classes (default centers with gap-3). */
  contentClassName?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  'aria-label'?: string;
};

type AnchorProps = BaseProps & { href: string };
type ButtonProps = BaseProps & {
  href?: undefined;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

type Props = AnchorProps | ButtonProps;

/**
 * Animated "antique gold chrome" CTA. A canvas paints a slow, brand-tuned
 * (PdR #D4AF37) metallic gradient + diagonal shimmer behind the label.
 * - Respects prefers-reduced-motion (renders a single static frame).
 * - Resizes with the button (ResizeObserver) — safe for full-width CTAs.
 * - Pauses when off-screen (IntersectionObserver) so multiple CTAs stay cheap.
 */
export default function ShinyGoldButton(props: Props) {
  const { children, className, contentClassName, style, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let time = 0;
    let raf: number | undefined;

    const draw = () => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      const o1 = (Math.sin(time) + 1) / 2;
      const o2 = (Math.sin(time + Math.PI / 3) + 1) / 2;
      const o3 = (Math.sin(time + (2 * Math.PI) / 3) + 1) / 2;
      // Antique-gold metal: hue ~40-52, muted saturation, polished sheen mid-stop.
      g.addColorStop(0, `hsl(${44 + o1 * 6}, 60%, ${46 + o1 * 16}%)`);
      g.addColorStop(0.25, `hsl(${42 + o2 * 8}, 64%, ${56 + o2 * 12}%)`);
      g.addColorStop(0.5, `hsl(${47 + o3 * 5}, 56%, ${70 + o3 * 8}%)`);
      g.addColorStop(0.75, `hsl(${40 + o1 * 9}, 66%, ${50 + o1 * 14}%)`);
      g.addColorStop(1, `hsl(${45 + o2 * 6}, 62%, ${44 + o2 * 16}%)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Restrained diagonal shimmer (warm white).
      const sg = ctx.createLinearGradient(
        Math.sin(time * 2) * w,
        0,
        Math.cos(time * 2) * w + w,
        h
      );
      sg.addColorStop(0, 'rgba(255,255,255,0)');
      sg.addColorStop(0.5, 'rgba(255,250,235,0.22)');
      sg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, w, h);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (raf === undefined) draw(); // keep a frame up while paused/static
    };

    const animate = () => {
      time += 0.01;
      draw();
      raf = requestAnimationFrame(animate);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let io: IntersectionObserver | undefined;
    if (reduce) {
      draw(); // single static frame, no loop
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && raf === undefined) {
              animate();
            } else if (!e.isIntersecting && raf !== undefined) {
              cancelAnimationFrame(raf);
              raf = undefined;
            }
          }
        },
        { threshold: 0 }
      );
      io.observe(canvas);
    }

    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
    };
  }, []);

  const base =
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-gold/40 text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-[1.04] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70';
  const glow: React.CSSProperties = {
    boxShadow:
      '0 0 22px rgba(212,175,55,0.35), inset 0 0 16px rgba(212,175,55,0.22)',
    ...style,
  };

  const inner = (
    <>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.35) 0%, transparent 70%)',
        }}
      />
      <span className={cn('relative z-10 flex items-center justify-center', contentClassName ?? 'gap-3')}>
        {children}
      </span>
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, onClick } = props as AnchorProps;
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={props['aria-label']}
        className={cn(base, className)}
        style={glow}
      >
        {inner}
      </a>
    );
  }

  const { onClick, type = 'button', disabled } = rest as ButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={props['aria-label']}
      className={cn(base, className)}
      style={glow}
    >
      {inner}
    </button>
  );
}
