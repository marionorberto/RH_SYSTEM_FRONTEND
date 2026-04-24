// src/components/modals/ConfirmUserStatusModal.tsx
import { useState } from "react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ConfirmUserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  currentStatus: boolean;
  onSuccess: () => void;
}

export default function ConfirmUserStatusModal({
  isOpen,
  onClose,
  userId,
  userName,
  currentStatus,
  onSuccess,
}: ConfirmUserStatusModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/nutriscan/users/enable-user/",
        { userId },
      );

      if (response.data.statusCode === 200) {
        onSuccess();
        onClose();
      } else {
        setError("Falha ao atualizar status do usuário");
      }
    } catch (err: any) {
      console.error("Erro ao atualizar status:", err);
      setError(
        err.response?.data?.message || "Erro ao conectar com o servidor",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all dark:bg-gray-900">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Confirmar Alteração de Status
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            disabled={loading}
          >
            <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Tem certeza que deseja{" "}
            <span className="font-semibold">
              {currentStatus ? "desativar" : "ativar"}
            </span>{" "}
            o usuário?
          </p>
          <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Usuário:</p>
            <p className="font-medium text-gray-800 dark:text-white/90">
              {userName}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Status atual:
              </span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  currentStatus
                    ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {currentStatus ? "Ativo" : "Inativo"}
              </span>
              <span className="text-gray-400">→</span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  !currentStatus
                    ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400"
                }`}
              >
                {!currentStatus ? "Ativo" : "Inativo"}
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-500/10">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white ${
              currentStatus
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } disabled:opacity-50`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Processando...
              </div>
            ) : currentStatus ? (
              "Desativar Usuário"
            ) : (
              "Ativar Usuário"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
