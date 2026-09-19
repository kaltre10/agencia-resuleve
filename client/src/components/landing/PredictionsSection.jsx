import { useState } from 'react';
import { Flame, Snowflake, BarChart3, Hash } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const tabs = [
  { id: 'hot', label: 'MÁS POPULARES', icon: Flame, color: 'text-primary' },
  { id: 'stats', label: 'SOLO ESTADÍSTICAS', icon: BarChart3, color: 'text-accent' },
  { id: 'cold', label: 'NÚMEROS FRÍOS', icon: Snowflake, color: 'text-secondary' },
];

const PredictionsSection = () => {
  const { predictions } = useLandingStore();
  const [activeTab, setActiveTab] = useState('hot');

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-surface-container-lowest" aria-label="Tendencias y pronosticos de loteria">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-container-highest pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-accent rounded-full" />
            <div>
              <span className="text-xs text-secondary uppercase tracking-widest block font-bold">
                TOP NÚMEROS FRÍOS Y CALIENTES
              </span>
              <h2 className="text-xl font-bold text-on-surface uppercase tracking-tight">
                TENDENCIAS Y PRONÓSTICOS DE LA SEMANA
              </h2>
            </div>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant max-w-4xl">
          Analizamos los resultados de los últimos 90 días en Animalitos, Triples y Lotería Nacional. Estos números representan las tendencias más fuertes en popularidad (calientes) y ausencia prolongada (fríos).
        </p>

        <div className="flex items-center gap-1 sm:gap-2 bg-surface-container p-1 rounded-full w-fit overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs uppercase font-bold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-surface-container-highest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <tab.icon className="size-3" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.id === 'hot' ? 'Calientes' : tab.id === 'cold' ? 'Fríos' : 'Stats'}</span>
            </button>
          ))}
        </div>

        {activeTab === 'hot' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {predictions.hot.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl flex flex-col items-center gap-3 transition-all bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black bg-surface-container shadow-inner">
                  <Hash className="size-5 text-primary" />
                  <span className="ml-0.5 text-primary">{p.num}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-xs font-bold uppercase text-primary">🔥 CALIENTE</span>
                  <span className="text-xs text-on-surface-variant">{p.trend}</span>
                  {p.times && (
                    <span className="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">
                      {p.times} veces
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {predictions.stats.map((p, i) => (
              <div
                key={i}
                className="p-3 rounded-xl flex flex-col items-center gap-2 bg-surface-container hover:bg-surface-container-high transition-all border border-surface-container-highest"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold bg-surface-container-lowest shadow-inner">
                  <span className="text-sm text-on-surface">{p.num}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-0.5">
                  <span className="text-[10px] text-on-surface-variant uppercase">Apariciones</span>
                  <span className="text-sm font-bold text-accent">{p.apareció}</span>
                  <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: p.frecuencia }} />
                  </div>
                  <span className="text-[10px] text-on-surface-variant">{p.frecuencia}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cold' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {predictions.cold.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl flex flex-col items-center gap-3 transition-all bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black bg-surface-container shadow-inner">
                  <Hash className="size-5 text-secondary" />
                  <span className="ml-0.5 text-secondary">{p.num}</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-xs font-bold uppercase text-secondary">❄️ FRÍO</span>
                  <span className="text-xs text-on-surface-variant">{p.trend}</span>
                  {p.days && (
                    <span className="text-[10px] text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded-full">
                      {p.days} días
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PredictionsSection;
