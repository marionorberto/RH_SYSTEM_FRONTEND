// src/components/Effectiveness/EmployeeAttendanceTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Employee {
  id: string;
  name: string;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  extraHours: number;
}

interface EmployeeAttendanceTableProps {
  employees: Employee[];
  selectedEmployee: string;
  onEmployeeChange: (value: string) => void;
}

export default function EmployeeAttendanceTable({
  employees,
  selectedEmployee,
}: EmployeeAttendanceTableProps) {
  const filteredEmployees =
    selectedEmployee === "all"
      ? employees
      : employees.filter((emp) => emp.id === selectedEmployee);

  const getAttendanceRate = (present: number, absent: number) => {
    const total = present + absent;
    if (total === 0) return 0;
    return (present / total) * 100;
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Desempenho por Funcionário
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Detalhamento de presenças, faltas e atrasos
          </p>
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
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Dias Presentes
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Faltas
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Atrasos
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Horas Extras
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Taxa de Presença
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredEmployees.map((employee) => {
              const attendanceRate = getAttendanceRate(
                employee.presentDays,
                employee.absentDays,
              );
              return (
                <TableRow
                  key={employee.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-xs">
                          {employee.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {employee.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-center font-semibold text-green-600">
                    {employee.presentDays}
                  </TableCell>
                  <TableCell className="py-3 text-center font-semibold text-red-600">
                    {employee.absentDays}
                  </TableCell>
                  <TableCell className="py-3 text-center font-semibold text-yellow-600">
                    {employee.lateDays}
                  </TableCell>
                  <TableCell className="py-3 text-center font-semibold text-blue-600">
                    {employee.extraHours}h
                  </TableCell>
                  <TableCell className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${attendanceRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {attendanceRate.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          Nenhum funcionário encontrado
        </div>
      )}
    </div>
  );
}
