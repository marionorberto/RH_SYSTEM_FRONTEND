// src/components/CompanyCalendar/HolidayList.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: string;
}

interface HolidayListProps {
  holidays: Holiday[];
  formatDate: (date: string) => string;
}

export default function HolidayList({
  holidays,
  formatDate,
}: HolidayListProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredHolidays = holidays.filter((holiday) => {
    const holidayYear = new Date(holiday.date).getFullYear();
    return holidayYear === selectedYear;
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

  // Separar feriados por tipo
  const nationalHolidays = filteredHolidays.filter(
    (h) => h.type === "Feriado Nacional",
  );
  const optionalHolidays = filteredHolidays.filter(
    (h) => h.type === "Ponto Facultativo",
  );

  const getHolidayTypeBadge = (type: string) => {
    return type === "Feriado Nacional" ? (
      <Badge color="danger">Feriado Nacional</Badge>
    ) : (
      <Badge color="warning">Ponto Facultativo</Badge>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Calendário de Feriados
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Feriados nacionais e pontos facultativos
          </p>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="px-3 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Feriados Nacionais */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 dark:text-white/90 mb-3 flex items-center gap-2">
            <span>🏛️</span> Feriados Nacionais
          </h4>
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-2 font-medium text-gray-500"
                  >
                    Data
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-2 font-medium text-gray-500"
                  >
                    Feriado
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-2 font-medium text-gray-500"
                  >
                    Tipo
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nationalHolidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell className="py-2 font-mono">
                      {formatDate(holiday.date)}
                    </TableCell>
                    <TableCell className="py-2 font-medium">
                      {holiday.name}
                    </TableCell>
                    <TableCell className="py-2">
                      {getHolidayTypeBadge(holiday.type)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pontos Facultativos */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 dark:text-white/90 mb-3 flex items-center gap-2">
            <span>📅</span> Pontos Facultativos
          </h4>
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-2 font-medium text-gray-500"
                  >
                    Data
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-2 font-medium text-gray-500"
                  >
                    Feriado
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-2 font-medium text-gray-500"
                  >
                    Tipo
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {optionalHolidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell className="py-2 font-mono">
                      {formatDate(holiday.date)}
                    </TableCell>
                    <TableCell className="py-2 font-medium">
                      {holiday.name}
                    </TableCell>
                    <TableCell className="py-2">
                      {getHolidayTypeBadge(holiday.type)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Total de Feriados Nacionais</p>
            <p className="text-2xl font-bold text-red-600">
              {nationalHolidays.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Pontos Facultativos</p>
            <p className="text-2xl font-bold text-yellow-600">
              {optionalHolidays.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
