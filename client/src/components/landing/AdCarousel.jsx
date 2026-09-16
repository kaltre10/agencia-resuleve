import useLandingStore from '@/store/landingStore';

const AdCarousel = () => {
  const { carousel } = useLandingStore();
  const activeItems = carousel.filter((item) => item.active);
  const duplicated = [...activeItems, ...activeItems, ...activeItems];

  if (activeItems.length === 0) return null;

  return (
    <section className="w-full bg-surface-container-lowest py-1 px-0 overflow-hidden">
      <div className="relative h-16 flex items-center">
        <div className="flex gap-2 animate-scroll whitespace-nowrap">
          {duplicated.map((ad, i) => (
            <div
              key={`${ad.id}-${i}`}
              className="shrink-0 h-16 w-48 rounded-lg overflow-hidden relative group cursor-pointer"
            >
              {ad.image && (
                <img
                  src={ad.image}
                  alt={ad.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-2">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider drop-shadow-md">
                  {ad.text}
                </span>
                {ad.sub && (
                  <span className="text-[8px] text-white/80 mt-0.5">{ad.sub}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdCarousel;
