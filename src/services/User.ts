import type { AuthUser, AdminRole } from "@/context/auth.store";
import { httpClient } from "@/config/axios";

export interface UsersQueryParams {
  page?: number;          // página actual (backend: number)
  role?: AdminRole;       // "SuperAdmin" | "ValidaTor" (o undefined para todos)
  search?: string;        // término de búsqueda
}

// Estructura normalizada que usará el frontend
export interface UsersListResponse {
  users: AuthUser[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Obtiene la lista paginada de usuarios administradores activos.
 * Aplica filtros opcionales por rol y búsqueda.
 */
export const getAdminUsers = async (
  params: UsersQueryParams = {}
): Promise<UsersListResponse> => {
  const {
    page = 1,
    role,
    search,
  } = params;

  // Llamada al backend usando httpClient (con Authorization ya gestionado por el interceptor)
  const { data } = await httpClient.get<{
    data: AuthUser[];
    total: number;
    page: number;
    limit: number;
  }>("/api/admin", {
    params: {
      page,
      role,
      search,
    },
  });

  // Normalizamos la respuesta para que el resto de la app siempre reciba la misma forma
  return {
    users: data.data,
    total: data.total,
    page: data.page,
    limit: data.limit,
  };
};