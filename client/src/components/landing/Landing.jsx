import { useEffect } from 'react';
import TickerBar from './TickerBar';
import AdCarousel from './AdCarousel';
import HeroSection from './HeroSection';
import OffersSection from './OffersSection';
import PaymentsSection from './PaymentsSection';
import WhyUsSection from './WhyUsSection';
import PredictionsSection from './PredictionsSection';
import FinalCTA from './FinalCTA';
import WhatsAppFloat from './WhatsAppFloat';
import Footer from './Footer';
import ThemeToggle from '@/components/ThemeToggle';
import useLandingStore from '@/store/landingStore';

const Landing = () => {
  const fetchLanding = useLandingStore((s) => s.fetchLanding);
  const settings = useLandingStore((s) => s.settings);

  useEffect(() => {
    fetchLanding();
  }, [fetchLanding]);

  useEffect(() => {
    if (settings.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }
  }, [settings.favicon]);

  useEffect(() => {
    if (settings.appName) {
      document.title = settings.appName + ' - Agencia de Loteria y Animalitos en Venezuela';
    }
  }, [settings.appName]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-[var(--font-sans)] transition-colors">
      <div className="fixed top-2.5 right-3 sm:top-3 sm:right-4 z-50 flex items-center h-8">
        <ThemeToggle />
      </div>
      <main>
        <TickerBar />
        <AdCarousel />
        <HeroSection />
        <OffersSection />
        <PaymentsSection />
        <WhyUsSection />
        <PredictionsSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Landing;
