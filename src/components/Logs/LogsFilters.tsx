// src/components/Logs/LogsFilters.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface LogsFiltersProps {
  filters: {
    searchTerm: string;
    action: string;
    table: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: any) => void;
  actions: string[];
  tables: string[];
}

export default function LogsFilters({
  filters,
  onFilterChange,
  actions,
  tables,
}: LogsFiltersProps) {
  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      searchTerm: "",
      action: "all",
      table: "all",
      startDate: "",
      endDate: "",
    });
  };

  const hasActiveFilters =
    filters.searchTerm ||
    filters.action !== "all" ||
    filters.table !== "all" ||
    filters.startDate ||
    filters.endDate;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => handleChange("searchTerm", e.target.value)}
          placeholder="Buscar por usuário, email, ação ou descrição..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <select
          value={filters.action}
          onChange={(e) => handleChange("action", e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todas as ações</option>
          {actions.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </select>

        <select
          value={filters.table}
          onChange={(e) => handleChange("table", e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todas as tabelas</option>
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Data inicial"
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Data final"
        />

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
