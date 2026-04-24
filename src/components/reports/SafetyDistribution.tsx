// src/components/reports/SafetyDistribution.tsx
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { OverallStats } from "../../services/reports-service";

interface SafetyDistributionProps {
  stats: OverallStats;
  loading: boolean;
}

export default function SafetyDistribution({
  stats,
  loading,
}: SafetyDistributionProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const totalAnalyses =
    stats.greenAnalyses + stats.yellowAnalyses + stats.redAnalyses;

  const chartOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
    },
    colors: ["#10B981", "#F59E0B", "#EF4444"],
    labels: ["Seguras", "Moderadas", "Risco Alto"],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 600,
              formatter: function (val) {
                return `${val}%`;
              },
            },
            total: {
              show: true,
              label: "Total Análises",
              fontSize: "14px",
              fontWeight: 500,
              formatter: function () {
                return totalAnalyses.toLocaleString();
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(1)}%`;
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex }) {
          const counts = [
            stats.greenAnalyses,
            stats.yellowAnalyses,
            stats.redAnalyses,
          ];
          return `${counts[seriesIndex].toLocaleString()} análises (${val.toFixed(1)}%)`;
        },
      },
    },
  };

  const chartSeries = [
    (stats.greenAnalyses / totalAnalyses) * 100,
    (stats.yellowAnalyses / totalAnalyses) * 100,
    (stats.redAnalyses / totalAnalyses) * 100,
  ];

  const safetyCards = [
    {
      title: "Seguras",
      value: stats.greenAnalyses.toLocaleString(),
      percentage:
        ((stats.greenAnalyses / totalAnalyses) * 100).toFixed(1) + "%",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      color: "green",
      description: "Análises recomendadas e seguras",
    },
    {
      title: "Moderadas",
      value: stats.yellowAnalyses.toLocaleString(),
      percentage:
        ((stats.yellowAnalyses / totalAnalyses) * 100).toFixed(1) + "%",
      icon: <ExclamationTriangleIcon className="h-5 w-5" />,
      color: "yellow",
      description: "Requerem atenção moderada",
    },
    {
      title: "Risco Alto",
      value: stats.redAnalyses.toLocaleString(),
      percentage: ((stats.redAnalyses / totalAnalyses) * 100).toFixed(1) + "%",
      icon: <XCircleIcon className="h-5 w-5" />,
      color: "red",
      description: "Não recomendadas - alto risco",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
        Distribuição de Segurança
      </h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Gráfico */}
        <div className="lg:w-1/2">
          <div className="h-64">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height="100%"
            />
          </div>
        </div>

        {/* Cards de Detalhes */}
        <div className="lg:w-1/2 space-y-4">
          {safetyCards.map((card, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                card.color === "green"
                  ? "bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20"
                  : card.color === "yellow"
                    ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/20"
                    : "bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      card.color === "green"
                        ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                        : card.color === "yellow"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                    }`}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white/90">
                      {card.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                    {card.value}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      card.color === "green"
                        ? "text-green-600 dark:text-green-400"
                        : card.color === "yellow"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {card.percentage}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Taxa de Conformidade */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Taxa de Conformidade
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Análises seguras e moderadas
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.safetyComplianceRate.toFixed(1)}%
                </p>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                  <div
                    className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                    style={{
                      width: `${Math.min(stats.safetyComplianceRate, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
