// frontend/src/hooks/useRoles.ts
import { useState, useEffect } from 'react';

export interface IRole {
  id: string;
  roleName: string;
  descriptionRole: string;
}

export const useRoles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        // Nota: Criar endpoint /roles no backend se necessário
        // Por enquanto, usando dados dos seeds
        const mockRoles: IRole[] = [
          { id: '1', roleName: 'admin', descriptionRole: 'Administrador do sistema' },
          { id: '2', roleName: 'rh', descriptionRole: 'Recursos Humanos' },
          { id: '3', roleName: 'funcionario', descriptionRole: 'Funcionário comum' },
        ];
        setRoles(mockRoles);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar perfis');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
};