// src/components/Users/UserFilters.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function UserFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
      {/* Barra de busca */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, email ou usuário..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Filtro por Role */}
        <select
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todos os perfis</option>
          <option value="ADMIN">Administrador</option>
          <option value="RH">Recursos Humanos</option>
          <option value="USER">Usuário Comum</option>
        </select>

        {/* Filtro por Status */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>

        {/* Botão de limpar filtros */}
        {(searchTerm || roleFilter !== "all" || statusFilter !== "all") && (
          <button
            onClick={() => {
              onSearchChange("");
              onRoleFilterChange("all");
              onStatusFilterChange("all");
            }}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
