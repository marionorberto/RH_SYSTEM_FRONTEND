// src/components/openai/OpenAIFilters.tsx
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { OpenAIFilters } from "../../services/openai.service";

interface OpenAIFiltersProps {
  filters: OpenAIFilters;
  onFilterChange: (filters: Partial<OpenAIFilters>) => void;
}

export default function OpenAIFilter({
  filters,
  onFilterChange,
}: OpenAIFiltersProps) {
  const statusOptions = [
    { value: "", label: "Todos os Status" },
    { value: "success", label: "✅ Sucesso" },
    { value: "error", label: "❌ Erro" },
    { value: "rate_limited", label: "⏳ Rate Limited" },
    { value: "timeout", label: "⏱️ Timeout" },
  ];

  const modelOptions = [
    { value: "", label: "Todos os Modelos" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "dall-e-3", label: "DALL-E 3" },
    { value: "whisper", label: "Whisper" },
    { value: "embeddings", label: "Embeddings" },
  ];

  const requestTypeOptions = [
    { value: "", label: "Todos os Tipos" },
    { value: "analysis", label: "Análise" },
    { value: "chat", label: "Chat" },
    { value: "image", label: "Imagem" },
    { value: "embeddings", label: "Embeddings" },
    { value: "other", label: "Outros" },
  ];

  const handleDateChange = (type: "start" | "end", value: string) => {
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        [type]: value,
      },
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      dateRange: { start: "", end: "" },
      status: "",
      model: "",
      requestType: "",
      search: "",
      minTokens: 0,
      maxTokens: 0,
    });
  };

  const hasActiveFilters =
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.status ||
    filters.model ||
    filters.requestType ||
    filters.search ||
    filters.minTokens > 0 ||
    filters.maxTokens > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h3 className="font-medium text-gray-800 dark:text-white/90">
            Filtros de Requisições
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <XMarkIcon className="h-4 w-4" />
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Busca */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="ID, usuário, endpoint..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Modelo
          </label>
          <select
            value={filters.model}
            onChange={(e) => onFilterChange({ model: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {modelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Requisição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo
          </label>
          <select
            value={filters.requestType}
            onChange={(e) => onFilterChange({ requestType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {requestTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtros Avançados - Range de Datas */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Inicial
            </label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateChange("start", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data Final
            </label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateChange("end", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Filtros de Tokens */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Min Tokens
            </label>
            <input
              type="number"
              min="0"
              value={filters.minTokens}
              onChange={(e) =>
                onFilterChange({ minTokens: parseInt(e.target.value) || 0 })
              }
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Tokens
            </label>
            <input
              type="number"
              min="0"
              value={filters.maxTokens || ""}
              onChange={(e) =>
                onFilterChange({ maxTokens: parseInt(e.target.value) || 0 })
              }
              placeholder="∞"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
