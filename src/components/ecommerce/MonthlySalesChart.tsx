// src/components/ecommerce/MonthlySalesChart.tsx
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

// Dados mockados
const mockChartData = {
  series: [
    { name: "Admissões", data: [5, 8, 12, 7, 9, 11, 6, 10, 8, 12, 15, 9] },
    { name: "Desligamentos", data: [2, 3, 4, 2, 3, 5, 2, 4, 3, 2, 4, 3] },
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

export default function MonthlySalesChart() {
  const [chartData, setChartData] = useState({
    series: [{ name: "Admissões", data: [] as number[] }],
    categories: [] as string[],
    loading: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setChartData({
        series: mockChartData.series,
        categories: mockChartData.categories,
        loading: false,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const options: ApexOptions = {
    colors: ["oklch(0.627 0.194 149.214)", "oklch(0.577 0.245 27.325)"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Número de Funcionários",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    grid: {
      borderColor: "#E5E7EB",
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} funcionário(s)`,
      },
    },
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  if (chartData.loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Movimentação de Funcionários{" "}
            <small className="text-zinc-500">(Últimos 12 meses)</small>
          </h3>
          <div className="animate-pulse w-6 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const totalAdmissoes = chartData.series[0].data.reduce((a, b) => a + b, 0);
  const totalDesligamentos = chartData.series[1].data.reduce(
    (a, b) => a + b,
    0,
  );
  const saldoLiquido = totalAdmissoes - totalDesligamentos;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Movimentação de Funcionários{" "}
          <small className="text-zinc-500">(Últimos 12 meses)</small>
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Exportar Dados
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Atualizar Gráfico
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart
            options={options}
            series={chartData.series}
            type="bar"
            height={180}
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="font-medium text-green-600">Admissões:</span>{" "}
            {totalAdmissoes}
          </div>
          <div>
            <span className="font-medium text-red-600">Desligamentos:</span>{" "}
            {totalDesligamentos}
          </div>
          <div>
            <span className="font-medium text-blue-600">Saldo líquido:</span>{" "}
            <span
              className={saldoLiquido >= 0 ? "text-green-600" : "text-red-600"}
            >
              {saldoLiquido >= 0 ? "+" : ""}
              {saldoLiquido}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
