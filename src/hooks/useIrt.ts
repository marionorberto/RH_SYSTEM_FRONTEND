// frontend/src/hooks/useIrt.ts
import { useState, useEffect, useCallback } from 'react';
import { irtService, IIrt } from '../services/irt.service';
import toast from 'react-hot-toast';

interface UseIrtReturn {
  irtItems: IIrt[];
  loading: boolean;
  error: string | null;
  fetchIrtItems: () => Promise<void>;
  createIrtItem: (data: { inferiorLimit: number; superiorLimit?: number | null; tax: number; FixedValue?: number }) => Promise<IIrt | null>;
  updateIrtItem: (id: string, data: { inferiorLimit?: number; superiorLimit?: number | null; tax?: number; FixedValue?: number }) => Promise<IIrt | null>;
  deleteIrtItem: (id: string) => Promise<boolean>;
  calculateIrt: (salary: number) => Promise<{ irtValue: number; netSalary: number } | null>;
}

export const useIrt = (): UseIrtReturn => {
  const [irtItems, setIrtItems] = useState<IIrt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIrtItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await irtService.getAllIrt();
      // Ordenar por limite inferior
      const sorted = [...data].sort((a, b) => a.inferiorLimit - b.inferiorLimit);
      setIrtItems(sorted);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar tabela IRT');
      toast.error('Erro ao carregar tabela IRT');
    } finally {
      setLoading(false);
    }
  }, []);

  const createIrtItem = useCallback(async (data: { inferiorLimit: number; superiorLimit?: number | null; tax: number; FixedValue?: number }): Promise<IIrt | null> => {
    try {
      setLoading(true);
      const newItem = await irtService.createIrt(data);
      await fetchIrtItems();
      toast.success('Faixa IRT criada com sucesso!');
      return newItem;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao criar faixa IRT';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchIrtItems]);

  const updateIrtItem = useCallback(async (id: string, data: { inferiorLimit?: number; superiorLimit?: number | null; tax?: number; FixedValue?: number }): Promise<IIrt | null> => {
    try {
      setLoading(true);
      const updated = await irtService.updateIrt(id, data);
      await fetchIrtItems();
      toast.success('Faixa IRT atualizada com sucesso!');
      return updated;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao atualizar faixa IRT';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchIrtItems]);

  const deleteIrtItem = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await irtService.deleteIrt(id);
      await fetchIrtItems();
      toast.success('Faixa IRT deletada com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao deletar faixa IRT';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchIrtItems]);

  const calculateIrt = useCallback(async (salary: number) => {
    try {
      return await irtService.calculateIrt(salary);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao calcular IRT';
      toast.error(errorMsg);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchIrtItems();
  }, [fetchIrtItems]);

  return {
    irtItems,
    loading,
    error,
    fetchIrtItems,
    createIrtItem,
    updateIrtItem,
    deleteIrtItem,
    calculateIrt,
  };
};