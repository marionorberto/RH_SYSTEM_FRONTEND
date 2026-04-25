// src/components/PersonalFinance/DiscountsList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Discount {
  id: string;
  discountType: string;
  value: number;
  percentage: number;
  month: string;
  year: number;
  description: string;
  appliedAt: string;
}

interface DiscountsListProps {
  discounts: Discount[];
  formatCurrency: (value: number) => string;
}

export default function DiscountsList({
  discounts,
  formatCurrency,
}: DiscountsListProps) {
  const getDiscountTypeBadge = (type: string) => {
    if (type.includes("IRT")) {
      return <Badge color="danger">IRT</Badge>;
    } else if (type.includes("SS")) {
      return <Badge color="warning">Segurança Social</Badge>;
    } else if (type.includes("Falta")) {
      return <Badge color="info">Falta</Badge>;
    } else {
      return <Badge color="default">Outros</Badge>;
    }
  };

  if (discounts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum desconto aplicado encontrado</p>
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
                Tipo de Desconto
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Descrição
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Percentual
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Valor
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Mês de Referência
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data Aplicação
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {discounts.map((discount) => (
              <TableRow
                key={discount.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    {getDiscountTypeBadge(discount.discountType)}
                    <span className="text-sm">{discount.discountType}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-600">
                  {discount.description}
                </TableCell>
                <TableCell className="py-3">
                  {discount.percentage > 0 ? `${discount.percentage}%` : "---"}
                </TableCell>
                <TableCell className="py-3 font-semibold text-red-600">
                  {discount.value > 0 ? formatCurrency(discount.value) : "---"}
                </TableCell>
                <TableCell className="py-3">
                  {discount.month}/{discount.year}
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {new Date(discount.appliedAt).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
