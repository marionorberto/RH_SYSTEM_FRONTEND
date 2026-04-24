// src/components/ecommerce/RecentOrders.tsx
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
interface RecentMovement {
  id: string;
  funcionarioNome: string;
  funcionarioCargo: string;
  departamento: string;
  tipoMovimento: string;
  dataMovimento: string;
  status: string;
  observacao: string;
}

// Dados mockados
const mockMovements: RecentMovement[] = [
  {
    id: "1",
    funcionarioNome: "João Silva",
    funcionarioCargo: "Desenvolvedor Sênior",
    departamento: "Tecnologia",
    tipoMovimento: "ADMISSAO",
    dataMovimento: new Date().toISOString(),
    status: "CONCLUIDO",
    observacao: "Contrato CLT",
  },
  {
    id: "2",
    funcionarioNome: "Maria Santos",
    funcionarioCargo: "Analista de RH",
    departamento: "Recursos Humanos",
    tipoMovimento: "PROMOCAO",
    dataMovimento: new Date(Date.now() - 86400000).toISOString(),
    status: "CONCLUIDO",
    observacao: "Promoção para Senior",
  },
  {
    id: "3",
    funcionarioNome: "Carlos Oliveira",
    funcionarioCargo: "Auxiliar Administrativo",
    departamento: "Financeiro",
    tipoMovimento: "TRANSFERENCIA",
    dataMovimento: new Date(Date.now() - 172800000).toISOString(),
    status: "PENDENTE",
    observacao: "Transferência para Operações",
  },
  {
    id: "4",
    funcionarioNome: "Ana Costa",
    funcionarioCargo: "Coordenadora Comercial",
    departamento: "Comercial",
    tipoMovimento: "AUMENTO",
    dataMovimento: new Date(Date.now() - 259200000).toISOString(),
    status: "CONCLUIDO",
    observacao: "Aumento salarial 15%",
  },
  {
    id: "5",
    funcionarioNome: "Pedro Almeida",
    funcionarioCargo: "Estagiário",
    departamento: "Tecnologia",
    tipoMovimento: "FERIAS",
    dataMovimento: new Date(Date.now() - 345600000).toISOString(),
    status: "APROVADO",
    observacao: "Férias de 30 dias",
  },
  {
    id: "6",
    funcionarioNome: "Fernanda Lima",
    funcionarioCargo: "Gerente de Projetos",
    departamento: "Operações",
    tipoMovimento: "DEMISSAO",
    dataMovimento: new Date(Date.now() - 432000000).toISOString(),
    status: "CONCLUIDO",
    observacao: "Desligamento voluntário",
  },
];

export default function RecentOrders() {
  const [movements, setMovements] = useState<RecentMovement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setMovements(mockMovements);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getTipoMovimentoColor = (tipo: string) => {
    switch (tipo) {
      case "ADMISSAO":
        return "success";
      case "DEMISSAO":
        return "danger";
      case "PROMOCAO":
        return "info";
      case "TRANSFERENCIA":
        return "warning";
      case "AUMENTO":
        return "primary";
      case "FERIAS":
        return "secondary";
      default:
        return "default";
    }
  };

  const getTipoMovimentoText = (tipo: string) => {
    switch (tipo) {
      case "ADMISSAO":
        return "Admissão";
      case "DEMISSAO":
        return "Demissão";
      case "PROMOCAO":
        return "Promoção";
      case "TRANSFERENCIA":
        return "Transferência";
      case "AUMENTO":
        return "Aumento Salarial";
      case "FERIAS":
        return "Férias";
      default:
        return tipo;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONCLUIDO":
        return "success";
      case "APROVADO":
        return "success";
      case "PENDENTE":
        return "warning";
      case "REJEITADO":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "CONCLUIDO":
        return "Concluído";
      case "APROVADO":
        return "Aprovado";
      case "PENDENTE":
        return "Pendente";
      case "REJEITADO":
        return "Rejeitado";
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
        hour: "2-digit",
        minute: "2-digit",
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
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
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
            Movimentações Recentes
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Últimas alterações no quadro de funcionários
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filtrar
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Ver Todas
          </button>
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
                Movimento
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
                Data
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
            {movements.map((movement) => (
              <TableRow
                key={movement.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {getInitials(movement.funcionarioNome)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {movement.funcionarioNome}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {movement.funcionarioCargo}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={getTipoMovimentoColor(movement.tipoMovimento)}
                  >
                    {getTipoMovimentoText(movement.tipoMovimento)}
                  </Badge>
                  {movement.observacao && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {movement.observacao}
                    </p>
                  )}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {movement.departamento}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDateTime(movement.dataMovimento)}
                </TableCell>
                <TableCell className="py-3">
                  <Badge size="sm" color={getStatusColor(movement.status)}>
                    {getStatusText(movement.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {movements.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Nenhuma movimentação recente encontrada
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Mostrando {movements.length} movimentações recentes
      </div>
    </div>
  );
}
