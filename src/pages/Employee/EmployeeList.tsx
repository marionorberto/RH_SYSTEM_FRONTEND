// src/pages/Employees/EmployeeList.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import EmployeeFilters from "../../components/Employee/EmployeeFilters";

// Dados mockados baseados na entidade Employee
const mockEmployees = [
  {
    id: "1",
    employee_name: "João Silva",
    email: "joao.silva@empresa.com",
    telefone1: "+244 923 456 789",
    function: { functionName: "Desenvolvedor Sênior" },
    category: { categoryName: "Categoria A" },
    estado: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    employee_name: "Maria Santos",
    email: "maria.santos@empresa.com",
    telefone1: "+244 923 456 788",
    function: { functionName: "Analista de RH" },
    category: { categoryName: "Categoria B" },
    estado: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    employee_name: "Carlos Oliveira",
    email: "carlos.oliveira@empresa.com",
    telefone1: "+244 923 456 787",
    function: { functionName: "Analista Financeiro" },
    category: { categoryName: "Categoria C" },
    estado: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    employee_name: "Ana Costa",
    email: "ana.costa@empresa.com",
    telefone1: "+244 923 456 786",
    function: { functionName: "Coordenadora Comercial" },
    category: { categoryName: "Categoria A" },
    estado: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    employee_name: "Pedro Almeida",
    email: "pedro.almeida@empresa.com",
    telefone1: "+244 923 456 785",
    function: { functionName: "CTO" },
    category: { categoryName: "Categoria A" },
    estado: true,
    createdAt: new Date().toISOString(),
  },
];

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...employees];

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.function?.functionName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((emp) =>
        statusFilter === "active" ? emp.estado : !emp.estado,
      );
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, statusFilter, employees]);

  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, estado: !emp.estado } : emp,
      ),
    );
  };

  const handleCreate = () => {
    navigate("/employees/create");
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Listar Funcionários | Sistema RH" />
        <PageBreadcrumb pageTitle="Funcionários" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando funcionários...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Listar Funcionários | Sistema de Gestão de RH"
        description="Gerencie os funcionários da empresa"
      />
      <PageBreadcrumb pageTitle="Funcionários" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Funcionários
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie todos os funcionários da empresa
            </p>
          </div>
          <Button
            size="md"
            variant="primary"
            onClick={handleCreate}
            className="flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Novo Funcionário
          </Button>
        </div>

        <EmployeeFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Funcionários
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {employees.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Ativos</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                {employees.filter((e) => e.estado).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Inativos
              </p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                {employees.filter((e) => !e.estado).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
