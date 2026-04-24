// src/pages/AnalysisHistory.tsx
import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import AnalysisHistoryTable from "../components/tables/BasicTables/AnalysisHistoryTable";
import AnalysisDashboard from "../components/dashboard/analysisDashboard";

export default function AnalysisHistory() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Recarrega a página após 1 segundo
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      <PageMeta
        title="Histórico de Análises | NutriScan Admin"
        description="Dashboard de análises nutricionais realizadas pelos usuários"
      />

      <PageBreadcrumb pageTitle="Histórico de Análises" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-semibold text-gray-800 text-2xl dark:text-white/90">
                Histórico de Análises
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Dashboard completo de todas as análises nutricionais realizadas
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              >
                {showDashboard ? "Ocultar Dashboard" : "Mostrar Dashboard"}
              </button>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {refreshing ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Atualizando...
                  </div>
                ) : (
                  "Atualizar Dados"
                )}
              </button>
            </div>
          </div>

          {/* Indicadores Rápidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Status Ativo
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                Online
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Sistema operacional
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800/30">
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                Armazenamento
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                85%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Disponível
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Latência API
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                32s
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Moderado
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard de Estatísticas */}
        {showDashboard && (
          <div className="mb-8">
            <AnalysisDashboard />
          </div>
        )}

        {/* Tabela de Análises */}
        <div className="mt-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                  Todas as Análises
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Lista completa de todas as análises registradas no sistema
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Ordenação:</span> Mais Recentes
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <AnalysisHistoryTable />
          </div>
        </div>
      </div>
    </div>
  );
}
