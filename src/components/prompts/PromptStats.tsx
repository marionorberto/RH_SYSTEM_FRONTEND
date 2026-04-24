// src/components/prompts/PromptStats.tsx
import {
  ChartBarIcon,
  CheckCircleIcon,
  BoltIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

interface PromptStatsProps {
  stats: {
    total: number;
    active: number;
    categories: {
      nutritional: number;
      medical: number;
      general: number;
      custom: number;
    };
    totalUses: number;
    avgSuccessRate: number;
  };
  loading: boolean;
}

export default function PromptStats({ stats, loading }: PromptStatsProps) {
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
      title: "Total de Prompts",
      value: stats.total.toString(),
      icon: <ArchiveBoxIcon className="w-6 h-6" />,
      color: "bg-blue-500",
      textColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      description: "Templates disponíveis",
    },
    {
      title: "Prompts Ativos",
      value: stats.active.toString(),
      icon: <CheckCircleIcon className="w-6 h-6" />,
      color: "bg-green-500",
      textColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      description: "Em uso atualmente",
      percentage:
        stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0,
    },
    {
      title: "Total de Usos",
      value: stats.totalUses.toLocaleString("pt-BR"),
      icon: <BoltIcon className="w-6 h-6" />,
      color: "bg-purple-500",
      textColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      description: "Solicitações processadas",
    },
    {
      title: "Taxa de Sucesso",
      value: `${stats.avgSuccessRate.toFixed(1)}%`,
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: "bg-amber-500",
      textColor: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      description: "Média de acertos",
    },
  ];

  return (
    <div className="space-y-6">
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

      {/* Distribuição por Categoria */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
          Distribuição por Categoria
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.categories).map(([category, count]) => {
            const categoryConfig = {
              nutritional: {
                label: "Nutricional",
                color:
                  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
              },
              medical: {
                label: "Médico",
                color:
                  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
              },
              general: {
                label: "Geral",
                color:
                  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
              },
              custom: {
                label: "Personalizado",
                color:
                  "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
              },
            }[category];

            return (
              <div key={category} className="text-center">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryConfig.color} mb-2`}
                >
                  {categoryConfig.label}
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                  {count}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stats.total > 0
                    ? Math.round((count / stats.total) * 100)
                    : 0}
                  % do total
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
