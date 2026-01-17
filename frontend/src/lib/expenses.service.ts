import api from './api';

export interface Expense {
  _id: string;
  companyId: any;
  description: string;
  amount: number;
  currency: string;
  category: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  date: string;
  receiptUrl?: string;
}

export const expensesService = {
  getAll: async () => {
    const response = await api.get<Expense[]>('/expenses');
    return response.data;
  },
  getByCompany: async (companyId: string) => {
    const response = await api.get<Expense[]>(`/expenses/company/${companyId}`);
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<Expense>(`/expenses/${id}`);
    return response.data;
  },
  create: async (data: Partial<Expense>) => {
    const response = await api.post<Expense>('/expenses', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Expense>) => {
    const response = await api.patch<Expense>(`/expenses/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },
};