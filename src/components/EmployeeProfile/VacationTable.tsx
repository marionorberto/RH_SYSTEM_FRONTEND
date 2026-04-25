// src/components/EmployeeProfile/VacationTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Vacation {
  id: string;
  dateStart: string;
  dateEnd: string;
  days: number;
  vacationType: string;
  state: string;
  observation: string;
  createdAt: string;
  approvalDate: string | null;
}

interface VacationTableProps {
  vacations: Vacation[];
  formatDate: (date: string) => string;
}

export default function VacationTable({
  vacations,
  formatDate,
}: VacationTableProps) {
  const getStateBadge = (state: string) => {
    switch (state) {
      case "APROVADO":
        return <Badge color="success">Aprovado</Badge>;
      case "PENDENTE":
        return <Badge color="warning">Pendente</Badge>;
      case "REJEITADO":
        return <Badge color="danger">Rejeitado</Badge>;
      default:
        return <Badge color="default">{state}</Badge>;
    }
  };

  const getVacationTypeText = (type: string) => {
    switch (type) {
      case "ANUAL":
        return "Férias Anuais";
      case "LICENCA":
        return "Licença";
      case "ESPECIAL":
        return "Férias Especiais";
      default:
        return type;
    }
  };

  if (vacations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Nenhuma solicitação de férias encontrada
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
          <TableRow>
            <TableCell isHeader className="py-3 font-medium text-gray-500">
              Período
            </TableCell>
            <TableCell isHeader className="py-3 font-medium text-gray-500">
              Dias
            </TableCell>
            <TableCell isHeader className="py-3 font-medium text-gray-500">
              Tipo
            </TableCell>
            <TableCell isHeader className="py-3 font-medium text-gray-500">
              Status
            </TableCell>
            <TableCell isHeader className="py-3 font-medium text-gray-500">
              Observação
            </TableCell>
            <TableCell isHeader className="py-3 font-medium text-gray-500">
              Data da Solicitação
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {vacations.map((vacation) => (
            <TableRow
              key={vacation.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
            >
              <TableCell className="py-3">
                {formatDate(vacation.dateStart)} -{" "}
                {formatDate(vacation.dateEnd)}
              </TableCell>
              <TableCell className="py-3 font-medium">
                {vacation.days} dias
              </TableCell>
              <TableCell className="py-3">
                {getVacationTypeText(vacation.vacationType)}
              </TableCell>
              <TableCell className="py-3">
                {getStateBadge(vacation.state)}
              </TableCell>
              <TableCell className="py-3 text-gray-500">
                {vacation.observation || "---"}
              </TableCell>
              <TableCell className="py-3 text-gray-500">
                {formatDate(vacation.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
