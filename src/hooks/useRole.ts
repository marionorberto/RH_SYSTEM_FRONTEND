// frontend/src/hooks/useRole.ts
import { useAuth } from "../context/AuthContext";

export const useRole = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';
  const isRH = user?.role === 'rh';
  const isFuncionario = user?.role === 'funcionario';
  const isSuperAdmin = user?.isSuperAdmin || false;

  const hasAnyRole = (roles: string[]) => {
    if (!user?.role) return false;
    return roles.includes(user.role);
  };

  return {
    role: user?.role,
    isAdmin,
    isRH,
    isFuncionario,
    isSuperAdmin,
    hasAnyRole,
  };
};