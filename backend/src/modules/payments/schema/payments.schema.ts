import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'payments' })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  documentNumber: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: 'BRL' })
  currency: string; // Multinacional: USD, BRL, EUR, etc.

  @Prop({ required: true, enum: ['PENDING', 'PAID', 'OVERDUE', 'CANCELLED'], default: 'PENDING' })
  status: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop()
  paymentDate: Date;

  @Prop({ type: [String], default: [] })
  attachments: string[]; // URLs para comprovantes

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
