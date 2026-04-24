// src/components/Configurations/SocialSecuritySection.tsx
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

interface SocialSecurityConfig {
  id: string;
  employeeRate: number;
  employerRate: number;
  ceiling: number | null;
  effectiveDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Dados mockados
const mockSocialConfigs: SocialSecurityConfig[] = [
  {
    id: "1",
    employeeRate: 3,
    employerRate: 8,
    ceiling: 500000,
    effectiveDate: "2024-01-01",
    description: "Taxa padrão para 2024",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    employeeRate: 2.5,
    employerRate: 7,
    ceiling: 450000,
    effectiveDate: "2023-01-01",
    description: "Taxa padrão para 2023",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function SocialSecuritySection() {
  const [configs, setConfigs] = useState(mockSocialConfigs);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialSecurityConfig | null>(
    null,
  );
  const [formData, setFormData] = useState({
    employeeRate: "",
    employerRate: "",
    ceiling: "",
    effectiveDate: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.employeeRate)
      newErrors.employeeRate = "Taxa do funcionário é obrigatória";
    if (!formData.employerRate)
      newErrors.employerRate = "Taxa da empresa é obrigatória";
    if (!formData.effectiveDate)
      newErrors.effectiveDate = "Data de vigência é obrigatória";
    if (
      parseFloat(formData.employeeRate) < 0 ||
      parseFloat(formData.employeeRate) > 100
    ) {
      newErrors.employeeRate = "Taxa deve estar entre 0 e 100";
    }
    if (
      parseFloat(formData.employerRate) < 0 ||
      parseFloat(formData.employerRate) > 100
    ) {
      newErrors.employerRate = "Taxa deve estar entre 0 e 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newConfig: SocialSecurityConfig = {
      id: editingItem?.id || Date.now().toString(),
      employeeRate: parseFloat(formData.employeeRate),
      employerRate: parseFloat(formData.employerRate),
      ceiling: formData.ceiling ? parseFloat(formData.ceiling) : null,
      effectiveDate: formData.effectiveDate,
      description: formData.description,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingItem) {
      setConfigs((prev) =>
        prev.map((item) => (item.id === editingItem.id ? newConfig : item)),
      );
    } else {
      setConfigs((prev) => [...prev, newConfig]);
    }
    handleCloseModal();
  };

  const handleEdit = (item: SocialSecurityConfig) => {
    setEditingItem(item);
    setFormData({
      employeeRate: item.employeeRate.toString(),
      employerRate: item.employerRate.toString(),
      ceiling: item.ceiling?.toString() || "",
      effectiveDate: item.effectiveDate,
      description: item.description,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta configuração?")) {
      setConfigs((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      employeeRate: "",
      employerRate: "",
      ceiling: "",
      effectiveDate: "",
      description: "",
    });
    setErrors({});
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return "Sem limite";
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
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
            Segurança Social
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configuração das taxas de Segurança Social
          </p>
        </div>
        <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>
          + Nova Configuração
        </Button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Taxa Funcionário</TableCell>
              <TableCell isHeader>Taxa Empresa</TableCell>
              <TableCell isHeader>Teto Máximo</TableCell>
              <TableCell isHeader>Vigência</TableCell>
              <TableCell isHeader>Descrição</TableCell>
              <TableCell isHeader>Ações</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {configs.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-3 font-medium text-blue-600">
                  {item.employeeRate}%
                </TableCell>
                <TableCell className="py-3 font-medium text-orange-600">
                  {item.employerRate}%
                </TableCell>
                <TableCell className="py-3">
                  {formatCurrency(item.ceiling)}
                </TableCell>
                <TableCell className="py-3">
                  {formatDate(item.effectiveDate)}
                </TableCell>
                <TableCell className="py-3">{item.description}</TableCell>
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
              {editingItem ? "Editar Configuração" : "Nova Configuração"}
            </h3>
            <div className="space-y-4">
              <div>
                <Label required>Taxa do Funcionário (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.employeeRate}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeRate: e.target.value })
                  }
                  error={!!errors.employeeRate}
                />
              </div>
              <div>
                <Label required>Taxa da Empresa (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.employerRate}
                  onChange={(e) =>
                    setFormData({ ...formData, employerRate: e.target.value })
                  }
                  error={!!errors.employerRate}
                />
              </div>
              <div>
                <Label>Teto Máximo (AOA)</Label>
                <Input
                  type="number"
                  value={formData.ceiling}
                  onChange={(e) =>
                    setFormData({ ...formData, ceiling: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe em branco para sem teto
                </p>
              </div>
              <div>
                <Label required>Data de Vigência</Label>
                <Input
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) =>
                    setFormData({ ...formData, effectiveDate: e.target.value })
                  }
                  error={!!errors.effectiveDate}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Ex: Taxa padrão para 2024"
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
