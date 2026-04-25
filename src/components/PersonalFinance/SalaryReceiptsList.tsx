// src/components/PersonalFinance/SalaryReceiptsList.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";

interface SalaryReceipt {
  id: string;
  reference: string;
  month: string;
  year: number;
  grossSalary: number;
  benefits: number;
  discounts: number;
  netSalary: number;
  paymentDate: string;
  status: string;
  receiptUrl: string;
}

interface SalaryReceiptsListProps {
  receipts: SalaryReceipt[];
  formatCurrency: (value: number) => string;
  formatDate: (date: string) => string;
}

export default function SalaryReceiptsList({
  receipts,
  formatCurrency,
  formatDate,
}: SalaryReceiptsListProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<SalaryReceipt | null>(
    null,
  );

  const getStatusBadge = (status: string) => {
    return status === "PAID" ? (
      <Badge color="success">Pago</Badge>
    ) : (
      <Badge color="warning">Pendente</Badge>
    );
  };

  if (receipts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum recibo de salário encontrado</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Referência
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Mês/Ano
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Salário Bruto
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Benefícios
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Descontos
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Salário Líquido
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data Pagamento
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Ações
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {receipts.map((receipt) => (
              <TableRow
                key={receipt.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3 font-medium">
                  {receipt.reference}
                </TableCell>
                <TableCell className="py-3">
                  {receipt.month}/{receipt.year}
                </TableCell>
                <TableCell className="py-3 text-gray-800">
                  {formatCurrency(receipt.grossSalary)}
                </TableCell>
                <TableCell className="py-3 text-green-600">
                  {formatCurrency(receipt.benefits)}
                </TableCell>
                <TableCell className="py-3 text-red-600">
                  {formatCurrency(receipt.discounts)}
                </TableCell>
                <TableCell className="py-3 font-bold text-blue-600">
                  {formatCurrency(receipt.netSalary)}
                </TableCell>
                <TableCell className="py-3">
                  {formatDate(receipt.paymentDate)}
                </TableCell>
                <TableCell className="py-3">
                  {getStatusBadge(receipt.status)}
                </TableCell>
                <TableCell className="py-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(receipt.receiptUrl, "_blank")}
                    className="text-xs"
                  >
                    Ver Recibo
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
