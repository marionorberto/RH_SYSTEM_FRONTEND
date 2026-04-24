// src/components/Configurations/IrtSection.tsx
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

interface IrtItem {
  id: string;
  inferiorLimit: number;
  superiorLimit: number | null;
  tax: number;
  FixedValue: number;
  createdAt: string;
  updatedAt: string;
}

// Dados mockados
const mockIrtItems: IrtItem[] = [
  {
    id: "1",
    inferiorLimit: 0,
    superiorLimit: 100000,
    tax: 0,
    FixedValue: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    inferiorLimit: 100001,
    superiorLimit: 200000,
    tax: 10,
    FixedValue: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    inferiorLimit: 200001,
    superiorLimit: 350000,
    tax: 15,
    FixedValue: 10000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    inferiorLimit: 350001,
    superiorLimit: 500000,
    tax: 25,
    FixedValue: 45000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    inferiorLimit: 500001,
    superiorLimit: null,
    tax: 35,
    FixedValue: 95000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function IrtSection() {
  const [irtItems, setIrtItems] = useState(mockIrtItems);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<IrtItem | null>(null);
  const [formData, setFormData] = useState({
    inferiorLimit: "",
    superiorLimit: "",
    tax: "",
    FixedValue: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.inferiorLimit)
      newErrors.inferiorLimit = "Limite inferior é obrigatório";
    if (!formData.tax) newErrors.tax = "Taxa é obrigatória";
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

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newItem: IrtItem = {
      id: editingItem?.id || Date.now().toString(),
      inferiorLimit: parseFloat(formData.inferiorLimit),
      superiorLimit: formData.superiorLimit
        ? parseFloat(formData.superiorLimit)
        : null,
      tax: parseFloat(formData.tax),
      FixedValue: parseFloat(formData.FixedValue) || 0,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingItem) {
      setIrtItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? newItem : item)),
      );
    } else {
      setIrtItems((prev) => [...prev, newItem]);
    }
    handleCloseModal();
  };

  const handleEdit = (item: IrtItem) => {
    setEditingItem(item);
    setFormData({
      inferiorLimit: item.inferiorLimit.toString(),
      superiorLimit: item.superiorLimit?.toString() || "",
      tax: item.tax.toString(),
      FixedValue: item.FixedValue.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta faixa de IRT?")) {
      setIrtItems((prev) => prev.filter((item) => item.id !== id));
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
                />
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
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe em branco para "sem limite superior"
                </p>
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
                />
              </div>
              <div>
                <Label>Valor Fixo (AOA)</Label>
                <Input
                  type="number"
                  value={formData.FixedValue}
                  onChange={(e) =>
                    setFormData({ ...formData, FixedValue: e.target.value })
                  }
                />
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
