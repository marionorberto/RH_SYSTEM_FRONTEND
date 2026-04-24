// src/pages/Payroll/PayrollProcessing.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import PayrollSummary from "../../components/Payroll/PayrollSummary";
import PayrollFilters from "../../components/Payroll/PayrollFilters";
import EmployeePayrollTable from "../../components/Payroll/EmployeePayrollTable";
import PayrollModal from "../../components/Payroll/PayrollModal";
import ProcessHistory from "../../components/Payroll/ProcessHistory";

// Dados mockados
const mockEmployees = [
  {
    id: "1",
    name: "João Silva",
    function: "Desenvolvedor Sênior",
    department: "Tecnologia",
    baseSalary: 250000,
    benefits: {
      alimentacao: 50000,
      transporte: 45000,
      outros: 0,
    },
    discounts: {
      irt: 75000,
      ss: 7500,
      faltas: 0,
      outros: 0,
    },
    extraHours: 5,
    netSalary: 0,
    status: "processed",
  },
  {
    id: "2",
    name: "Maria Santos",
    function: "Analista de RH",
    department: "Recursos Humanos",
    baseSalary: 180000,
    benefits: {
      alimentacao: 50000,
      transporte: 45000,
      outros: 0,
    },
    discounts: {
      irt: 54000,
      ss: 5400,
      faltas: 15000,
      outros: 0,
    },
    extraHours: 3,
    netSalary: 0,
    status: "pending",
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    function: "Analista Financeiro",
    department: "Financeiro",
    baseSalary: 200000,
    benefits: {
      alimentacao: 50000,
      transporte: 45000,
      outros: 25000,
    },
    discounts: {
      irt: 60000,
      ss: 6000,
      faltas: 0,
      outros: 20000,
    },
    extraHours: 8,
    netSalary: 0,
    status: "processed",
  },
  {
    id: "4",
    name: "Ana Costa",
    function: "Coordenadora Comercial",
    department: "Comercial",
    baseSalary: 220000,
    benefits: {
      alimentacao: 50000,
      transporte: 45000,
      outros: 30000,
    },
    discounts: {
      irt: 66000,
      ss: 6600,
      faltas: 0,
      outros: 0,
    },
    extraHours: 2,
    netSalary: 0,
    status: "pending",
  },
  {
    id: "5",
    name: "Pedro Almeida",
    function: "CTO",
    department: "Tecnologia",
    baseSalary: 350000,
    benefits: {
      alimentacao: 50000,
      transporte: 45000,
      outros: 50000,
    },
    discounts: {
      irt: 105000,
      ss: 10500,
      faltas: 0,
      outros: 0,
    },
    extraHours: 0,
    netSalary: 0,
    status: "error",
  },
];

const mockProcessHistory = [
  {
    id: "1",
    reference: "FOLHA/2024/03",
    month: "Março",
    year: 2024,
    processedAt: "2024-03-31T18:00:00",
    processedBy: "Admin",
    totalEmployees: 5,
    totalGross: 1250000,
    totalDiscounts: 375000,
    totalNet: 875000,
    status: "completed",
  },
  {
    id: "2",
    reference: "FOLHA/2024/02",
    month: "Fevereiro",
    year: 2024,
    processedAt: "2024-02-29T18:00:00",
    processedBy: "Admin",
    totalEmployees: 5,
    totalGross: 1220000,
    totalDiscounts: 365000,
    totalNet: 855000,
    status: "completed",
  },
  {
    id: "3",
    reference: "FOLHA/2024/01",
    month: "Janeiro",
    year: 2024,
    processedAt: "2024-01-31T18:00:00",
    processedBy: "Admin",
    totalEmployees: 5,
    totalGross: 1200000,
    totalDiscounts: 360000,
    totalNet: 840000,
    status: "completed",
  },
];

export default function PayrollProcessing() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  const [processHistory, setProcessHistory] = useState(mockProcessHistory);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateNetSalaries();
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...employees];

    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.function.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((emp) => emp.department === departmentFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((emp) => emp.status === statusFilter);
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, departmentFilter, statusFilter, employees]);

  const calculateNetSalaries = () => {
    const updatedEmployees = employees.map((emp) => {
      const totalBenefits = Object.values(emp.benefits).reduce(
        (a, b) => a + b,
        0,
      );
      const totalDiscounts = Object.values(emp.discounts).reduce(
        (a, b) => a + b,
        0,
      );
      const extraHoursValue = emp.extraHours * (emp.baseSalary / 176) * 1.5;
      const grossSalary = emp.baseSalary + totalBenefits + extraHoursValue;
      const netSalary = grossSalary - totalDiscounts;

      return { ...emp, netSalary };
    });
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  };

  const processPayroll = () => {
    setIsProcessing(true);
    setProcessingStep(1);
    setProcessingProgress(0);

    // Simula o processamento em etapas
    setTimeout(() => {
      setProcessingStep(2);
      setProcessingProgress(33);

      setTimeout(() => {
        setProcessingStep(3);
        setProcessingProgress(66);

        setTimeout(() => {
          setProcessingStep(4);
          setProcessingProgress(100);

          setTimeout(() => {
            const newHistory = {
              id: (processHistory.length + 1).toString(),
              reference: `FOLHA/${selectedYear}/${selectedMonth.toString().padStart(2, "0")}`,
              month: getMonthName(selectedMonth),
              year: selectedYear,
              processedAt: new Date().toISOString(),
              processedBy: "Admin",
              totalEmployees: employees.length,
              totalGross: employees.reduce((sum, emp) => {
                const benefits = Object.values(emp.benefits).reduce(
                  (a, b) => a + b,
                  0,
                );
                const extraHoursValue =
                  emp.extraHours * (emp.baseSalary / 176) * 1.5;
                return sum + emp.baseSalary + benefits + extraHoursValue;
              }, 0),
              totalDiscounts: employees.reduce((sum, emp) => {
                return (
                  sum + Object.values(emp.discounts).reduce((a, b) => a + b, 0)
                );
              }, 0),
              totalNet: employees.reduce((sum, emp) => sum + emp.netSalary, 0),
              status: "completed",
            };

            setProcessHistory([newHistory, ...processHistory]);
            setEmployees(
              employees.map((emp) => ({ ...emp, status: "processed" })),
            );
            setIsProcessing(false);
            setShowProcessModal(false);
            setProcessingStep(1);
            setProcessingProgress(0);
          }, 1500);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const getMonthName = (month: number) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[month - 1];
  };

  const totalGross = filteredEmployees.reduce((sum, emp) => {
    const benefits = Object.values(emp.benefits).reduce((a, b) => a + b, 0);
    const extraHoursValue = emp.extraHours * (emp.baseSalary / 176) * 1.5;
    return sum + emp.baseSalary + benefits + extraHoursValue;
  }, 0);

  const totalDiscounts = filteredEmployees.reduce((sum, emp) => {
    return sum + Object.values(emp.discounts).reduce((a, b) => a + b, 0);
  }, 0);

  const totalNet = filteredEmployees.reduce(
    (sum, emp) => sum + emp.netSalary,
    0,
  );

  const departments = [...new Set(employees.map((emp) => emp.department))];

  const getStatusCounts = () => {
    return {
      total: employees.length,
      processed: employees.filter((e) => e.status === "processed").length,
      pending: employees.filter((e) => e.status === "pending").length,
      error: employees.filter((e) => e.status === "error").length,
    };
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Processamento Salarial | Sistema RH" />
        <PageBreadcrumb pageTitle="Processamento Salarial" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando dados do processamento...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Processamento Salarial | Sistema de Gestão de RH"
        description="Processamento da folha de pagamento"
      />
      <PageBreadcrumb pageTitle="Processamento Salarial" />

      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Processamento Salarial
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Processamento da folha de pagamento -{" "}
              {getMonthName(selectedMonth)}/{selectedYear}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              size="md"
              variant="outline"
              onClick={() => setShowHistoryModal(true)}
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Histórico
            </Button>
            <Button
              size="md"
              variant="primary"
              onClick={() => setShowProcessModal(true)}
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Processar Folha
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <PayrollSummary
          totalGross={totalGross}
          totalDiscounts={totalDiscounts}
          totalNet={totalNet}
          employeeCount={filteredEmployees.length}
          statusCounts={getStatusCounts()}
          formatCurrency={(value) =>
            new Intl.NumberFormat("pt-AO", {
              style: "currency",
              currency: "AOA",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value)
          }
        />

        {/* Filtros */}
        <PayrollFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          departments={departments}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          getMonthName={getMonthName}
        />

        {/* Tabela de Funcionários */}
        <EmployeePayrollTable
          employees={filteredEmployees}
          formatCurrency={(value) =>
            new Intl.NumberFormat("pt-AO", {
              style: "currency",
              currency: "AOA",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value)
          }
        />

        {/* Modal de Processamento */}
        <PayrollModal
          isOpen={showProcessModal}
          onClose={() => !isProcessing && setShowProcessModal(false)}
          onConfirm={processPayroll}
          isProcessing={isProcessing}
          processingStep={processingStep}
          processingProgress={processingProgress}
          employeeCount={employees.length}
          totalGross={totalGross}
          totalDiscounts={totalDiscounts}
          totalNet={totalNet}
          month={getMonthName(selectedMonth)}
          year={selectedYear}
          formatCurrency={(value) =>
            new Intl.NumberFormat("pt-AO", {
              style: "currency",
              currency: "AOA",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value)
          }
        />

        {/* Modal de Histórico */}
        {showHistoryModal && (
          <ProcessHistory
            history={processHistory}
            onClose={() => setShowHistoryModal(false)}
            formatCurrency={(value) =>
              new Intl.NumberFormat("pt-AO", {
                style: "currency",
                currency: "AOA",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value)
            }
            formatDate={(date) =>
              new Date(date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
        )}
      </div>
    </>
  );
}
