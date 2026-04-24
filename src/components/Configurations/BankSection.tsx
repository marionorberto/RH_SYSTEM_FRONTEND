// src/components/Configurations/BankSection.tsx
import { useState, useEffect } from "react";
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

interface Bank {
  id: string;
  bank_name: string;
  sigla: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

// Dados mockados
const mockBanks: Bank[] = [
  {
    id: "1",
    bank_name: "Banco Angolano de Investimentos",
    sigla: "BAI",
    code: "001",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    bank_name: "Banco de Poupança e Crédito",
    sigla: "BPC",
    code: "002",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    bank_name: "Banco Económico",
    sigla: "BE",
    code: "003",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function BankSection() {
  const [banks, setBanks] = useState(mockBanks);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Bank | null>(null);
  const [formData, setFormData] = useState({
    bank_name: "",
    sigla: "",
    code: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.bank_name)
      newErrors.bank_name = "Nome do banco é obrigatório";
    if (!formData.sigla) newErrors.sigla = "Sigla é obrigatória";
    if (!formData.code) newErrors.code = "Código é obrigatório";
    else if (
      banks.some((b) => b.code === formData.code && b.id !== editingItem?.id)
    ) {
      newErrors.code = "Este código já está cadastrado";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingItem) {
      setBanks((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, updatedAt: new Date().toISOString() }
            : item,
        ),
      );
    } else {
      const newBank: Bank = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBanks((prev) => [...prev, newBank]);
    }
    handleCloseModal();
  };

  const handleEdit = (item: Bank) => {
    setEditingItem(item);
    setFormData({
      bank_name: item.bank_name,
      sigla: item.sigla,
      code: item.code,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este banco?")) {
      setBanks((prev) => prev.filter((item) => item.id !== id));
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
                />
                {errors.code && (
                  <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
