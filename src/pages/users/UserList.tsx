// src/pages/Users/UserList.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UserTable from "../../components/users/UserTable";
import UserFilters from "../../components/users/UserFilters";
import ResetPasswordModal from "../../components/users/ResetPasswordModal";
import Button from "../../components/ui/button/Button";
import { useUsers } from "../../hooks/userUsers";
import { Toaster } from "react-hot-toast";

export default function UserList() {
  const navigate = useNavigate();
  const {
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    deleteUser,
    toggleUserStatus,
    resetPassword,
    statistics,
  } = useUsers();

  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleEdit = (id: string) => {
    navigate(`/users/edit/${id}`);
  };

  const handleResetPassword = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setResetModalOpen(true);
  };

  const handleConfirmReset = async (newPassword: string) => {
    if (selectedUserId) {
      setIsResetting(true);
      await resetPassword(selectedUserId, newPassword);
      setIsResetting(false);
      setResetModalOpen(false);
      setSelectedUserId(null);
      setSelectedUserName("");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await deleteUser(id);
    }
  };

  const handleToggleStatus = async (id: string) => {
    await toggleUserStatus(id);
  };

  const handleCreate = () => {
    navigate("/users/create");
  };

  // Encontrar nome do usuário para o modal
  const getUserName = (id: string) => {
    const user = filteredUsers.find((u) => u.id === id);
    return user ? `${user.firstname} ${user.lastname}` : "";
  };

  // Valores padrão para estatísticas enquanto carrega
  const defaultStats = {
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
  };

  const currentStats = statistics || defaultStats;

  if (loading && filteredUsers.length === 0) {
    return (
      <>
        <PageMeta
          title="Listar Usuários | Sistema de Gestão de RH"
          description="Gerencie os usuários do sistema"
        />
        <PageBreadcrumb pageTitle="Usuários" />
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                Lista de Usuários
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Gerencie todos os usuários do sistema e suas permissões
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
              Novo Usuário
            </Button>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Carregando usuários...
              </p>
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
        title="Listar Usuários | Sistema de Gestão de RH"
        description="Gerencie os usuários do sistema"
      />
      <PageBreadcrumb pageTitle="Usuários" />

      <div className="space-y-6">
        {/* Cabeçalho com botão de adicionar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Lista de Usuários
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie todos os usuários do sistema e suas permissões
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
            Novo Usuário
          </Button>
        </div>

        {/* Filtros */}
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          loading={loading}
        />

        {/* Tabela de Usuários */}
        <UserTable
          users={filteredUsers}
          loading={loading}
          onResetPassword={(id) => handleResetPassword(id, getUserName(id))}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Estatísticas - com verificação de segurança */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Usuários
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {currentStats.total}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Ativos</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                {currentStats.active}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Inativos
              </p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                {currentStats.inactive}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administradores
              </p>
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {currentStats.admins}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Reset de Senha */}
      <ResetPasswordModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        userName={selectedUserName}
        onConfirm={handleConfirmReset}
        loading={isResetting}
      />
    </>
  );
}
