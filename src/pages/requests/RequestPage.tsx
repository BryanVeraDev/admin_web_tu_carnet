import DataTable from "@/components/Table";
import { solicitudesColumns } from "./requestColumns";
import { usePendingPhotoRequests } from "@/hooks/useUser";

function SolicitudesPage() {
  const { data, isLoading, isError } = usePendingPhotoRequests();
  const rows = data?.requests ?? [];

  return (
    <div className="space-y-4">
      <header>
        {" "}
        <h1 className="text-2xl font-semibold tracking-tight">
          Solicitudes pendientes{" "}
        </h1>{" "}
        <p className="text-sm text-muted-foreground">
          Revisa, valida y gestiona las solicitudes de actualización de foto.{" "}
        </p>{" "}
      </header>{" "}
      {isLoading && (
        <p className="text-sm text-muted-foreground">Cargando solicitudes...</p>
      )}
      {isError && (
        <p className="text-sm text-destructive">
          Ocurrió un error al cargar las solicitudes.
        </p>
      )}
      {!isLoading && !isError && (
        <DataTable columns={solicitudesColumns} data={rows} />
      )}
    </div>
  );
}

export default SolicitudesPage;
