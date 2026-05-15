// frontend/src/pages/Employees/EmployeeList.tsx
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import EmployeeFilters from "../../components/Employee/EmployeeFilters";
import { useEmployees } from "../../hooks/useEmployees";
import { Toaster } from "react-hot-toast";

export default function EmployeeList() {
  const navigate = useNavigate();
  const {
    filteredEmployees,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    deleteEmployee,
    toggleEmployeeStatus,
    statistics,
  } = useEmployees();

  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      await deleteEmployee(id);
    }
  };

  const handleToggleStatus = async (id: string) => {
    await toggleEmployeeStatus(id);
  };

  const handleCreate = () => {
    navigate("/dashboard/employee/create");
  };

  if (loading && filteredEmployees.length === 0) {
    return (
      <>
        <PageMeta title="Listar Funcionários | Sistema RH" />
        <PageBreadcrumb pageTitle="Funcionários" />
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                Funcionários
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Gerencie todos os funcionários da empresa
              </p>
            </div>
            <Button size="md" variant="primary" onClick={handleCreate}>
              Novo Funcionário
            </Button>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando funcionários...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
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
            <p className="mt-1 text-sm text-gray-500">
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
          loading={loading}
        />

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="text-center">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-semibold text-gray-800">
                {statistics.total}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Ativos</p>
              <p className="text-xl font-semibold text-green-600">
                {statistics.active}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Inativos</p>
              <p className="text-xl font-semibold text-red-600">
                {statistics.inactive}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Com Usuário</p>
              <p className="text-xl font-semibold text-blue-600">
                {statistics.withUser}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Sem Usuário</p>
              <p className="text-xl font-semibold text-yellow-600">
                {statistics.withoutUser}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
