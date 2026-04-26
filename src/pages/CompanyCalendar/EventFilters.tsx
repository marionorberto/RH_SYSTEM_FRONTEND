// src/components/CompanyCalendar/EventFilters.tsx
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface EventFiltersProps {
  filters: {
    eventTypes: string[];
    dateRange: { start: Date | null; end: Date | null };
    searchTerm: string;
  };
  onFilterChange: (filters: any) => void;
}

const eventTypeOptions = [
  { value: "HOLIDAY", label: "Feriados", icon: "🏖️" },
  { value: "TRAINING", label: "Treinamentos", icon: "📚" },
  { value: "MEETING", label: "Reuniões", icon: "🤝" },
  { value: "DEADLINE", label: "Prazos", icon: "⏰" },
  { value: "BIRTHDAY", label: "Aniversários", icon: "🎂" },
  { value: "EVENT", label: "Eventos", icon: "🎉" },
  { value: "PAYROLL", label: "Folha de Pagamento", icon: "💰" },
  { value: "EVALUATION", label: "Avaliações", icon: "📝" },
];

export default function EventFilters({
  filters,
  onFilterChange,
}: EventFiltersProps) {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleTypeToggle = (type: string) => {
    const newTypes = filters.eventTypes.includes(type)
      ? filters.eventTypes.filter((t) => t !== type)
      : [...filters.eventTypes, type];
    onFilterChange({ ...filters, eventTypes: newTypes });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFilterChange({ ...filters, searchTerm });
  };

  const clearFilters = () => {
    onFilterChange({
      eventTypes: [],
      dateRange: { start: null, end: null },
      searchTerm: "",
    });
  };

  const hasActiveFilters = filters.eventTypes.length > 0 || filters.searchTerm;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Busca */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Buscar eventos por título ou descrição..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* Filtros de Tipo */}
      <div>
        <button
          onClick={() => setShowTypeDropdown(!showTypeDropdown)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:border-gray-700"
        >
          <span>📂</span>
          Filtrar por Tipo
          <span className="text-xs text-gray-500">
            {filters.eventTypes.length > 0 && `(${filters.eventTypes.length})`}
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={showTypeDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        </button>

        {showTypeDropdown && (
          <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 w-64">
            <div className="p-2 space-y-1">
              {eventTypeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.eventTypes.includes(option.value)}
                    onChange={() => handleTypeToggle(option.value)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="mr-2">{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Limpar filtros */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 self-start"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
