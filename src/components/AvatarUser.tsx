import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { AuthUser } from "@/context/auth.store";

interface AvatarUserProps {
  user: AuthUser | null;
  logout: () => void;
  userIsAdminOrSales: boolean; // en tu caso será SuperAdmin/ValidaTor con acceso
}

function AvatarUser({ user, logout, userIsAdminOrSales }: AvatarUserProps) {
  // Iniciales del usuario (ej: "Juan Pérez" -> "JP")
  const initials =
    (user?.name?.[0] || "") + (user?.last_name?.[0] || "") || "A";

  const initialsUpper = initials.toUpperCase();

  // Rol legible
  const readableRole =
    user?.role === "SuperAdmin"
      ? "Super administrador"
      : user?.role === "ValidaTor"
      ? "Validador"
      : "Usuario";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-[30px] mt-1 w-[30px]">
          <AvatarFallback className="bg-white text-primary font-semibold text-xs">
            {initialsUpper}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {user ? `${user.name} ${user.last_name}` : "Invitado"}
            </span>
            {user && (
              <>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
                <span className="text-xs text-muted-foreground">
                  {readableRole}
                </span>
              </>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Acceso al panel solo si tiene rol con acceso */}
        {userIsAdminOrSales && (
          <Link to="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              Ir al panel
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuSeparator />

        {/* Cerrar sesión */}
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarUser;
