import Nav from '@/components/launch/Nav';
import Hero from '@/components/launch/Hero';
import Marquee from '@/components/launch/Marquee';
import ValueTracks from '@/components/launch/ValueTracks';
import HowItWorks from '@/components/launch/HowItWorks';
import EarlyAccess from '@/components/launch/EarlyAccess';
import Faq from '@/components/launch/Faq';
import Footer from '@/components/launch/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink">
      <Nav />
      <Hero />
      <Marquee />
      <ValueTracks />
      <HowItWorks />
      <EarlyAccess />
      <Faq />
      <Footer />
    </main>
  );
}
