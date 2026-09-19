import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, Zap, Shield, DollarSign, Clock } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const HeroSection = () => {
  const { settings } = useLandingStore();
  const [timer, setTimer] = useState(522);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=Hola,%20vengo%20desde%20la%20web.%20Quiero%20hacer%20una%20jugada.`;

  const trustBadges = [
    { icon: Clock, label: 'Pagos', value: 'Al Instante', color: 'text-accent' },
    { icon: Shield, label: '100% Legal', value: 'Y Seguro', color: 'text-primary' },
    { icon: DollarSign, label: 'Minima', value: `Desde ${settings.minTicketPrice} Bs`, color: 'text-accent' },
    { icon: Zap, label: 'Trayectoria', value: '+5 Anos', color: 'text-primary' },
  ];

  return (
    <section className="relative w-full px-3 sm:px-6 lg:px-8 pt-2 pb-6 lg:pt-4 lg:pb-10 bg-surface" aria-label="Hero principal">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 text-left">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-surface-container-high w-fit shadow-md">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-xs text-accent uppercase tracking-wider font-bold">
              Agencia Oficial Autorizada #1 de Venezuela
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface uppercase tracking-tight font-[var(--font-display)]">
            {settings.heroMainTitle || settings.appName}
            <span className="block text-primary drop-shadow-[0_0_20px_rgba(78,222,163,0.35)]">
              {settings.heroTitle}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            {settings.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <a
              className="group flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-4 sm:py-5 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(78,222,163,0.85)] transform hover:-translate-y-0.5"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jugar ahora por WhatsApp"
            >
              <MessageCircle className="size-5 sm:size-7 animate-pulse" />
              <div className="flex flex-col text-left">
                <span className="leading-none text-sm sm:text-lg font-extrabold tracking-wide">Jugar Ahora Por WhatsApp</span>
                <span className="text-[10px] sm:text-sm text-on-primary-container font-semibold opacity-90 mt-0.5">
                  Atencion en vivo - Respuesta inmediata
                </span>
              </div>
              <ArrowRight className="size-5 sm:size-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-3 rounded-lg bg-surface-container-low shadow-sm">
                <badge.icon className={`size-5 sm:size-6 ${badge.color}`} />
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs text-on-surface uppercase leading-none font-bold">{badge.label}</span>
                  <span className={`text-xs sm:text-sm font-bold ${badge.color}`}>{badge.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-surface-container shadow-2xl flex flex-col items-center text-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-lg opacity-25" />
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative mb-4 flex items-center justify-center">
                {settings.heroImageLink ? (
                  <a
                    href={settings.heroImageLink}
                    target={settings.heroImageLinkTarget || '_blank'}
                    rel="noopener noreferrer"
                    aria-label={`Ver imagen de ${settings.appName}`}
                  >
                    <img
                      alt={`${settings.appName} - Agencia de loteria y animalitos en Venezuela`}
                      className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(78,222,163,0.5)] transform hover:rotate-3 transition-transform duration-500"
                      src={settings.heroImage}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </a>
                ) : (
                  <img
                    alt={`${settings.appName} - Agencia de loteria y animalitos en Venezuela`}
                    className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(78,222,163,0.5)] transform hover:rotate-3 transition-transform duration-500"
                    src={settings.heroImage}
                    loading="eager"
                    fetchPriority="high"
                  />
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-accent text-xs uppercase tracking-wider mb-2 font-bold">
                Operador Verificado
              </div>

              <h2 className="text-xl font-bold text-on-surface uppercase tracking-tight">Sorteos de Hoy</h2>
              <p className="text-sm text-on-surface-variant mt-1 mb-4">
                Lotto Activo - La Granjita - Triples Nacionales
              </p>

              <a
                className="w-full mt-4 py-3 rounded-lg bg-primary hover:bg-primary/80 text-on-primary text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                href={`https://wa.me/${settings.whatsappNumber}?text=Hola,%20deseo%20apostar%20al%20proximo%20sorteo.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={settings.heroButtonText}
              >
                {settings.heroButtonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
