// frontend/src/components/Employee/EmployeeTable.tsx
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
  CheckCircleIcon,
  XCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

interface Employee {
  id: string;
  employee_name: string;
  email: string;
  telefone1: string;
  function?: { functionName: string };
  category?: { categoryName: string };
  estado: boolean;
  hasUser: boolean;
  userId?: string;
  createdAt: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  loading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function EmployeeTable({
  employees,
  loading = false,
  onEdit,
  onDelete,
  onToggleStatus,
}: EmployeeTableProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
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

  const handleCreateUser = (employeeId: string) => {
    navigate(`/users/create?employeeId=${employeeId}`);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando funcionários...</p>
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
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
          <h3 className="mt-4 text-lg font-medium text-gray-800">
            Nenhum funcionário encontrado
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Tente ajustar os filtros ou adicionar um novo funcionário.
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
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Funcionário
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Contacto
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Função/Categoria
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Usuário
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data Cadastro
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {getInitials(employee.employee_name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {employee.employee_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {employee.email || "Sem email"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {employee.telefone1 || "---"}
                </TableCell>
                <TableCell className="py-3">
                  <p className="text-sm text-gray-800">
                    {employee.function?.functionName || "---"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {employee.category?.categoryName || "---"}
                  </p>
                </TableCell>
                <TableCell className="py-3">
                  <Badge color={employee.estado ? "success" : "danger"}>
                    {employee.estado ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  {employee.hasUser ? (
                    <Badge color="success">Tem usuário</Badge>
                  ) : (
                    <Badge color="warning">Sem usuário</Badge>
                  )}
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {formatDate(employee.createdAt)}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    {!employee.hasUser && (
                      <button
                        onClick={() => handleCreateUser(employee.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Criar Usuário"
                      >
                        <UserPlusIcon className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(employee.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Editar"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onToggleStatus(employee.id)}
                      className={`p-1.5 rounded-lg ${employee.estado ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}
                      title={employee.estado ? "Desativar" : "Ativar"}
                    >
                      {employee.estado ? (
                        <XCircleIcon className="w-5 h-5" />
                      ) : (
                        <CheckCircleIcon className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(employee.id)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
                      title="Excluir"
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
    </div>
  );
}
