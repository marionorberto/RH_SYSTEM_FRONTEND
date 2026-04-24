// frontend/src/hooks/useVerification.ts
import { useState } from 'react';
import  api  from '../services/api-setup';

export const useVerification = () => {
  const [loading, setLoading] = useState(false);

  const sendVerificationCode = async (email: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/send-registration-code', { email });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao enviar código' 
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailCode = async (email: string, code: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/verify-email-code', { email, code });
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Código inválido' 
      };
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordResetCode = async (email: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/send-password-reset-code', { email });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao enviar código' 
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyPasswordResetCode = async (email: string, code: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/verify-password-reset-code', { email, code });
      return { success: true, resetToken: response.data.resetToken };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Código inválido' 
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordWithCode = async (email: string, resetToken: string, newPassword: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/reset-password2', { email, resetToken, newPassword });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao resetar senha' 
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendVerificationCode,
    verifyEmailCode,
    sendPasswordResetCode,
    verifyPasswordResetCode,
    resetPasswordWithCode,
  };
};