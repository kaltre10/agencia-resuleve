import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Images, Tag, BarChart3, Settings, LogOut, ChevronRight } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import ThemeToggle from '@/components/ThemeToggle';
import ModalConfirm from '@/components/ModalConfirm';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/carrusel', label: 'Carrusel Publicitario', icon: Images },
  { path: '/admin/ofertas', label: 'Ofertas y Beneficios', icon: Tag },
  { path: '/admin/tendencias', label: 'Tendencias y Pronósticos', icon: BarChart3 },
  { path: '/admin/configuracion', label: 'Configuración General', icon: Settings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-64 bg-surface-container border-r border-surface-container-highest transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-surface-container-highest">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-on-primary font-bold text-sm">RL</span>
              </div>
              <span className="font-bold text-on-surface uppercase text-sm tracking-tight">Admin Panel</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="size-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-surface-container-highest">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-on-surface truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all mt-1 cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 sm:h-16 border-b border-surface-container-highest bg-surface flex items-center justify-between px-3 sm:px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant cursor-pointer"
          >
            <Menu className="size-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-medium transition-all"
            >
              Ver Landing ↗
            </Link>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

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

export default AdminLayout;
