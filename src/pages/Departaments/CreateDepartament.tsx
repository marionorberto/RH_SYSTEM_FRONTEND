// src/pages/Departaments/CreateDepartament.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { useDepartaments } from "../../hooks/useDepartaments";
import { Toaster } from "react-hot-toast";

export default function CreateDepartament() {
  const navigate = useNavigate();
  const { createDepartament, loading } = useDepartaments();
  const [departamentName, setDepartamentName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!departamentName.trim()) {
      setError("O nome do departamento é obrigatório");
      return;
    }

    const result = await createDepartament(departamentName);
    if (result) {
      navigate("/departaments/list");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <PageMeta
        title="Criar Departamento | Sistema de Gestão de RH"
        description="Crie um novo departamento"
      />
      <PageBreadcrumb pageTitle="Criar Departamento" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Novo Departamento
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Nome do Departamento *</Label>
            <Input
              type="text"
              value={departamentName}
              onChange={(e) => setDepartamentName(e.target.value)}
              placeholder="Digite o nome do departamento"
              disabled={loading}
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/departaments/list")}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Departamento"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
