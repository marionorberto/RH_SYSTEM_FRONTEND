// src/components/SalarySimulator/SalaryBreakdownChart.tsx
import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface SalaryBreakdownChartProps {
  simulation: any;
  formatCurrency: (value: number) => string;
}

export default function SalaryBreakdownChart({
  simulation,
  formatCurrency,
}: SalaryBreakdownChartProps) {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");

  // Dados para gráfico de pizza - Composição do Salário Bruto
  const pieSeries = [
    simulation.baseSalary,
    simulation.totalBenefits,
    simulation.extraHours,
  ];

  const pieOptions: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Outfit, sans-serif",
      height: 300,
    },
    labels: ["Salário Base", "Benefícios", "Horas Extras"],
    colors: ["#3B82F6", "#10B981", "#F59E0B"],
    legend: {
      position: "bottom",
      fontSize: "12px",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(1)}%`;
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return formatCurrency(val);
        },
      },
    },
  };

  // Dados para gráfico de barras - Composição dos Descontos
  const barSeries = [
    {
      name: "Descontos",
      data: [
        simulation.irt.amount,
        simulation.socialSecurity.amount,
        simulation.otherDiscounts.faltas,
        simulation.otherDiscounts.outros,
      ],
    },
  ];

  const barOptions: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      height: 300,
      toolbar: { show: false },
    },
    colors: ["#EF4444"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["IRT", "Segurança Social", "Faltas", "Outros"],
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
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Análise do Salário
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Composição do salário bruto e descontos aplicados
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("pie")}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              chartType === "pie"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            Composição Bruto
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              chartType === "bar"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            Descontos
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        {chartType === "pie" ? (
          <Chart
            options={pieOptions}
            series={pieSeries}
            type="pie"
            height={300}
          />
        ) : (
          <Chart
            options={barOptions}
            series={barSeries}
            type="bar"
            height={300}
          />
        )}
      </div>

      {chartType === "pie" && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="text-gray-500">Salário Base</p>
            <p className="font-semibold">
              {((simulation.baseSalary / simulation.grossSalary) * 100).toFixed(
                1,
              )}
              %
            </p>
          </div>
          <div>
            <p className="text-gray-500">Benefícios</p>
            <p className="font-semibold text-green-600">
              {(
                (simulation.totalBenefits / simulation.grossSalary) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
          <div>
            <p className="text-gray-500">Horas Extras</p>
            <p className="font-semibold text-orange-600">
              {((simulation.extraHours / simulation.grossSalary) * 100).toFixed(
                1,
              )}
              %
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
