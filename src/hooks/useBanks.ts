// frontend/src/hooks/useBanks.ts
import { useState, useEffect, useCallback } from 'react';
import { bankService, IBank } from '../services/bank.service';
import toast from 'react-hot-toast';

interface UseBanksReturn {
  banks: IBank[];
  loading: boolean;
  error: string | null;
  fetchBanks: () => Promise<void>;
  createBank: (data: { bank_name: string; sigla: string; code: string }) => Promise<IBank | null>;
  updateBank: (id: string, data: { bank_name: string; sigla: string; code: string }) => Promise<IBank | null>;
  deleteBank: (id: string) => Promise<boolean>;
  isCodeUnique: (code: string, excludeId?: string) => boolean;
}

export const useBanks = (): UseBanksReturn => {
  const [banks, setBanks] = useState<IBank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bankService.getAllBanks();
      setBanks(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar bancos');
      toast.error('Erro ao carregar bancos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBank = useCallback(async (data: { bank_name: string; sigla: string; code: string }): Promise<IBank | null> => {
    try {
      setLoading(true);
      const newItem = await bankService.createBank(data);
      await fetchBanks();
      toast.success('Banco criado com sucesso!');
      return newItem;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao criar banco';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchBanks]);

  const updateBank = useCallback(async (id: string, data: { bank_name: string; sigla: string; code: string }): Promise<IBank | null> => {
    try {
      setLoading(true);
      const updated = await bankService.updateBank(id, data);
      await fetchBanks();
      toast.success('Banco atualizado com sucesso!');
      return updated;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao atualizar banco';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchBanks]);

  const deleteBank = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await bankService.deleteBank(id);
      await fetchBanks();
      toast.success('Banco deletado com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao deletar banco';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBanks]);

  const isCodeUnique = useCallback((code: string, excludeId?: string): boolean => {
    return !banks.some(bank => bank.code === code && bank.id !== excludeId);
  }, [banks]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  return {
    banks,
    loading,
    error,
    fetchBanks,
    createBank,
    updateBank,
    deleteBank,
    isCodeUnique,
  };
};