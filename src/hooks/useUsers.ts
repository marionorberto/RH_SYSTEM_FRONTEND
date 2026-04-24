// frontend/src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import  api  from '../services/api-setup';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  active: boolean;
  isEmailVerified: boolean;
  createdAt: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/all');
      setUsers(response.data.data[0].users);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: any) => {
    try {
      const response = await api.post('/users/create/user', userData);
      await fetchUsers();
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Erro ao criar usuário');
    }
  };

  const updateUser = async (userData: any) => {
    try {
      const response = await api.put('/users/update/user', userData);
      await fetchUsers();
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Erro ao atualizar usuário');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete(`/users/delete/user/${userId}`);
      await fetchUsers();
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Erro ao deletar usuário');
    }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      const response = await api.post('/users/enable-user/', { userId });
      await fetchUsers();
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Erro ao alterar status');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    refreshUsers: fetchUsers,
  };
};