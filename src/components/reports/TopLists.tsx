// src/components/reports/TopLists.tsx
import { TopUsers, TopModels } from "../../services/reports-service";
import { StarIcon, TrophyIcon, FireIcon } from "@heroicons/react/24/outline";

interface TopListsProps {
  topUsers: TopUsers[];
  topModels: TopModels[];
  loading: boolean;
}

export default function TopLists({
  topUsers,
  topModels,
  loading,
}: TopListsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Top Usuários */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Top Usuários
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Por análises realizadas
          </span>
        </div>

        <div className="space-y-4">
          {topUsers.slice(0, 5).map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1">
                      <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800 dark:text-white/90">
                  {user.analysesCount}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  análises
                </p>
              </div>
            </div>
          ))}
        </div>

        {topUsers.length > 5 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              +{topUsers.length - 5} outros usuários
            </p>
          </div>
        )}
      </div>

      {/* Top Modelos */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FireIcon className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Top Modelos OpenAI
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Por uso e custo
          </span>
        </div>

        <div className="space-y-4">
          {topModels.map((model, index) => (
            <div
              key={model.model}
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {model.model}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{model.count.toLocaleString()} usos</span>
                    <span>•</span>
                    <span>{model.avgResponseTime.toFixed(0)}ms</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800 dark:text-white/90">
                  ${model.totalCost.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {model.totalTokens.toLocaleString()} tokens
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Custo Total dos Modelos
            </p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${topModels.reduce((sum, m) => sum + m.totalCost, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
