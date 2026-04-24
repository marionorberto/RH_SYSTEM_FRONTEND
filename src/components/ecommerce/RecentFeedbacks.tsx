// src/components/ecommerce/RecentFeedbacks.tsx
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Tipos
interface PendingRequest {
  id: string;
  funcionarioNome: string;
  funcionarioCargo: string;
  tipo: string;
  dataSolicitacao: string;
  dataInicio: string | null;
  dataFim: string | null;
  status: string;
  observacao: string;
}

// Dados mockados
const mockRequests: PendingRequest[] = [
  {
    id: "1",
    funcionarioNome: "João Silva",
    funcionarioCargo: "Desenvolvedor",
    tipo: "FERIAS",
    dataSolicitacao: new Date().toISOString(),
    dataInicio: "2024-02-01",
    dataFim: "2024-02-15",
    status: "PENDENTE",
    observacao: "Solicitação de férias anuais",
  },
  {
    id: "2",
    funcionarioNome: "Maria Santos",
    funcionarioCargo: "Analista de RH",
    tipo: "LICENCA",
    dataSolicitacao: new Date(Date.now() - 86400000).toISOString(),
    dataInicio: "2024-01-20",
    dataFim: "2024-01-25",
    status: "APROVADO",
    observacao: "Licença médica",
  },
  {
    id: "3",
    funcionarioNome: "Carlos Oliveira",
    funcionarioCargo: "Coordenador",
    tipo: "HORA_EXTRA",
    dataSolicitacao: new Date(Date.now() - 172800000).toISOString(),
    dataInicio: "2024-01-18",
    dataFim: null,
    status: "PENDENTE",
    observacao: "10 horas extras",
  },
  {
    id: "4",
    funcionarioNome: "Ana Costa",
    funcionarioCargo: "Gerente",
    tipo: "BONUS",
    dataSolicitacao: new Date(Date.now() - 259200000).toISOString(),
    dataInicio: null,
    dataFim: null,
    status: "APROVADO",
    observacao: "Bônus de desempenho",
  },
  {
    id: "5",
    funcionarioNome: "Pedro Almeida",
    funcionarioCargo: "Analista",
    tipo: "PROMOCAO",
    dataSolicitacao: new Date(Date.now() - 345600000).toISOString(),
    dataInicio: null,
    dataFim: null,
    status: "PENDENTE",
    observacao: "Promoção para Sênior",
  },
];

export default function RecentFeedbacks() {
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter.toUpperCase());

  const getTipoText = (tipo: string) => {
    switch (tipo) {
      case "FERIAS":
        return "Férias";
      case "LICENCA":
        return "Licença";
      case "HORA_EXTRA":
        return "Hora Extra";
      case "BONUS":
        return "Bônus";
      case "PROMOCAO":
        return "Promoção";
      default:
        return tipo;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "FERIAS":
        return "info";
      case "LICENCA":
        return "warning";
      case "HORA_EXTRA":
        return "primary";
      case "BONUS":
        return "success";
      case "PROMOCAO":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APROVADO":
        return "success";
      case "REJEITADO":
        return "danger";
      case "PENDENTE":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "APROVADO":
        return "Aprovado";
      case "REJEITADO":
        return "Rejeitado";
      case "PENDENTE":
        return "Pendente";
      default:
        return status;
    }
  };

  const formatDateTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mt-2 animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Solicitações Pendentes
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Aguardando aprovação
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendentes</option>
            <option value="approved">Aprovados</option>
            <option value="rejected">Rejeitados</option>
          </select>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
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
                Tipo
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Período
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredRequests.map((request) => (
              <TableRow
                key={request.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {getInitials(request.funcionarioNome)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {request.funcionarioNome}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {request.funcionarioCargo}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Badge size="sm" color={getTipoColor(request.tipo)}>
                    {getTipoText(request.tipo)}
                  </Badge>
                  {request.observacao && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {request.observacao}
                    </p>
                  )}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {request.dataInicio && request.dataFim
                    ? `${formatDateTime(request.dataInicio)} - ${formatDateTime(request.dataFim)}`
                    : request.dataInicio
                      ? `Início: ${formatDateTime(request.dataInicio)}`
                      : "Data não informada"}
                </TableCell>
                <TableCell className="py-3">
                  <Badge size="sm" color={getStatusColor(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredRequests.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhuma solicitação encontrada
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          Mostrando {filteredRequests.length} de {requests.length} solicitações
        </span>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            Pendente
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Aprovado
          </span>
        </div>
      </div>
    </div>
  );
}
