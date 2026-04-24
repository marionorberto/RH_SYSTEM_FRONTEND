// src/components/openai/OpenAITable.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../src/components/ui/table";
import Badge from "../../../src/components/ui/badge/Badge";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { OpenAIRequest } from "../../services/openai.service";
import RequestDetailsModal from "./RequestDetailsModal";

interface OpenAITableProps {
  requests: OpenAIRequest[];
  loading: boolean;
  onRefresh: () => void;
}

export default function OpenAITable({
  requests,
  loading,
  onRefresh,
}: OpenAITableProps) {
  const [selectedRequest, setSelectedRequest] = useState<OpenAIRequest | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case "rate_limited":
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case "timeout":
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "success";
      case "error":
        return "danger";
      case "rate_limited":
        return "warning";
      case "timeout":
        return "warning";
      default:
        return "default";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("pt-BR");
  };

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const handleViewDetails = (request: OpenAIRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Carregando requisições...
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 mb-3">🤖</div>
        <p className="text-gray-600 dark:text-gray-400">
          Nenhuma requisição encontrada
        </p>
        <button
          onClick={onRefresh}
          className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Timestamp
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Modelo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tokens
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Custo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tempo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tipo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {requests.map((request) => (
              <TableRow
                key={request.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <TableCell className="px-5 py-4 text-start">
                  <div className="font-mono text-xs text-gray-500 dark:text-gray-400">
                    {request.id.substring(0, 8)}...
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatTimestamp(request.timestamp)}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <Badge size="sm" color={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <div className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {request.model}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {request.endpoint}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <div className="text-sm text-gray-800 dark:text-white/90">
                    {request.total_tokens.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    ({request.prompt_tokens} + {request.completion_tokens})
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <div
                    className={`text-sm font-medium ${
                      request.cost_usd > 0.01
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    ${request.cost_usd.toFixed(4)}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <div
                    className={`text-sm ${
                      request.response_time_ms > 5000
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {formatResponseTime(request.response_time_ms)}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <Badge size="sm" color="default">
                    {request.request_type}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    title="Ver detalhes"
                  >
                    <EyeIcon className="h-4 w-4" />
                    Detalhes
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Detalhes */}
      {selectedRequest && (
        <RequestDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          request={selectedRequest}
        />
      )}
    </>
  );
}
