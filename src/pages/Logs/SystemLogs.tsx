// src/pages/Logs/SystemLogs.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import LogsTable from "../../components/Logs/LogsTable";
import LogsFilters from "../../components/Logs/LogsFilters";
import LogDetailsModal from "../../components/Logs/LogDetailsModal";

// Dados mockados baseados na entidade SystemLog
const mockLogs = [
  {
    id: "1",
    user: { id: "1", name: "João Silva", email: "joao@empresa.com" },
    action: "CREATE",
    tableAffected: "employee",
    recordId: "EMP001",
    recordDescription: "João Silva",
    description: "Novo funcionário cadastrado",
    oldData: null,
    newData: JSON.stringify({
      name: "João Silva",
      email: "joao@empresa.com",
      department: "Tecnologia",
    }),
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    user: { id: "2", name: "Maria Santos", email: "maria@empresa.com" },
    action: "UPDATE",
    tableAffected: "user",
    recordId: "USR002",
    recordDescription: "Carlos Oliveira",
    description: "Perfil de usuário atualizado",
    oldData: JSON.stringify({ role: "USER" }),
    newData: JSON.stringify({ role: "ADMIN" }),
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    user: { id: "3", name: "Admin Sistema", email: "admin@sistema.com" },
    action: "DELETE",
    tableAffected: "department",
    recordId: "DEP005",
    recordDescription: "Marketing",
    description: "Departamento removido do sistema",
    oldData: JSON.stringify({ name: "Marketing", code: "MKT" }),
    newData: null,
    ipAddress: "192.168.1.102",
    userAgent: "Chrome/120.0.0.0",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    user: { id: "1", name: "João Silva", email: "joao@empresa.com" },
    action: "LOGIN",
    tableAffected: "user",
    recordId: "USR001",
    recordDescription: "Login bem-sucedido",
    description: "Usuário fez login no sistema",
    oldData: null,
    newData: JSON.stringify({ loginTime: new Date().toISOString() }),
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "5",
    user: { id: "4", name: "Ana Costa", email: "ana@empresa.com" },
    action: "CREATE",
    tableAffected: "remuneration",
    recordId: "REM012",
    recordDescription: "Bônus de desempenho",
    description: "Nova remuneração adicionada",
    oldData: null,
    newData: JSON.stringify({ type: "BONUS", value: 50000 }),
    ipAddress: "192.168.1.103",
    userAgent: "Firefox/120.0",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "6",
    user: { id: "2", name: "Maria Santos", email: "maria@empresa.com" },
    action: "UPDATE",
    tableAffected: "discount",
    recordId: "DIS008",
    recordDescription: "Desconto de IRT",
    description: "Valor do desconto atualizado",
    oldData: JSON.stringify({ value: 75000 }),
    newData: JSON.stringify({ value: 82000 }),
    ipAddress: "192.168.1.101",
    userAgent: "Safari/17.0",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "7",
    user: { id: "5", name: "Pedro Almeida", email: "pedro@empresa.com" },
    action: "LOGOUT",
    tableAffected: "user",
    recordId: "USR005",
    recordDescription: "Logout do sistema",
    description: "Usuário encerrou sessão",
    oldData: null,
    newData: JSON.stringify({ logoutTime: new Date().toISOString() }),
    ipAddress: "192.168.1.104",
    userAgent: "Edge/120.0",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
];

const actionColors = {
  CREATE: "success",
  UPDATE: "info",
  DELETE: "danger",
  LOGIN: "primary",
  LOGOUT: "warning",
};

const actionIcons = {
  CREATE: "➕",
  UPDATE: "✏️",
  DELETE: "🗑️",
  LOGIN: "🔐",
  LOGOUT: "🚪",
};

export default function SystemLogs() {
  const [logs, setLogs] = useState(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    action: "all",
    table: "all",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...logs];

    if (filters.searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.user?.name
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          log.user?.email
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          log.description
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          log.recordDescription
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase()),
      );
    }

    if (filters.action !== "all") {
      filtered = filtered.filter((log) => log.action === filters.action);
    }

    if (filters.table !== "all") {
      filtered = filtered.filter((log) => log.tableAffected === filters.table);
    }

    if (filters.startDate) {
      filtered = filtered.filter(
        (log) => new Date(log.createdAt) >= new Date(filters.startDate),
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        (log) => new Date(log.createdAt) <= new Date(filters.endDate),
      );
    }

    setFilteredLogs(filtered);
  }, [filters, logs]);

  const handleViewDetails = (log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uniqueTables = [...new Set(logs.map((log) => log.tableAffected))];

  if (loading) {
    return (
      <>
        <PageMeta title="Logs do Sistema | Sistema RH" />
        <PageBreadcrumb pageTitle="Logs do Sistema" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando logs...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Logs do Sistema | Sistema de Gestão de RH"
        description="Histórico de atividades e auditoria do sistema"
      />
      <PageBreadcrumb pageTitle="Logs do Sistema" />

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Logs do Sistema
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Histórico completo de atividades e auditoria do sistema
            </p>
          </div>
          <Button
            size="md"
            variant="outline"
            onClick={handleExport}
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Exportar Logs
          </Button>
        </div>

        {/* Filtros */}
        <LogsFilters
          filters={filters}
          onFilterChange={setFilters}
          actions={Object.keys(actionColors)}
          tables={uniqueTables}
        />

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] text-center">
            <p className="text-2xl font-bold text-blue-600">
              {filteredLogs.length}
            </p>
            <p className="text-xs text-gray-500">Total de Registros</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] text-center">
            <p className="text-2xl font-bold text-green-600">
              {logs.filter((l) => l.action === "CREATE").length}
            </p>
            <p className="text-xs text-gray-500">Criações</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] text-center">
            <p className="text-2xl font-bold text-blue-600">
              {logs.filter((l) => l.action === "UPDATE").length}
            </p>
            <p className="text-xs text-gray-500">Atualizações</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] text-center">
            <p className="text-2xl font-bold text-red-600">
              {logs.filter((l) => l.action === "DELETE").length}
            </p>
            <p className="text-xs text-gray-500">Exclusões</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] text-center">
            <p className="text-2xl font-bold text-purple-600">
              {logs.filter((l) => l.action === "LOGIN").length +
                logs.filter((l) => l.action === "LOGOUT").length}
            </p>
            <p className="text-xs text-gray-500">Acessos</p>
          </div>
        </div>

        {/* Tabela de Logs */}
        <LogsTable
          logs={filteredLogs}
          onViewDetails={handleViewDetails}
          actionColors={actionColors}
          actionIcons={actionIcons}
        />

        {/* Modal de Detalhes */}
        <LogDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          log={selectedLog}
          actionColors={actionColors}
          actionIcons={actionIcons}
        />
      </div>
    </>
  );
}
