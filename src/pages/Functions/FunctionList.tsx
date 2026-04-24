// src/pages/Functions/FunctionList.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import FunctionTable from "../../components/Functions/FunctionTable";
import FunctionFilters from "../../components/Functions/FunctionFilters";

// Dados mockados baseados na entidade Function
const mockFunctions = [
  {
    id: "1",
    functionName: "Desenvolvedor Sênior",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [{ id: "1" }, { id: "2" }], // 2 funcionários
  },
  {
    id: "2",
    functionName: "Analista de RH",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [{ id: "3" }], // 1 funcionário
  },
  {
    id: "3",
    functionName: "Analista Financeiro",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [{ id: "4" }], // 1 funcionário
  },
  {
    id: "4",
    functionName: "Coordenador Comercial",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [], // 0 funcionários
  },
  {
    id: "5",
    functionName: "CTO",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [{ id: "5" }], // 1 funcionário
  },
  {
    id: "6",
    functionName: "Gerente de Projetos",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [{ id: "6" }, { id: "7" }], // 2 funcionários
  },
  {
    id: "7",
    functionName: "Analista de Suporte",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [{ id: "8" }], // 1 funcionário
  },
  {
    id: "8",
    functionName: "Designer UX/UI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    employees: [], // 0 funcionários
  },
];

export default function FunctionList() {
  const navigate = useNavigate();
  const [functions, setFunctions] = useState(mockFunctions);
  const [filteredFunctions, setFilteredFunctions] = useState(mockFunctions);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...functions];

    if (searchTerm) {
      filtered = filtered.filter((func) =>
        func.functionName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredFunctions(filtered);
  }, [searchTerm, functions]);

  const handleEdit = (id: string) => {
    navigate(`/functions/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    const functionToDelete = functions.find((f) => f.id === id);
    const employeeCount = functionToDelete?.employees?.length || 0;

    if (employeeCount > 0) {
      alert(
        `Não é possível excluir este cargo pois existem ${employeeCount} funcionário(s) vinculado(s) a ele.`,
      );
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este cargo?")) {
      setFunctions((prev) => prev.filter((func) => func.id !== id));
    }
  };

  const handleCreate = () => {
    navigate("/functions/create");
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Listar Cargos | Sistema RH" />
        <PageBreadcrumb pageTitle="Cargos" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando cargos...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Listar Cargos | Sistema de Gestão de RH"
        description="Gerencie os cargos da empresa"
      />
      <PageBreadcrumb pageTitle="Cargos" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Cargos
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie todos os cargos da empresa
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
            Novo Cargo
          </Button>
        </div>

        <FunctionFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <FunctionTable
          functions={filteredFunctions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Cargos
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {functions.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cargos Ocupados
              </p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                {functions.filter((f) => (f.employees?.length || 0) > 0).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cargos Vagos
              </p>
              <p className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                {
                  functions.filter((f) => (f.employees?.length || 0) === 0)
                    .length
                }
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Funcionários
              </p>
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {functions.reduce(
                  (sum, f) => sum + (f.employees?.length || 0),
                  0,
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
