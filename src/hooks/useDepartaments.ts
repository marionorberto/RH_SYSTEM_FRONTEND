// frontend/src/hooks/useDepartaments.ts
import { useState, useEffect, useCallback } from 'react';
import { departamentService, IDepartament, IPaginatedResponse } from '../services/departament.service';
import toast from 'react-hot-toast';

interface UseDepartamentsReturn {
  departaments: IDepartament[];
  filteredDepartaments: IDepartament[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchDepartaments: () => Promise<void>;
  fetchPaginatedDepartaments: (page: number, search?: string) => Promise<IPaginatedResponse | null>;
  createDepartament: (name: string) => Promise<IDepartament | null>;
  updateDepartament: (id: string, name: string) => Promise<IDepartament | null>;
  deleteDepartament: (id: string) => Promise<boolean>;
  pagination: {
    page: number;
    total: number;
    totalPages: number;
    limit: number;
  };
  setPage: (page: number) => void;
}

export const useDepartaments = (initialPage: number = 1, initialLimit: number = 10): UseDepartamentsReturn => {
  const [departaments, setDepartaments] = useState<IDepartament[]>([]);
  const [filteredDepartaments, setFilteredDepartaments] = useState<IDepartament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(initialPage);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit] = useState<number>(initialLimit);

  const fetchDepartaments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await departamentService.getAllDepartaments();
      setDepartaments(data);
      setFilteredDepartaments(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar departamentos');
      toast.error('Erro ao carregar departamentos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPaginatedDepartaments = useCallback(async (pageNum: number, search?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await departamentService.getPaginatedDepartaments(pageNum, limit, search);
      setTotal(response.total);
      setTotalPages(response.totalPages);
      setPage(response.page);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar departamentos');
      toast.error('Erro ao carregar departamentos');
      return null;
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const createDepartament = useCallback(async (name: string): Promise<IDepartament | null> => {
    try {
      setLoading(true);
      const newDepartament = await departamentService.createDepartament({ departamentName: name });
      await fetchDepartaments();
      toast.success('Departamento criado com sucesso!');
      return newDepartament;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao criar departamento';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchDepartaments]);

  const updateDepartament = useCallback(async (id: string, name: string): Promise<IDepartament | null> => {
    try {
      setLoading(true);
      const updatedDepartament = await departamentService.updateDepartament(id, { departamentName: name });
      await fetchDepartaments();
      toast.success('Departamento atualizado com sucesso!');
      return updatedDepartament;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao atualizar departamento';
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchDepartaments]);

  const deleteDepartament = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await departamentService.deleteDepartament(id);
      await fetchDepartaments();
      toast.success('Departamento deletado com sucesso!');
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Erro ao deletar departamento';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchDepartaments]);

  // Filtrar departamentos baseado no searchTerm
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDepartaments(departaments);
    } else {
      const filtered = departaments.filter(dept =>
        dept.departamentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDepartaments(filtered);
    }
  }, [searchTerm, departaments]);

  // Carregar dados iniciais
  useEffect(() => {
    fetchDepartaments();
  }, [fetchDepartaments]);

  return {
    departaments,
    filteredDepartaments,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    fetchDepartaments,
    fetchPaginatedDepartaments,
    createDepartament,
    updateDepartament,
    deleteDepartament,
    pagination: {
      page,
      total,
      totalPages,
      limit,
    },
    setPage,
  };
};