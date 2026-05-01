// frontend/src/hooks/useUsers.ts
import { useState, useEffect, useCallback } from 'react';
import { userService, IUser, ICreateUserData, IUpdateUserData } from '../services/user.service';
import toast from 'react-hot-toast';

interface UseUsersReturn {
  users: IUser[];
  filteredUsers: IUser[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  fetchUsers: () => Promise<void>;
  createUser: (data: ICreateUserData) => Promise<IUser | null>;
  updateUser: (data: IUpdateUserData) => Promise<IUser | null>;
  deleteUser: (id: string) => Promise<boolean>;
  toggleUserStatus: (id: string) => Promise<boolean>;
  resetPassword: (userId: string, newPassword: string) => Promise<boolean>;
  statistics: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
  };
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar usuários');
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (data: ICreateUserData): Promise<IUser | null> => {
    try {
      setLoading(true);
      const newUser = await userService.createUser(data);
      await fetchUsers();
      toast.success('Usuário criado com sucesso!');
      return newUser;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao criar usuário';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (data: IUpdateUserData): Promise<IUser | null> => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(data);
      await fetchUsers();
      toast.success('Usuário atualizado com sucesso!');
      return updatedUser;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao atualizar usuário';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      await fetchUsers();
      toast.success('Usuário deletado com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao deletar usuário';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const toggleUserStatus = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await userService.toggleUserStatus(id);
      await fetchUsers();
      toast.success('Status do usuário alterado com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao alterar status';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const resetPassword = useCallback(async (userId: string, newPassword: string): Promise<boolean> => {
    try {
      // Nota: Implementar endpoint específico para reset de senha no backend
      // Por enquanto, usando o updatePassword
      await userService.updatePassword('', newPassword);
      toast.success('Senha resetada com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao resetar senha';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }
  }, []);

  // Filtrar usuários
  useEffect(() => {
    let filtered = [...users];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de role
    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Filtro de status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((user) =>
        statusFilter === 'active' ? user.active : !user.active
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, statusFilter, users]);

  // Estatísticas
// frontend/src/hooks/useUsers.ts (parte das estatísticas)
  // Estatísticas - garantir que sempre retorna um objeto válido
  const statistics = {
    total: users?.length || 0,
    active: users?.filter((u) => u.active).length || 0,
    inactive: users?.filter((u) => !u.active).length || 0,
    admins: users?.filter((u) => u.role === 'admin' || u.isSuperAdmin).length || 0,
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    filteredUsers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    resetPassword,
    statistics,
  };
};