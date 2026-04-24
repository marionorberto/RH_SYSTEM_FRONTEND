// src/pages/Departaments/DepartamentList.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DepartamentTable from "../../components/Departaments/DepartamentTable";
import DepartamentFilters from "../../components/Departaments/DepartamentFilters";

// Dados mockados baseados na entidade Departament
const mockDepartaments = [
  {
    id: "1",
    departamentName: "Tecnologia",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    departamentName: "Recursos Humanos",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    departamentName: "Financeiro",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    departamentName: "Comercial",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    departamentName: "Operações",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    departamentName: "Marketing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    departamentName: "Administração",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    departamentName: "Jurídico",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function DepartamentList() {
  const navigate = useNavigate();
  const [departaments, setDepartaments] = useState(mockDepartaments);
  const [filteredDepartaments, setFilteredDepartaments] =
    useState(mockDepartaments);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Aplica filtro de busca
    let filtered = [...departaments];

    if (searchTerm) {
      filtered = filtered.filter((dept) =>
        dept.departamentName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredDepartaments(filtered);
  }, [searchTerm, departaments]);

  const handleEdit = (id: string) => {
    navigate(`/departaments/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este departamento?")) {
      setDepartaments((prev) => prev.filter((dept) => dept.id !== id));
    }
  };

  const handleCreate = () => {
    navigate("/departaments/create");
  };

  if (loading) {
    return (
      <>
        <PageMeta
          title="Listar Departamentos | Sistema RH"
          description="testestes"
        />
        <PageBreadcrumb pageTitle="Departamentos" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando departamentos...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Listar Departamentos | Sistema de Gestão de RH"
        description="Gerencie os departamentos da empresa"
      />
      <PageBreadcrumb pageTitle="Departamentos" />

      <div className="space-y-6">
        {/* Cabeçalho com botão de adicionar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Departamentos
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie todos os departamentos da empresa
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
            Novo Departamento
          </Button>
        </div>

        {/* Filtros */}
        <DepartamentFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Tabela de Departamentos */}
        <DepartamentTable
          departaments={filteredDepartaments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Estatísticas */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Departamentos
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {departaments.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Última atualização
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
