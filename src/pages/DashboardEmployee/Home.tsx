// src/pages/EmployeeDashboard/EmployeeDashboard.tsx
import { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router";

// Dados mockados do funcionário logado
const mockEmployeeData = {
  id: "1",
  name: "João Silva",
  photo: null,
  position: "Desenvolvedor Sênior",
  department: "Tecnologia",
  manager: "Pedro Almeida",
  admissionDate: "2023-01-15",
  email: "joao.silva@empresa.com",
  phone: "+244 923 456 789",

  // Resumo financeiro
  currentSalary: {
    base: 250000,
    benefits: 95000,
    discounts: 82500,
    net: 262500,
    nextPayday: "2024-04-30",
  },

  // Resumo de férias
  vacations: {
    total: 22,
    used: 15,
    pending: 7,
    nextRequest: null,
  },

  // Pontualidade
  attendance: {
    presentDays: 20,
    absentDays: 1,
    lateDays: 2,
    attendanceRate: 95.2,
  },

  // Próximos eventos
  upcomingEvents: [
    {
      id: "1",
      title: "Reunião de Equipe",
      date: "2024-04-25T10:00:00",
      type: "MEETING",
    },
    {
      id: "2",
      title: "Prazo de Entrega - Projeto X",
      date: "2024-04-28T17:00:00",
      type: "DEADLINE",
    },
    {
      id: "3",
      title: "Avaliação de Desempenho",
      date: "2024-05-05T14:00:00",
      type: "EVALUATION",
    },
  ],

  // Aniversariantes do mês
  birthdays: [
    {
      id: "2",
      name: "Maria Santos",
      position: "Analista de RH",
      day: 15,
      photo: null,
    },
    {
      id: "4",
      name: "Ana Costa",
      position: "Coordenadora Comercial",
      day: 22,
      photo: null,
    },
  ],

  // Pendências
  pendingTasks: [
    {
      id: "1",
      title: "Avaliação de desempenho pendente",
      dueDate: "2024-04-30",
      priority: "HIGH",
    },
    {
      id: "2",
      title: "Submeter relatório de horas extras",
      dueDate: "2024-04-26",
      priority: "MEDIUM",
    },
  ],

  // Notificações recentes
  notifications: [
    {
      id: "1",
      title: "Férias aprovadas",
      message: "Suas férias foram aprovadas pelo RH",
      date: "2024-04-20T09:30:00",
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "Processamento da folha",
      message: "Folha de pagamento processada. Consulte seu recibo.",
      date: "2024-04-19T16:00:00",
      read: true,
      type: "info",
    },
    {
      id: "3",
      title: "Lembrete de avaliação",
      message: "Prazo para autoavaliação termina dia 30/04",
      date: "2024-04-18T08:00:00",
      read: false,
      type: "warning",
    },
  ],
};

// Aniversariantes do mês (dados adicionais)
const birthdayPeople = [
  {
    id: "2",
    name: "Maria Santos",
    position: "Analista de RH",
    department: "Recursos Humanos",
    day: 15,
    photo: null,
  },
  {
    id: "4",
    name: "Ana Costa",
    position: "Coordenadora Comercial",
    department: "Comercial",
    day: 22,
    photo: null,
  },
  {
    id: "7",
    name: "Ricardo Souza",
    position: "Operador de Logística",
    department: "Operações",
    day: 28,
    photo: null,
  },
];

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(mockEmployeeData);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, [currentTime]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            Alta
          </span>
        );
      case "MEDIUM":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            Média
          </span>
        );
      case "LOW":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Baixa
          </span>
        );
      default:
        return null;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📌";
    }
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Dashboard | Sistema RH" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando seu dashboard...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Dashboard | Sistema de Gestão de RH"
        description="Visão geral das suas informações"
      />

      <div className="space-y-6">
        {/* Header com Saudação */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                {employeeData.photo ? (
                  <img
                    src={employeeData.photo}
                    alt={employeeData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {getInitials(employeeData.name)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {greeting}, {employeeData.name.split(" ")[0]}!
                </h1>
                <p className="text-blue-100 mt-1">
                  {employeeData.position} • {employeeData.department}
                </p>
                <div className="flex gap-3 mt-2 text-sm text-blue-100">
                  <span>📧 {employeeData.email}</span>
                  <span>📞 {employeeData.phone}</span>
                  <span>📅 Desde {formatDate(employeeData.admissionDate)}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">
                {formatDate(currentTime.toISOString())}
              </p>
              <p className="text-blue-100">
                {currentTime.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Salário Líquido */}
          <Link to="/personal-finance" className="block">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Salário Líquido
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(employeeData.currentSalary.net)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Próximo pagamento:{" "}
                {formatDate(employeeData.currentSalary.nextPayday)}
              </p>
            </div>
          </Link>

          {/* Dias de Férias */}
          <Link to="/employee-profile" className="block">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Férias Disponíveis
                  </p>
                  <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {employeeData.vacations.pending} dias
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <span className="text-2xl">🏖️</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Utilizados: {employeeData.vacations.used} dias</span>
                  <span>Total: {employeeData.vacations.total} dias</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{
                      width: `${(employeeData.vacations.used / employeeData.vacations.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Taxa de Presença */}
          <Link to="/effectiveness" className="block">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Taxa de Presença
                  </p>
                  <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {employeeData.attendance.attendanceRate}%
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>
                    Presente: {employeeData.attendance.presentDays} dias
                  </span>
                  <span>Faltas: {employeeData.attendance.absentDays}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-purple-500 h-1.5 rounded-full"
                    style={{
                      width: `${employeeData.attendance.attendanceRate}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>

          {/* Benefícios */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Benefícios
                </p>
                <p className="mt-2 text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {formatCurrency(employeeData.currentSalary.benefits)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
                <span className="text-2xl">🎁</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Inclui alimentação, transporte e outros
            </p>
          </div>
        </div>

        {/* Segunda Linha */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Próximos Eventos */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                📅 Próximos Eventos
              </h3>
              <Link
                to="/company-calendar"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Ver todos →
              </Link>
            </div>
            <div className="space-y-3">
              {employeeData.upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString("pt-BR", {
                        month: "short",
                      })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(event.date)}
                    </p>
                  </div>
                  <div>
                    {event.type === "MEETING" && (
                      <span className="text-2xl">🤝</span>
                    )}
                    {event.type === "DEADLINE" && (
                      <span className="text-2xl">⏰</span>
                    )}
                    {event.type === "EVALUATION" && (
                      <span className="text-2xl">📝</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pendências */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                ⚠️ Pendências
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Ver todas →
              </button>
            </div>
            <div className="space-y-3">
              {employeeData.pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Vence em {formatDate(task.dueDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(task.priority)}
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terceira Linha */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Aniversariantes do Mês */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎂</span>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Aniversariantes do Mês
              </h3>
            </div>
            <div className="space-y-3">
              {birthdayPeople.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg"
                >
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {getInitials(person.name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {person.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {person.position} • {person.department}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                      {person.day}
                    </div>
                    <div className="text-xs text-gray-500">
                      de{" "}
                      {new Date().toLocaleDateString("pt-BR", {
                        month: "long",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notificações Recentes */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔔</span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  Notificações Recentes
                </h3>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Marcar todas como lidas
              </button>
            </div>
            <div className="space-y-3">
              {employeeData.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    !notification.read
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "bg-gray-50 dark:bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDateTime(notification.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            ⚡ Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            <Link
              to="/salary-simulator"
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-2xl">💰</span>
              <span className="text-sm text-center">Simular Salário</span>
            </Link>
            <Link
              to="/employee-profile"
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-2xl">👤</span>
              <span className="text-sm text-center">Meu Perfil</span>
            </Link>
            <Link
              to="/personal-finance"
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-2xl">📋</span>
              <span className="text-sm text-center">Pedir Despesa</span>
            </Link>
            <Link
              to="/employee-profile?tab=vacations"
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-2xl">🏖️</span>
              <span className="text-sm text-center">Solicitar Férias</span>
            </Link>
            <Link
              to="/effectiveness"
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-2xl">📊</span>
              <span className="text-sm text-center">Meu Ponto</span>
            </Link>
            <Link
              to="/company-calendar"
              className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <span className="text-2xl">📅</span>
              <span className="text-sm text-center">Calendário</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
