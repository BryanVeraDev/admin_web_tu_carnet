import type { ColumnDef } from "@tanstack/react-table";
import type { PhotoRequest } from "@/services/PhotoRequest";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const solicitudesColumns: ColumnDef<PhotoRequest>[] = [
  {
    accessorKey: "student.student_code",
    header: "Código",
    cell: ({ row }) => row.original.student.student_code,
  },
  {
    accessorKey: "student.name",
    header: "Estudiante",
    cell: ({ row }) => {
      const s = row.original.student;
      return `${s.name} ${s.last_name}`;
    },
  },
  {
    accessorKey: "student.email",
    header: "Correo",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.student.email}
      </span>
    ),
  },
  {
    accessorKey: "student.career",
    header: "Programa",
    cell: ({ row }) => row.original.student.career,
  },
  {
    accessorKey: "application_date",
    header: "Fecha solicitud",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const date = new Date(value);

      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <Button asChild variant="outline" size="sm" className="cursor-pointer">
          <Link to={`/dashboard/solicitudes/${request.request_id}`}>
            Revisar
          </Link>
        </Button>
      );
    },
  },
];
