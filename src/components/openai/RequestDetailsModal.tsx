// src/components/openai/RequestDetailsModal.tsx
import { XMarkIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { OpenAIRequest } from "../../services/openai.service";

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: OpenAIRequest;
}

export default function RequestDetailsModal({
  isOpen,
  onClose,
  request,
}: RequestDetailsModalProps) {
  if (!isOpen) return null;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      full: date.toLocaleString("pt-BR"),
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Você pode adicionar um toast aqui
  };

  const timestamp = formatTimestamp(request.timestamp);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl transform rounded-2xl bg-white p-6 shadow-2xl transition-all dark:bg-gray-900">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Detalhes da Requisição OpenAI
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {timestamp.full}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard(request.id)}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Copiar ID"
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
              Copiar ID
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Informações Gerais */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                Informações Gerais
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ID</p>
                  <p className="font-mono text-sm text-gray-800 dark:text-white/90">
                    {request.id}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Data
                    </p>
                    <p className="font-medium">{timestamp.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hora
                    </p>
                    <p className="font-medium">{timestamp.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === "success"
                        ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400"
                        : request.status === "error"
                          ? "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400"
                    }`}
                  >
                    {request.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                Informações do Usuário
              </h4>
              <div className="space-y-3">
                {request.userId && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      User ID
                    </p>
                    <p className="font-mono text-sm">{request.userId}</p>
                  </div>
                )}
                {request.userEmail && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-sm font-medium">{request.userEmail}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coluna Direita - Informações Técnicas */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                Informações Técnicas
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Endpoint
                  </p>
                  <p className="font-mono text-sm">{request.endpoint}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Modelo
                  </p>
                  <p className="font-medium">{request.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tipo de Requisição
                  </p>
                  <p className="font-medium">{request.request_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tempo de Resposta
                  </p>
                  <p
                    className={`font-medium ${
                      request.response_time_ms > 5000
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {request.response_time_ms}ms
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                Custos e Tokens
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Prompt Tokens
                  </p>
                  <p className="font-medium">
                    {request.prompt_tokens.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Completion Tokens
                  </p>
                  <p className="font-medium">
                    {request.completion_tokens.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Tokens
                  </p>
                  <p className="font-medium">
                    {request.total_tokens.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Custo
                  </p>
                  <p
                    className={`font-medium ${
                      request.cost_usd > 0.01
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    ${request.cost_usd.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagem de Erro (se houver) */}
        {request.error_message && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 dark:border-red-700/50 dark:bg-red-500/10 p-4">
            <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">
              Mensagem de Erro
            </h4>
            <p className="font-mono text-sm text-red-600 dark:text-red-300">
              {request.error_message}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
