import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'expenses' })
export class Expense extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: 'BRL' })
  currency: string;

  @Prop({ required: true })
  category: string; // Travel, Supplies, Utilities, etc.

  @Prop({ required: true, enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' })
  status: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  receiptUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  recordedBy: Types.ObjectId;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
