import DataTable from "@/components/Table";
import { usersColumns } from "./usersColumns";
import { useAdminUsers } from "@/hooks/useUser";

function UsersPage() {
  const { data, isLoading, isError } = useAdminUsers({ page: 1 });

  const rows = data?.users ?? []; // 👈 siempre un array

  if (isLoading) {
    return <p>Cargando usuarios...</p>;
  }

  if (isError) {
    return <p>Ocurrió un error al cargar los usuarios.</p>;
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
        <p className="text-sm text-muted-foreground">
          Lista de usuarios administradores activos del sistema.
        </p>
      </header>
      <DataTable
        columns={usersColumns}
        data={rows} // 👈 aquí ya no puede ser undefined
      />
    </div>
  );
}

export default UsersPage;
