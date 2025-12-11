import { useQuery } from "@tanstack/react-query";
import { getLivenessPhotoUrl } from "@/services/Liveness";

export const useLivenessPhotoUrl = (photoKey?: string | null) => {
  const expiresInSeconds = Number(
    import.meta.env.VITE_SIGNED_URL_EXPIRATION || 600
  );

  // margen de seguridad, por ejemplo 60s antes de caducar
  const safetyMarginSeconds = 60;

  const staleTimeMs = Math.max(
    0,
    (expiresInSeconds - safetyMarginSeconds) * 1000
  );

  return useQuery({
    enabled: !!photoKey,
    queryKey: ["liveness-photo", photoKey],
    queryFn: () => getLivenessPhotoUrl(photoKey as string),

    // El URL se considera "fresco" hasta poco antes de expirar
    retry: false, // no reintentar
    refetchOnWindowFocus: false,
    staleTime: staleTimeMs,
  });
};
