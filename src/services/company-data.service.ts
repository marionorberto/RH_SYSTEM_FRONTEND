// frontend/src/services/company-data.service.ts
import api from './api-setup';

export interface ICompanyData {
  id: string;
  companyName: string;
  companyNIF: string;
  tickectModel?: string;
  smtpEmail?: string;
  smtpPassword?: string;
  SocialSecurityPassword?: string;
  corporativeEmail?: string;
  linkedin?: string;
  whatsapp?: string;
  instagram?: string;
  phone1?: string;
  phone2?: string;
  street?: string;
  neighbourhood?: string;
  houseNumber?: string;
  fax?: string;
  logotipo64?: string;
  postalCode?: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICompanyDataResponse {
  statusCode: number;
  method: string;
  message: string;
  data: ICompanyData | null;
  path: string;
  timestamp: number;
}

class CompanyDataService {
  private baseUrl = '/company-data';

  async getCompanyData(): Promise<ICompanyData | null> {
    try {
      const response = await api.get<ICompanyDataResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar dados da empresa:', error);
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createCompanyData(data: Partial<ICompanyData>): Promise<ICompanyData> {
    const response = await api.post<ICompanyDataResponse>(this.baseUrl, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao criar dados da empresa');
  }

  async updateCompanyData(data: Partial<ICompanyData>): Promise<ICompanyData> {
    const response = await api.put<ICompanyDataResponse>(this.baseUrl, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao atualizar dados da empresa');
  }

  async updateLogo(base64Logo: string): Promise<ICompanyData> {
    return this.updateCompanyData({ logotipo64: base64Logo });
  }
}

export const companyDataService = new CompanyDataService();