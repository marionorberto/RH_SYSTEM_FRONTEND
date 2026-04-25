// src/components/PersonalFinance/ExpenseRequestsList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface ExpenseRequest {
  id: string;
  expenseType: string;
  description: string;
  amount: number;
  expenseDate: string;
  status: string;
  rejectionReason: string | null;
  createdAt: string;
  approvalDate: string | null;
}

interface ExpenseRequestsListProps {
  expenses: ExpenseRequest[];
  formatCurrency: (value: number) => string;
  formatDate: (date: string) => string;
}

export default function ExpenseRequestsList({
  expenses,
  formatCurrency,
  formatDate,
}: ExpenseRequestsListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APROVADO":
        return <Badge color="success">Aprovado</Badge>;
      case "PENDENTE":
        return <Badge color="warning">Pendente</Badge>;
      case "REJEITADO":
        return <Badge color="danger">Rejeitado</Badge>;
      case "PAGO":
        return <Badge color="info">Pago</Badge>;
      default:
        return <Badge color="default">{status}</Badge>;
    }
  };

  const getExpenseTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      TRANSPORTE: "🚗",
      ALIMENTACAO: "🍽️",
      SAUDE: "🏥",
      EDUCACAO: "📚",
      HABITACAO: "🏠",
      OUTROS: "📦",
    };
    return icons[type] || "💰";
  };

  const getExpenseTypeText = (type: string) => {
    const texts: Record<string, string> = {
      TRANSPORTE: "Transporte",
      ALIMENTACAO: "Alimentação",
      SAUDE: "Saúde",
      EDUCACAO: "Educação",
      HABITACAO: "Habitação",
      OUTROS: "Outros",
    };
    return texts[type] || type;
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum pedido de despesa encontrado</p>
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
                Tipo
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Descrição
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Valor
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data da Despesa
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data da Solicitação
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {expenses.map((expense) => (
              <TableRow
                key={expense.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {getExpenseTypeIcon(expense.expenseType)}
                    </span>
                    <span>{getExpenseTypeText(expense.expenseType)}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div>
                    <p className="text-sm">{expense.description}</p>
                    {expense.rejectionReason && (
                      <p className="text-xs text-red-600 mt-1">
                        Motivo: {expense.rejectionReason}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-3 font-semibold text-gray-800 dark:text-white/90">
                  {formatCurrency(expense.amount)}
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {formatDate(expense.expenseDate)}
                </TableCell>
                <TableCell className="py-3">
                  {getStatusBadge(expense.status)}
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {formatDate(expense.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
