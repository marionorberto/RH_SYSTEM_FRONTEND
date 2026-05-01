// frontend/src/hooks/useFiscalYears.ts
import { useState, useEffect, useCallback } from 'react';
import { fiscalYearService, IFiscalYear } from '../services/fiscal-year.service';
import toast from 'react-hot-toast';

interface UseFiscalYearsReturn {
  fiscalYears: IFiscalYear[];
  loading: boolean;
  error: string | null;
  fetchFiscalYears: () => Promise<void>;
  createFiscalYear: (year: string) => Promise<IFiscalYear | null>;
  updateFiscalYear: (id: string, year: string) => Promise<IFiscalYear | null>;
  deleteFiscalYear: (id: string) => Promise<boolean>;
  getCurrentYear: () => IFiscalYear | undefined;
}

export const useFiscalYears = (): UseFiscalYearsReturn => {
  const [fiscalYears, setFiscalYears] = useState<IFiscalYear[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFiscalYears = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fiscalYearService.getAllFiscalYears();
      setFiscalYears(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar anos fiscais');
      toast.error('Erro ao carregar anos fiscais');
    } finally {
      setLoading(false);
    }
  }, []);

  const createFiscalYear = useCallback(async (year: string): Promise<IFiscalYear | null> => {
    try {
      setLoading(true);
      const newItem = await fiscalYearService.createFiscalYear({ year });
      await fetchFiscalYears();
      toast.success('Ano fiscal criado com sucesso!');
      return newItem;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao criar ano fiscal';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchFiscalYears]);

  const updateFiscalYear = useCallback(async (id: string, year: string): Promise<IFiscalYear | null> => {
    try {
      setLoading(true);
      const updated = await fiscalYearService.updateFiscalYear(id, { year });
      await fetchFiscalYears();
      toast.success('Ano fiscal atualizado com sucesso!');
      return updated;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao atualizar ano fiscal';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchFiscalYears]);

  const deleteFiscalYear = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await fiscalYearService.deleteFiscalYear(id);
      await fetchFiscalYears();
      toast.success('Ano fiscal deletado com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao deletar ano fiscal';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchFiscalYears]);

  const getCurrentYear = useCallback(() => {
    const currentYearStr = new Date().getFullYear().toString();
    return fiscalYears.find(fy => fy.year === currentYearStr);
  }, [fiscalYears]);

  useEffect(() => {
    fetchFiscalYears();
  }, [fetchFiscalYears]);

  return {
    fiscalYears,
    loading,
    error,
    fetchFiscalYears,
    createFiscalYear,
    updateFiscalYear,
    deleteFiscalYear,
    getCurrentYear,
  };
};