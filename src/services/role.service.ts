// frontend/src/services/role.service.ts

export interface IRole {
  id: string;
  roleName: string;
  descriptionRole: string;
}

export interface IRoleResponse {
  statusCode: number;
  method: string;
  message: string;
  data: IRole[] | IRole | null;
  path: string;
  timestamp: number;
}

class RoleService {
  private baseUrl = '/roles';

  async getAllRoles(): Promise<IRole[]> {
    try {
      // Como o backend pode não ter este endpoint, usamos dados fixos baseados nos seeds
      // Se tiver endpoint, descomentar a chamada abaixo
      // const response = await api.get<IRoleResponse>(this.baseUrl);
      // if (response.data.statusCode === 200 && response.data.data) {
      //   return response.data.data as IRole[];
      // }
      
      // Dados fixos baseados nos seeds
      return [
        { id: '1', roleName: 'admin', descriptionRole: 'Administrador do sistema' },
        { id: '2', roleName: 'rh', descriptionRole: 'Recursos Humanos' },
        { id: '3', roleName: 'funcionario', descriptionRole: 'Funcionário comum' },
      ];
    } catch (error: any) {
      console.error('Erro ao buscar perfis:', error);
      return [];
    }
  }

  async getRoleById(id: string): Promise<IRole | null> {
    const roles = await this.getAllRoles();
    return roles.find(r => r.id === id) || null;
  }
}

export const roleService = new RoleService();