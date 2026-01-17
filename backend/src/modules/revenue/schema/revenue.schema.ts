import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'revenue' })
export class Revenue extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Invoice' })
  invoiceId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: 'BRL' })
  currency: string;

  @Prop({ required: true, enum: ['PENDING', 'RECEIVED', 'CANCELLED'], default: 'PENDING' })
  status: string;

  @Prop()
  receivedAt: Date;

  @Prop({ required: true })
  source: string; // SALE, SERVICE, INVESTMENT, etc.

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  recordedBy: Types.ObjectId;
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);
