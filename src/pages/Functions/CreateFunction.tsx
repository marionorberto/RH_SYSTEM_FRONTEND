// src/pages/Functions/CreateFunction.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { Toaster } from "react-hot-toast";
import { useFunctions } from "../../hooks/useFuncions";

export default function CreateFunction() {
  const navigate = useNavigate();
  const { createFunction, loading } = useFunctions();
  const [functionName, setFunctionName] = useState("");
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
    if (!functionName.trim()) {
      setError("Nome do cargo é obrigatório");
      return false;
    }
    if (functionName.length < 2) {
      setError("Nome deve ter no mínimo 2 caracteres");
      return false;
    }
    if (functionName.length > 255) {
      setError("Nome deve ter no máximo 255 caracteres");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await createFunction(functionName.trim());
    if (result) {
      // navigate("/functions");
      return;
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <PageMeta
        title="Criar Cargo | Sistema de Gestão de RH"
        description="Cadastre um novo cargo na empresa"
      />
      <PageBreadcrumb pageTitle="Criar Cargo" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                <div>
                  <Label required>Nome do Cargo</Label>
                  <Input
                    type="text"
                    value={functionName}
                    onChange={(e) => {
                      setFunctionName(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Ex: Desenvolvedor Sênior, Analista de RH, Gerente..."
                    error={!!error}
                    disabled={loading}
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    O nome do cargo deve ser único no sistema
                  </p>
                </div>

                {functionName && !error && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-400">
                      Preview do Cargo:
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-lg uppercase">
                          {functionName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                          {functionName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Novo cargo será criado
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    // onClick={() => navigate("/functions")}
                    disabled={loading}
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

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h4 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
              Informações Importantes
            </h4>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                  💡 Dica
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Use nomes claros e padronizados para facilitar a organização
                  dos cargos.
                </p>
              </div>

              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-1">
                  ⚠️ Atenção
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  O nome do cargo deve ser único. Não é possível criar dois
                  cargos com o mesmo nome.
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">
                  📝 Exemplos
                </p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Desenvolvedor Sênior</li>
                  <li>• Analista de Recursos Humanos</li>
                  <li>• Gerente de Projetos</li>
                  <li>• Coordenador Comercial</li>
                  <li>• Assistente Administrativo</li>
                </ul>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">
                  🔴 Observação
                </p>
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
