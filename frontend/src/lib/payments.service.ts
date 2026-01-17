import api from './api';

export interface CreatePreferenceDto {
  companyId: string;
  documentNumber: string;
  amount: number;
  description: string;
  currency?: string;
}

export interface PreferenceResponse {
  id: string;
  init_point: string;
}

export const paymentsService = {
  async createPreference(data: CreatePreferenceDto): Promise<PreferenceResponse> {
    const response = await api.post<PreferenceResponse>('/payments/create-preference', data);
    return response.data;
  },

  async getPaymentsByCompany(companyId: string) {
    const response = await api.get(`/payments/company/${companyId}`);
    return response.data;
  },
};
