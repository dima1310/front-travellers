import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;                 // ДОДАНО!
  setHydrated: (v: boolean) => void; // ДОДАНО!
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hydrated: false,

      setHydrated: (v) => set({ hydrated: v }),

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        // hydration completed
        state?.setHydrated(true);
      },
    }
  )
);
