import { MessageCircle, ArrowRight, Shield, Zap, Clock } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const FinalCTA = () => {
  const { settings } = useLandingStore();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high w-fit shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-primary uppercase tracking-wider font-bold">
            SORTEOS ABRIENDO TODOS LOS DÍAS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface uppercase tracking-tight font-[var(--font-display)]">
          ¿LISTO PARA GANAR?
          <span className="block text-primary drop-shadow-[0_0_20px_rgba(78,222,163,0.35)]">
            JUEGA HOY Y COBRA AL ACTO
          </span>
        </h2>

        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Únete a miles de venezolanos que ya ganan cada día con {settings.appName}. La puerta de entrada a tus próximos premios está a un mensaje de distancia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl">
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-container">
            <Shield className="size-8 text-primary" />
            <span className="text-xs text-on-surface uppercase font-bold text-center">100% Legal y Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-container">
            <Zap className="size-8 text-accent" />
            <span className="text-xs text-on-surface uppercase font-bold text-center">Pagos en Minutos</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-container">
            <Clock className="size-8 text-primary" />
            <span className="text-xs text-on-surface uppercase font-bold text-center">Atención 24/7</span>
          </div>
        </div>

        <a
          className="group flex items-center justify-center gap-3 px-10 py-6 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_rgba(78,222,163,0.9)] transform hover:-translate-y-1"
          href={`https://wa.me/${settings.whatsappNumber}?text=Hola,%20quiero%20empezar%20a%20jugar%20con%20${encodeURIComponent(settings.appName)}.`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="size-8 animate-pulse" />
          <div className="flex flex-col text-left">
            <span className="leading-none text-xl font-extrabold tracking-wide">🟢 EMPEZAR A JUGAR AHORA</span>
            <span className="text-sm text-on-primary-container font-semibold opacity-90 mt-0.5">
              Atención inmediata por WhatsApp • Sin registros
            </span>
          </div>
          <ArrowRight className="size-7 group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <span className="text-primary font-bold">⚡</span>
          <span>More than 10,000 successful transactions</span>
          <span className="text-primary font-bold">⚡</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
