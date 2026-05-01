// frontend/src/services/departament.service.ts
import api from './api-setup';

export interface IDepartament {
  id: string;
  departamentName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDepartamentResponse {
  statusCode: number;
  method: string;
  message: string;
  data: IDepartament[] | IDepartament | null;
  path: string;
  timestamp: number;
}

export interface IPaginatedResponse {
  items: IDepartament[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class DepartamentService {
  private baseUrl = '/departaments';

  async getAllDepartaments(): Promise<IDepartament[]> {
    try {
      const response = await api.get<IDepartamentResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IDepartament[];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar departamentos:', error);
      throw error;
    }
  }

  async getPaginatedDepartaments(page: number = 1, limit: number = 10, search?: string): Promise<IPaginatedResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/paginated`, {
        params: { page, limit, search }
      });
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return { items: [], total: 0, page: 1, limit: 10, totalPages: 0 };
    } catch (error: any) {
      console.error('Erro ao buscar departamentos paginados:', error);
      throw error;
    }
  }

  async getDepartamentById(id: string): Promise<IDepartament | null> {
    try {
      const response = await api.get<IDepartamentResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IDepartament;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar departamento:', error);
      throw error;
    }
  }

  async createDepartament(data: { departamentName: string }): Promise<IDepartament> {
    const response = await api.post<IDepartamentResponse>(this.baseUrl, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data as IDepartament;
    }
    throw new Error(response.data.message || 'Erro ao criar departamento');
  }

  async updateDepartament(id: string, data: { departamentName: string }): Promise<IDepartament> {
    const response = await api.put<IDepartamentResponse>(`${this.baseUrl}/${id}`, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data as IDepartament;
    }
    throw new Error(response.data.message || 'Erro ao atualizar departamento');
  }

  async deleteDepartament(id: string): Promise<void> {
    const response = await api.delete<IDepartamentResponse>(`${this.baseUrl}/${id}`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao deletar departamento');
    }
  }
}

export const departamentService = new DepartamentService();