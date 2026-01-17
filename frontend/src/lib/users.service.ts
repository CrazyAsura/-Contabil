import api from './api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
  companyId?: string;
  companyName?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
  role: string;
  sector: string;
  companyId?: string;
}

export const usersService = {
  async getAll() {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async findAll() {
    return this.getAll();
  },

  async create(data: CreateUserDto) {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateUserDto>) {
    const response = await api.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  async remove(id: string) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
