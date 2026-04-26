// src/components/CompanyCalendar/EventDetailsModal.tsx
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Badge from "../../components/ui/badge/Badge";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  formatDate: (date: string) => string;
  getEventColor: (type: string) => string;
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  event,
  formatDate,
  getEventColor,
}: EventDetailsModalProps) {
  if (!event) return null;

  const getEventTypeText = (type: string) => {
    const types: Record<string, string> = {
      HOLIDAY: "Feriado",
      TRAINING: "Treinamento",
      MEETING: "Reunião",
      DEADLINE: "Prazo Importante",
      BIRTHDAY: "Aniversário",
      EVENT: "Evento Especial",
      PAYROLL: "Processamento de Folha",
      EVALUATION: "Avaliação de Desempenho",
    };
    return types[type] || type;
  };

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getEventColor(event.eventType) }}
            />
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
              {event.title}
            </h4>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getEventTypeBadge(event.eventType)}
          </p>
        </div>

        <div className="px-2 pb-3 mt-4 space-y-4">
          {/* Data e Hora */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">Período</span>
            </div>
            <p className="text-gray-800 dark:text-white/90">
              {formatDate(event.startDate)}
              {event.endDate !== event.startDate &&
                ` até ${formatDate(event.endDate)}`}
            </p>
          </div>

          {/* Local */}
          {event.location && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm font-medium">Local</span>
              </div>
              <p className="text-gray-800 dark:text-white/90">
                {event.location}
              </p>
            </div>
          )}

          {/* Descrição */}
          {event.description && (
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span className="text-sm font-medium">Descrição</span>
              </div>
              <p className="text-gray-800 dark:text-white/90">
                {event.description}
              </p>
            </div>
          )}
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
