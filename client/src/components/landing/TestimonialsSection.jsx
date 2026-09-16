import { Star, Quote } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const TestimonialsSection = () => {
  const { settings } = useLandingStore();

  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Ganador Lotto Activo',
      text: 'Gané 2.400 Bs y me los depositaron en 3 minutos por Pago Móvil. Literal pensé que era mentira. La mejor agencia de toda Valencia.',
      stars: 5,
    },
    {
      name: 'Luisa Pérez',
      role: 'Jugadora Frecuente',
      text: `Llevo 8 meses jugando con ${settings.appName} y jamás tuve un problema. Los tickets son 100% oficiales y siempre pagan al instante.`,
      stars: 5,
    },
    {
      name: 'Andrés Rodríguez',
      role: 'Ganador Tripletas',
      text: 'Me gané la tripleta de 18.000 Bs y me lo pagaron completo vía Binance. Son serios, rápidos y transparentes.',
      stars: 5,
    },
    {
      name: 'María González',
      role: 'Nueva Jugadora',
      text: 'Al principio dudé, pero la primera vez que gané me lo pagaron en 10 minutos. Ahora juego todos los días.',
      stars: 5,
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-low relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3 text-center items-center">
          <span className="text-xs text-primary uppercase tracking-widest bg-surface-container-high px-4 py-1.5 rounded-full font-bold">
            OPINIONES VERIFICADAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface uppercase tracking-tight">
            LO QUE DICEN NUESTROS JUGADORES
          </h2>
          <p className="text-base text-on-surface-variant max-w-2xl">
            Miles de jugadores activos confían en nosotros cada día. Aquí algunos testimonios reales de nuestra comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md flex flex-col gap-4 border border-surface-container-highest"
            >
              <div className="flex items-center gap-3">
                <Quote className="size-8 text-primary/30" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="size-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-on-surface-variant italic leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-surface-container-highest">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">{t.name}</span>
                  <span className="text-xs text-on-surface-variant">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
