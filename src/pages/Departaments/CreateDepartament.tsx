// src/pages/Departaments/CreateDepartament.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

interface CreateDepartamentFormData {
  departamentName: string;
}

export default function CreateDepartament() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateDepartamentFormData>({
    departamentName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.departamentName.trim()) {
      newErrors.departamentName = "Nome do departamento é obrigatório";
    } else if (formData.departamentName.length < 2) {
      newErrors.departamentName = "Nome deve ter no mínimo 2 caracteres";
    } else if (formData.departamentName.length > 255) {
      newErrors.departamentName = "Nome deve ter no máximo 255 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Salvar departamento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simula chamada API
    setTimeout(() => {
      console.log("Departamento criado:", {
        departamentName: formData.departamentName.trim(),
      });
      setLoading(false);
      // Redirecionar para lista de departamentos
      navigate("/departaments");
    }, 1500);
  };

  const handleInputChange = (value: string) => {
    setFormData({ departamentName: value });
    if (errors.departamentName) {
      setErrors({});
    }
  };

  return (
    <>
      <PageMeta
        title="Criar Departamento | Sistema de Gestão de RH"
        description="Cadastre um novo departamento"
      />
      <PageBreadcrumb pageTitle="Criar Departamento" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formulário Principal */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Informações do Departamento
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Preencha os dados abaixo para criar um novo departamento
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Nome do Departamento */}
                <div>
                  <Label required>Nome do Departamento</Label>
                  <Input
                    type="text"
                    value={formData.departamentName}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Ex: Tecnologia, Recursos Humanos, Financeiro..."
                    error={!!errors.departamentName}
                  />
                  {errors.departamentName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.departamentName}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    O nome do departamento deve ser único no sistema
                  </p>
                </div>

                {/* Preview */}
                {formData.departamentName && !errors.departamentName && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                      Preview:
                    </p>
                    <p className="text-lg font-semibold text-blue-800 dark:text-blue-300 mt-1">
                      {formData.departamentName}
                    </p>
                  </div>
                )}

                {/* Botões */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    onClick={() => navigate("/departaments")}
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
                        Criando...
                      </div>
                    ) : (
                      "Criar Departamento"
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
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                    Dica
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Use nomes claros e descritivos para facilitar a identificação
                  dos departamentos.
                </p>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    Atenção
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  O nome do departamento deve ser único. Não é possível criar
                  dois departamentos com o mesmo nome.
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    Exemplos
                  </p>
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                  <li>• Tecnologia da Informação</li>
                  <li>• Recursos Humanos</li>
                  <li>• Financeiro</li>
                  <li>• Marketing e Comunicação</li>
                  <li>• Operações e Logística</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
