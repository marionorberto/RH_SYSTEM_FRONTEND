// src/types/notification.types.ts
export enum EnumCategory {
  ALERT = 'alert',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  UPDATE = 'update'
}

export enum EnumStatus {
  READ = 'read',
  UNREAD = 'unread'
}

export enum EnumNotificationCreator {
  ADMIN = 'admin',
  SYSTEM = 'system',
  USER = 'user'
}

export interface CreateNotificationDto {
  title: string;
  subtitle?: string;
  content: string;
  category: EnumCategory;
  emoji: string;
  urlAction?: string;
}