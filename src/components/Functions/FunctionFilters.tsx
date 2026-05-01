// frontend/src/components/Functions/FunctionFilters.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface FunctionFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  loading?: boolean;
}

export default function FunctionFilters({
  searchTerm,
  onSearchChange,
  loading = false,
}: FunctionFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome do cargo..."
          disabled={loading}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {searchTerm && (
        <button
          onClick={() => onSearchChange("")}
          disabled={loading}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
