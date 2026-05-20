import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md space-y-6">
        <div className="text-8xl font-bold text-muted-foreground/30">404</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Página não encontrada
          </h1>
          <p className="text-sm text-muted-foreground">
            A página <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{location.pathname}</code> não existe ou foi movida.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={() => navigate('/dashboard')} className="gap-2">
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
