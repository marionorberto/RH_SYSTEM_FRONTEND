// src/services/feedback.service.ts

import api from "./api-setup";

export interface Feedback {
  id: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  category: string;
  createdAt: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
  type: 'SUGESTAO' | 'BUG' | 'ELOGIO' | 'CRITICA';
}

export interface FeedbacksResponse {
  statusCode: number;
  method: string;
  message: string;
  data: Feedback[];
  path: string;
  timestamp: number;
}

class FeedbackService {
  async getAllFeedbacks(): Promise<Feedback[]> {
    try {
      const response = await api.get<FeedbacksResponse>(`/feedbacks/all`);
      console.error("buscar feedbacks:", response);

      return response.data.data || [];
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
      throw error;
    }
  }

  async getFeedbackStats() {
    try {
      const feedbacks = await this.getAllFeedbacks();
      
      const stats = {
        total: feedbacks.length,
        averageRating: feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length || 0,
        byCategory: feedbacks.reduce((acc: Record<string, number>, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + 1;
          return acc;
        }, {}),
        byType: feedbacks.reduce((acc: Record<string, number>, curr) => {
          acc[curr.type] = (acc[curr.type] || 0) + 1;
          return acc;
        }, {}),
      };

      return stats;
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      return {
        total: 0,
        averageRating: 0,
        byCategory: {},
        byType: {},
      };
    }
  }
}

export const feedbackService = new FeedbackService();