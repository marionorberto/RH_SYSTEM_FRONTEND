// src/components/Users/ResetPasswordModal.tsx
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useState } from "react";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onConfirm: (newPassword: string) => void;
}

export default function ResetPasswordModal({
  isOpen,
  onClose,
  userName,
  onConfirm,
}: ResetPasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    if (newPassword.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    setError("");
    onConfirm(newPassword);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Resetar Senha
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Definir nova senha para o usuário {userName}
          </p>
        </div>

        <div className="px-2 pb-3">
          <div className="mb-4">
            <Label>Nova Senha</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite a nova senha"
            />
          </div>

          <div className="mb-4">
            <Label>Confirmar Senha</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              ⚠️ O usuário será obrigado a trocar a senha no próximo login.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleConfirm}>
            Confirmar Reset
          </Button>
        </div>
      </div>
    </Modal>
  );
}
