// src/components/Remunerations/RemunerationTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Remuneration {
  id: string;
  employee: {
    id: string;
    employee_name: string;
  };
  remunerationType: {
    id: string;
    typeName: string;
    code: string;
  };
  value: number;
  unities: number;
  days: number;
  processingType: string;
  tipoCalculo: string;
  createdAt: string;
}

interface RemunerationTableProps {
  remunerations: Remuneration[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
}

export default function RemunerationTable({
  remunerations,
  onEdit,
  onDelete,
  formatCurrency,
}: RemunerationTableProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch {
      return "---";
    }
  };

  const getProcessingTypeBadge = (type: string) => {
    switch (type) {
      case "Mensal":
        return <Badge color="primary">Mensal</Badge>;
      case "Semanal":
        return <Badge color="info">Semanal</Badge>;
      case "Diario":
        return <Badge color="warning">Diário</Badge>;
      default:
        return <Badge color="default">{type}</Badge>;
    }
  };

  const getCalculoTypeBadge = (type: string) => {
    switch (type) {
      case "Valor":
        return <Badge color="success">Valor Fixo</Badge>;
      case "Percentual":
        return <Badge color="warning">Percentual</Badge>;
      case "Formula":
        return <Badge color="info">Fórmula</Badge>;
      default:
        return <Badge color="default">{type}</Badge>;
    }
  };

  const getTotalValue = (remuneration: Remuneration) => {
    if (remuneration.tipoCalculo === "Percentual") {
      return `${remuneration.value}%`;
    }
    return formatCurrency(remuneration.value * remuneration.unities);
  };

  if (remunerations.length === 0) {
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white/90">
            Nenhuma remuneração encontrada
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Tente ajustar os filtros ou adicionar uma nova remuneração.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
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
                Tipo de Remuneração
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Valor/Percentual
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Unidades/Dias
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Processamento
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Cálculo
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Data
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
            {remunerations.map((remuneration) => (
              <TableRow
                key={remuneration.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm uppercase">
                        {remuneration.employee.employee_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {remuneration.employee.employee_name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {remuneration.remunerationType.typeName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {remuneration.remunerationType.code}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <p className="font-semibold text-gray-800 dark:text-white/90">
                    {remuneration.tipoCalculo === "Percentual"
                      ? `${remuneration.value}%`
                      : formatCurrency(remuneration.value)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total: {getTotalValue(remuneration)}
                  </p>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <p>Unidades: {remuneration.unities}</p>
                  <p className="text-xs">Dias: {remuneration.days}</p>
                </TableCell>
                <TableCell className="py-3">
                  {getProcessingTypeBadge(remuneration.processingType)}
                </TableCell>
                <TableCell className="py-3">
                  {getCalculoTypeBadge(remuneration.tipoCalculo)}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {formatDate(remuneration.createdAt)}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(remuneration.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
                      title="Editar"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(remuneration.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
                      title="Excluir"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
