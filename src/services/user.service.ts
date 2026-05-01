// frontend/src/services/user.service.ts
import api from './api-setup';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password?: string;
  active: boolean;
  isSuperAdmin: boolean;
  isEmailVerified: boolean;
  registrationCompleted: boolean;
  role?: string;
  roles?: string[];
  employee?: any;
  userRoles?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUserData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  active?: boolean;
  isSuperAdmin?: boolean;
}

export interface IUpdateUserData {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  active?: boolean;
  isSuperAdmin?: boolean;
}

export interface IUserResponse {
  statusCode: number;
  method: string;
  message: string;
  data: any;
  path: string;
  timestamp: number;
}

class UserService {
  private baseUrl = '/users';

  async getAllUsers(): Promise<IUser[]> {
    try {
      const response = await api.get<IUserResponse>(`${this.baseUrl}/all`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data[0]?.users || [];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<IUser | null> {
    try {
      const response = await api.get<IUserResponse>(`${this.baseUrl}/user`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar usuário atual:', error);
      return null;
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      // Nota: O backend não tem rota GET /users/:id, usando o método existente
      const response = await api.get<IUserResponse>(`${this.baseUrl}/user`);
      if (response.data.statusCode === 200 && response.data.data) {
        const user = response.data.data;
        return user.id === id ? user : null;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  async createUser(data: ICreateUserData): Promise<IUser> {
    const response = await api.post<IUserResponse>(`${this.baseUrl}/create/user`, data);
    if (response.data.statusCode === 201 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao criar usuário');
  }

  async updateUser(data: IUpdateUserData): Promise<IUser> {
    const response = await api.put<IUserResponse>(`${this.baseUrl}/update/user`, data);
    if (response.data.statusCode === 200 && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Erro ao atualizar usuário');
  }

  async deleteUser(id: string): Promise<void> {
    const response = await api.delete<IUserResponse>(`${this.baseUrl}/delete/user/${id}`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao deletar usuário');
    }
  }

  async toggleUserStatus(userId: string): Promise<void> {
    const response = await api.post<IUserResponse>(`${this.baseUrl}/enable-user/`, { userId });
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao alterar status do usuário');
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const response = await api.post<IUserResponse>(`${this.baseUrl}/check/email`, { email });
    return response.data.data?.registered || false;
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await api.put<IUserResponse>(`${this.baseUrl}/password/user/update`, {
      atualPassword: currentPassword,
      newPassword: newPassword,
    });
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || 'Erro ao atualizar senha');
    }
  }
}

export const userService = new UserService();