import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Eye, EyeOff } from 'lucide-react';
import useLandingStore from '@/store/landingStore';
import ImageUploader from '@/components/ImageUploader';

const emptyOffer = {
  title: '',
  subtitle: '',
  image: '',
  tagTop: '',
  tagTopColor: 'bg-primary-container text-on-primary',
  tagExtra: '',
  labelTag: '',
  labelText: '',
  badgeVerified: '',
  badgeSorteos: '',
  badgeSorteosDetail: '',
  offerButtonText: 'Apostar con Este Bono',
  offerButtonUrl: '',
  offerButtonTarget: '_blank',
  link: '',
  linkTarget: '_blank',
};

const AdminOffers = () => {
  const { offers, addOffer, updateOffer, removeOffer } = useLandingStore();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyOffer);
  const [showForm, setShowForm] = useState(false);

  const handleSave = () => {
    if (!form.title || !form.subtitle) return;
    if (editing) {
      updateOffer(editing, form);
    } else {
      addOffer(form);
    }
    setForm(emptyOffer);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      tagTop: item.tagTop,
      tagTopColor: item.tagTopColor,
      tagExtra: item.tagExtra,
      labelTag: item.labelTag,
      labelText: item.labelText,
      badgeVerified: item.badgeVerified || '',
      badgeSorteos: item.badgeSorteos || '',
      badgeSorteosDetail: item.badgeSorteosDetail || '',
      offerButtonText: item.offerButtonText || 'Apostar con Este Bono',
      offerButtonUrl: item.offerButtonUrl || '',
      offerButtonTarget: item.offerButtonTarget || '_blank',
      link: item.link || '',
      linkTarget: item.linkTarget || '_blank',
    });
    setEditing(item.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm(emptyOffer);
    setEditing(null);
    setShowForm(false);
  };

  const toggleActive = (id) => {
    const item = offers.find((i) => i.id === id);
    updateOffer(id, { active: !item.active });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Ofertas y Beneficios</h1>
          <p className="text-sm text-on-surface-variant mt-1">Administra los banners promocionales de la landing</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm(emptyOffer); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/80 transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Nueva Oferta</span>
        </button>
      </div>

      {showForm && (
        <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-highest space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-on-surface uppercase text-sm">
              {editing ? 'Editar Oferta' : 'Nueva Oferta'}
            </h3>
            <button onClick={handleCancel} className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant cursor-pointer">
              <X className="size-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Título</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ej: BONO DEL 20% EN TU PRIMERA RECARGA"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Subtítulo</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Ej: Recibe 20% extra en tu primer juego del día"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploader
                preset="offer"
                description={form.title || form.subtitle}
                currentUrl={form.image}
                onUploaded={(url) => setForm({ ...form, image: url })}
                label="Imagen de la Oferta"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Tag Superior</label>
              <input
                type="text"
                value={form.tagTop}
                onChange={(e) => setForm({ ...form, tagTop: e.target.value })}
                placeholder="Ej: ¡BONO RECARGA!"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Tag Extra</label>
              <input
                type="text"
                value={form.tagExtra}
                onChange={(e) => setForm({ ...form, tagExtra: e.target.value })}
                placeholder="Ej: 20% EXTRA"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Label Tag</label>
              <input
                type="text"
                value={form.labelTag}
                onChange={(e) => setForm({ ...form, labelTag: e.target.value })}
                placeholder="Ej: PROMO WHATSAPP"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Label Text</label>
              <input
                type="text"
                value={form.labelText}
                onChange={(e) => setForm({ ...form, labelText: e.target.value })}
                placeholder="Ej: Válido hoy desde 50 Bs"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Badge Verificado</label>
              <input
                type="text"
                value={form.badgeVerified}
                onChange={(e) => setForm({ ...form, badgeVerified: e.target.value })}
                placeholder="Ej: OPERADOR VERIFICADO"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Badge Sorteos</label>
              <input
                type="text"
                value={form.badgeSorteos}
                onChange={(e) => setForm({ ...form, badgeSorteos: e.target.value })}
                placeholder="Ej: Sorteos de Hoy"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Detalle de Sorteos</label>
              <input
                type="text"
                value={form.badgeSorteosDetail}
                onChange={(e) => setForm({ ...form, badgeSorteosDetail: e.target.value })}
                placeholder="Ej: Lotto Activo • La Granjita • Triples Nacionales"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Texto del Botón</label>
              <input
                type="text"
                value={form.offerButtonText}
                onChange={(e) => setForm({ ...form, offerButtonText: e.target.value })}
                placeholder="Ej: Apostar con Este Bono"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">URL del Botón</label>
              <input
                type="url"
                value={form.offerButtonUrl}
                onChange={(e) => setForm({ ...form, offerButtonUrl: e.target.value })}
                placeholder="Ej: https://wa.me/584120000000"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            {form.offerButtonUrl && (
              <div>
                <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Abrir botón en</label>
                <select
                  value={form.offerButtonTarget}
                  onChange={(e) => setForm({ ...form, offerButtonTarget: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-pointer"
                >
                  <option value="_blank">Nueva pestaña</option>
                  <option value="_self">Misma página</option>
                </select>
              </div>
            )}
            <div className="sm:col-span-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Enlace del Banner (opcional)</label>
              <input
                type="url"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="Ej: https://wa.me/584120000000"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            {form.link && (
              <div>
                <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Abrir banner en</label>
                <select
                  value={form.linkTarget}
                  onChange={(e) => setForm({ ...form, linkTarget: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-pointer"
                >
                  <option value="_blank">Nueva pestaña</option>
                  <option value="_self">Misma página</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleSave}
              disabled={!form.title || !form.subtitle}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/80 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="size-4" />
              {editing ? 'Actualizar' : 'Guardar'}
            </button>
            <button onClick={handleCancel} className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-sm font-medium hover:bg-surface-container-highest transition-all cursor-pointer">
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {offers.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl overflow-hidden border transition-all ${
              item.active
                ? 'bg-surface-container border-surface-container-highest'
                : 'bg-surface-container-low border-surface-container-highest opacity-60'
            }`}
          >
            <div className="h-40 bg-surface-container-lowest relative overflow-hidden">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              )}
              {item.tagTop && (
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.tagTopColor}`}>
                  {item.tagTop}
                </span>
              )}
              {item.tagExtra && (
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-accent text-[10px] font-bold uppercase">
                  {item.tagExtra}
                </span>
              )}
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                {item.labelTag && (
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] uppercase font-bold">
                    {item.labelTag}
                  </span>
                )}
                {item.labelText && (
                  <span className="text-[10px] text-on-surface-variant">{item.labelText}</span>
                )}
              </div>
              <h4 className="font-bold text-on-surface text-sm uppercase">{item.title}</h4>
              <p className="text-xs text-on-surface-variant">{item.subtitle}</p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-medium transition-all cursor-pointer"
                >
                  <Edit className="size-3" /> Editar
                </button>
                <button
                  onClick={() => toggleActive(item.id)}
                  className="p-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant transition-all cursor-pointer"
                >
                  {item.active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>
                <button
                  onClick={() => removeOffer(item.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all cursor-pointer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOffers;
