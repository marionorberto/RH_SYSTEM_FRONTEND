import api from './api-setup';

export interface OverallStats {
  // Usuários
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  userGrowthRate: number;
  
  // Análises
  totalAnalyses: number;
  analysesThisMonth: number;
  recommendedAnalyses: number;
  recommendationRate: number;
  
  // OpenAI
  totalOpenAIRequests: number;
  openAICostThisMonth: number;
  openAIErrorRate: number;
  avgResponseTime: number;
  
  // Segurança
  greenAnalyses: number;
  yellowAnalyses: number;
  redAnalyses: number;
  safetyComplianceRate: number;
  
  // Performance
  platformUptime: number;
  avgLoadTime: number;
  apiSuccessRate: number;
}

export interface TrendData {
  date: string;
  analyses: number;
  users: number;
  requests: number;
  cost: number;
}

export interface TopUsers {
  id: string;
  name: string;
  email: string;
  analysesCount: number;
  lastActive: string;
  status: string;
}

export interface TopModels {
  model: string;
  count: number;
  totalTokens: number;
  totalCost: number;
  avgResponseTime: number;
}

export interface TimeRange {
  start: string;
  end: string;
  label: string;
}

export const reportsApi = {
  // Estatísticas gerais
  getOverallStats: async (range: 'today' | 'week' | 'month' | 'quarter' | 'year' = 'month') => {
    const response = await api.get(`/admin/reports/overall-stats?range=${range}`);
    return response.data.data; // Ajuste para pegar o data da resposta padronizada
  },

  // Dados de tendência
  getTrendData: async (days: number = 30) => {
    const response = await api.get(`/admin/reports/trend-data?days=${days}`);
    return response.data.data;
  },

  // Top usuários
  getTopUsers: async (limit: number = 10) => {
    const response = await api.get(`/admin/reports/top-users?limit=${limit}`);
    return response.data.data;
  },

  // Top modelos OpenAI
  getTopModels: async () => {
    const response = await api.get('/admin/reports/top-models');
    return response.data.data;
  },

  // Exportar relatório
  exportReport: async (format: 'pdf' | 'csv' | 'excel', data: any) => {
    const response = await api.post(`/admin/reports/export/${format}`, data, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Comparativo períodos
  getPeriodComparison: async (current: TimeRange, previous: TimeRange) => {
    const response = await api.post('/admin/reports/period-comparison', {
      current,
      previous,
    });
    return response.data.data;
  },
};