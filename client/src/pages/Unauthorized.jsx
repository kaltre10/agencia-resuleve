import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold text-destructive">403</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold">Acceso No Autorizado</h2>
          <p className="text-muted-foreground">
            No tienes permisos para acceder a esta pagina.
          </p>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
