// src/components/Departaments/DepartamentTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Departament {
  id: string;
  departamentName: string;
  createdAt: string;
  updatedAt: string;
}

interface DepartamentTableProps {
  departaments: Departament[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DepartamentTable({
  departaments,
  onEdit,
  onDelete,
}: DepartamentTableProps) {
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

  if (departaments.length === 0) {
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            Nenhum departamento encontrado
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Tente ajustar os filtros ou adicionar um novo departamento.
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
                Departamento
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
            {departaments.map((departament, index) => (
              <TableRow
                key={departament.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm uppercase">
                        {departament.departamentName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {departament.departamentName}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDate(departament.createdAt)}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDate(departament.updatedAt)}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    {/* Botão Editar */}
                    <button
                      onClick={() => onEdit(departament.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="Editar departamento"
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

                    {/* Botão Excluir */}
                    <button
                      onClick={() => onDelete(departament.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                      title="Excluir departamento"
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
            Mostrando {departaments.length} de {departaments.length}{" "}
            departamentos
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
