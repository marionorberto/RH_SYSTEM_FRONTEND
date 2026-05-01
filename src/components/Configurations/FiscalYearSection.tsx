// src/components/Configurations/FiscalYearSection.tsx
import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useFiscalYears } from "../../hooks/useFiscalYears";

export default function FiscalYearSection() {
  const {
    fiscalYears,
    loading,
    createFiscalYear,
    updateFiscalYear,
    deleteFiscalYear,
  } = useFiscalYears();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ year: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.year) {
      newErrors.year = "Ano é obrigatório";
    } else if (
      !/^\d{4}$/.test(formData.year) &&
      !/^\d{4}\/\d{4}$/.test(formData.year)
    ) {
      newErrors.year = "Ano inválido (formato: 2024 ou 2024/2025)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    let result;
    if (editingItem) {
      result = await updateFiscalYear(editingItem.id, formData.year);
    } else {
      result = await createFiscalYear(formData.year);
    }
    setIsSaving(false);

    if (result) {
      handleCloseModal();
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ year: item.year });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este ano fiscal?")) {
      await deleteFiscalYear(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ year: "" });
    setErrors({});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Anos Fiscais
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie os anos fiscais da empresa
          </p>
        </div>
        <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>
          + Novo Ano Fiscal
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Ano</TableCell>
              <TableCell isHeader>Data de Criação</TableCell>
              <TableCell isHeader>Última Atualização</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fiscalYears.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-3 font-medium">{item.year}</TableCell>
                <TableCell className="py-3 text-gray-500">
                  {formatDate(item.createdAt)}
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {formatDate(item.updatedAt)}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    color={
                      item.year === new Date().getFullYear().toString()
                        ? "success"
                        : "default"
                    }
                  >
                    {item.year === new Date().getFullYear().toString()
                      ? "Atual"
                      : "Arquivo"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Excluir
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-4">
              {editingItem ? "Editar Ano Fiscal" : "Novo Ano Fiscal"}
            </h3>
            <div className="mb-4">
              <Label required>Ano</Label>
              <Input
                type="text"
                placeholder="2024 ou 2024/2025"
                value={formData.year}
                onChange={(e) => setFormData({ year: e.target.value })}
                error={!!errors.year}
                disabled={isSaving}
              />
              {errors.year && (
                <p className="mt-1 text-sm text-red-600">{errors.year}</p>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
