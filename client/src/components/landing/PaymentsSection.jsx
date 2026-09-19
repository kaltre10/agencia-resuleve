import { Zap, CreditCard, Building2 } from 'lucide-react';

const PaymentsSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-surface-container-low relative" aria-label="Metodos de pago">
      <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-high p-6 sm:p-10 shadow-2xl relative overflow-hidden border-t border-surface-container-highest">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-tertiary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tertiary-container text-on-tertiary text-xs uppercase tracking-wider font-extrabold w-fit">
              <Zap className="size-3" /> CERO DEMORAS • CERO EXCUSAS • PAGO MÓVIL DIRECTO
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface uppercase tracking-tight">
              ¿GANASTE? TU DINERO ESTÁ EN TU CUENTA{' '}
              <span className="text-accent">EN MENOS DE 10 MINUTOS</span>
            </h2>

            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Sin trámites complicados ni intermediarios. Validamos el serial de tu ticket oficial y
              liquidamos de inmediato vía Pago Móvil o transferencia directa en la banca nacional y
              dólares digitales.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-surface-container-lowest flex flex-col">
                <span className="text-xs text-accent uppercase font-bold">Pago Móvil BDV</span>
                <span className="text-sm text-on-surface-variant">Inmediato al número CI</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-lowest flex flex-col">
                <span className="text-xs text-primary uppercase font-bold">Banesco & Mercantil</span>
                <span className="text-sm text-on-surface-variant">Transferencia directa</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-lowest flex flex-col">
                <span className="text-xs text-accent uppercase font-bold">Dólares Digitales</span>
                <span className="text-sm text-on-surface-variant">Binance / Zelle</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-inner">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <CreditCard className="size-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Método Principal</span>
                  <span className="text-lg font-bold text-on-surface">Pago Móvil Inmediato</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
                  <Building2 className="size-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Bancos Disponibles</span>
                  <span className="text-lg font-bold text-on-surface">BDV, Banesco, Mercantil</span>
                </div>
              </div>
              <div className="w-full p-3 rounded-xl bg-primary/10 text-center">
                <span className="text-sm text-primary font-bold">⚡ Tiempo promedio de pago: 10 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentsSection;
