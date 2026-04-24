// src/components/logmeal/LogMealFilters.tsx
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface LogMealFiltersProps {
  filters: {
    dateRange: {
      start: string;
      end: string;
    };
    status: string;
    occasion: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function LogMealFilters({
  filters,
  onFilterChange,
}: LogMealFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleDateChange = (type: "start" | "end", value: string) => {
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        [type]: value,
      },
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ status: value });
  };

  const handleOccasionChange = (value: string) => {
    onFilterChange({ occasion: value });
  };

  const handleSearchChange = (value: string) => {
    onFilterChange({ search: value });
  };

  const resetFilters = () => {
    onFilterChange({
      dateRange: { start: "", end: "" },
      status: "",
      occasion: "",
      search: "",
    });
  };

  // Opções para os filtros
  const statusOptions = [
    { value: "", label: "Todos os Status" },
    { value: "GREEN", label: "Seguro" },
    { value: "YELLOW", label: "Moderado" },
    { value: "RED", label: "Alto Risco" },
  ];

  const occasionOptions = [
    { value: "", label: "Todas as Refeições" },
    { value: "breakfast", label: "Café da Manhã" },
    { value: "lunch", label: "Almoço" },
    { value: "dinner", label: "Jantar" },
    { value: "snack", label: "Lanche" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Barra de Busca */}
        <div className="flex-1">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por usuário, alimento..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Botão Filtros Avançados */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <FunnelIcon className="w-5 h-5" />
          <span>Filtros Avançados</span>
        </button>

        {/* Botão Limpar Filtros */}
        <button
          onClick={resetFilters}
          className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Limpar Filtros
        </button>
      </div>

      {/* Filtros Avançados */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por Data */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Período
              </label>
              <div className="space-y-2">
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-xs text-gray-500 absolute -bottom-5 left-0">
                    Início
                  </span>
                </div>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-xs text-gray-500 absolute -bottom-5 left-0">
                    Fim
                  </span>
                </div>
              </div>
            </div>

            {/* Filtro por Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status Nutricional
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Refeição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Refeição
              </label>
              <select
                value={filters.occasion}
                onChange={(e) => handleOccasionChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {occasionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Informações dos Filtros */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtros Ativos
              </h4>
              <div className="space-y-1">
                {filters.dateRange.start && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    📅 De:{" "}
                    {new Date(filters.dateRange.start).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                )}
                {filters.dateRange.end && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    📅 Até:{" "}
                    {new Date(filters.dateRange.end).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                )}
                {filters.status && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    🏷️ Status:{" "}
                    {
                      statusOptions.find((s) => s.value === filters.status)
                        ?.label
                    }
                  </p>
                )}
                {filters.occasion && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    🍽️ Refeição:{" "}
                    {
                      occasionOptions.find((o) => o.value === filters.occasion)
                        ?.label
                    }
                  </p>
                )}
                {filters.search && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    🔍 Busca: "{filters.search}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
