// src/components/reports/StatsCards.tsx
import {
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  ChartBarIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { OverallStats } from "../../services/reports-service";

interface StatsCardsProps {
  stats: OverallStats;
  loading: boolean;
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-36 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Usuários",
      value: stats.totalUsers.toLocaleString(),
      change: stats.userGrowthRate,
      icon: <UsersIcon className="h-6 w-6" />,
      color: "blue",
      details: `${stats.activeUsers} ativos • +${stats.newUsersThisMonth} este mês`,
      trend: stats.userGrowthRate >= 0 ? "up" : "down",
    },
    {
      title: "Análises",
      value: stats.totalAnalyses.toLocaleString(),
      change:
        ((stats.analysesThisMonth / stats.totalAnalyses) * 100).toFixed(1) +
        "%",
      icon: <ChartBarIcon className="h-6 w-6" />,
      color: "green",
      details: `${stats.recommendedAnalyses} recomendadas • ${stats.recommendationRate.toFixed(1)}% taxa`,
      trend: "up",
    },
    {
      title: "OpenAI",
      value: `$${stats.openAICostThisMonth.toFixed(2)}`,
      change: stats.openAIErrorRate.toFixed(1) + "% erro",
      icon: <CpuChipIcon className="h-6 w-6" />,
      color: "purple",
      details: `${stats.totalOpenAIRequests.toLocaleString()} requisições • ${stats.avgResponseTime.toFixed(0)}ms`,
      trend: stats.openAIErrorRate > 5 ? "down" : "up",
    },
    {
      title: "Performance",
      value: `${stats.platformUptime.toFixed(1)}%`,
      change: stats.apiSuccessRate.toFixed(1) + "% sucesso",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      color: "orange",
      details: `${stats.avgLoadTime.toFixed(0)}ms carga • ${stats.safetyComplianceRate.toFixed(1)}% segurança`,
      trend: stats.apiSuccessRate >= 95 ? "up" : "down",
    },
  ];

  const getColorClasses = (color: string, type: "bg" | "text" | "border") => {
    const base = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-500/20",
      },
      green: {
        bg: "bg-green-50 dark:bg-green-500/10",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-200 dark:border-green-500/20",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-500/10",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-500/20",
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-500/10",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200 dark:border-orange-500/20",
      },
    };
    return base[color as keyof typeof base]?.[type] || "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${getColorClasses(stat.color, "bg")} ${getColorClasses(stat.color, "border")} border rounded-xl p-5`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2 rounded-lg ${getColorClasses(stat.color, "bg")} ${getColorClasses(stat.color, "text")}`}
            >
              {stat.icon}
            </div>
            <div className="flex items-center gap-1">
              {stat.trend === "up" ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-1">
            {stat.value}
          </h3>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {stat.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {stat.details}
          </p>
        </div>
      ))}
    </div>
  );
}
