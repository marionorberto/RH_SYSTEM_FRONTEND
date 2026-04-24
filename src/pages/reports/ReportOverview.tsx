// src/pages/Reports.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import StatsCards from "../../components/reports/StatsCards";
import TrendCharts from "../../components/reports/TrendCharts";
import SafetyDistribution from "../../components/reports/SafetyDistribution";
import TopLists from "../../components/reports/TopLists";
import {
  reportsApi,
  type OverallStats,
  type TrendData,
  type TopUsers,
  type TopModels,
  type TimeRange,
} from "../../services/teste";
import {
  DocumentArrowDownIcon,
  CalendarIcon,
  ArrowPathIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Reports() {
  const [overallStats, setOverallStats] = useState<OverallStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
    userGrowthRate: 0,
    totalAnalyses: 0,
    analysesThisMonth: 0,
    recommendedAnalyses: 0,
    recommendationRate: 0,
    totalOpenAIRequests: 0,
    openAICostThisMonth: 0,
    openAIErrorRate: 0,
    avgResponseTime: 0,
    greenAnalyses: 0,
    yellowAnalyses: 0,
    redAnalyses: 0,
    safetyComplianceRate: 0,
    platformUptime: 0,
    avgLoadTime: 0,
    apiSuccessRate: 0,
  });

  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [topUsers, setTopUsers] = useState<TopUsers[]>([]);
  const [topModels, setTopModels] = useState<TopModels[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");
  const [exporting, setExporting] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [statsResponse, trendResponse, usersResponse, modelsResponse] =
        await Promise.all([
          reportsApi.getOverallStats(timeRange),
          reportsApi.getTrendData(
            timeRange === "week"
              ? 7
              : timeRange === "month"
                ? 30
                : timeRange === "quarter"
                  ? 90
                  : 365,
          ),
          reportsApi.getTopUsers(10),
          reportsApi.getTopModels(),
        ]);

      setOverallStats(statsResponse);
      setTrendData(trendResponse);
      setTopUsers(usersResponse);
      setTopModels(modelsResponse);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [timeRange]);

  const handleExportReport = async (format: "pdf" | "csv" | "excel") => {
    setExporting(true);
    try {
      const data = {
        overallStats,
        trendData,
        topUsers,
        topModels,
        generatedAt: new Date().toISOString(),
        timeRange,
      };

      const blob = await reportsApi.exportReport(format, data);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio-nutriscan-${new Date().toISOString().split("T")[0]}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);

      alert(`Relatório exportado com sucesso!`);
    } catch (error) {
      console.error("Erro ao exportar relatório:", error);
      alert("Erro ao exportar relatório");
    } finally {
      setExporting(false);
    }
  };

  const handleTimeRangeChange = (
    range: "week" | "month" | "quarter" | "year",
  ) => {
    setTimeRange(range);
  };

  const timeRangeButtons = [
    { id: "week", label: "7 Dias" },
    { id: "month", label: "30 Dias" },
    { id: "quarter", label: "Trimestre" },
    { id: "year", label: "Anual" },
  ];

  return (
    <div>
      <PageMeta
        title="Relatórios Gerais | NutriScan Admin"
        description="Dashboard completo com métricas, estatísticas e análises da plataforma NutriScan"
      />

      <PageBreadcrumb pageTitle="Relatórios Gerais" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                  Relatórios Gerais
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Dashboard completo com todas as métricas e análises da
                plataforma
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Seletor de Período */}
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  {timeRangeButtons.map((button) => (
                    <button
                      key={button.id}
                      onClick={() => handleTimeRangeChange(button.id as any)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        timeRange === button.id
                          ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                      }`}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={fetchAllData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 disabled:opacity-50"
              >
                <ArrowPathIcon
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Atualizando..." : "Atualizar"}
              </button>

              <div className="relative group">
                <button
                  disabled={exporting}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <DocumentArrowDownIcon className="h-4 w-4" />
                  {exporting ? "Exportando..." : "Exportar"}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleExportReport("pdf")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Exportar como PDF
                    </button>
                    <button
                      onClick={() => handleExportReport("csv")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Exportar como CSV
                    </button>
                    <button
                      onClick={() => handleExportReport("excel")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Exportar como Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <StatsCards stats={overallStats} loading={loading} />
        </div>

        {/* Gráficos de Tendência */}
        <TrendCharts trendData={trendData} loading={loading} />

        {/* Top Lists */}
        <TopLists topUsers={topUsers} topModels={topModels} loading={loading} />

        {/* Distribuição de Segurança */}
        <SafetyDistribution stats={overallStats} loading={loading} />

        {/* Insights e Recomendações */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-500/20 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 text-xl">
                💡
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Insights e Recomendações
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                🚀 Crescimento de Usuários
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {overallStats.userGrowthRate >= 0
                  ? "Crescimento positivo"
                  : "Crescimento negativo"}{" "}
                de {Math.abs(overallStats.userGrowthRate).toFixed(1)}% este mês.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                💰 Otimização de Custos
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Custo OpenAI: ${overallStats.openAICostThisMonth.toFixed(2)}.
                {overallStats.openAIErrorRate > 5
                  ? " Considere revisar requisições com erro."
                  : " Taxa de erro dentro do esperado."}
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                🛡️ Segurança da Plataforma
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {overallStats.safetyComplianceRate >= 90
                  ? "Excelente conformidade"
                  : "Conformidade moderada"}{" "}
                de {overallStats.safetyComplianceRate.toFixed(1)}%.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="font-medium">📊 Resumo do Período</p>
                <p className="mt-1">
                  {overallStats.analysesThisMonth.toLocaleString()} análises •
                  {overallStats.newUsersThisMonth.toLocaleString()} novos
                  usuários • ${overallStats.openAICostThisMonth.toFixed(2)}{" "}
                  custo
                </p>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                <p>
                  Relatório gerado em {new Date().toLocaleDateString("pt-BR")}
                </p>
                <p className="mt-1">
                  Período:{" "}
                  {timeRangeButtons.find((t) => t.id === timeRange)?.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
