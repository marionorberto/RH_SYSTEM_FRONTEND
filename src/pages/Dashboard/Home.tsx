// src/pages/Home.tsx
import { useState, useEffect } from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import RecentFeedbacks from "../../components/ecommerce/RecentFeedbacks";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

// Dados mockados para o dashboard
const mockStats = {
  totalFuncionarios: 156,
  totalDepartamentos: 8,
  totalCargos: 24,
  taxaOcupacao: 78.5,
  crescimentoFuncionarios: 12.5,
  crescimentoDepartamentos: 0,
};

const mockPayrollStats = {
  totalFolhaMensal: 425000,
  mediaSalarial: 2724.36,
  totalDescontos: 87500,
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [payrollStats, setPayrollStats] = useState(mockPayrollStats);

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Carregando dashboard RH...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Dashboard RH | Sistema de Gestão de Recursos Humanos"
        description="Dashboard completo para monitoramento de funcionários, folha de pagamento e métricas da empresa"
      />

      {/* Header do Dashboard RH */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Dashboard RH
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Bem-vindo ao painel de controle de Recursos Humanos. Aqui você tem uma
          visão completa da gestão de pessoas e folha de pagamento.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm">
            {stats.totalFuncionarios} funcionários ativos
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">
            {stats.totalDepartamentos} departamentos
          </div>
          <div className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm">
            {stats.totalCargos} cargos
          </div>
          <div className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-sm">
            Taxa de ocupação: {stats.taxaOcupacao.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Primeira Linha: Métricas e Gráfico Mensal */}
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        {/* Segunda Linha: Distribuição por Departamento */}
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        {/* Terceira Linha: Evolução do Quadro */}
        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-6 xl:col-span-6">
          <RecentFeedbacks />
          <div className="mt-5"></div>
          <DemographicCard />
        </div>

        {/* Quinta Linha: Movimentações Recentes */}
        <div className="col-span-6">
          <RecentOrders />
        </div>
      </div>

      {/* Footer do Dashboard RH */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sistema RH v1.0.0
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Dados atualizados em tempo real
            </p>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>Última atualização: {new Date().toLocaleTimeString("pt-BR")}</p>
            <p className="mt-1">
              Status:{" "}
              <span className="text-green-600 dark:text-green-400 font-medium">
                Online
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
