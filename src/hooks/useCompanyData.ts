// frontend/src/hooks/useCompanyData.ts
import { useState, useEffect, useCallback } from 'react';
import { companyDataService, ICompanyData } from '../services/company-data.service';

interface UseCompanyDataReturn {
  companyData: ICompanyData | null;
  loading: boolean;
  error: string | null;
  fetchCompanyData: () => Promise<void>;
  createCompanyData: (data: Partial<ICompanyData>) => Promise<ICompanyData | null>;
  updateCompanyData: (data: Partial<ICompanyData>) => Promise<ICompanyData | null>;
  updateLogo: (base64Logo: string) => Promise<ICompanyData | null>;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const useCompanyData = (): UseCompanyDataReturn => {
  const [companyData, setCompanyData] = useState<ICompanyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyDataService.getCompanyData();
      setCompanyData(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados da empresa');
      console.error('Fetch company data error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCompanyData = useCallback(async (data: Partial<ICompanyData>) => {
    try {
      setLoading(true);
      setError(null);
      const newData = await companyDataService.createCompanyData(data);
      setCompanyData(newData);
      setIsEditing(false);
      return newData;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar dados da empresa');
      console.error('Create company data error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCompanyData = useCallback(async (data: Partial<ICompanyData>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedData = await companyDataService.updateCompanyData(data);
      setCompanyData(updatedData);
      setIsEditing(false);
      return updatedData;
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar dados da empresa');
      console.error('Update company data error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLogo = useCallback(async (base64Logo: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedData = await companyDataService.updateLogo(base64Logo);
      setCompanyData(updatedData);
      return updatedData;
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar logotipo');
      console.error('Update logo error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  return {
    companyData,
    loading,
    error,
    fetchCompanyData,
    createCompanyData,
    updateCompanyData,
    updateLogo,
    isEditing,
    setIsEditing,
  };
};