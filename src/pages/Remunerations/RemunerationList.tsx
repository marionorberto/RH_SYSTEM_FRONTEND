// src/pages/Remunerations/RemunerationList.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import RemunerationTable from "../../components/Remunerations/RemunerationTable";
import RemunerationFilters from "../../components/Remunerations/RemunerationFilters";

// Dados mockados baseados na entidade Remuneration
const mockRemunerations = [
  {
    id: "1",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    remunerationType: {
      id: "1",
      typeName: "Salário Base",
      code: "SAL_BASE",
    },
    value: 250000,
    unities: 1,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Valor",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    remunerationType: {
      id: "2",
      typeName: "Subsídio de Alimentação",
      code: "SUB_ALIM",
    },
    value: 50000,
    unities: 22,
    days: 22,
    processingType: "Diario",
    tipoCalculo: "Valor",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    employee: {
      id: "2",
      employee_name: "Maria Santos",
    },
    remunerationType: {
      id: "1",
      typeName: "Salário Base",
      code: "SAL_BASE",
    },
    value: 180000,
    unities: 1,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Valor",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    employee: {
      id: "3",
      employee_name: "Carlos Oliveira",
    },
    remunerationType: {
      id: "3",
      typeName: "Comissão",
      code: "COMISSAO",
    },
    value: 5,
    unities: 10,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Percentual",
    createdAt: new Date().toISOString(),
  },
];

export default function RemunerationList() {
  const navigate = useNavigate();
  const [remunerations, setRemunerations] = useState(mockRemunerations);
  const [filteredRemunerations, setFilteredRemunerations] =
    useState(mockRemunerations);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...remunerations];

    if (searchTerm) {
      filtered = filtered.filter(
        (rem) =>
          rem.employee.employee_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          rem.remunerationType.typeName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          rem.remunerationType.code
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (employeeFilter !== "all") {
      filtered = filtered.filter((rem) => rem.employee.id === employeeFilter);
    }

    setFilteredRemunerations(filtered);
  }, [searchTerm, employeeFilter, remunerations]);

  const handleEdit = (id: string) => {
    navigate(`/remunerations/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta remuneração?")) {
      setRemunerations((prev) => prev.filter((rem) => rem.id !== id));
    }
  };

  const handleCreate = () => {
    navigate("/remunerations/create");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Lista única de funcionários para o filtro
  const uniqueEmployees = Array.from(
    new Map(
      remunerations.map((rem) => [rem.employee.id, rem.employee]),
    ).values(),
  );

  if (loading) {
    return (
      <>
        <PageMeta title="Listar Remunerações | Sistema RH" />
        <PageBreadcrumb pageTitle="Remunerações" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando remunerações...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Listar Remunerações | Sistema de Gestão de RH"
        description="Gerencie as remunerações dos funcionários"
      />
      <PageBreadcrumb pageTitle="Remunerações" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Remunerações
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie salários, subsídios e outros benefícios
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
            Nova Remuneração
          </Button>
        </div>

        <RemunerationFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          employeeFilter={employeeFilter}
          onEmployeeFilterChange={setEmployeeFilter}
          employees={uniqueEmployees}
        />

        <RemunerationTable
          remunerations={filteredRemunerations}
          onEdit={handleEdit}
          onDelete={handleDelete}
          formatCurrency={formatCurrency}
        />

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Remunerações
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {remunerations.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Valor Total Mensal
              </p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(
                  remunerations
                    .filter((r) => r.processingType === "Mensal")
                    .reduce((sum, r) => sum + r.value, 0),
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Funcionários
              </p>
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {uniqueEmployees.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Média por Funcionário
              </p>
              <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                {formatCurrency(
                  remunerations.reduce((sum, r) => sum + r.value, 0) /
                    uniqueEmployees.length,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
