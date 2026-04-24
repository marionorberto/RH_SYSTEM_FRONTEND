// src/components/Logs/LogDetailsModal.tsx
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";

interface LogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: any;
  actionColors: Record<string, string>;
  actionIcons: Record<string, string>;
}

export default function LogDetailsModal({
  isOpen,
  onClose,
  log,
  actionColors,
  actionIcons,
}: LogDetailsModalProps) {
  if (!log) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatJson = (jsonStr: string | null) => {
    if (!jsonStr) return "N/A";
    try {
      const obj = JSON.parse(jsonStr);
      return JSON.stringify(obj, null, 2);
    } catch {
      return jsonStr;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[800px] m-4">
      <div className="no-scrollbar relative w-full max-w-[800px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Detalhes do Log
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Informações detalhadas da atividade
          </p>
        </div>

        <div className="px-2 pb-3 space-y-4">
          {/* Cabeçalho */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-500">ID do Log</p>
              <p className="font-mono text-sm">{log.id}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-500">Data/Hora</p>
              <p className="font-medium">{formatDate(log.createdAt)}</p>
            </div>
          </div>

          {/* Usuário e Ação */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-gray-500">Usuário</p>
              <p className="font-medium">{log.user?.name || "Sistema"}</p>
              <p className="text-sm text-gray-500">
                {log.user?.email || "sistema@rh.com"}
              </p>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-xs text-gray-500">Ação</p>
              <div className="mt-1">
                <Badge
                  color={actionColors[log.action] || "default"}
                  className="flex items-center gap-1 w-fit"
                >
                  <span>{actionIcons[log.action]}</span>
                  <span>{log.action}</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Tabela e Registro */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-xs text-gray-500">Tabela Afetada</p>
              <p className="font-medium">{log.tableAffected}</p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-xs text-gray-500">ID do Registro</p>
              <p className="font-mono text-sm">{log.recordId}</p>
            </div>
          </div>

          {/* Descrição */}
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-xs text-gray-500">Descrição</p>
            <p className="font-medium">{log.description}</p>
            <p className="text-sm text-gray-600 mt-1">
              {log.recordDescription}
            </p>
          </div>

          {/* Dados Antigos e Novos */}
          {(log.oldData || log.newData) && (
            <div className="grid grid-cols-2 gap-4">
              {log.oldData && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Dados Antigos</p>
                  <pre className="text-xs overflow-x-auto p-2 bg-white dark:bg-gray-800 rounded">
                    {formatJson(log.oldData)}
                  </pre>
                </div>
              )}
              {log.newData && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Dados Novos</p>
                  <pre className="text-xs overflow-x-auto p-2 bg-white dark:bg-gray-800 rounded">
                    {formatJson(log.newData)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Informações Técnicas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-500">IP Address</p>
              <p className="font-mono text-sm">{log.ipAddress || "N/A"}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-500">User Agent</p>
              <p className="text-xs break-all">{log.userAgent || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-2 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
