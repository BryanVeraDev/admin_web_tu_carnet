import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPhotoRequestById,
  respondPhotoRequest,
  type RespondStatus,
} from "@/services/PhotoRequest";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";

interface RespondArgs {
  requestId: string;
  status: RespondStatus;
  response_message: string;
}

export const useRespondPhotoRequest = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ requestId, status, response_message }: RespondArgs) => {
      if (!user) {
        throw new Error("No hay admin autenticado");
      }

      return respondPhotoRequest({
        request_id: requestId,
        admin_id: user.admin_id,
        status,
        response_message,
      });
    },
    onSuccess: (data, variables) => {
      toast.success(data.message || "Solicitud actualizada correctamente.");

      // Refresca lista de pendientes
      queryClient.invalidateQueries({
        queryKey: ["photo-requests", "pending"],
      });

      // Refresca detalle de esa solicitud en concreto
      queryClient.invalidateQueries({
        queryKey: ["photo-request", variables.requestId],
      });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        "Error al procesar la respuesta de la solicitud.";
      toast.error(msg);
    },
  });
};

export const usePhotoRequestDetail = (id?: string) => {
  return useQuery({
    queryKey: ["photo-request", id],
    queryFn: () => getPhotoRequestById(id!), // id! porque enabled ya lo filtra
    enabled: !!id,
  });
};