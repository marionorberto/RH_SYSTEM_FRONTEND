// src/components/Logs/LogsTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Log {
  id: string;
  user: { name: string; email: string };
  action: string;
  tableAffected: string;
  recordDescription: string;
  description: string;
  ipAddress: string;
  createdAt: string;
}

interface LogsTableProps {
  logs: Log[];
  onViewDetails: (log: Log) => void;
  actionColors: Record<string, string>;
  actionIcons: Record<string, string>;
}

export default function LogsTable({
  logs,
  onViewDetails,
  actionColors,
  actionIcons,
}: LogsTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionBadge = (action: string) => {
    const color = actionColors[action] || "default";
    return (
      <Badge color={color} className="flex items-center gap-1">
        <span>{actionIcons[action]}</span>
        <span>{action}</span>
      </Badge>
    );
  };

  if (logs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03] text-center">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
          Nenhum log encontrado
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Tente ajustar os filtros de busca.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data/Hora
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Usuário
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Ação
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Tabela
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Registro
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                IP
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {logs.map((log) => (
              <TableRow
                key={log.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3 text-sm font-mono">
                  {formatDate(log.createdAt)}
                </TableCell>
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {log.user?.name || "Sistema"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {log.user?.email || "sistema@rh.com"}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  {getActionBadge(log.action)}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color="default">{log.tableAffected}</Badge>
                </TableCell>
                <TableCell className="py-3">
                  <p className="text-sm">{log.recordDescription}</p>
                  <p className="text-xs text-gray-500">{log.description}</p>
                </TableCell>
                <TableCell className="py-3 font-mono text-sm">
                  {log.ipAddress}
                </TableCell>
                <TableCell className="py-3">
                  <button
                    onClick={() => onViewDetails(log)}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                  >
                    Detalhes
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
