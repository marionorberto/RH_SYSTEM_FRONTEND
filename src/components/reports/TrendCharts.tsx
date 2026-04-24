// src/components/reports/TrendCharts.tsx
import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TrendData } from "../../services/reports-service";
import {
  CalendarIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface TrendChartsProps {
  trendData: TrendData[];
  loading: boolean;
}

export default function TrendCharts({ trendData, loading }: TrendChartsProps) {
  const [activeChart, setActiveChart] = useState<
    "analyses" | "users" | "requests" | "cost"
  >("analyses");

  if (loading || trendData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const chartOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: trendData.map((d) => {
        const date = new Date(d.date);
        return date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
        });
      }),
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
        formatter: function (val) {
          if (activeChart === "cost") return `$${val.toFixed(2)}`;
          return val.toLocaleString();
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#6B7280",
      },
    },
    tooltip: {
      x: {
        formatter: function (val) {
          return trendData[val]?.date || "";
        },
      },
      y: {
        formatter: function (val) {
          if (activeChart === "cost") return `$${val.toFixed(2)}`;
          return val.toLocaleString();
        },
      },
    },
  };

  const getChartData = () => {
    switch (activeChart) {
      case "analyses":
        return [
          {
            name: "Análises",
            data: trendData.map((d) => d.analyses),
          },
        ];
      case "users":
        return [
          {
            name: "Usuários Ativos",
            data: trendData.map((d) => d.users),
          },
        ];
      case "requests":
        return [
          {
            name: "Requisições OpenAI",
            data: trendData.map((d) => d.requests),
          },
        ];
      case "cost":
        return [
          {
            name: "Custo OpenAI",
            data: trendData.map((d) => d.cost),
          },
        ];
      default:
        return [
          {
            name: "Análises",
            data: trendData.map((d) => d.analyses),
          },
        ];
    }
  };

  const chartButtons = [
    {
      id: "analyses",
      label: "Análises",
      icon: <ChartBarIcon className="h-4 w-4" />,
    },
    { id: "users", label: "Usuários", icon: <UsersIcon className="h-4 w-4" /> },
    {
      id: "requests",
      label: "Requisições",
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      id: "cost",
      label: "Custos",
      icon: <CurrencyDollarIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tendências e Métricas
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Últimos {trendData.length} dias
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {chartButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveChart(button.id as any)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                activeChart === button.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {button.icon}
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <Chart
          options={chartOptions}
          series={getChartData()}
          type="area"
          height="100%"
        />
      </div>
    </div>
  );
}
