import { useState } from 'react';
import { Plus, Trash2, Flame, Snowflake, BarChart3 } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const tabs = [
  { id: 'hot', label: 'Calientes', icon: Flame, color: 'text-primary' },
  { id: 'stats', label: 'Estadísticas', icon: BarChart3, color: 'text-accent' },
  { id: 'cold', label: 'Fríos', icon: Snowflake, color: 'text-secondary' },
];

const AdminTrends = () => {
  const { predictions, addPredictionNumber, removePredictionNumber } = useLandingStore();
  const [activeTab, setActiveTab] = useState('hot');

  const [newHot, setNewHot] = useState({ num: '', trend: '', times: 0 });
  const [newCold, setNewCold] = useState({ num: '', trend: '', days: 0 });
  const [newStat, setNewStat] = useState({ num: '', apareció: 0, frecuencia: '0%' });

  const handleAddHot = () => {
    if (!newHot.num || !newHot.trend) return;
    addPredictionNumber('hot', { ...newHot, num: newHot.num.toString().padStart(2, '0') });
    setNewHot({ num: '', trend: '', times: 0 });
  };

  const handleAddCold = () => {
    if (!newCold.num || !newCold.trend) return;
    addPredictionNumber('cold', { ...newCold, num: newCold.num.toString().padStart(2, '0') });
    setNewCold({ num: '', trend: '', days: 0 });
  };

  const handleAddStat = () => {
    if (!newStat.num) return;
    addPredictionNumber('stats', { ...newStat, num: newStat.num.toString().padStart(2, '0') });
    setNewStat({ num: '', apareció: 0, frecuencia: '0%' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Tendencias y Pronósticos</h1>
        <p className="text-sm text-on-surface-variant mt-1">Administra los números calientes, fríos y estadísticas</p>
      </div>

      <div className="flex items-center gap-2 bg-surface-container p-1 rounded-full w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-surface-container-highest text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <tab.icon className="size-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hot' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
            <h3 className="font-bold text-on-surface uppercase text-sm">Agregar Número Caliente</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="number"
                min="0"
                max="99"
                value={newHot.num}
                onChange={(e) => setNewHot({ ...newHot, num: e.target.value })}
                placeholder="Número"
                className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
              <input
                type="text"
                value={newHot.trend}
                onChange={(e) => setNewHot({ ...newHot, trend: e.target.value })}
                placeholder="Tendencia (ej: Apareció 5 veces)"
                className="sm:col-span-2 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
              <input
                type="number"
                min="0"
                value={newHot.times}
                onChange={(e) => setNewHot({ ...newHot, times: parseInt(e.target.value) || 0 })}
                placeholder="Veces"
                className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <button
              onClick={handleAddHot}
              disabled={!newHot.num || !newHot.trend}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/80 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Plus className="size-4" /> Agregar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {predictions.hot.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-primary">#{item.num}</span>
                  <div>
                    <span className="text-[10px] text-primary font-bold uppercase">🔥 Caliente</span>
                    <p className="text-xs text-on-surface-variant">{item.trend}</p>
                    <span className="text-[10px] text-primary font-bold">{item.times} veces</span>
                  </div>
                </div>
                <button
                  onClick={() => removePredictionNumber('hot', i)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cold' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
            <h3 className="font-bold text-on-surface uppercase text-sm">Agregar Número Frío</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="number"
                min="0"
                max="99"
                value={newCold.num}
                onChange={(e) => setNewCold({ ...newCold, num: e.target.value })}
                placeholder="Número"
                className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
              <input
                type="text"
                value={newCold.trend}
                onChange={(e) => setNewCold({ ...newCold, trend: e.target.value })}
                placeholder="Tendencia (ej: 15 días sin salir)"
                className="sm:col-span-2 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
              <input
                type="number"
                min="0"
                value={newCold.days}
                onChange={(e) => setNewCold({ ...newCold, days: parseInt(e.target.value) || 0 })}
                placeholder="Días"
                className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <button
              onClick={handleAddCold}
              disabled={!newCold.num || !newCold.trend}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-on-secondary text-sm font-bold uppercase tracking-wider hover:bg-secondary/80 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Plus className="size-4" /> Agregar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {predictions.cold.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-secondary">#{item.num}</span>
                  <div>
                    <span className="text-[10px] text-secondary font-bold uppercase">❄️ Frío</span>
                    <p className="text-xs text-on-surface-variant">{item.trend}</p>
                    <span className="text-[10px] text-secondary font-bold">{item.days} días</span>
                  </div>
                </div>
                <button
                  onClick={() => removePredictionNumber('cold', i)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest space-y-3">
            <h3 className="font-bold text-on-surface uppercase text-sm">Agregar Estadística</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="number"
                min="0"
                max="99"
                value={newStat.num}
                onChange={(e) => setNewStat({ ...newStat, num: e.target.value })}
                placeholder="Número"
                className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
              <input
                type="number"
                min="0"
                value={newStat.apareció}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setNewStat({ ...newStat, apareció: val, frecuencia: `${Math.min(val * 10, 100)}%` });
                }}
                placeholder="Apariciones"
                className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newStat.frecuencia}
                  readOnly
                  className="flex-1 p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface-variant text-sm cursor-not-allowed"
                />
              </div>
              <button
                onClick={handleAddStat}
                disabled={!newStat.num}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-on-accent text-sm font-bold uppercase tracking-wider hover:bg-accent/80 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Plus className="size-4" /> Agregar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {predictions.stats.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-surface-container border border-surface-container-highest flex flex-col items-center gap-2 relative">
                <button
                  onClick={() => removePredictionNumber('stats', i)}
                  className="absolute top-1 right-1 p-0.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all cursor-pointer"
                >
                  <Trash2 className="size-3" />
                </button>
                <span className="text-lg font-bold text-on-surface">#{item.num}</span>
                <span className="text-sm font-bold text-accent">{item.apareció}</span>
                <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: item.frecuencia }} />
                </div>
                <span className="text-[10px] text-on-surface-variant">{item.frecuencia}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTrends;
