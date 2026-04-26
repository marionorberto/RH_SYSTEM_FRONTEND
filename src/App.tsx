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

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Rota pública de login */}
          <Route path="/signin" element={<SignIn />} />

          {/* Rotas protegidas - AppLayout já verifica autenticação */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<CompanyProfile />} />

            <Route path="/home-employee" element={<EmployeeDashboard />} />

            <Route path="/employee/profile" element={<EmployeeProfile />} />
            <Route
              path="/employee/personal-finance"
              element={<PersonalFinance />}
            />

            <Route
              path="/employee/salary-simulator"
              element={<SalarySimulator />}
            />

            <Route path="/calendary" element={<CompanyCalendar />} />

            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/list" element={<UserList />} />

            <Route
              path="/departaments/create"
              element={<CreateDepartament />}
            />
            <Route path="/departaments/list" element={<DepartamentList />} />
            <Route path="/departaments/edit" element={<EditDepartament />} />

            <Route path="/employee/list" element={<EmployeeList />} />
            <Route path="/employee/create" element={<CreateEmployee />} />

            <Route path="/functions/list" element={<FunctionList />} />
            <Route path="/functions/create" element={<CreateFunction />} />

            <Route path="/remunerations/list" element={<RemunerationList />} />
            <Route
              path="/remunerations/create"
              element={<CreateRemuneration />}
            />

            <Route path="/discounts/list" element={<DiscountList />} />
            <Route path="/discounts/create" element={<CreateDiscount />} />

            <Route path="/effectiveness" element={<Effectiveness />} />

            <Route path="/payroll/" element={<PayrollProcessing />} />

            <Route path="/company-issue" element={<CompanyConfig />} />
            <Route path="/logs" element={<SystemLogs />} />
            <Route path="/config/geral" element={<GeneralSettings />} />
          </Route>

          <Route element={<AppLayoutEmployee />}>
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<CompanyProfile />} />
          </Route>

          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
