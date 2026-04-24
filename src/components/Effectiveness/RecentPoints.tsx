// src/components/Effectiveness/RecentPoints.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Point {
  id: string;
  employee: {
    id: string;
    employee_name: string;
  };
  registrationDate: string;
  horaRegisto: string;
  registrationType: string;
  origin: string;
  device: string | null;
  observation: string | null;
}

interface RecentPointsProps {
  points: Point[];
  selectedDate: string;
  totalEntries: number;
  totalExits: number;
  biometricEntries: number;
  manualEntries: number;
  formatTime: (time: string) => string;
}

export default function RecentPoints({
  points,
  selectedDate,
  totalEntries,
  totalExits,
  biometricEntries,
  manualEntries,
  formatTime,
}: RecentPointsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const getRegistrationTypeBadge = (type: string) => {
    return type === "ENTRADA" ? (
      <Badge color="success">Entrada</Badge>
    ) : (
      <Badge color="danger">Saída</Badge>
    );
  };

  const getOriginBadge = (origin: string) => {
    return origin === "BIOMETRICO" ? (
      <Badge color="info">Biométrico</Badge>
    ) : (
      <Badge color="warning">Manual</Badge>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Registos do Dia
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {formatDate(selectedDate)}
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Entradas</p>
            <p className="text-xl font-bold text-green-600">{totalEntries}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Saídas</p>
            <p className="text-xl font-bold text-red-600">{totalExits}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Biométrico</p>
            <p className="text-xl font-bold text-blue-600">
              {biometricEntries}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Manual</p>
            <p className="text-xl font-bold text-yellow-600">{manualEntries}</p>
          </div>
        </div>
      </div>

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
                Hora
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tipo
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Origem
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Dispositivo
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Observação
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {points.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-gray-500"
                >
                  Nenhum registo encontrado para esta data
                </TableCell>
              </TableRow>
            ) : (
              points.map((point) => (
                <TableRow
                  key={point.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-medium text-xs">
                          {point.employee.employee_name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {point.employee.employee_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 font-mono text-gray-800 dark:text-white/90">
                    {formatTime(point.horaRegisto)}
                  </TableCell>
                  <TableCell className="py-3">
                    {getRegistrationTypeBadge(point.registrationType)}
                  </TableCell>
                  <TableCell className="py-3">
                    {getOriginBadge(point.origin)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {point.device || "---"}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {point.observation || "---"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
