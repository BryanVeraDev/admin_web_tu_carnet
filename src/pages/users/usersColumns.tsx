import type { ColumnDef } from "@tanstack/react-table";

import type { AuthUser } from "@/context/auth.store";

// La fila de la tabla tendrá la misma forma que AuthUser
export type UserRow = AuthUser;

export const usersColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const { name, last_name } = row.original;
      return (
        <span>
          {name} {last_name}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Correo",
    cell: ({ getValue }) => {
      const email = getValue() as string;
      return (
        <span className="text-sm text-muted-foreground">
          {email}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ getValue }) => {
      const role = getValue() as UserRow["role"];

      const label =
        role === "SuperAdmin"
          ? "Super administrador"
          : role === "ValidaTor"
          ? "Validador"
          : role;

      return (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {label}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Fecha creación",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const date = new Date(value);

      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      );
    },
  },
];
