// src/components/Effectiveness/AttendanceChart.tsx
import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Employee {
  id: string;
  name: string;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  extraHours: number;
}

interface AttendanceChartProps {
  employees: Employee[];
  totalPresentDays: number;
  totalAbsentDays: number;
}

export default function AttendanceChart({
  employees,
  totalPresentDays,
  totalAbsentDays,
}: AttendanceChartProps) {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");

  // Dados para gráfico de pizza (visão geral)
  const pieSeries = [totalPresentDays, totalAbsentDays];
  const pieOptions: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Outfit, sans-serif",
      height: 300,
    },
    labels: ["Dias Presentes", "Faltas"],
    colors: ["#10B981", "#EF4444"],
    legend: {
      position: "bottom",
      fontSize: "14px",
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
          return `${val} dias`;
        },
      },
    },
  };

  // Dados para gráfico de barras (por funcionário)
  const barSeries = [
    { name: "Dias Presentes", data: employees.map((emp) => emp.presentDays) },
    { name: "Faltas", data: employees.map((emp) => emp.absentDays) },
    { name: "Atrasos", data: employees.map((emp) => emp.lateDays) },
  ];

  const barOptions: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    colors: ["#10B981", "#EF4444", "#F59E0B"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: employees.map((emp) => emp.name.split(" ")[0]),
      title: {
        text: "Funcionários",
      },
    },
    yaxis: {
      title: {
        text: "Dias",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} dias`;
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Análise de Presenças e Faltas
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Visão geral da efectividade dos funcionários
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
            Visão Geral
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              chartType === "bar"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            Por Funcionário
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

      {chartType === "bar" && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>
            * Gráfico mostra a quantidade de dias presentes, faltas e atrasos
            por funcionário
          </p>
        </div>
      )}
    </div>
  );
}
