// src/components/Discounts/DiscountFilters.tsx
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Employee {
  id: string;
  employee_name: string;
}

interface DiscountFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  employeeFilter: string;
  onEmployeeFilterChange: (value: string) => void;
  employees: Employee[];
  discountTypeFilter: string;
  onDiscountTypeFilterChange: (value: string) => void;
  discountTypes: string[];
}

export default function DiscountFilters({
  searchTerm,
  onSearchChange,
  employeeFilter,
  onEmployeeFilterChange,
  employees,
  discountTypeFilter,
  onDiscountTypeFilterChange,
  discountTypes,
}: DiscountFiltersProps) {
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
          placeholder="Buscar por funcionário ou tipo de desconto..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={employeeFilter}
          onChange={(e) => onEmployeeFilterChange(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todos os funcionários</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.employee_name}
            </option>
          ))}
        </select>

        <select
          value={discountTypeFilter}
          onChange={(e) => onDiscountTypeFilterChange(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        >
          <option value="all">Todos os tipos</option>
          {discountTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {(searchTerm ||
          employeeFilter !== "all" ||
          discountTypeFilter !== "all") && (
          <button
            onClick={() => {
              onSearchChange("");
              onEmployeeFilterChange("all");
              onDiscountTypeFilterChange("all");
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
