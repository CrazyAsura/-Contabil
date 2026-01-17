import api from './api';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  companyId: string;
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
  role: string;
  companyId: string;
}

export const usersService = {
  async findAll(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async findOne(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async create(data: CreateUserDto): Promise<User> {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateUserDto>): Promise<User> {
    const response = await api.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
