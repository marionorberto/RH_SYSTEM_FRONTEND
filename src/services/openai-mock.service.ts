// src/services/openai-mock.service.ts
import { OpenAIRequest, OpenAIStats, OpenAIFilters } from './openai.service';

// Função para gerar dados mockados
export const generateMockRequests = (count: number = 50): OpenAIRequest[] => {
  const models = [
    'gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'dall-e-3', 
    'whisper', 'text-embedding-ada-002'
  ];
  
  const endpoints = [
    '/v1/chat/completions',
    '/v1/completions',
    '/v1/images/generations',
    '/v1/embeddings',
    '/v1/audio/transcriptions'
  ];
  
  const statuses: Array<'success' | 'error' | 'rate_limited' | 'timeout'> = [
    'success', 'success', 'success', 'success', 'error', 'rate_limited'
  ];
  
  const requestTypes: Array<'analysis' | 'chat' | 'image' | 'embeddings' | 'other'> = [
    'analysis', 'chat', 'image', 'embeddings', 'other'
  ];

  const requests: OpenAIRequest[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));

    const promptTokens = Math.floor(Math.random() * 500) + 50;
    const completionTokens = Math.floor(Math.random() * 300) + 20;
    const totalTokens = promptTokens + completionTokens;
    
    // Cálculo aproximado de custo (valores por 1K tokens)
    const costPer1KTokens = 0.002; // Aproximado para GPT-3.5
    const costUSD = (totalTokens / 1000) * costPer1KTokens;

    const status = statuses[Math.floor(Math.random() * statuses.length)] as any;
    const isSuccess = status === 'success';

    requests.push({
      id: `req_${Math.random().toString(36).substring(2, 15)}`,
      timestamp: date.toISOString(),
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      model: models[Math.floor(Math.random() * models.length)],
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      cost_usd: parseFloat(costUSD.toFixed(4)),
      status: status,
      response_time_ms: Math.floor(Math.random() * 3000) + 200,
      userId: Math.random() > 0.3 ? `user_${Math.floor(Math.random() * 100)}` : undefined,
      userEmail: Math.random() > 0.3 ? `user${Math.floor(Math.random() * 100)}@example.com` : undefined,
      request_type: requestTypes[Math.floor(Math.random() * requestTypes.length)],
      error_message: isSuccess ? undefined : 'Rate limit exceeded or timeout',
      success: isSuccess
    });
  }

  // Ordenar por timestamp (mais recentes primeiro)
  return requests.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Calcular estatísticas a partir dos requests
export const calculateStatsFromRequests = (requests: OpenAIRequest[]): OpenAIStats => {
  const successfulRequests = requests.filter(r => r.status === 'success').length;
  const failedRequests = requests.filter(r => r.status !== 'success').length;
  const totalTokens = requests.reduce((sum, r) => sum + r.total_tokens, 0);
  const totalCostUSD = requests.reduce((sum, r) => sum + r.cost_usd, 0);
  
  // Calcular modelo mais usado
  const modelCounts = requests.reduce((acc: {[key: string]: number}, r) => {
    acc[r.model] = (acc[r.model] || 0) + 1;
    return acc;
  }, {});
  
  const mostUsedModel = Object.entries(modelCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Requisições de hoje
  const today = new Date().toISOString().split('T')[0];
  const requestsToday = requests.filter(r => r.timestamp.includes(today)).length;

  return {
    totalRequests: requests.length,
    successfulRequests,
    failedRequests,
    totalTokens,
    totalCostUSD,
    avgResponseTime: requests.reduce((sum, r) => sum + r.response_time_ms, 0) / requests.length,
    mostUsedModel,
    requestsToday
  };
};

// Mock data inicial
export const MOCK_REQUESTS = generateMockRequests(100);
export const MOCK_STATS = calculateStatsFromRequests(MOCK_REQUESTS);