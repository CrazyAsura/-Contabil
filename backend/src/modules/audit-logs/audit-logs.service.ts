import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from './schema/audit-logs.schema';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLog>,
  ) {}

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const createdLog = new this.auditLogModel(createAuditLogDto);
    return createdLog.save();
  }

  async findAll(query: any): Promise<AuditLog[]> {
    return this.auditLogModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findByCompany(companyId: string): Promise<AuditLog[]> {
    return this.auditLogModel.find({ companyId }).sort({ createdAt: -1 }).exec();
  }
}
