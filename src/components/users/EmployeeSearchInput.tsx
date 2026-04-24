// src/components/Users/EmployeeSearchInput.tsx
import { useState, useEffect, useRef } from "react";

// Interface baseada na entidade Employee
interface Employee {
  id: string;
  nomeFuncionario: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  genero: string;
  estadoCivil: string;
  telefone1: string;
  email: string;
  cargo: string;
  departamento: string;
  active: boolean;
}

// Dados mockados de funcionários
const mockEmployees: Employee[] = [
  {
    id: "1",
    nomeFuncionario: "João Silva",
    nomePai: "Antonio Silva",
    nomeMae: "Maria Silva",
    dataNascimento: "1990-05-15",
    genero: "MASCULINO",
    estadoCivil: "CASADO(A)",
    telefone1: "+244 923 456 789",
    email: "joao.silva@empresa.com",
    cargo: "Desenvolvedor Sênior",
    departamento: "Tecnologia",
    active: true,
  },
  {
    id: "2",
    nomeFuncionario: "Maria Santos",
    nomePai: "José Santos",
    nomeMae: "Ana Santos",
    dataNascimento: "1988-08-22",
    genero: "FEMININO",
    estadoCivil: "SOLTEIRO(A)",
    telefone1: "+244 923 456 788",
    email: "maria.santos@empresa.com",
    cargo: "Analista de RH",
    departamento: "Recursos Humanos",
    active: true,
  },
  {
    id: "3",
    nomeFuncionario: "Carlos Oliveira",
    nomePai: "Roberto Oliveira",
    nomeMae: "Carla Oliveira",
    dataNascimento: "1995-03-10",
    genero: "MASCULINO",
    estadoCivil: "SOLTEIRO(A)",
    telefone1: "+244 923 456 787",
    email: "carlos.oliveira@empresa.com",
    cargo: "Analista Financeiro",
    departamento: "Financeiro",
    active: true,
  },
  {
    id: "4",
    nomeFuncionario: "Ana Costa",
    nomePai: "Paulo Costa",
    nomeMae: "Lucia Costa",
    dataNascimento: "1992-11-30",
    genero: "FEMININO",
    estadoCivil: "CASADO(A)",
    telefone1: "+244 923 456 786",
    email: "ana.costa@empresa.com",
    cargo: "Coordenadora Comercial",
    departamento: "Comercial",
    active: true,
  },
  {
    id: "5",
    nomeFuncionario: "Pedro Almeida",
    nomePai: "Fernando Almeida",
    nomeMae: "Isabel Almeida",
    dataNascimento: "1985-07-19",
    genero: "MASCULINO",
    estadoCivil: "CASADO(A)",
    telefone1: "+244 923 456 785",
    email: "pedro.almeida@empresa.com",
    cargo: "CTO",
    departamento: "Tecnologia",
    active: true,
  },
];

interface EmployeeSearchInputProps {
  onSelect: (employee: Employee | null) => void;
  error?: string;
  placeholder?: string;
}

export default function EmployeeSearchInput({
  onSelect,
  error,
  placeholder = "Buscar funcionário por nome, email ou cargo...",
}: EmployeeSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    if (searchTerm.length > 1) {
      const filtered = mockEmployees.filter(
        (emp) =>
          emp.nomeFuncionario
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.departamento.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredEmployees(filtered);
      setShowDropdown(true);
    } else {
      setFilteredEmployees([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSearchTerm(employee.nomeFuncionario);
    setShowDropdown(false);
    onSelect(employee);
  };

  const handleClear = () => {
    setSelectedEmployee(null);
    setSearchTerm("");
    setFilteredEmployees([]);
    onSelect(null);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {selectedEmployee ? (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-medium text-gray-800 dark:text-white/90">
                {selectedEmployee.nomeFuncionario}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedEmployee.cargo} • {selectedEmployee.departamento}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {selectedEmployee.email} • {selectedEmployee.telefone1}
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
                    {employee.nomeFuncionario}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {employee.cargo} • {employee.departamento}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {employee.email}
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
                  Nenhum funcionário encontrado
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Tente buscar por nome, email ou cargo
                </p>
              </div>
            )}
        </>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
