// frontend/src/services/function.service.ts
import api from './api-setup';

export interface IFunction {
  id: string;
  functionName: string;
  createdAt: string;
  updatedAt: string;
  employees?: { id: string }[];
}

export interface IFunctionResponse {
  statusCode: number;
  method: string;
  message: string;
  data: IFunction[] | IFunction | null;
  path: string;
  timestamp: number;
}

export interface IPaginatedResponse {
  items: IFunction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class FunctionService {
  private baseUrl = '/functions';

  async getAllFunctions(): Promise<IFunction[]> {
    try {
      const response = await api.get<IFunctionResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IFunction[];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar funções:', error);
      throw error;
    }
  }

  async getPaginatedFunctions(page: number = 1, limit: number = 10, search?: string): Promise<IPaginatedResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/paginated`, {
        params: { page, limit, search }
      });
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return { items: [], total: 0, page: 1, limit: 10, totalPages: 0 };
    } catch (error: any) {
      console.error('Erro ao buscar funções paginadas:', error);
      throw error;
    }
  }

  async getFunctionById(id: string): Promise<IFunction | null> {
    try {
      const response = await api.get<IFunctionResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as IFunction;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar função:', error);
      throw error;
    }
  }

  async createFunction(data: { functionName: string }): Promise<IFunction> {
    const response = await api.post<IFunctionResponse>(this.baseUrl, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data as IFunction;
    }
    throw new Error(response.data.message || 'Erro ao criar função');
  }

  async updateFunction(id: string, data: { functionName: string }): Promise<IFunction> {
    const response = await api.put<IFunctionResponse>(`${this.baseUrl}/${id}`, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data as IFunction;
    }
    throw new Error(response.data.message || 'Erro ao atualizar função');
  }

  async deleteFunction(id: string): Promise<void> {
    const response = await api.delete<IFunctionResponse>(`${this.baseUrl}/${id}`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao deletar função');
    }
  }
}

export const functionService = new FunctionService();