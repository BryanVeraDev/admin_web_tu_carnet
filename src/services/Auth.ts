import type { AuthUser } from '@/context/auth.store';
import { httpClient } from '@/config/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  access_token: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await httpClient.post<LoginResponse>('/api/admin/login', payload);
  return {
    access_token: data.access_token,
    user: data.user,
  };
};