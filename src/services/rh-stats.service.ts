// src/services/rh-stats.service.ts
import api from './api-setup';

export interface DashboardStats {
  totalFuncionarios: number;
  totalDepartamentos: number;
  totalCargos: number;
  taxaOcupacao: number;
  growthRateFuncionarios: number;
  growthRateDepartamentos: number;
}

export interface PayrollStats {
  totalFolhaMensal: number;
  mediaSalarial: number;
  totalDescontos: number;
}

export interface MonthlyMovements {
  meses: string[];
  admissoes: number[];
  desligamentos: number[];
}

export interface HeadcountEvolution {
  meses: string[];
  ativos: number[];
  novasContratacoes: number[];
}

export const rhStatsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get('/rh/dashboard/stats');
    return response.data;
  },

  async getPayrollStats(): Promise<PayrollStats> {
    const response = await api.get('/rh/payroll/stats');
    return response.data;
  },

  async getMonthlyMovements(): Promise<MonthlyMovements> {
    const response = await api.get('/rh/movements/monthly');
    return response.data;
  },

  async getHeadcountEvolution(): Promise<HeadcountEvolution> {
    const response = await api.get('/rh/headcount/evolution');
    return response.data;
  },
};