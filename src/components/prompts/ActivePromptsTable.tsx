// src/components/prompts/ActivePromptsTable.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Pagination from "../common/Pagination";
import { PromptTemplate } from "../../pages/ai-integrations/prompt";
import {
  PencilIcon,
  TrashIcon,
  PlayIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

interface ActivePromptsTableProps {
  prompts: PromptTemplate[];
  loading: boolean;
  onEdit: (prompt: PromptTemplate) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onTest: (prompt: PromptTemplate) => void;
}

export default function ActivePromptsTable({
  prompts,
  loading,
  onEdit,
  onToggleActive,
  onDelete,
  onTest,
}: ActivePromptsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const itemsPerPage = 8;

  // Paginação
  const totalPages = Math.ceil(prompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = prompts.slice(startIndex, startIndex + itemsPerPage);

  // Funções auxiliares
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "nutritional":
        return "success";
      case "medical":
        return "danger";
      case "general":
        return "warning";
      case "custom":
        return "primary";
      default:
        return "default";
    }
  };

  const getCategoryText = (category: string) => {
    const categoryMap: Record<string, string> = {
      nutritional: "Nutricional",
      medical: "Médico",
      general: "Geral",
      custom: "Personalizado",
    };
    return categoryMap[category] || category;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Aqui você pode adicionar um toast de confirmação
    console.log("Prompt copiado para clipboard");
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Carregando prompts...
          </p>
        </div>
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Nenhum prompt encontrado
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Crie seu primeiro prompt ou ajuste os filtros de busca.
        </p>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Criar Primeiro Prompt
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tabela */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow>
              <TableCell className="w-12">' ' </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Nome / Descrição
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Categoria
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Status
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Estatísticas
              </TableCell>
              <TableCell className="font-medium text-gray-700 dark:text-gray-300">
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((prompt) => {
              const isExpanded = expandedRow === prompt.id;

              return (
                <>
                  <TableRow
                    key={prompt.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 ${
                      !prompt.isActive ? "opacity-70" : ""
                    }`}
                  >
                    <TableCell>
                      <button
                        onClick={() => toggleRow(prompt.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                      >
                        {isExpanded ? (
                          <EyeSlashIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {prompt.name}
                          </p>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                            v{prompt.version}
                          </span>
                          {prompt.priority === 1 && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                              Prioridade Alta
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {prompt.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {prompt.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        size="sm"
                        color={getCategoryColor(prompt.category)}
                      >
                        {getCategoryText(prompt.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {prompt.isActive ? (
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm">Ativo</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <span className="text-sm">Inativo</span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Atualizado: {formatDate(prompt.updatedAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Usos:</span>
                          <span className="text-sm font-medium">
                            {prompt.usageCount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Sucesso:
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              prompt.successRate >= 90
                                ? "text-green-600 dark:text-green-400"
                                : prompt.successRate >= 80
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {prompt.successRate.toFixed(1)}%
                          </span>
                        </div>
                        {prompt.lastUsed && (
                          <div className="text-xs text-gray-500">
                            Último uso: {formatDate(prompt.lastUsed)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onTest(prompt)}
                          className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20"
                          title="Testar prompt"
                        >
                          <PlayIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(prompt.content)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                          title="Copiar conteúdo"
                        >
                          <ClipboardIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(prompt)}
                          className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                          title="Editar prompt"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            onToggleActive(prompt.id, !prompt.isActive)
                          }
                          className={`p-1.5 rounded-lg ${
                            prompt.isActive
                              ? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:text-yellow-300 dark:hover:bg-yellow-900/20"
                              : "text-green-600 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20"
                          }`}
                          title={
                            prompt.isActive
                              ? "Desativar prompt"
                              : "Ativar prompt"
                          }
                        >
                          {prompt.isActive ? (
                            <EyeSlashIcon className="w-4 h-4" />
                          ) : (
                            <EyeIcon className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => onDelete(prompt.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                          title="Excluir prompt"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Linha expandida com detalhes */}
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                          <div className="space-y-4">
                            {/* Cabeçalho do detalhe */}
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                                Detalhes do Prompt
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Criado por: {prompt.createdBy}</span>
                                <span>•</span>
                                <span>
                                  Criado em: {formatDateTime(prompt.createdAt)}
                                </span>
                              </div>
                            </div>

                            {/* Conteúdo do Prompt */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Conteúdo:
                              </h5>
                              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                                {prompt.content}
                              </div>
                            </div>

                            {/* Variáveis e Metadados */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Variáveis Disponíveis:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {prompt.variables.map((variable) => (
                                    <code
                                      key={variable}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-sm"
                                    >
                                      {`{${variable}}`}
                                    </code>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Metadados:
                                </h5>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Prioridade:
                                    </span>
                                    <span className="font-medium">
                                      {prompt.priority}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">
                                      Versão:
                                    </span>
                                    <span className="font-medium">
                                      {prompt.version}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Tags:</span>
                                    <span>{prompt.tags.join(", ")}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Ações do Detalhe */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() => copyToClipboard(prompt.content)}
                                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                              >
                                <ClipboardIcon className="w-4 h-4" />
                                Copiar Conteúdo
                              </button>
                              <button
                                onClick={() => onTest(prompt)}
                                className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                              >
                                <PlayIcon className="w-4 h-4" />
                                Testar Prompt
                              </button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {startIndex + 1} a{" "}
            {Math.min(startIndex + itemsPerPage, prompts.length)} de{" "}
            {prompts.length} prompts
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
