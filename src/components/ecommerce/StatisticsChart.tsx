// src/components/ecommerce/StatisticsChart.tsx
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import flatpickr from "flatpickr";
import { CalenderIcon } from "../../icons";

// Dados mockados
const mockHeadcountData = {
  series: [
    {
      name: "Funcionários Ativos",
      data: [45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82],
    },
    { name: "Novas Contratações", data: [3, 5, 4, 3, 6, 4, 5, 3, 7, 4, 5, 6] },
  ],
  categories: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
};

export default function StatisticsChart() {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const [chartData, setChartData] = useState({
    series: [
      { name: "Funcionários Ativos", data: [] as number[] },
      { name: "Novas Contratações", data: [] as number[] },
    ],
    categories: [] as string[],
    loading: true,
  });

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setChartData({
        series: mockHeadcountData.series,
        categories: mockHeadcountData.categories,
        loading: false,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!datePickerRef.current) return;

    const today = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(today.getMonth() - 11);

    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M d",
      defaultDate: [twelveMonthsAgo, today],
      clickOpens: true,
      prevArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      nextArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      onChange: function (selectedDates) {
        if (selectedDates.length === 2) {
          console.log("Período selecionado:", selectedDates);
        }
      },
    });

    return () => {
      if (!Array.isArray(fp)) {
        fp.destroy();
      }
    };
  }, []);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      labels: {
        colors: "#6B7280",
      },
    },
    colors: ["oklch(0.546 0.245 262.881)", "oklch(0.627 0.194 149.214)"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
      y: {
        formatter: function (val) {
          return val.toLocaleString("pt-BR");
        },
        title: {
          formatter: function (seriesName) {
            return seriesName + ": ";
          },
        },
      },
    },
    xaxis: {
      type: "category",
      categories: chartData.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
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
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: function (val) {
          return Math.floor(val).toLocaleString("pt-BR");
        },
      },
      title: {
        text: "Quantidade de Funcionários",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    },
  };

  if (chartData.loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Evolução do Quadro de Funcionários
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Acompanhamento mensal do headcount
            </p>
          </div>
          <div className="animate-pulse w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-48 flex items-center justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const totalAtivos =
    chartData.series[0].data[chartData.series[0].data.length - 1] || 0;
  const totalContratacoes = chartData.series[1].data.reduce((a, b) => a + b, 0);
  const crescimentoAnual =
    chartData.series[0].data.length >= 2
      ? ((chartData.series[0].data[chartData.series[0].data.length - 1] -
          chartData.series[0].data[0]) /
          chartData.series[0].data[0]) *
        100
      : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-5 sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Evolução do Quadro de Funcionários
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Acompanhamento mensal do headcount
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalenderIcon className="size-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              ref={datePickerRef}
              type="text"
              placeholder="Selecione o período"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-64 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart
            options={options}
            series={chartData.series}
            type="area"
            height={310}
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="font-medium">Total de Funcionários (atual):</span>{" "}
            {totalAtivos}
          </div>
          <div>
            <span className="font-medium">Contratações no período:</span>{" "}
            {totalContratacoes}
          </div>
          <div>
            <span className="font-medium">Crescimento anual:</span>{" "}
            <span
              className={
                crescimentoAnual >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {crescimentoAnual >= 0 ? "+" : ""}
              {crescimentoAnual.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
