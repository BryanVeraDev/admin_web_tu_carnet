import { useMutation } from '@tanstack/react-query';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { login } from '@/services/Auth';
import type { LoginPayload } from '@/services/Auth';
import { getAdminUsers, type UsersQueryParams } from "@/services/User";
import { getPendingPhotoRequests } from "@/services/PhotoRequest";
import { useAuthStore } from '@/context/auth.store';
import { toast } from 'sonner';

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      setSession(data); // aquí guardas user + access_token en Zustand
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard', { replace: true });
    },
    onError: () => {
      toast.error("Credenciales inválidas o cuenta inactiva");
    },
  });
};

export default function useUser() {
  // Usamos selectores simples, uno por campo, para evitar objetos nuevos
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  // Derivados calculados en el hook
  const isSuperAdmin = user?.role === 'SuperAdmin';
  const isValidator = user?.role === 'ValidaTor';

  return {
    user,
    accessToken,
    isAuthenticated,
    isSuperAdmin,
    isValidator,
    logout,
  };
}

export const useAdminUsers = (params: UsersQueryParams = {}) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAdminUsers(params),
    // Puedes configurar staleTime, retry, etc. si quieres
  });
};

export const usePendingPhotoRequests = () => {
  return useQuery({
    queryKey: ["photo-requests", "pending"],
    queryFn: getPendingPhotoRequests,
  });
};

