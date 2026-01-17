import api from './api';

export interface Notification {
  _id: string;
  title: string;
  content: string;
  type: 'ADMIN' | 'SUPPORT';
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
  recipientId: {
    _id: string;
    name: string;
    email: string;
  };
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  items: Notification[];
  total: number;
  page: number;
  lastPage: number;
}

export interface CreateNotificationDto {
  title: string;
  content: string;
  recipientId: string;
}

export interface UpdateNotificationDto {
  title?: string;
  content?: string;
  recipientId?: string;
}

export const notificationsService = {
  async getAll(params?: any) {
    const response = await api.get<NotificationResponse>('/notifications', { params });
    return response.data;
  },

  async getOne(id: string) {
    const response = await api.get<Notification>(`/notifications/${id}`);
    return response.data;
  },

  async create(data: CreateNotificationDto) {
    const response = await api.post<Notification>('/notifications', data);
    return response.data;
  },

  async update(id: string, data: UpdateNotificationDto) {
    const response = await api.patch<Notification>(`/notifications/${id}`, data);
    return response.data;
  },

  async markAsRead(id: string) {
    const response = await api.patch<Notification>(`/notifications/${id}/read`);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};
