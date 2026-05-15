// frontend/src/hooks/useFormData.ts
import { useState, useEffect } from 'react';
import { bankService, IBank } from '../services/bank.service';
import { categoryService, ICategory } from '../services/category.service';
import { nacionalityService, INacionality } from '../services/nacionality.service';
import { functionService, IFunction } from '../services/funcion.service';

interface UseFormDataReturn {
  functions: IFunction[];
  banks: IBank[];
  categories: ICategory[];
  nationalities: INacionality[];
  loading: boolean;
  error: string | null;
}

export const useFormData = (): UseFormDataReturn => {
  const [functions, setFunctions] = useState<IFunction[]>([]);
  const [banks, setBanks] = useState<IBank[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [nationalities, setNationalities] = useState<INacionality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar todos os dados em paralelo
        const [functionsData, banksData, categoriesData, nationalitiesData] = await Promise.all([
          functionService.getAllFunctions(),
          bankService.getAllBanks(),
          categoryService.getAllCategories(),
          nacionalityService.getAllNacionalities(),
        ]);

        setFunctions(functionsData);
        setBanks(banksData);
        setCategories(categoriesData);
        setNationalities(nationalitiesData);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados do formulário');
        console.error('Error loading form data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return {
    functions,
    banks,
    categories,
    nationalities,
    loading,
    error,
  };
};