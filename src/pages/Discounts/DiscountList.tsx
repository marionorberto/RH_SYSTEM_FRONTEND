// src/pages/Discounts/DiscountList.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import DiscountTable from "../../components/Discounts/DiscountTable";
import DiscountFilters from "../../components/Discounts/DiscountFilters";

// Dados mockados baseados na entidade Discount
const mockDiscounts = [
  {
    id: "1",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    discountTypeRel: {
      id: "1",
      typeName: "IRT",
      code: "IRT",
    },
    value: 75000,
    unities: 1,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Valor",
    discountType: "IRT - Imposto de Rendimento de Trabalho",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    discountTypeRel: {
      id: "2",
      typeName: "Segurança Social",
      code: "SS",
    },
    value: 3,
    unities: 1,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Percentual",
    discountType: "SS - Segurança Social",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    employee: {
      id: "2",
      employee_name: "Maria Santos",
    },
    discountTypeRel: {
      id: "1",
      typeName: "IRT",
      code: "IRT",
    },
    value: 54000,
    unities: 1,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Valor",
    discountType: "IRT - Imposto de Rendimento de Trabalho",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    employee: {
      id: "3",
      employee_name: "Carlos Oliveira",
    },
    discountTypeRel: {
      id: "3",
      typeName: "Falta",
      code: "FALTA",
    },
    value: 15000,
    unities: 1,
    days: 1,
    processingType: "Mensal",
    tipoCalculo: "Valor",
    discountType: "Falta",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    employee: {
      id: "4",
      employee_name: "Ana Costa",
    },
    discountTypeRel: {
      id: "4",
      typeName: "Empréstimo",
      code: "EMPRESTIMO",
    },
    value: 25000,
    unities: 1,
    days: 22,
    processingType: "Mensal",
    tipoCalculo: "Valor",
    discountType: "Outros Desconto",
    createdAt: new Date().toISOString(),
  },
];

export default function DiscountList() {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState(mockDiscounts);
  const [filteredDiscounts, setFilteredDiscounts] = useState(mockDiscounts);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [discountTypeFilter, setDiscountTypeFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...discounts];

    if (searchTerm) {
      filtered = filtered.filter(
        (disc) =>
          disc.employee.employee_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          disc.discountType.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (employeeFilter !== "all") {
      filtered = filtered.filter((disc) => disc.employee.id === employeeFilter);
    }

    if (discountTypeFilter !== "all") {
      filtered = filtered.filter(
        (disc) => disc.discountType === discountTypeFilter,
      );
    }

    setFilteredDiscounts(filtered);
  }, [searchTerm, employeeFilter, discountTypeFilter, discounts]);

  const handleEdit = (id: string) => {
    navigate(`/discounts/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este desconto?")) {
      setDiscounts((prev) => prev.filter((disc) => disc.id !== id));
    }
  };

  const handleCreate = () => {
    navigate("/discounts/create");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Listas únicas para filtros
  const uniqueEmployees = Array.from(
    new Map(
      discounts.map((disc) => [disc.employee.id, disc.employee]),
    ).values(),
  );

  const uniqueDiscountTypes = Array.from(
    new Set(discounts.map((disc) => disc.discountType)),
  );

  if (loading) {
    return (
      <>
        <PageMeta title="Listar Descontos | Sistema RH" />
        <PageBreadcrumb pageTitle="Descontos" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando descontos...
            </p>
          </div>
        </div>
      </>
    );
  }

  const totalDiscountsValue = discounts.reduce((sum, disc) => {
    if (disc.tipoCalculo === "Percentual") {
      return sum;
    }
    return sum + disc.value * disc.unities;
  }, 0);

  return (
    <>
      <PageMeta
        title="Listar Descontos | Sistema de Gestão de RH"
        description="Gerencie os descontos dos funcionários"
      />
      <PageBreadcrumb pageTitle="Descontos" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Descontos
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gerencie descontos como IRT, Segurança Social, Faltas e outros
            </p>
          </div>
          <Button
            size="md"
            variant="primary"
            onClick={handleCreate}
            className="flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Novo Desconto
          </Button>
        </div>

        <DiscountFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          employeeFilter={employeeFilter}
          onEmployeeFilterChange={setEmployeeFilter}
          employees={uniqueEmployees}
          discountTypeFilter={discountTypeFilter}
          onDiscountTypeFilterChange={setDiscountTypeFilter}
          discountTypes={uniqueDiscountTypes}
        />

        <DiscountTable
          discounts={filteredDiscounts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          formatCurrency={formatCurrency}
        />

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total de Descontos
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {discounts.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Valor Total Mensal
              </p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                {formatCurrency(totalDiscountsValue)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Funcionários
              </p>
              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {uniqueEmployees.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Média por Funcionário
              </p>
              <p className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                {formatCurrency(totalDiscountsValue / uniqueEmployees.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
