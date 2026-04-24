// frontend/src/hooks/useAuth.ts
import { useState } from 'react';
import { useAuth as useAuthContext } from '../context/AuthContext';
import api from '../services/api-setup';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn: contextSignIn, signOut, user } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await contextSignIn(email, password);
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || 'Erro ao fazer login';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao enviar email';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao resetar senha';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put('/users/password/user/update', {
        atualPassword: currentPassword,
        newPassword: newPassword,
      });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar senha';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout: signOut,
    forgotPassword,
    resetPassword,
    updatePassword,
  };
};