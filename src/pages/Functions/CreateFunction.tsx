// src/pages/Functions/CreateFunction.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

interface CreateFunctionFormData {
  functionName: string;
}

export default function CreateFunction() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateFunctionFormData>({
    functionName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.functionName.trim()) {
      newErrors.functionName = "Nome do cargo é obrigatório";
    } else if (formData.functionName.length < 2) {
      newErrors.functionName = "Nome deve ter no mínimo 2 caracteres";
    } else if (formData.functionName.length > 255) {
      newErrors.functionName = "Nome deve ter no máximo 255 caracteres";
    } else if (!/^[a-zA-ZÀ-ÿ\s\-]+$/.test(formData.functionName)) {
      newErrors.functionName =
        "Nome deve conter apenas letras, espaços e hífens";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Salvar cargo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simula chamada API
    setTimeout(() => {
      console.log("Cargo criado:", {
        functionName: formData.functionName.trim(),
      });
      setLoading(false);
      // Redirecionar para lista de cargos
      navigate("/functions");
    }, 1500);
  };

  const handleInputChange = (value: string) => {
    setFormData({ functionName: value });
    if (errors.functionName) {
      setErrors({});
    }
  };

  return (
    <>
      <PageMeta
        title="Criar Cargo | Sistema de Gestão de RH"
        description="Cadastre um novo cargo na empresa"
      />
      <PageBreadcrumb pageTitle="Criar Cargo" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formulário Principal */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Informações do Cargo
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Preencha os dados abaixo para criar um novo cargo
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Nome do Cargo */}
                <div>
                  <Label required>Nome do Cargo</Label>
                  <Input
                    type="text"
                    value={formData.functionName}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Ex: Desenvolvedor Sênior, Analista de RH, Gerente..."
                    error={!!errors.functionName}
                  />
                  {errors.functionName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.functionName}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    O nome do cargo deve ser único no sistema
                  </p>
                </div>

                {/* Preview */}
                {formData.functionName && !errors.functionName && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
                      Preview do Cargo:
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-lg uppercase">
                          {formData.functionName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                          {formData.functionName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Novo cargo será criado
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botões */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    onClick={() => navigate("/functions")}
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
                      "Criar Cargo"
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
                  Use nomes claros e padronizados para facilitar a organização
                  dos cargos.
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
                  O nome do cargo deve ser único. Não é possível criar dois
                  cargos com o mesmo nome.
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
                  <li>• Desenvolvedor Sênior</li>
                  <li>• Analista de Recursos Humanos</li>
                  <li>• Gerente de Projetos</li>
                  <li>• Coordenador Comercial</li>
                  <li>• Assistente Administrativo</li>
                </ul>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">
                    Observação
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Cargos que possuem funcionários vinculados não podem ser
                  excluídos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
