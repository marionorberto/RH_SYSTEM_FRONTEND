// src/services/prompt-service.ts
import axios from 'axios';
import { PromptTemplate } from '../pages/ai-integrations/prompt';

const API_BASE_URL = 'http://localhost:3000/api/v1/prompts';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const promptService = {
  // Buscar todos os prompts
  getPrompts: async (): Promise<PromptTemplate[]> => {
    try {
      const response = await api.get('/');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erro ao buscar prompts:', error);
      throw error;
    }
  },

  // Buscar prompt por ID
  getPromptById: async (id: string): Promise<PromptTemplate> => {
    try {
      const response = await api.get(`/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar prompt:', error);
      throw error;
    }
  },

  // Criar novo prompt
  createPrompt: async (promptData: Partial<PromptTemplate>): Promise<PromptTemplate> => {
    try {
      const response = await api.post('/', promptData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar prompt:', error);
      throw error;
    }
  },

  // Atualizar prompt
  updatePrompt: async (id: string, promptData: Partial<PromptTemplate>): Promise<PromptTemplate> => {
    try {
      const response = await api.put(`/${id}`, promptData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar prompt:', error);
      throw error;
    }
  },

  // Excluir prompt
  deletePrompt: async (id: string): Promise<void> => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error('Erro ao excluir prompt:', error);
      throw error;
    }
  },

  // Ativar/desativar prompt
  togglePromptActive: async (id: string, isActive: boolean): Promise<PromptTemplate> => {
    try {
      const response = await api.patch(`/${id}/active`, { isActive });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao alterar status do prompt:', error);
      throw error;
    }
  },

  // Testar prompt
  testPrompt: async (promptId: string, testData: any): Promise<any> => {
    try {
      const response = await api.post(`/${id}/test`, testData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao testar prompt:', error);
      throw error;
    }
  },

  // Buscar estatísticas
  getPromptStats: async (): Promise<any> => {
    try {
      const response = await api.get('/stats');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  },
};