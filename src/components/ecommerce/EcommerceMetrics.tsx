// src/components/ecommerce/EcommerceMetrics.tsx
import { useState, useEffect } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

// Dados mockados
const mockMetrics = {
  totalFuncionarios: 156,
  totalDepartamentos: 8,
  growthRateFuncionarios: 12.5,
  growthRateDepartamentos: 0,
};

export default function EcommerceMetrics() {
  const [stats, setStats] = useState({
    totalFuncionarios: 0,
    totalDepartamentos: 0,
    growthRateFuncionarios: 0,
    growthRateDepartamentos: 0,
    loading: true,
  });

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      setStats({
        totalFuncionarios: mockMetrics.totalFuncionarios,
        totalDepartamentos: mockMetrics.totalDepartamentos,
        growthRateFuncionarios: mockMetrics.growthRateFuncionarios,
        growthRateDepartamentos: mockMetrics.growthRateDepartamentos,
        loading: false,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Card de Funcionários */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total de Funcionários
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.loading ? "..." : stats.totalFuncionarios.toLocaleString()}
            </h4>
          </div>
          <Badge
            color={stats.growthRateFuncionarios >= 0 ? "success" : "error"}
          >
            {stats.growthRateFuncionarios >= 0 ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}
            {Math.abs(stats.growthRateFuncionarios).toFixed(1)}%
          </Badge>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Funcionários ativos na empresa
        </p>
      </div>

      {/* Card de Departamentos */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Departamentos
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.loading
                ? "..."
                : stats.totalDepartamentos.toLocaleString()}
            </h4>
          </div>
          <Badge
            color={stats.growthRateDepartamentos >= 0 ? "success" : "error"}
          >
            {stats.growthRateDepartamentos >= 0 ? (
              <ArrowUpIcon />
            ) : (
              <ArrowDownIcon />
            )}
            {Math.abs(stats.growthRateDepartamentos).toFixed(1)}%
          </Badge>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Total de departamentos da empresa
        </p>
      </div>
    </div>
  );
}
