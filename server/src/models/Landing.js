const mongoose = require('mongoose');

const carouselItemSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  image: { type: String, default: '' },
  gradient: { type: String, default: '' },
  text: { type: String, default: '' },
  sub: { type: String, default: '' },
  link: { type: String, default: '' },
  linkTarget: { type: String, default: '_blank' },
  active: { type: Boolean, default: true },
}, { _id: true });

const offerItemSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  tagTop: { type: String, default: '' },
  tagTopColor: { type: String, default: '' },
  tagExtra: { type: String, default: '' },
  labelTag: { type: String, default: '' },
  labelText: { type: String, default: '' },
  badgeVerified: { type: String, default: '' },
  badgeSorteos: { type: String, default: '' },
  badgeSorteosDetail: { type: String, default: '' },
  offerButtonText: { type: String, default: 'Apostar con Este Bono' },
  offerButtonUrl: { type: String, default: '' },
  offerButtonTarget: { type: String, default: '_blank' },
  link: { type: String, default: '' },
  linkTarget: { type: String, default: '_blank' },
  active: { type: Boolean, default: true },
}, { _id: true });

const predictionNumberSchema = new mongoose.Schema({
  num: { type: String, required: true },
  trend: { type: String, default: '' },
  times: { type: Number, default: 0 },
  days: { type: Number, default: 0 },
  apareció: { type: Number, default: 0 },
  frecuencia: { type: String, default: '' },
}, { _id: true });

const landingSchema = new mongoose.Schema({
  settings: {
    appName: { type: String, default: 'Resuelve Loteril' },
    whatsappNumber: { type: String, default: '584120000000' },
    minTicketPrice: { type: Number, default: 50 },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    heroImageLink: { type: String, default: '' },
    heroImageLinkTarget: { type: String, default: '_blank' },
    heroTitle: { type: String, default: 'Centro de Apuestas Legal y Seguro' },
    heroDescription: { type: String, default: '' },
    heroButtonText: { type: String, default: 'Apostar a Este Sorteo' },
  },
  carousel: [carouselItemSchema],
  offers: [offerItemSchema],
  predictions: {
    hot: [predictionNumberSchema],
    cold: [predictionNumberSchema],
    stats: [predictionNumberSchema],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Landing', landingSchema);
