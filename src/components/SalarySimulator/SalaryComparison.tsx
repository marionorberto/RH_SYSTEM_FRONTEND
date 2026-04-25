// src/components/SalarySimulator/SalaryComparison.tsx
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Button from "../ui/button/Button";

interface SalaryComparisonProps {
  simulation: any;
  history: any[];
  formatCurrency: (value: number) => string;
  onToggleComparison: () => void;
  showComparison: boolean;
}

export default function SalaryComparison({
  simulation,
  history,
  formatCurrency,
  onToggleComparison,
  showComparison,
}: SalaryComparisonProps) {
  if (!showComparison) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Comparação com Simulações Anteriores
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Compare esta simulação com simulações anteriores
            </p>
          </div>
          <Button variant="outline" onClick={onToggleComparison}>
            Ver Comparação
          </Button>
        </div>
      </div>
    );
  }

  // Preparar dados para o gráfico comparativo
  const lastThreeSimulations = history.slice(0, 3).reverse();
  const chartData = {
    categories: lastThreeSimulations.map((s) => formatDate(s.date)),
    series: [
      {
        name: "Salário Base",
        data: lastThreeSimulations.map((s) => s.baseSalary),
      },
      { name: "Benefícios", data: lastThreeSimulations.map((s) => s.benefits) },
      { name: "Descontos", data: lastThreeSimulations.map((s) => s.discounts) },
      {
        name: "Salário Líquido",
        data: lastThreeSimulations.map((s) => s.netSalary),
      },
    ],
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      height: 350,
      toolbar: { show: true },
      stacked: false,
    },
    colors: ["#3B82F6", "#10B981", "#EF4444", "#8B5CF6"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: chartData.categories,
      title: { text: "Data da Simulação" },
    },
    yaxis: {
      title: { text: "Valor (AOA)" },
      labels: {
        formatter: function (val) {
          return formatCurrency(val);
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return formatCurrency(val);
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Comparação com Simulações Anteriores
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Evolução das suas simulações de salário
          </p>
        </div>
        <Button variant="outline" onClick={onToggleComparison}>
          Ocultar Comparação
        </Button>
      </div>

      <div className="h-[350px]">
        <Chart
          options={chartOptions}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-500">Diferença Salário Base</p>
          <p className="text-sm font-semibold text-blue-600">
            {formatCurrency(
              simulation.baseSalary -
                (lastThreeSimulations[lastThreeSimulations.length - 1]
                  ?.baseSalary || 0),
            )}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-500">Diferença Salário Líquido</p>
          <p className="text-sm font-semibold text-purple-600">
            {formatCurrency(
              simulation.netSalary -
                (lastThreeSimulations[lastThreeSimulations.length - 1]
                  ?.netSalary || 0),
            )}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-500">Maior Salário Líquido</p>
          <p className="text-sm font-semibold text-green-600">
            {formatCurrency(Math.max(...history.map((s) => s.netSalary)))}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-500">Média Salário Líquido</p>
          <p className="text-sm font-semibold text-orange-600">
            {formatCurrency(
              history.reduce((sum, s) => sum + s.netSalary, 0) / history.length,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
