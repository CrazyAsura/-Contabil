import api from './api';
import { LoginAuthDto, RegisterAuthDto, AuthResponse } from '../types/auth';

export const authService = {
  async login(data: LoginAuthDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterAuthDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },
};
