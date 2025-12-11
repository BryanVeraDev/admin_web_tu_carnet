import { Link } from "react-router-dom";
import { Users, NotebookPen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Dashboard() {
  return (
      <div className="p-2 md:p-4 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Panel de administración
          </h1>
          <p className="text-sm text-muted-foreground">
            Selecciona una sección o revisa las opciones principales del sistema.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Usuarios */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Gestiona los usuarios con acceso al sistema.
              </p>
              <Link
                to="/dashboard/usuarios"
                className="text-sm font-medium text-primary hover:underline"
              >
                Ir a usuarios
              </Link>
            </CardContent>
          </Card>

          {/* Solicitudes */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NotebookPen className="w-5 h-5" />
                Solicitudes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Revisa, valida y gestiona las solicitudes registradas.
              </p>
              <Link
                to="/dashboard/solicitudes"
                className="text-sm font-medium text-primary hover:underline"
              >
                Ir a solicitudes
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
  );
}