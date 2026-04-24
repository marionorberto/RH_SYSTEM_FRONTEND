import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoutes = () => {
  const token = localStorage.getItem("@NutriScan:token");
  const location = useLocation();

  // Se não houver token, redireciona para o login
  // O 'state' serve para sabermos de onde o usuário veio e devolvê-lo para lá após o login
  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Se houver token, renderiza as rotas filhas (Dashboard, Users, etc)
  return <Outlet />;
};
