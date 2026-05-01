// frontend/src/services/bank.service.ts
import api from './api-setup';

export interface IBank {
  id: string;
  bank_name: string;
  sigla: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBankResponse {
  statusCode: number;
  method: string;
  message: string;
  data: IBank[] | IBank | null;
  path: string;
  timestamp: number;
}

class BankService {
  private baseUrl = '/banks';

  async getAllBanks(): Promise<IBank[]> {
    try {
      const response = await api.get<IBankResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IBank[];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar bancos:', error);
      throw error;
    }
  }

  async getBankById(id: string): Promise<IBank | null> {
    try {
      const response = await api.get<IBankResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IBank;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar banco:', error);
      throw error;
    }
  }

  async createBank(data: { bank_name: string; sigla: string; code: string }): Promise<IBank> {
    const response = await api.post<IBankResponse>(this.baseUrl, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data as IBank;
    }
    throw new Error(response.data.message || 'Erro ao criar banco');
  }

  async updateBank(id: string, data: { bank_name: string; sigla: string; code: string }): Promise<IBank> {
    const response = await api.put<IBankResponse>(`${this.baseUrl}/${id}`, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data as IBank;
    }
    throw new Error(response.data.message || 'Erro ao atualizar banco');
  }

  async deleteBank(id: string): Promise<void> {
    const response = await api.delete<IBankResponse>(`${this.baseUrl}/${id}`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao deletar banco');
    }
  }
}

export const bankService = new BankService();