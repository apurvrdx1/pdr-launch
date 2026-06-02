import type { Metadata } from 'next';
import { Anton, Oswald, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton-src',
  display: 'swap',
});

const oswald = Oswald({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald-src',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['500', '600'],
  style: ['italic'],
  subsets: ['latin'],
  variable: '--font-cormorant-src',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PdR — Private dining, on one table | Early Access',
  description:
    'PdR is the private-dining marketplace where restaurants list their rooms and event planners discover, compare, and book them. Request early access.',
  // Pre-launch demo — keep it out of search results.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${oswald.variable} ${cormorant.variable} bg-ink text-white antialiased`}
      >
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
