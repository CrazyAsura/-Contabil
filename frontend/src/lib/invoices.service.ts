import api from './api';

export interface Invoice {
  _id: string;
  companyId: any;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  issueDate: string;
  dueDate?: string;
}

export const invoicesService = {
  getAll: async () => {
    const response = await api.get<Invoice[]>('/invoices');
    return response.data;
  },
  getByCompany: async (companyId: string) => {
    const response = await api.get<Invoice[]>(`/invoices/company/${companyId}`);
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<Invoice>(`/invoices/${id}`);
    return response.data;
  },
  create: async (data: Partial<Invoice>) => {
    const response = await api.post<Invoice>('/invoices', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Invoice>) => {
    const response = await api.patch<Invoice>(`/invoices/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  },
};