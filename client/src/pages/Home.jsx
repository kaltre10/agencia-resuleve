import { Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Mi Landing</h1>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm">Admin</Button>
                    </Link>
                  )}
                </>
              ) : null}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">
            Bienvenido a Nuestra Plataforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Landing page administrable desde el servidor
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
