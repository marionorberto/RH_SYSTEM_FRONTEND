// AnalysisHistoryTable.tsx - Versão corrigida
import { useEffect, useState } from "react";
import {
  mealAnalysisApi,
  type MealAnalysis,
} from "../../../services/meal-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table/index";
import Badge from "../../ui/badge/Badge";
import Pagination from "../../common/Pagination";

export default function AnalysisHistoryTable() {
  const [analyses, setAnalyses] = useState<MealAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  // Dados mock baseados no exemplo do banco
  const mockData: MealAnalysis[] = [
    {
      id: "d2d253bc-b980-406c-ad9b-85be7f1c36eb",
      userId: "66677d93-329a-4eaf-9a46-982d4cec2818",
      occasion: "dinner",
      mealTimestamp: "2026-02-02 22:30:20",
      success: true,
      metrics: {
        totalCalories: 941.0,
        totalCarbs: 69.6,
        totalNetCarbs: 44.1,
        totalFiber: 25.5,
        totalProtein: 86.7,
        totalFat: 38.4,
      },
      classification: {
        diabeticSuitability: "poor",
        safetyStatus: "RED",
        isRecommended: false,
        isFavorite: false,
      },
      processedData: {
        insights: {
          carbSources: [
            { food: "chickpea salad", carbs: 14.7 },
            { food: "broccoli", carbs: 14.4 },
            { food: "green beans with carrot", carbs: 10.1 },
            { food: "beet", carbs: 10 },
            { food: "boiled endives", carbs: 7.2 },
            { food: "cucumber", carbs: 5.4 },
          ],
          suggestions: [
            "Refeição com carboidratos moderados. Monitorar glicemia pós-refeição.",
            "Excelente fonte de fibras! Ajuda no controle glicêmico.",
          ],
        },
        mealNutrition: {
          mealType: "high-carb",
          glycemicLoad: 16.6,
          fiberToCarbRatio: 36.64,
          dailyPercentages: {
            carbs: 53.5,
            fiber: 102.0,
            protein: 173.4,
          },
        },
      },
      aiAnalysis: {
        summary: {
          mealBalance: "UNBALANCED",
          glycemicRisk: "HIGH",
          verdict: "Refeição Não Aprovada",
        },
        medicalFeedback: {
          reason:
            "A refeição apresenta 44.1g de carboidratos líquidos, excedendo o limite recomendado de 30g.",
          medicalSuggestion:
            "Reduzir ingestão de carboidratos líquidos e aumentar a proporção de fibras.",
          alternatives: [
            "Salada de folhas verdes com frango grelhado",
            "Vegetais cozidos no vapor com tofu",
          ],
        },
        patientInstructions: {
          insulinTiming: "Aplicar insulina 15 minutos antes",
          exerciseSuggestion: "Caminhada de 20 minutos após 1h da refeição",
          postMealMonitoring: "Monitorar glicemia 2h após a refeição",
        },
      },
      timestamps: {
        createdAt: "2026-02-02 22:31:08",
        updatedAt: "2026-02-02 23:36:38",
      },
      user: {
        id: "66677d93-329a-4eaf-9a46-982d4cec2818",
        firstname: "João",
        lastname: "Silva",
        username: "joao.silva",
        email: "joao@example.com",
        role: "user",
        img: null,
      },
    },
    // Adicione mais dados mock se necessário
  ];

  const fetchAnalyses = async (page = 1) => {
    setLoading(true);
    try {
      const response = await mealAnalysisApi.getAllAnalyses({
        page,
        limit: pagination.limit,
        search: filters.search,
        status: filters.status,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      console.log("API Response, fetch:", response);

      if (response && response.data && response.data.length > 0) {
        // Garantir que os dados tenham a estrutura correta
        const formattedData = response.data.map((item: any) => ({
          ...item,
          // Garantir que metrics existe e tem valores numéricos
          metrics: item.metrics || {
            totalCalories: 0,
            totalCarbs: 0,
            totalNetCarbs: 0,
            totalFiber: 0,
            totalProtein: 0,
            totalFat: 0,
          },
          // Garantir que classification existe
          classification: item.classification || {
            diabeticSuitability: "unknown",
            safetyStatus: "GREEN",
            isRecommended: false,
            isFavorite: false,
          },
        }));

        setAnalyses(formattedData);
        setPagination(
          response.pagination || {
            page,
            limit: pagination.limit,
            total: response.data.length,
            totalPages: Math.ceil(response.data.length / pagination.limit),
          },
        );
      } else {
        // Se API não retornar dados, usa mock
        console.log("API não retornou dados, usando dados mock");
        const filteredMockData = filterMockData(mockData);
        setAnalyses(filteredMockData);
        setPagination({
          page,
          limit: pagination.limit,
          total: filteredMockData.length,
          totalPages: Math.ceil(filteredMockData.length / pagination.limit),
        });
      }
    } catch (error) {
      console.error(
        "Erro ao buscar análises da API. Usando dados mock:",
        error,
      );
      const filteredMockData = filterMockData(mockData);
      setAnalyses(filteredMockData);
      setPagination({
        page,
        limit: pagination.limit,
        total: filteredMockData.length,
        totalPages: Math.ceil(filteredMockData.length / pagination.limit),
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para filtrar dados mock
  const filterMockData = (data: MealAnalysis[]) => {
    let filtered = [...data];

    if (filters.status) {
      filtered = filtered.filter(
        (item) => item.classification.safetyStatus === filters.status,
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.user?.firstname?.toLowerCase().includes(searchLower) ||
          item.user?.lastname?.toLowerCase().includes(searchLower) ||
          item.user?.email?.toLowerCase().includes(searchLower) ||
          item.occasion?.toLowerCase().includes(searchLower),
      );
    }

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(
        (item) => new Date(item.mealTimestamp) >= startDate,
      );
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (item) => new Date(item.mealTimestamp) <= endDate,
      );
    }

    return filtered;
  };

  useEffect(() => {
    fetchAnalyses(pagination.page);
  }, [filters]);

  const handlePageChange = (page: number) => {
    fetchAnalyses(page);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString.split(" ")[1] || "";
      }
      return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Função segura para formatar números
  const safeToFixed = (value: any, decimals: number = 1): string => {
    if (value === null || value === undefined) return "0.0";
    const num = Number(value);
    if (isNaN(num)) return "0.0";
    return num.toFixed(decimals);
  };

  // Função segura para acessar propriedades aninhadas
  const getSafeValue = <T,>(obj: any, path: string, defaultValue: T): T => {
    try {
      const keys = path.split(".");
      let result = obj;
      for (const key of keys) {
        result = result?.[key];
        if (result === undefined) return defaultValue;
      }
      return result !== undefined ? result : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          Carregando análises...
        </span>
      </div>
    );
  }

  console.log(analyses);

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buscar
          </label>
          <input
            type="text"
            placeholder="Nome, email, refeição..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Todos</option>
            <option value="GREEN">Seguro</option>
            <option value="YELLOW">Moderado</option>
            <option value="RED">Alto Risco</option>
          </select>
        </div>

        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data Início
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data Fim
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="self-end">
          <button
            onClick={() =>
              setFilters({ search: "", status: "", startDate: "", endDate: "" })
            }
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Usuário
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Refeição
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Data/Hora
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Métricas
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
                  Recomendado
                </TableCell>
              </TableRow>
            </TableHeader>

            {analyses.length > 0 ? (
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {analyses.map((analysis) => {
                  // Valores seguros para renderização
                  const totalCalories = getSafeValue(
                    analysis,
                    "metrics.totalCalories",
                    0,
                  );
                  const totalCarbs = getSafeValue(
                    analysis,
                    "metrics.totalCarbs",
                    0,
                  );
                  const totalNetCarbs = getSafeValue(
                    analysis,
                    "metrics.totalNetCarbs",
                    0,
                  );
                  const totalProtein = getSafeValue(
                    analysis,
                    "metrics.totalProtein",
                    0,
                  );
                  const totalFiber = getSafeValue(
                    analysis,
                    "metrics.totalFiber",
                    0,
                  );
                  const safetyStatus = getSafeValue(
                    analysis,
                    "classification.safetyStatus",
                    "GREEN",
                  );
                  const isRecommended = getSafeValue(
                    analysis,
                    "isRecommended",
                    false,
                  );
                  const diabeticSuitability = getSafeValue(
                    analysis,
                    "classification.diabeticSuitability",
                    "unknown",
                  );
                  const user = getSafeValue(analysis, "user", {
                    firstname: "Usuário",
                    email: "email@exemplo.com",
                    role: "usuário",
                  });

                  return (
                    <TableRow
                      key={analysis.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                    >
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {user?.img ? (
                              <img
                                width={40}
                                height={40}
                                src={user.img}
                                alt={user.firstname || "Usuário"}
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                                {user?.firstname?.charAt(0) || "U"}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {user?.firstname || "Usuário"}{" "}
                              {user?.lastname || ""}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {user?.email || "email@exemplo.com"}
                            </span>
                            <span className="block text-gray-400 text-theme-xs dark:text-gray-500">
                              {user?.role || "usuário"}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-300">
                        <div className="font-medium">
                          {getOccasionText(analysis.occasion)}
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {analysis.timestamp && (
                          <div className="text-xs text-gray-400 mt-1">
                            Criado: {analysis.timestamp}
                          </div>
                        )}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-start">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 w-20">
                              Calorias:
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-300">
                              {safeToFixed(totalCalories, 0)} kcal
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 w-20">
                              Carbs:
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-300">
                              {safeToFixed(totalCarbs)}g
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 w-20">
                              Carbs Líq:
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-300">
                              {safeToFixed(totalNetCarbs)}g
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 w-20">
                              Proteína:
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-300">
                              {safeToFixed(totalProtein)}g
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-start">
                        <div className="space-y-2">
                          <Badge size="sm" color={getStatusColor(safetyStatus)}>
                            {getStatusText(safetyStatus)}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            Adequação:{" "}
                            {getDiabeticSuitabilityText(diabeticSuitability)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Fibras: {safeToFixed(totalFiber)}g
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-start">
                        <div className="space-y-2">
                          {isRecommended ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400">
                              ✓ Recomendado
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400">
                              Não Recomendado
                            </span>
                          )}
                          {analysis.classification?.isFavorite && (
                            <div className="text-xs text-yellow-600 dark:text-yellow-400">
                              ⭐ Favorito
                            </div>
                          )}
                          {analysis.aiAnalysis?.summary?.verdict && (
                            <div className="text-xs text-gray-500">
                              {analysis.aiAnalysis.summary.verdict}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="px-5 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        Nenhuma análise encontrada
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {filters.search ||
                        filters.status ||
                        filters.startDate ||
                        filters.endDate
                          ? "Tente ajustar os filtros de busca."
                          : "Não há análises registradas ainda."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>

      {/* Paginação */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Resumo */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex justify-between items-center">
          <div>
            Mostrando {analyses.length} de {pagination.total} análises
          </div>
          <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            {analyses.some((a) => a.user?.firstname === "João")
              ? "Usando dados de demonstração"
              : "Dados reais"}
          </div>
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para converter adequação diabética
const getDiabeticSuitabilityText = (suitability: string) => {
  const map: Record<string, string> = {
    poor: "Baixa",
    moderate: "Moderada",
    good: "Boa",
    excellent: "Excelente",
    unknown: "Desconhecida",
  };
  return map[suitability] || suitability;
};
