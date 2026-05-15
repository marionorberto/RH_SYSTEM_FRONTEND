// frontend/src/hooks/useUserSettings.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { IUserSettings, userSettingsService } from '../services/user-setting.service';

export const useUserSettings = () => {
  const [settings, setSettings] = useState<IUserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userSettingsService.getMySettings();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (data: Partial<IUserSettings>) => {
    try {
      setSaving(true);
      const updated = await userSettingsService.updateMySettings(data);
      setSettings(updated);
      toast.success('Suas preferências foram salvas!');
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