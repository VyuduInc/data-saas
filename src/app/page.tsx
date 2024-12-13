import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { UseCases } from '@/components/landing/UseCases';
import { Security } from '@/components/landing/Security';
import { FAQ } from '@/components/landing/FAQ';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Security />
      <FAQ />
    </main>
  );
}