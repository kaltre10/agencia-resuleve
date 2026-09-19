import { Zap, MessageCircle, Dice5, Headphones } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const pillars = [
  {
    icon: Zap,
    number: 'PILAR 01',
    title: 'Pagos al Instante Garantizados',
    description: 'Ganas y cobras en el acto sin trámites burocráticos ni montos retenidos. Liquidamos inmediatamente a tu cuenta bancaria nacional.',
    color: 'text-accent',
    bg: 'bg-accent',
  },
  {
    icon: MessageCircle,
    number: 'PILAR 02',
    title: 'Jugadas Fáciles en 3 Pasos',
    description: '1. Escríbenos por WhatsApp. 2. Pasa tu selección y comprobante. 3. Recibe tu ticket oficial sellado en PDF o imagen de alta resolución.',
    color: 'text-primary',
    bg: 'bg-primary',
  },
  {
    icon: Dice5,
    number: 'PILAR 03',
    title: 'Catálogo Completo de Loterías',
    description: 'Todos los sorteos de Animalitos (Lotto Activo, La Granjita), Triples tradicionales (Zulia, Táchira, Chance) y Tripletas millonarias.',
    color: 'text-secondary',
    bg: 'bg-secondary',
  },
  {
    icon: Headphones,
    number: 'PILAR 04',
    title: 'Atención Humana y Rápida 24/7',
    description: 'Nada de robots confusos. Operadores reales venezolanos listos para atenderte, sellar tus tickets y resolver cualquier duda al momento.',
    color: 'text-primary',
    bg: 'bg-primary',
  },
];

const WhyUsSection = () => {
  const { settings } = useLandingStore();
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface" aria-label="Por que elegirnos">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 text-center items-center">
          <span className="text-xs text-primary uppercase tracking-widest bg-surface-container-high px-4 py-1.5 rounded-full font-bold">
            VENTAJAS EXCLUSIVAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface uppercase tracking-tight">
            ¿POR QUÉ {settings.appName} ES TU MEJOR ELECCIÓN?
          </h2>
          <p className="text-base text-on-surface-variant max-w-2xl">
            Construimos una plataforma seria, rápida y sin letra pequeña para que tu única preocupación sea celebrar tu acierto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md flex flex-col gap-4 group">
              <div className={`w-14 h-14 rounded-xl bg-surface-container-lowest ${pillar.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <pillar.icon className="size-7" />
              </div>
              <div className="flex flex-col gap-2">
                <span className={`text-xs ${pillar.color} uppercase font-bold`}>{pillar.number}</span>
                <h3 className="text-sm font-bold text-on-surface uppercase">{pillar.title}</h3>
                <p className="text-sm text-on-surface-variant">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
