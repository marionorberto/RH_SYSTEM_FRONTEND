// src/pages/SalarySimulator/SalarySimulator.tsx (corrigido)
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import SalaryInputForm from "../../components/SalarySimulator/SalaryInputForm";
import SalaryResultCard from "../../components/SalarySimulator/SalaryResultCard";
import SalaryBreakdownChart from "../../components/SalarySimulator/SalaryBreakdownChart";
import SalaryComparison from "../../components/SalarySimulator/SalaryComparison";
import SalaryHistoryList from "../../components/SalarySimulator/SalaryHistoryList";

// Dados mockados para simulações anteriores
const mockSimulationHistory = [
  {
    id: "1",
    date: "2024-03-15T10:30:00Z",
    baseSalary: 250000,
    benefits: { alimentacao: 50000, transporte: 45000, outros: 0 },
    discounts: { irt: 75000, ss: 7500, faltas: 0, outros: 0 },
    extraHours: 5,
    netSalary: 262500,
  },
  {
    id: "2",
    date: "2024-02-10T14:20:00Z",
    baseSalary: 250000,
    benefits: { alimentacao: 50000, transporte: 45000, outros: 0 },
    discounts: { irt: 75000, ss: 7500, faltas: 0, outros: 0 },
    extraHours: 3,
    netSalary: 259500,
  },
  {
    id: "3",
    date: "2024-01-05T09:15:00Z",
    baseSalary: 240000,
    benefits: { alimentacao: 50000, transporte: 45000, outros: 0 },
    discounts: { irt: 72000, ss: 7200, faltas: 0, outros: 0 },
    extraHours: 8,
    netSalary: 252800,
  },
];

// Tabela IRT 2024 (progressiva)
const irtTable = [
  { min: 0, max: 100000, rate: 0, fixed: 0 },
  { min: 100001, max: 200000, rate: 10, fixed: 0 },
  { min: 200001, max: 350000, rate: 15, fixed: 10000 },
  { min: 350001, max: 500000, rate: 25, fixed: 45000 },
  { min: 500001, max: Infinity, rate: 35, fixed: 95000 },
];

// Configuração Segurança Social
const socialSecurityConfig = {
  employeeRate: 3,
  employerRate: 8,
  ceiling: 500000,
};

export default function SalarySimulator() {
  const [loading, setLoading] = useState(true);
  const [simulationHistory, setSimulationHistory] = useState(
    mockSimulationHistory,
  );
  const [currentSimulation, setCurrentSimulation] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Calcular IRT
  const calculateIRT = (taxableIncome: number) => {
    const bracket = irtTable.find((b) => taxableIncome <= b.max);
    if (!bracket) return { amount: 0, rate: 0 };

    let amount = (taxableIncome * bracket.rate) / 100 - bracket.fixed;
    amount = Math.max(0, amount);
    return { amount, rate: bracket.rate };
  };

  // Calcular Segurança Social
  const calculateSocialSecurity = (baseSalary: number) => {
    const taxableBase = Math.min(baseSalary, socialSecurityConfig.ceiling);
    const amount = (taxableBase * socialSecurityConfig.employeeRate) / 100;
    return { amount, rate: socialSecurityConfig.employeeRate };
  };

  // Calcular horas extras
  const calculateExtraHours = (baseSalary: number, extraHours: number) => {
    const hourlyRate = baseSalary / 176; // 22 dias * 8 horas
    const value = extraHours * hourlyRate * 1.5; // 50% adicional
    return { value, hourlyRate };
  };

  // Processar simulação
  const processSimulation = (formData: any) => {
    const baseSalary = parseFloat(formData.baseSalary);
    const benefits = {
      alimentacao: parseFloat(formData.benefitAlimentacao) || 0,
      transporte: parseFloat(formData.benefitTransporte) || 0,
      outros: parseFloat(formData.benefitOutros) || 0,
    };
    const totalBenefits = Object.values(benefits).reduce((a, b) => a + b, 0);

    const extraHours = parseFloat(formData.extraHours) || 0;
    const extraHoursCalculated = calculateExtraHours(baseSalary, extraHours);

    const otherDiscounts = {
      faltas: parseFloat(formData.discountFaltas) || 0,
      outros: parseFloat(formData.discountOutros) || 0,
    };

    // Calcular base tributável (salário base + benefícios + horas extras)
    const taxableBase = baseSalary + totalBenefits + extraHoursCalculated.value;

    // Calcular IRT e SS
    const irt = calculateIRT(taxableBase);
    const socialSecurity = calculateSocialSecurity(baseSalary);

    const totalDiscounts = {
      irt: irt.amount,
      ss: socialSecurity.amount,
      faltas: otherDiscounts.faltas,
      outros: otherDiscounts.outros,
    };

    const totalDiscountsAmount = Object.values(totalDiscounts).reduce(
      (a, b) => a + b,
      0,
    );
    const netSalary = taxableBase - totalDiscountsAmount;

    const simulation = {
      baseSalary,
      benefits,
      totalBenefits,
      extraHours: extraHoursCalculated.value,
      extraHoursQuantity: extraHours,
      hourlyRate: extraHoursCalculated.hourlyRate,
      irt: { amount: irt.amount, rate: irt.rate },
      socialSecurity: {
        amount: socialSecurity.amount,
        rate: socialSecurity.rate,
      },
      otherDiscounts,
      totalDiscounts,
      totalDiscountsAmount,
      grossSalary: taxableBase,
      netSalary,
      date: new Date().toISOString(),
    };

    setCurrentSimulation(simulation);

    // Salvar no histórico - CORRIGIDO: benefits e discounts como objetos
    const historyEntry = {
      id: (simulationHistory.length + 1).toString(),
      date: new Date().toISOString(),
      baseSalary,
      benefits: benefits, // Objeto com benefícios detalhados
      discounts: totalDiscounts, // Objeto com descontos detalhados
      extraHours,
      netSalary,
    };
    setSimulationHistory([historyEntry, ...simulationHistory]);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Simulador de Salários | Sistema RH" />
        <PageBreadcrumb pageTitle="Simulador de Salários" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando simulador...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Simulador de Salários | Sistema de Gestão de RH"
        description="Simule seu salário líquido com descontos e benefícios"
      />
      <PageBreadcrumb pageTitle="Simulador de Salários" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Formulário de Entrada */}
        <div className="lg:col-span-5">
          <SalaryInputForm
            onSimulate={processSimulation}
            formatCurrency={formatCurrency}
          />
        </div>

        {/* Resultados da Simulação */}
        <div className="lg:col-span-7 space-y-6">
          {currentSimulation ? (
            <>
              <SalaryResultCard
                simulation={currentSimulation}
                formatCurrency={formatCurrency}
              />
              <SalaryBreakdownChart
                simulation={currentSimulation}
                formatCurrency={formatCurrency}
              />
              <SalaryComparison
                simulation={currentSimulation}
                history={simulationHistory}
                formatCurrency={formatCurrency}
                onToggleComparison={() => setShowComparison(!showComparison)}
                showComparison={showComparison}
              />
            </>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03] text-center">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">
                Simulador de Salário
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Preencha o formulário ao lado com seus dados e clique em
                "Simular" para calcular seu salário líquido.
              </p>
              <div className="mt-4 flex justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>IRT (10-35%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Segurança Social (3%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Benefícios</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Histórico de Simulações */}
      <div className="mt-8">
        <SalaryHistoryList
          history={simulationHistory}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </div>
    </>
  );
}
