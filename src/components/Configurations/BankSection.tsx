// src/components/Configurations/BankSection.tsx
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
import { useBanks } from "../../hooks/useBanks";
import toast from "react-hot-toast";

export default function BankSection() {
  const { banks, loading, createBank, updateBank, deleteBank, isCodeUnique } =
    useBanks();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    bank_name: "",
    sigla: "",
    code: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.bank_name.trim()) {
      newErrors.bank_name = "Nome do banco é obrigatório";
    }
    if (!formData.sigla.trim()) {
      newErrors.sigla = "Sigla é obrigatória";
    }
    if (!formData.code.trim()) {
      newErrors.code = "Código é obrigatório";
    } else if (!isCodeUnique(formData.code, editingItem?.id)) {
      newErrors.code = "Este código já está cadastrado";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    let result;
    if (editingItem) {
      result = await updateBank(editingItem.id, formData);
    } else {
      result = await createBank(formData);
    }
    setIsSaving(false);

    if (result) {
      handleCloseModal();
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      bank_name: item.bank_name,
      sigla: item.sigla,
      code: item.code,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este banco?")) {
      await deleteBank(id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ bank_name: "", sigla: "", code: "" });
    setErrors({});
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
            Bancos
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gerencie os bancos cadastrados
          </p>
        </div>
        <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>
          + Novo Banco
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Nome do Banco</TableCell>
              <TableCell isHeader>Sigla</TableCell>
              <TableCell isHeader>Código</TableCell>
              <TableCell isHeader>Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-3 font-medium">
                  {item.bank_name}
                </TableCell>
                <TableCell className="py-3">
                  <Badge color="info">{item.sigla}</Badge>
                </TableCell>
                <TableCell className="py-3">{item.code}</TableCell>
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
              {editingItem ? "Editar Banco" : "Novo Banco"}
            </h3>
            <div className="space-y-4">
              <div>
                <Label required>Nome do Banco</Label>
                <Input
                  value={formData.bank_name}
                  onChange={(e) =>
                    setFormData({ ...formData, bank_name: e.target.value })
                  }
                  error={!!errors.bank_name}
                  disabled={isSaving}
                />
                {errors.bank_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.bank_name}
                  </p>
                )}
              </div>
              <div>
                <Label required>Sigla</Label>
                <Input
                  value={formData.sigla}
                  onChange={(e) =>
                    setFormData({ ...formData, sigla: e.target.value })
                  }
                  error={!!errors.sigla}
                  disabled={isSaving}
                />
              </div>
              <div>
                <Label required>Código</Label>
                <Input
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  error={!!errors.code}
                  disabled={isSaving}
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                )}
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
