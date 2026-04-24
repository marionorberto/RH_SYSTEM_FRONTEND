// src/components/prompts/PromptForm.tsx
import { useState, useEffect } from "react";
import { PromptTemplate } from "../../pages/ai-integrations/prompt";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

interface PromptFormProps {
  prompt: PromptTemplate | null;
  onSave: (promptData: Partial<PromptTemplate>) => void;
  onCancel: () => void;
}

export default function PromptForm({
  prompt,
  onSave,
  onCancel,
}: PromptFormProps) {
  const [formData, setFormData] = useState<Partial<PromptTemplate>>({
    name: "",
    description: "",
    content: "",
    category: "nutritional",
    version: "1.0.0",
    isActive: true,
    priority: 5,
    variables: [],
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [variableInput, setVariableInput] = useState("");

  useEffect(() => {
    if (prompt) {
      setFormData(prompt);
    }
  }, [prompt]);

  const handleInputChange = (field: keyof PromptTemplate, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      handleInputChange("tags", [...(formData.tags || []), tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags?.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleAddVariable = () => {
    if (
      variableInput.trim() &&
      !formData.variables?.includes(variableInput.trim())
    ) {
      handleInputChange("variables", [
        ...(formData.variables || []),
        variableInput.trim(),
      ]);
      setVariableInput("");
    }
  };

  const handleRemoveVariable = (variableToRemove: string) => {
    handleInputChange(
      "variables",
      formData.variables?.filter((v) => v !== variableToRemove),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.name?.trim()) {
      alert("O nome do prompt é obrigatório");
      return;
    }

    if (!formData.content?.trim()) {
      alert("O conteúdo do prompt é obrigatório");
      return;
    }

    onSave(formData);
  };

  const categoryOptions = [
    { value: "nutritional", label: "Nutricional" },
    { value: "medical", label: "Médico" },
    { value: "general", label: "Geral" },
    { value: "custom", label: "Personalizado" },
  ];

  const priorityOptions = [
    { value: 1, label: "1 - Mais Alta" },
    { value: 2, label: "2 - Alta" },
    { value: 3, label: "3 - Média" },
    { value: 4, label: "4 - Baixa" },
    { value: 5, label: "5 - Mais Baixa" },
  ];

  const variableExamples = [
    "food_items",
    "user_data",
    "meal_type",
    "timestamp",
    "dietary_restrictions",
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
          {prompt ? "Editar Prompt" : "Criar Novo Prompt"}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome e Categoria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome do Prompt *
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Ex: Análise Nutricional Completa"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoria *
            </label>
            <select
              value={formData.category || "nutritional"}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Descreva o propósito deste prompt..."
            rows={2}
          />
        </div>

        {/* Conteúdo do Prompt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Conteúdo do Prompt *
            </label>
            <span className="text-xs text-gray-500">
              Use {"{variável}"} para variáveis dinâmicas
            </span>
          </div>
          <textarea
            value={formData.content || ""}
            onChange={(e) => handleInputChange("content", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono"
            placeholder="Digite o conteúdo do prompt aqui..."
            rows={10}
            required
          />
          <div className="mt-1 text-xs text-gray-500">
            Exemplo: "Analise os seguintes alimentos: {"{food_items}"}. Forneça
            valores nutricionais..."
          </div>
        </div>

        {/* Variáveis */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Variáveis
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={variableInput}
                onChange={(e) => setVariableInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Digite uma variável (ex: food_items)"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddVariable())
                }
              />
              <button
                type="button"
                onClick={handleAddVariable}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2">
                Variáveis adicionadas:
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.variables?.map((variable) => (
                  <div
                    key={variable}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                  >
                    <span>{`{${variable}}`}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariable(variable)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">
                Exemplos de variáveis comuns:
              </p>
              <div className="flex flex-wrap gap-1">
                {variableExamples.map((variable) => (
                  <button
                    key={variable}
                    type="button"
                    onClick={() => {
                      if (!formData.variables?.includes(variable)) {
                        handleAddVariable();
                        setVariableInput(variable);
                      }
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {`{${variable}}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tags, Prioridade e Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Digite uma tag"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prioridade
            </label>
            <select
              value={formData.priority || 5}
              onChange={(e) =>
                handleInputChange("priority", parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Prompts com prioridade mais alta são usados primeiro
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive || false}
                  onChange={(e) =>
                    handleInputChange("isActive", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <span className="text-sm">Ativo</span>
              </label>
              <div className="text-xs text-gray-500">
                {formData.isActive
                  ? "Prompt disponível para uso"
                  : "Prompt desativado"}
              </div>
            </div>
          </div>
        </div>

        {/* Versão */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Versão
          </label>
          <input
            type="text"
            value={formData.version || "1.0.0"}
            onChange={(e) => handleInputChange("version", e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ex: 1.0.0"
            pattern="^\d+\.\d+\.\d+$"
            title="Formato: número.número.número (ex: 1.0.0)"
          />
          <p className="mt-1 text-xs text-gray-500">
            Formato: major.minor.patch (ex: 2.1.0)
          </p>
        </div>

        {/* Ações do Formulário */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <CheckIcon className="w-4 h-4" />
            {prompt ? "Atualizar Prompt" : "Criar Prompt"}
          </button>
        </div>
      </form>
    </div>
  );
}
