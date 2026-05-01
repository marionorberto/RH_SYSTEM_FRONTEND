// frontend/src/components/Functions/FunctionTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Function {
  id: string;
  functionName: string;
  createdAt: string;
  updatedAt: string;
  employees?: { id: string }[];
}

interface FunctionTableProps {
  functions: Function[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
  getEmployeeCount?: (id: string) => number;
  canDelete?: (id: string) => boolean;
}

export default function FunctionTable({
  functions,
  onEdit,
  onDelete,
  loading = false,
  getEmployeeCount,
  canDelete,
}: FunctionTableProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "---";
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "---";
    }
  };

  const getEmployeeCountBadge = (count: number) => {
    if (count === 0) {
      return <Badge color="warning">Vago</Badge>;
    } else if (count === 1) {
      return <Badge color="info">{count} funcionário</Badge>;
    } else {
      return <Badge color="success">{count} funcionários</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Carregando cargos...
          </p>
        </div>
      </div>
    );
  }

  if (functions.length === 0) {
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
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            Nenhum cargo encontrado
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Tente ajustar os filtros ou adicionar um novo cargo.
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
                #
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Cargo
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Funcionários
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data de Criação
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Última Atualização
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
            {functions.map((func, index) => {
              const employeeCount = getEmployeeCount
                ? getEmployeeCount(func.id)
                : func.employees?.length || 0;
              const canDeleteFunction = canDelete
                ? canDelete(func.id)
                : employeeCount === 0;

              return (
                <TableRow
                  key={func.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm uppercase">
                          {func.functionName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {func.functionName}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    {getEmployeeCountBadge(employeeCount)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatDate(func.createdAt)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatDate(func.updatedAt)}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      {/* Botão Editar */}
                      <button
                        onClick={() => onEdit(func.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20 transition-colors"
                        title="Editar cargo"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>

                      {/* Botão Excluir */}
                      <button
                        onClick={() => onDelete(func.id)}
                        disabled={!canDeleteFunction}
                        className={`p-1.5 rounded-lg transition-colors ${
                          !canDeleteFunction
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        }`}
                        title={
                          !canDeleteFunction
                            ? "Não é possível excluir cargo com funcionários vinculados"
                            : "Excluir cargo"
                        }
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Footer com informações */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Mostrando {functions.length} de {functions.length} cargos
          </span>
        </div>
      </div>
    </div>
  );
}
