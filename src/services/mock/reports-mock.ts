// src/services/mock/reports-mock.ts
export const mockOverallStats = {
  totalUsers: 1250,
  activeUsers: 850,
  newUsersThisMonth: 125,
  userGrowthRate: 15.5,
  totalAnalyses: 8920,
  analysesThisMonth: 1250,
  recommendedAnalyses: 7120,
  recommendationRate: 79.8,
  totalOpenAIRequests: 18560,
  openAICostThisMonth: 245.75,
  openAIErrorRate: 2.3,
  avgResponseTime: 450,
  greenAnalyses: 7120,
  yellowAnalyses: 1250,
  redAnalyses: 550,
  safetyComplianceRate: 93.8,
  platformUptime: 99.9,
  avgLoadTime: 125,
  apiSuccessRate: 98.5,
};

export const mockTrendData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  return {
    date: date.toISOString().split('T')[0],
    analyses: Math.floor(Math.random() * 100) + 50,
    users: Math.floor(Math.random() * 30) + 15,
    requests: Math.floor(Math.random() * 200) + 100,
    cost: Math.random() * 10 + 5,
  };
});

export const mockTopUsers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', analysesCount: 156, lastActive: '2024-01-15', status: 'active' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', analysesCount: 142, lastActive: '2024-01-14', status: 'active' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', analysesCount: 128, lastActive: '2024-01-15', status: 'active' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@email.com', analysesCount: 115, lastActive: '2024-01-13', status: 'active' },
  { id: '5', name: 'Carlos Lima', email: 'carlos@email.com', analysesCount: 98, lastActive: '2024-01-12', status: 'active' },
  { id: '6', name: 'Juliana Pereira', email: 'juliana@email.com', analysesCount: 87, lastActive: '2024-01-11', status: 'active' },
  { id: '7', name: 'Ricardo Alves', email: 'ricardo@email.com', analysesCount: 76, lastActive: '2024-01-10', status: 'active' },
  { id: '8', name: 'Fernanda Rocha', email: 'fernanda@email.com', analysesCount: 65, lastActive: '2024-01-09', status: 'active' },
  { id: '9', name: 'Lucas Mendes', email: 'lucas@email.com', analysesCount: 54, lastActive: '2024-01-08', status: 'active' },
  { id: '10', name: 'Camila Souza', email: 'camila@email.com', analysesCount: 43, lastActive: '2024-01-07', status: 'active' },
];

export const mockTopModels = [
  { model: 'gpt-4', count: 8500, totalTokens: 1250000, totalCost: 145.75, avgResponseTime: 520 },
  { model: 'gpt-3.5-turbo', count: 6500, totalTokens: 850000, totalCost: 67.25, avgResponseTime: 380 },
  { model: 'gpt-4-turbo', count: 3200, totalTokens: 520000, totalCost: 89.50, avgResponseTime: 610 },
  { model: 'dall-e-3', count: 360, totalTokens: 0, totalCost: 32.50, avgResponseTime: 1250 },
];