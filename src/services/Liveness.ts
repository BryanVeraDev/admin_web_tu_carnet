import axios from "axios";

const LIVENESS_BASE_URL = import.meta.env.VITE_LIVENESS_URL;

if (!LIVENESS_BASE_URL) {
  console.warn(
    "[Liveness] VITE_LIVENESS_URL no está definido. Configúralo en tu .env"
  );
}

/**
 * Pide al servicio de liveness un URL firmado a partir de la key.
 */
export const getLivenessPhotoUrl = async (photoKey: string): Promise<string> => {
  if (!photoKey) {
    throw new Error("photoKey vacío");
  }

  const { data } = await axios.post<{ url: string }>(
    `${LIVENESS_BASE_URL}/photo/signedUrl`,
    {
      photoKey 
    }
  );

  if (!data?.url) {
    throw new Error("La respuesta del servicio de liveness no contiene 'url'");
  }

  return data.url;
};