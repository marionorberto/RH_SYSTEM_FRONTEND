// src/components/Users/UserTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  active: boolean;
  isSuperAdmin: boolean;
  resetSenha: boolean;
  funcionario: {
    nomeFuncionario: string;
    cargo: string;
    departamento: string;
    telefone1: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UserTableProps {
  users: User[];
  onResetPassword: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export default function UserTable({
  users,
  onResetPassword,
  onToggleStatus,
  onEdit,
  onDelete,
}: UserTableProps) {
  const getRoleBadge = (role: string, isSuperAdmin: boolean) => {
    if (isSuperAdmin) {
      return <Badge color="danger">Super Admin</Badge>;
    }
    switch (role) {
      case "ADMIN":
        return <Badge color="primary">Administrador</Badge>;
      case "RH":
        return <Badge color="info">Recursos Humanos</Badge>;
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

  const getResetPasswordBadge = (resetSenha: boolean) => {
    return resetSenha ? (
      <Badge color="warning">Pendente</Badge>
    ) : (
      <Badge color="success">Normal</Badge>
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

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
          <Button
            size="sm"
            variant="primary"
            onClick={() => (window.location.href = "/users/new")}
            className="mt-4"
          >
            Adicionar Usuário
          </Button>
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
                Reset Senha
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Funcionário
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
                        {getInitials(user.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {user.email}
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
                  {getResetPasswordBadge(user.resetSenha)}
                </TableCell>

                <TableCell className="py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.funcionario?.nomeFuncionario || "---"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.funcionario?.cargo || "---"} •{" "}
                      {user.funcionario?.departamento || "---"}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDate(user.createdAt)}
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    {/* Botão Reset Senha */}
                    <button
                      onClick={() => onResetPassword(user.id)}
                      className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                      title="Resetar senha"
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
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </button>

                    {/* Botão Editar */}
                    <button
                      onClick={() => onEdit(user.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="Editar usuário"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    {/* Botão Ativar/Desativar */}
                    <button
                      onClick={() => onToggleStatus(user.id)}
                      className={`p-1.5 rounded-lg ${
                        user.active
                          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          : "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                      }`}
                      title={
                        user.active ? "Desativar usuário" : "Ativar usuário"
                      }
                    >
                      {user.active ? (
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
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      ) : (
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Botão Excluir */}
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800"
                      title="Excluir usuário"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
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
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              Anterior
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
