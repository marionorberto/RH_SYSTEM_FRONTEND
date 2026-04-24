// src/components/logmeal/LogMealTable.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Pagination from "../common/Pagination";
import { MealAnalysis } from "../../services/meal-service";
import {
  EyeIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import LogMealDetail from "./LogMealDetail";

interface LogMealTableProps {
  analyses: MealAnalysis[];
  loading: boolean;
  onRefresh: () => void;
}

export default function LogMealTable({
  analyses,
  loading,
  onRefresh,
}: LogMealTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([]);
  const itemsPerPage = 10;

  // Paginação
  const totalPages = Math.ceil(analyses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = analyses.slice(startIndex, startIndex + itemsPerPage);

  // Funções auxiliares
  const getStatusColor = (status: string) => {
    switch (status) {
      case "GREEN":
        return "success";
      case "YELLOW":
        return "warning";
      case "RED":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "GREEN":
        return "Seguro";
      case "YELLOW":
        return "Moderado";
      case "RED":
        return "Alto Risco";
      default:
        return status;
    }
  };

  const getOccasionText = (occasion: string) => {
    const occasionMap: Record<string, string> = {
      breakfast: "Café da Manhã",
      lunch: "Almoço",
      dinner: "Jantar",
      snack: "Lanche",
    };
    return occasionMap[occasion] || occasion;
  };

  const formatDateTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;

      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;

      return date.toLocaleDateString("pt-BR");
    } catch {
      return timestamp;
    }
  };

  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;

      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const toggleSelect = (id: string) => {
    setSelectedAnalyses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedAnalyses.length === paginatedData.length) {
      setSelectedAnalyses([]);
    } else {
      setSelectedAnalyses(paginatedData.map((item) => item.id));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta análise?")) {
      try {
        // await mealAnalysisApi.deleteAnalysis(id);
        console.log("Excluindo análise:", id);
        onRefresh();
      } catch (error) {
        console.error("Erro ao excluir análise:", error);
        alert("Erro ao excluir análise");
      }
    }
  };

  const handleBulkDelete = () => {
    if (selectedAnalyses.length === 0) {
      alert("Selecione pelo menos uma análise para excluir");
      return;
    }

    if (
      window.confirm(
        `Tem certeza que deseja excluir ${selectedAnalyses.length} análises?`,
      )
    ) {
      console.log("Excluindo análises:", selectedAnalyses);
      // Implementar exclusão em lote
      setSelectedAnalyses([]);
      onRefresh();
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Carregando análises...
          </p>
        </div>
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Nenhuma análise encontrada
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Tente ajustar os filtros ou verifique se há dados disponíveis.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Ações em lote */}
      {selectedAnalyses.length > 0 && (
        <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {selectedAnalyses.length}
                </span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {selectedAnalyses.length} análise(s) selecionada(s)
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                <TrashIcon className="w-4 h-4" />
                Excluir Selecionadas
              </button>
              <button
                onClick={() => setSelectedAnalyses([])}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
              >
                Limpar Seleção
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabela */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow>
              <TableCell className="w-12">
                <input
                  type="checkbox"
                  checked={
                    selectedAnalyses.length === paginatedData.length &&
                    paginatedData.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300"
                />
              </TableCell>
              <TableCell className="w-12"> ' '</TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Usuário
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Refeição
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Data/Hora
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Métricas
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Status
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((analysis) => {
              const isExpanded = expandedRow === analysis.id;
              const isSelected = selectedAnalyses.includes(analysis.id);

              return (
                <>
                  <TableRow
                    key={analysis.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 ${
                      isSelected ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(analysis.id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleRow(analysis.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        {isExpanded ? (
                          <ChevronDownIcon className="w-4 h-4" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {analysis.user?.firstname?.charAt(0) || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {analysis.user?.firstname || "Usuário"}{" "}
                            {analysis.user?.lastname || ""}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {analysis.user?.email || "email@exemplo.com"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {getOccasionText(analysis.occasion)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {analysis.processedData?.mealNutrition?.mealType ||
                          "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-gray-900 dark:text-white">
                        {analysis.timestamp}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {analysis.timestamp}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Cal:</span>
                          <span className="font-medium">
                            {analysis.metrics?.totalCalories || 0} kcal
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Carbs:</span>
                          <span className="font-medium">
                            {analysis.metrics?.totalNetCarbs || 0}g
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge
                          size="sm"
                          color={getStatusColor(
                            analysis.classification?.safetyStatus || "GREEN",
                          )}
                        >
                          {getStatusText(
                            analysis.classification?.safetyStatus || "GREEN",
                          )}
                        </Badge>
                        <div
                          className={`text-xs ${
                            analysis.isRecommended
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {analysis.isRecommended
                            ? "✓ Recomendado"
                            : "Não Recomendado"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRow(analysis.id)}
                          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                          title="Ver detalhes"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(analysis.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                          title="Excluir análise"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Linha expandida com detalhes */}
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                          <LogMealDetail analysis={analysis} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {startIndex + 1} a{" "}
            {Math.min(startIndex + itemsPerPage, analyses.length)} de{" "}
            {analyses.length} análises
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
