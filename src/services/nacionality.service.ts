// frontend/src/services/nacionality.service.ts
import api from './api-setup';

export interface INacionality {
  id: string;
  isocode: string;
  nomeNacionalidade: string;
  createdAt: string;
  updatedAt: string;
}

export interface INacionalityResponse {
  statusCode: number;
  method: string;
  message: string;
  data: INacionality[] | INacionality | null;
  path: string;
  timestamp: number;
}

class NacionalityService {
  private baseUrl = '/nacionalities';

  async getAllNacionalities(): Promise<INacionality[]> {
    try {
      const response = await api.get<INacionalityResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as INacionality[];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar nacionalidades:', error);
      return [];
    }
  }

  async getNacionalityById(id: string): Promise<INacionality | null> {
    try {
      const response = await api.get<INacionalityResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as INacionality;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar nacionalidade:', error);
      return null;
    }
  }
}

export const nacionalityService = new NacionalityService();