import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AdminRole = 'SuperAdmin' | 'ValidaTor';

export interface AuthUser {
  admin_id: string;
  name: string;
  last_name: string;
  email: string;
  role: AdminRole;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  // acciones
  setSession: (data: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setSession: (data: LoginResponse) => {
        set({
          user: data.user,
          accessToken: data.access_token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-admin',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);