import { useState } from 'react';
import { Calculator, MessageCircle, Info, CheckCircle, DollarSign } from 'lucide-react';

const lotteryTypes = [
  { id: 'lotto', name: 'Lotto Activo', minBet: 1, multiplier: 'x800' },
  { id: 'granjita', name: 'La Granjita', minBet: 1, multiplier: 'x1200' },
  { id: 'triples', name: 'Triples Nacionales', minBet: 1, multiplier: 'x800' },
  { id: 'chance', name: 'Chance Triple', minBet: 1, multiplier: 'x800' },
  { id: 'animalitos', name: 'Animalitos', minBet: 1, multiplier: 'x25' },
];

const SimulatorSection = () => {
  const [selectedLottery, setSelectedLottery] = useState('lotto');
  const [betAmount, setBetAmount] = useState(10);
  const [numbers, setNumbers] = useState('');

  const lottery = lotteryTypes.find((l) => l.id === selectedLottery);
  const potentialWin = betAmount * parseInt(lottery.multiplier.replace('x', ''));

  return (
    <section id="simulador" className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface" aria-label="Simulador de apuestas de loteria">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-3 text-center items-center">
          <span className="text-xs text-primary uppercase tracking-widest bg-surface-container-high px-4 py-1.5 rounded-full font-bold">
            CALCULADORA DE APUESTAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface uppercase tracking-tight">
            SIMULADOR Y CALCULADORA DE PREMIOS
          </h2>
          <p className="text-base text-on-surface-variant max-w-2xl">
            Calcula cuánto ganarías con cada jugada. Selecciona la lotería, ingresa el monto y ve tu ganancia potencial al instante.
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-surface-container border border-surface-container-highest shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Calculator className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-on-surface-variant uppercase font-bold">Simulador</span>
              <span className="text-lg font-bold text-on-surface">Calcula Tu Ganancia</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold">Tipo de Lotería</label>
              <select
                value={selectedLottery}
                onChange={(e) => setSelectedLottery(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
              >
                {lotteryTypes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — Multiplicador {l.multiplier}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold">Monto de la Apuesta (Bs)</label>
              <input
                type="number"
                min={lottery.minBet}
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold">Números a Jugar (opcional)</label>
              <input
                type="text"
                placeholder="Ej: 05, 12, 28"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-text"
              />
            </div>

            <div className="w-full p-4 rounded-xl bg-primary/10 border border-primary/30 flex flex-col items-center gap-2">
              <span className="text-xs text-primary uppercase font-bold flex items-center gap-1">
                <DollarSign className="size-3" /> GANANCIA POTENCIAL
              </span>
              <span className="text-3xl font-black text-primary">
                Bs {potentialWin.toLocaleString('es-VE')}
              </span>
              <span className="text-xs text-on-surface-variant text-center">
                {lottery.name} — Multiplicador {lottery.multiplier}
              </span>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-surface-container-lowest text-xs text-on-surface-variant">
              <Info className="size-4 shrink-0 mt-0.5 text-accent" />
              <span>
                El resultado final depende del sorteo oficial. Esta calculadora es una estimación con base en los multiplicadores actuales de cada lotería.
              </span>
            </div>

            <a
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary/80 text-on-primary text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              href={`https://wa.me/?text=Hola,%20quiero%20jugar%20${betAmount}%20Bs%20al%20${lottery.name}%20con%20los%20n%C3%BAmeros%3A%20${numbers || 'no%20definidos'}.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-5" />
              <span>Jugar Esta Jugada por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
