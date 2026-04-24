import api from "./api-setup";

// Tipos
export interface MealAnalysis {
  id: string;
  userId: string;
  occasion: string;
  mealTimestamp: string;
  success: boolean;
  metrics: {
    totalCalories: number;
    totalCarbs: number;
    totalNetCarbs: number;
    totalFiber: number;
    totalProtein: number;
    totalFat: number;
  };
  classification: {
    diabeticSuitability: string;
    safetyStatus: "GREEN" | "YELLOW" | "RED";
    isRecommended: boolean;
    isFavorite: boolean;
  };
  processedData: {
    insights: {
      carbSources: Array<{ food: string; carbs: number }>;
      suggestions: string[];
    };
    mealNutrition: {
      mealType: string;
      glycemicLoad: number;
      fiberToCarbRatio: number;
      dailyPercentages: {
        carbs: number;
        fiber: number;
        protein: number;
      };
    };
  };
  aiAnalysis: {
    summary: {
      mealBalance: string;
      glycemicRisk: string;
      verdict: string;
    };
    medicalFeedback: {
      reason: string;
      medicalSuggestion: string;
      alternatives: string[];
    };
    patientInstructions: {
      insulinTiming: string;
      exerciseSuggestion: string;
      postMealMonitoring: string;
    };
  };
  timestamps: {
    createdAt: string;
    updatedAt: string;
  };
  user?: {
    id: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    role?: string;
    img?: string;
  };
}

export interface PaginatedResponse {
  data: MealAnalysis[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Statistics {
  totalAnalyses: number;
  totalUsers: number;
  dailyAverage: number;
  statusDistribution: {
    GREEN: number;
    YELLOW: number;
    RED: number;
  };
  occasionDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snack: number;
  };
}

// Métodos da API com tratamento de erros melhorado
export const mealAnalysisApi = {
  // Obter todas as análises (admin)
  getAllAnalyses: async (params?: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
    status?: string;
  }): Promise<PaginatedResponse> => {
    try {
      const response = await api.get('/meal-analysis/admin/all', { params });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar análises:', error);
      // Retornar dados vazios em caso de erro
      return {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        },
      };
    }
  },

  // Obter estatísticas (admin)
  getStatistics: async (days: number = 30): Promise<Statistics> => {
    try {
      const response = await api.get('/meal-analysis/admin/statistics', { params: { days } });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      // Retornar dados padrão em caso de erro
      return {
        totalAnalyses: 0,
        totalUsers: 0,
        dailyAverage: 0,
        statusDistribution: {
          GREEN: 0,
          YELLOW: 0,
          RED: 0,
        },
        occasionDistribution: {
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          snack: 0,
        },
      };
    }
  },

  // Obter análises de um usuário específico
  getUserAnalyses: async (
    userId: string,
    page: number = 1,
    limit: number = 20,
  ) => {
    try {
      const response = await api.get(`/meal-analysis/admin/user/${userId}`, {
        params: { page, limit },
      });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar análises do usuário:', error);
      return {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        },
      };
    }
  },

  // Obter resumo diário (admin)
  getDailySummary: async (date: string) => {
    try {
      const response = await api.get(`/meal-analysis/admin/daily-summary/${date}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar resumo diário:', error);
      return null;
    }
  },

  // Histórico do usuário atual
  getMyHistory: async (params?: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      const response = await api.get('/meal-analysis/history', { params });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      return {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        },
      };
    }
  },

  // Detalhes de uma análise
  getAnalysisDetail: async (analysisId: string) => {
    try {
      const response = await api.get(`/meal-analysis/${analysisId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da análise:', error);
      return null;
    }
  },

  // Atualizar com dados de glicemia
  updateGlucoseData: async (
    analysisId: string,
    glucoseData: {
      bloodGlucoseBefore?: number;
      bloodGlucoseAfter?: number;
      glucoseResponse?: string;
      userNotes?: string;
    },
  ) => {
    try {
      const response = await api.patch(`/meal-analysis/${analysisId}/glucose`, glucoseData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar dados de glicemia:', error);
      throw error;
    }
  },

  // Alternar favorito
  toggleFavorite: async (analysisId: string) => {
    try {
      const response = await api.patch(`/meal-analysis/${analysisId}/favorite`);
      return response.data;
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      throw error;
    }
  },

  // Excluir análise
  deleteAnalysis: async (analysisId: string) => {
    try {
      const response = await api.delete(`/meal-analysis/${analysisId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir análise:', error);
      throw error;
    }
  },
};