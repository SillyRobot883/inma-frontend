import { useAuth } from '@/contexts/AuthContext';

export { useAuth } from '@/contexts/AuthContext';

export function useAuthActions() {
  const { login, logout, isLoading } = useAuth();

  return {
    login,
    logout,
    isLoading,
  };
}

export function useUser() {
  const { user, isAuthenticated } = useAuth();

  return {
    user,
    isAuthenticated,
  };
}
