// src/components/Configurations/IrtSection.tsx
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
import { useIrt } from "../../hooks/useIrt";

export default function IrtSection() {
  const { irtItems, loading, createIrtItem, updateIrtItem, deleteIrtItem } =
    useIrt();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    inferiorLimit: "",
    superiorLimit: "",
    tax: "",
    FixedValue: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.inferiorLimit) {
      newErrors.inferiorLimit = "Limite inferior é obrigatório";
    } else if (parseFloat(formData.inferiorLimit) < 0) {
      newErrors.inferiorLimit = "Limite inferior deve ser maior ou igual a 0";
    }
    if (!formData.tax) {
      newErrors.tax = "Taxa é obrigatória";
    } else if (parseFloat(formData.tax) < 0 || parseFloat(formData.tax) > 100) {
      newErrors.tax = "Taxa deve estar entre 0 e 100";
    }
    if (
      formData.superiorLimit &&
      parseFloat(formData.superiorLimit) <= parseFloat(formData.inferiorLimit)
    ) {
      newErrors.superiorLimit =
        "Limite superior deve ser maior que limite inferior";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    const data = {
      inferiorLimit: parseFloat(formData.inferiorLimit),
      superiorLimit: formData.superiorLimit
        ? parseFloat(formData.superiorLimit)
        : null,
      tax: parseFloat(formData.tax),
      FixedValue: parseFloat(formData.FixedValue) || 0,
    };

    let result;
    if (editingItem) {
      result = await updateIrtItem(editingItem.id, data);
    } else {
      result = await createIrtItem(data);
    }
    setIsSaving(false);

    if (result) {
      handleCloseModal();
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      inferiorLimit: item.inferiorLimit.toString(),
      superiorLimit: item.superiorLimit?.toString() || "",
      tax: item.tax.toString(),
      FixedValue: item.FixedValue.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta faixa de IRT?")) {
      await deleteIrtItem(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      inferiorLimit: "",
      superiorLimit: "",
      tax: "",
      FixedValue: "",
    });
    setErrors({});
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tabela IRT
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tabela de Imposto de Rendimento de Trabalho
          </p>
        </div>
        <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>
          + Nova Faixa
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Limite Inferior</TableCell>
              <TableCell isHeader>Limite Superior</TableCell>
              <TableCell isHeader>Taxa (%)</TableCell>
              <TableCell isHeader>Valor Fixo</TableCell>
              <TableCell isHeader>Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {irtItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-3">
                  {formatCurrency(item.inferiorLimit)}
                </TableCell>
                <TableCell className="py-3">
                  {item.superiorLimit
                    ? formatCurrency(item.superiorLimit)
                    : "∞"}
                </TableCell>
                <TableCell className="py-3 font-medium">{item.tax}%</TableCell>
                <TableCell className="py-3">
                  {formatCurrency(item.FixedValue)}
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
              {editingItem ? "Editar Faixa IRT" : "Nova Faixa IRT"}
            </h3>
            <div className="space-y-4">
              <div>
                <Label required>Limite Inferior (AOA)</Label>
                <Input
                  type="number"
                  value={formData.inferiorLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, inferiorLimit: e.target.value })
                  }
                  error={!!errors.inferiorLimit}
                  disabled={isSaving}
                />
                {errors.inferiorLimit && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.inferiorLimit}
                  </p>
                )}
              </div>
              <div>
                <Label>Limite Superior (AOA)</Label>
                <Input
                  type="number"
                  value={formData.superiorLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, superiorLimit: e.target.value })
                  }
                  error={!!errors.superiorLimit}
                  disabled={isSaving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe em branco para "sem limite superior"
                </p>
                {errors.superiorLimit && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.superiorLimit}
                  </p>
                )}
              </div>
              <div>
                <Label required>Taxa (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.tax}
                  onChange={(e) =>
                    setFormData({ ...formData, tax: e.target.value })
                  }
                  error={!!errors.tax}
                  disabled={isSaving}
                />
                {errors.tax && (
                  <p className="mt-1 text-sm text-red-600">{errors.tax}</p>
                )}
              </div>
              <div>
                <Label>Valor Fixo (AOA)</Label>
                <Input
                  type="number"
                  value={formData.FixedValue}
                  onChange={(e) =>
                    setFormData({ ...formData, FixedValue: e.target.value })
                  }
                  disabled={isSaving}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
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
