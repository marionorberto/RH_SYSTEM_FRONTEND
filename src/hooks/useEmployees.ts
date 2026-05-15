// frontend/src/hooks/useEmployees.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { employeeService, IEmployee } from '../services/employee.service';

interface UseEmployeesReturn {
  employees: IEmployee[];
  filteredEmployees: IEmployee[];
  employeesWithoutUser: IEmployee[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  fetchEmployees: () => Promise<void>;
  fetchEmployeesWithoutUser: () => Promise<void>;
  createEmployee: (data: Partial<IEmployee>) => Promise<IEmployee | null>;
  updateEmployee: (id: string, data: Partial<IEmployee>) => Promise<IEmployee | null>;
  deleteEmployee: (id: string) => Promise<boolean>;
  toggleEmployeeStatus: (id: string) => Promise<boolean>;
  getEmployeeById: (id: string) => IEmployee | undefined;
  statistics: {
    total: number;
    active: number;
    inactive: number;
    withUser: number;
    withoutUser: number;
  };
}

export const useEmployees = (): UseEmployeesReturn => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);
  const [employeesWithoutUser, setEmployeesWithoutUser] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAllEmployees();
      setEmployees(data || []);
      
      // Atualizar lista de funcionários sem usuário
      const withoutUser = (data || []).filter(emp => !emp.hasUser);
      setEmployeesWithoutUser(withoutUser);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar funcionários');
      toast.error('Erro ao carregar funcionários');
      setEmployees([]);
      setEmployeesWithoutUser([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEmployeesWithoutUser = useCallback(async () => {
    try {
      const data = await employeeService.getEmployeesWithoutUser();
      setEmployeesWithoutUser(data);
    } catch (err: any) {
      console.error('Erro ao buscar funcionários sem usuário:', err);
    }
  }, []);

  const createEmployee = useCallback(async (data: Partial<IEmployee>): Promise<IEmployee | null> => {
    try {
      setLoading(true);
      const newEmployee = await employeeService.createEmployee(data);
      await fetchEmployees();
      toast.success('Funcionário criado com sucesso!');
      return newEmployee;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao criar funcionário';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchEmployees]);

  const updateEmployee = useCallback(async (id: string, data: Partial<IEmployee>): Promise<IEmployee | null> => {
    try {
      setLoading(true);
      const updatedEmployee = await employeeService.updateEmployee(id, data);
      await fetchEmployees();
      toast.success('Funcionário atualizado com sucesso!');
      return updatedEmployee;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao atualizar funcionário';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchEmployees]);

  const deleteEmployee = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await employeeService.deleteEmployee(id);
      await fetchEmployees();
      toast.success('Funcionário deletado com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao deletar funcionário';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEmployees]);

  const toggleEmployeeStatus = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await employeeService.toggleEmployeeStatus(id);
      await fetchEmployees();
      toast.success('Status do funcionário alterado com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao alterar status';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEmployees]);

  const getEmployeeById = useCallback((id: string) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  // Filtrar funcionários
  useEffect(() => {
    let filtered = [...employees];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.employee_name.toLowerCase().includes(searchLower) ||
          emp.email?.toLowerCase().includes(searchLower) ||
          emp.function?.functionName?.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((emp) =>
        statusFilter === 'active' ? emp.estado : !emp.estado
      );
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, statusFilter, employees]);

  // Estatísticas
  const statistics = {
    total: employees.length,
    active: employees.filter((e) => e.estado).length,
    inactive: employees.filter((e) => !e.estado).length,
    withUser: employees.filter((e) => e.hasUser).length,
    withoutUser: employees.filter((e) => !e.hasUser).length,
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    filteredEmployees,
    employeesWithoutUser,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    fetchEmployees,
    fetchEmployeesWithoutUser,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    toggleEmployeeStatus,
    getEmployeeById,
    statistics,
  };
};