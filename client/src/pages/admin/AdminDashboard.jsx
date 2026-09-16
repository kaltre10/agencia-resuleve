import { Link } from 'react-router-dom';
import { Images, Tag, BarChart3, Settings, TrendingUp, Ticket } from 'lucide-react';
import useLandingStore from '@/store/landingStore';

const stats = [
  { label: 'Carrusel', key: 'carousel', icon: Images, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Ofertas', key: 'offers', icon: Tag, color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'Números Calientes', key: 'hot', icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10' },
  { label: 'Números Fríos', key: 'cold', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10' },
];

const AdminDashboard = () => {
  const { carousel, offers, predictions, settings } = useLandingStore();

  const counters = {
    carousel: carousel.length,
    offers: offers.length,
    hot: predictions.hot.length,
    cold: predictions.cold.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Dashboard</h1>
        <p className="text-sm text-on-surface-variant mt-1">Gestiona todo el contenido de la landing page</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant uppercase font-bold">{stat.label}</p>
                <p className="text-2xl font-bold text-on-surface">{counters[stat.key]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          to="/admin/carrusel"
          className="group p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-surface-container-highest transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <Images className="size-6 text-primary" />
            <h3 className="font-bold text-on-surface uppercase text-sm">Carrusel Publicitario</h3>
          </div>
          <p className="text-xs text-on-surface-variant">Administra las imágenes y textos del carrusel de publicidades</p>
        </Link>

        <Link
          to="/admin/ofertas"
          className="group p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-surface-container-highest transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <Tag className="size-6 text-accent" />
            <h3 className="font-bold text-on-surface uppercase text-sm">Ofertas y Beneficios</h3>
          </div>
          <p className="text-xs text-on-surface-variant">Gestiona los banners promocionales y ofertas especiales</p>
        </Link>

        <Link
          to="/admin/tendencias"
          className="group p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-surface-container-highest transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="size-6 text-secondary" />
            <h3 className="font-bold text-on-surface uppercase text-sm">Tendencias y Pronósticos</h3>
          </div>
          <p className="text-xs text-on-surface-variant">Administra números calientes, fríos y estadísticas</p>
        </Link>

        <Link
          to="/admin/configuracion"
          className="group p-6 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-surface-container-highest transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <Settings className="size-6 text-primary" />
            <h3 className="font-bold text-on-surface uppercase text-sm">Configuración General</h3>
          </div>
          <p className="text-xs text-on-surface-variant">Nombre de la app, WhatsApp y precio mínimo del ticket</p>
        </Link>
      </div>

      <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest">
        <div className="flex items-center gap-2 mb-3">
          <Ticket className="size-5 text-primary" />
          <h3 className="font-bold text-on-surface uppercase text-sm">Configuración Actual</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-on-surface-variant text-xs uppercase">App Name:</span>
            <p className="text-on-surface font-medium">{settings.appName}</p>
          </div>
          <div>
            <span className="text-on-surface-variant text-xs uppercase">WhatsApp:</span>
            <p className="text-on-surface font-medium">+{settings.whatsappNumber}</p>
          </div>
          <div>
            <span className="text-on-surface-variant text-xs uppercase">Precio Mínimo:</span>
            <p className="text-on-surface font-medium">Bs {settings.minTicketPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
