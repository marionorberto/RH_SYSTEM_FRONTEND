// src/components/dashboard/AnalysisDashboard.tsx
import { useEffect, useState } from "react";
import { mealAnalysisApi, type Statistics } from "../../services/meal-service";

// Componente Card simplificado
const Card = ({ children, className = "", ...props }: any) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default function AnalysisDashboard() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    fetchStatistics();
  }, [period]);

  const fetchStatistics = async () => {
    try {
      const data = await mealAnalysisApi.getStatistics(period);
      setStatistics(data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          Não foi possível carregar as estatísticas
        </div>
      </div>
    );
  }

  // Calcular porcentagens
  const totalStatus = Object.values(statistics.statusDistribution).reduce(
    (a, b) => a + b,
    0,
  );
  const totalOccasions = Object.values(statistics.occasionDistribution).reduce(
    (a, b) => a + b,
    0,
  );
  const safetyRate =
    totalStatus > 0
      ? Math.round((statistics.statusDistribution.GREEN / totalStatus) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Seletor de período */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Estatísticas Gerais
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Período:
          </span>
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={7}>7 dias</option>
            <option value={30}>30 dias</option>
            <option value={90}>90 dias</option>
            <option value={365}>1 ano</option>
          </select>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card Total de Análises */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="p-6 relative">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de Análises
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {statistics.totalAnalyses.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Média diária: {statistics.dailyAverage.toFixed(1)}
              </p>
            </div>
          </div>
        </Card>

        {/* Card Usuários Ativos */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="p-6 relative">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 3.75l1.5 1.5-3 3.75-3-1.5-1.5 1.5-1.5-1.5 3-3.75 3 1.5 1.5-1.5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Usuários Ativos
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {statistics.totalUsers.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {period} dias atrás
              </p>
            </div>
          </div>
        </Card>

        {/* Card Taxa de Segurança */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="p-6 relative">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-800/30 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Taxa de Segurança
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {safetyRate}%
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-xs">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Verde: {statistics.statusDistribution.GREEN}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-gray-500 dark:text-gray-400">
                      Vermelho: {statistics.statusDistribution.RED}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Card Total de Refeições */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-full -translate-y-6 translate-x-6"></div>
          <div className="p-6 relative">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-800/30 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de Refeições
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {totalOccasions.toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Últimos {period} dias
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Gráficos de Distribuição */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Status */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Distribuição por Status
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total: {totalStatus}
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(statistics.statusDistribution).map(
                ([status, count]) => {
                  const percentage =
                    totalStatus > 0 ? (count / totalStatus) * 100 : 0;

                  const statusConfig = {
                    GREEN: {
                      color: "bg-green-500",
                      textColor: "text-green-600 dark:text-green-400",
                      label: "Seguro",
                      icon: "✓",
                    },
                    YELLOW: {
                      color: "bg-yellow-500",
                      textColor: "text-yellow-600 dark:text-yellow-400",
                      label: "Moderado",
                      icon: "⚠",
                    },
                    RED: {
                      color: "bg-red-500",
                      textColor: "text-red-600 dark:text-red-400",
                      label: "Alto Risco",
                      icon: "✗",
                    },
                  };

                  const config =
                    statusConfig[status as keyof typeof statusConfig] ||
                    statusConfig.GREEN;

                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <span className={`mr-2 ${config.textColor}`}>
                            {config.icon}
                          </span>
                          <span className={`font-medium ${config.textColor}`}>
                            {config.label}
                          </span>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{count}</span>
                          <span className="ml-2">
                            ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${config.color} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </Card>

        {/* Distribuição por Refeição */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Distribuição por Refeição
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total: {totalOccasions}
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(statistics.occasionDistribution).map(
                ([occasion, count]) => {
                  const percentage =
                    totalOccasions > 0 ? (count / totalOccasions) * 100 : 0;

                  const occasionConfig = {
                    breakfast: {
                      label: "Café da Manhã",
                      icon: "☕",
                      color: "bg-blue-500",
                    },
                    lunch: {
                      label: "Almoço",
                      icon: "🍽️",
                      color: "bg-green-500",
                    },
                    dinner: {
                      label: "Jantar",
                      icon: "🌙",
                      color: "bg-purple-500",
                    },
                    snack: {
                      label: "Lanche",
                      icon: "🍎",
                      color: "bg-orange-500",
                    },
                  };

                  const config = occasionConfig[
                    occasion as keyof typeof occasionConfig
                  ] || {
                    label: occasion,
                    icon: "🍴",
                    color: "bg-gray-500",
                  };

                  return (
                    <div key={occasion} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <span className="mr-2">{config.icon}</span>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {config.label}
                          </span>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">{count}</span>
                          <span className="ml-2">
                            ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${config.color} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Insights Adicionais */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Insights do Período
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Crescimento
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {statistics.dailyAverage > 0 ? "+" : ""}
                    {(
                      (statistics.dailyAverage * 100) /
                      statistics.totalAnalyses
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Média diária de análises
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg mr-3">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Engajamento
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {statistics.totalUsers > 0
                      ? (
                          statistics.totalAnalyses / statistics.totalUsers
                        ).toFixed(1)
                      : "0.0"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Análises por usuário
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg mr-3">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tendência
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {safetyRate > 70
                      ? "Positiva"
                      : safetyRate > 50
                        ? "Estável"
                        : "Atenção"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Taxa de segurança {safetyRate}%
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Botão de Atualização */}
      <div className="flex justify-center">
        <button
          onClick={fetchStatistics}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
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
            "Atualizar Estatísticas"
          )}
        </button>
      </div>
    </div>
  );
}
