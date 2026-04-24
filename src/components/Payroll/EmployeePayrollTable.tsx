// src/components/Payroll/EmployeePayrollTable.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Employee {
  id: string;
  name: string;
  function: string;
  department: string;
  baseSalary: number;
  benefits: {
    alimentacao: number;
    transporte: number;
    outros: number;
  };
  discounts: {
    irt: number;
    ss: number;
    faltas: number;
    outros: number;
  };
  extraHours: number;
  netSalary: number;
  status: string;
}

interface EmployeePayrollTableProps {
  employees: Employee[];
  formatCurrency: (value: number) => string;
}

export default function EmployeePayrollTable({
  employees,
  formatCurrency,
}: EmployeePayrollTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return <Badge color="success">Processado</Badge>;
      case "pending":
        return <Badge color="warning">Pendente</Badge>;
      case "error":
        return <Badge color="danger">Erro</Badge>;
      default:
        return <Badge color="default">{status}</Badge>;
    }
  };

  const getTotalBenefits = (employee: Employee) => {
    return Object.values(employee.benefits).reduce((a, b) => a + b, 0);
  };

  const getTotalDiscounts = (employee: Employee) => {
    return Object.values(employee.discounts).reduce((a, b) => a + b, 0);
  };

  const getExtraHoursValue = (employee: Employee) => {
    const hourlyRate = employee.baseSalary / 176;
    return employee.extraHours * hourlyRate * 1.5;
  };

  const getGrossSalary = (employee: Employee) => {
    return (
      employee.baseSalary +
      getTotalBenefits(employee) +
      getExtraHoursValue(employee)
    );
  };

  if (employees.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            Nenhum funcionário encontrado
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Tente ajustar os filtros ou adicionar funcionários.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Funcionário
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Salário Base
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Benefícios
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Horas Extras
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Descontos
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Salário Líquido
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {employees.map((employee) => {
              const isExpanded = expandedRow === employee.id;
              const totalBenefits = getTotalBenefits(employee);
              const totalDiscounts = getTotalDiscounts(employee);
              const extraHoursValue = getExtraHoursValue(employee);
              const grossSalary = getGrossSalary(employee);

              return (
                <>
                  <TableRow
                    key={employee.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer"
                    onClick={() =>
                      setExpandedRow(isExpanded ? null : employee.id)
                    }
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">
                            {employee.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {employee.function} • {employee.department}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 font-medium text-gray-800 dark:text-white/90">
                      {formatCurrency(employee.baseSalary)}
                    </TableCell>
                    <TableCell className="py-3 text-gray-800 dark:text-white/90">
                      {formatCurrency(totalBenefits)}
                    </TableCell>
                    <TableCell className="py-3">
                      {employee.extraHours > 0 ? (
                        <div>
                          <span className="font-medium text-blue-600">
                            {employee.extraHours}h
                          </span>
                          <p className="text-xs text-gray-500">
                            {formatCurrency(extraHoursValue)}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400">---</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3">
                      <div>
                        <span className="font-medium text-red-600">
                          {formatCurrency(totalDiscounts)}
                        </span>
                        <p className="text-xs text-gray-500">
                          IRT: {formatCurrency(employee.discounts.irt)} • SS:{" "}
                          {formatCurrency(employee.discounts.ss)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="font-bold text-green-600 text-lg">
                        {formatCurrency(employee.netSalary)}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      {getStatusBadge(employee.status)}
                    </TableCell>
                    <TableCell className="py-3">
                      <button
                        className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg"
                        title="Ver detalhes"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>

                  {/* Linha expandida com detalhes */}
                  {isExpanded && (
                    <TableRow className="bg-gray-50 dark:bg-gray-800/30">
                      <TableCell colSpan={8} className="py-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                            <h4 className="text-sm font-semibold mb-2">
                              Benefícios Detalhados
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Subsídio Alimentação:</span>
                                <span className="font-medium">
                                  {formatCurrency(
                                    employee.benefits.alimentacao,
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Subsídio Transporte:</span>
                                <span className="font-medium">
                                  {formatCurrency(employee.benefits.transporte)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Outros Benefícios:</span>
                                <span className="font-medium">
                                  {formatCurrency(employee.benefits.outros)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                            <h4 className="text-sm font-semibold mb-2">
                              Descontos Detalhados
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>IRT:</span>
                                <span className="font-medium text-red-600">
                                  {formatCurrency(employee.discounts.irt)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Segurança Social:</span>
                                <span className="font-medium text-red-600">
                                  {formatCurrency(employee.discounts.ss)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Faltas:</span>
                                <span className="font-medium text-red-600">
                                  {formatCurrency(employee.discounts.faltas)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Outros Descontos:</span>
                                <span className="font-medium text-red-600">
                                  {formatCurrency(employee.discounts.outros)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                            <h4 className="text-sm font-semibold mb-2">
                              Resumo Financeiro
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Salário Base:</span>
                                <span>
                                  {formatCurrency(employee.baseSalary)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>+ Benefícios:</span>
                                <span className="text-green-600">
                                  +{formatCurrency(totalBenefits)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>+ Horas Extras:</span>
                                <span className="text-blue-600">
                                  +{formatCurrency(extraHoursValue)}
                                </span>
                              </div>
                              <div className="flex justify-between border-t pt-1 mt-1">
                                <span className="font-semibold">
                                  Total Bruto:
                                </span>
                                <span className="font-semibold">
                                  {formatCurrency(grossSalary)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>- Descontos:</span>
                                <span className="text-red-600">
                                  -{formatCurrency(totalDiscounts)}
                                </span>
                              </div>
                              <div className="flex justify-between border-t pt-1 mt-1">
                                <span className="font-bold">
                                  Salário Líquido:
                                </span>
                                <span className="font-bold text-green-600">
                                  {formatCurrency(employee.netSalary)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
