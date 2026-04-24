// src/components/Payroll/PayrollSummary.tsx
interface PayrollSummaryProps {
  totalGross: number;
  totalDiscounts: number;
  totalNet: number;
  employeeCount: number;
  statusCounts: {
    total: number;
    processed: number;
    pending: number;
    error: number;
  };
  formatCurrency: (value: number) => string;
}

export default function PayrollSummary({
  totalGross,
  totalDiscounts,
  totalNet,
  employeeCount,
  statusCounts,
  formatCurrency,
}: PayrollSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Bruto
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
              {formatCurrency(totalGross)}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">Total de salários brutos</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total de Descontos
            </p>
            <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(totalDiscounts)}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">IRT, SS, faltas e outros</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Líquido
            </p>
            <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalNet)}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Valor a pagar aos funcionários
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Funcionários
            </p>
            <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
              {employeeCount}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex gap-2 text-xs">
          <span className="text-green-600">
            ✓ {statusCounts.processed} processados
          </span>
          <span className="text-yellow-600">
            ⏳ {statusCounts.pending} pendentes
          </span>
          <span className="text-red-600">⚠ {statusCounts.error} erro</span>
        </div>
      </div>
    </div>
  );
}
