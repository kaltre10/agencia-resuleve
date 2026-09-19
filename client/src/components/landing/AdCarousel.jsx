import useLandingStore from '@/store/landingStore';

const AdCarousel = () => {
  const { carousel } = useLandingStore();
  const activeItems = carousel.filter((item) => item.active);
  const duplicated = [...activeItems, ...activeItems, ...activeItems];

  if (activeItems.length === 0) return null;

  const renderItem = (ad, i) => (
    <div
      key={`${ad.id}-${i}`}
      className="shrink-0 h-16 w-48 rounded-lg overflow-hidden relative group cursor-pointer"
    >
      {ad.image && (
        <img
          src={ad.image}
          alt={`${ad.name} - Loteria y apuestas en Venezuela`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {ad.gradient && <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-2">
        <span className="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow-md">
          {ad.text}
        </span>
        {ad.sub && (
          <span className="text-[8px] text-white/80 mt-0.5">{ad.sub}</span>
        )}
      </div>
    </div>
  );

  return (
    <section className="w-full bg-surface-container-lowest py-1 px-0 overflow-hidden" aria-label="Carrusel de loterias y promociones">
      <div className="relative h-16 flex items-center">
        <div className="flex gap-2 animate-scroll whitespace-nowrap">
          {duplicated.map((ad, i) =>
            ad.link ? (
              <a
                key={`${ad.id}-${i}`}
                href={ad.link}
                target={ad.linkTarget || '_blank'}
                rel="noopener noreferrer"
                className="shrink-0"
              >
                {renderItem(ad, i)}
              </a>
            ) : (
              renderItem(ad, i)
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AdCarousel;
