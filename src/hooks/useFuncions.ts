// frontend/src/hooks/useFunctions.ts
import { useState, useEffect, useCallback } from 'react';
import { functionService, IFunction, IPaginatedResponse } from '../../src/services/funcion.service';
import toast from 'react-hot-toast';

interface UseFunctionsReturn {
  functions: IFunction[];
  filteredFunctions: IFunction[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchFunctions: () => Promise<void>;
  fetchPaginatedFunctions: (page: number, search?: string) => Promise<IPaginatedResponse | null>;
  createFunction: (name: string) => Promise<IFunction | null>;
  updateFunction: (id: string, name: string) => Promise<IFunction | null>;
  deleteFunction: (id: string) => Promise<boolean>;
  getEmployeeCount: (functionId: string) => number;
  canDelete: (functionId: string) => boolean;
  pagination: {
    page: number;
    total: number;
    totalPages: number;
    limit: number;
  };
  setPage: (page: number) => void;
}

export const useFunctions = (initialPage: number = 1, initialLimit: number = 10): UseFunctionsReturn => {
  const [functions, setFunctions] = useState<IFunction[]>([]);
  const [filteredFunctions, setFilteredFunctions] = useState<IFunction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(initialPage);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit] = useState<number>(initialLimit);

  const fetchFunctions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await functionService.getAllFunctions();
      setFunctions(data);
      setFilteredFunctions(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar funções');
      toast.error('Erro ao carregar funções');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPaginatedFunctions = useCallback(async (pageNum: number, search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await functionService.getPaginatedFunctions(pageNum, limit, search);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setPage(response.page);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar funções');
      toast.error('Erro ao carregar funções');
      return null;
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const createFunction = useCallback(async (name: string): Promise<IFunction | null> => {
    try {
      setLoading(true);
      const newFunction = await functionService.createFunction({ functionName: name });
      await fetchFunctions();
      toast.success('Função criada com sucesso!');
      return newFunction;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao criar função';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchFunctions]);

  const updateFunction = useCallback(async (id: string, name: string): Promise<IFunction | null> => {
    try {
      setLoading(true);
      const updatedFunction = await functionService.updateFunction(id, { functionName: name });
      await fetchFunctions();
      toast.success('Função atualizada com sucesso!');
      return updatedFunction;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao atualizar função';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchFunctions]);

  const deleteFunction = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await functionService.deleteFunction(id);
      await fetchFunctions();
      toast.success('Função deletada com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao deletar função';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchFunctions]);

  const getEmployeeCount = useCallback((functionId: string): number => {
    const func = functions.find(f => f.id === functionId);
    return func?.employees?.length || 0;
  }, [functions]);

  const canDelete = useCallback((functionId: string): boolean => {
    return getEmployeeCount(functionId) === 0;
  }, [getEmployeeCount]);

  // Filtrar funções baseado no searchTerm
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFunctions(functions);
    } else {
      const filtered = functions.filter(func =>
        func.functionName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFunctions(filtered);
    }
  }, [searchTerm, functions]);

  // Carregar dados iniciais
  useEffect(() => {
    fetchFunctions();
  }, [fetchFunctions]);

  return {
    functions,
    filteredFunctions,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchFunctions,
    fetchPaginatedFunctions,
    createFunction,
    updateFunction,
    deleteFunction,
    getEmployeeCount,
    canDelete,
    pagination: {
      page,
      total,
      totalPages,
      limit,
    },
    setPage,
  };
};