// src/pages/Functions/FunctionList.tsx
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import FunctionTable from "../../components/Functions/FunctionTable";
import FunctionFilters from "../../components/Functions/FunctionFilters";
import { Toaster } from "react-hot-toast";
import { useFunctions } from "../../hooks/useFuncions";

export default function FunctionList() {
  const navigate = useNavigate();
  const {
    filteredFunctions,
    loading,
    searchTerm,
    setSearchTerm,
    deleteFunction,
    functions,
    getEmployeeCount,
    canDelete,
  } = useFunctions();

  const handleEdit = (id: string) => {
    navigate(`/functions/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    const employeeCount = getEmployeeCount(id);

    if (employeeCount > 0) {
      alert(
        `Não é possível excluir este cargo pois existem ${employeeCount} funcionário(s) vinculado(s) a ele.`,
      );
      return;
    }

    if (window.confirm("Tem certeza que deseja excluir este cargo?")) {
      await deleteFunction(id);
    }
  };

  const handleCreate = () => {
    navigate("/functions/create");
  };

  // Estatísticas
  const occupiedFunctions = functions.filter(
    (f) => getEmployeeCount(f.id) > 0,
  ).length;
  const vacantFunctions = functions.filter(
    (f) => getEmployeeCount(f.id) === 0,
  ).length;
  const totalEmployees = functions.reduce(
    (sum, f) => sum + getEmployeeCount(f.id),
    0,
  );

  return (
    <>
      <Toaster position="top-right" />
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
          loading={loading}
        />

        <FunctionTable
          functions={filteredFunctions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
          getEmployeeCount={getEmployeeCount}
          canDelete={canDelete}
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
                {occupiedFunctions}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cargos Vagos
              </p>
              <p className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                {vacantFunctions}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Funcionários
              </p>
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {totalEmployees}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
