// frontend/src/hooks/useAppSettings.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { appSettingsService, IAppSettings } from '../services/app-setting.service';

export const useAppSettings = () => {
  const [settings, setSettings] = useState<IAppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appSettingsService.getSettings();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (data: Partial<IAppSettings>) => {
    try {
      setSaving(true);
      const updated = await appSettingsService.updateSettings(data);
      setSettings(updated);
      toast.success('Configurações globais salvas!');
      return updated;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar');
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, saving, error, updateSettings };
};