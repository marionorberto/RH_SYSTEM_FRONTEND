// // frontend/src/components/ProtectedRoute.tsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredRole?: string;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   requiredRole,
// }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Carregando...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (requiredRole && !user.roles?.includes(requiredRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// frontend/src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Roles permitidas para aceder à rota
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Se a rota requer roles específicas
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirecionar para dashboard apropriado baseado na role
      if (userRole === "funcionario") {
        return <Navigate to="/employee/dashboard" replace />;
      }
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// // frontend/src/components/ProtectedRoute.tsx
// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   allowedRoles
// }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (allowedRoles && allowedRoles.length > 0) {
//     if (!allowedRoles.includes(user.role)) {
//       // Redirecionar para o dashboard correto baseado na role
//       if (user.role === 'funcionario') {
//         return <Navigate to="/employee/dashboard" replace />;
//       }
//       return <Navigate to="/dashboard" replace />;
//     }
//   }

//   return <>{children}</>;
// };
