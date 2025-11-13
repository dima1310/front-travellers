import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return {
    isAuth: isAuthenticated,
    user,
    token,
  };
};
