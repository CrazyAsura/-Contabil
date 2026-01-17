import api from './api';

export interface Company {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateCompanyDto {
  name: string;
  email: string;
  password?: string;
}

export const companiesService = {
  async findAll(): Promise<Company[]> {
    const response = await api.get<Company[]>('/companies');
    return response.data;
  },

  async findOne(id: string): Promise<Company> {
    const response = await api.get<Company>(`/companies/${id}`);
    return response.data;
  },

  async create(data: CreateCompanyDto): Promise<Company> {
    const response = await api.post<Company>('/companies', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateCompanyDto>): Promise<Company> {
    const response = await api.patch<Company>(`/companies/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/companies/${id}`);
  },
};
