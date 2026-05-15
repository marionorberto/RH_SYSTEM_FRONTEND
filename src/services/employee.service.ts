// frontend/src/services/employee.service.ts
import api from './api-setup';

export interface IEmployee {
  id: string;
  employee_name: string;
  fatherName: string;
  motherName: string;
  birthday: string;
  gender: string;
  civilState: string;
  nationalityId: string;
  typeDoc1: string;
  docNumber1: string;
  typeDoc2: string;
  docNumber2: string;
  academic_level: string;
  telefone1: string;
  telefone2: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  instagram: string;
  street: string;
  neighbourhood: string;
  houseNumber: string;
  functionId: string;
  categoryId: string;
  bankId: string;
  numSegsocial: string;
  numContaBanc: string;
  iBanknta: string;
  estado: boolean;
  hasUser: boolean;
  userId?: string;
  function?: { functionName: string };
  category?: { categoryName: string };
  bank?: { bank_name: string };
  nationality?: { nomeNacionalidade: string };
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeResponse {
  statusCode: number;
  method: string;
  message: string;
  data: any;
  path: string;
  timestamp: number;
}

class EmployeeService {
  private baseUrl = '/employees';

  async getAllEmployees(): Promise<IEmployee[]> {
    try {
      const response = await api.get<IEmployeeResponse>(`${this.baseUrl}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar funcionários:', error);
      return [];
    }
  }

  async getEmployeesWithoutUser(): Promise<IEmployee[]> {
    try {
      const allEmployees = await this.getAllEmployees();
      // Filtrar funcionários que não têm usuário associado
      return allEmployees.filter(emp => !emp.hasUser);
    } catch (error: any) {
      console.error('Erro ao buscar funcionários sem usuário:', error);
      return [];
    }
  }

  async getEmployeeById(id: string): Promise<IEmployee | null> {
    try {
      const response = await api.get<IEmployeeResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar funcionário:', error);
      return null;
    }
  }

  async createEmployee(data: Partial<IEmployee>): Promise<IEmployee> {
    const response = await api.post<IEmployeeResponse>(this.baseUrl, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao criar funcionário');
  }

  async updateEmployee(id: string, data: Partial<IEmployee>): Promise<IEmployee> {
    const response = await api.put<IEmployeeResponse>(`${this.baseUrl}/${id}`, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao atualizar funcionário');
  }

  async deleteEmployee(id: string): Promise<void> {
    const response = await api.delete<IEmployeeResponse>(`${this.baseUrl}/${id}`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao deletar funcionário');
    }
  }

  async toggleEmployeeStatus(id: string): Promise<void> {
    const response = await api.patch<IEmployeeResponse>(`${this.baseUrl}/${id}/toggle-status`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao alterar status do funcionário');
    }
  }
}

export const employeeService = new EmployeeService();