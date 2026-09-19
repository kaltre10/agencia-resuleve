import { create } from 'zustand';
import api from '@/api/axios';

const defaultSettings = {
  appName: 'Resuelve Loteril',
  whatsappNumber: '584120000000',
  minTicketPrice: 50,
  instagram: '',
  facebook: '',
  tiktok: '',
  heroImage: '',
  heroImageLink: '',
  heroImageLinkTarget: '_blank',
  heroTitle: 'Centro de Apuestas Legal y Seguro',
  heroDescription: '',
  heroButtonText: 'Apostar a Este Sorteo',
};

const defaultCarousel = [
  { name: 'Lotto Activo', image: '', gradient: 'from-green-600/90 to-green-900/90', text: 'LOTTO ACTIVO', sub: 'Sorteos cada hora', link: '', linkTarget: '_blank', active: true },
  { name: 'La Granjita', image: '', gradient: 'from-yellow-600/90 to-orange-800/90', text: 'LA GRANJITA', sub: '12 sorteos diarios', link: '', linkTarget: '_blank', active: true },
  { name: 'Triple Chance', image: '', gradient: 'from-blue-600/90 to-indigo-900/90', text: 'TRIPLE CHANCE', sub: 'Premio x200.000', link: '', linkTarget: '_blank', active: true },
  { name: 'Triple Caracas', image: '', gradient: 'from-red-600/90 to-rose-900/90', text: 'TRIPLE CARACAS', sub: '3 sorteos al dia', link: '', linkTarget: '_blank', active: true },
  { name: 'Animalitos', image: '', gradient: 'from-purple-600/90 to-violet-900/90', text: 'ANIMALITOS', sub: 'Juega desde 1 Bs', link: '', linkTarget: '_blank', active: true },
];

const defaultOffers = [];
const defaultPredictions = { hot: [], cold: [], stats: [] };

const useLandingStore = create((set, get) => ({
  settings: defaultSettings,
  carousel: defaultCarousel,
  offers: defaultOffers,
  predictions: defaultPredictions,
  loaded: false,

  fetchLanding: async () => {
    try {
      const { data } = await api.get('/landing');
      if (data.success && data.data) {
        set({
          settings: { ...defaultSettings, ...data.data.settings },
          carousel: data.data.carousel?.length ? data.data.carousel : defaultCarousel,
          offers: data.data.offers?.length ? data.data.offers : defaultOffers,
          predictions: data.data.predictions?.hot?.length ? data.data.predictions : defaultPredictions,
          loaded: true,
        });
      }
    } catch (err) {
      console.error('Error fetching landing:', err.message);
      set({ loaded: true });
    }
  },

  saveLanding: async () => {
    try {
      const { settings, carousel, offers, predictions } = get();
      await api.put('/landing', { settings, carousel, offers, predictions });
    } catch (err) {
      console.error('Error saving landing:', err.message);
    }
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
    get().saveLanding();
  },

  addCarouselItem: (item) => {
    set((state) => ({
      carousel: [...state.carousel, { ...item, id: Date.now().toString(), active: true }],
    }));
    get().saveLanding();
  },

  updateCarouselItem: (id, updates) => {
    set((state) => ({
      carousel: state.carousel.map((item) =>
        (item._id || item.id) === id ? { ...item, ...updates } : item
      ),
    }));
    get().saveLanding();
  },

  removeCarouselItem: (id) => {
    set((state) => ({
      carousel: state.carousel.filter((item) => (item._id || item.id) !== id),
    }));
    get().saveLanding();
  },

  addOffer: (offer) => {
    set((state) => ({
      offers: [...state.offers, { ...offer, id: Date.now().toString(), active: true }],
    }));
    get().saveLanding();
  },

  updateOffer: (id, updates) => {
    set((state) => ({
      offers: state.offers.map((item) =>
        (item._id || item.id) === id ? { ...item, ...updates } : item
      ),
    }));
    get().saveLanding();
  },

  removeOffer: (id) => {
    set((state) => ({
      offers: state.offers.filter((item) => (item._id || item.id) !== id),
    }));
    get().saveLanding();
  },

  updatePredictions: (type, data) => {
    set((state) => ({
      predictions: { ...state.predictions, [type]: data },
    }));
    get().saveLanding();
  },

  addPredictionNumber: (type, item) => {
    set((state) => ({
      predictions: {
        ...state.predictions,
        [type]: [...state.predictions[type], item],
      },
    }));
    get().saveLanding();
  },

  removePredictionNumber: (type, index) => {
    set((state) => ({
      predictions: {
        ...state.predictions,
        [type]: state.predictions[type].filter((_, i) => i !== index),
      },
    }));
    get().saveLanding();
  },
}));

export default useLandingStore;
