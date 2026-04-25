// src/components/PersonalFinance/ExpenseRequestModal.tsx
import { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

interface ExpenseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  expenseTypeOptions: { value: string; label: string; icon: string }[];
  formatCurrency: (value: number) => string;
}

export default function ExpenseRequestModal({
  isOpen,
  onClose,
  onConfirm,
  expenseTypeOptions,
  formatCurrency,
}: ExpenseRequestModalProps) {
  const [formData, setFormData] = useState({
    expenseType: "TRANSPORTE",
    description: "",
    amount: "",
    expenseDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description) {
      newErrors.description = "Descrição é obrigatória";
    }
    if (!formData.amount) {
      newErrors.amount = "Valor é obrigatório";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Valor deve ser um número positivo";
    }
    if (!formData.expenseDate) {
      newErrors.expenseDate = "Data da despesa é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onConfirm({
      expenseType: formData.expenseType,
      description: formData.description,
      amount: Number(formData.amount),
      expenseDate: formData.expenseDate,
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      expenseType: "TRANSPORTE",
      description: "",
      amount: "",
      expenseDate: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Novo Pedido de Despesa
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Preencha os dados abaixo para solicitar reembolso
          </p>
        </div>

        <div className="px-2 pb-3 space-y-4">
          {/* Tipo de Despesa */}
          <div>
            <Label required>Tipo de Despesa</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {expenseTypeOptions.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, expenseType: type.value })
                  }
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    formData.expenseType === type.value
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      : "border-gray-300 hover:bg-gray-50 dark:border-gray-700"
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label required>Descrição</Label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description)
                  setErrors({ ...errors, description: "" });
              }}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Descreva o motivo da despesa..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Valor */}
          <div>
            <Label required>Valor (AOA)</Label>
            <Input
              type="number"
              step="1"
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value });
                if (errors.amount) setErrors({ ...errors, amount: "" });
              }}
              placeholder="Ex: 25000"
              error={!!errors.amount}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Data da Despesa */}
          <div>
            <Label required>Data da Despesa</Label>
            <Input
              type="date"
              value={formData.expenseDate}
              onChange={(e) => {
                setFormData({ ...formData, expenseDate: e.target.value });
                if (errors.expenseDate)
                  setErrors({ ...errors, expenseDate: "" });
              }}
              error={!!errors.expenseDate}
            />
            {errors.expenseDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expenseDate}</p>
            )}
          </div>

          {/* Informações importantes */}
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-400 font-medium mb-2">
              ⚠️ Informações importantes:
            </p>
            <ul className="text-xs text-yellow-700 dark:text-yellow-500 space-y-1">
              <li>
                • Guarde o comprovante da despesa para futura apresentação
              </li>
              <li>• O reembolso será processado após aprovação do RH</li>
              <li>• Pedidos podem levar até 5 dias úteis para análise</li>
              <li>
                • Valores acima de 100.000 AOA requerem aprovação gerencial
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button size="sm" variant="primary" onClick={handleSubmit}>
            Solicitar Reembolso
          </Button>
        </div>
      </div>
    </Modal>
  );
}
