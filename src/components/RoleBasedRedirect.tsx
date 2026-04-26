// frontend/src/components/RoleBasedRedirect.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const RoleBasedRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Redirecionar baseado na role
  console.log("Redirecting user with role:", user.role);

  if (user.role === "funcionario") {
    return <Navigate to="/employee/dashboard" replace />;
  }

  // Admin e RH
  return <Navigate to="/dashboard" replace />;
};
