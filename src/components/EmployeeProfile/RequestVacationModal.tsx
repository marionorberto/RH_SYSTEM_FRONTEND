// src/components/EmployeeProfile/RequestVacationModal.tsx
import { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

interface RequestVacationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  availableDays: number;
}

export default function RequestVacationModal({
  isOpen,
  onClose,
  onConfirm,
  availableDays,
}: RequestVacationModalProps) {
  const [formData, setFormData] = useState({
    dateStart: "",
    dateEnd: "",
    observation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const requestedDays = calculateDays(formData.dateStart, formData.dateEnd);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.dateStart) {
      newErrors.dateStart = "Data de início é obrigatória";
    }
    if (!formData.dateEnd) {
      newErrors.dateEnd = "Data de fim é obrigatória";
    }
    if (formData.dateStart && formData.dateEnd) {
      const startDate = new Date(formData.dateStart);
      const endDate = new Date(formData.dateEnd);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        newErrors.dateStart = "Data de início não pode ser no passado";
      }
      if (endDate < startDate) {
        newErrors.dateEnd = "Data de fim deve ser maior que data de início";
      }
      if (requestedDays > availableDays) {
        newErrors.dateEnd = `Você só possui ${availableDays} dias disponíveis`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onConfirm({
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd,
      days: requestedDays,
      vacationType: "ANUAL",
      observation: formData.observation || "Solicitação de férias anuais",
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData({ dateStart: "", dateEnd: "", observation: "" });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Solicitar Férias
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Preencha os dados abaixo para solicitar férias
          </p>
        </div>

        <div className="px-2 pb-3 space-y-4">
          {/* Dias Disponíveis */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dias disponíveis para férias:{" "}
              <strong className="text-blue-600 text-lg">{availableDays}</strong>
            </p>
          </div>

          {/* Data Início */}
          <div>
            <Label required>Data de Início</Label>
            <Input
              type="date"
              value={formData.dateStart}
              onChange={(e) => {
                setFormData({ ...formData, dateStart: e.target.value });
                if (errors.dateStart) setErrors({ ...errors, dateStart: "" });
              }}
              error={!!errors.dateStart}
            />
            {errors.dateStart && (
              <p className="mt-1 text-sm text-red-600">{errors.dateStart}</p>
            )}
          </div>

          {/* Data Fim */}
          <div>
            <Label required>Data de Fim</Label>
            <Input
              type="date"
              value={formData.dateEnd}
              onChange={(e) => {
                setFormData({ ...formData, dateEnd: e.target.value });
                if (errors.dateEnd) setErrors({ ...errors, dateEnd: "" });
              }}
              error={!!errors.dateEnd}
            />
            {errors.dateEnd && (
              <p className="mt-1 text-sm text-red-600">{errors.dateEnd}</p>
            )}
          </div>

          {/* Preview de Dias */}
          {requestedDays > 0 && !errors.dateEnd && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm">
                Total de dias solicitados:{" "}
                <strong className="text-green-600">{requestedDays} dias</strong>
              </p>
            </div>
          )}

          {/* Observação */}
          <div>
            <Label>Observação (opcional)</Label>
            <textarea
              value={formData.observation}
              onChange={(e) =>
                setFormData({ ...formData, observation: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              placeholder="Informações adicionais sobre sua solicitação..."
            />
          </div>

          {/* Informações importantes */}
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              ⚠️ Informações importantes:
            </p>
            <ul className="text-xs text-yellow-700 dark:text-yellow-500 mt-1 space-y-1">
              <li>• O período de férias deve ser aprovado pelo RH</li>
              <li>
                • Você será notificado por email quando houver atualização
              </li>
              <li>• Consulte o regulamento interno para mais detalhes</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSubmit}
            disabled={requestedDays === 0 || requestedDays > availableDays}
          >
            Solicitar Férias
          </Button>
        </div>
      </div>
    </Modal>
  );
}
