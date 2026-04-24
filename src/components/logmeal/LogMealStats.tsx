// src/components/logmeal/LogMealStats.tsx
import {
  UsersIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface LogMealStatsProps {
  stats: {
    total: number;
    today: number;
    recommended: number;
    highRisk: number;
  };
  loading: boolean;
}

export default function LogMealStats({ stats, loading }: LogMealStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total de Análises",
      value: stats.total.toLocaleString("pt-BR"),
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: "bg-blue-500",
      textColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Análises totais realizadas",
    },
    {
      title: "Hoje",
      value: stats.today.toLocaleString("pt-BR"),
      icon: <UsersIcon className="w-6 h-6" />,
      color: "bg-green-500",
      textColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Análises realizadas hoje",
    },
    {
      title: "Recomendadas",
      value: stats.recommended.toLocaleString("pt-BR"),
      icon: <CheckCircleIcon className="w-6 h-6" />,
      color: "bg-purple-500",
      textColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Refeições saudáveis",
      percentage:
        stats.total > 0
          ? Math.round((stats.recommended / stats.total) * 100)
          : 0,
    },
    {
      title: "Alto Risco",
      value: stats.highRisk.toLocaleString("pt-BR"),
      icon: <ExclamationTriangleIcon className="w-6 h-6" />,
      color: "bg-red-500",
      textColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      description: "Refeições problemáticas",
      percentage:
        stats.total > 0 ? Math.round((stats.highRisk / stats.total) * 100) : 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-xl border border-gray-200 dark:border-gray-700 p-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${card.bgColor} rounded-lg`}>
              <div className={card.textColor}>{card.icon}</div>
            </div>
            {card.percentage !== undefined && (
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${card.textColor} ${card.bgColor}`}
              >
                {card.percentage}%
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-1">
              {card.value}
            </h3>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {card.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
