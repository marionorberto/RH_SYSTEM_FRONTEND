// src/pages/Functions/EditFunction.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

// Dados mockados
const mockFunctions = [
  { id: "1", functionName: "Desenvolvedor Sênior", employeeCount: 2 },
  { id: "2", functionName: "Analista de RH", employeeCount: 1 },
  { id: "3", functionName: "Analista Financeiro", employeeCount: 1 },
  { id: "4", functionName: "Coordenador Comercial", employeeCount: 0 },
  { id: "5", functionName: "CTO", employeeCount: 1 },
];

export default function EditFunction() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({ functionName: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [originalName, setOriginalName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const func = mockFunctions.find((f) => f.id === id);
      if (func) {
        setFormData({ functionName: func.functionName });
        setOriginalName(func.functionName);
      }
      setInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log("Cargo atualizado:", {
        id,
        functionName: formData.functionName.trim(),
        oldName: originalName,
      });
      setLoading(false);
      navigate("/functions");
    }, 1500);
  };

  const handleInputChange = (value: string) => {
    setFormData({ functionName: value });
    if (errors.functionName) {
      setErrors({});
    }
  };

  if (initialLoading) {
    return (
      <>
        <PageMeta title="Editar Cargo | Sistema RH" />
        <PageBreadcrumb pageTitle="Editar Cargo" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando dados do cargo...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Editar Cargo | Sistema de Gestão de RH"
        description="Edite as informações do cargo"
      />
      <PageBreadcrumb pageTitle="Editar Cargo" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Editar Cargo
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Atualize as informações do cargo
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label required>Nome do Cargo</Label>
                  <Input
                    type="text"
                    value={formData.functionName}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Ex: Desenvolvedor Sênior, Analista de RH..."
                    error={!!errors.functionName}
                  />
                  {errors.functionName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.functionName}
                    </p>
                  )}
                </div>

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
                        Salvando...
                      </div>
                    ) : (
                      "Salvar Alterações"
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
              Informações
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ID do Cargo
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {id}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  ⚠️ Alterar o nome do cargo pode afetar relatórios e
                  associações existentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
