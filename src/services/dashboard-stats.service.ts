// src/services/dashboard-stats.service.ts
import api from './api-setup';
import { MealAnalysis } from './meal-service';

  // Primeiro, defina uma interface apropriada
interface WeeklyAnalytics {
  labels: string[];
  series: number[];
}


// export interface DashboardStats {
//   totalUsers: number;
//   totalAnalyses: number;
//   monthlyAnalyses: Array<{ day: string; count: number }>;
//   weeklyAnalytics: Array<{ day: string; count: number }>;
//   accuracyRate: number;
//   growthRate: number;
//   statusDistribution: {
//     GREEN: number;
//     YELLOW: number;
//     RED: number;
//   };
//   recentActivities: Array<{
//     id: string;
//     userId: string;
//     userName: string;
//     userEmail: string;
//     occasion: string;
//     timestamp: string;
//     status: 'GREEN' | 'YELLOW' | 'RED';
//     isRecommended: boolean;
//   }>;
//   monthlyAdhesion: Array<{ month: string; count: number; percentage: number }>;
// }



interface DashboardStats {
  totalUsers: number;
  totalAnalyses: number;
  monthlyAnalyses: Array<{ day: string; count: number }>;
  weeklyAnalytics: Array<{ day: string; count: number }>;
  accuracyRate: number;
  growthRate: number;
  statusDistribution: {
    GREEN: number;
    YELLOW: number;
    RED: number;
  };
  recentActivities: Array<any>;
  monthlyAdhesion: Array<{ month: string; count: number; percentage: number }>;
  // Novos campos adicionados
  recommendedAnalyses: number;
  notRecommendedAnalyses: number;
  recommendedRate: number;
}

export interface MonthlyAnalytics {
  labels: string[];
  series: number[];
}

export const dashboardStatsService = {

  getDashboardStats2: async (): Promise<DashboardStats> => {
  try {
    // Buscar dados de várias fontes
    const [usersResponse, analysesResponse] = await Promise.all([
      api.get('/users/all'),
      api.get('/meal-analysis/admin/all?limit=1000'),
    ]);

    const totalUsers = usersResponse.data?.data?.[0]?.count || 0;
    const analysesData = analysesResponse.data?.data?.data || [];

    console.log('Total de análises:', analysesData.length);
    console.log('Exemplo de análise:', analysesData[0]);

    // Calcular estatísticas de recomendações
    const totalAnalyses = analysesData.length;
    const recommendedAnalyses = analysesData.filter((a: any) => 
      a.isRecommended === true
    ).length;
    
    const notRecommendedAnalyses = analysesData.filter((a: any) => 
      a.isRecommended === false
    ).length;

    console.log('Recomendadas:', recommendedAnalyses);
    console.log('Não recomendadas:', notRecommendedAnalyses);

    // Calcular taxa de análises recomendadas
    const accuracyRate = totalAnalyses > 0 ? 
      (recommendedAnalyses / totalAnalyses) * 100 : 0;

    // Distribuição de status (agora baseado em safetyStatus)
    const statusDistribution = {
      GREEN: analysesData.filter((a: any) => 
        a.safetyStatus === 'GREEN'
      ).length,
      YELLOW: analysesData.filter((a: any) => 
        a.safetyStatus === 'YELLOW'
      ).length,
      RED: analysesData.filter((a: any) => 
        a.safetyStatus === 'RED'
      ).length,
    };

    // Calcular crescimento (comparar esta semana com a anterior)
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(now.getDate() - 14);

    const thisWeekAnalyses = analysesData.filter((a: any) => {
      if (a.timestamp) {
        const date = new Date(a.timestamp);
        return date >= lastWeek && date <= now;
      }
      return false;
    }).length;

    const lastWeekAnalyses = analysesData.filter((a: any) => {
      if (a.timestamp) {
        const date = new Date(a.timestamp);
        return date >= twoWeeksAgo && date < lastWeek;
      }
      return false;
    }).length;

    const growthRate = lastWeekAnalyses > 0 ? 
      ((thisWeekAnalyses - lastWeekAnalyses) / lastWeekAnalyses) * 100 : 0;

    // Atividades recentes (últimas 5)
    const recentActivities = analysesData
      .slice(0, 5)
      .map((analysis: any) => ({
        id: analysis.id,
        userId: analysis.user?.id,
        userName: `${analysis.user?.firstname || ''} ${analysis.user?.lastname || ''}`.trim() || 'Usuário',
        userEmail: analysis.user?.email || 'N/A',
        occasion: analysis.occasion,
        timestamp: analysis.timestamp,
        status: analysis.safetyStatus || 'GREEN',
        isRecommended: analysis.isRecommended || false,
      }));

    return {
      totalUsers,
      totalAnalyses,
      monthlyAnalyses: [], // Você pode preencher se quiser
      weeklyAnalytics: [], // Você pode preencher se quiser
      accuracyRate,
      growthRate,
      statusDistribution,
      recentActivities,
      monthlyAdhesion: [], // Você pode preencher se quiser
      // Adicionando novos campos para recomendações
      recommendedAnalyses,
      notRecommendedAnalyses,
      recommendedRate: accuracyRate,
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    return getMockStats();
  }
},

  
  // Obter estatísticas gerais do dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      // Buscar dados de várias fontes
      const [usersResponse, analysesResponse, statsResponse] = await Promise.all([
        api.get('/users/all'),
        api.get('/meal-analysis/admin/all?limit=1000'),
        api.get('/meal-analysis/admin/statistics?days=30'),
      ]);



      const totalUsers = usersResponse.data?.data?.[0]?.count || 0;
      const analysesData = analysesResponse.data?.data?.data || [];
      const statsData = statsResponse.data?.data || {};

      // Calcular estatísticas mensais
      const monthlyAnalyses = calculateMonthlyAnalyses(analysesData);
      const weeklyAnalytics = calculateWeeklyAnalytics(analysesData);
      
      // Calcular taxa de precisão (análises recomendadas vs total)
      const totalAnalyses = analysesData.length;
      const recommendedAnalyses = analysesData.filter((a: MealAnalysis) => 
        a.classification?.isRecommended
      ).length;
      const accuracyRate = totalAnalyses > 0 ? (recommendedAnalyses / totalAnalyses) * 100 : 0;
      
      // Calcular taxa de crescimento (última semana vs semana anterior)
      const growthRate = calculateGrowthRate(analysesData);
      
      // Distribuição de status
      const statusDistribution = {
        GREEN: analysesData.filter((a: MealAnalysis) => 
          a.classification?.safetyStatus === 'GREEN'
        ).length,
        YELLOW: analysesData.filter((a: MealAnalysis) => 
          a.classification?.safetyStatus === 'YELLOW'
        ).length,
        RED: analysesData.filter((a: MealAnalysis) => 
          a.classification?.safetyStatus === 'RED'
        ).length,
      };

      // Atividades recentes (últimas 5)
      const recentActivities = analysesData
        .slice(0, 5)
        .map((analysis: MealAnalysis) => ({
          id: analysis.id,
          userId: analysis.userId,
          userName: `${analysis.user?.firstname || ''} ${analysis.user?.lastname || ''}`.trim() || 'Usuário',
          userEmail: analysis.user?.email || 'N/A',
          occasion: analysis.occasion,
          timestamp: analysis.mealTimestamp,
          status: analysis.classification?.safetyStatus || 'GREEN',
          isRecommended: analysis.isRecommended || false,
        }));

      // Adesão mensal
      const monthlyAdhesion = calculateMonthlyAdhesion(analysesData);

      return {
        totalUsers,
        totalAnalyses,
        monthlyAnalyses,
        weeklyAnalytics,
        accuracyRate,
        growthRate,
        statusDistribution,
        recentActivities,
        monthlyAdhesion,
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error);
      return getMockStats();
    }
  },

  // No seu dashboard-stats.service.ts
// getPlatformAdoptionData: async (): Promise<{
//   labels: string[];
//   analysisData: number[];
//   userData: number[];
// }> => {
//   try {
//     const response = await api.get('/meal-analysis/admin/all?limit=1000');
//     const analyses = response.data?.data?.data || [];

//     console.log('Total de análises:', analyses.length);
//     console.log('Primeira análise:', analyses[0]?.timestamp);
//     console.log('Última análise:', analyses[analyses.length - 1]?.timestamp);

//     const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
//     // Encontrar o range de datas das análises
//     let minDate: Date | null = null;
//     let maxDate: Date | null = null;
    
//     analyses.forEach((analysis: any) => {
//       if (analysis.timestamp || analysis.mealTimestamp) {
//         const timestamp = analysis.timestamp || analysis.mealTimestamp;
//         const date = new Date(timestamp);
        
//         if (!minDate || date < minDate) minDate = date;
//         if (!maxDate || date > maxDate) maxDate = date;
//       }
//     });

//     console.log('Data mínima:', minDate?.toLocaleDateString('pt-BR'));
//     console.log('Data máxima:', maxDate?.toLocaleDateString('pt-BR'));

//     // Se não tiver dados, retornar array vazio
//     if (!minDate || !maxDate) {
//       return {
//         labels: monthNames,
//         analysisData: Array(12).fill(0),
//         userData: Array(12).fill(0)
//       };
//     }

//     // Para armazenar usuários únicos por mês/ano
//     const analysisCountByMonth = new Map<string, number>();
//     const uniqueUsersByMonth = new Map<string, Set<string>>();
    
//     // Processar todas as análises
//     analyses.forEach((analysis: any) => {
//       if (analysis.timestamp || analysis.mealTimestamp) {
//         const timestamp = analysis.timestamp || analysis.mealTimestamp;
//         const date = new Date(timestamp);
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
        
//         // Contar análises
//         analysisCountByMonth.set(
//           monthKey, 
//           (analysisCountByMonth.get(monthKey) || 0) + 1
//         );
        
//         // Contar usuários únicos
//         if (analysis.user?.id) {
//           if (!uniqueUsersByMonth.has(monthKey)) {
//             uniqueUsersByMonth.set(monthKey, new Set());
//           }
//           uniqueUsersByMonth.get(monthKey)!.add(analysis.user.id);
//         }
//       }
//     });

//     // Determinar quantos meses mostrar (máximo 12 meses)
//     const startDate = new Date(minDate);
//     const endDate = new Date(maxDate);
    
//     // Garantir que temos pelo menos 12 meses de histórico
//     // Se a diferença for menor que 12 meses, começamos 12 meses atrás
//     const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
//                       (endDate.getMonth() - startDate.getMonth());
    
//     const monthsToShow = Math.min(12, monthsDiff + 1);
    
//     // Gerar dados para os meses disponíveis
//     const labels: string[] = [];
//     const analysisData: number[] = [];
//     const userData: number[] = [];
    
//     // Começar do mês mais antigo disponível
//     let currentDate = new Date(startDate);
//     currentDate.setDate(1); // Garantir que começa no primeiro dia do mês
    
//     for (let i = 0; i < monthsToShow; i++) {
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth();
//       const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
      
//       // Label com mês e ano apenas se o ano for diferente do atual
//       const label = monthNames[month];
//       labels.push(label);
      
//       analysisData.push(analysisCountByMonth.get(monthKey) || 0);
//       userData.push(uniqueUsersByMonth.get(monthKey)?.size || 0);
      
//       // Avançar para o próximo mês
//       currentDate.setMonth(currentDate.getMonth() + 1);
//     }

//     console.log('Dados de adoção:', { 
//       labels, 
//       analysisData, 
//       userData,
//       totalAnalyses: analysisData.reduce((a, b) => a + b, 0),
//       totalUsers: userData.reduce((a, b) => a + b, 0)
//     });
    
//     return { labels, analysisData, userData };
//   } catch (error) {
//     console.error('Erro ao buscar dados de adoção:', error);
//     // Fallback baseado no mês atual
//     const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
//     return {
//       labels: monthNames,
//       analysisData: Array(12).fill(0),
//       userData: Array(12).fill(0)
//     };
//   }
// },

getPlatformAdoptionData: async (): Promise<{
  labels: string[];
  analysisData: number[];
  userData: number[];
}> => {
  try {
    const response = await api.get('/meal-analysis/admin/all?limit=1000');
    const analyses = response.data?.data?.data || [];

    console.log('Total de análises para gráfico:', analyses.length);

    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Usar data da última análise como referência
    let referenceDate = new Date();
    
    // Tentar encontrar a data da última análise
    analyses.forEach((analysis: any) => {
      if (analysis.timestamp || analysis.mealTimestamp) {
        const timestamp = analysis.timestamp || analysis.mealTimestamp;
        const date = new Date(timestamp);
        if (date > referenceDate) referenceDate = date;
      }
    });

    console.log('Data de referência:', referenceDate.toLocaleDateString('pt-BR'));

    // Para armazenar dados
    const analysisCountByMonth = new Map<string, number>();
    const uniqueUsersByMonth = new Map<string, Set<string>>();
    
    // Processar todas as análises
    analyses.forEach((analysis: any) => {
      if (analysis.timestamp || analysis.mealTimestamp) {
        const timestamp = analysis.timestamp || analysis.mealTimestamp;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
        
        analysisCountByMonth.set(monthKey, (analysisCountByMonth.get(monthKey) || 0) + 1);
        
        if (analysis.user?.id) {
          if (!uniqueUsersByMonth.has(monthKey)) {
            uniqueUsersByMonth.set(monthKey, new Set());
          }
          uniqueUsersByMonth.get(monthKey)!.add(analysis.user.id);
        }
      }
    });

    // Gerar dados para os últimos 12 meses
    const labels: string[] = [];
    const analysisData: number[] = [];
    const userData: number[] = [];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(referenceDate);
      date.setMonth(date.getMonth() - i);
      
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
      
      labels.push(monthNames[month]);
      analysisData.push(analysisCountByMonth.get(monthKey) || 0);
      userData.push(uniqueUsersByMonth.get(monthKey)?.size || 0);
    }

    console.log('Dados finais do gráfico:', { labels, analysisData, userData });
    
    return { labels, analysisData, userData };
  } catch (error) {
    console.error('Erro ao buscar dados de adoção:', error);
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    return {
      labels: monthNames,
      analysisData: Array(12).fill(0),
      userData: Array(12).fill(0)
    };
  }
},



// Obter estatísticas mensais para gráficos
getMonthlyAnalytics: async (): Promise<MonthlyAnalytics> => {
  try {
    console.log('iniciando o fetch /meal-analysis/admin/all?limit=1000');
    const response = await api.get('/meal-analysis/admin/all?limit=1000');
    const analyses = response.data?.data?.data || [];
    console.log('Total análises para mensal:', analyses.length);
    
    const monthlyData = new Map<string, number>();
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Encontrar data da última análise
    let referenceDate = new Date();
    analyses.forEach((analysis: any) => {
      if (analysis.timestamp || analysis.mealTimestamp) {
        const timestamp = analysis.timestamp || analysis.mealTimestamp;
        const date = new Date(timestamp);
        if (date > referenceDate) referenceDate = date;
      }
    });
    
    // Agrupar por mês/ano
    analyses.forEach((analysis: any) => {
      if (analysis.timestamp || analysis.mealTimestamp) {
        const timestamp = analysis.timestamp || analysis.mealTimestamp;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
        
        monthlyData.set(monthKey, (monthlyData.get(monthKey) || 0) + 1);
      }
    });

    console.log('Dados agrupados:', Array.from(monthlyData.entries()));

    // Gerar dados para os últimos 12 meses baseados na última análise
    const labels: string[] = [];
    const series: number[] = [];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(referenceDate);
      date.setMonth(date.getMonth() - i);
      
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
      const monthName = monthNames[month];
      
      // Mostrar apenas mês se for do ano atual, senão mostrar ano também
      const label = monthName;
      labels.push(label);
      series.push(monthlyData.get(monthKey) || 0);
    }

    console.log('Resultado final mensal:', { labels, series });
    
    return { labels, series };
  } catch (error) {
    console.error('Erro ao buscar análises mensais:', error);
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return { labels: monthNames, series: Array(12).fill(0) };
  }
},




// Obter dados para o gráfico semanal - VERSÃO CORRIGIDA
getWeeklyAnalytics: async (): Promise<WeeklyAnalytics> => {
  try {
    const response = await api.get('/meal-analysis/admin/all?limit=1000');
    const analyses = response.data?.data?.data || [];
    
    console.log('Total de análises:', analyses.length);
    console.log('Análises:', analyses.map(a => ({
      date: a.date,
      timestamp: a.timestamp
    })));

    // Agrupar por dia da semana (últimos 7 dias incluindo hoje)
    const weeklyData = new Map<string, number>();
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 6); // -6 para incluir 7 dias no total (hoje + 6 dias anteriores)

    // Inicializar todos os dias da última semana com 0
    for (let i = 0; i < 7; i++) {
      const date = new Date(lastWeek);
      date.setDate(lastWeek.getDate() + i);
      const dayName = dayNames[date.getDay()];
      weeklyData.set(dayName, 0);
    }

    // Contar análises por dia
    analyses.forEach((analysis: any) => {
      if (analysis.timestamp) {
        const date = new Date(analysis.timestamp);
        if (date >= lastWeek && date <= now) {
          const dayName = dayNames[date.getDay()];
          weeklyData.set(dayName, (weeklyData.get(dayName) || 0) + 1);
        }
      }
    });

    // Criar array de labels mantendo a ordem dos últimos 7 dias
    const labels: string[] = [];
    const series: number[] = [];
    
    // Gerar os últimos 7 dias na ordem correta
    for (let i = 0; i < 7; i++) {
      const date = new Date(lastWeek);
      date.setDate(lastWeek.getDate() + i);
      const dayName = dayNames[date.getDay()];
      labels.push(dayName);
      series.push(weeklyData.get(dayName) || 0);
    }

    console.log('Resultado final:', { labels, series });
    
    return { labels, series };
  } catch (error) {
    console.error('Erro ao buscar análises semanais:', error);
    return getMockWeeklyAnalytics();
  }
},
};

// Funções auxiliares
function calculateMonthlyAnalyses(analyses: MealAnalysis[]) {
  const monthlyData: Array<{ day: string; count: number }> = [];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Últimos 7 dias
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayName = dayNames[date.getDay()];
    
    const count = analyses.filter(analysis => {
      if (!analysis.mealTimestamp) return false;
      const analysisDate = new Date(analysis.mealTimestamp);
      return analysisDate.toDateString() === date.toDateString();
    }).length;

    monthlyData.push({ day: dayName, count });
  }

  return monthlyData;
}

function calculateWeeklyAnalytics(analyses: MealAnalysis[]) {
  const weeklyData: Array<{ day: string; count: number }> = [];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Inicializar com zeros
  dayNames.forEach(day => {
    weeklyData.push({ day, count: 0 });
  });

  // Contar por dia da semana
  analyses.forEach(analysis => {
    if (analysis.mealTimestamp) {
      const date = new Date(analysis.mealTimestamp);
      const dayIndex = date.getDay();
      const dayName = dayNames[dayIndex];
      const dayData = weeklyData.find(d => d.day === dayName);
      if (dayData) {
        dayData.count++;
      }
    }
  });

  return weeklyData;
}

function calculateGrowthRate(analyses: MealAnalysis[]) {
  const now = new Date();
  const lastWeekStart = new Date(now);
  lastWeekStart.setDate(now.getDate() - 7);
  const previousWeekStart = new Date(now);
  previousWeekStart.setDate(now.getDate() - 14);

  const lastWeekCount = analyses.filter(a => {
    if (!a.mealTimestamp) return false;
    const date = new Date(a.mealTimestamp);
    return date >= lastWeekStart && date < now;
  }).length;

  const previousWeekCount = analyses.filter(a => {
    if (!a.mealTimestamp) return false;
    const date = new Date(a.mealTimestamp);
    return date >= previousWeekStart && date < lastWeekStart;
  }).length;

  if (previousWeekCount === 0) return lastWeekCount > 0 ? 100 : 0;
  
  return ((lastWeekCount - previousWeekCount) / previousWeekCount) * 100;
}

function calculateMonthlyAdhesion(analyses: MealAnalysis[]) {
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const monthlyData = new Map<string, { count: number; percentage: number }>();
  
  // Últimos 12 meses
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthName = `${monthNames[date.getMonth()]}`;
    
    const count = analyses.filter(analysis => {
      if (!analysis.mealTimestamp) return false;
      const analysisDate = new Date(analysis.mealTimestamp);
      return analysisDate.getFullYear() === date.getFullYear() && 
             analysisDate.getMonth() === date.getMonth();
    }).length;

    // Calcular porcentagem baseada no máximo esperado (30 análises por mês)
    const percentage = Math.min((count / 30) * 100, 100);
    
    monthlyData.set(monthKey, { count, percentage });
  }

  // Converter para array
  return Array.from(monthlyData.entries()).map(([key, data]) => ({
    month: key.split('-')[1] ? monthNames[parseInt(key.split('-')[1])] : 'N/A',
    count: data.count,
    percentage: data.percentage,
  }));
}

// Dados mock para fallback
function getMockStats(): DashboardStats {
  return {
    totalUsers: 42,
    totalAnalyses: 156,
    monthlyAnalyses: [
      { day: 'Dom', count: 8 },
      { day: 'Seg', count: 12 },
      { day: 'Ter', count: 15 },
      { day: 'Qua', count: 18 },
      { day: 'Qui', count: 22 },
      { day: 'Sex', count: 25 },
      { day: 'Sáb', count: 20 },
    ],
    weeklyAnalytics: [
      { day: 'Dom', count: 8 },
      { day: 'Seg', count: 12 },
      { day: 'Ter', count: 15 },
      { day: 'Qua', count: 18 },
      { day: 'Qui', count: 22 },
      { day: 'Sex', count: 25 },
      { day: 'Sáb', count: 20 },
    ],
    accuracyRate: 75.55,
    growthRate: 11.01,
    statusDistribution: {
      GREEN: 85,
      YELLOW: 42,
      RED: 29,
    },
    recentActivities: [
      {
        id: '1',
        userId: 'user1',
        userName: 'João Silva',
        userEmail: 'joao@email.com',
        occasion: 'dinner',
        timestamp: '2024-01-15 20:30:00',
        status: 'GREEN',
        isRecommended: true,
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Maria Santos',
        userEmail: 'maria@email.com',
        occasion: 'lunch',
        timestamp: '2024-01-15 13:00:00',
        status: 'YELLOW',
        isRecommended: false,
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Carlos Oliveira',
        userEmail: 'carlos@email.com',
        occasion: 'breakfast',
        timestamp: '2024-01-15 08:30:00',
        status: 'GREEN',
        isRecommended: true,
      },
      {
        id: '4',
        userId: 'user4',
        userName: 'Ana Costa',
        userEmail: 'ana@email.com',
        occasion: 'snack',
        timestamp: '2024-01-14 16:00:00',
        status: 'RED',
        isRecommended: false,
      },
      {
        id: '5',
        userId: 'user5',
        userName: 'Pedro Almeida',
        userEmail: 'pedro@email.com',
        occasion: 'dinner',
        timestamp: '2024-01-14 19:45:00',
        status: 'GREEN',
        isRecommended: true,
      },
    ],
    monthlyAdhesion: [
      { month: 'Jan', count: 156, percentage: 78 },
      { month: 'Fev', count: 142, percentage: 71 },
      { month: 'Mar', count: 165, percentage: 82.5 },
      { month: 'Abr', count: 138, percentage: 69 },
      { month: 'Mai', count: 152, percentage: 76 },
      { month: 'Jun', count: 168, percentage: 84 },
      { month: 'Jul', count: 145, percentage: 72.5 },
      { month: 'Ago', count: 158, percentage: 79 },
      { month: 'Set', count: 162, percentage: 81 },
      { month: 'Out', count: 148, percentage: 74 },
      { month: 'Nov', count: 172, percentage: 86 },
      { month: 'Dez', count: 180, percentage: 90 },
    ],
  };
}

function getMockMonthlyAnalytics(): MonthlyAnalytics {
  return {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    series: [156, 142, 165, 138, 152, 168, 145, 158, 162, 148, 172, 180],
  };
}

function getMockWeeklyAnalytics(): MonthlyAnalytics {
  return {
    labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    series: [18, 38, 5, 8, 17, 95, 291],
  };
}