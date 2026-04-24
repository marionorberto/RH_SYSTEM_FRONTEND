// src/hooks/useDashboardRefresh.ts
import { useEffect, useState } from 'react';

export const useDashboardRefresh = (interval = 30000) => {
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshCount(prev => prev + 1);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return refreshCount;
};