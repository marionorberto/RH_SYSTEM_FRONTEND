// src/components/Payroll/ProcessHistory.tsx
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface HistoryItem {
  id: string;
  reference: string;
  month: string;
  year: number;
  processedAt: string;
  processedBy: string;
  totalEmployees: number;
  totalGross: number;
  totalDiscounts: number;
  totalNet: number;
  status: string;
}

interface ProcessHistoryProps {
  history: HistoryItem[];
  onClose: () => void;
  formatCurrency: (value: number) => string;
  formatDate: (date: string) => string;
}

export default function ProcessHistory({
  history,
  onClose,
  formatCurrency,
  formatDate,
}: ProcessHistoryProps) {
  const getStatusBadge = (status: string) => {
    return status === "completed" ? (
      <Badge color="success">Concluído</Badge>
    ) : (
      <Badge color="warning">Pendente</Badge>
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose} className="max-w-[1000px] m-4">
      <div className="no-scrollbar relative w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Histórico de Processamentos
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Histórico de folhas de pagamento processadas
          </p>
        </div>

        <div className="px-2 pb-3">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Referência
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
                    Funcionários
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Total Bruto
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Total Líquido
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
                {history.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  >
                    <TableCell className="py-3">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {item.reference}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatDate(item.processedAt)}
                    </TableCell>
                    <TableCell className="py-3 text-gray-800 dark:text-white/90">
                      {item.totalEmployees}
                    </TableCell>
                    <TableCell className="py-3 text-gray-800 dark:text-white/90">
                      {formatCurrency(item.totalGross)}
                    </TableCell>
                    <TableCell className="py-3 font-semibold text-green-600">
                      {formatCurrency(item.totalNet)}
                    </TableCell>
                    <TableCell className="py-3">
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Ver Detalhes
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">
                          Exportar
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-2 mt-6">
          <Button size="sm" variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
