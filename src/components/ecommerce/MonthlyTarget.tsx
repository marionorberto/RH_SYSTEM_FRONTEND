// src/components/ecommerce/MonthlyTarget.tsx
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

// Dados mockados
const mockDistribution = [
  { name: "Tecnologia", total: 45, percentage: 35 },
  { name: "Comercial", total: 30, percentage: 23 },
  { name: "Operações", total: 25, percentage: 19 },
  { name: "Financeiro", total: 18, percentage: 14 },
  { name: "Recursos Humanos", total: 12, percentage: 9 },
];

export default function MonthlyTarget() {
  const [distribution, setDistribution] = useState(mockDistribution);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [chartType, setChartType] = useState<"donut" | "bar">("donut");

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const donutSeries = distribution.map((d) => d.total);
  const donutLabels = distribution.map((d) => d.name);

  const donutOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 280,
    },
    colors: ["#465FFF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    labels: donutLabels,
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 500,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 600,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 500,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce(
                  (a: number, b: number) => a + b,
                  0,
                );
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const percentage = (
          (opts.w.config.series[opts.seriesIndex] /
            opts.w.globals.seriesTotals.reduce(
              (a: number, b: number) => a + b,
              0,
            )) *
          100
        ).toFixed(1);
        return `${percentage}%`;
      },
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "12px",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} funcionários`;
        },
      },
    },
  };

  const barOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 280,
      toolbar: {
        show: false,
      },
    },
    colors: ["oklch(0.627 0.194 149.214)"],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        dataLabels: {
          position: "end",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString();
      },
      offsetX: 10,
    },
    xaxis: {
      categories: donutLabels,
      title: {
        text: "Número de Funcionários",
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} funcionários`;
        },
      },
    },
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function switchChartType(type: "donut" | "bar") {
    setChartType(type);
    closeDropdown();
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-48 flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const totalFuncionarios = distribution.reduce((sum, d) => sum + d.total, 0);
  const maiorDepartamento = distribution.reduce(
    (max, d) => (d.total > max.total ? d : max),
    distribution[0],
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-6 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Distribuição por Departamento
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Funcionários por departamento
            </p>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-48 p-2"
            >
              <DropdownItem
                onItemClick={() => switchChartType("donut")}
                className={`flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 ${chartType === "donut" ? "bg-gray-100 dark:bg-white/5" : ""}`}
              >
                Gráfico de Rosca
              </DropdownItem>
              <DropdownItem
                onItemClick={() => switchChartType("bar")}
                className={`flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 ${chartType === "bar" ? "bg-gray-100 dark:bg-white/5" : ""}`}
              >
                Gráfico de Barras
              </DropdownItem>
              <div className="my-1 border-t border-gray-200 dark:border-gray-700"></div>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Ver Detalhes
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Exportar Dados
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]">
            {chartType === "donut" ? (
              <Chart
                options={donutOptions}
                series={donutSeries}
                type="donut"
                height={280}
              />
            ) : (
              <Chart
                options={barOptions}
                series={[{ name: "Funcionários", data: donutSeries }]}
                type="bar"
                height={280}
              />
            )}
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Total de Funcionários
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {totalFuncionarios}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                Maior Departamento
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {maiorDepartamento.name}
                <span className="text-sm text-gray-500 ml-1">
                  ({maiorDepartamento.total})
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div className="flex-1 text-center">
          <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400">
            Média por Depto
          </p>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90">
            {(totalFuncionarios / distribution.length).toFixed(1)}
          </p>
        </div>
        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>
        <div className="flex-1 text-center">
          <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400">
            Departamentos
          </p>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90">
            {distribution.length}
          </p>
        </div>
        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>
        <div className="flex-1 text-center">
          <p className="mb-1 text-gray-500 text-theme-xs dark:text-gray-400">
            Taxa de Ocupação
          </p>
          <p className="text-base font-semibold text-green-600 dark:text-green-400">
            78%
          </p>
        </div>
      </div>
    </div>
  );
}
