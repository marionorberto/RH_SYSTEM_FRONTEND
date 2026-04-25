// src/components/SalarySimulator/SalaryHistoryList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface SalaryHistoryListProps {
  history: any[];
  formatCurrency: (value: number) => string;
  formatDate: (date: string) => string;
}

export default function SalaryHistoryList({
  history,
  formatCurrency,
  formatDate,
}: SalaryHistoryListProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Histórico de Simulações
      </h3>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Salário Base
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Benefícios
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Descontos
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Horas Extras
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Salário Líquido
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {history.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3 text-gray-500">
                  {formatDate(item.date)}
                </TableCell>
                <TableCell className="py-3 font-medium">
                  {formatCurrency(item.baseSalary)}
                </TableCell>
                <TableCell className="py-3 text-green-600">
                  {formatCurrency(item.benefits)}
                </TableCell>
                <TableCell className="py-3 text-red-600">
                  {formatCurrency(item.discounts)}
                </TableCell>
                <TableCell className="py-3">
                  {item.extraHours > 0 ? `${item.extraHours}h` : "---"}
                </TableCell>
                <TableCell className="py-3 font-bold text-purple-600">
                  {formatCurrency(item.netSalary)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
