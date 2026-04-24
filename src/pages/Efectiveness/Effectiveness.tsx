// src/pages/Effectiveness/Effectiveness.tsx
import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AttendanceSummary from "../../components/Effectiveness/AttendanceSummary";
import AttendanceChart from "../../components/Effectiveness/AttendanceChart";
import RecentPoints from "../../components/Effectiveness/RecentPoints";
import EmployeeAttendanceTable from "../../components/Effectiveness/EmployeeAttendanceTable";
import BiometricDevices from "../../components/Effectiveness/BiometricDevices";

// Dados mockados baseados na entidade Point
const mockPoints = [
  {
    id: "1",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    registrationDate: new Date().toISOString(),
    horaRegisto: "08:00:00",
    registrationType: "ENTRADA",
    origin: "BIOMETRICO",
    device: "ZKTeco - Terminal 1",
    observation: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    registrationDate: new Date().toISOString(),
    horaRegisto: "12:00:00",
    registrationType: "SAIDA",
    origin: "BIOMETRICO",
    device: "ZKTeco - Terminal 1",
    observation: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    registrationDate: new Date().toISOString(),
    horaRegisto: "13:00:00",
    registrationType: "ENTRADA",
    origin: "BIOMETRICO",
    device: "ZKTeco - Terminal 1",
    observation: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    employee: {
      id: "1",
      employee_name: "João Silva",
    },
    registrationDate: new Date().toISOString(),
    horaRegisto: "17:00:00",
    registrationType: "SAIDA",
    origin: "BIOMETRICO",
    device: "ZKTeco - Terminal 1",
    observation: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    employee: {
      id: "2",
      employee_name: "Maria Santos",
    },
    registrationDate: new Date().toISOString(),
    horaRegisto: "08:30:00",
    registrationType: "ENTRADA",
    origin: "MANUAL",
    device: null,
    observation: "Atraso justificado",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    employee: {
      id: "2",
      employee_name: "Maria Santos",
    },
    registrationDate: new Date().toISOString(),
    horaRegisto: "17:30:00",
    registrationType: "SAIDA",
    origin: "MANUAL",
    device: null,
    observation: null,
    createdAt: new Date().toISOString(),
  },
];

const mockEmployees = [
  {
    id: "1",
    name: "João Silva",
    presentDays: 22,
    absentDays: 0,
    lateDays: 0,
    extraHours: 5,
  },
  {
    id: "2",
    name: "Maria Santos",
    presentDays: 21,
    absentDays: 1,
    lateDays: 2,
    extraHours: 3,
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    presentDays: 20,
    absentDays: 2,
    lateDays: 1,
    extraHours: 8,
  },
  {
    id: "4",
    name: "Ana Costa",
    presentDays: 22,
    absentDays: 0,
    lateDays: 0,
    extraHours: 2,
  },
  {
    id: "5",
    name: "Pedro Almeida",
    presentDays: 19,
    absentDays: 3,
    lateDays: 3,
    extraHours: 0,
  },
];

const mockBiometricDevices = [
  {
    id: "1",
    name: "ZKTeco - Terminal 1",
    status: "online",
    lastSync: new Date().toISOString(),
    totalRegisters: 1250,
  },
  {
    id: "2",
    name: "ZKTeco - Terminal 2",
    status: "online",
    lastSync: new Date().toISOString(),
    totalRegisters: 890,
  },
  {
    id: "3",
    name: "BioStar - Recepção",
    status: "offline",
    lastSync: new Date(Date.now() - 86400000).toISOString(),
    totalRegisters: 450,
  },
];

export default function Effectiveness() {
  const [points, setPoints] = useState(mockPoints);
  const [employees, setEmployees] = useState(mockEmployees);
  const [devices, setDevices] = useState(mockBiometricDevices);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedEmployee, setSelectedEmployee] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Calcular estatísticas do dia
  const todayPoints = points.filter(
    (p) => p.registrationDate.split("T")[0] === selectedDate,
  );
  const totalEntries = todayPoints.filter(
    (p) => p.registrationType === "ENTRADA",
  ).length;
  const totalExits = todayPoints.filter(
    (p) => p.registrationType === "SAIDA",
  ).length;
  const biometricEntries = todayPoints.filter(
    (p) => p.origin === "BIOMETRICO" && p.registrationType === "ENTRADA",
  ).length;
  const manualEntries = todayPoints.filter(
    (p) => p.origin === "MANUAL" && p.registrationType === "ENTRADA",
  ).length;

  // Calcular estatísticas gerais
  const totalPresentDays = employees.reduce(
    (sum, emp) => sum + emp.presentDays,
    0,
  );
  const totalAbsentDays = employees.reduce(
    (sum, emp) => sum + emp.absentDays,
    0,
  );
  const totalLateDays = employees.reduce((sum, emp) => sum + emp.lateDays, 0);
  const totalExtraHours = employees.reduce(
    (sum, emp) => sum + emp.extraHours,
    0,
  );
  const attendanceRate =
    (totalPresentDays / (totalPresentDays + totalAbsentDays)) * 100;

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <>
        <PageMeta title="Efectividade | Sistema RH" />
        <PageBreadcrumb pageTitle="Efectividade" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando dados de efectividade...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Efectividade | Sistema de Gestão de RH"
        description="Monitoramento de faltas, presenças e registos biométricos"
      />
      <PageBreadcrumb pageTitle="Efectividade" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
              Efectividade
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitoramento de faltas, presenças e registos biométricos
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="all">Todos os funcionários</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards de Resumo */}
        <AttendanceSummary
          totalPresentDays={totalPresentDays}
          totalAbsentDays={totalAbsentDays}
          totalLateDays={totalLateDays}
          totalExtraHours={totalExtraHours}
          attendanceRate={attendanceRate}
        />

        {/* Gráficos */}
        <AttendanceChart
          employees={employees}
          totalPresentDays={totalPresentDays}
          totalAbsentDays={totalAbsentDays}
        />

        {/* Registos do Dia */}
        <RecentPoints
          points={todayPoints}
          selectedDate={selectedDate}
          totalEntries={totalEntries}
          totalExits={totalExits}
          biometricEntries={biometricEntries}
          manualEntries={manualEntries}
          formatTime={formatTime}
        />

        {/* Tabela de Funcionários */}
        <EmployeeAttendanceTable
          employees={employees}
          selectedEmployee={selectedEmployee}
          onEmployeeChange={setSelectedEmployee}
        />

        {/* Dispositivos Biométricos */}
        <BiometricDevices devices={devices} />
      </div>
    </>
  );
}
