// src/components/openai/OpenAIStats.tsx
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

interface OpenAIStatsProps {
  stats: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    totalTokens: number;
    totalCostUSD: number;
    avgResponseTime: number;
    mostUsedModel: string;
    requestsToday: number;
  };
  loading: boolean;
}

export default function OpenAIStats({ stats, loading }: OpenAIStatsProps) {
  const successRate =
    stats.totalRequests > 0
      ? (stats.successfulRequests / stats.totalRequests) * 100
      : 0;

  const avgCostPerRequest =
    stats.totalRequests > 0 ? stats.totalCostUSD / stats.totalRequests : 0;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-32 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Requisições",
      value: stats.totalRequests.toLocaleString(),
      change: "+12%",
      trend: "up",
      icon: "📊",
      description: `${stats.requestsToday} hoje`,
      color: "blue",
    },
    {
      title: "Taxa de Sucesso",
      value: `${successRate.toFixed(1)}%`,
      change: `${(successRate - 95).toFixed(1)}%`,
      trend: successRate > 95 ? "up" : "down",
      icon: "✅",
      description: `${stats.successfulRequests} sucesso / ${stats.failedRequests} falhas`,
      color: "green",
    },
    {
      title: "Custo Total",
      value: `$${stats.totalCostUSD.toFixed(2)}`,
      change: "-5%",
      trend: "down",
      icon: "💰",
      description: `$${avgCostPerRequest.toFixed(4)} por requisição`,
      color: "purple",
    },
    {
      title: "Tempo Médio",
      value: `${stats.avgResponseTime.toFixed(0)}ms`,
      change: "-15%",
      trend: "down",
      icon: "⚡",
      description: `Modelo mais usado: ${stats.mostUsedModel}`,
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
      case "green":
        return "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400";
      case "purple":
        return "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
      case "orange":
        return "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400";
      default:
        return "bg-gray-50 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpIcon className="inline h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="inline h-3 w-3 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-1">
            {stat.value}
          </h3>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {stat.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
