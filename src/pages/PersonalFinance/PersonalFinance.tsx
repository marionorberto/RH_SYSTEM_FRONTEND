// src/pages/PersonalFinance/PersonalFinance.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ExpenseRequestsList from "../../components/PersonalFinance/ExpenseRequestsList";
import ExpenseRequestModal from "../../components/PersonalFinance/ExpenseRequestModal";
import SalaryReceiptsList from "../../components/PersonalFinance/SalaryReceiptsList";
import DiscountsList from "../../components/PersonalFinance/DiscountsList";

// Dados mockados - Pedidos de Despesa
const mockExpenseRequests = [
  {
    id: "1",
    expenseType: "SAUDE",
    description: "Consulta médica e exames",
    amount: 35000,
    expenseDate: "2024-03-15",
    receiptUrl: null,
    status: "APROVADO",
    rejectionReason: null,
    createdAt: "2024-03-10T10:00:00Z",
    approvalDate: "2024-03-12T14:30:00Z",
  },
  {
    id: "2",
    expenseType: "TRANSPORTE",
    description: "Reembolso de deslocamento - reunião com cliente",
    amount: 12500,
    expenseDate: "2024-03-20",
    receiptUrl: null,
    status: "PENDENTE",
    rejectionReason: null,
    createdAt: "2024-03-21T09:00:00Z",
    approvalDate: null,
  },
  {
    id: "3",
    expenseType: "EDUCACAO",
    description: "Curso de desenvolvimento profissional",
    amount: 75000,
    expenseDate: "2024-02-10",
    receiptUrl: null,
    status: "PAGO",
    rejectionReason: null,
    createdAt: "2024-02-05T11:00:00Z",
    approvalDate: "2024-02-08T10:00:00Z",
  },
  {
    id: "4",
    expenseType: "OUTROS",
    description: "Material de escritório",
    amount: 8500,
    expenseDate: "2024-03-05",
    receiptUrl: null,
    status: "REJEITADO",
    rejectionReason:
      "Comprovante ilegível. Enviar novamente com melhor qualidade.",
    createdAt: "2024-03-01T14:00:00Z",
    approvalDate: "2024-03-03T16:00:00Z",
  },
];

// Dados mockados - Recibos de Salário
const mockSalaryReceipts = [
  {
    id: "1",
    reference: "FOLHA/2024/03",
    month: "Março",
    year: 2024,
    grossSalary: 250000,
    benefits: 95000,
    discounts: 82500,
    netSalary: 262500,
    paymentDate: "2024-03-31",
    status: "PAID",
    receiptUrl: "/receipts/2024-03.pdf",
  },
  {
    id: "2",
    reference: "FOLHA/2024/02",
    month: "Fevereiro",
    year: 2024,
    grossSalary: 250000,
    benefits: 95000,
    discounts: 81500,
    netSalary: 263500,
    paymentDate: "2024-02-29",
    status: "PAID",
    receiptUrl: "/receipts/2024-02.pdf",
  },
  {
    id: "3",
    reference: "FOLHA/2024/01",
    month: "Janeiro",
    year: 2024,
    grossSalary: 250000,
    benefits: 95000,
    discounts: 81500,
    netSalary: 263500,
    paymentDate: "2024-01-31",
    status: "PAID",
    receiptUrl: "/receipts/2024-01.pdf",
  },
];

// Dados mockados - Descontos aplicados
const mockDiscounts = [
  {
    id: "1",
    discountType: "IRT - Imposto de Rendimento de Trabalho",
    value: 75000,
    percentage: 30,
    month: "Março",
    year: 2024,
    description: "Desconto referente ao IRT do mês",
    appliedAt: "2024-03-31",
  },
  {
    id: "2",
    discountType: "SS - Segurança Social",
    value: 7500,
    percentage: 3,
    month: "Março",
    year: 2024,
    description: "Contribuição para Segurança Social",
    appliedAt: "2024-03-31",
  },
  {
    id: "3",
    discountType: "Falta",
    value: 0,
    percentage: 0,
    month: "Março",
    year: 2024,
    description: "Sem faltas no período",
    appliedAt: "2024-03-31",
  },
  {
    id: "4",
    discountType: "IRT - Imposto de Rendimento de Trabalho",
    value: 72000,
    percentage: 28.8,
    month: "Fevereiro",
    year: 2024,
    description: "Desconto referente ao IRT do mês",
    appliedAt: "2024-02-29",
  },
];

const expenseTypeOptions = [
  { value: "TRANSPORTE", label: "Transporte", icon: "🚗" },
  { value: "ALIMENTACAO", label: "Alimentação", icon: "🍽️" },
  { value: "SAUDE", label: "Saúde", icon: "🏥" },
  { value: "EDUCACAO", label: "Educação", icon: "📚" },
  { value: "HABITACAO", label: "Habitação", icon: "🏠" },
  { value: "OUTROS", label: "Outros", icon: "📦" },
];

export default function PersonalFinance() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("expenses");
  const [expenseRequests, setExpenseRequests] = useState(mockExpenseRequests);
  const [salaryReceipts, setSalaryReceipts] = useState(mockSalaryReceipts);
  const [discounts, setDiscounts] = useState(mockDiscounts);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddExpense = (expenseData: any) => {
    const newExpense = {
      id: (expenseRequests.length + 1).toString(),
      ...expenseData,
      status: "PENDENTE",
      rejectionReason: null,
      createdAt: new Date().toISOString(),
      approvalDate: null,
    };
    setExpenseRequests([newExpense, ...expenseRequests]);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const tabs = [
    { id: "expenses", name: "Pedidos de Despesa", icon: "📋" },
    { id: "receipts", name: "Recibos de Salário", icon: "💰" },
    { id: "discounts", name: "Descontos Aplicados", icon: "📉" },
  ];

  // Estatísticas
  const totalApproved = expenseRequests
    .filter((e) => e.status === "APROVADO" || e.status === "PAGO")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalPending = expenseRequests
    .filter((e) => e.status === "PENDENTE")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalRejected = expenseRequests
    .filter((e) => e.status === "REJEITADO")
    .reduce((sum, e) => sum + e.amount, 0);

  if (loading) {
    return (
      <>
        <PageMeta title="Finanças Pessoais | Sistema RH" />
        <PageBreadcrumb pageTitle="Finanças Pessoais" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando dados...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Finanças Pessoais | Sistema de Gestão de RH"
        description="Gerencie seus pedidos de despesa, recibos e descontos"
      />
      <PageBreadcrumb pageTitle="Finanças Pessoais" />

      <div className="space-y-6">
        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Total Aprovado</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalApproved)}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Pendente</p>
            <p className="text-2xl font-bold text-yellow-600">
              {formatCurrency(totalPending)}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Rejeitado</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalRejected)}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500">Último Salário</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(salaryReceipts[0]?.netSalary || 0)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="min-h-[500px]">
          {/* Tab: Pedidos de Despesa */}
          {activeTab === "expenses" && (
            <>
              <div className="flex justify-end mb-4">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setShowExpenseModal(true)}
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
                  Novo Pedido de Despesa
                </Button>
              </div>
              <ExpenseRequestsList
                expenses={expenseRequests}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            </>
          )}

          {/* Tab: Recibos de Salário */}
          {activeTab === "receipts" && (
            <SalaryReceiptsList
              receipts={salaryReceipts}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          )}

          {/* Tab: Descontos Aplicados */}
          {activeTab === "discounts" && (
            <DiscountsList
              discounts={discounts}
              formatCurrency={formatCurrency}
            />
          )}
        </div>

        {/* Modal de Novo Pedido */}
        <ExpenseRequestModal
          isOpen={showExpenseModal}
          onClose={() => setShowExpenseModal(false)}
          onConfirm={handleAddExpense}
          expenseTypeOptions={expenseTypeOptions}
          formatCurrency={formatCurrency}
        />
      </div>
    </>
  );
}
