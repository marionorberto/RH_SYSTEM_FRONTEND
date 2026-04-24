// src/pages/Departaments/EditDepartament.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

// Dados mockados
const mockDepartaments = [
  { id: "1", departamentName: "Tecnologia" },
  { id: "2", departamentName: "Recursos Humanos" },
  { id: "3", departamentName: "Financeiro" },
  { id: "4", departamentName: "Comercial" },
  { id: "5", departamentName: "Operações" },
];

export default function EditDepartament() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({ departamentName: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Carregar dados do departamento
    const timer = setTimeout(() => {
      const departament = mockDepartaments.find((d) => d.id === id);
      if (departament) {
        setFormData({ departamentName: departament.departamentName });
      }
      setInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simula chamada API
    setTimeout(() => {
      console.log("Departamento atualizado:", {
        id,
        departamentName: formData.departamentName.trim(),
      });
      setLoading(false);
      navigate("/departaments");
    }, 1500);
  };

  const handleInputChange = (value: string) => {
    setFormData({ departamentName: value });
    if (errors.departamentName) {
      setErrors({});
    }
  };

  if (initialLoading) {
    return (
      <>
        <PageMeta
          title="Editar Departamento | Sistema RH"
          description="Edita aqui o seu dep."
        />
        <PageBreadcrumb pageTitle="Editar Departamento" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando dados do departamento...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Editar Departamento | Sistema de Gestão de RH"
        description="Edite as informações do departamento"
      />
      <PageBreadcrumb pageTitle="Editar Departamento" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formulário Principal */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Editar Departamento
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Atualize as informações do departamento
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
                </div>

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

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h4 className="mb-4 text-md font-semibold text-gray-800 dark:text-white/90">
              Informações
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ID do Departamento
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {id}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  ⚠️ Alterar o nome do departamento pode afetar relatórios e
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
