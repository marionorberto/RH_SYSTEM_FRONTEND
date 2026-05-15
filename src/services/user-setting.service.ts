// frontend/src/services/user-settings.service.ts
import api from './api-setup';

export interface IUserSettings {
  id: string;
  userId: string;
  theme: string;
  sidebarCollapsed: boolean;
  animationsEnabled: boolean;
  itemsPerPage: number;
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  createdAt: string;
  updatedAt: string;
}

class UserSettingsService {
  private baseUrl = '/user-settings';

  async getMySettings(): Promise<IUserSettings | null> {
    try {
      const response = await api.get(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar configurações do usuário:', error);
      return null;
    }
  }

  async updateMySettings(data: Partial<IUserSettings>): Promise<IUserSettings> {
    const response = await api.put(this.baseUrl, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao atualizar configurações do usuário');
  }
}

export const userSettingsService = new UserSettingsService();