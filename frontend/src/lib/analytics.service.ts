import api from './api';

export interface AnalyticsStats {
  kpis: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    profitMargin: number;
    avgInvoiceValue: number;
    expenseRatio: number;
  };
  monthlyData: Array<{
    month: string;
    revenue: number;
    expenses: number;
    timestamp: number;
  }>;
  predictions: {
    revenue: number;
    expenses: number;
    netProfit: number;
  };
  insights: string[];
}

export const analyticsService = {
  getDashboardStats: async (companyId: string): Promise<AnalyticsStats> => {
    const response = await api.get(`/analytics/dashboard/${companyId}`);
    return response.data;
  },

  exportPdf: async (companyId: string) => {
    const response = await api.get(`/analytics/export/pdf/${companyId}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_financeiro_${companyId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  exportExcel: async (companyId: string) => {
    const response = await api.get(`/analytics/export/excel/${companyId}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_financeiro_${companyId}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  exportCsv: async (companyId: string) => {
    const response = await api.get(`/analytics/export/csv/${companyId}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_financeiro_${companyId}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
