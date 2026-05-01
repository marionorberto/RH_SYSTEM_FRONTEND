// frontend/src/services/fiscal-year.service.ts
import api from './api-setup';

export interface IFiscalYear {
  id: string;
  year: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFiscalYearResponse {
  statusCode: number;
  method: string;
  message: string;
  data: IFiscalYear[] | IFiscalYear | null;
  path: string;
  timestamp: number;
}

class FiscalYearService {
  private baseUrl = '/fiscal-years';

  async getAllFiscalYears(): Promise<IFiscalYear[]> {
    try {
      const response = await api.get<IFiscalYearResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IFiscalYear[];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar anos fiscais:', error);
      throw error;
    }
  }

  async getCurrentFiscalYear(): Promise<IFiscalYear | null> {
    try {
      const response = await api.get<IFiscalYearResponse>(`${this.baseUrl}/current`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IFiscalYear;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar ano fiscal atual:', error);
      return null;
    }
  }

  async getFiscalYearById(id: string): Promise<IFiscalYear | null> {
    try {
      const response = await api.get<IFiscalYearResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IFiscalYear;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar ano fiscal:', error);
      throw error;
    }
  }

  async createFiscalYear(data: { year: string }): Promise<IFiscalYear> {
    const response = await api.post<IFiscalYearResponse>(this.baseUrl, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data as IFiscalYear;
    }
    throw new Error(response.data.message || 'Erro ao criar ano fiscal');
  }

  async updateFiscalYear(id: string, data: { year: string }): Promise<IFiscalYear> {
    const response = await api.put<IFiscalYearResponse>(`${this.baseUrl}/${id}`, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data as IFiscalYear;
    }
    throw new Error(response.data.message || 'Erro ao atualizar ano fiscal');
  }

  async deleteFiscalYear(id: string): Promise<void> {
    const response = await api.delete<IFiscalYearResponse>(`${this.baseUrl}/${id}`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao deletar ano fiscal');
    }
  }
}

export const fiscalYearService = new FiscalYearService();