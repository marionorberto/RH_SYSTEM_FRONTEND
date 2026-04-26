import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { AuthProvider } from "./context/AuthContext";
import CompanyProfile from "./pages/company-profile/company-profile";
import UserList from "./pages/users/UserList";
import CreateUser from "./pages/users/CreateUser";
import CreateDepartament from "./pages/Departaments/CreateDepartament";
import DepartamentList from "./pages/Departaments/DepartamentList";
import EditDepartament from "./pages/Departaments/EditDepartament";
import EmployeeList from "./pages/Employee/EmployeeList";
import CreateEmployee from "./pages/Employee/CreateEmployee";
import RemunerationList from "./pages/Remunerations/RemunerationList";
import CreateRemuneration from "./pages/Remunerations/CreateRemuneration";
import FunctionList from "./pages/Functions/FunctionList";
import CreateFunction from "./pages/Functions/CreateFunction";
import CreateDiscount from "./pages/Discounts/CreateDiscount";
import DiscountList from "./pages/Discounts/DiscountList";
import Effectiveness from "./pages/Efectiveness/Effectiveness";
import PayrollProcessing from "./pages/Payroll/PayrollProcessing";
import CompanyConfig from "./pages/Configurations/Company";
import SystemLogs from "./pages/Logs/SystemLogs";
import GeneralSettings from "./pages/Settings/GeneralSettings";
import EmployeeProfile from "./pages/EmployeeProfile/EmployeeProfile";
import PersonalFinance from "./pages/PersonalFinance/PersonalFinance";
import SalarySimulator from "./pages/SalarySimulator/SalarySimulator";
import CompanyCalendar from "./components/CompanyCalendar/CompanyCalendar";
import EmployeeDashboard from "./pages/DashboardEmployee/Home";
import AppLayoutEmployee from "./layout/AppLayoutEmployee";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleBasedRedirect } from "./components/RoleBasedRedirect";

// frontend/src/App.tsx
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Rota pública de login */}
          <Route path="/signin" element={<SignIn />} />

          {/* Redirecionamento baseado na role */}
          <Route path="/" element={<RoleBasedRedirect />} />

          {/* Rotas protegidas - ADMIN e RH */}
          <Route
            path="/dashboard" // ← path base para admin
            element={
              <ProtectedRoute allowedRoles={["admin", "rh"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* Usar paths relativos (sem a barra no início) */}
            <Route index element={<Home />} /> {/* /dashboard */}
            <Route path="profile" element={<CompanyProfile />} />{" "}
            {/* /dashboard/profile */}
            <Route path="calendary" element={<CompanyCalendar />} />
            {/* Users */}
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/list" element={<UserList />} />
            {/* Departamentos */}
            <Route path="departaments/create" element={<CreateDepartament />} />
            <Route path="departaments/list" element={<DepartamentList />} />
            <Route path="departaments/edit" element={<EditDepartament />} />
            {/* Employees */}
            <Route path="employee/list" element={<EmployeeList />} />
            <Route path="employee/create" element={<CreateEmployee />} />
            {/* Functions */}
            <Route path="functions/list" element={<FunctionList />} />
            <Route path="functions/create" element={<CreateFunction />} />
            {/* Remunerations */}
            <Route path="remunerations/list" element={<RemunerationList />} />
            <Route
              path="remunerations/create"
              element={<CreateRemuneration />}
            />
            {/* Discounts */}
            <Route path="discounts/list" element={<DiscountList />} />
            <Route path="discounts/create" element={<CreateDiscount />} />
            {/* Others */}
            <Route path="effectiveness" element={<Effectiveness />} />
            <Route path="payroll" element={<PayrollProcessing />} />
            <Route path="company-issue" element={<CompanyConfig />} />
            <Route path="logs" element={<SystemLogs />} />
            <Route path="config/geral" element={<GeneralSettings />} />
          </Route>

          {/* Rotas protegidas - FUNCIONÁRIO */}
          <Route
            path="/employee" // ← path base para funcionário
            element={
              <ProtectedRoute allowedRoles={["funcionario"]}>
                <AppLayoutEmployee />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeDashboard />} /> {/* /employee */}
            <Route path="dashboard" element={<EmployeeDashboard />} />{" "}
            {/* /employee/dashboard */}
            <Route path="profile" element={<EmployeeProfile />} />{" "}
            {/* /employee/profile */}
            <Route path="personal-finance" element={<PersonalFinance />} />{" "}
            {/* /employee/personal-finance */}
            <Route path="salary-simulator" element={<SalarySimulator />} />{" "}
            {/* /employee/salary-simulator */}
          </Route>

          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
