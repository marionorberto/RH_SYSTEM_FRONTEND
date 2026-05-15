// frontend/src/components/users/EmployeeSearchInput.tsx
import { useState, useEffect, useRef } from "react";
import { useEmployees } from "../../hooks/useEmployees";

interface Employee {
  id: string;
  employee_name: string;
  email: string;
  function?: { functionName: string };
  departamento?: string;
  telefone1: string;
  hasUser: boolean;
}

interface EmployeeSearchInputProps {
  onSelect: (employee: Employee | null) => void;
  error?: string;
  placeholder?: string;
}

export default function EmployeeSearchInput({
  onSelect,
  error,
  placeholder = "Buscar funcionário sem usuário por nome, email ou função...",
}: EmployeeSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { employeesWithoutUser, loading, fetchEmployeesWithoutUser } =
    useEmployees();

  useEffect(() => {
    fetchEmployeesWithoutUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1 && employeesWithoutUser.length > 0) {
      const filtered = employeesWithoutUser.filter(
        (emp) =>
          emp.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.function?.functionName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
      setFilteredEmployees(filtered);
      setShowDropdown(true);
    } else {
      setFilteredEmployees([]);
      setShowDropdown(false);
    }
  }, [searchTerm, employeesWithoutUser]);

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSearchTerm(employee.employee_name);
    setShowDropdown(false);
    onSelect(employee);
  };

  const handleClear = () => {
    setSelectedEmployee(null);
    setSearchTerm("");
    setFilteredEmployees([]);
    onSelect(null);
  };

  if (loading) {
    return (
      <div className="p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Carregando funcionários...</p>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative">
      {selectedEmployee ? (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium text-gray-800 dark:text-white/90">
                {selectedEmployee.employee_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedEmployee.function?.functionName || "Sem função"} •{" "}
                {selectedEmployee.email || "Sem email"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 1 && setShowDropdown(true)}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {showDropdown && filteredEmployees.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 max-h-60 overflow-y-auto">
              {filteredEmployees.map((employee) => (
                <button
                  key={employee.id}
                  type="button"
                  onClick={() => handleSelectEmployee(employee)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
                >
                  <div className="font-medium text-gray-800 dark:text-white/90">
                    {employee.employee_name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {employee.function?.functionName || "Sem função"}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {employee.email || "Sem email"}
                  </div>
                </button>
              ))}
            </div>
          )}
          {showDropdown &&
            filteredEmployees.length === 0 &&
            searchTerm.length > 1 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-4 text-center">
                <p className="text-sm text-gray-500">
                  Nenhum funcionário disponível para criar usuário
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Apenas funcionários sem usuário são exibidos
                </p>
              </div>
            )}
        </>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
