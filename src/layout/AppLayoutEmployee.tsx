import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext"; // Importe o useAuth
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebarEmployee from "./AppSidebarEmployee";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebarEmployee />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayoutEmployee: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth(); // Use o contexto de autenticação

  // Se não houver usuário, redireciona para o login
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayoutEmployee;
