import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'audit_logs' })
export class AuditLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  action: string; // 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', etc.

  @Prop({ required: true })
  module: string; // 'USERS', 'COMPANIES', 'EXPENSES', etc.

  @Prop({ type: Object })
  oldValue: any;

  @Prop({ type: Object })
  newValue: any;

  @Prop()
  ip: string;

  @Prop()
  userAgent: string;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
