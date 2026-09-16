import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import ModalConfirm from '@/components/ModalConfirm';
import { Images, Tag, BarChart3, Settings, Shield, Users, LogOut } from 'lucide-react';

const adminModules = [
  { path: '/admin', label: 'Panel Admin', icon: Shield, color: 'text-primary', bg: 'bg-primary/10', desc: 'Gestión completa del sitio' },
  { path: '/admin/carrusel', label: 'Carrusel', icon: Images, color: 'text-accent', bg: 'bg-accent/10', desc: 'Imágenes publicitarias' },
  { path: '/admin/ofertas', label: 'Ofertas', icon: Tag, color: 'text-secondary', bg: 'bg-secondary/10', desc: 'Banners promocionales' },
  { path: '/admin/tendencias', label: 'Tendencias', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10', desc: 'Números calientes y fríos' },
  { path: '/admin/configuracion', label: 'Configuración', icon: Settings, color: 'text-accent', bg: 'bg-accent/10', desc: 'App, WhatsApp, precios' },
];

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:h-16 gap-2 sm:gap-0 py-3 sm:py-0">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                  Admin
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Ver Landing ↗
              </Link>
              <span className="text-sm text-muted-foreground hidden sm:inline">{user?.name}</span>
              <ThemeToggle />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowLogoutModal(true)}
                className="cursor-pointer"
              >
                <LogOut className="size-4 mr-1" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {user?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-medium">{user?.email}</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Rol</p>
                <p className="text-lg font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isAdmin && (
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              Módulos de Administración
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {adminModules.map((mod) => (
                <Link
                  key={mod.path}
                  to={mod.path}
                  className="group p-5 rounded-2xl bg-surface hover:bg-surface-container border border-surface-container-highest transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl ${mod.bg} ${mod.color} flex items-center justify-center`}>
                      <mod.icon className="size-5" />
                    </div>
                    <h3 className="font-bold text-on-surface uppercase text-sm group-hover:text-primary transition-colors">
                      {mod.label}
                    </h3>
                  </div>
                  <p className="text-xs text-on-surface-variant">{mod.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {!isAdmin && (
          <div className="text-center py-8">
            <Users className="size-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No tienes módulos de administración disponibles</p>
          </div>
        )}
      </main>

      <ModalConfirm
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
        title="Cerrar Sesión"
        message="¿Estás seguro de que deseas cerrar sesión? Tendrás que volver a iniciar sesión para acceder al panel."
        confirmText="Cerrar Sesión"
        cancelText="Cancelar"
        danger
      />
    </div>
  );
};

export default Dashboard;
