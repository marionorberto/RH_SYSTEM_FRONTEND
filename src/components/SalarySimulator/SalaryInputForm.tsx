// src/components/SalarySimulator/SalaryInputForm.tsx (corrigido)
import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

// Configuração Segurança Social (definida localmente ou importada)
const SOCIAL_SECURITY_CONFIG = {
  employeeRate: 3,
  employerRate: 8,
  ceiling: 500000,
};

interface SalaryInputFormProps {
  onSimulate: (data: any) => void;
  formatCurrency?: (value: number) => string;
}

export default function SalaryInputForm({ onSimulate }: SalaryInputFormProps) {
  const [formData, setFormData] = useState({
    baseSalary: "",
    benefitAlimentacao: "50000",
    benefitTransporte: "45000",
    benefitOutros: "",
    extraHours: "",
    discountFaltas: "",
    discountOutros: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.baseSalary) {
      newErrors.baseSalary = "Salário base é obrigatório";
    } else if (
      isNaN(Number(formData.baseSalary)) ||
      Number(formData.baseSalary) <= 0
    ) {
      newErrors.baseSalary = "Salário deve ser um valor positivo";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSimulate(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const presetSalaries = [
    { label: "Mínimo", value: "100000" },
    { label: "Médio", value: "250000" },
    { label: "Sênior", value: "450000" },
    { label: "Gerente", value: "750000" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sticky top-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Dados para Simulação
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Preencha os campos abaixo para calcular seu salário líquido
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Salário Base */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label required>Salário Base (AOA)</Label>
            <div className="flex gap-1">
              {presetSalaries.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleInputChange("baseSalary", preset.value)}
                  className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <Input
            type="number"
            value={formData.baseSalary}
            onChange={(e) => handleInputChange("baseSalary", e.target.value)}
            placeholder="Ex: 250000"
            error={!!errors.baseSalary}
          />
          {errors.baseSalary && (
            <p className="mt-1 text-sm text-red-600">{errors.baseSalary}</p>
          )}
        </div>

        {/* Benefícios */}
        <div>
          <Label>Benefícios</Label>
          <div className="space-y-3 mt-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-600">
                    Subsídio Alimentação
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("benefitAlimentacao", "50000")
                    }
                    className="text-xs text-blue-500 hover:text-blue-600"
                  >
                    Padrão
                  </button>
                </div>
                <Input
                  type="number"
                  value={formData.benefitAlimentacao}
                  onChange={(e) =>
                    handleInputChange("benefitAlimentacao", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-600">
                    Subsídio Transporte
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange("benefitTransporte", "45000")
                    }
                    className="text-xs text-blue-500 hover:text-blue-600"
                  >
                    Padrão
                  </button>
                </div>
                <Input
                  type="number"
                  value={formData.benefitTransporte}
                  onChange={(e) =>
                    handleInputChange("benefitTransporte", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Outros Benefícios
              </label>
              <Input
                type="number"
                value={formData.benefitOutros}
                onChange={(e) =>
                  handleInputChange("benefitOutros", e.target.value)
                }
                placeholder="Ex: Bônus, comissões"
              />
            </div>
          </div>
        </div>

        {/* Horas Extras */}
        <div>
          <Label>Horas Extras</Label>
          <Input
            type="number"
            step="0.5"
            value={formData.extraHours}
            onChange={(e) => handleInputChange("extraHours", e.target.value)}
            placeholder="Número de horas extras no mês"
          />
          <p className="text-xs text-gray-500 mt-1">
            Valor calculado com adicional de 50%
          </p>
        </div>

        {/* Descontos */}
        <div>
          <Label>Descontos Adicionais</Label>
          <div className="space-y-3 mt-2">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Faltas (valor)
              </label>
              <Input
                type="number"
                value={formData.discountFaltas}
                onChange={(e) =>
                  handleInputChange("discountFaltas", e.target.value)
                }
                placeholder="Valor descontado por faltas"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Outros Descontos
              </label>
              <Input
                type="number"
                value={formData.discountOutros}
                onChange={(e) =>
                  handleInputChange("discountOutros", e.target.value)
                }
                placeholder="Empréstimos, adiantamentos, etc"
              />
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">
            💡 Informações importantes:
          </p>
          <ul className="text-xs text-blue-600 dark:text-blue-500 space-y-1">
            <li>• IRT calculado com base na tabela progressiva (10-35%)</li>
            <li>
              • Segurança Social: {SOCIAL_SECURITY_CONFIG.employeeRate}% sobre o
              salário base
            </li>
            <li>• Horas extras calculadas com base em 176h mensais</li>
            <li>• Valores são apenas estimativas e podem variar</li>
          </ul>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Simular Salário
        </Button>
      </form>
    </div>
  );
}
