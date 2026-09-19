import { useState, useEffect, useCallback } from 'react';
import paymentData from '@/data/paymentData';

const PICK_COUNT = 3;
const MIN_INTERVAL = 20000;
const MAX_INTERVAL = 40000;

const getRandomSubset = (arr, count) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const TickerBar = () => {
  const [payments, setPayments] = useState(() => getRandomSubset(paymentData, PICK_COUNT));

  const refresh = useCallback(() => {
    setPayments(getRandomSubset(paymentData, PICK_COUNT));
  }, []);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
      return setTimeout(() => {
        refresh();
        timerId = scheduleNext();
      }, delay);
    };

    let timerId = scheduleNext();
    return () => clearTimeout(timerId);
  }, [refresh]);

  return (
    <section className="w-full bg-surface-container-lowest py-2 px-3 sm:px-4 overflow-hidden relative" aria-label="Pagos recientes">
      <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary animate-ping" />
          <span className="text-[10px] sm:text-xs text-primary uppercase tracking-wider font-bold hidden sm:inline">
            PAGOS RECIENTES EN VIVO
          </span>
          <span className="text-[10px] sm:text-xs text-primary uppercase tracking-wider font-bold sm:hidden">
            EN VIVO
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap text-on-surface-variant text-xs sm:text-sm scrollbar-none">
          {payments.map((p, i) => (
            <div key={`${p.name}-${i}`} className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-accent">⚡</span>
              <span>
                <span className="hidden sm:inline">{p.name} ({p.city})</span>
                <span className="sm:hidden">{p.name.split(' ')[0]}</span>
                {' '}cobró{' '}
                <strong className="text-primary font-bold">{p.amount}</strong>
              </span>
              <span className="text-muted-foreground bg-surface-container px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold hidden md:inline">
                {p.method}
              </span>
              {i < payments.length - 1 && <span className="text-outline-variant">•</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TickerBar;
