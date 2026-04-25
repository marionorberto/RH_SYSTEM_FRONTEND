// src/components/SalarySimulator/SalaryResultCard.tsx
interface SalaryResultCardProps {
  simulation: any;
  formatCurrency: (value: number) => string;
}

export default function SalaryResultCard({
  simulation,
  formatCurrency,
}: SalaryResultCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Resultado da Simulação
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <p className="text-sm text-gray-500">Salário Base</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white/90">
            {formatCurrency(simulation.baseSalary)}
          </p>
        </div>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <p className="text-sm text-gray-500">Salário Bruto</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(simulation.grossSalary)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            +{formatCurrency(simulation.totalBenefits)} benefícios
            {simulation.extraHoursQuantity > 0 &&
              ` + ${simulation.extraHoursQuantity}h extras`}
          </p>
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <p className="text-sm text-gray-500">Total de Descontos</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            {formatCurrency(simulation.totalDiscounts)}
          </p>
          <div className="text-xs text-gray-500 mt-1">
            <div>
              IRT: {formatCurrency(simulation.irt.amount)} (
              {simulation.irt.rate}%)
            </div>
            <div>
              SS: {formatCurrency(simulation.socialSecurity.amount)} (
              {simulation.socialSecurity.rate}%)
            </div>
            {simulation.otherDiscounts.faltas > 0 && (
              <div>
                Faltas: {formatCurrency(simulation.otherDiscounts.faltas)}
              </div>
            )}
            {simulation.otherDiscounts.outros > 0 && (
              <div>
                Outros: {formatCurrency(simulation.otherDiscounts.outros)}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <p className="text-sm text-gray-500">Salário Líquido</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(simulation.netSalary)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {((simulation.netSalary / simulation.grossSalary) * 100).toFixed(1)}
            % do salário bruto
          </p>
        </div>
      </div>
    </div>
  );
}
