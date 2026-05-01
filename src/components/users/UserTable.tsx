// frontend/src/components/users/UserTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import {
  PencilIcon,
  TrashIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role?: string;
  active: boolean;
  isSuperAdmin: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onResetPassword: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export default function UserTable({
  users,
  loading = false,
  onResetPassword,
  onToggleStatus,
  onEdit,
  onDelete,
}: UserTableProps) {
  const getRoleBadge = (role: string | undefined, isSuperAdmin: boolean) => {
    if (isSuperAdmin) {
      return <Badge color="danger">Super Admin</Badge>;
    }

    // Converter para minúsculo para comparação consistente
    const roleLower = role?.toLowerCase();

    switch (roleLower) {
      case "admin":
        return <Badge color="primary">Administrador</Badge>;
      case "rh":
        return <Badge color="info">Recursos Humanos</Badge>;
      case "funcionario":
        return <Badge color="success">Funcionário</Badge>;
      default:
        return <Badge color="default">Usuário</Badge>;
    }
  };

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <Badge color="success">Ativo</Badge>
    ) : (
      <Badge color="danger">Inativo</Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "---";
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "---";
    }
  };

  const getFullName = (user: User) => {
    return `${user.firstname} ${user.lastname}`;
  };

  const getInitials = (user: User) => {
    return `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Carregando usuários...
          </p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            Nenhum usuário encontrado
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Tente ajustar os filtros ou adicionar um novo usuário.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Usuário
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Perfil
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email Verificado
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data Cadastro
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {getInitials(user)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {getFullName(user)}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {user.email} • @{user.username}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  {getRoleBadge(user.role, user.isSuperAdmin)}
                </TableCell>

                <TableCell className="py-3">
                  {getStatusBadge(user.active)}
                </TableCell>

                <TableCell className="py-3">
                  {user.isEmailVerified ? (
                    <Badge color="success">Verificado</Badge>
                  ) : (
                    <Badge color="warning">Não verificado</Badge>
                  )}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDate(user.createdAt)}
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    {/* Botão Reset Senha */}
                    <button
                      onClick={() => onResetPassword(user.id)}
                      className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg dark:text-yellow-400 dark:hover:bg-yellow-900/20 transition-colors"
                      title="Resetar senha"
                    >
                      <KeyIcon className="w-5 h-5" />
                    </button>

                    {/* Botão Editar */}
                    <button
                      onClick={() => onEdit(user.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                      title="Editar usuário"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>

                    {/* Botão Ativar/Desativar */}
                    <button
                      onClick={() => onToggleStatus(user.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        user.active
                          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          : "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                      }`}
                      title={
                        user.active ? "Desativar usuário" : "Ativar usuário"
                      }
                    >
                      {user.active ? (
                        <XCircleIcon className="w-5 h-5" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5" />
                      )}
                    </button>

                    {/* Botão Excluir */}
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                      title="Excluir usuário"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer com informações de paginação */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Mostrando {users.length} de {users.length} usuários
          </span>
        </div>
      </div>
    </div>
  );
}
