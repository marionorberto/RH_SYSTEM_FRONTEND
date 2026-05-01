// frontend/src/services/irt.service.ts
import api from './api-setup';

export interface IIrt {
  id: string;
  inferiorLimit: number;
  superiorLimit: number | null;
  tax: number;
  FixedValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface IIrtResponse {
  statusCode: number;
  method: string;
  message: string;
  data: IIrt[] | IIrt | null;
  path: string;
  timestamp: number;
}

class IrtService {
  private baseUrl = '/irt';

  async getAllIrt(): Promise<IIrt[]> {
    try {
      const response = await api.get<IIrtResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IIrt[];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar tabela IRT:', error);
      throw error;
    }
  }

  async getIrtById(id: string): Promise<IIrt | null> {
    try {
      const response = await api.get<IIrtResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IIrt;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar faixa IRT:', error);
      throw error;
    }
  }

  async createIrt(data: { inferiorLimit: number; superiorLimit?: number | null; tax: number; FixedValue?: number }): Promise<IIrt> {
    const response = await api.post<IIrtResponse>(this.baseUrl, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data as IIrt;
    }
    throw new Error(response.data.message || 'Erro ao criar faixa IRT');
  }

  async updateIrt(id: string, data: { inferiorLimit?: number; superiorLimit?: number | null; tax?: number; FixedValue?: number }): Promise<IIrt> {
    const response = await api.put<IIrtResponse>(`${this.baseUrl}/${id}`, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data as IIrt;
    }
    throw new Error(response.data.message || 'Erro ao atualizar faixa IRT');
  }

  async deleteIrt(id: string): Promise<void> {
    const response = await api.delete<IIrtResponse>(`${this.baseUrl}/${id}`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao deletar faixa IRT');
    }
  }

  async calculateIrt(salary: number): Promise<{ irtValue: number; netSalary: number }> {
    const response = await api.post(`${this.baseUrl}/calculate`, { salary });
    if (response.data.statusCode === 200) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao calcular IRT');
  }
}

export const irtService = new IrtService();