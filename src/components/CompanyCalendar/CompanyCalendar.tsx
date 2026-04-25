// src/pages/CompanyCalendar/CompanyCalendar.tsx
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
// import Button from "../../components/ui/button/Button";
import UpcomingEventsList from "../../pages/CompanyCalendar/UpcomingEventsList";
import HolidayList from "../../pages/CompanyCalendar/HolidayList";
import EventDetailsModal from "../../pages/CompanyCalendar/EventDetailsModal";
import EventFilters from "../../pages/CompanyCalendar/EventFilters";

// Dados mockados dos eventos
const mockEvents = [
  {
    id: "1",
    title: "🎉 Ano Novo",
    description: "Feriado nacional - Ano Novo",
    eventType: "HOLIDAY",
    startDate: "2024-01-01",
    endDate: "2024-01-01",
    location: "Angola",
    color: "#EF4444",
    visibility: "PUBLIC",
    active: true,
  },
  {
    id: "2",
    title: "📊 Reunião de Resultados",
    description: "Apresentação dos resultados do trimestre",
    eventType: "MEETING",
    startDate: "2024-01-15T10:00:00",
    endDate: "2024-01-15T12:00:00",
    location: "Sala de Reuniões A",
    color: "#8B5CF6",
    visibility: "PUBLIC",
    active: true,
  },
  {
    id: "3",
    title: "🎓 Treinamento de Liderança",
    description: "Workshop de desenvolvimento de lideranças",
    eventType: "TRAINING",
    startDate: "2024-01-20T09:00:00",
    endDate: "2024-01-22T17:00:00",
    location: "Auditório Central",
    color: "#10B981",
    visibility: "EMPLOYEES_ONLY",
    active: true,
  },
  {
    id: "4",
    title: "💰 Processamento da Folha",
    description: "Data limite para envio de horas extras",
    eventType: "PAYROLL",
    startDate: "2024-01-25",
    endDate: "2024-01-25",
    location: "RH",
    color: "#F59E0B",
    visibility: "HR_ONLY",
    active: true,
  },
  {
    id: "5",
    title: "🏖️ Dia do Herói Nacional",
    description: "Feriado - Dia do Herói Nacional",
    eventType: "HOLIDAY",
    startDate: "2024-09-17",
    endDate: "2024-09-17",
    location: "Angola",
    color: "#EF4444",
    visibility: "PUBLIC",
    active: true,
  },
  {
    id: "6",
    title: "🎄 Natal",
    description: "Feriado de Natal",
    eventType: "HOLIDAY",
    startDate: "2024-12-25",
    endDate: "2024-12-25",
    location: "Angola",
    color: "#EF4444",
    visibility: "PUBLIC",
    active: true,
  },
  {
    id: "7",
    title: "📝 Avaliação de Desempenho",
    description: "Período de avaliação anual",
    eventType: "EVALUATION",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    location: "Sistema RH",
    color: "#EC4899",
    visibility: "EMPLOYEES_ONLY",
    active: true,
  },
  {
    id: "8",
    title: "🎂 Aniversário - João Silva",
    description: "Aniversário do funcionário João Silva",
    eventType: "BIRTHDAY",
    startDate: "2024-01-18",
    endDate: "2024-01-18",
    location: "Departamento de TI",
    color: "#06B6D4",
    visibility: "PUBLIC",
    active: true,
  },
  {
    id: "9",
    title: "🚀 Lançamento de Projeto",
    description: "Lançamento oficial do novo sistema",
    eventType: "EVENT",
    startDate: "2024-02-10T14:00:00",
    endDate: "2024-02-10T16:00:00",
    location: "Auditório + Online",
    color: "#3B82F6",
    visibility: "PUBLIC",
    active: true,
  },
  {
    id: "10",
    title: "📅 Carnaval",
    description: "Ponto facultativo - Carnaval",
    eventType: "HOLIDAY",
    startDate: "2024-02-13",
    endDate: "2024-02-14",
    location: "Angola",
    color: "#EF4444",
    visibility: "PUBLIC",
    active: true,
  },
];

// Feriados nacionais 2024
const nationalHolidays = [
  { id: "1", name: "Ano Novo", date: "2024-01-01", type: "Feriado Nacional" },
  {
    id: "2",
    name: "Dia do Trabalhador",
    date: "2024-05-01",
    type: "Feriado Nacional",
  },
  {
    id: "3",
    name: "Dia do Herói Nacional",
    date: "2024-09-17",
    type: "Feriado Nacional",
  },
  {
    id: "4",
    name: "Dia da Independência",
    date: "2024-11-11",
    type: "Feriado Nacional",
  },
  { id: "5", name: "Natal", date: "2024-12-25", type: "Feriado Nacional" },
  {
    id: "6",
    name: "Confraternização Universal",
    date: "2024-01-01",
    type: "Feriado Nacional",
  },
  { id: "7", name: "Carnaval", date: "2024-02-13", type: "Ponto Facultativo" },
  {
    id: "8",
    name: "Sexta-Feira Santa",
    date: "2024-03-29",
    type: "Feriado Nacional",
  },
  { id: "9", name: "Páscoa", date: "2024-03-31", type: "Feriado Nacional" },
  {
    id: "10",
    name: "Dia da Paz",
    date: "2024-04-04",
    type: "Feriado Nacional",
  },
];

export default function CompanyCalendar() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentView, setCurrentView] = useState("calendar");
  const [filters, setFilters] = useState({
    eventTypes: [],
    dateRange: { start: null, end: null },
    searchTerm: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Filtrar por tipo de evento
    if (filters.eventTypes.length > 0) {
      filtered = filtered.filter((event) =>
        filters.eventTypes.includes(event.eventType),
      );
    }

    // Filtrar por busca textual
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          event.description
            ?.toLowerCase()
            .includes(filters.searchTerm.toLowerCase()),
      );
    }

    setFilteredEvents(filtered);
  }, [filters, events]);

  const handleEventClick = (info: any) => {
    const event = events.find((e) => e.id === info.event.id);
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const getEventColor = (eventType: string) => {
    const colors: Record<string, string> = {
      HOLIDAY: "#EF4444",
      TRAINING: "#10B981",
      MEETING: "#8B5CF6",
      DEADLINE: "#F59E0B",
      BIRTHDAY: "#06B6D4",
      EVENT: "#3B82F6",
      PAYROLL: "#F97316",
      EVALUATION: "#EC4899",
    };
    return colors[eventType] || "#6B7280";
  };

  const calendarEvents = filteredEvents.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    backgroundColor: getEventColor(event.eventType),
    borderColor: getEventColor(event.eventType),
    extendedProps: {
      description: event.description,
      location: event.location,
      eventType: event.eventType,
    },
  }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Calendário da Empresa | Sistema RH" />
        <PageBreadcrumb pageTitle="Calendário" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando calendário...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Calendário da Empresa | Sistema de Gestão de RH"
        description="Calendário de atividades, feriados e eventos da empresa"
      />
      <PageBreadcrumb pageTitle="Calendário da Empresa" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Calendário da Empresa
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Acompanhe feriados, eventos, treinamentos e datas importantes
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView("calendar")}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                currentView === "calendar"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              📅 Calendário
            </button>
            <button
              onClick={() => setCurrentView("upcoming")}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                currentView === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              📋 Próximos Eventos
            </button>
            <button
              onClick={() => setCurrentView("holidays")}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                currentView === "holidays"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              🏖️ Feriados
            </button>
          </div>
        </div>

        {/* Filtros */}
        <EventFilters filters={filters} onFilterChange={setFilters} />

        {/* Conteúdo por view */}
        {currentView === "calendar" && (
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              locales={[ptLocale]}
              locale="pt-br"
              initialView="dayGridMonth"
              events={calendarEvents}
              eventClick={handleEventClick}
              height="auto"
              contentHeight={600}
              buttonText={{
                today: "Hoje",
                month: "Mês",
                week: "Semana",
                day: "Dia",
              }}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
            />
          </div>
        )}

        {currentView === "upcoming" && (
          <UpcomingEventsList
            events={filteredEvents}
            formatDate={formatDate}
            getEventColor={getEventColor}
          />
        )}

        {currentView === "holidays" && (
          <HolidayList holidays={nationalHolidays} formatDate={formatDate} />
        )}

        {/* Legenda */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
            Legenda
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">Feriado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Treinamento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="text-sm">Reunião</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm">Prazo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-teal-500"></div>
              <span className="text-sm">Aniversário</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Evento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500"></div>
              <span className="text-sm">Processamento Folha</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-500"></div>
              <span className="text-sm">Avaliação</span>
            </div>
          </div>
        </div>

        {/* Modal de Detalhes do Evento */}
        <EventDetailsModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          event={selectedEvent}
          formatDate={formatDate}
          getEventColor={getEventColor}
        />
      </div>
    </>
  );
}
