import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultSettings = {
  appName: 'Resuelve Loteril',
  whatsappNumber: '584120000000',
  minTicketPrice: 50,
  instagram: '',
  facebook: '',
  tiktok: '',
  heroImage: 'https://lh3.googleusercontent.com/aida/AEtjO1VMM_AuKQtDu6KPI-H1fEKa_Q3BKznOPug3HiFUoxKpUPGsCTHWGetHXm8gKNfNzQ0VWERBS6omBJ9S-HWeVN9buUDWKFpZpUfaQHMqKfbi6VbzWOl-CFbMWemgflzG8-YHjRVdM_NNhqO9unFV3RxjiQwbiNp_oLmsVVk5zJ8e8ag-OICm_ptkyHDC22tjbhGBZyyRhs7u9uNcHDPJyC-qLfzUcYyTvktwNkGM3Fg7C0bDDUioqAmYlA=s1600?authuser=2',
  heroImageLink: '',
  heroImageLinkTarget: '_blank',
};

const defaultCarousel = [
  { id: '1', name: 'Lotto Activo', image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=100&fit=crop', gradient: 'from-green-600/90 to-green-900/90', text: 'LOTTO ACTIVO', sub: 'Sorteos cada hora', link: '', linkTarget: '_blank', active: true },
  { id: '2', name: 'La Granjita', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=100&fit=crop', gradient: 'from-yellow-600/90 to-orange-800/90', text: 'LA GRANJITA', sub: '12 sorteos diarios', link: '', linkTarget: '_blank', active: true },
  { id: '3', name: 'Triple Chance', image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=100&fit=crop', gradient: 'from-blue-600/90 to-indigo-900/90', text: 'TRIPLE CHANCE', sub: 'Premio x200.000', link: '', linkTarget: '_blank', active: true },
  { id: '4', name: 'Triple Caracas', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=100&fit=crop', gradient: 'from-red-600/90 to-rose-900/90', text: 'TRIPLE CARACAS', sub: '3 sorteos al día', link: '', linkTarget: '_blank', active: true },
  { id: '5', name: 'Animalitos', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=100&fit=crop', gradient: 'from-purple-600/90 to-violet-900/90', text: 'ANIMALITOS', sub: 'Juega desde 1 Bs', link: '', linkTarget: '_blank', active: true },
];

const defaultOffers = [
  { id: '1', title: 'BONO DEL 20% EN TU PRIMERA RECARGA', subtitle: 'Recibe 20% extra en tu primer juego del día. Válido hoy desde 50 Bs.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop', tagTop: '¡BONO RECARGA!', tagTopColor: 'bg-secondary-container text-on-secondary-container', tagExtra: '20% EXTRA', labelTag: 'PROMO WHATSAPP', labelText: 'Válido hoy desde 50 Bs', link: '', linkTarget: '_blank', active: true },
  { id: '2', title: 'PAGA TUS TRIPLETAS CON MULTIPLICADOR x1000', subtitle: 'Sin comisiones por retiro. Pago inmediato vía Pago Móvil o Binance.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGShoblpCSAPAphuekeflfBip57hMSEPPkaJsKCdtn61whr3n2R9TEkZD0mIYq5XeOy7oIaXrQFqNy6d5u0wWhh78ZHGwExEvpL0vLWrKXPcjxyRs_OJ_wZlKTyH3Hw5a9MeWE1Ugcks-LAaH_Pz8okuEIZMm4OHykxC1fEGMOwJz3PL2z_1X2213x8iRSZcFa-045I7crtt3T_xrMmRfxvlLim2WaFv4rZgemK4EBivfn75svaHnq', tagTop: 'TRIPLETAS & TRIPLES', tagTopColor: 'bg-primary-container text-on-primary', tagExtra: 'PAGO INMEDIATO', labelTag: 'PROMO OFICIAL', labelText: 'Sin comisiones por retiro', link: '', linkTarget: '_blank', active: true },
];

const defaultPredictions = {
  hot: [
    { num: '02', trend: 'Apareció 8 veces en los últimos 10 sorteos', times: 8 },
    { num: '20', trend: '7 aciertos en las últimas 10 extracciones', times: 7 },
    { num: '33', trend: '7 veces en los últimos 10 sorteos', times: 7 },
    { num: '11', trend: '6 apariciones en la última semana', times: 6 },
    { num: '27', trend: '6 veces en los últimos 8 sorteos', times: 6 },
    { num: '08', trend: 'Racha de 5 aciertos consecutivos', times: 5 },
  ],
  cold: [
    { num: '16', trend: '15 días sin salir en ningún sorteo', days: 15 },
    { num: '25', trend: '12 días sin aparecer en Animalitos', days: 12 },
    { num: '44', trend: '11 días sin ser extraído', days: 11 },
    { num: '37', trend: '10 días ausente en Triples', days: 10 },
    { num: '05', trend: '9 sorteos sin aparecer', days: 9 },
    { num: '41', trend: '8 días sin resultado', days: 8 },
  ],
  stats: [
    { num: '01', apareció: 3, frecuencia: '30%' },
    { num: '02', apareció: 8, frecuencia: '80%' },
    { num: '03', apareció: 2, frecuencia: '20%' },
    { num: '04', apareció: 4, frecuencia: '40%' },
    { num: '05', apareció: 1, frecuencia: '10%' },
    { num: '06', apareció: 5, frecuencia: '50%' },
    { num: '07', apareció: 3, frecuencia: '30%' },
    { num: '08', apareció: 5, frecuencia: '50%' },
    { num: '09', apareció: 2, frecuencia: '20%' },
    { num: '10', apareció: 4, frecuencia: '40%' },
    { num: '11', apareció: 6, frecuencia: '60%' },
    { num: '12', apareció: 3, frecuencia: '30%' },
  ],
};

const useLandingStore = create(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      carousel: defaultCarousel,
      offers: defaultOffers,
      predictions: defaultPredictions,

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      addCarouselItem: (item) =>
        set((state) => ({
          carousel: [...state.carousel, { ...item, id: Date.now().toString(), active: true }],
        })),

      updateCarouselItem: (id, updates) =>
        set((state) => ({
          carousel: state.carousel.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),

      removeCarouselItem: (id) =>
        set((state) => ({
          carousel: state.carousel.filter((item) => item.id !== id),
        })),

      addOffer: (offer) =>
        set((state) => ({
          offers: [...state.offers, { ...offer, id: Date.now().toString(), active: true }],
        })),

      updateOffer: (id, updates) =>
        set((state) => ({
          offers: state.offers.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),

      removeOffer: (id) =>
        set((state) => ({
          offers: state.offers.filter((item) => item.id !== id),
        })),

      updatePredictions: (type, data) =>
        set((state) => ({
          predictions: { ...state.predictions, [type]: data },
        })),

      addPredictionNumber: (type, item) =>
        set((state) => ({
          predictions: {
            ...state.predictions,
            [type]: [...state.predictions[type], item],
          },
        })),

      removePredictionNumber: (type, index) =>
        set((state) => ({
          predictions: {
            ...state.predictions,
            [type]: state.predictions[type].filter((_, i) => i !== index),
          },
        })),
    }),
    {
      name: 'landing-settings',
    }
  )
);

export default useLandingStore;
