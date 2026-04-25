// src/components/CompanyCalendar/UpcomingEventsList.tsx
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Event {
  id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  color: string;
}

interface UpcomingEventsListProps {
  events: Event[];
  formatDate: (date: string) => string;
  getEventColor: (type: string) => string;
}

export default function UpcomingEventsList({
  events,
  formatDate,
  getEventColor,
}: UpcomingEventsListProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filtrar eventos do mês selecionado
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    return (
      eventDate.getMonth() === selectedMonth &&
      eventDate.getFullYear() === selectedYear
    );
  });

  // Ordenar por data
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  const getEventTypeBadge = (type: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      HOLIDAY: { color: "danger", label: "Feriado" },
      TRAINING: { color: "success", label: "Treinamento" },
      MEETING: { color: "info", label: "Reunião" },
      DEADLINE: { color: "warning", label: "Prazo" },
      BIRTHDAY: { color: "primary", label: "Aniversário" },
      EVENT: { color: "primary", label: "Evento" },
      PAYROLL: { color: "warning", label: "Folha" },
      EVALUATION: { color: "secondary", label: "Avaliação" },
    };
    const badge = badges[type] || { color: "default", label: type };
    return <Badge color={badge.color}>{badge.label}</Badge>;
  };

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

  if (sortedEvents.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03] text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white/90 mb-2">
          Nenhum evento encontrado
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Não há eventos programados para {months[selectedMonth]} de{" "}
          {selectedYear}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Próximos Eventos
        </h3>
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
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
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Data
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Evento
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Tipo
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Local
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Descrição
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {sortedEvents.map((event) => (
              <TableRow
                key={event.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
              >
                <TableCell className="py-3 font-mono">
                  {formatDate(event.startDate)}
                  {event.endDate !== event.startDate &&
                    ` até ${formatDate(event.endDate)}`}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: getEventColor(event.eventType),
                      }}
                    />
                    <span className="font-medium">{event.title}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  {getEventTypeBadge(event.eventType)}
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {event.location || "---"}
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  {event.description || "---"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
