// src/components/Payroll/PayrollFilters.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface PayrollFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (value: string) => void;
  departments: string[];
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  selectedMonth: number;
  onMonthChange: (value: number) => void;
  selectedYear: number;
  onYearChange: (value: number) => void;
  getMonthName: (month: number) => string;
}

export default function PayrollFilters({
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  departments,
  statusFilter,
  onStatusFilterChange,
  selectedMonth,
  onMonthChange,
  selectedYear,
  onYearChange,
  getMonthName,
}: PayrollFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por funcionário ou cargo..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <select
          value={departmentFilter}
          onChange={(e) => onDepartmentFilterChange(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todos os departamentos</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todos os status</option>
          <option value="processed">Processados</option>
          <option value="pending">Pendentes</option>
          <option value="error">Erro</option>
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {getMonthName(month)}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {(searchTerm ||
          departmentFilter !== "all" ||
          statusFilter !== "all") && (
          <button
            onClick={() => {
              onSearchChange("");
              onDepartmentFilterChange("all");
              onStatusFilterChange("all");
            }}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
