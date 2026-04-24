// src/services/openai.service.ts (versão modificada)
import api from './api-setup';
import { MOCK_REQUESTS, MOCK_STATS, generateMockRequests } from './openai-mock.service';

// Variável de controle para usar mock ou API real
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'false' || process.env.NODE_ENV === 'development';

export interface OpenAIRequest {
  id: string;
  timestamp: string;
  endpoint: string;
  model: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  cost_usd: number;
  status: 'success' | 'error' | 'rate_limited' | 'timeout';
  response_time_ms: number;
  userId?: string;
  userEmail?: string;
  request_type: 'analysis' | 'chat' | 'image' | 'embeddings' | 'other';
  error_message?: string;
  success: boolean;
}

export interface OpenAIStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalTokens: number;
  totalCostUSD: number;
  avgResponseTime: number;
  mostUsedModel: string;
  requestsToday: number;
}

export interface OpenAIFilters {
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
  model: string;
  requestType: string;
  search: string;
  minTokens: number;
  maxTokens: number;
}

// Funções auxiliares para filtrar dados mockados
const filterMockRequests = (requests: OpenAIRequest[], filters?: Partial<OpenAIFilters>): OpenAIRequest[] => {
  if (!filters) return requests;

  return requests.filter(req => {
    // Filtro por data
    if (filters.dateRange?.start && new Date(req.timestamp) < new Date(filters.dateRange.start)) {
      return false;
    }
    if (filters.dateRange?.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      if (new Date(req.timestamp) > endDate) return false;
    }

    // Filtro por status
    if (filters.status && req.status !== filters.status) return false;

    // Filtro por modelo
    if (filters.model && req.model !== filters.model) return false;

    // Filtro por tipo de requisição
    if (filters.requestType && req.request_type !== filters.requestType) return false;

    // Filtro por busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        req.id.toLowerCase().includes(searchLower) ||
        (req.userId?.toLowerCase().includes(searchLower) || false) ||
        (req.userEmail?.toLowerCase().includes(searchLower) || false) ||
        req.endpoint.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtro por tokens
    if (filters.minTokens && req.total_tokens < filters.minTokens) return false;
    if (filters.maxTokens && req.total_tokens > filters.maxTokens) return false;

    return true;
  });
};

export const openaiApi = {
  // Buscar todas as requisições
  getAllRequests: async (filters?: Partial<OpenAIFilters>) => {
    if (USE_MOCK) {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filteredRequests = filterMockRequests(MOCK_REQUESTS, filters);
      
      return {
        data: filteredRequests,
        total: filteredRequests.length,
        page: 1,
        limit: 50
      };
    }

    const params: any = {};
    if (filters?.dateRange?.start) params.startDate = filters.dateRange.start;
    if (filters?.dateRange?.end) params.endDate = filters.dateRange.end;
    if (filters?.status) params.status = filters.status;
    if (filters?.model) params.model = filters.model;
    if (filters?.requestType) params.requestType = filters.requestType;
    if (filters?.search) params.search = filters.search;

    const response = await api.get('/openai/requests', { params });
    return response.data;
  },

  // Buscar estatísticas
  getStats: async (period: 'today' | 'week' | 'month' | 'all' = 'month') => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Filtrar requests por período
      const now = new Date();
      let filteredRequests = [...MOCK_REQUESTS];
      
      if (period === 'today') {
        const today = now.toISOString().split('T')[0];
        filteredRequests = MOCK_REQUESTS.filter(r => r.timestamp.includes(today));
      } else if (period === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        filteredRequests = MOCK_REQUESTS.filter(r => new Date(r.timestamp) >= weekAgo);
      } else if (period === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filteredRequests = MOCK_REQUESTS.filter(r => new Date(r.timestamp) >= monthAgo);
      }
      
      // Calcular estatísticas
      const stats = {
        totalRequests: filteredRequests.length,
        successfulRequests: filteredRequests.filter(r => r.status === 'success').length,
        failedRequests: filteredRequests.filter(r => r.status !== 'success').length,
        totalTokens: filteredRequests.reduce((sum, r) => sum + r.total_tokens, 0),
        totalCostUSD: filteredRequests.reduce((sum, r) => sum + r.cost_usd, 0),
        avgResponseTime: filteredRequests.reduce((sum, r) => sum + r.response_time_ms, 0) / filteredRequests.length,
        mostUsedModel: Object.entries(
          filteredRequests.reduce((acc: {[key: string]: number}, r) => {
            acc[r.model] = (acc[r.model] || 0) + 1;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A',
        requestsToday: filteredRequests.filter(r => {
          const today = new Date().toISOString().split('T')[0];
          return r.timestamp.includes(today);
        }).length
      };
      
      return stats;
    }

    const response = await api.get(`/openai/stats?period=${period}`);
    return response.data;
  },

  // Testar conexão com OpenAI
  testConnection: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { 
        success: true, 
        message: 'Conexão com OpenAI estabelecida com sucesso (MOCK)',
        models: ['gpt-4', 'gpt-3.5-turbo']
      };
    }

    const response = await api.post('/openai/test-connection');
    return response.data;
  },

  // Limpar cache/requisições antigas
  clearOldRequests: async (days: number = 30) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { 
        success: true, 
        message: `${Math.floor(Math.random() * 50)} requisições antigas removidas (MOCK)`,
        deletedCount: Math.floor(Math.random() * 50)
      };
    }

    const response = await api.delete(`/openai/clear-old?days=${days}`);
    return response.data;
  },

  // Buscar modelos disponíveis
  getAvailableModels: async () => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        models: [
          'gpt-4',
          'gpt-4-turbo',
          'gpt-3.5-turbo',
          'dall-e-3',
          'whisper-1',
          'text-embedding-ada-002'
        ]
      };
    }

    const response = await api.get('/openai/models');
    return response.data;
  },

  // Buscar uso por dia (para gráficos)
  getUsageByDay: async (days: number = 7) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const usage = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        usage.push({
          date: date.toISOString().split('T')[0],
          requests: Math.floor(Math.random() * 50) + 10,
          tokens: Math.floor(Math.random() * 50000) + 5000,
          cost: parseFloat((Math.random() * 2).toFixed(2))
        });
      }
      
      return usage;
    }

    const response = await api.get(`/openai/usage/daily?days=${days}`);
    return response.data;
  },
};