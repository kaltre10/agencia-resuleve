import { Zap } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const OffersSection = () => {
  const { offers } = useLandingStore();
  const activeOffers = offers.filter((item) => item.active);

  if (activeOffers.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-surface-container-lowest relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-container-highest pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-primary rounded-full" />
            <div>
              <span className="text-xs text-accent uppercase tracking-widest block font-bold">
                PUBLICIDAD Y PROMOCIONES DESTACADAS
              </span>
              <h2 className="text-xl font-bold text-on-surface uppercase tracking-tight">
                OFERTAS Y BENEFICIOS ACTIVOS
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-surface-container p-1 rounded-full">
            <span className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary text-xs uppercase font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-surface-container-lowest animate-ping" /> EN VIVO
            </span>
            <span className="px-4 py-1.5 rounded-full text-on-surface-variant text-xs uppercase font-semibold">
              {activeOffers.length} BANNER{activeOffers.length > 1 ? 'S' : ''} OFICIAL{activeOffers.length > 1 ? 'ES' : ''}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeOffers.map((banner) => {
            const Tag = banner.link ? 'a' : 'div';
            const linkProps = banner.link
              ? { href: banner.link, target: banner.linkTarget || '_blank', rel: 'noopener noreferrer' }
              : {};
            return (
              <Tag
                key={banner.id}
                {...linkProps}
                className="rounded-3xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest border border-surface-container-highest overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-primary/50 transition-all"
              >
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-surface-container-lowest">
                  {banner.image && (
                    <img
                      alt={banner.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      src={banner.image}
                    />
                  )}
                  {banner.tagTop && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full ${banner.tagTopColor || 'bg-primary-container text-on-primary'} text-xs uppercase font-extrabold flex items-center gap-1 shadow-md`}>
                        {banner.tagTop}
                      </span>
                      {banner.tagExtra && (
                        <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-accent text-xs uppercase font-bold">
                          {banner.tagExtra}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {banner.labelTag && (
                      <span className="px-2.5 py-0.5 rounded bg-primary/20 text-primary text-xs uppercase font-bold">
                        {banner.labelTag}
                      </span>
                    )}
                    {banner.labelText && (
                      <span className="text-xs text-on-surface-variant">{banner.labelText}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-on-surface uppercase">{banner.title}</h3>
                  <p className="text-sm text-on-surface-variant">{banner.subtitle}</p>
                  <a
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-bold uppercase tracking-wider transition-all shadow-md mt-2"
                    href={banner.link || 'https://wa.me/?text=Hola,%20quiero%20apostar%20con%20el%20bono%20del%2020%25.'}
                    target={banner.link ? (banner.linkTarget || '_blank') : '_blank'}
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Zap className="size-4" />
                    <span>Apostar con Este Bono</span>
                  </a>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
