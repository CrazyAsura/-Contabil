import api from './api';

export interface Report {
  _id: string;
  title: string;
  type: 'INVOICE_SUMMARY' | 'EXPENSE_ANALYSIS' | 'TAX_REPORT' | 'FINANCIAL_OVERVIEW';
  companyId: any;
  parameters: any;
  data: any;
  createdAt: string;
}

export const reportsService = {
  getAll: async () => {
    const response = await api.get<Report[]>('/reports');
    return response.data;
  },
  getByCompany: async (companyId: string) => {
    const response = await api.get<Report[]>(`/reports/company/${companyId}`);
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<Report>(`/reports/${id}`);
    return response.data;
  },
  create: async (data: Partial<Report>) => {
    const response = await api.post<Report>('/reports', data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },
};