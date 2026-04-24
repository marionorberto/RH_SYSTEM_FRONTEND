// src/services/notification.service.ts
import api from './api-setup'; // ajuste conforme sua configuração

export interface NotificationData {
  title: string;
  subtitle?: string;
  content: string;
  category: string;
  emoji: string;
  urlAction?: string;
}

export enum NotificationCategory {
  ALERT = 'alert',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  UPDATE = 'update'
}

export enum NotificationCreator {
  ADMIN = 'admin'
}

class NotificationService {
  // Enviar notificação como administrador
  async sendAdminNotification(data: NotificationData): Promise<any> {
    try {
      console.log('category', data);
      const response = await api.post('/notifications/create/admin-notification', {
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        category: data.category,
        emoji: data.emoji,
        urlAction: data.urlAction
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      throw error;
    }
  }

  // Enviar alerta para todos os usuários
  async sendAlertToAllUsers(content: string): Promise<any> {
    const alertData: NotificationData = {
      title: 'Alerta Importante',
      subtitle: 'Atenção a todos os usuários',
      content,
      category: NotificationCategory.ALERT,
      emoji: '🚨'
    };

    return this.sendAdminNotification(alertData);
  }

  // Enviar notificação geral
  async sendNotificationToAllUsers(content: string, title?: string): Promise<any> {
    const notificationData: NotificationData = {
      title: title || 'Nova Notificação',
      subtitle: 'Atualização importante',
      content,
      category: NotificationCategory.INFO,
      emoji: '🔔'
    };

    return this.sendAdminNotification(notificationData);
  }

  // Enviar notificação de aviso
  async sendWarningNotification(content: string): Promise<any> {
    const warningData: NotificationData = {
      title: 'Aviso Importante',
      subtitle: 'Atenção necessária',
      content,
      category: NotificationCategory.WARNING,
      emoji: '⚠️'
    };

    return this.sendAdminNotification(warningData);
  }
}

export const notificationService = new NotificationService();