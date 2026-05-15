// frontend/src/hooks/useRoles.ts
import { useState, useEffect } from 'react';
import { roleService, IRole } from '../services/role.service';

export const useRoles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const data = await roleService.getAllRoles();
        setRoles(data);
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