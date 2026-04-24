// src/pages/Users/UserList.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UserTable from "../../components/users/UserTable";
import UserFilters from "../../components/users/UserFilters";
import Button from "../../components/ui/button/Button";

// Dados mockados
const mockUsers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    username: "joao.silva",
    role: "ADMIN",
    active: true,
    isSuperAdmin: false,
    resetSenha: false,
    funcionario: {
      nomeFuncionario: "João Silva",
      cargo: "Desenvolvedor Sênior",
      departamento: "Tecnologia",
      telefone1: "+244 923 456 789",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    username: "maria.santos",
    role: "RH",
    active: true,
    isSuperAdmin: false,
    resetSenha: false,
    funcionario: {
      nomeFuncionario: "Maria Santos",
      cargo: "Analista de RH",
      departamento: "Recursos Humanos",
      telefone1: "+244 923 456 788",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@empresa.com",
    username: "carlos.oliveira",
    role: "USER",
    active: true,
    isSuperAdmin: false,
    resetSenha: true,
    funcionario: {
      nomeFuncionario: "Carlos Oliveira",
      cargo: "Analista Financeiro",
      departamento: "Financeiro",
      telefone1: "+244 923 456 787",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    username: "ana.costa",
    role: "USER",
    active: false,
    isSuperAdmin: false,
    resetSenha: false,
    funcionario: {
      nomeFuncionario: "Ana Costa",
      cargo: "Coordenadora Comercial",
      departamento: "Comercial",
      telefone1: "+244 923 456 786",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Pedro Almeida",
    email: "pedro.almeida@empresa.com",
    username: "pedro.almeida",
    role: "ADMIN",
    active: true,
    isSuperAdmin: true,
    resetSenha: false,
    funcionario: {
      nomeFuncionario: "Pedro Almeida",
      cargo: "CTO",
      departamento: "Tecnologia",
      telefone1: "+244 923 456 785",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Fernanda Lima",
    email: "fernanda.lima@empresa.com",
    username: "fernanda.lima",
    role: "RH",
    active: true,
    isSuperAdmin: false,
    resetSenha: false,
    funcionario: {
      nomeFuncionario: "Fernanda Lima",
      cargo: "Gerente de RH",
      departamento: "Recursos Humanos",
      telefone1: "+244 923 456 784",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Ricardo Souza",
    email: "ricardo.souza@empresa.com",
    username: "ricardo.souza",
    role: "USER",
    active: true,
    isSuperAdmin: false,
    resetSenha: true,
    funcionario: {
      nomeFuncionario: "Ricardo Souza",
      cargo: "Operador de Logística",
      departamento: "Operações",
      telefone1: "+244 923 456 783",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Patrícia Gomes",
    email: "patricia.gomes@empresa.com",
    username: "patricia.gomes",
    role: "USER",
    active: false,
    isSuperAdmin: false,
    resetSenha: false,
    funcionario: {
      nomeFuncionario: "Patrícia Gomes",
      cargo: "Auxiliar Administrativo",
      departamento: "Administração",
      telefone1: "+244 923 456 782",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function UserList() {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Aplica filtros
    let filtered = [...users];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.funcionario?.nomeFuncionario
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // Filtro de role
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Filtro de status
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) =>
        statusFilter === "active" ? user.active : !user.active,
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleResetPassword = (userId: string) => {
    console.log("Resetar senha do usuário:", userId);
    // Implementar lógica de reset de senha
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user,
      ),
    );
  };

  const handleEditUser = (userId: string) => {
    console.log("Editar usuário:", userId);
    // Navegar para página de edição
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Listar Usuários | Sistema RH" />
        <PageBreadcrumb pageTitle="Usuários" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando usuários...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
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
            onClick={() => (window.location.href = "/users/new")}
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
        />

        {/* Tabela de Usuários */}
        <UserTable
          users={filteredUsers}
          onResetPassword={handleResetPassword}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {/* Estatísticas */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Usuários
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {users.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Ativos</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                {users.filter((u) => u.active).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Inativos
              </p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                {users.filter((u) => !u.active).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administradores
              </p>
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {
                  users.filter((u) => u.role === "ADMIN" || u.isSuperAdmin)
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
