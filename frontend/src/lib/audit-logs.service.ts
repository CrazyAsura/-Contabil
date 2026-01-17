import api from './api';

export interface AuditLog {
  _id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  ip: string;
  userAgent: string;
  companyId: string;
  createdAt: string;
}

export const auditLogService = {
  async findByCompany(companyId: string): Promise<AuditLog[]> {
    const response = await api.get<AuditLog[]>(`/audit-logs/company/${companyId}`);
    return response.data;
  },
};
