// frontend/src/services/app-settings.service.ts
import api from './api-setup';

export interface IAppSettings {
  id: string;
  emailHost: string;
  emailPort: string;
  emailUser: string;
  emailPassword?: string;
  emailSecure: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordExpiryDays: number;
  twoFactorAuth: boolean;
  requireStrongPassword: boolean;
  autoBackup: boolean;
  backupFrequency: string;
  backupTime: string;
  backupRetention: number;
  timezone: string;
  dateFormat: string;
  defaultLanguage: string;
  createdAt: string;
  updatedAt: string;
}

class AppSettingsService {
  private baseUrl = '/app-settings';

  async getSettings(): Promise<IAppSettings | null> {
    try {
      const response = await api.get(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar configurações globais:', error);
      return null;
    }
  }

  async updateSettings(data: Partial<IAppSettings>): Promise<IAppSettings> {
    const response = await api.put(this.baseUrl, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao atualizar configurações');
  }
}

export const appSettingsService = new AppSettingsService();