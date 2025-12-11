import { httpClient } from "@/config/axios";

// Ajusta estos tipos a los nombres reales de tu Prisma si hace falta
export interface PhotoRequestStudent {
  student_id: string;
  name: string;
  last_name: string;
  email: string;
  student_code: string;
  card_photo_key: string | null;
  career: string;
  student_type: string;
}

export type PhotoRequestStatus = "PENDIENTE" | "APROBADA" | "RECHAZADA";

export interface PhotoRequest {
  // Ojo: ajusta al nombre real del campo (id, request_id, photo_request_id, etc.)
  request_id: string;
  status: PhotoRequestStatus;
  application_date: string;
  new_photo_url?: string | null;
  student: PhotoRequestStudent;
}

export interface PendingRequestsApiResponse {
  total: number;
  requests: PhotoRequest[];
}

export type RespondStatus = "APROBADO" | "RECHAZADO";

export interface RespondPhotoRequestPayload {
  request_id: string;
  admin_id: string;
  status: RespondStatus;
  response_message: string;
}

// La respuesta que estás retornando desde el service:
export interface RespondPhotoRequestResponse {
  success: boolean;
  message: string;
  request: any; // si quieres, tipas esto como PhotoRequestDetail
}

/**
 * Obtiene todas las solicitudes de actualización de foto pendientes.
 */
export const getPendingPhotoRequests = async (): Promise<PendingRequestsApiResponse> => {
  const { data } = await httpClient.get<PendingRequestsApiResponse>(
    "/api/photo-request/pending"
  );

  return data;
};

export const respondPhotoRequest = async (
  payload: RespondPhotoRequestPayload
): Promise<RespondPhotoRequestResponse> => {
  const { data } = await httpClient.patch<RespondPhotoRequestResponse>(
    "/api/photo-request/respond",
    payload
  );
  return data;
};

// Detalle por ID
export const getPhotoRequestById = async (
  request_id: string
): Promise<PhotoRequest> => {
  const { data } = await httpClient.get<PhotoRequest>(
    `/api/photo-request/${request_id}`
  );
  return data;
};

