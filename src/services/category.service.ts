// frontend/src/services/category.service.ts
import api from './api-setup';

export interface ICategory {
  id: string;
  categoryName: string;
  baseSalaryMin: number;
  baseSalaryMax: number;
  isTributavel: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryResponse {
  statusCode: number;
  method: string;
  message: string;
  data: ICategory[] | ICategory | null;
  path: string;
  timestamp: number;
}

class CategoryService {
  private baseUrl = '/categories';

  async getAllCategories(): Promise<ICategory[]> {
    try {
      const response = await api.get<ICategoryResponse>(this.baseUrl);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as ICategory[];
      }
      return [];
    } catch (error: any) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    try {
      const response = await api.get<ICategoryResponse>(`${this.baseUrl}/${id}`);
      if (response.data.statusCode === 200 && response.data.data) {
        return response.data.data as ICategory;
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao buscar categoria:', error);
      return null;
    }
  }
}

export const categoryService = new CategoryService();