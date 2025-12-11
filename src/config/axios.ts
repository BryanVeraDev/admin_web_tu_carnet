import axios from 'axios';
import { useAuthStore } from '@/context/auth.store';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url;

    // Endpoints que NO deben disparar logout/redirección en 401/403
    const authExcluded = ['/api/admin/login'];

    if (
      (status === 401 || status === 403) &&
      requestUrl &&
      !authExcluded.includes(requestUrl)
    ) {
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);