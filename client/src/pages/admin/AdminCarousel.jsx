import { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import useLandingStore from '@/store/landingStore';
import ImageUploader from '@/components/ImageUploader';

const gradients = [
  'from-green-600/90 to-green-900/90',
  'from-yellow-600/90 to-orange-800/90',
  'from-blue-600/90 to-indigo-900/90',
  'from-red-600/90 to-rose-900/90',
  'from-purple-600/90 to-violet-900/90',
  'from-teal-600/90 to-cyan-900/90',
  'from-amber-600/90 to-yellow-900/90',
  'from-emerald-600/90 to-green-900/90',
  'from-sky-600/90 to-blue-900/90',
  'from-fuchsia-600/90 to-pink-900/90',
  'from-indigo-600/90 to-purple-900/90',
  'from-rose-600/90 to-red-900/90',
];

const emptyItem = { name: '', image: '', text: '', sub: '', gradient: gradients[0] };

const AdminCarousel = () => {
  const { carousel, addCarouselItem, updateCarouselItem, removeCarouselItem } = useLandingStore();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [showForm, setShowForm] = useState(false);

  const handleSave = () => {
    if (!form.name || !form.text) return;
    if (editing) {
      updateCarouselItem(editing, form);
    } else {
      addCarouselItem(form);
    }
    setForm(emptyItem);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, image: item.image, text: item.text, sub: item.sub, gradient: item.gradient });
    setEditing(item.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm(emptyItem);
    setEditing(null);
    setShowForm(false);
  };

  const toggleActive = (id) => {
    const item = carousel.find((i) => i.id === id);
    updateCarouselItem(id, { active: !item.active });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Carrusel Publicitario</h1>
          <p className="text-sm text-on-surface-variant mt-1">Administra las imágenes del carrusel de publicidades</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm(emptyItem); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/80 transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Nuevo Item</span>
        </button>
      </div>

      {showForm && (
        <div className="p-6 rounded-2xl bg-surface-container border border-surface-container-highest space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-on-surface uppercase text-sm">
              {editing ? 'Editar Item' : 'Nuevo Item'}
            </h3>
            <button onClick={handleCancel} className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant cursor-pointer">
              <X className="size-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Nombre</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ej: Lotto Activo"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Texto Principal</label>
              <input
                type="text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Ej: LOTTO ACTIVO"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Subtexto</label>
              <input
                type="text"
                value={form.sub}
                onChange={(e) => setForm({ ...form, sub: e.target.value })}
                placeholder="Ej: Sorteos cada hora"
                className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-highest text-on-surface text-sm focus:border-primary outline-none cursor-text"
              />
            </div>
            <div>
              <ImageUploader
                preset="carousel"
                description={form.text || form.name}
                currentUrl={form.image}
                onUploaded={(url) => setForm({ ...form, image: url })}
                label="Imagen del Carrusel"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-on-surface-variant uppercase font-bold block mb-1">Gradiente</label>
              <div className="flex flex-wrap gap-2">
                {gradients.map((g) => (
                  <button
                    key={g}
                    onClick={() => setForm({ ...form, gradient: g })}
                    className={`w-8 h-8 rounded-lg bg-gradient-to-r ${g} transition-all cursor-pointer ${
                      form.gradient === g ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleSave}
              disabled={!form.name || !form.text}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {carousel.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl overflow-hidden border transition-all ${
              item.active
                ? 'bg-surface-container border-surface-container-highest'
                : 'bg-surface-container-low border-surface-container-highest opacity-60'
            }`}
          >
            <div className={`h-24 bg-gradient-to-r ${item.gradient} flex items-center justify-center relative`}>
              {item.image && (
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-40" />
              )}
              <span className="relative z-10 text-white font-bold text-sm uppercase tracking-wider drop-shadow-md">
                {item.text}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-on-surface font-medium text-sm">{item.name}</span>
                <span className="text-on-surface-variant text-xs">{item.sub}</span>
              </div>
              <div className="flex items-center gap-2">
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
                  onClick={() => removeCarouselItem(item.id)}
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

export default AdminCarousel;
