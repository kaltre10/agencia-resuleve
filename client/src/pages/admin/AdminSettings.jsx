import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import useLandingStore from '@/store/landingStore';
import ImageUploader from '@/components/ImageUploader';

const AdminSettings = () => {
  const { settings, updateSettings } = useLandingStore();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setForm({
      appName: 'Resuelve Loteril',
      whatsappNumber: '584120000000',
      minTicketPrice: 50,
      instagram: '',
      facebook: '',
      tiktok: '',
      heroImage: '',
      heroImageLink: '',
      heroImageLinkTarget: '_blank',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Configuración General</h1>
        <p className="text-sm text-on-surface-variant mt-1">Configura el nombre, WhatsApp y precio mínimo del ticket</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-highest space-y-5">
          <h3 className="font-bold text-on-surface uppercase text-sm border-b border-surface-container-highest pb-3">
            Información General
          </h3>

          <div>
            <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">Nombre de la Aplicación</label>
            <input
              type="text"
              value={form.appName}
              onChange={(e) => setForm({ ...form, appName: e.target.value })}
              placeholder="Ej: Resuelve Loteril"
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
            />
            <p className="text-[10px] text-on-surface-variant mt-1">Se muestra en el título del navegador y en la landing</p>
          </div>

          <div>
            <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">Número de WhatsApp</label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-3 rounded-xl bg-surface-container-low border border-r-0 border-surface-container-highest text-on-surface-variant text-sm">+</span>
              <input
                type="tel"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                placeholder="584120000000"
                className="flex-1 p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1">Formato: código país + número (ej: 584120000000)</p>
          </div>

          <div>
            <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">Precio Mínimo del Ticket (Bs)</label>
            <input
              type="number"
              min="1"
              value={form.minTicketPrice}
              onChange={(e) => setForm({ ...form, minTicketPrice: parseInt(e.target.value) || 1 })}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
            />
            <p className="text-[10px] text-on-surface-variant mt-1">Se muestra en el Hero: "Desde X Bs"</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-highest space-y-5">
          <h3 className="font-bold text-on-surface uppercase text-sm border-b border-surface-container-highest pb-3">
            Imagen del Hero
          </h3>
          <p className="text-[10px] text-on-surface-variant">Imagen principal que se muestra en la sección Hero de la landing</p>

          <ImageUploader
            preset="offer"
            description="Hero image"
            currentUrl={form.heroImage}
            onUploaded={(url) => setForm({ ...form, heroImage: url })}
            label="Imagen Principal"
          />

          <div>
            <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">Enlace de la Imagen (opcional)</label>
            <input
              type="url"
              value={form.heroImageLink}
              onChange={(e) => setForm({ ...form, heroImageLink: e.target.value })}
              placeholder="Ej: https://wa.me/584120000000"
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
            />
          </div>

          {form.heroImageLink && (
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">Abrir enlace en</label>
              <select
                value={form.heroImageLinkTarget}
                onChange={(e) => setForm({ ...form, heroImageLinkTarget: e.target.value })}
                className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-pointer"
              >
                <option value="_blank">Nueva pestaña</option>
                <option value="_self">Misma página</option>
              </select>
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-highest space-y-5">
          <h3 className="font-bold text-on-surface uppercase text-sm border-b border-surface-container-highest pb-3">
            Redes Sociales
          </h3>
          <p className="text-[10px] text-on-surface-variant">Si dejas un campo vacío, esa red social no se mostrará en el footer</p>

          <div>
            <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">Instagram</label>
            <input
              type="text"
              value={form.instagram}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
              placeholder="Ej: @resuelveloteril"
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
            />
          </div>

          <div>
            <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">Facebook</label>
            <input
              type="text"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              placeholder="Ej: https://facebook.com/resuelveloteril"
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
            />
          </div>

          <div>
            <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1.5">TikTok</label>
            <input
              type="text"
              value={form.tiktok}
              onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
              placeholder="Ej: @resuelveloteril"
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-highest space-y-4">
          <h3 className="font-bold text-on-surface uppercase text-sm border-b border-surface-container-highest pb-3">
            Vista Previa
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant">Título del sitio:</span>
              <span className="text-on-surface font-medium">{form.appName || 'Sin nombre'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant">WhatsApp:</span>
              <span className="text-on-surface font-medium">+{form.whatsappNumber || 'Sin número'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant">Precio mínimo:</span>
              <span className="text-on-surface font-medium">Bs {form.minTicketPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant">Link WhatsApp:</span>
              <span className="text-primary text-xs break-all">
                https://wa.me/{form.whatsappNumber}
              </span>
            </div>
            {form.instagram && (
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Instagram:</span>
                <span className="text-on-surface font-medium">{form.instagram}</span>
              </div>
            )}
            {form.facebook && (
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">Facebook:</span>
                <span className="text-on-surface font-medium">{form.facebook}</span>
              </div>
            )}
            {form.tiktok && (
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant">TikTok:</span>
                <span className="text-on-surface font-medium">{form.tiktok}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/80 transition-all cursor-pointer"
          >
            <Save className="size-4" />
            {saved ? '✓ Guardado' : 'Guardar Cambios'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-sm font-medium hover:bg-surface-container-highest transition-all cursor-pointer"
          >
            <RotateCcw className="size-4" />
            Restablecer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
