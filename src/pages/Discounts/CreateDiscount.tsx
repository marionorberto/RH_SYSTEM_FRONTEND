// src/pages/Discounts/CreateDiscount.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";

// Dados mockados
const mockEmployees = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Carlos Oliveira" },
  { id: "4", name: "Ana Costa" },
];

const mockDiscountTypes = [
  {
    id: "1",
    name: "IRT - Imposto de Rendimento de Trabalho",
    code: "IRT",
    category: "IRT - Imposto de Rendimento de Trabalho",
  },
  {
    id: "2",
    name: "SS - Segurança Social",
    code: "SS",
    category: "SS - Segurança Social",
  },
  { id: "3", name: "Falta", code: "FALTA", category: "Falta" },
  {
    id: "4",
    name: "Empréstimo",
    code: "EMPRESTIMO",
    category: "Outros Desconto",
  },
  {
    id: "5",
    name: "Adiantamento",
    code: "ADIANTAMENTO",
    category: "Outros Desconto",
  },
  {
    id: "6",
    name: "Desconto Diversos",
    code: "DIVERSOS",
    category: "Outros Desconto",
  },
];

const processingTypeOptions = [
  { value: "Mensal", label: "Mensal" },
  { value: "Semanal", label: "Semanal" },
  { value: "Diario", label: "Diário" },
];

const calculoTypeOptions = [
  { value: "Valor", label: "Valor Fixo" },
  { value: "Percentual", label: "Percentual" },
  { value: "Formula", label: "Fórmula" },
];

interface DiscountFormData {
  employeeId: string;
  discountTypeId: string;
  value: string;
  unities: number;
  days: number;
  processingType: string;
  tipoCalculo: string;
}

export default function CreateDiscount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedDiscountType, setSelectedDiscountType] = useState<any>(null);
  const [formData, setFormData] = useState<DiscountFormData>({
    employeeId: "",
    discountTypeId: "",
    value: "",
    unities: 1,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Valor",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Buscar tipo de desconto selecionado
  useEffect(() => {
    const selected = mockDiscountTypes.find(
      (type) => type.id === formData.discountTypeId,
    );
    setSelectedDiscountType(selected);
  }, [formData.discountTypeId]);

  const handleInputChange = (field: keyof DiscountFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId) {
      newErrors.employeeId = "Selecione um funcionário";
    }
    if (!formData.discountTypeId) {
      newErrors.discountTypeId = "Selecione um tipo de desconto";
    }
    if (!formData.value) {
      newErrors.value = "Valor é obrigatório";
    } else if (isNaN(Number(formData.value)) || Number(formData.value) <= 0) {
      newErrors.value = "Valor deve ser um número positivo";
    }
    if (formData.unities < 1) {
      newErrors.unities = "Unidades deve ser pelo menos 1";
    }
    if (formData.days < 1) {
      newErrors.days = "Dias deve ser pelo menos 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Desconto criado:", {
        ...formData,
        value: Number(formData.value),
        discountCategory: selectedDiscountType?.category,
      });
      setLoading(false);
      navigate("/discounts");
    }, 1500);
  };

  const getTotalValue = () => {
    const value = Number(formData.value);
    if (formData.tipoCalculo === "Percentual") {
      return `${value}%`;
    }
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(value * formData.unities);
  };

  return (
    <>
      <PageMeta
        title="Criar Desconto | Sistema de Gestão de RH"
        description="Cadastre um novo desconto para funcionário"
      />
      <PageBreadcrumb pageTitle="Criar Desconto" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formulário Principal */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Novo Desconto
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Preencha os dados abaixo para adicionar um desconto ao
                funcionário
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Funcionário */}
                <div>
                  <Label required>Funcionário</Label>
                  <Select
                    options={mockEmployees.map((emp) => ({
                      value: emp.id,
                      label: emp.name,
                    }))}
                    value={formData.employeeId}
                    onChange={(value) => handleInputChange("employeeId", value)}
                    placeholder="Selecione um funcionário"
                  />
                  {errors.employeeId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.employeeId}
                    </p>
                  )}
                </div>

                {/* Tipo de Desconto */}
                <div>
                  <Label required>Tipo de Desconto</Label>
                  <Select
                    options={mockDiscountTypes.map((type) => ({
                      value: type.id,
                      label: `${type.name}`,
                    }))}
                    value={formData.discountTypeId}
                    onChange={(value) =>
                      handleInputChange("discountTypeId", value)
                    }
                    placeholder="Selecione o tipo"
                  />
                  {errors.discountTypeId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.discountTypeId}
                    </p>
                  )}
                </div>

                {/* Tipo de Cálculo */}
                <div>
                  <Label required>Tipo de Cálculo</Label>
                  <Select
                    options={calculoTypeOptions}
                    value={formData.tipoCalculo}
                    onChange={(value) =>
                      handleInputChange("tipoCalculo", value)
                    }
                    placeholder="Selecione"
                  />
                </div>

                {/* Valor */}
                <div>
                  <Label required>
                    {formData.tipoCalculo === "Percentual"
                      ? "Percentual (%)"
                      : "Valor (AOA)"}
                  </Label>
                  <Input
                    type="number"
                    step={formData.tipoCalculo === "Percentual" ? "0.01" : "1"}
                    value={formData.value}
                    onChange={(e) => handleInputChange("value", e.target.value)}
                    placeholder={
                      formData.tipoCalculo === "Percentual"
                        ? "Ex: 5.5"
                        : "Ex: 25000"
                    }
                    error={!!errors.value}
                  />
                  {errors.value && (
                    <p className="mt-1 text-sm text-red-600">{errors.value}</p>
                  )}
                </div>

                {/* Unidades e Dias */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Unidades</Label>
                    <Input
                      type="number"
                      value={formData.unities}
                      onChange={(e) =>
                        handleInputChange(
                          "unities",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      placeholder="Número de unidades"
                    />
                    {errors.unities && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.unities}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Dias</Label>
                    <Input
                      type="number"
                      value={formData.days}
                      onChange={(e) =>
                        handleInputChange("days", parseInt(e.target.value) || 0)
                      }
                      placeholder="Número de dias"
                    />
                    {errors.days && (
                      <p className="mt-1 text-sm text-red-600">{errors.days}</p>
                    )}
                  </div>
                </div>

                {/* Tipo de Processamento */}
                <div>
                  <Label required>Tipo de Processamento</Label>
                  <Select
                    options={processingTypeOptions}
                    value={formData.processingType}
                    onChange={(value) =>
                      handleInputChange("processingType", value)
                    }
                    placeholder="Selecione"
                  />
                </div>

                {/* Preview */}
                {(formData.value ||
                  formData.employeeId ||
                  formData.discountTypeId) && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                      Preview do Desconto:
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-gray-600">Funcionário:</span>{" "}
                        <span className="font-medium">
                          {mockEmployees.find(
                            (e) => e.id === formData.employeeId,
                          )?.name || "---"}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-600">Tipo:</span>{" "}
                        <span className="font-medium">
                          {selectedDiscountType?.name || "---"}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-600">Valor Base:</span>{" "}
                        <span className="font-medium">
                          {formData.tipoCalculo === "Percentual"
                            ? `${formData.value}%`
                            : new Intl.NumberFormat("pt-AO", {
                                style: "currency",
                                currency: "AOA",
                              }).format(Number(formData.value) || 0)}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-600">Total:</span>{" "}
                        <span className="font-bold text-red-600">
                          {getTotalValue()}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Botões */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    onClick={() => navigate("/discounts")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="md"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Salvando...
                      </div>
                    ) : (
                      "Salvar Desconto"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar com informações */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h4 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
              Informações Importantes
            </h4>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  Tipos de Desconto
                </p>
                <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    • <strong>IRT</strong>: Imposto de Rendimento de Trabalho
                  </li>
                  <li>
                    • <strong>Segurança Social</strong>: Contribuição
                    obrigatória
                  </li>
                  <li>
                    • <strong>Falta</strong>: Desconto por faltas
                  </li>
                  <li>
                    • <strong>Outros</strong>: Empréstimos, adiantamentos, etc.
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Tipos de Cálculo
                </p>
                <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    • <strong>Valor Fixo</strong>: Valor monetário direto
                  </li>
                  <li>
                    • <strong>Percentual</strong>: Percentual sobre salário base
                  </li>
                  <li>
                    • <strong>Fórmula</strong>: Cálculo personalizado
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  Processamento
                </p>
                <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>
                    • <strong>Mensal</strong>: Descontado uma vez por mês
                  </li>
                  <li>
                    • <strong>Semanal</strong>: Descontado semanalmente
                  </li>
                  <li>
                    • <strong>Diário</strong>: Calculado por dia trabalhado
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                  Exemplos
                </p>
                <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• IRT: Percentual, Mensal</li>
                  <li>• Segurança Social: Percentual, Mensal</li>
                  <li>• Falta: Valor Fixo, Diário</li>
                  <li>• Empréstimo: Valor Fixo, Mensal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
