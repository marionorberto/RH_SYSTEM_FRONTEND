// src/pages/Departaments/DepartamentList.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DepartamentTable from "../../components/Departaments/DepartamentTable";
import DepartamentFilters from "../../components/Departaments/DepartamentFilters";
import { useDepartaments } from "../../hooks/useDepartaments";
import { Toaster } from "react-hot-toast";

export default function DepartamentList() {
  const navigate = useNavigate();
  const {
    filteredDepartaments,
    loading,
    searchTerm,
    setSearchTerm,
    deleteDepartament,
    departaments,
  } = useDepartaments();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/departaments/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este departamento?")) {
      setDeletingId(id);
      await deleteDepartament(id);
      setDeletingId(null);
    }
  };

  const handleCreate = () => {
    navigate("/departaments/create");
  };

  return (
    <>
      <Toaster position="top-right" />
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
          loading={loading}
        />

        {/* Tabela de Departamentos */}
        <DepartamentTable
          departaments={filteredDepartaments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
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
                Resultados da busca
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {filteredDepartaments.length}
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
